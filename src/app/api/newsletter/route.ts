import { NextRequest, NextResponse } from "next/server"
import { isValidEmail } from "@/utils/validation"
import { newsletterLimiter } from "@/utils/rateLimiter"

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown-ip';

    // Check rate limit
    const isLimited = newsletterLimiter.isRateLimited(ip);
    const remainingRequests = newsletterLimiter.getRemainingRequests(ip);
    const resetTime = newsletterLimiter.getTimeUntilReset(ip);

    const rateLimitResult = {
      limited: isLimited,
      remainingRequests,
      resetTime
    };

    if (rateLimitResult.limited) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please try again later.",
          rateLimited: true,
          resetTime: rateLimitResult.resetTime,
        },
        { status: 429 }
      )
    }

    // Parse request body
    const { email } = await request.json()

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    // Get Brevo API key from environment variables
    const brevoApiKey = process.env.BREVO_API

    if (!brevoApiKey) {
      console.error("BREVO_API key is not defined in environment variables")
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      )
    }

    // Step 1: Create or update contact in Brevo
    const createContactResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "api-key": brevoApiKey,
      },
      body: JSON.stringify({
        email,
        updateEnabled: true,
        attributes: {
          NEWSLETTER: true,
          SUBSCRIPTION_DATE: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
        },
      }),
    })

    // Check if contact was created or updated successfully
    let contactId: number | null = null;
    let isNewContact = false;

    if (createContactResponse.status === 201) {
      // New contact created
      isNewContact = true;
      const data = await createContactResponse.json();
      contactId = data.id;
    } else if (createContactResponse.status === 204) {
      // Contact updated, need to get the contact ID
      const getContactResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "api-key": brevoApiKey,
        },
      });

      if (getContactResponse.ok) {
        const contactData = await getContactResponse.json();
        contactId = contactData.id;
      }
    } else {
      // Handle error from Brevo API
      const errorData = await createContactResponse.json();
      console.error("Brevo API error (create contact):", errorData);

      return NextResponse.json(
        { error: "Failed to subscribe to newsletter" },
        { status: 500 }
      );
    }

    // Step 2: Create a list if it doesn't exist (only do this once in production)
    // For this example, we'll assume the list already exists and use a fixed list ID
    // In a real implementation, you might want to store the list ID in environment variables

    // Step 3: Add contact to the newsletter list
    // First, check if we have a list ID (you would typically store this in your environment variables)
    // For this example, we'll create a list if needed

    let listId: number | null = null;

    // Check if we need to create a list (in production, you'd do this once and store the ID)
    const getListsResponse = await fetch("https://api.brevo.com/v3/contacts/lists", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "api-key": brevoApiKey,
      },
    });

    if (getListsResponse.ok) {
      const listsData = await getListsResponse.json();
      // Look for a list named "Newsletter Subscribers"
      const newsletterList = listsData.lists.find((list: any) => list.name === "Newsletter Subscribers");

      if (newsletterList) {
        listId = newsletterList.id;
      } else {
        // Create a new list if it doesn't exist
        const createListResponse = await fetch("https://api.brevo.com/v3/contacts/lists", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "api-key": brevoApiKey,
          },
          body: JSON.stringify({
            name: "Newsletter Subscribers",
            folderId: 1, // Default folder
          }),
        });

        if (createListResponse.ok) {
          const newListData = await createListResponse.json();
          listId = newListData.id;
        } else {
          console.error("Failed to create list:", await createListResponse.text());
        }
      }
    }

    // Add contact to list if we have both contact ID and list ID
    if (contactId && listId) {
      const addToListResponse = await fetch(`https://api.brevo.com/v3/contacts/lists/${listId}/contacts/add`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "api-key": brevoApiKey,
        },
        body: JSON.stringify({
          emails: [email],
        }),
      });

      if (!addToListResponse.ok) {
        console.error("Failed to add contact to list:", await addToListResponse.text());
      }
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: isNewContact
          ? "Successfully subscribed to newsletter"
          : "Your subscription has been updated",
        remainingRequests: rateLimitResult.remainingRequests,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Newsletter subscription error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
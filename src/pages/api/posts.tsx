import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface Post {
  id: number;
  title: string;
  date: string;
  slug: string;
  content: string;
  author: string;
  tags: string[];
  isMdx?: boolean;
  originalFilename?: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { locale } = req.query;

  if (typeof locale !== 'string') {
    return res.status(400).json({ error: 'Invalid locale' });
  }

  try {
    const postsDirectory = path.join(process.cwd(), 'public', 'posts', locale);

    // Make sure the directory exists
    if (!fs.existsSync(postsDirectory)) {
      return res.status(404).json({ error: `No posts found for locale: ${locale}` });
    }

    // Get all file names, filter out directories and tags.md
    const filenames = fs.readdirSync(postsDirectory)
      .filter(filename => {
        const filePath = path.join(postsDirectory, filename);
        return fs.statSync(filePath).isFile() &&
               filename !== 'tags.md' &&
               (filename.endsWith('.md') || filename.endsWith('.mdx'));
      });

    const posts: Post[] = filenames.map((filename, index) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      const isMdx = filename.endsWith('.mdx');

      return {
        id: index + 1,
        title: data.title,
        date: data.date,
        slug: filename.replace(/\.(md|mdx)$/, ''),
        content,
        author: data.author || 'Unknown',
        tags: data.tags || [],
        isMdx,
        originalFilename: filename,
      };
    });

    // Get tags
    let tags: string[] = [];
    try {
      const tagsPath = path.join(postsDirectory, 'tags.md');
      if (fs.existsSync(tagsPath)) {
        const tagsContent = fs.readFileSync(tagsPath, 'utf8');
        tags = tagsContent
          .split('\n')
          .filter(line => line.trim().startsWith('-'))
          .map(tag => tag.replace('-', '').trim());
      } else {
        // If tags.md doesn't exist, collect unique tags from posts
        const allTags = new Set<string>();
        posts.forEach(post => {
          if (post.tags) {
            post.tags.forEach(tag => allTags.add(tag));
          }
        });
        tags = Array.from(allTags);
      }
    } catch (error) {
      console.error("Error reading tags:", error);
    }

    res.status(200).json({ posts, tags });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}
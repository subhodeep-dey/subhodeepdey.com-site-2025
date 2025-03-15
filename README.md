personal-website/
├── public/
│   ├── locales/
│   │   ├── en/
│   │   │   └── common.json
│   │   ├── ko/
│   │   │   └── common.json
│   │   └── ja/
│   │       └── common.json
│   └── posts/
│       ├── en/
│       │   └── post1.md
│       ├── ko/
│       │   └── post1.md
│       └── ja/
│           └── post1.md
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   └── posts/
│   │   │       └── page.tsx
│   ├── components/
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeSelector.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── PostSearch.tsx
│   │   └── ui/
│   │       └── input.tsx
│   ├── i18n/
│   │   └── routing.ts
│   ├── lib/
│   │   └── getPosts.ts
│   └── pages/
│       └── api/
│           └── posts.ts
└── next.config.js
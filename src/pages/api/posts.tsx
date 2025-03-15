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
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { locale } = req.query;

  if (typeof locale !== 'string') {
    return res.status(400).json({ error: 'Invalid locale' });
  }

  const postsDirectory = path.join(process.cwd(), 'public', 'posts', locale);
  const filenames = fs.readdirSync(postsDirectory);
  const posts: Post[] = filenames.map((filename, index) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      id: index + 1,
      title: data.title,
      date: data.date,
      slug: filename.replace(/\.md$/, ''),
      content,
      author: data.author || 'Unknown', // Default author if missing
      tags: data.tags || [], // Default empty array if tags are missing
    };
  });
  
  res.status(200).json(posts);
}
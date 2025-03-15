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

interface Tags {
  tags: string[];
}

export function getPosts(locale: string): Post[] {
  const postsDirectory = path.join(process.cwd(), 'public', 'posts', locale);
  const filenames = fs.readdirSync(postsDirectory).filter(file => file !== 'tags.md');
  return filenames.map((filename, index) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      id: index + 1,
      title: data.title,
      date: data.date,
      slug: filename.replace(/\.md$/, ''),
      content,
      author: data.author,
      tags: data.tags,
    };
  });
}

export function getTags(locale: string): string[] {
    try {
      const tagsFilePath = path.join(process.cwd(), 'public', 'posts', locale, 'tags.md');
      if (!fs.existsSync(tagsFilePath)) {
        return [];
      }
      const fileContents = fs.readFileSync(tagsFilePath, 'utf8');
      // Filter out empty lines and properly format tags
      return fileContents
        .split('\n')
        .map(tag => tag.replace('- ', '').trim())
        .filter(tag => tag.length > 0);
    } catch (error) {
      console.error('Error reading tags file:', error);
      return [];
    }
  }
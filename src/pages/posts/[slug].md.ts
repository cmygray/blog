import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map(post => ({
    params: { slug: post.slug },
  }));
}

export const GET: APIRoute = async ({ params }) => {
  const post = await getEntry('posts', params.slug!);
  if (!post) return new Response('Not found', { status: 404 });

  return new Response(post.body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
};

const baseUrl = process.env.NEXT_PRIVATE_STRAPI_URL;
const token = process.env.NEXT_PRIVATE_STRAPI_TOKEN;

type BlogType = {
  id: number;
  attributes?: {
    slug?: string;
    title?: string;
    Description?: {
      type: 'paragraph';
      children: { type: 'text'; text: string }[];
    }[];
    publishedAt: string;
  };
};

export const getBlogs = async () => {
  const blogData = await fetch(`${baseUrl}/api/blogs`, {
    next: { revalidate: 3600 },
    headers: { Authorization: `Bearer ${token}` },
  });
  const response = (await blogData.json()) as { data?: BlogType[] };

  const data = response.data?.map(({ attributes }) => ({
    title: attributes?.title,
    description: attributes?.Description?.map(({ children }) =>
      children.map(({ text }) => text).join('')
    ).join(),
    date: attributes?.publishedAt,
  }));

  return data;
};

export type PostType = {
  id: string;
  title: string;
  slug: string;
  date: string;
  published: boolean;
  summary: string;
  tags: { color: string; id: string; name: string }[];
};

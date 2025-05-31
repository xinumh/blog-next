export type RssEntriesType = {
  id: number;
  title: string;
  titleZh?: string;
  link: string;
  description: string;
  createdAt: string;
  pubDate: string;
};

export type RssSourcesType = {
  id: number;
  name: string;
  url: string;
  description: string;
};

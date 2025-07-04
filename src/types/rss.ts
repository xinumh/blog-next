export type RssEntriesType = {
  id: number;
  title: string;
  titleZh?: string;
  link: string;
  source: string;
  sourceId: string;
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

export type RssDigestsType = {
  id: number;
  digestDate: string;
  title: string;
  createdAt: string;
  quote: string;
  content: string;
};

export type RssDigestEntriesType = {
  digestId: string;
  entryId: string;
};

export type DateInfoType = {
  date: string;
  weekday: string;
  lunar: string;
};

export type DailyNewsType = {
  id: number;
  pubDate: string;
  title: string;
  source: string;
  sourceId: string;
  createdAt: string;
  url: string;
};

export type DailyNewsDataType = {
  date: string;
  weekday: string;
  lunar: string;
  quote: string;
  newsList: { title: string; order: number }[];
};

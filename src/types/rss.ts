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

export type RssDigestsType = {
  id: number;
  digestDate: string;
  title: string;
  createdAt: string;
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

//SDK利用準備
import { createClient, MicroCMSQueries } from "microcms-js-sdk";
const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});
import { Cache, CacheContainer } from "node-ts-cache";
import { MemoryStorage } from "node-ts-cache-storage-memory";
const microCMSCache = new CacheContainer(new MemoryStorage());

//型定義
export type Category = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  name: string;
};
export type News = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  category: Category;
};
export type NewsResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: News[];
};

export class CMSNews {
  @Cache(microCMSCache, { ttl: 60 })
  async getNews(queries?: MicroCMSQueries) {
    return await client.get<NewsResponse>({ endpoint: "news", queries });
  }
  async getNewsDetail(contentId: string, queries?: MicroCMSQueries) {
    return await client.getListDetail<News>({
      endpoint: "news",
      contentId,
      queries,
    });
  }
}

export const cmsNews = new CMSNews();

//APIの呼び出し
// export const getNews = async (queries?: MicroCMSQueries) => {
//   return await client.get<NewsResponse>({ endpoint: "news", queries });
// };
// export const getNewsDetail = async (
//   contentId: string,
//   queries?: MicroCMSQueries
// ) => {
//   return await client.getListDetail<News>({
//     endpoint: "news",
//     contentId,
//     queries,
//   });
// };

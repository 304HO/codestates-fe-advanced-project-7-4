import axiosApi from "../utils";

const apiKey = "0357c28dbe71476b84c1cd5bbcbdabe3";

export type CategoryType = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology"
];

export type GetOptionsNewsTypes = {
  pageSize: number;
  page: number;
  searchKeyword: string;
  sortedtype?: "relevancy" | "popularity" | "publishedAt";
};
export type GetCategoryNewsTypes = {
  searchKeyword?: string;
  pageSize: number;
  page: number;
  category: any;
};

const newsApi = {
  getAllNews: () =>
    axiosApi.get(`/everything?apiKey=${apiKey}`).then((res: any) => res.data),
  getOptionsNews: async ({
    searchKeyword,
    sortedtype,
    pageSize,
    page,
  }: GetOptionsNewsTypes) => {
    let url = "/everything?";
    const list = [];
    list.push(`q=${searchKeyword}`);
    if (sortedtype !== undefined) {
      list.push(`sortBy=${sortedtype}`);
    }
    list.push(`apiKey=${apiKey}`);
    list.push(`pageSize=${pageSize}`);
    list.push(`page=${page}`);
    url += list.join("&");
    return await axiosApi.get(url);
  },
  getCategoryNews: ({
    category,
    searchKeyword,
    pageSize,
    page,
  }: GetCategoryNewsTypes) => {
    let url = "/top-headlines?";
    const list = [];
    searchKeyword !== undefined && list.push(`q=${searchKeyword}`);
    list.push(`category=${category}`);
    list.push(`pageSize=${pageSize}`);
    list.push(`page=${page}`);
    list.push(`apiKey=${apiKey}`);
    url += list.join("&");
    return axiosApi.get(url);
  },
};

export default newsApi;

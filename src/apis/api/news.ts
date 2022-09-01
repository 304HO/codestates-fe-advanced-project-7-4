import axiosApi from "../utils";

export type GetOptionsNewsTypes = {
  pageSize: number;
  page: number;
  searchKeyword: string;
  sortedtype?: "relevancy" | "popularity" | "publishedAt";
};
export type GetCategoryNewsTypes = {
  type:
    | "business"
    | "entertainment"
    | "general"
    | "health"
    | "science"
    | "sports"
    | "technology";
};

const newsApi = {
  getAllNews: () =>
    axiosApi
      .get(`/everything?apiKey=4a002360bb714126a0ee4b0ea983c300`)
      .then((res: any) => res.data),
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
    list.push("apiKey=4a002360bb714126a0ee4b0ea983c300");
    list.push(`pageSize=${pageSize}`);
    list.push(`page=${page}`);
    url += list.join("&");
    return await axiosApi.get(url);
  },
  getCategoryNews: ({ type }: GetCategoryNewsTypes) =>
    axiosApi
      .get(
        `/top-headlines?category=${type}&apiKey=4a002360bb714126a0ee4b0ea983c300`
      )
      .then((res: any) => res.data),
};

export default newsApi;

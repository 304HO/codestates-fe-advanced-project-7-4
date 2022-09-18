import axiosApi from "../utils";

const apiKey = "2ee3e3505f384d57a02a4a33c9c42261";
//5bdb1943884b4e33bcbd46bbfc113146
export type CategoryType = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

// export type sortByType  = "relevancy" | "popularity" | "publishedAt" | null;

export type GetOptionsNewsTypes = {
  pageSize: number;
  page: number;
  searchKeyword: string;
  sortBy?: any;
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
    sortBy,
    pageSize,
    page,
  }: GetOptionsNewsTypes) => {
    let url = "/everything?";
    const list = [];
    list.push(`q=${searchKeyword}`);
    if (sortBy !== undefined && sortBy !== null) {
      list.push(`sortBy=${sortBy}`);
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

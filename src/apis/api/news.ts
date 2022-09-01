import axiosApi from "../utils";

type GetOptionsNewsTypes = {
  searchKeyword: string;
  Sortedtype?: "relevancy" | "popularity" | "publishedAt";
};
type GetCategoryNewsTypes = {
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
      .get(`/everything?apiKey=4a002360bb714126a0ee4b0ea983c300&q=health`)
      .then((res: any) => res.data),
  getOptionsNews: ({ searchKeyword, Sortedtype }: GetOptionsNewsTypes) => {
    let url = "/everything?";
    const list = [];
    list.push(`q=${searchKeyword}`);
    if (Sortedtype !== undefined) {
      list.push(`sortBy=${Sortedtype}`);
    }
    list.push("apiKey=4a002360bb714126a0ee4b0ea983c300");
    url += list.join("&");
    return axiosApi.get(url).then((res: any) => res.data);
  },
  getCategoryNews: ({ type }: GetCategoryNewsTypes) =>
    axiosApi
      .get(
        `/top-headlines?category=${type}&apiKey=4a002360bb714126a0ee4b0ea983c300`
      )
      .then((res: any) => res.data),
};

export default newsApi;

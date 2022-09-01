export type ReviewType = {
  id: number;
  author: {
    id: number;
    tags: {
      occupation: Array<string>;
      household: Array<string>;
      foodStyle: Array<string>;
    };
    nickname: string;
    profileImage: null | any;
    badge: null | any;
  };
  parent: null | any;
  product: {
    id: number;
    name: string;
  };
  market: string;
  content: string;
  images: Array<ImageType>;
  satisfaction: "best" | "good" | "bad" | "question";
  tags: {
    [key: string]: Array<string>;
  };
  bookmarkCount: number;
  commentCount: number;
  likeCount: number;
  viewCount: number;
  created: string;
  isActive: boolean;
  isBookmark: boolean;
  isEdit: boolean;
  isLike: boolean;
};

export type ImageType = { id: number; image: string; priority: number };

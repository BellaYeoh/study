import { Dispatch } from 'umi';

export type EditBlogProps = {
  dispatch: Dispatch;
  state: EditBlogState;
};

export type EditBlogState = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  summary: string;
  markdownContent: string;
  categoryList: string[];
  tagList: string[];
};

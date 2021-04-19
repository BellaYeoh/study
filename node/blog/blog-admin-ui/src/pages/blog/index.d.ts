import { Dispatch } from 'umi';

export type BlogManagementProps = {
  dispatch: Dispatch;
  state: BlogManagementState;
};

export type BlogManagementState = {
  id: string;
  title: string;
  summary: string;
  markdownContent: string;
  pageIndex: number;
  pageSize: number;
  blogList: BlogListData[];
  categoryList: string[];
  tagList: string[];
};

export type BlogListData = {
  _id: string;
  title: string;
  summary: string;
  updateTime: string;
};

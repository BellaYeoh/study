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
};

export type BlogListData = {
  _id: string;
  title: string;
  summary: string;
  updateTime: string;
};

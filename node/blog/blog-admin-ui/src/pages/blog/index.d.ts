import { Dispatch } from 'umi';

export type BlogManagementProps = {
  dispatch: Dispatch;
  state: BlogManagementState;
};

export type BlogManagementState = {
  title: string;
  summary: string;
  pageIndex: number;
  pageSize: number;
  blogList: BlogListData[];
};

export type BlogListData = {
  id: string;
  title: string;
  summary: string;
  updateTime: string;
};

import { GET, POST } from '@/utils';
import API from './API';

type BlogListParam = {
  title: string;
  summary: string;
  pageIndex: number;
  pageSize: number;
};

export type AddBlogParams = {
  id?: string;
  title: string;
  summary: string;
  markdownContent: string;
};

export async function addBlog(params: AddBlogParams) {
  return POST(API.addBlogList, params);
}

export async function getBlogList(params: BlogListParam) {
  return GET(API.getBlogList, params);
}

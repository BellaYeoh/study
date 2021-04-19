import { GET, POST } from '@/utils';
import API from './API';

type BlogListParam = {
  title: string;
  summary: string;
  category: string;
  tags: string;
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

export async function getBlogDetail(params: { id: string }) {
  return GET(API.getBlog, params);
}

export async function deleteBlog(params: { id: string }) {
  return GET(API.deleteBlog, params);
}

export async function addCategory(params: { name: string }) {
  return GET(API.addCategory, params);
}

export async function deleteCategory(params: { name: string }) {
  return GET(API.deleteCategory, params);
}

export async function getCategoryList() {
  return GET(API.getCategoryList);
}

export async function addTag(params: { name: string }) {
  return GET(API.addTag, params);
}

export async function deleteTag(params: { name: string }) {
  return GET(API.deleteTag, params);
}

export async function getTagList() {
  return GET(API.getTagList);
}

import { GET } from 'umi-request';
import API from './API';

type BlogListParam = {
  title: string;
  summary: string;
  pageIndex: number;
  pageSize: number;
};
async function getBlogList(params: BlogListParam) {}
return GET(API.getBlogList, params);

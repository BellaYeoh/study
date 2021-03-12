import request from './request';
import appendParams from './URLUtils';

/**
 * GET请求
 * @param url 请求url
 * @param params 参数
 * @param bodyParams 参数
 * @param options 可配置项
 * @returns
 */

export async function GET(
  url: string,
  params: {} = {},
  bodyParams: {} = {},
  options?: {},
): Promise<any> {
  return request(appendParams(url, params as {}), {
    ...options,
    data: bodyParams,
  });
}

/**
 * POST请求
 * @param url 请求url
 * @param params 参数
 * @param options 可配置项
 * @returns
 */
export async function POST(
  url: string,
  params?: {},
  options?: {},
): Promise<any> {
  return request(url, {
    method: 'POST',
    data: params,
    ...options,
  });
}

/**
 * PUT请求
 * @param url 请求url
 * @param params 参数
 * @returns
 */
export async function PUT(url: string, params?: {}): Promise<any> {
  return request(url, {
    method: 'PUT',
    data: params,
  });
}

/**
 * DELETE请求
 * @param url 请求url
 * @param params 参数
 * @returns
 */
export async function DELETE(url: string, params?: {}): Promise<any> {
  return request(url, {
    method: 'DELETE',
    data: params,
  });
}

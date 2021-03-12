import { message } from 'antd';

const LOGIN_CODE = '401';

type AnyFunction = {
  (): boolean;
};

/**
 * 检查状态码是否成功，若非成功，则执行默认或指定的fallback函数
 * @param responseObject response对象
 * @param fallback 状态码非成功时执行的函数
 * @returns
 */
export default function checkStatusCode(
  responseObject: any,
  fallback?: AnyFunction,
): boolean {
  if (responseObject) {
    if (responseObject.success) {
      return true;
    }

    if (responseObject.errCode && responseObject.errCode === LOGIN_CODE) {
      // 需要登录
      window.location.href = '/login';
      return false;
    }
  }

  let results = true;
  if (fallback) {
    results = fallback();
  }

  // 统一的消息提示
  if (results && responseObject) {
    message.error(responseObject.errMessage || '请求失败', 3);
  }

  return false;
}

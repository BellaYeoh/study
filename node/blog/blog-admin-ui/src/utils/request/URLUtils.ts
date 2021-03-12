// 参数拼接至api
export default function appendParams(api: string, params: object) {
  let finalApi = api;

  if (params) {
    Object.keys(params).forEach((key, index) => {
      const formatParams = encodeURIComponent(params[key]);
      finalApi += (index === 0 ? '?' : '&') + `${key}=${formatParams}`;
    });
  }

  return finalApi;
}

// 将api中的占位符用参数替换
export function replaceParams(api: string, params: object) {
  const keys = Object.keys(params);

  if (keys.length === 0) {
    return api;
  }

  const apiParamsCount = api.split('{').length - 1;
  if (apiParamsCount !== keys.length) {
    throw Error('传入参数个数与api所需个数不一致，请检查！');
  }

  return keys.reduce((api, key) => {
    return api.replace(new RegExp(`\\${key}\\`, 'g'), params[key]);
  }, api);
}

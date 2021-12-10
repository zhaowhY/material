// 多个请求返回数据处理
export const formatAllSettled = async (funcs = []) =>
  (await Promise.allSettled(funcs)).map(item => {
    const { status, value, reason } = item;
    if (status === 'fulfilled') return value;
    console.error('request error', reason.message);
    return null;
  });
export const setCookie = (token) => {
  // 设置 cookie，expires 单位为 UTC 字符串
  document.cookie = `token=${token}; path=/; max-age=86400; secure`;
};

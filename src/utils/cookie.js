export const setCookie = (token) => {
  // 设置 cookie，expires 单位为 UTC 字符串
  document.cookie = `token=${token}; path=/; max-age=86400; secure`;
};

export const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

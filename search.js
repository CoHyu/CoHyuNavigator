export function search(engine) {
  const query = document.getElementById("searchInput").value;
  if (!query.trim()) return;

  const urls = {
    bing: `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
    google: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
    bilibili: `https://search.bilibili.com/all?keyword=${encodeURIComponent(
      query
    )}`,
    bilibili_user: `https://space.bilibili.com/97139894/search?keyword=${encodeURIComponent(
      query
    )}`,
    xz: `https://xz.aliyun.com/search/3?keywords=${encodeURIComponent(query)}`,
    qax: `https://forum.butian.net/search?word=${encodeURIComponent(query)}`,
    github: `https://github.com/search?q=${encodeURIComponent(query)}`,
    youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(
      query
    )}`,
    x: `https://twitter.com/search?q=${encodeURIComponent(query)}`,
    pixiv: `https://www.pixiv.net/tags/${encodeURIComponent(query)}`,
    douyin: `https://www.douyin.com/search/${encodeURIComponent(query)}`,
    xiaohongshu: `https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(
      query
    )}`,
    freebuf: `https://www.freebuf.com/search?search=${encodeURIComponent(
      query
    )}&activeType=1&society_id=0&society_name=`,
    kanxue: `https://bbs.kanxue.com/search-${encodeURIComponent(query)}-1.htm`,
    wiki: `https://zh.wikipedia.org/w/index.php?search=${encodeURIComponent(
      query
    )}`,
    zhihu: `https://www.zhihu.com/search?type=content&q=${encodeURIComponent(
      query
    )}`,
  };

  window.open(urls[engine], "_blank");
}

// 兼容HTML内联调用
window.search = search;

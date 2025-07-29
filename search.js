function search(engine) {
  const query = document.getElementById("searchInput").value;
  if (!query.trim()) return;

  const urls = {
    bing: `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
    google: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
    bilibili: `https://search.bilibili.com/all?keyword=${encodeURIComponent(
      query
    )}`,
    weixin: `https://weixin.sogou.com/weixin?type=2&s_from=input&query=${encodeURIComponent(query)}&ie=utf8&_sug_=n&_sug_type_=&w=01019900&sut=9530&sst0=1753784364580&lkt=20%2C1753784358543%2C1753784364471`,
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

// 剪切板功能
let clipboardData = JSON.parse(localStorage.getItem('searchClipboard') || '[]');

function saveClipboard() {
  localStorage.setItem('searchClipboard', JSON.stringify(clipboardData));
}

function renderClipboard() {
  const clipboardList = document.getElementById('clipboardList');
  
  if (clipboardData.length === 0) {
    clipboardList.innerHTML = '<div class="clipboard-empty">暂无搜索记录</div>';
    return;
  }
  
  clipboardList.innerHTML = clipboardData.map((item, index) => `
    <div class="clipboard-item">
      <span class="clipboard-text" onclick="useClipboardItem('${item.replace(/'/g, "\\'")}')" title="点击使用此搜索词">${item}</span>
      <div class="clipboard-actions">
        <button onclick="useClipboardItem('${item.replace(/'/g, "\\'")}')" class="use-btn" title="使用">用</button>
        <button onclick="removeClipboardItem(${index})" class="delete-btn" title="删除">×</button>
      </div>
    </div>
  `).join('');
}

function addToClipboard() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) {
    alert('请先输入搜索关键词');
    return;
  }
  
  if (clipboardData.includes(query)) {
    alert('该搜索词已存在于剪切板中');
    return;
  }
  
  clipboardData.unshift(query);
  if (clipboardData.length > 20) { // 限制最多20条记录
    clipboardData.pop();
  }
  
  saveClipboard();
  renderClipboard();
}

function removeClipboardItem(index) {
  clipboardData.splice(index, 1);
  saveClipboard();
  renderClipboard();
}

function useClipboardItem(text) {
  document.getElementById("searchInput").value = text;
  document.getElementById("searchInput").focus();
}

function clearClipboard() {
  if (clipboardData.length === 0) return;
  
  if (confirm('确定要清空所有搜索记录吗？')) {
    clipboardData = [];
    saveClipboard();
    renderClipboard();
  }
}

// 页面加载时初始化剪切板
document.addEventListener('DOMContentLoaded', function() {
  renderClipboard();
  
  // 添加回车键搜索功能
  document.getElementById("searchInput").addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      addToClipboard();
    }
  });
});

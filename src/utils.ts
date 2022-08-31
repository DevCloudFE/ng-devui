export function insertBaiduScript() {
  if (typeof document === 'undefined') {return;}
  const baiduScript = document.createElement('script');
  const baiduScriptStr = `
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?0c8e27d8ae0d13fbef28c934b5464d5d";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
  `;
  baiduScript.textContent = baiduScriptStr;
  document.body.append(baiduScript);
}

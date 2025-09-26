// cache-buster.js
// 動態為所有 CSS 與 JS 檔案加上隨機 ?t= 參數，避免快取。圖片不處理。
(function() {
    var cacheBuster = Math.floor(Math.random() * 1000000000);
    // 處理所有 <link> 標籤（僅限 CSS）
    var links = document.getElementsByTagName('link');
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        if (link.href && (link.rel === 'stylesheet' || link.type === 'text/css')) {
            // 排除 Google Fonts
            if (link.href.indexOf('fonts.googleapis.com') === -1) {
                link.href = link.href.replace(/([&?])t=[^&]*&?/, '$1');
                link.href += (link.href.indexOf('?') === -1 ? '?' : '&') + 't=' + cacheBuster;
            }
        }
    }
    // 處理所有 <script> 標籤（僅限 JS）
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];
        if (script.src && script.src.match(/\.js(\?|$)/)) {
            // 排除本身與外部CDN
            if (script.src.indexOf('cache-buster.js') === -1 && script.src.indexOf('http') !== 0) {
                script.src = script.src.replace(/([&?])t=[^&]*&?/, '$1');
                script.src += (script.src.indexOf('?') === -1 ? '?' : '&') + 't=' + cacheBuster;
            }
        }
    }
})();


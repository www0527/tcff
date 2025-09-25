(function(){
  function htmlEscape(str){
    return String(str == null ? '' : str)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;')
      .replace(/'/g,'&#39;');
  }

  function renderInto(el, data){
    try{
      var title = htmlEscape(data.title || '');
      var desc = htmlEscape(data.description || '');
      var items = Array.isArray(data.items) ? data.items : [];
      var cards = items.map(function(item){
        var img = item.image || '';
        var alt = item.title || '';
        var href = item.href || '#';
        var itemClass = item.itemClass || '';
        var anchor = '';
        if (img) {
          var imgName = img.split('/').pop().split('?')[0];
          if (imgName) {
            anchor = '#' + encodeURIComponent(imgName).replace(/%/g, '_');
          }
        }
        var finalHref = href + anchor;
        var subtitleHTML = '<p class="hot-card-subtitle">' + (item.subtitle ? htmlEscape(item.subtitle) : '&#160;') + '</p>';
        return (
          '<div class="col-md-4 ' + htmlEscape(itemClass) + '" onclick="window.location=\'' + htmlEscape(finalHref) + '\';" style="cursor: pointer;">' +
            '<div class="hot-card">' +
              '<div class="hot-card-img">' +
                '<img src="' + htmlEscape(img) + '" alt="' + htmlEscape(alt) + '">' +
              '</div>' +
              '<h4 class="hot-card-title">' + htmlEscape(item.title || '') + '</h4>' +
              subtitleHTML +
            '</div>' +
          '</div>'
        );
      }).join('');

      el.innerHTML = (
        '<div class="w3-about text-center">' +
          '<div class="container">' +
            '<h2 class="w3ls_head">' + title + '</h2>' +
            (desc ? '<p class="para">' + desc + '</p>' : '') +
            '<div class="w3-ab-top row">' +
              cards +
              '<div class="clearfix"></div>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }catch(e){
      console.error('[hot-products] render error:', e);
      el.innerHTML = '<div class="w3-about text-center"><div class="container"><p class="para">資料渲染發生錯誤。</p></div></div>';
    }
  }

  function fetchAndRender(el, src){
    el.innerHTML = '<div class="w3-about text-center"><div class="container"><p class="para">載入中…</p></div></div>';
    fetch(src, { cache: 'no-store' })
      .then(function(res){ if(!res.ok) throw new Error(res.status + ' ' + res.statusText); return res.json(); })
      .then(function(data){ renderInto(el, data); })
      .catch(function(err){
        console.error('[hot-products] fetch error:', err);
        el.innerHTML = '<div class="w3-about text-center"><div class="container"><p class="para">無法載入資料，請稍後再試。</p></div></div>';
      });
  }

  if (window.customElements && !customElements.get('hot-products')){
    class HotProducts extends HTMLElement{
      static get observedAttributes(){ return ['data-src']; }
      connectedCallback(){
        var src = this.getAttribute('data-src') || 'data/hot-products.json';
        fetchAndRender(this, src);
      }
      attributeChangedCallback(name, oldVal, newVal){
        if(name === 'data-src' && this.isConnected && oldVal !== newVal){
          fetchAndRender(this, newVal || 'data/hot-products.json');
        }
      }
    }
    customElements.define('hot-products', HotProducts);
  }else{
    // Fallback：若瀏覽器不支援 Custom Elements，於 DOMContentLoaded 後直接渲染到占位元素
    document.addEventListener('DOMContentLoaded', function(){
      var els = document.querySelectorAll('hot-products');
      if(!els || !els.length) return;
      Array.prototype.forEach.call(els, function(el){
        var src = el.getAttribute('data-src') || 'data/hot-products.json';
        fetchAndRender(el, src);
      });
    });
  }
})();

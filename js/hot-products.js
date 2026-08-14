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
        '<style>' +
        '.hot-products-flex-row { display: flex; flex-wrap: wrap; }' +
        '.hot-products-flex-row > .col-md-4 { display: flex; flex-direction: column; float: none; }' +
        '.hot-products-flex-row .hot-card { flex: 1; }' +
        '</style>' +
        '<div class="w3-about text-center">' +
          '<div class="container">' +
            '<h2 class="w3ls_head">' + title + '</h2>' +
            (desc ? '<p class="para">' + desc + '</p>' : '') +
            '<div class="w3-ab-top row hot-products-flex-row">' +
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

  const fallbackData = {
    "title": "熱門產品",
    "description": "由多位經驗豐富業界精英一同成立致力於不鏽鋼過濾器研發與製造、並擁有專業製造化纖過濾器的技術,生產出符合客戶需求的濾芯.",
    "items": [
      { "image": "asset/product_ai/product_ai_liquid_cooling.png?t=6", "title": "CDU 液冷散熱系統濾芯", "subtitle": "Filter Elements for CDU Liquid Cooling Systems", "href": "product.htm", "itemClass": "w3l-abt-grid" },
      { "image": "asset/product_2_aerospace/product_2_aerospace_servo_valves.png?t=6", "title": "不鏽鋼伺服閥精密濾芯", "subtitle": "Precision Filter for Aerospace Servo-Valves", "href": "product.htm", "itemClass": "w3l-abt-grid-1" },
      { "image": "asset/product_3_mesh_filter/product_3_multi_layered_mesh_filter.png?t=6", "title": "不鏽鋼摺疊蠟式濾芯", "subtitle": "Stainless Steel Folding Candle Element Filter", "href": "product.htm", "itemClass": "w3l-abt-grid-2" },
      { "image": "asset/product_4_filter_element_housing/product_4_filter_element_housing.png?t=6", "title": "濾芯外殼", "subtitle": "Filter Element Housing", "href": "product.htm", "itemClass": "w3l-abt-grid-2" },
      { "image": "asset/products_5_multi_layered_mesh_filter/product_5_multi_layered mesh filter.png?t=6", "title": "不鏽鋼平面蠟式濾芯", "subtitle": "Stainless Steel Folding Multi-Layered Mesh Filter", "href": "product-2.htm", "itemClass": "w3l-abt-grid-2" },
      { "image": "asset/product_6_disk/product_6_disk.png?t=6", "title": "碟式濾芯(DISK)", "href": "product-2.htm", "itemClass": "w3l-abt-grid-2" },
      { "image": "asset/product_7_powder_filter/product_7_powder_filter.png?t=6", "title": "粉末冶金濾芯", "subtitle": "Powder Metallurgy Filter Elements", "href": "product-2.htm", "itemClass": "w3l-abt-grid-2" },
      { "image": "asset/product_8_mesh_bag_filter/product_8_mesh_bag_filter.png?t=6", "title": "網包管濾芯", "subtitle": "Mesh Bag Filter", "href": "product-2.htm", "itemClass": "w3l-abt-grid-2" },
      { "image": "asset/product_9_disk_2/product_9_disk.png?t=6", "title": "鋁包網濾心(DISK)", "href": "product-3.htm", "itemClass": "w3l-abt-grid-2" },
      { "image": "asset/product_10_planar_multi_layered_filter/product_10_planar multi_layered_filter_discs.png?t=6", "title": "平面式金屬多層濾網片", "subtitle": "Planar Multi-Layered Mesh Filter Discs", "href": "product-3.htm", "itemClass": "w3l-abt-grid-2" },
      { "image": "asset/product_11_thermal_module_division/2025.05.27-台纖濾材商品攝影2328.png?t=6", "title": "散熱模組事業部", "subtitle": "Thermal Module Division", "href": "product-3.htm", "itemClass": "w3l-abt-grid-2" },
      { "image": "asset/product_12_liquid_cooling/S__18497540_0.png?t=6", "title": "液冷散熱系統零件", "subtitle": "Liquid Cooling Parts", "href": "product-3.htm", "itemClass": "w3l-abt-grid-2" }
    ]
  };

  function fetchAndRender(el, src){
    el.innerHTML = '<div class="w3-about text-center"><div class="container"><p class="para">載入中…</p></div></div>';
    fetch(src, { cache: 'no-store' })
      .then(function(res){ if(!res.ok) throw new Error(res.status + ' ' + res.statusText); return res.json(); })
      .then(function(data){ renderInto(el, data); })
      .catch(function(err){
        console.warn('[hot-products] fetch error, using fallback data:', err);
        renderInto(el, fallbackData);
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

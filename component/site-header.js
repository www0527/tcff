(function() {
  const headerHTML = `
  <div class="header-top">
    <div class="container">
      <div class="header-top-left">
        <p><i class="fa fa-phone" aria-hidden="true"></i> <a href="tel:02-2455-1552" style="color: inherit; text-decoration: none;">02-2455-1552</a></p>
      </div>
      <div class="w3layouts-logo">
        <h1>
          <a href="index.html">台纖濾材 TCFF</a>
        </h1>
      </div>
    </div>
  </div>
  <div class="header">
    <div class="container">
      <div class="top-nav">
        <nav class="navbar navbar-default">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <!--navbar-header-->
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
              <li><a href="index.html" class="nav-link" data-path="index.html">首頁</a></li>
              <li><a href="about.htm" class="nav-link" data-path="about.htm">關於台纖</a></li>
              <li><a href="product.htm" class="nav-link" data-path="product">產品介紹</a></li>
              <li><a href="filter.htm" class="nav-link" data-path="filter.htm">網材介紹</a></li>
              <li><a href="connect.htm" class="nav-link" data-path="connect.htm">連絡我們</a></li>
            </ul>	
            <div class="clearfix"> </div>	
          </div>
        </nav>
      </div>
      <div class="clearfix"> </div>
    </div>
  </div>
  `;

  class SiteHeader extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      if (!this.rendered) {
        this.innerHTML = headerHTML;
        this.rendered = true;
        this.setActiveMenu();
      }
    }

    setActiveMenu() {
      // 根據當前網址判斷要為哪個選單加入 active class
      const pathname = window.location.pathname;
      let currentPath = pathname.substring(pathname.lastIndexOf('/') + 1);
      if (!currentPath || currentPath === '') {
        currentPath = 'index.html';
      }

      const links = this.querySelectorAll('.nav-link');
      links.forEach(link => {
        const dataPath = link.getAttribute('data-path');
        // 對於產品介紹，因為有 product.htm, product-2.htm, product-3.htm，所以用包含判斷
        if (dataPath === 'product' && currentPath.includes('product')) {
          link.classList.add('active');
        } else if (dataPath === currentPath) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  if (window.customElements && !customElements.get('site-header')) {
    customElements.define('site-header', SiteHeader);
  }
})();

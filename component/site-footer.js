(function() {
  const footerHTML = `
  <!-- footer -->
  <div class="w3-agile-footer">
    <div class="container">
      <div class="footer-grids">
        <div class="col-md-3 footer-grid">
          <div class="footer-grid-heading">
            <h4>Address</h4>
          </div>
          <div class="footer-grid-info">
            <h4 style="color: white">公司-濾網事業部</h4>
            <p>基隆市七堵區俊賢路27號6樓</p>
            <p class="phone">
              電話：<a href="tel:02-2455-1552" style="color: inherit; text-decoration: none;">02-2455-1552</a><br>
              傳真：02-2468-0749
            </p>
          </div>
          <div class="footer-grid-info">
            <h4 style="color: white">汐止廠-散熱模組事業部</h4>
            <p>新北市汐止區大同路三段369巷19號1樓</p>
            <p class="phone">
              電話：<a href="tel:02-2455-1552" style="color: inherit; text-decoration: none;">02-2455-1552</a><br>
              傳真：02-2468-0749
            </p>
          </div>
        </div>
        <div class="col-md-3 footer-grid">
          <div class="footer-grid-heading">
            <h4>Navigation</h4>
          </div>
          <div class="footer-grid-info">
            <ul>
              <li><a href="product.htm">產品介紹</a></li>
              <li><a href="filter.htm">網材介紹</a></li>
              <li><a href="connect.htm">連絡我們</a></li>
            </ul>
          </div>
        </div>
        <div class="col-md-3 footer-grid" style="display: none;">
          <div class="footer-grid-heading">
            <h4>Newsletter</h4>
          </div>
          <div class="agile-footer-grid">
            <ul class="w3agile_footer_grid_list">
              <li>Ut aut reiciendis voluptatibus maiores <a href="#">http://example.com</a> alias, ut aut reiciendis.
                <span><i class="fa fa-twitter" aria-hidden="true"></i> 02 days ago</span>
              </li>
              <li>Itaque earum rerum hic tenetur a sapiente delectus <a href="#">http://example.com</a><span><i class="fa fa-twitter" aria-hidden="true"></i> 03 days ago</span></li>
            </ul>
          </div>
        </div>
        <div class="col-md-3 footer-grid" style="display: none;">
          <div class="footer-grid-heading">
            <h4>Follow</h4>
          </div>
          <div class="social">
            <ul>
              <li><a href="#"><i class="fa fa-facebook"></i></a></li>
              <li><a href="#"><i class="fa fa-twitter"></i></a></li>
              <li><a href="#"><i class="fa fa-rss"></i></a></li>
              <li><a href="#"><i class="fa fa-vk"></i></a></li>
            </ul>
          </div>
        </div>
        <div class="clearfix"> </div>
      </div>
      <div class="agileits-w3layouts-copyright">
        <p>© 2017 In Industry . All Rights Reserved | Design by <a href="http://w3layouts.com/"> W3layouts</a></p>
      </div>
    </div>
  </div>
  <!-- //footer -->
  `;

  class SiteFooter extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      // 確保只渲染一次
      if (!this.rendered) {
        this.innerHTML = footerHTML;
        this.rendered = true;
      }
    }
  }

  if (window.customElements && !customElements.get('site-footer')) {
    customElements.define('site-footer', SiteFooter);
  }
})();

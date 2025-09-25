document.addEventListener('DOMContentLoaded', function () {
    // 尋找頁面上所有的輪播圖容器
    const carousels = document.querySelectorAll('.product-carousel-container');

    carousels.forEach(function (carouselContainer) {
        const mainImage = carouselContainer.querySelector('.product-carousel-main img');
        const thumbnails = carouselContainer.querySelectorAll('.product-carousel-thumbs .thumb');

        // 為每個縮圖添加點擊事件
        thumbnails.forEach(function (thumb) {
            thumb.addEventListener('click', function () {
                // 移除所有縮圖的 'active' class
                thumbnails.forEach(function (t) {
                    t.classList.remove('active');
                });

                // 為當前點擊的縮圖添加 'active' class
                this.classList.add('active');

                // 更新主圖的 src
                const newImageSrc = this.querySelector('img').getAttribute('src');
                mainImage.setAttribute('src', newImageSrc);
            });
        });

        // 預設選中第一個縮圖
        if (thumbnails.length > 0) {
            thumbnails[0].classList.add('active');
        }
    });
});


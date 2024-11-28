document.addEventListener('DOMContentLoaded', function() {
    // Banner轮播
    const banner = {
        track: document.querySelector('.banner-track'),
        slides: document.querySelectorAll('.banner-slide'),
        prevBtn: document.querySelector('.banner-arrows .prev'),
        nextBtn: document.querySelector('.banner-arrows .next'),
        dotsContainer: document.querySelector('.banner-dots'),
        currentIndex: 0,
        slideCount: 0,
        autoPlayTimer: null,

        init() {
            // 获取原始slide数量（不包括克隆的）
            this.slideCount = this.slides.length;
            
            // 克隆第一个和最后一个slide用于无缝循环
            const firstClone = this.slides[0].cloneNode(true);
            const lastClone = this.slides[this.slideCount - 1].cloneNode(true);
            this.track.appendChild(firstClone);
            this.track.insertBefore(lastClone, this.slides[0]);
            
            // 创建导航点
            this.createDots();
            
            // 设置初始位置
            this.track.style.transform = `translateX(-100%)`;
            
            // 绑定事件
            this.bindEvents();
            
            // 开始自动播放
            this.startAutoPlay();
        },

        createDots() {
            // 只为原始slide创建导航点（不包括克隆的）
            for(let i = 0; i < this.slideCount; i++) {
                const dot = document.createElement('button');
                dot.classList.add('banner-dot');
                if(i === 0) dot.classList.add('active');
                dot.setAttribute('aria-label', `Slide ${i + 1}`);
                this.dotsContainer.appendChild(dot);
            }
        },

        updateDots() {
            // 确保currentIndex在有效范围内
            const normalizedIndex = ((this.currentIndex % this.slideCount) + this.slideCount) % this.slideCount;
            const dots = this.dotsContainer.children;
            
            for(let dot of dots) {
                dot.classList.remove('active');
            }
            dots[normalizedIndex].classList.add('active');
        },

        slide(direction) {
            this.track.style.transition = 'transform 0.5s ease-in-out';
            
            if(direction === 'next') {
                this.currentIndex++;
            } else {
                this.currentIndex--;
            }
            
            this.track.style.transform = `translateX(-${(this.currentIndex + 1) * 100}%)`;

            // 处理无缝循环
            if(this.currentIndex >= this.slideCount) {
                setTimeout(() => {
                    this.track.style.transition = 'none';
                    this.currentIndex = 0;
                    this.track.style.transform = `translateX(-100%)`;
                    this.updateDots();
                }, 500);
            } else if(this.currentIndex < 0) {
                setTimeout(() => {
                    this.track.style.transition = 'none';
                    this.currentIndex = this.slideCount - 1;
                    this.track.style.transform = `translateX(-${this.slideCount * 100}%)`;
                    this.updateDots();
                }, 500);
            }

            this.updateDots();
        },

        bindEvents() {
            this.prevBtn.addEventListener('click', () => {
                this.slide('prev');
                this.resetAutoPlay();
            });

            this.nextBtn.addEventListener('click', () => {
                this.slide('next');
                this.resetAutoPlay();
            });

            // 点击导航点切换
            this.dotsContainer.addEventListener('click', (e) => {
                if(e.target.classList.contains('banner-dot')) {
                    const dots = Array.from(this.dotsContainer.children);
                    const newIndex = dots.indexOf(e.target);
                    if(newIndex !== this.currentIndex) {
                        this.currentIndex = newIndex;
                        this.track.style.transition = 'transform 0.5s ease-in-out';
                        this.track.style.transform = `translateX(-${(this.currentIndex + 1) * 100}%)`;
                        this.updateDots();
                        this.resetAutoPlay();
                    }
                }
            });
        },

        startAutoPlay() {
            this.autoPlayTimer = setInterval(() => {
                this.slide('next');
            }, 5000);
        },

        resetAutoPlay() {
            clearInterval(this.autoPlayTimer);
            this.startAutoPlay();
        }
    };

    // 初始化banner
    banner.init();
}); 
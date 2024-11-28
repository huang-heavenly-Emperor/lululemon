document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除其他按钮的active状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的active状态
            this.classList.add('active');
            
            // 获取排序类型
            const sortType = this.dataset.sort;
            
            // 这里可以添加实际的排序逻辑
            console.log('Sorting by:', sortType);
        });
    });
}); 
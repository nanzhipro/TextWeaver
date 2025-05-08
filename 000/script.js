document.addEventListener('DOMContentLoaded', function() {
    // 获取模态窗口元素
    const modal = document.getElementById('scheduleModal');
    const scheduleBtn = document.getElementById('scheduleBtn');
    const closeBtn = document.querySelector('.close-btn');
    const scheduleForm = document.getElementById('scheduleForm');

    // 打开模态窗口
    scheduleBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });

    // 关闭模态窗口
    closeBtn.addEventListener('click', function() {
        closeModal();
    });

    // 点击模态窗口外部关闭
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // 关闭模态窗口函数
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // 恢复背景滚动
    }

    // 表单提交处理
    scheduleForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // 获取表单数据
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            topic: document.getElementById('topic').value,
            message: document.getElementById('message').value
        };
        
        // 这里可以添加表单验证
        if (!formData.name || !formData.email) {
            alert('请填写必填字段');
            return;
        }
        
        // 模拟表单提交
        console.log('表单数据：', formData);
        
        // 显示成功消息
        scheduleForm.innerHTML = `
            <div class="success-message">
                <h3>预约成功！</h3>
                <p>感谢您的预约，${formData.name}。我们将尽快与您联系。</p>
                <button type="button" class="submit-btn close-success">关闭</button>
            </div>
        `;
        
        // 添加关闭按钮事件
        document.querySelector('.close-success').addEventListener('click', function() {
            closeModal();
            
            // 延迟重置表单，等待模态窗关闭动画完成
            setTimeout(() => {
                scheduleForm.reset();
                scheduleForm.innerHTML = `
                    <div class="form-group">
                        <label for="name">姓名</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">邮箱</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="topic">咨询主题</label>
                        <select id="topic" name="topic">
                            <option value="career">职业发展</option>
                            <option value="ai-tools">AI 工具应用</option>
                            <option value="prompt-engineering">提示词工程</option>
                            <option value="other">其他</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="message">留言</label>
                        <textarea id="message" name="message" rows="4"></textarea>
                    </div>
                    <button type="submit" class="submit-btn">提交预约</button>
                `;
            }, 300);
        });
    });

    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 添加渐入动画效果
    const animateElements = document.querySelectorAll('.recommendation-item, blockquote, .cta-section');
    
    // 检测元素是否在视口中
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // 添加渐入动画类
    function addFadeInClass() {
        animateElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('fade-in-visible')) {
                element.classList.add('fade-in-visible');
            }
        });
    }
    
    // 添加初始CSS类
    animateElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // 初始检查
    addFadeInClass();
    
    // 滚动时检查
    window.addEventListener('scroll', addFadeInClass);
    
    // 添加CSS规则
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}); 
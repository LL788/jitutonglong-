let currentProblem = {
    chickens: 0,
    rabbits: 0
};

function generateNewProblem() {
    // 生成一个新的问题
    const totalHeads = Math.floor(Math.random() * 10) + 5;
    const maxRabbits = Math.floor(totalHeads / 2);
    const rabbits = Math.floor(Math.random() * maxRabbits) + 1;
    const chickens = totalHeads - rabbits;

    currentProblem.chickens = chickens;
    currentProblem.rabbits = rabbits;

    // 更新显示的数字
    document.getElementById('totalHeads').textContent = totalHeads;
    document.getElementById('totalLegs').textContent = (chickens * 2 + rabbits * 4);
    
    // 重置显示为问号
    document.getElementById('chickenCount').textContent = '?';
    document.getElementById('rabbitCount').textContent = '?';
    
    // 清空输入框和消息
    document.getElementById('chickenInput').value = '';
    document.getElementById('rabbitInput').value = '';
    document.getElementById('message').textContent = '';

    // 隐藏解题思路
    document.getElementById('solutionHint').classList.add('hidden');

    // 确保所有弹窗都是隐藏的
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
        modal.classList.add('hidden');
    });
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // 等待动画完成
    }
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';  // 先设置display
        modal.classList.remove('hidden');
    }
}

function showCongratsModal() {
    showModal('congratsModal');
    // 播放声音
    const sound = document.getElementById('correctSound');
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(error => {
            console.log("Sound play failed:", error);
        });
    }
}

function showWrongModal() {
    showModal('wrongModal');
}

function checkAnswer() {
    const chickenGuess = parseInt(document.getElementById('chickenInput').value) || 0;
    const rabbitGuess = parseInt(document.getElementById('rabbitInput').value) || 0;
    const message = document.getElementById('message');

    // 检查输入是否为空
    if (!document.getElementById('chickenInput').value || !document.getElementById('rabbitInput').value) {
        message.textContent = '请输入数量！';
        message.style.color = 'red';
        return;
    }

    if (chickenGuess === currentProblem.chickens && rabbitGuess === currentProblem.rabbits) {
        // 答对时的处理
        message.textContent = '恭喜你答对了！';
        message.style.color = 'green';
        // 显示正确答案
        document.getElementById('chickenCount').textContent = currentProblem.chickens;
        document.getElementById('rabbitCount').textContent = currentProblem.rabbits;
        // 显示祝贺弹窗
        showCongratsModal();
    } else {
        // 答错时的处理
        message.textContent = '再试试看！';
        message.style.color = 'red';
        // 保持问号显示
        document.getElementById('chickenCount').textContent = '?';
        document.getElementById('rabbitCount').textContent = '?';
        showWrongModal();
    }
}

function showHint() {
    const totalHeads = parseInt(document.getElementById('totalHeads').textContent);
    const totalLegs = parseInt(document.getElementById('totalLegs').textContent);
    const solutionHint = document.getElementById('solutionHint');
    
    // 显示解题思路
    solutionHint.classList.remove('hidden');
    
    // 更新提示信息
    document.getElementById('correctHeads').textContent = totalHeads;
    
    // 显示基本提示
    document.getElementById('message').textContent = 
        `提示：如果全是鸡，腿的数量是${totalHeads * 2}；如果全是兔子，腿的数量是${totalHeads * 4}`;
}

// 初始化时添加全局事件处理
document.addEventListener('DOMContentLoaded', function() {
    // 添加基本事件监听器
    document.getElementById('checkButton').addEventListener('click', checkAnswer);
    document.getElementById('hintButton').addEventListener('click', showHint);
    document.getElementById('newProblemButton').addEventListener('click', generateNewProblem);
    
    // 确保所有弹窗初始状态为隐藏
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
        modal.classList.add('hidden');
        
        // 点击背景关闭弹窗
        modal.addEventListener('click', function(event) {
            if (event.target === this) {
                closeModal(this.id);
            }
        });

        // 点击继续按钮关闭弹窗
        const closeBtn = modal.querySelector('button');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                closeModal(modal.id);
            });
        }

        // 阻止弹窗内容的点击事件冒泡
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.addEventListener('click', function(event) {
                event.stopPropagation();
            });
        }
    });

    // 初始化第一个问题
    generateNewProblem();
}); 
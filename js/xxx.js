

window.onload = function() {
    var colorCircles = document.querySelectorAll('.color-circle');
    for (var i = 0; i < colorCircles.length; i++) {
        colorCircles[i].style.backgroundColor = getRandomColor();
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 授权
    // 打开弹窗
    function openModal(link) {
        // 检查 localStorage 中是否已经有验证状态
        var isAuthorized = localStorage.getItem('isAuthorized') === 'true';

        if (isAuthorized) {
            // 如果已经验证过，则直接跳转到拷贝漫画的页面
            redirectToLink(link);
        } else {
            document.getElementById('myModal').style.display = 'block';
        }
    }
    
    // 关闭弹窗
    function closeModal() {
        document.getElementById('myModal').style.display = 'none';
    }

// 检查授权
function checkAuthorization() {
    var userCode = document.getElementById('userCode').value;

    // 如果用户没有输入授权码，显示错误消息并返回
    if (!userCode) {
        document.getElementById('message').textContent = "请先输入授权码。";
        return;
    }

    // 模拟从服务器获取授权码列表
    fetch('https://cloud.zhaifu.eu.org/DataLayout/Concise/authorization.html')
        .then(response => response.text())
        .then(data => {
            var authorizationCodes = data.split('\n');

            // 检查用户输入的授权码是否在列表中
            if (authorizationCodes.includes(userCode)) {
                // 如果授权码正确，关闭弹窗
                closeModal();

                // 将验证状态存储到 localStorage
                localStorage.setItem('isAuthorized', 'true');

                // 从 localStorage 获取链接
                var link = localStorage.getItem('link');

                // 跳转到指定链接
                redirectToLink(link);
            } else {
                // 如果授权码不正确，显示错误消息
                document.getElementById('message').textContent = "授权码不正确，请重新输入。";
            }
        });
}


    // 跳转到指定链接
    function redirectToLink(link) {
        if (window.opener) {
            window.opener.location.href = link + "?timestamp=" + Date.now(); // 添加时间戳
        } else {
            window.location.href = link;
        }
        
    }


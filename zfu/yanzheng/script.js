
    // 检查localStorage中是否已经有验证状态
    if (localStorage.getItem('isAuthorized') === 'true' && window.location.href.includes("yanzheng/index.html")) {
        // 如果已经验证过且是验证页，则直接跳转到拷贝漫画的页面
        window.location.href = "https://copymanga.site/";
    }

    function checkAuthorization() {
        // 获取用户输入的授权码
        var userCode = document.getElementById('userCode').value;

        // 模拟从服务器获取授权码列表
        fetch('https://cloud.zhaifu.eu.org/DataLayout/Concise/authorization.html')
            .then(response => response.text())
            .then(data => {
                // 将数据分割成一个数组，每个授权码是一个元素
                var authorizationCodes = data.split('\n');

                // 检查用户输入的授权码是否在列表中
                if (authorizationCodes.includes(userCode)) {
                    // 如果授权码正确，将验证状态存储到localStorage
                    localStorage.setItem('isAuthorized', 'true');

                    // 如果是通过点击拷贝漫画触发的验证，则跳转到拷贝漫画的页面
                    if (window.location.href.includes("yanzheng/index.html")) {
                        window.location.href = "https://copymanga.site/?timestamp=" + Date.now(); // 添加时间戳
                    } else {
                        // 否则，跳转到另一个页面
                        window.location.href = "https://cloud.zhaifu.eu.org/DataLayout/Concise/authorization.html";
                    }
                } else {
                    // 如果授权码不正确，显示错误消息
                    document.getElementById('message').textContent = "授权码不正确，请重新输入。";
                }
            });
    }


    // 弹窗显示控制
function openModal() {
    document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

// 检查授权
function checkAuthorization() {
    var userCode = document.getElementById('userCode').value;

    // 模拟从服务器获取授权码列表
    fetch('https://cloud.zhaifu.eu.org/DataLayout/Concise/authorization.html')
        .then(response => response.text())
        .then(data => {
            var authorizationCodes = data.split('\n');

            // 检查用户输入的授权码是否在列表中
            if (authorizationCodes.includes(userCode)) {
                // 如果授权码正确，关闭弹窗
                closeModal();

                // 如果是通过点击拷贝漫画触发的验证，则跳转到拷贝漫画的页面
                if (window.opener) {
                    window.opener.location.href = "https://copymanga.site/?timestamp=" + Date.now(); // 添加时间戳
                } else {
                    // 否则，跳转到另一个页面
                    window.location.href = "https://cloud.zhaifu.eu.org/DataLayout/Concise/authorization.html";
                }
            } else {
                // 如果授权码不正确，显示错误消息
                document.getElementById('message').textContent = "授权码不正确，请重新输入。";
            }
        });
}

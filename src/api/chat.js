import request from '@/utils/request.js'


let stompClient = null;
let username = null;

function connect() {
    username = document.getElementById('name').value.trim();
    if (username) {
        let socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
    } else {
        alert("请输入用户名");
    }
}

function onConnected() {
    // 订阅公共消息
    stompClient.subscribe('/topic/messages', onMessageReceived);
    
    // 发送加入消息
    stompClient.send("/app/chat", {}, JSON.stringify({
        from: username,
        text: username + ' 加入了聊天室'
    }));

    // 显示聊天页面
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('chat-page').style.display = 'block';
}

function onError(error) {
    alert('连接失败，请重试');
}

function send() {
    let messageContent = document.getElementById('message').value.trim();
    if (messageContent && stompClient) {
        let chatMessage = {
            from: username,
            text: messageContent
        };
        stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
        document.getElementById('message').value = '';
    }
}

function onMessageReceived(payload) {
    let message = JSON.parse(payload.body);
    let messageElement = document.createElement('div');
    messageElement.textContent = message.from + ': ' + message.text;
    document.getElementById('message-container').appendChild(messageElement);
}

<template>
    <div class="containers">
        <div class="shell">
            <div class="container a-container" id="a-container">
                <form action="" method="" class="form" id="a-form" @submit.prevent="register">
                    <h2 class="form_title title">创建账号</h2>
                    <input type="text" class="form_input" placeholder="Name">
                    <input type="password" class="form_input" placeholder="Password">
                    <input type="password" class="form_input" placeholder="Confirm Password">
                    <button class="form_button button submit" type="submit">注册</button>
                </form>
                <a-link :hoverable="false" @click="() => { $router.push('/') }">
                    <span style="color: #a0a5a8;">返回主页</span>
                </a-link>
            </div>

            <div class="container b-container" id="b-container">
                <form action="" method="" class="form" id="b-form" @submit.prevent="login">
                    <h2 class="form_title title">登入账号</h2>
                    <input type="text" class="form_input" placeholder="Name">
                    <input type="password" class="form_input" placeholder="Password">
                    <button class="form_button button submit" type="submit">登录</button>
                </form>
                <a-link :hoverable="false" @click="() => { $router.push('/') }">
                    <span style="color: #a0a5a8;">返回主页</span>
                </a-link>
            </div>

            <div class="switch" id="switch-cnt">
                <div class="switch_circle"></div>
                <div class="switch_circle switch_circle-t"></div>
                <div class="switch_container" id="switch-c1">
                    <h2 class="switch_title title" style="letter-spacing: 0;">Welcome Back！</h2>
                    <p class="switch_description description">已经有账号了嘛，去登入账号来进入奇妙世界吧！！！</p>
                    <button class="switch_button button switch-btn">去登录</button>
                </div>

                <div class="switch_container is-hidden" id="switch-c2">
                    <h2 class="switch_title title" style="letter-spacing: 0;">Hello Friend！</h2>
                    <p class="switch_description description">去注册一个账号，成为尊贵的粉丝会员，让我们踏入奇妙的旅途！</p>
                    <button class="switch_button button switch-btn">去注册</button>
                </div>
            </div>
        </div>
    </div>

</template>


<script setup lang='ts'>
import { Message } from '@arco-design/web-vue';
import { onMounted } from 'vue';
import axios from 'axios';
const BACKEND_URL = 'https://zinwaa.space/api';
onMounted(() => {
    let switchCtn = document.querySelector("#switch-cnt") as HTMLElement;
    let switchC1 = document.querySelector("#switch-c1") as HTMLElement;
    let switchC2 = document.querySelector("#switch-c2") as HTMLElement;
    let switchCircle = document.querySelectorAll(".switch_circle") as NodeListOf<HTMLElement>;
    let switchBtn = document.querySelectorAll(".switch-btn") as NodeListOf<HTMLElement>;
    let aContainer = document.querySelector("#a-container") as HTMLElement;
    let bContainer = document.querySelector("#b-container") as HTMLElement;

    let changeForm = () => {
        // 修改类名
        switchCtn?.classList.add("is-gx");
        setTimeout(function () {
            switchCtn?.classList.remove("is-gx");
        }, 1500)
        switchCtn?.classList.toggle("is-txr");
        switchCircle[0].classList.toggle("is-txr");
        switchCircle[1].classList.toggle("is-txr");

        switchC1?.classList.toggle("is-hidden");
        switchC2?.classList.toggle("is-hidden");
        aContainer?.classList.toggle("is-txl");
        bContainer?.classList.toggle("is-txl");
        bContainer?.classList.toggle("is-z");
    }
    // 点击切换
    let shell = () => {
        for (var i = 0; i < switchBtn.length; i++)
            switchBtn[i].addEventListener("click", changeForm)
    }
    shell()
})

interface reaponse {
    message: string,
    status: boolean
    username: string | null
}

//登录api
const loginApi = async (username: string, password: string) => {
    try {
        const loginData = { username, password };
        const reaponse: reaponse = (await axios.post(`${BACKEND_URL}/login`, loginData)).data;
        // 登录成功
        if (reaponse.status) {
            tips('success', reaponse.message);
            reaponse.username && sessionStorage.setItem('username', reaponse.username);
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        } else {
            console.log(reaponse.message);
            tips('warning', reaponse.message);
        }
    } catch (error) {
        console.log(error);
        tips('warning', '服务器打盹了，请稍后重试或联系管理员');
    }
}
// 注册api
const registerApi = async (username: string, password: string) => {
    try {
        const registerData = { username, password };
        const reaponse: reaponse = (await axios.post(`${BACKEND_URL}/register`, registerData)).data;

        tips('success', reaponse.message);

    } catch (error) {
        console.log(error);
        tips('warning', '服务器打盹了，请稍后重试或联系管理员');
    }
}
// 注册
const register = (e: Event) => {
    if (e.target) {
        const username = ((e.target as HTMLFormElement)[0] as HTMLInputElement).value;
        const password = ((e.target as HTMLFormElement)[1] as HTMLInputElement).value;
        const confirmPassword = ((e.target as HTMLFormElement)[2] as HTMLInputElement).value;
        if (username && password && confirmPassword) {
            if (password !== confirmPassword) tips('warning', '两次密码输入不一致');
            else registerApi(username, password);
        } else tips('warning', '请输入必填字段');
    }
}
// 登录
const login = (e: Event) => {
    if (e.target) {
        const username = ((e.target as HTMLFormElement)[0] as HTMLInputElement).value;
        const password = ((e.target as HTMLFormElement)[1] as HTMLInputElement).value;
        if (username && password) {
            // 登录
            loginApi(username, password);
        } else {
            tips('warning', '请输入必填字段');
        }
    }
}


//tips
const tips = (status: 'success' | 'warning', message = '') => {
    switch (status) {
        case 'success':
            Message.success({
                content: message || '成功生成',
                position: "top",
            })
            break;
        case 'warning':
            Message.warning({
                content: message || '请输入必填字段',
                position: "top",
            })
            break;
    }
}
</script>


<style scoped>
.containers {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    background-color: #ecf0f3;
    color: #a0a5a8;
}

.shell {
    position: relative;
    width: 1000px;
    min-width: 1000px;
    min-height: 600px;
    height: 600px;
    padding: 25px;
    background-color: #ecf0f3;
    box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
    border-radius: 12px;
    overflow: hidden;
}

/* 设置响应式 */
@media (max-width: 1200px) {
    .shell {
        transform: scale(0.7);
    }
}

@media (max-width: 1000px) {
    .shell {
        transform: scale(0.6);
    }
}

@media (max-width: 800px) {
    .shell {
        transform: scale(0.5);
    }
}

@media (max-width: 600px) {
    .shell {
        transform: scale(0.4);
    }
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 600px;
    height: 100%;
    padding: 25px;
    background-color: #ecf0f3;
    transition: 1.25s;
}

.form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.iconfont {
    margin: 0 5px;
    border: rgba(0, 0, 0, 0.5) 2px solid;
    border-radius: 50%;
    font-size: 25px;
    padding: 3px;
    opacity: 0.5;
    transition: 0.1s;
}

.iconfont:hover {
    opacity: 1;
    transition: 0.15s;
    cursor: pointer;
}

.form_input {
    width: 350px;
    height: 40px;
    margin: 4px 0;
    padding-left: 25px;
    font-size: 13px;
    letter-spacing: 0.15px;
    border: none;
    outline: none;
    background-color: #ecf0f3;
    transition: 0.25s ease;
    border-radius: 8px;
    box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}

.form_input:focus {
    box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
}

.form_span {
    margin-top: 30px;
    margin-bottom: 12px;
}

.form_link {
    color: #181818;
    font-size: 15px;
    margin-top: 25px;
    border-bottom: 1px solid #a0a5a8;
    line-height: 2;
}

.title {
    font-size: 34px;
    font-weight: 700;
    line-height: 3;
    color: #181818;
    letter-spacing: 10px;
}

.description {
    font-size: 14px;
    letter-spacing: 0.25px;
    text-align: center;
    line-height: 1.6;
}

.button {
    width: 180px;
    height: 50px;
    border-radius: 25px;
    margin-top: 50px;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1.15px;
    background-color: #4B70E2;
    color: #f9f9f9;
    box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
    border: none;
    outline: none;
}

.a-container {
    z-index: 100;
    left: calc(100% - 600px);
}

.b-container {
    left: calc(100% - 600px);
    z-index: 0;
}

.switch {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 400px;
    padding: 50px;
    z-index: 200;
    transition: 1.25s;
    background-color: #ecf0f3;
    overflow: hidden;
    box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #d1d9e6;
}

.switch_circle {
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background-color: #ecf0f3;
    box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
    bottom: -60%;
    left: -60%;
    transition: 1.25s;
}

.switch_circle-t {
    top: -30%;
    left: 60%;
    width: 300px;
    height: 300px;
}

.switch_container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    width: 400px;
    padding: 50px 55px;
    transition: 1.25s;
}

.switch_button {
    cursor: pointer;
}

.switch_button:hover,
.submit:hover {
    box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
    transform: scale(0.985);
    transition: 0.25s;
}

.switch_button:active,
.switch_button:focus {
    box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
    transform: scale(0.97);
    transition: 0.25s;
}

.is-txr {
    left: calc(100% - 400px);
    transition: 1.25s;
    transform-origin: left;
}

.is-txl {
    left: 0;
    transition: 1.25s;
    transform-origin: right;
}

.is-z {
    z-index: 200;
    transition: 1.25s;
}

.is-hidden {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    transition: 1.25s;
}

.is-gx {
    animation: is-gx 1.25s;
}

@keyframes is-gx {

    0%,
    10%,
    100% {
        width: 400px;
    }

    30%,
    50% {
        width: 500px;
    }
}
</style>
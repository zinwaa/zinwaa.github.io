<template>
    <div class="container" :style="{ transform: `scale(${props.size / 100})` }">
        <div class="ghost">
            <!-- 身体部分 -->
            <div class="body">
                <div class="face">
                    <div class="eye left"></div>
                    <div class="eye right"></div>
                    <div class="smile"></div>
                    <!-- 腮红 -->
                    <div class="rosy left"></div>
                    <div class="rosy right"></div>
                </div>
                <!-- 手臂 -->
                <div class="arm left"></div>
                <div class="arm right"></div>
                <!-- 尾部 -->
                <div class="bottom">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
        <!-- 影子 -->
        <div class="shadow"></div>
    </div>

</template>


<script setup lang='ts'>
const props = defineProps({
    size: {
        type: Number,
        required: false,
        default: 100,
        validator(value: number) {
            return value > 0 && value <= 100; // 验证值是否在0到100之间
        }
    }
});
</script>


<style scoped>
.container {
    /* 使可爱鬼居中 */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 160px;
}

.ghost {
    position: relative;
    height: 100%;
    width: 100%;
}

.body {
    /* 制作身体 */
    position: relative;
    width: 100%;
    height: 100%;
    border-top-right-radius: 80px;
    border-top-left-radius: 80px;
    background-color: #fff;
    animation: float 4s ease infinite;
}

@keyframes float {

    0%,
    100% {
        top: 0px;
    }

    40% {
        top: -40px;
    }
}

.face {
    display: flex;
    flex-wrap: wrap;
    position: absolute;
    top: 67px;
    left: 40px;
    width: 72px;
    height: 41px;
}

.eye {
    width: 20px;
    height: 20px;
    background-color: #000;
    border-radius: 100%;
}

.eye.left {
    margin-right: 32px;
}

.smile {
    width: 32px;
    height: 16px;
    background-color: #000;
    margin-top: 6px;
    margin-left: 20px;
    border-bottom-left-radius: 16px 12px;
    border-bottom-right-radius: 16px 12px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}

.rosy {
    position: absolute;
    top: 28px;
    width: 22px;
    height: 8px;
    background-color: #FFAA9E;
    border-radius: 100%;
}

.rosy.left {
    left: -6px;
    transform: rotate(-8deg);
}

.rosy.right {
    right: -6px;
    transform: rotate(8deg);
}

.arm {
    position: absolute;
    top: 136px;
    width: 60px;
    height: 40px;
    background-color: #fff;
}

.arm.left {
    left: -4px;
    border-radius: 60% 100%;
    animation: arms-left 4s ease infinite;
}

.arm.right {
    right: -65px;
    border-radius: 100% 60%;
    animation: arms-right 4s ease infinite;
}

@keyframes arms-left {

    0%,
    100% {
        transform: translate(-50%, -50%) rotate(50deg);
    }

    40% {
        transform: translate(-50%, -50%) rotate(40deg);
    }
}

@keyframes arms-right {

    0%,
    100% {
        transform: translate(-50%, -50%) rotate(-50deg);
    }

    40% {
        transform: translate(-50%, -50%) rotate(-40deg);
    }
}

.bottom {
    display: flex;
    position: absolute;
    top: 100%;
    left: 0px;
    right: -1px;
}

.bottom div {
    flex-grow: 1;
    position: relative;
    top: -14px;
    height: 28px;
    border-radius: 100%;
    background-color: #fff;
}

.bottom div:nth-child(2n) {
    top: -10px;
    margin: 0 -2px;
    background-color: transparent;
    border-top: 10px solid #fff;
}

.shadow {
    position: absolute;
    bottom: -100px;
    left: 50%;
    width: 200px;
    height: 12px;
    border-radius: 100%;
    background-color: gray;
    animation: shadow 4s ease infinite;
}

@keyframes shadow {

    0%,
    100% {
        transform: translateX(-50%) scale(1);
    }

    40% {
        transform: translateX(-50%) scale(0.5);
    }
}
</style>
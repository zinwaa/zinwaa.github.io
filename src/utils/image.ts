// 获取图片静态资源
export const getAssetsFile = (url: string) => {
    return new URL(`../assets/img/${url}`, import.meta.url).href
}
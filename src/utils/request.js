import store from "@/store";
const baseURL = "https://test-chatbot.hasmash.com";

export const service = (options) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseURL + options.url,
            method: options.method || "GET",
            data: options.data || {},
            header: {
                "content-type": options.method === "GET" ?
                    "application/json" :
                    "application/x-www-form-urlencoded",
                Authorization: store.state.vuex_token,
                "wx-code": store.state.vuex_code,
            },
            success: ({ data: res }) => {
                resolve(res);
            },
            fail: (err) => {
                reject(err);
            },
        });
    });
};
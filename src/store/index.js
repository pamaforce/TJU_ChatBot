import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

let lifeData = {};

try {
    lifeData = uni.getStorageSync("lifeData");
} catch (e) {}

let saveStateKeys = [
    "vuex_user",
    "vuex_token",
    "vuex_code",
    "vuex_conversation_id",
];

const saveLifeData = function(key, value) {
    if (saveStateKeys.indexOf(key) != -1) {
        let tmp = uni.getStorageSync("lifeData");
        tmp = tmp ? tmp : {};
        tmp[key] = value;
        uni.setStorageSync("lifeData", tmp);
    }
};
const store = new Vuex.Store({
    state: {
        vuex_user: lifeData.vuex_user ? lifeData.vuex_user : {},
        vuex_token: lifeData.vuex_token ? lifeData.vuex_token : "",
        vuex_code: lifeData.vuex_code ? lifeData.vuex_code : "",
        vuex_conversation_id: lifeData.vuex_conversation_id ?
            lifeData.vuex_conversation_id :
            "",
    },
    mutations: {
        $uStore(state, payload) {
            let nameArr = payload.name.split(".");
            let saveKey = "";
            let len = nameArr.length;
            if (nameArr.length >= 2) {
                let obj = state[nameArr[0]];
                for (let i = 1; i < len - 1; i++) {
                    obj = obj[nameArr[i]];
                }
                obj[nameArr[len - 1]] = payload.value;
                saveKey = nameArr[0];
            } else {
                state[payload.name] = payload.value;
                saveKey = payload.name;
            }
            saveLifeData(saveKey, state[saveKey]);
        },
    },
});

export default store;
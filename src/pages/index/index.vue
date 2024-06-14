<template>
  <view class="content">
    <u-navbar
      title="天大校务ChatBot"
      :placeholder="true"
      :leftIcon="null"
      titleStyle="font-weight:700"
      bgColor="#f6f7f9"
    >
      <template slot="left">
        <image
          src="../../static/menu.svg"
          class="historyIcon"
          @click="toHistory"
        />
      </template>
    </u-navbar>
    <image src="../../static/logo.png" class="background" />
    <view class="bottom">
      <scroll-view
        :scroll-y="true"
        class="dialog"
        :enhanced="true"
        :show-scrollbar="true"
        :refresher-enabled="true"
        :scroll-top="scrollTop"
        :scroll-with-animation="true"
        @refresherrefresh="refresherrefresh"
        @refresherrestore="refresherrestore"
        @refresherabort="refresherabort"
        :refresher-triggered="refresherTriggered"
      >
        <view class="dialogs">
          <view
            v-for="(item, i) in dialogList"
            :key="i"
            :class="'dialog' + item.type"
            ><text :selectable="true">{{ item.content }}</text></view
          >
        </view>
      </scroll-view>
      <u-input
        :placeholder="loading ? '小天正在回答中……' : '请输入您的问题'"
        :customStyle="sendInput"
        confirmType="send"
        v-model="ques"
        @confirm="toSend"
        :adjustPosition="true"
        :holdKeyboard="true"
        :confirmHold="true"
      >
        <template slot="suffix">
          <div class="loader" v-if="loading">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
          <image
            src="../../static/send.svg"
            class="sendIcon"
            v-else
            @click="toSend"
          />
        </template>
      </u-input>
    </view>
    <u-action-sheet
      :actions="list"
      :show="show"
      safeAreaInsetBottom
      closeOnClickAction
      :round="12"
      @select="select"
      @close="() => (show = false)"
    ></u-action-sheet>
  </view>
</template>

<script>
import { getConversation, search } from "../../api/index";
export default {
  data() {
    return {
      ques: "",
      limit: false,
      loading: false,
      scrollTop: 999999,
      refresherTriggered: false,
      _refresherTriggered: false,
      list: [
        {
          id: 0,
          name: "新建会话",
          subname: "重置小天的上下文~",
          color: "#097efb",
        },
        {
          id: 1,
          name: "历史记录",
          subname: "即将得到支持~",
          color: "#097efb",
        },
        {
          id: 2,
          name: "问题反馈",
          subname: "帮助小天变得更好~",
          color: "#097efb",
        },
        {
          id: 3,
          name: "关于我们",
          subname: "我们在努力~",
          color: "#097efb",
        },
      ],
      show: false,
      dialogList: [
        {
          type: 0,
          content: "Hi，我是智慧校务助手小天，快来问我校务问题吧！",
        },
      ],
      sendInput: {
        boxSizing: "border-box",
        width: "680rpx",
        height: "100rpx",
        background: "#ffffff",
        borderRadius: "15px",
        fontSize: "34rpx",
        padding: "0 30rpx",
        flex: "unset",
      },
      marginBottom: 0,
    };
  },
  onLoad() {
    uni.onKeyboardHeightChange((res) => {
      this.marginBottom = res.height;
    });
    uni.login({
      provider: "weixin",
      success: async (res) => {
        this.code = res.code;
        this.$u.vuex("vuex_code", res.code);
      },
    });
    if (this.vuex_conversation_id) {
      getConversation(this.vuex_conversation_id).then((res) => {
        if (res && res.errcode === 0) {
          this.dialogList = [
            {
              type: 0,
              content: "Hi，我是智慧校务助手小天，快来问我校务问题吧！",
            },
          ];
          res.data.map((item) => {
            this.dialogList.push({
              type: 1,
              content: item.content.question,
            });
            this.dialogList.push({
              type: 0,
              content: item.content.answer,
            });
          });
          if (this.limit) {
            this.dialogList.push({
              type: 3,
              content: "对话轮次已达上限，继续发送信息以开始新的对话",
            });
          }
          setTimeout(() => {
            this.scrollTop = 999995;
          }, 20);
        }
      });
    }
  },
  methods: {
    select(index) {
      console.log(index);
      switch (index.id) {
        case 0:
          this.limit = false;
          this.$u.vuex("vuex_conversation_id", "");
          this.dialogList = [
            {
              type: 0,
              content: "Hi，我是智慧校务助手小天，快来问我校务问题吧！",
            },
          ];
          break;
        case 2:
          uni.navigateTo({ url: "/pages/advise/advise" });
          break;
        case 3:
          uni.navigateTo({ url: "/pages/about/about" });
          break;

        default:
          break;
      }
    },
    refresherrefresh() {
      if (this._refresherTriggered) {
        return;
      }
      this._refresherTriggered = true;
      if (!this.refresherTriggered) {
        this.refresherTriggered = true;
      }
      this.loadStoreData();
    },
    refresherrestore() {
      this.refresherTriggered = false;
      this._refresherTriggered = false;
    },
    refresherabort() {
      this.refresherTriggered = false;
      this._refresherTriggered = false;
    },
    loadStoreData() {
      getConversation(this.vuex_conversation_id)
        .then((res) => {
          if (res && res.errcode === 0) {
            this.dialogList = [
              {
                type: 0,
                content: "Hi，我是智慧校务助手小天，快来问我校务问题吧！",
              },
            ];
            res.data.map((item) => {
              this.dialogList.push({
                type: 1,
                content: item.content.question,
              });
              this.dialogList.push({
                type: 0,
                content: item.content.answer,
              });
            });
            if (this.limit) {
              this.dialogList.push({
                type: 3,
                content: "对话轮次已达上限，继续发送信息以开始新的对话",
              });
            }
          }
        })
        .finally(() => {
          this.refresherTriggered = false;
          this._refresherTriggered = false;
        });
    },
    toHistory() {
      if (this.loading) return;
      this.show = true;
      //uni.navigateTo({ url: "/pages/history/history" });
    },
    toSend() {
      let content = this.ques.trim();
      if (this.loading || content === "") return;
      if (this.limit) {
        this.$u.vuex("vuex_conversation_id", "");
        this.limit = false;
        this.dialogList = [
          {
            type: 0,
            content: "Hi，我是智慧校务助手小天，快来问我校务问题吧！",
          },
        ];
      }
      uni.login({
        provider: "weixin",
        success: (x) => {
          this.code = x.code;
          this.$u.vuex("vuex_code", x.code);
          this.dialogList.push({
            type: 1,
            content: content,
          });
          setTimeout(() => {
            this.scrollTop = 999998;
          }, 20);
          this.ques = "";
          this.loading = true;
          search({
            conversation_id: this.vuex_conversation_id,
            question: content,
          })
            .then((res) => {
              if (res && res.errcode === 0) {
                this.$u.vuex("vuex_conversation_id", res.data.conversation_id);
                this.$u.vuex("vuex_token", res.data.token);
                this.dialogList.push({
                  type: 0,
                  content: res.data.answer,
                });
              } else if (res && res.errcode === -2) {
                this.limit = true;
                this.dialogList.push({
                  type: 3,
                  content: "对话轮次已达上限，继续发送信息以开始新的对话",
                });
              } else {
                this.dialogList.push({
                  type: 2,
                  content: "回答出错了",
                });
              }
            })
            .catch(() => {
              this.dialogList.push({
                type: 2,
                content: "回答出错了",
              });
            })
            .finally(() => {
              setTimeout(() => {
                this.scrollTop = 999997;
              }, 20);
              this.loading = false;
            });
        },
      });
    },
  },
};
</script>

<style scoped>
.content {
  background-color: #f6f7f9;
  height: 100vh;
}
.bottom {
  position: fixed;
  bottom: calc(60rpx + constant(safe-area-inset-bottom));
  bottom: calc(60rpx + env(safe-area-inset-bottom));
  height: calc(100vh - 60rpx - constant(safe-area-inset-bottom));
  height: calc(100vh - 60rpx - env(safe-area-inset-bottom));
  width: 750rpx;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
}
.background {
  position: absolute;
  left: -180rpx;
  top: 266rpx;
  width: 724rpx;
  height: 726rpx;
}
.sendIcon {
  width: 36rpx;
  height: 34rpx;
}
.loader {
  display: flex;
  align-items: center;
}
.bar {
  display: inline-block;
  width: 6rpx;
  height: 16rpx;
  background-color: #097efba3;
  border-radius: 20rpx;
  animation: scale-up4 1s linear infinite;
}

.bar:nth-child(2) {
  height: 34rpx;
  margin: 0 6rpx;
  animation-delay: 0.25s;
}

.bar:nth-child(3) {
  animation-delay: 0.5s;
}

@keyframes scale-up4 {
  20% {
    background-color: #097cfb;
    transform: scaleY(1.5);
  }

  40% {
    transform: scaleY(1);
  }
}
.dialog {
  position: relative;
  width: 750rpx;
  height: calc(100% - constant(safe-area-inset-bottom) - 60rpx - 120rpx - 44px);
  height: calc(100% - env(safe-area-inset-bottom) - 60rpx - 120rpx - 44px);
  margin-bottom: 30rpx;
  overflow: auto;
  padding-top: 30rpx;
}
.dialogs {
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.historyIcon {
  width: 36rpx;
  height: 36rpx;
}
.dialog0 {
  background-color: white;
  border-radius: 30rpx 30rpx 30rpx 6rpx;
  padding: 30rpx 40rpx;
  width: 480rpx;
  color: #3f414e;
  margin: 35rpx;
  font-size: 28rpx;
  box-sizing: border-box;
  margin-left: -480rpx;
  animation: responseAni 0.5s cubic-bezier(0, 0.73, 0, 0.97);
  animation-fill-mode: forwards;
}
.dialog1 {
  background-color: #097cfb;
  border-radius: 30rpx 30rpx 6rpx 30rpx;
  padding: 30rpx 40rpx;
  width: 480rpx;
  margin: 35rpx;
  font-size: 28rpx;
  color: white;
  align-self: flex-end;
  box-sizing: border-box;
  margin-right: 0rpx;
  animation: requestAni 0.5s cubic-bezier(0, 0.73, 0, 0.97);
  animation-fill-mode: forwards;
}
.dialog2 {
  background-color: white;
  border-radius: 30rpx 30rpx 30rpx 6rpx;
  padding: 30rpx 40rpx;
  width: 480rpx;
  color: #ff3b30;
  margin: 35rpx;
  font-size: 28rpx;
  box-sizing: border-box;
  margin-left: -480rpx;
  animation: responseAni 0.5s cubic-bezier(0, 0.73, 0, 0.97);
  animation-fill-mode: forwards;
}
.dialog3 {
  width: 680rpx;
  color: #097cfb;
  font-size: 22rpx;
  margin: 0 35rpx;
  box-sizing: border-box;
  text-align: center;
}
@keyframes responseAni {
  0% {
    margin-left: -480rpx;
  }
  100% {
    margin-left: 35rpx;
  }
}
@keyframes requestAni {
  0% {
    margin-right: -480rpx;
  }
  100% {
    margin-right: 35rpx;
  }
}
</style>

<template>
  <view class="content">
    <u-navbar
      title="历史记录"
      :placeholder="true"
      :leftIcon="null"
      titleStyle="font-weight:700"
      bgColor="#f6f7f9"
    >
      <template slot="left">
        <image src="../../static/back.svg" class="backIcon" @click="toBack" />
      </template>
    </u-navbar>
    <scroll-view
      :scroll-y="true"
      :enable-flex="true"
      class="dialog"
      :show-scrollbar="true"
      :refresher-enabled="true"
      :scroll-top="scrollTop"
      :scroll-with-animation="true"
      @refresherrefresh="refresherrefresh"
      @refresherrestore="refresherrestore"
      @refresherabort="refresherabort"
      :refresher-triggered="refresherTriggered"
    >
      <view>用户Code：</view>
      <text :selectable="true">{{ vuex_user.code }}</text>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      ques: "",
      loading: false,
      scrollTop: 999999,
      refresherTriggered: false,
      _refresherTriggered: false,
      dialogList: [
        {
          type: true,
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
      console.log(res.height);
    });
  },
  methods: {
    // 自定义下拉刷新被触发
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
      setTimeout(() => {
        this.refresherTriggered = false;
        this._refresherTriggered = false;
      }, 1200);
    },
    toBack() {
      uni.navigateBack();
    },
  },
};
</script>

<style scoped>
.content {
  background-color: #f6f7f9;
  height: 100vh;
}
.backIcon {
  width: 36rpx;
  height: 36rpx;
}
.dialog {
  position: relative;
  width: 750rpx;
  height: calc(100% - constant(safe-area-inset-bottom) - 44px);
  height: calc(100% - env(safe-area-inset-bottom) - 44px);
  overflow: auto;
  padding-top: 30rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

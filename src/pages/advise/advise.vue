<template>
  <view class="content">
    <u-navbar
      title="问题反馈"
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
      <view class="text"
        >感谢您对产品质量的关注，您暂时可以通过直接添加微信的方式进行反馈哦！</view
      >
      <image show-menu-by-longpress src="../../static/qrcode.png" class="code" />
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      refresherTriggered: false,
      _refresherTriggered: false,
    };
  },
  onLoad() {},
  methods: {
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
.text {
  margin-top: 40rpx;
  width: 600rpx;
  font-size: 30rpx;
  line-height: 40rpx;
  color: #333333;
  text-align: center;
}
.code {
  width: 600rpx;
  height: 600rpx;
  margin-top: 30rpx;
}
</style>

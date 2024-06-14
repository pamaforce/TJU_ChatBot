<template>
  <view class="content">
    <u-navbar
      title="关于我们"
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
      <image src="../../static/photo.png"  show-menu-by-longpress  class="code" />
      <text selectable class="text">校务ChatBot</text>
      <text selectable class="text text-2"
        >开发主创团队：哈希碰撞科技的小伙伴</text
      >
      <text selectable class="text"
        >哈希碰撞科技是一家由天大在校生创办的立足于AI的科技团队，一群有梦想的年轻人想要用技术做一些不一样的事情。团队致力于成为从天大校内走出的一流科技公司。</text
      >
      <text selectable class="text"
        >ChatBot不止于ChatGPT的AI算法，更利用了数十万记的天大历史数据用于ChatBot的模型训练。让ChatBot脱胎于GPT变成了一个“懂天大”的AI。</text
      >
      <text selectable class="text"
        >这背后是针对GPT技术的私域数据化，意味着我们不只有调用GPT接口的能力，更能利用个人数据、私有数据训练、打造个人化的ChatGPT。</text
      >
      <text selectable class="text"
        >谨以此致谢，感谢哈希碰撞每一位一起奋斗过，付出过的小伙伴，以下排名不分先后：</text
      >
      <text selectable class="text text-2">核心代码开发团队：</text>
      <text selectable class="text text-2"
        >范致远 张芊 刘宏伟 王新阳 李垚臻 唐颂 刘岳森 刘涵 朱千帆 赵子熹 李波</text
      >
      <text selectable class="text text-2">并感谢为团队付出的全部成员：</text>
      <text selectable class="text text-2 text-3"
        >张中天 陈浩宇 刘子瑄 田若禹 崔骏 卢嘉源 任鹏惠 罗雅琪 朱梓铭 魏天予 王晓薇 董铖莉 许鼎汉 龙进洋 张诗韵 黄萧桐 李雨霄 姜昭君 马鑫 祁泽涛 何洋 张靖 张翘楚 冯敬茗 张瑞桓 傅心雨 覃乐 杨若钊</text
      >
      <view class="block"
        >
        </view
      >
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
  height: calc(100% - constant(safe-area-inset-bottom) - 44px - 30px);
  height: calc(100% - env(safe-area-inset-bottom) - 44px - 30px);
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.text {

  margin-top: 36rpx;
  width: 680rpx;
  font-size: 30rpx;
  line-height: 46rpx;
  color: #333333;
}
.text-2 {
  margin-top: 0;
}
.text-3 {
  margin-bottom: 40rpx;
}
.code {
  flex-shrink: 0;
  width: 680rpx;
  height: 453rpx;
}
.block{
  width: 200rpx;
  height: 60rpx;
}
</style>

<template>
  <view>
    <u-tabbar
      :value="current ? current : 0"
      @change="tabbarChange"
      :fixed="true"
      :placeholder="true"
      :safeAreaInsetBottom="true"
    >
      <u-tabbar-item text="星球" icon="home"></u-tabbar-item>
      <u-tabbar-item text="商城" icon="shopping-cart"></u-tabbar-item>
      <u-tabbar-item text="我的" icon="account"></u-tabbar-item>
    </u-tabbar>
  </view>
</template>

<script>
export default {
  props: {
    current: Number,
  },
  data() {
    return {
      list: [
        { path: "pages/index/index" },
        { path: "pages/shop/shop" },
        { path: "pages/user/user" },
      ],
    };
  },
  methods: {
    tabbarChange(e) {
      uni.switchTab({
        url: "/" + this.list[e].path,
      });
    },
  },
};
</script>
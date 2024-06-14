<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "uview-ui/index.scss";
</style>
<script>
export default {
  onLaunch: function () {
    uni.hideTabBar();
  },
  onShow: function () {
    uni.hideTabBar();
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
.u-input__content__subfix-icon {
  width: 36rpx;
  height: 34rpx;
}
.u-navbar__content__left view {
  width: 36rpx;
  height: 36rpx;
}
</style>

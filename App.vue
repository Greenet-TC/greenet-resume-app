<script>
export default {
  onLaunch: async function () {
    const login_res = await login();
    await wxLogin(login_res);
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
</style>

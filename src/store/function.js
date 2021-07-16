export default {
  install(Vue, options) {
    //测试
    Vue.prototype.$msg = function () {
      this.$message({
        showClose: true,
        type: 'success',
        message: '修改状态成功'
      });
    },
      Vue.prototype.$msgs = function (Code, msg) {
        // 成功
        if (Code == 0) {
          this.$message({
            showClose: true,
            message: msg,
            type: 'success'
          });
          return false
        }
        // 成功
        if (Code == 1) {
          this.$message({
            showClose: true,
            message: msg,
            type: 'warning'
          });
          return false
        }
        // 成功
        if (Code == 2) {
          this.$message({
            showClose: true,
            message: msg,
            type: 'error'
          });
          return false
        }
        // 成功
        if (Code == 4 || Code == '') {
          this.$message({
            showClose: true,
            message: msg,
          });
          return false
        }

      },
      // 有在使用
      Vue.prototype.$msgnow = function (code, msg) {
        this.$message({
          showClose: true,
          type: code,
          message: msg
        });
      },
      // 有在使用
      // 封装右侧消息提示
      Vue.prototype.$look = function (success, msg1, msg) {
        this.$notify({
          title: msg1,
          message: msg,
          type: success,
        });
      }

    // this.$msgnow('success','请输入完整')
    // this.$msgnow('warning','请输入完整')
    // this.$msgnow('error','请输入完整')

  }
}
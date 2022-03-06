<template>
  <div class="empower">
    <div class="empower-wrap">
      <div class="wrap-form">
        <el-form :model="formData" ref="empower" label-width="80px">
          <el-form-item
            prop="userName"
            label="用户名"
            :rules="{ required: true, message: '请输入用户名', trigger: 'blur' }"
          >
            <el-input v-model="formData.userName"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            :rules="{ required: true, message: '请输入密码', trigger: 'blur' }"
          >
            <el-input v-model="formData.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
          </el-form-item>
        </el-form>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'Empower',
  data() {
    return {
      formData: {
        password: '',
        userName: ''
      }
    }
  },
  created() {},
  methods: {
    submitForm() {
      this.$refs.empower.validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.empower {
  width: 100%;
  height: 100%;
  background: url('../../assets/images/login-bg.jpg') center center no-repeat;
  background-size: 100% 100%;
  .empower-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 9;
    width: 500px;
    transform: translate(-50%, -50%);
    .wrap-form {
      width: 100%;
      padding: 50px 30px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }
  }
}
</style>

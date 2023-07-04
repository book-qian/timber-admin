<!--
 * @Author: yangyongqian
 * @Date: 2023-07-01 17:34:46
 * @Description:登录组件
-->
<template>
  <div>
    <Particles id="tsparticles" :options="options" />

    <div class="form-container">
      <h3>企业门户网站管理系统</h3>
      <div class="login-form">
        <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="loginRules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="loginForm.username" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="loginForm.password" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup name="Login">
import axios from 'axios'
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'

const loginForm = reactive({
  username: '',
  password: ''
})

const loginFormRef = ref()

const loginRules = reactive({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur',
    },
  ]
})
const router = useRouter()
const submitForm = () => {
  loginFormRef.value.validate((valid) => {
    if (valid) {
      console.log(loginForm)
      localStorage.setItem('token', 'yyq');
      axios.get('/users').then(res => {
        console.log('res=', res)
      })
      router.push('/index')
    }
  })
}


// particles 配置
const options = {
  background: {
    color: {
      value: '#2d3a4b'
    }
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push'
      },
      onHover: {
        enable: true,
        mode: 'repulse'
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: '#ffffff'
    },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1
    },
    collisions: {
      enable: true
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'bounce'
      },
      random: false,
      speed: 6,
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: 'circle'
    },
    size: {
      value: { min: 1, max: 5 },
    }
  },
  detectRetina: true
}
</script>

<style lang="scss" scoped>
.form-container {
  width: 500px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba($color: #000000, $alpha: .5);
  text-align: center;
  padding: 20px;
  border-radius: 10px;

  .login-form {
    display: flex;
    align-items: center;
    height: calc(100% - 42px);

    .el-form {
      flex: 1;
    }
  }

  h3 {
    font-size: 30px;
    margin-bottom: 20px;
    color: white;
  }
}

::v-deep .el-form-item__label {
  color: white;
}
</style>


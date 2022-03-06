<template>
  <div class="global-header">
    <div class="header-left">
      <a-button shape="round" @click="toggleCollapse">
        <icon-menu-unfold v-if="collapsed" />
        <icon-menu-fold v-else />
      </a-button>
      <!-- <a-breadcrumb :style="{ marginLeft: '20px' }">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb> -->
    </div>
    <div class="header-right">
      <a-dropdown trigger="hover" position="br">
        <div class="right-info">
          <a-avatar :size="36">
            <img :src="userInfo.avatar" alt="头像" />
          </a-avatar>
          <div class="info-detail">
            <div class="detail-name">{{ userInfo.name }}</div>
            <div class="detail-unit">{{ userInfo.organization_name }}</div>
          </div>
        </div>
        <template #content>
          <a-doption v-if="userInfo.is_admin != 1" style="width: 110px" @click="openPersonalInfo">
            <template #icon>
              <icon-settings />
            </template>
            个人信息
          </a-doption>
          <a-doption @click="logoutSubmit">
            <template #icon>
              <icon-export />
            </template>
            退出登录
          </a-doption>
        </template>
      </a-dropdown>
    </div>

  </div>
</template>

<script>

export default {
  name: 'GlobalHeader',
  data() {
    return {
      userInfo: {}, // 个人信息
      collapsed: false, // 是否折叠
      memberDetail: {
        visible: false,
        id: ''
      }
    }
  },
  created() {

  },
  methods: {
    openPersonalInfo() {
      this.memberDetail.visible = true
      this.memberDetail.id = this.userInfo.id
    },
    closeDialog() {
      this.memberDetail.visible = false
    },
    // 折叠展开导航栏
    toggleCollapse() {
      this.collapsed = !this.collapsed
      this.emit('COLLAPSE_EVENT')
    },
    // 退出登录
    logoutSubmit() {
      global.$modal.warning({
        title: '提示',
        content: '确定要退出登录？',
        closable: true,
        onOk: () => {
          // store
          //   .dispatch('Logout')
          //   .then(() => {
          //     window.location.href = '/'
          //   })
          //   .catch(() => {
          //     window.location.href = '/'
          //   })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// .global-header {
//   .flex_vertical_center_horizontal_between();
//   width: 100%;
//   height: 100%;
//   padding: 0 24px;

//   .header-right {
//     height: 100%;
//     .right-info {
//       height: 100%;
//       .flex_vertical_center();

//       .info-detail {
//         padding-left: 10px;
//         text-align: right;
//         cursor: pointer;
//         .detail-name {
//           height: 20px;
//           line-height: 20px;
//           margin-bottom: 2px;
//           font-size: 14px;
//           color: #333;
//         }
//         .detail-unit {
//           height: 16px;
//           line-height: 16px;
//           font-size: 12px;
//           color: #999;
//           // border: 1px solid #165DFF;
//         }
//       }
//     }
//   }
// }
</style>

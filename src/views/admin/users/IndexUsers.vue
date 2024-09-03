<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

// stores
const router = useRouter()
const userStore = useUserStore()

// lifecycle
onMounted(async () => {
  await userStore.getUsers()
})

// functions
const toNew = () => {
  router.push({ name: 'admin_users_new', params: {} })
}
const toDetail = (iid: number) => {
  router.push({ name: 'admin_users_detail', params: { id: iid } })
}
</script>

<template>
  <div class="container main">
    <div class="py-2 ope">
      <button type="button" class="btn btn-outline-primary" @click="toNew">
        <i class="bi bi-person-plus-fill display-6"></i>
      </button>
    </div>

    <div class="body">
      <div class="row g-2 frame">
        <div
          class="col-12 col-sm-6 col-md-4 list"
          v-for="(item, index) in userStore.users"
          :key="index"
        >
          <div class="px-3 py-3 list__item" @click="toDetail(item.id)">
            <div class="list__item--name">{{ item.familyname }} {{ item.firstname }}</div>
            <div class="list__item--email">{{ item.email }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  min-height: 100vh;
  color: var(--bs-body-color);
  background-color: var(--bs-body-bg);

  .users_title {
    position: relative;

    &_text {
      position: absolute;
      left: 20px;
      bottom: 0;
    }
  }

  .ope {
    button {
      background-color: var(--bs-secondary-bg);
    }
  }

  .body {
    max-height: 600px;
    overflow-x: hidden;
    overflow-y: auto;

    .frame {
      .list {
        &__item {
          display: block;
          // flex-flow: row wrap;
          // justify-content: space-between;
          // align-items: flex-start;

          background-color: var(--bs-secondary-bg);

          &--name {
            font-size: 1rem;
            font-weight: bold;

            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
          }

          &--email {
            font-size: 1rem;
            font-weight: bold;

            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>

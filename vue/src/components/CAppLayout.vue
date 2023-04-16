<script setup lang="ts">
import { useStore } from "@/utils/store";
import { logout } from "@common/ts/api/logout";
import CButton from "./CButton.vue";
import CMainMenu from "./CMainMenu.vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const doLogout = () => {
  logout();
  store.isLoggedIn.value = false;
  router.push({ name: "login" });
};

const links = [
  { href: import.meta.env.VITE_BACKEND_URL, name: "Backend" },
  { href: import.meta.env.VITE_VUE_APP_URL, name: "Vue", current: true },
  { href: import.meta.env.VITE_SOLID_APP_URL, name: "Solid JS" },
  { href: import.meta.env.VITE_SVELTE_APP_URL, name: "Svelte" },
];
</script>

<template>
  <div class="app-layout">
    <div class="app-layout-header">
      <h1 class="app-layout-header-app-name">Thessenger</h1>

      {{ store.userName.value }}

      <c-button class="app-layout-header-sign-out" @click="doLogout">
        Odhlásit se
      </c-button>
    </div>
    <div class="app-layout-sidebar">
      <c-main-menu />
    </div>
    <div class="app-layout-content">
      <router-view></router-view>
    </div>
    <div class="app-layout-footer">
      <div class="app-layout-footer-links">
        <template v-for="link in links">
          <span v-if="link.current" class="current-app">
            {{ link.name }}
          </span>
          <a v-else :href="link.href" target="_blank" class="link">
            {{ link.name }}
          </a>
        </template>
      </div>
      <span class="app-layout-footer-footnote">
        Diplomová práce Davida Hrůzy
      </span>
    </div>
  </div>
</template>

<style scoped></style>

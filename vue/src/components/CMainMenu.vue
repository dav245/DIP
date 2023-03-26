<script lang="ts" setup>
import { getMainMenu, MainMenu } from "@common/ts/api/mainMenu";
import CLink from "./CLink.vue";
import { ref, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { checkNewMessages } from "@common/ts/api/checkNewMessages";
import { useStore } from "@/utils/store";

const route = useRoute();

const mainMenus = ref<MainMenu[]>(getMainMenu());

const store = useStore();

let timeoutId: NodeJS.Timeout | null = null;

const refreshUnreadMessages = async () => {
  const response = await checkNewMessages();
  store.menuNewMessages.value = response?.numberOfNewMessages ?? 0;
  timeoutId = setTimeout(refreshUnreadMessages, 1000 * 60);
};

refreshUnreadMessages();

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId);
});
</script>

<template>
  <nav>
    <ul class="main-menu">
      <li v-for="mainMenu in mainMenus">
        <c-link
          :to="{ name: mainMenu.routeName }"
          class="main-menu-item"
          :class="{
            'main-menu-item__active': route.name === mainMenu.routeName,
          }"
        >
          {{ mainMenu.name }}
          <span
            v-if="mainMenu.routeName === 'inbox' && store.menuNewMessages.value"
            class="menu-badge"
          >
            {{ store.menuNewMessages }}
          </span>
        </c-link>
      </li>
    </ul>
  </nav>
</template>

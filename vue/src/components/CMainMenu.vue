<script lang="ts" setup>
import { getMainMenu, MainMenu } from "@common/ts/api/mainMenu";
import CLink from "./CLink.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const mainMenus = ref<MainMenu[]>(getMainMenu());
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
        </c-link>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { MainMenu } from "@common/ts/api/mainMenu";
import CLink from "./CLink.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const mainMenus = ref<MainMenu[]>([
  { name: "Domů", routeName: "home" },
  { name: "Přijaté zprávy", routeName: "inbox" },
  { name: "Odeslané zprávy", routeName: "outbox" },
  { name: "Koš", routeName: "trash" },
]);
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

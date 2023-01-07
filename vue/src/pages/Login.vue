<script setup lang="ts">
import CForm from "@/components/CForm.vue";
import CCard from "@/components/CCard.vue";
import CInput from "@/components/CInput.vue";
import CLink from "@/components/CLink.vue";
import CButton from "@/components/CButton.vue";
import { ref } from "vue";
import { login, LoginPayload } from "@common/ts/api/login";
import { useRouter } from "vue-router";
import { useStore } from "@/utils/store";

const form = ref<LoginPayload>({
  nickname: "",
  password: "",
  device_name: "vue",
});

const store = useStore();
const router = useRouter();

const submit = async () => {
  const response = await login(form.value);

  if (response) {
    store.isLoggedIn.value = true;
    router.push({ name: "home" });
  }
};
</script>

<template>
  <c-card title="Přihlášení do systému Thessenger">
    <c-form :submit="submit">
      <div class="login-form">
        <c-input
          v-model:value="form.nickname"
          required
          label="Přezdívka"
          name="nickname"
        />
        <c-input
          v-model:value="form.password"
          required
          label="Heslo"
          name="password"
          type="password"
        />
      </div>

      <div class="login-submit-wrapper">
        <c-link :to="{ name: 'register' }">
          Nemáte ještě účet? Registrujte se!
        </c-link>
        <c-button color="success" class="login-submit">Přihlásit se</c-button>
      </div>
    </c-form>
  </c-card>
</template>

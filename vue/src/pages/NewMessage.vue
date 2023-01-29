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
    router.push({ name: "newMessage" });
  }
};
</script>

<template>
  <c-card title="Naspat novou zprávu">
    <c-form :submit="submit">
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
        type="textarea"
      />
    </c-form>
  </c-card>
</template>

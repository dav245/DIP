<script setup lang="ts">
import CForm from "@/components/CForm.vue";
import CCard from "@/components/CCard.vue";
import CInput from "@/components/CInput.vue";
import CLink from "@/components/CLink.vue";
import CButton from "@/components/CButton.vue";
import { ref } from "vue";
import { register, RegisterPayload } from "@common/ts/api/register";
import { passwordConfirmRule } from "@common/ts/validation/passwordConfirm";
import { getPasswordRules } from "@common/ts/validation/password";
import { useRouter } from "vue-router";
import { useStore } from "@/utils/store";

const form = ref<RegisterPayload>({
  nickname: "",
  password: "",
  device_name: "vue",
});

const passwordConfirm = ref("");

const store = useStore();
const router = useRouter();

const submit = async () => {
  const response = await register(form.value);

  if (response) {
    store.isLoggedIn.value = true;
    router.push({ name: "newMessage" });
  }
};
</script>

<template>
  <c-card title="Registrace do systému Thessenger">
    <c-form :submit="submit">
      <div class="register-form">
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
          validation-mode="eager"
          :rules="[
            passwordConfirmRule(() => passwordConfirm),
            ...getPasswordRules(),
          ]"
        />
        <c-input
          v-model:value="passwordConfirm"
          required
          label="Potvrzení hesla"
          name="password_confirmation"
          type="password"
          :rules="[passwordConfirmRule(() => form.password)]"
        />
      </div>

      <div class="register-submit-wrapper">
        <c-link :to="{ name: 'login' }"> Přejít na přihlášení </c-link>
        <c-button color="success" class="register-submit">
          Registrovat se
        </c-button>
      </div>
    </c-form>
  </c-card>
</template>

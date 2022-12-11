<script setup lang="ts">
import CForm from "@/components/CForm.vue";
import CCard from "@/components/CCard.vue";
import CInput from "@/components/CInput.vue";
import CButton from "@/components/CButton.vue";
import { getEmail } from "@/common/ts/validation/email";
</script>

<template>
  <c-card title="Přihlášení do systému Thessenger">
    <c-form>
      <div class="login-form">
        <c-input
          required
          label="E-mail"
          name="email"
          type="email"
          :rules="[getEmail()]"
        />
        <c-input required label="Heslo" name="password" type="password" />
      </div>

      <c-button color="success" class="login-submit">Přihlásit se</c-button>
    </c-form>
  </c-card>
</template>

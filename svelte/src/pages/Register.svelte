<script setup lang="ts">
  import { navigateTo } from "svelte-router-spa";
  import CForm from "@/components/CForm.svelte";
  import CCard from "@/components/CCard.svelte";
  import CInput from "@/components/CInput.svelte";
  import CLink from "@/components/CLink.svelte";
  import CButton from "@/components/CButton.svelte";
  import { register, type RegisterPayload } from "@common/ts/api/register";
  import { passwordConfirmRule } from "@common/ts/validation/passwordConfirm";
  import { getPasswordRules } from "@common/ts/validation/password";
  import { useStore } from "@/utils/store";
  import { ignoreUnusedRouteInfo } from "@/utils/router";
  import type { RouteProps } from "svelte-router-spa/types/components/route";

  export let params: RouteProps["params"];
  export let currentRoute: RouteProps["currentRoute"];

  ignoreUnusedRouteInfo(currentRoute, params);

  const form: RegisterPayload = {
    nickname: "",
    password: "",
    device_name: "vue",
  };

  let passwordConfirm = "";

  const store = useStore();

  const submit = async () => {
    const response = await register(form);

    if (response) {
      store.isLoggedIn.set(true);
      navigateTo("new-message");
    }
  };
</script>

<CCard title="Registrace do systému Thessenger">
  <CForm {submit}>
    <div class="register-form">
      <CInput
        bind:value={form.nickname}
        required
        label="Přezdívka"
        name="nickname"
      />
      <CInput
        bind:value={form.password}
        required
        label="Heslo"
        name="password"
        type="password"
        validationMode="eager"
        rules={[
          passwordConfirmRule(() => passwordConfirm),
          ...getPasswordRules(),
        ]}
      />
      <CInput
        bind:value={passwordConfirm}
        required
        label="Potvrzení hesla"
        name="password_confirmation"
        type="password"
        rules={[passwordConfirmRule(() => form.password)]}
      />
    </div>

    <div class="register-submit-wrapper">
      <CLink to="/login">Přejít na přihlášení</CLink>
      <CButton color="success" class="register-submit">Registrovat se</CButton>
    </div>
  </CForm>
</CCard>

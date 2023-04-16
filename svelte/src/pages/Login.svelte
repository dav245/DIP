<script lang="ts">
  import { navigateTo } from "svelte-router-spa";
  import CForm from "@/components/CForm.svelte";
  import CCard from "@/components/CCard.svelte";
  import CInput from "@/components/CInput.svelte";
  import CLink from "@/components/CLink.svelte";
  import CButton from "@/components/CButton.svelte";
  import { login, type LoginPayload } from "@common/ts/api/login";
  import { useStore } from "@/utils/store";
  import { ignoreUnusedRouteInfo } from "@/utils/router";
  import type { RouteProps } from "svelte-router-spa/types/components/route";

  export let params: RouteProps["params"];
  export let currentRoute: RouteProps["currentRoute"];

  ignoreUnusedRouteInfo(currentRoute, params);

  const form: LoginPayload = {
    nickname: "",
    password: "",
    device_name: "vue",
  };

  const store = useStore();

  const submit = async () => {
    const response = await login(form);

    if (response) {
      store.isLoggedIn.set(true);
      navigateTo("new-message");
    }
  };
</script>

<CCard title="Přihlášení do systému Thessenger">
  <CForm {submit}>
    <div class="login-form">
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
      />
    </div>

    <div class="login-submit-wrapper">
      <CLink to="/register">Nemáte ještě účet? Registrujte se!</CLink>
      <CButton color="success" class="login-submit">Přihlásit se</CButton>
    </div>
  </CForm>
</CCard>

import CForm from "@/components/CForm";
import CCard from "@/components/CCard";
import CInput from "@/components/CInput";
import CLink from "@/components/CLink";
import CButton from "@/components/CButton";
import CGuestLayout from "@/components/CGuestLayout";
import { login } from "@common/ts/api/login";
import { useStore } from "@/utils/store";
import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";


const Login: Component = () => {
  const [nickname, setNickname] = createSignal('');
  const [password, setPassword] = createSignal('');


  const store = useStore();
  const navigate = useNavigate();

  const submit = async () => {
    const response = await login({
      device_name: 'solid',
      nickname: nickname(),
      password: password()
    });

    if (response) {
      store.setIsLoggedIn(true);
      navigate('/new-message');
    }
  };

  return (
    <CGuestLayout>
      <CCard title="Přihlášení do systému Thessenger">
        <CForm submit={submit}>
          <div class="login-form">
            <CInput
              value={nickname()}
              updateValue={setNickname}
              required
              label="Přezdívka"
              name="nickname"
            />
            <CInput
              value={password()}
              updateValue={setPassword}
              required
              label="Heslo"
              name="password"
              type="password"
            />
          </div>

          <div class="login-submit-wrapper">
            <CLink to={'/register'}>
              Nemáte ještě účet? Registrujte se!
            </CLink>
            <CButton color="success" class="login-submit">Přihlásit se</CButton>
          </div>
        </CForm>
      </CCard>
    </CGuestLayout>
  )
}

export default Login;

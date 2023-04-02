
import CForm from "@/components/CForm";
import CCard from "@/components/CCard";
import CInput from "@/components/CInput";
import CLink from "@/components/CLink";
import CButton from "@/components/CButton";
import CGuestLayout from "@c/CGuestLayout";
import { register } from "@common/ts/api/register";
import { passwordConfirmRule } from "@common/ts/validation/passwordConfirm";
import { getPasswordRules } from "@common/ts/validation/password";
import { useStore } from "@/utils/store";
import { Component, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";

const Register: Component = () => {
  const [nickname, setNickname] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [passwordConfirm, setPasswordConfirm] = createSignal('');

  const store = useStore();
  const navigate = useNavigate();

  const submit = async () => {
    const response = await register({
      device_name: 'solid',
      nickname: nickname(),
      password: password(),
    });

    if (response) {
      store.setIsLoggedIn(true);
      navigate('/new-message');
    }
  };

  return (
    <CGuestLayout>
      <CCard title="Registrace do systému Thessenger">
        <CForm submit={submit}>
          <div class="register-form">
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
              validation-mode="eager"
              rules={[
                passwordConfirmRule(passwordConfirm),
                ...getPasswordRules(),
              ]}
            />
            <CInput
              value={passwordConfirm()}
              updateValue={setPasswordConfirm}
              required
              label="Potvrzení hesla"
              name="password_confirmation"
              type="password"
              rules={[passwordConfirmRule(password)]}
            />
          </div>

          <div class="register-submit-wrapper">
            <CLink to={'/'}> Přejít na přihlášení </CLink>
            <CButton color="success" class="register-submit">
              Registrovat se
            </CButton>
          </div>
        </CForm>
      </CCard>
    </CGuestLayout>
  )
}

export default Register;
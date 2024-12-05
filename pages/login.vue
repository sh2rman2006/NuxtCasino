<script setup>
import axios from "axios";

axios.defaults.baseURL = `http://localhost:8080`;
axios.defaults.withCredentials = true;

useSeoMeta({
  title: `Войти`,
});
definePageMeta({
  layout: ``,
});

const inputUsername = ref(``);
const inputPassword = ref(``);

const responseMessage = ref(``);
const submitLogin = async () => {
  if (inputUsername.value.length == 0 || inputPassword.value.length == 0) {
    return;
  }
  await getCsrfToken();
  await axios
    .post(
      `/user/login`,
      {
        username: inputUsername.value,
        password: inputPassword.value,
      },
      {
        headers: { "X-XSRF-TOKEN": csrfToken.value },
      }
    )
    .then((response) => {
      sessionStorage.setItem("Bearer", response.data.token);
      responseMessage.value = `Вы успешно вошли!!!`;
    })
    .catch((e) => {
      if (e.response.status == 401) {
        responseMessage.value = `Неудалось войти в аккаунт`;
      }
    });
};

const csrfToken = ref(``);
const getCsrfToken = async () => {
  let response = await axios.get(`/csrf`);
  csrfToken.value = response.data.token;
};

const passwordEye = ref(`material-symbols-light:visibility-rounded`);
const passwordType = ref(`password`);
const togglePasswordType = () => {
  passwordType.value = passwordType.value == `password` ? `text` : `password`;
  passwordEye.value =
    passwordType.value == `password`
      ? `material-symbols-light:visibility-rounded`
      : `material-symbols-light:visibility-off-rounded`;
};
</script>

<template>
  <div class="loginPage">
    <div class="modal__box">
      <header>
        Войти
        <NuxtLink to="/">
          <Icon
            name="line-md:close"
            class="close-icon"
            size="0.9em"
            style="color: white"
          />
        </NuxtLink>
      </header>
      <form @submit.prevent="submitLogin">
        <input
          type="text"
          class="form-control"
          required
          placeholder="username"
          v-model.trim="inputUsername"
        />
        <div class="password__input">
          <input
            :type="passwordType"
            class="form-control"
            required
            placeholder="password"
            v-model.trim="inputPassword"
          />
          <Icon :name="passwordEye" size="2em" @click="togglePasswordType" />
        </div>
        <button type="submit" class="btn btn-secondary">Отправить</button>
      </form>
      <div class="response" v-if="responseMessage">
        {{ responseMessage }}
      </div>
      <div class="change__way">
        <NuxtLink class="btn" to="/registration">Регистрация</NuxtLink>
        <NuxtLink class="btn">Забыли пароль?</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loginPage {
  min-height: 100vh;
  background: url("/public/BackgroundLogin.svg") fixed center/cover;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.modal__box {
  margin: 30px;
  padding: 45px;
  border-radius: 20px;
  backdrop-filter: blur(7px);
  box-shadow: 7px 7px 15px rgba(0, 0, 0, 1);
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  gap: 10px;
}

.close-icon {
  transition: 0.6s;

  &:hover {
    transform: rotate(180deg);
  }
}

form {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.password__input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
}

.form-control {
  border: none;
  transition: 0.3s;

  &:focus {
    box-shadow: 0 0 10px rgba(255, 255, 255, 1);
  }
}

.response {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  color: white;
}

.change__way {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.change__way .btn {
  cursor: pointer;
  color: white;
  transition: 0.2s;

  &:hover {
    transform: translateY(2px);
  }
}
</style>

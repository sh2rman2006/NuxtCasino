<script setup>
useSeoMeta({
  title: `Войти`,
});

definePageMeta({
  layout: ``,
});

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
      <form>
        <input
          type="text"
          class="form-control"
          required
          placeholder="username"
        />
        <input type="email" class="form-control" required placeholder="email" />
        <div class="password__input">
          <input
            :type="passwordType"
            class="form-control"
            required
            placeholder="password"
          />
          <Icon :name="passwordEye" size="2em" @click="togglePasswordType" />
        </div>
        <button class="btn btn-secondary">Отправить</button>
      </form>
      <div class="change__way"></div>
    </div>
  </div>
</template>

<style scoped>
.loginPage {
  min-height: 100vh;
  background: url("/assets/BackgroundLogin.svg") fixed center/cover;
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
</style>

<script setup>
import axios from "axios";

axios.defaults.baseURL = `http://localhost:8080`;
axios.defaults.withCredentials = true;

useSeoMeta({
  title: `Монетка`,
});

const csrfToken = ref(``);
const getCsrfToken = async () => {
  let response = await axios.get(`/csrf`);
  csrfToken.value = response.data.token;
};
</script>

<template>
  <main>
    <div class="sidebar">
      <div class="container">
        <h2>Орёл или решка</h2>
        <select class="form-control">
          <option value="орёл">Орёл</option>
          <option value="решка">Решка</option>
        </select>
      </div>
    </div>
  </main>
</template>

<style scoped>
.sidebar {
  position: fixed;
  right: 0;
  height: 100%;
  width: 30%;
  overflow-y: auto;
  background-color: #0f1444;
  color: white;
}

.form-control {
  margin-top: 15px;
  border: none;
  transition: 0.3s;

  &:focus {
    box-shadow: 0 0 10px rgba(255, 255, 255, 1);
  }
}
</style>

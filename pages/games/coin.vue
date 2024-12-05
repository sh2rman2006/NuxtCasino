<script setup>
import axios from "axios";

axios.defaults.baseURL = `http://localhost:8080`;
axios.defaults.withCredentials = true;

useSeoMeta({
  title: `Монетка`,
});

const inputChoose = ref(`1`);
const inputBetAmount = ref(``);

const csrfToken = ref(``);
const getCsrfToken = async () => {
  let response = await axios.get(`/csrf`);
  csrfToken.value = response.data.token;
};

const storyOfCoin = reactive([]);
const getGameStory = async () => {
  let jwtToken = sessionStorage.getItem(`Bearer`);
  if (jwtToken) {
    let response = await axios.get(`/games/story/getByGameName/Coin`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    storyOfCoin.splice(0, storyOfCoin.length, ...response.data);
  } else {
    return;
  }
};
onMounted(getGameStory);

const balance = ref(``);
const getBalance = async () => {
  let jwtToken = sessionStorage.getItem(`Bearer`);
  if (jwtToken) {
    let response = await axios.get(`/user/balance`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    balance.value = response.data;
  } else {
    return;
  }
};
onMounted(getBalance);

const isValid = ref(true);
watch(inputBetAmount, (newValue) => {
  isValid.value = /^[0-9]*(\.[0-9]*)?$/.test(newValue);
  if (newValue[-1] == `.`) {
    isValid.value = false;
  }
});


</script>

<template>
  <main>
    <div class="sidebar">
      <section>
        <div class="container">
          <form>
            <h2>Орёл или решка</h2>
            <select class="form-control" v-model="inputChoose">
              <option value="1">Орёл</option>
              <option value="2">Решка</option>
            </select>
            <label>
              <span>Сумма ставки:</span>
              <input
                type="text"
                v-model.trim="inputBetAmount"
                class="form-control"
                placeholder="Введите сумму"
              />
              <span v-if="!isValid" style="color: red; font-size: 20px"
                >Такое значение недопустимо!!!</span
              >
            </label>
            <div class="balance" v-if="balance">
              Ваш баланс: <span>{{ balance }}₽</span>
            </div>
            <div class="NotAuth" v-else>Вы не авторизованы!!!</div>
            <button type="submit" class="btn btn-secondary">Отправить</button>
          </form>
        </div>
      </section>
      <section class="history">
        <div class="container">
          <h2 class="text-center">История монетки</h2>
          <div class="cards-container">
            <CardStory
              v-for="gameData in storyOfCoin"
              :gameData="gameData"
              :key="gameData.id"
            >
            </CardStory>
          </div>
        </div>
      </section>
    </div>
    <!--  -->
    
  </main>
</template>

<style scoped>
.sidebar {
  position: fixed;
  right: 0;
  height: 100%;
  width: 30%;
  overflow-y: auto;
  background-color: #38464c;
  color: white;
}

h2 {
  margin-top: 15px;
  color: white;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-control {
  margin-top: 15px;
  border: none;
  transition: 0.2s;

  &:focus {
    box-shadow: 0 0 10px rgba(255, 255, 255, 1);
  }
}

.balance {
  font-size: 20px;
}

.balance span {
  color: lightgreen;
}

.NotAuth {
  font-size: 25px;
  color: red;
}

label {
  margin-top: 15px;
}

.history {
  padding-bottom: 100px;
}

.cards-container {
  margin-top: 15px;
}
</style>

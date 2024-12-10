<script setup>
import axios from "axios";

axios.defaults.baseURL = `http://localhost:8080`;
axios.defaults.withCredentials = true;

useSeoMeta({
  title: `История`,
});

const storyOfCoin = reactive([]);
const isStoryEmpty = ref(false);
const getGameStory = async () => {
  let jwtToken = sessionStorage.getItem(`Bearer`);
  if (jwtToken) {
    try {
      let response = await axios.get(`/games/story/getAll`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      storyOfCoin.splice(0, storyOfCoin.length, ...response.data);
      isStoryEmpty.value = false;
    } catch (error) {
      if (error.response.status === 404) {
        isStoryEmpty.value = true;
      }
    }
  } else {
    return;
  }
};
onMounted(getGameStory);

const inputGame = ref(``);
const inputWinOrLoose = ref(``);
const inputCoinSide = ref(``);
const filtertViewer = computed(() => {
  if (inputGame.value == `Coin`) {
    if (inputWinOrLoose.value === `true`) {
      return storyOfCoin.filter(
        (el) =>
          el.gameName == `Coin` &&
          el.coinSide.includes(inputCoinSide.value) &&
          el.winner == true
      );
    }
    if (inputWinOrLoose.value === `false`) {
      return storyOfCoin.filter(
        (el) =>
          el.gameName == `Coin` &&
          el.coinSide.includes(inputCoinSide.value) &&
          el.winner == false
      );
    }
    return storyOfCoin.filter(
      (el) => el.gameName == `Coin` && el.coinSide.includes(inputCoinSide.value)
    );
  } else {
    if (inputWinOrLoose.value) {
      return storyOfCoin.filter(
        (el) =>
          el.gameName.includes(inputGame.value) &&
          el.winner == (inputWinOrLoose.value === `true` ? true : false)
      );
    } else {
      return storyOfCoin.filter((el) => el.gameName.includes(inputGame.value));
    }
  }
});
</script>

<template>
  <div class="sidebar">
    <div class="select">
      <label>
        <h2>Игра</h2>
        <select class="form-control" v-model="inputGame">
          <option value="">Все</option>
          <option value="Coin">Монетка</option>
          <option value="Rocket">Ракетка</option>
        </select>
      </label>

      <label v-if="inputGame === `Coin`">
        <h2>Орёл или решка</h2>
        <select class="form-control" v-model="inputCoinSide">
          <option value="">Все</option>
          <option value="Орёл">Орёл</option>
          <option value="Решка">Решка</option>
        </select>
      </label>

      <label>
        <h2>Победа или поражение</h2>
        <select class="form-control" v-model="inputWinOrLoose">
          <option value="">Все</option>
          <option value="true">Победа</option>
          <option value="false">Поражение</option>
        </select>
      </label>
    </div>
  </div>
  <main>
    <div class="container" v-if="!isStoryEmpty">
      <div class="row">
        <div class="col" v-for="info in filtertViewer">
          <CardStory class="history-card" :gameData="info"></CardStory>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: #393d48;
  min-height: 100vh;
  width: 70%;
  padding-top: 15px;
}

.col {
  display: flex;
  justify-content: center;
}

.history-card {
  transition: 0.3s;
  width: 18rem;

  &:hover {
    transform: scale(1.02);
  }
}
/*  */
.sidebar {
  position: fixed;
  right: 0;
  height: 100%;
  width: 30%;
  overflow-y: auto;
  background-color: #38464c;
  color: white;
}

.select {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>

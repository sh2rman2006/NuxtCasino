<script setup>
import axios from "axios";

axios.defaults.baseURL = `http://localhost:8080`;
axios.defaults.withCredentials = true;

useSeoMeta({
  title: `История`,
});

const storyAll = reactive([]);
const getGameStory = async () => {
  let jwtToken = sessionStorage.getItem(`Bearer`);
  if (jwtToken) {
    let response = await axios.get(`/games/story/getAll`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    storyAll.splice(0, storyAll.length, ...response.data);
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
      return storyAll.filter(
        (el) =>
          el.gameName == `Coin` &&
          el.coinSide.includes(inputCoinSide.value) &&
          el.winner == true
      );
    }
    if (inputWinOrLoose.value === `false`) {
      return storyAll.filter(
        (el) =>
          el.gameName == `Coin` &&
          el.coinSide.includes(inputCoinSide.value) &&
          el.winner == false
      );
    }
    return storyAll.filter(
      (el) => el.gameName == `Coin` && el.coinSide.includes(inputCoinSide.value)
    );
  } else {
    if (inputWinOrLoose.value) {
      return storyAll.filter(
        (el) =>
          el.gameName.includes(inputGame.value) &&
          el.winner == (inputWinOrLoose.value === `true` ? true : false)
      );
    } else {
      return storyAll.filter((el) => el.gameName.includes(inputGame.value));
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
      <h2 v-if="storyAll.length > 0">Количество: {{ filtertViewer.length }}</h2>
    </div>
  </div>
  <main>
    <div class="container" v-if="storyAll.length > 0">
      <div class="row">
        <div class="col" v-for="info in filtertViewer">
          <CardStory class="history-card" :gameData="info"></CardStory>
        </div>
      </div>
    </div>
    <div class="notPlayed" v-if="storyAll.length == 0">
      <h1 style="color: white">
        Вы еще не играли <Icon name="ic:baseline-casino" size="1.5em" />
      </h1>
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

.notPlayed {
  display: flex;
  justify-content: center;
  width: 70%;
  height: 100vh;
}

.notPlayed h1 {
  display: flex;
  align-items: center;
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

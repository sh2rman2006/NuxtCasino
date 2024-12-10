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
</script>

<template>
  <main>
    <div class="container" v-if="!isStoryEmpty">
      <div class="row">
        <div class="col" v-for="info in storyOfCoin">
          <CardStory :gameData="info"></CardStory>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: #393d48;
  min-height: 100vh;
}
</style>

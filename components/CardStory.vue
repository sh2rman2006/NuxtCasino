<script setup>
defineProps({
  gameData: {
    type: Object,
    required: true,
  },
});

const formatDate = (currentDate) => {
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const seconds = String(currentDate.getSeconds()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
};
</script>

<template>
  <div class="card mb-3 bg-success" v-if="gameData.winner">
    <div class="card-body">
      <h5 class="card-title">История игры</h5>
      <ul class="list-group list-group-flush">
        <li class="list-group-item bg-success">
          Дата: {{ formatDate(new Date(gameData.date)) }}
        </li>
        <li class="list-group-item bg-success">
          Название игры: {{ gameData.gameName }}
        </li>
        <li class="list-group-item bg-success">
          Сумма ставки: {{ gameData.betAmount }}
        </li>
        <li class="list-group-item bg-success">
          Выигрыш: {{ gameData.winAmount }}
        </li>
        <li class="list-group-item bg-success">
          Коэффициент: {{ gameData.rateCoefficient }}
        </li>
        <li class="list-group-item bg-success">Победа</li>
      </ul>
    </div>
  </div>
  <!--  -->
  <div class="card mb-3 bg-danger" v-else>
    <div class="card-body">
      <h5 class="card-title">История игры</h5>
      <ul class="list-group list-group-flush">
        <li class="list-group-item bg-danger">
          Дата: {{ formatDate(new Date(gameData.date)) }}
        </li>
        <li class="list-group-item bg-danger">
          Название игры: {{ gameData.gameName }}
        </li>
        <li class="list-group-item bg-danger">
          Сумма ставки: {{ gameData.betAmount }}
        </li>
        <li class="list-group-item bg-danger">
          Потеря: {{ gameData.winAmount }}
        </li>
        <li class="list-group-item bg-danger">
          Коэффициент: {{ gameData.rateCoefficient }}
        </li>
        <li class="list-group-item bg-danger">Поражение</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.card-title {
  color: white;
}

.bg-danger {
  color: white;
}

.bg-success {
  color: white;
}
</style>

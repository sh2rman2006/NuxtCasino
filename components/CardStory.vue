<script setup>
defineProps({
  gameData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="card mb-3 bg-success" v-if="gameData.winner">
    <div class="card-body">
      <h5 class="card-title">История игры</h5>
      <ul class="list-group list-group-flush">
        <li class="list-group-item bg-success">Дата: {{ gameData.date }}</li>
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
        <li class="list-group-item bg-danger">Дата: {{ gameData.date }}</li>
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

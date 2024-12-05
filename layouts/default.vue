<script setup></script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div class="container-fluid">
        <NuxtLink to="/" class="navbar-brand">CasinoAmira</NuxtLink>
        <img src="" alt="" />
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Переключатель навигации"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#">История</a>
            </li>

            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >Список игр</a
              >
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Монетка</a></li>
                <li><a class="dropdown-item" href="#">Ракета</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="d-flex gap-4 right-bar">
        <NuxtLink to="login" class="btn btn-secondary">Войти</NuxtLink>
        <NuxtLink to="registration" class="btn btn-primary"
          >Регистрация</NuxtLink
        >
      </div>
    </nav>
  </header>
  <slot></slot>
</template>

<style scoped>
.right-bar {
  margin-right: 20px;
}

.nav-link {
  transition: 0.3s;
  position: relative;

  &::before {
    content: "";
    background-color: white;
    height: 2px;
    width: 0;
    position: absolute;
    left: 0;
    bottom: 0;
    transition: 0.3s;
  }

  &:hover {
    color: white;
  }

  &:hover::before {
    width: 100%;
  }
}

.navbar-brand {
  color: #0d6efd;
  transition: 0.25s;

  &:hover {
    transform: scale(1.07);
  }
}
</style>

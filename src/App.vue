<script>
import { RouterLink, RouterView } from 'vue-router'

export default {

  methods: {
    goToAnotherPage(path) {

      this.$router.replace({
        path: path
      })
    }
  }
}

</script>

<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div class="container-fluid">
        <a class="navbar-brand" href="#" v-on:click="goToAnotherPage('/homepage')">Home</a>
        <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon">

          </span>
        </button>
        <div class="navbar-collapse collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#" 
              v-on:click="goToAnotherPage('/translatorList')">Translator</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#" 
              v-on:click="goToAnotherPage('/documentList')">Document</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style>

.navbar {
  background-color: #F86011 !important; 
}

@media (min-width: 768px) {

  .navbar {
    height: 55px;
  }

  .navbar-brand {
    padding-top: 2px;
  }
}
</style>

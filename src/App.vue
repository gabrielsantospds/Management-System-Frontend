<script>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <p class="brand">Management <br>System</p>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/translatorList">Translator</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/documentList">Document</RouterLink>
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
  margin-bottom: 24px
}

.container-fluid {
  margin-left: 20px;
}

.brand,
.nav-link {
  color: white;
}

.nav-link {
  border-radius: 5px;
  margin-left: 30px;
}

.nav-link:hover {
  background-color: white !important;
  color: #F86011 !important;
}

.nav-link:visited {
  color: white;
}

.brand {
  font-size: 17px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 4px;
}
</style>

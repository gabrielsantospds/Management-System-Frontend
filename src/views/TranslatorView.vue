<script>
import axios from 'axios';

export default {
  data() {
    return {
      formValidity: false,
      translator: {
        name: '',
        email: '',
        source_language: '',
        target_language: ''
      }

    }
  },
  methods: {
    async send() {
      //Fix error
      if(this.formValidity) {
        try {
          const response = await axios.post('http://localhost:8080/translator', this.translator)
          console.log(response)
          const statusCode = response.status
          if (statusCode == 201) {
            this.$router.push('/translatorsList')
          }
        } catch (error) {
          console.log(error)
        }
      }
    },
    validation() {
      const form = document.querySelector('.needs-validation')
      if(form) {
        form.addEventListener('submit', event => {
          this.formValidity = form.checkValidity
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        })
      }
    }
  },
  mounted() {
    this.validation()
  }
}

</script>

<template>
  <main class="container">
    <div class="bg-body-tertiary p-5 rounded">
      <h1>
        Management system
      </h1>

      <p class="lead">
        This example is a quick exercise to illustrate how the top-aligned navbar works
      </p>

      <form novalidate class="needs-validation" v-on:submit.prevent="send()">
        <div class="mb-3">
          <label for="input1" class="form-label">Full Name</label>
          <input type="text" required v-model="translator.name" class="form-control" id="input1" placeholder="">
          <div class="invalid-feedback">
            Please provide a valid city.
          </div>
        </div>
        <div class="mb-3">
          <label for="input2" class="form-label">Email address</label>
          <input type="email" required v-model="translator.email" class="form-control" id="input2"
            placeholder="name@example.com">
          <div class="invalid-feedback">
            Please provide a valid city.
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="input3" class="form-label">Source Language</label>
            <input type="text" required v-model="translator.source_language" class="form-control" placeholder="pt-BR"
              id="input3" aria-label="First name">
            <div class="invalid-feedback">
              Please provide a valid city.
            </div>
          </div>
          <div class="col">
            <label for="input4" class="form-label">Target Language</label>
            <input type="text" required v-model="translator.target_language" class="form-control" placeholder="es-ES"
              id="input4" aria-label="Last name">
            <div class="invalid-feedback">
              Please provide a valid city.
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </main>
</template>

<style>
.rounded {
  padding: 25px 120px 25px 120px !important;
}

h1 {
  color: #333379;
  text-align: center;
}

.lead {
  text-align: center;
}

.btn {
  margin-top: 20px;
}
</style>
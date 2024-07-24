<script>
import axios from 'axios';

export default {
  // Definition of the properties that the component can receive
  props: {
    id: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      title: '',
      subtitle: '',
      // Translator data
      translator: {
        name: '',
        email: '',
        source_language: '',
        target_language: ''
      },
      isDisabled: false
    }
  },
  // Define properties that are computed based on other data properties
  computed: {

    isEdit() {
      // The operator !! is used to convert the 'this.id' value to a boolean
      // If true, it indicates that this is the editing screen
      return !!this.id;
    }
  },
  methods: {
    async send() {
      try {
        let alertTitle = ''
        if (this.isEdit) {
          await axios.put(`http://localhost:8080/translator/${this.id}`,
            this.translator);
            alertTitle = 'Translator updated successfully'
        } else {
          await axios.post('http://localhost:8080/translator', this.translator);
          alertTitle = 'Translator saved successfully'
        }

        // Redirects to the translator list
        this.$router.push({
          path: '/translatorList',
          state: {
            savedChanges: true,
            title: alertTitle
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    validation() {
      const form = document.querySelector('.needs-validation')
      if (form) {
        // listens to submit calls and validates de form fields
        form.addEventListener('submit', async event => {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            form.classList.add('was-validated')
          } else {
            event.preventDefault()
            // Calls the data sending method
            await this.send()
          }
        })
      }
    },

    async fetchTranslator() {
      try {
        // Gets translator data by id
        const response = await axios.get(`http://localhost:8080/translator/${this.id}`)
        const translatorReturned = response.data
        this.translator = translatorReturned
      } catch (error) {
        console.log(error)
      }

    }
  },
  mounted() {
    this.validation()

  },
  created() {
    if (this.isEdit) {
      this.isDisabled = true
      this.title = 'Edit Translator'
      this.subtitle = 'It is not allowed to change an email once it has been saved. If you want, you can delete the data'
      // Calls the data fetch method during component creation
      this.fetchTranslator();
    } else {
      this.title = 'Save Translator',
      this.subtitle = 'Register to be able to save documents. You can change or remove your data later'
    }
  }
}

</script>

<template>
  <main class="container">
    <div class="bg-body-tertiary p-5 rounded">
      <h1>
        {{title}}
      </h1>

      <p class="lead">
        {{ subtitle }}
      </p>

      <!-- Form data -->
      <form novalidate class="needs-validation">
        <div class="mb-3">
          <label for="input1" class="form-label">Full Name</label>
          <input type="text" required v-model="translator.name" class="form-control" id="input1" placeholder="">
          <!-- Alert message shown if field is invalid -->
          <div class="invalid-feedback">
            Please provide a full name.
          </div>
        </div>
        <div class="mb-3">
          <label for="input2" class="form-label">Email address</label>
          <input type="email" required v-model="translator.email" class="form-control" id="input2"
            placeholder="name@example.com" :disabled="isDisabled">
          <div class="invalid-feedback">
            Please provide a valid email.
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="input3" class="form-label">Source Language</label>
            <input type="text" required v-model="translator.source_language" class="form-control"
              placeholder="Ex: pt-BR" id="input3">
            <div class="invalid-feedback">
              Please provide a language.
            </div>
          </div>
          <div class="col">
            <label for="input4" class="form-label">Target Language</label>
            <input type="text" required v-model="translator.target_language" class="form-control"
              placeholder="Ex: es-ES" id="input4">
            <div class="invalid-feedback">
              Please provide a language.
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-primary submit-btn">Submit</button>
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

.submit-btn {
  margin-top: 20px !important;
}
</style>
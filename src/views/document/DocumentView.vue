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
            hasError: false,
            // Document data
            document: {
                subject: '',
                content: '',
                locale: '',
                author: ''
            }

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
        async editDocument() {
            try {
                this.changeButtonText()
                await axios.put(`https://management-system-backend-ic3p.onrender.com/document/${this.id}`,
                    this.document);
                    
                // Redirects to the translator list
                this.$router.replace({
                    path: '/documentList',
                    state: {
                        savedChanges: true,
                        title: 'Document updated successfully'
                    }
                })
            } catch (error) {
                this.resetButtonText()
                const errorCode = error.response.status
                if (errorCode === 400) {
                    // Error code 400 means that the email sent does not exist in the database

                    // Changes the hasError value to show an alert message
                    this.hasError = true
                }
            }
        },

        async uploadDocument(file) {
            try {
                this.changeButtonText()
                const formData = new FormData()
                formData.append('file', file)
                const response = await axios.post('https://management-system-backend-ic3p.onrender.com/document', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                // Redirects to the document list
                this.$router.replace({
                    path: '/documentList',
                    state: {
                        savedChanges: true,
                        title: response.data
                    }
                })
            } catch (error) {
                this.resetButtonText()
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
                        form.querySelector(".invalid-feedback").style.display = "block"
                        form.classList.add('was-validated')
                    } else {
                        event.preventDefault()
                        // Calls the method to edit or upload document
                        if (this.isEdit) {
                            await this.editDocument()
                        } else {
                            const file = event.target.file.files[0]
                            await this.uploadDocument(file)
                        }
                    }
                })
            }
        },

        async fetchDocument() {
            try {
                // Gets document data by id
                const response = await axios.get(`https://management-system-backend-ic3p.onrender.com/document/${this.id}`)
                const documentReturned = response.data
                this.document = documentReturned
            } catch (error) {
                console.log(error)
            }

        },

        closeAlert() {
            // When the user closes the alert message returns hasError to its original value
            this.hasError = false
        },

        fileUpload(event) {
            // Validates that a file was chosen to remove invalid feedback 
            const file = event.target.files[0]
            if (file) {
                document.querySelector(".invalid-feedback").style.display = "none"
            }
        },

        changeButtonText() {
            // Change the button to let the user aware about the data being processed
            const btnElement = document.querySelector('.submit-btn')
            if (btnElement) {
                btnElement.textContent = 'Loading...'
                btnElement.disabled = true
            }
        },

        resetButtonText() {
            // Returns the button's original style in case of request failed 
            const btnElement = document.querySelector('.submit-btn')
            if (btnElement) {
                btnElement.textContent = 'Submit'
                btnElement.disabled = false
            }
        }
    },
    mounted() {
        this.validation()

    },
    created() {
        if (this.isEdit) {
            this.title = 'Edit Document'
            // Calls the data fetch method during component creation
            this.fetchDocument();
        } else {
            this.title = 'Upoad Document'
        }
    }
}

</script>

<template>
    <main class="container">
        <div class="bg-body-tertiary p-5 rounded">
            <h1>
                {{ title }}
            </h1>
            <p class="lead" v-if="isEdit">
                It is not allowed to save the email of a translator who is not registered.
            </p>

            <p class="lead" v-else>
                Only documents whose email if from a registered translator will be saved. <br>

                The accepted format is .csv and the file must contain the columns: subject, content,
                locale, author.
            </p>

            <div v-if="!isEdit">
                <form novalidate class="needs-validation">
                    <div class="mb-3 file-content">
                        <label for="formFile" class="form-label">Ex: document.csv</label>
                        <input v-on:change="fileUpload" class="form-control form-control-lg" type="file" id="formFile"
                            name="file" accept=".csv" required>
                    </div>
                    <div class="invalid-feedback">
                        Please choose a file
                    </div>
                    <button type="submit" class="btn btn-primary submit-btn">Submit</button>
                </form>
            </div>
            <div v-else>
                <!-- Alert message shown when the email sent does not exist in the databse -->
                <div id="header-content-doc">
                    <div class="alert alert-danger alert-dismissible" role="alert" v-if="hasError">
                        <div>There is no translator in the database with this email</div>
                        <button type="button" class="btn-close" v-on:click="closeAlert"></button>
                    </div>
                </div>
                <!-- Form data -->
                <form novalidate class="needs-validation">
                    <div class="mb-3">
                        <label for="input1" class="form-label">Subject</label>
                        <input type="text" required v-model="document.subject" class="form-control" id="input1"
                            placeholder="">
                        <!-- Alert message shown if field is invalid -->
                        <div class="invalid-feedback">
                            Please provide a subject
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="input2" class="form-label">Content</label>
                        <input type="text" required v-model="document.content" class="form-control" id="input2"
                            placeholder="">
                        <div class="invalid-feedback">
                            Please provide a content
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label for="input3" class="form-label">Locale</label>
                            <input type="text" required v-model="document.locale" class="form-control"
                                placeholder="Ex: pt-BR" id="input3">
                            <div class="invalid-feedback">
                                Please provide a locale
                            </div>
                        </div>
                        <div class="col">
                            <label for="input4" class="form-label">Author</label>
                            <input type="text" required v-model="document.author" class="form-control"
                                placeholder="name@example.com" id="input4">
                            <div class="invalid-feedback">
                                Please provide a valid email
                            </div>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary submit-btn">Submit</button>
                </form>
            </div>
        </div>
    </main>
</template>

<style>
.alert {
    max-width: 600px;
    margin-bottom: 0;
    padding: 10px 48px 10px 10px;
}

.btn-close {
    padding: 15px !important;
}

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

.file-content {
    margin-bottom: 0px !important;
}

.submit-btn {
    margin-top: 20px !important;
}

#header-content-doc {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
</style>
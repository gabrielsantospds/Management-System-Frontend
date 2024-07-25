<script>

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
    <div class="container py-4">
        <div class="p-5 mb-4 bg-body-tertiary rounded-3 big-content">
            <div class="container-fluid py-5">
                <h1 class="display-5 fw-bold">
                    Translator and Document <br> Management System
                </h1>
                <p class="col-md-8 fs-4">
                    Easily register your data and upload your documents. With our system, you can quickly upload CSV files to save multiple documents and manage your data with a user-friendly interface.
                </p>
            </div>
        </div>
        <div class="row align-items-md-stretch">
            <div class="col-md-6">
                <div class="h-100 p-5 text-bg-dark rounded-3">
                    <h2 class="subtitle">
                        I am registered as a translator
                    </h2>
                    <p>
                    </p>
                    <button class="btn btn-outline-light" v-on:click="goToAnotherPage('/newDocument')">
                        Upload File
                    </button>
                </div>
            </div>
            <div class="col-md-6">
                <div class="h-100 p-5 bg-body-tertiary border rounded-3">
                    <h2 class="subtitle" id="subtitle-dark">
                        I am not a registered translator
                    </h2>
                    <p>
                    </p>
                    <button class="btn btn-outline-secondary" v-on:click="goToAnotherPage('/newTranslator')">
                        Register
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

.py-4 {
    padding-top: 0px !important;
}

.big-content {
    padding: 48px 120px !important;
}

.display-5 {
    font-size: 38px;
} 

.text-bg-dark {
    background-color: #333379 !important;
}

.fs-4 {
    width: 100%;
    text-align: center;
    font-size: 20px !important;
}

.subtitle {
    font-size: 28px;
}

#subtitle-dark {
    color: #333379;
}

.container-fluid {
    padding: 12px !important;
}

.btn-outline-secondary {
    color: #333379;
    border-color: #333379;
}

.btn-outline-secondary:hover, .btn-outline-secondary:active {
    background-color: #333379 !important;
    border-color: white !important;
}

</style>
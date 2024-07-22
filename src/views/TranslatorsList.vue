<script>
import axios from 'axios';


export default {
    data() {
        return {
            translators: [],
            currentPage: 0,
            totalPages: 0
        }
    },

    created() {
        this.fetchTranslators()
    },

    methods: {
        fetchTranslators() {
            axios.get('http://localhost:8080/translators', {
                params: {
                    page: this.currentPage
                }
            })
                .then(response => {
                    this.translators = response.data.content
                    this.totalPages = response.data.page.totalPages
                })
                .catch(error => {
                    console.log(error)
                })
        },

        nextPage() {
            if (this.currentPage < this.totalPages - 1) {

                this.currentPage++
                this.fetchTranslators()
            }
        },

        previousPage() {
            if (this.currentPage > 0) {
                this.currentPage--
                this.fetchTranslators()
            }
        }
    }
}
</script>

<template>
    <main class="container">
        <div class="bg-body-tertiary p-5 rounded">
            <h1>
                Management system
            </h1>
            <div>
                <RouterLink class="btn btn-primary" to="/newTranslator">New Translator</RouterLink>
            </div>
            <hr>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <td><b>NAME</b></td>
                        <td><b>EMAIL</b></td>
                        <td><b>SOURCE LANGUAGE</b></td>
                        <td><b>TARGET LANGUAGE</b></td>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="translator in translators" :key="translator.id">
                        <td>{{ translator.name }}</td>
                        <td>{{ translator.email }}</td>
                        <td>{{ translator.source_language }}</td>
                        <td>{{ translator.target_language }}</td>
                        <td>
                            <a class="btn btn-sm btn-secondary">Edit</a>
                        </td>
                        <td>
                            <a class="btn btn-sm btn-secondary">Delete</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id="icon-content">
                <span class="icon-button" title="Previous Page" v-on:click.prevent="previousPage">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                        class="bi bi-caret-left-square-fill" viewBox="0 0 16 16">
                        <path
                            d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm10.5 10V4a.5.5 0 0 0-.832-.374l-4.5 4a.5.5 0 0 0 0 .748l4.5 4A.5.5 0 0 0 10.5 12" />
                    </svg>
                </span>
                <span class="icon-button" title="Next Page" v-on:click.prevent="nextPage">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                        class="bi bi-caret-right-square-fill" viewBox="0 0 16 16">
                        <path
                            d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.5 10a.5.5 0 0 0 .832.374l4.5-4a.5.5 0 0 0 0-.748l-4.5-4A.5.5 0 0 0 5.5 4z" />
                    </svg>
                </span>
            </div>
        </div>
    </main>
</template>

<style>

.table {
    margin-bottom: 8px
}

.btn-primary,
.btn-primary:hover,
.btn-primary:active {
    background-color: #F86011 !important;
    border-color: #F86011 !important;
}

.btn-sm,
.btn-sm:hover,
.btn-sm:active {
    width: 60px;
    margin-top: 0;
    background-color: #333379 !important;
    border-color: #333379 !important;
}

.icon-button {
    cursor: pointer;
}

#icon-content {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    padding-right: 20px;
}

.bi {
    color: #333379;
}

</style>
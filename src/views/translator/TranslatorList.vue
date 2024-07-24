<script>
import axios from 'axios';

export default {
    data() {
        return {
            translators: [],
            currentPage: 0,
            totalPages: 0,
            totalELements: 0,
            // icon button elements
            elements: {
                iconButtonNextEl: '',
                iconNextEl: '',
                iconButtonPreviousEl: '',
                iconPreviousEl: ''
            },
            hasError: false,
            savedChanges: false,
            alertTitle: ''
        }
    },

    created() {
        // Data received from the router to indicate changes that have been saved
        this.savedChanges = history.state.savedChanges
        this.alertTitle = history.state.title
        history.state.savedChanges = false
        history.state.title = ''
        // Calls the data fetch method during component creation
        this.fetchTranslators()
    },

    methods: {
        fetchTranslators() {
            axios.get('http://localhost:8080/translators', {
                params: {
                    // Passes the page number to get paginated data
                    page: this.currentPage
                }
            })
                .then(response => {
                    this.translators = response.data.content
                    this.totalPages = response.data.page.totalPages
                    this.totalELements = this.translators.length
                })
                .catch(error => {
                    console.log(error)
                })
                .finally(
                    () => this.getButtonElements()
                )
        },

        nextPage() {
            // Changes the currentPage when user clicks on the next page button
            if (this.currentPage < this.totalPages - 1) {
                this.currentPage++
                this.fetchTranslators()

            }
        },

        previousPage() {
            // Changes the currentPage when user clicks on the previous page button
            if (this.currentPage > 0) {
                this.currentPage--
                this.fetchTranslators()
            }
        },

        getButtonElements() {
            // Gets each DOM element that refers to the svg icon and button surrouding it
            // For both previous page button and next page button
            this.elements.iconButtonNextEl = document.querySelector('#icon-button-next')
            this.elements.iconNextEl = this.elements.iconButtonNextEl.querySelector('#icon-next')
            this.elements.iconButtonPreviousEl = document.querySelector('#icon-button-previous')
            this.elements.iconPreviousEl =
                this.elements.iconButtonPreviousEl.querySelector('#icon-previous')

            // Validates the currentPage limit and changes the style of the next and previous page 
            // buttons to disable them in case there is no previous or next page available
            if (this.currentPage === 0) {
                if (this.totalPages === 1) {
                    this.setButtonStyle('default', 'default', 'gray', 'gray')
                } else {
                    this.setButtonStyle('default', 'pointer', 'gray', '#333379')
                }
            } else if (this.currentPage === this.totalPages - 1) {
                this.setButtonStyle('pointer', 'default', '#333379', 'gray')
            } else {
                this.setButtonStyle('pointer', 'pointer', '#333379', '#333379')
            }
        },

        setButtonStyle(cursorPrevious, cursorNext, colorPrevious, colorNext) {
            // Sets button styles by parameter 
            this.elements.iconButtonPreviousEl.style.cursor = cursorPrevious
            this.elements.iconButtonNextEl.style.cursor = cursorNext
            this.elements.iconPreviousEl.style.color = colorPrevious
            this.elements.iconNextEl.style.color = colorNext
        },

        goToEdit(translatorId) {
            // Redirects to traslator edit page
            this.$router.push(`editTranslator/${translatorId}`)
        },

        async deleteTranslator(translatorId) {
            try {
                await axios.delete(
                    `http://localhost:8080/translator/${translatorId}`
                )
                this.savedChanges = true
                this.alertTitle = 'Translator deleted successfully'
                if (this.totalELements === 1) {
                    this.currentPage--
                }
                this.fetchTranslators()

            } catch (error) {
                const errorCode = error.response.status
                if (errorCode === 409) {
                    // Error code 409 means that there is a conflit because the translator is linked
                    // to documents and cannot be deleted

                    // Changes the hasError value to show an alert message
                    this.hasError = true
                }
            }
        },
        closeAlertDanger() {
            // When the user closes the alert message returns hasError to its original value
            this.hasError = false
        },
        closeAlertSuccess() {
            this.savedChanges = false
        }
    }
}
</script>

<template>
    <main class="container">
        <div class="bg-body-tertiary p-5 rounded">
            <h1>
                Translator List
            </h1>
            <p class="lead">
                You can view all saved translators. It is possible to delete and change a translator's data.
            </p>
            <div id="header-content">
                <RouterLink class="btn btn-primary" to="/newTranslator">New Translator</RouterLink>

                <div>
                    <!-- Alert message shown when there is an error deleting the user -->
                    <div class="alert alert-danger alert-dismissible" role="alert" v-if="hasError">
                        <div>Translator cannot be deleted because it is linked to documents</div>
                        <button type="button" class="btn-close" v-on:click="closeAlertDanger"></button>
                    </div>
                    <!-- Alert message shown to confirm saved changes -->
                    <div class="alert alert-success alert-dismissible" role="alert" v-if="savedChanges">
                        <div>{{ alertTitle }}</div>
                        <button type="button" class="btn-close" v-on:click="closeAlertSuccess"></button>
                    </div>
                </div>
            </div>
            <hr>
            <!-- Translator table -->
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
                            <a class="btn btn-sm btn-secondary" v-on:click="goToEdit(translator.id)">Edit</a>
                        </td>
                        <td>
                            <a class="btn btn-sm btn-secondary" v-on:click="deleteTranslator(translator.id)">Delete</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- Previous and next page buttons made with svg images-->
            <div id="icon-content-translator">
                <span class="icon-button" id="icon-button-previous" title="Previous Page"
                    v-on:click.prevent="previousPage">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                        class="bi bi-caret-left-square-fill" id="icon-previous" viewBox="0 0 16 16">
                        <path
                            d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm10.5 10V4a.5.5 0 0 0-.832-.374l-4.5 4a.5.5 0 0 0 0 .748l4.5 4A.5.5 0 0 0 10.5 12" />
                    </svg>
                </span>
                <span class="icon-button" id="icon-button-next" title="Next Page" v-on:click.prevent="nextPage">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                        class="bi bi-caret-right-square-fill" id="icon-next" viewBox="0 0 16 16">
                        <path
                            d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5.5 10a.5.5 0 0 0 .832.374l4.5-4a.5.5 0 0 0 0-.748l-4.5-4A.5.5 0 0 0 5.5 4z" />
                    </svg>
                </span>
            </div>
        </div>
    </main>
</template>

<style>
.lead {
    margin-bottom: 10px;
}

#header-content {
    margin-top: 0 !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.alert {
    margin-bottom: 0;
    padding: 10px 48px 10px 10px;
}

.btn-close {
    padding: 15px !important;
}

.table {
    margin-bottom: 8px
}

.btn-primary,
.btn-primary:hover,
.btn-primary:active {
    margin-top: 0;
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

#icon-content-translator {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    padding-right: 20px;
}

.bi {
    color: #333379;
}
</style>
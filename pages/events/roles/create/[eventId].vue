<template>
    <section class="bg-gray-200 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">

                    <Error v-if="error" :text=error />

                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create Role
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="name"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" name="name" id="name" v-model="form.name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name" required="">
                        </div>

                        <div>
                            <label for="description"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea name="description" id="description" v-model="form.description"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="description" required=""></textarea>
                        </div>
                        <button type="button" @click="handleSubmit"
                            class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create
                            role</button>

                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { authStore } from '~/store';

export default {
    name: 'CreateRole',
    data() {
        return {
            error: "",
            eventId: this.$route.params.eventId,
            userId: authStore().getUser.uuid,
            token: authStore().getToken,
            form: {
                name: '',
                description: '',
            }
        }
    },
    methods: {
        async handleSubmit() {
            try {
                const response = await $fetch(`${this.$config.public.apiUrl}/events/roles/create/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: "cors",
                    credentials: "include",
                    body: {
                        user_id: this.userId,
                        token: this.token,
                        event_id: this.eventId,
                        name: this.form.name,
                        description: this.form.description,
                    }
                });

                if (response.code == "480") {
                    return await navigateTo(`/auth/login/`)
                }

                alert(response.message)

                if (response.code !== "201") {
                    return this.error = response.message
                }
                return await navigateTo(`/events/roles/${this.eventId}`)

            } catch (error) {
                this.error = "Connection error";
            }

        }
    }
}
</script>
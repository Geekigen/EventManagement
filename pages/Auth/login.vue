<template>
    <section
        class="relative overflow-hidden bg-gray-200 bg-[url('https://images.unsplash.com/photo-1599739291060-4578e77dac5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 shadow-2xl">
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">


                    <Error v-if="error" :text=error />

                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Login
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                username</label>
                            <input type="text" name="username" id="username" v-model="form.username"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="username" required="">
                        </div>

                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                v-model="form.password"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="">
                        </div>
                        <button type="button" @click="handleSubmit"
                            class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Forgot password? <a href="/auth/forgot-password"
                                class="font-medium text-primary-600 hover:underline dark:text-primary-500">Change here</a>
                        </p>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don't have an account? <a href="/auth/register/"
                                class="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import { storeToRefs } from 'pinia'
import { authStore } from '~/store';

export default {
    name: 'Login',
    data() {
        return {
            error: "",
            form: {
                username: '',
                password: '',
            }
        }
    },
    methods: {
        async handleSubmit() {
            this.error = "";
            try {
                const response = await $fetch(`${this.$config.public.apiUrl}/users/login/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: "cors",
                    credentials: "include",
                    body: {
                        username: this.form.username,
                        password: this.form.password,
                    }
                });



                if (response.code == "450") {
                    return await navigateTo(`/auth/confirm-email/${response.data.email}`)
                }

                if (response.code !== "200") {
                    return this.error = response.message
                }

                const store = authStore()

                store.setUser(response.data)
                store.setToken(response.data.token)
                store.setPermissions(response.permissions)
                store.login()


                return await navigateTo(`/`)

            } catch (error) {
                this.error = "Connection error"
            }

        }
    },
    created() {
        const store = authStore()
        store.logout()
    }
}
</script>
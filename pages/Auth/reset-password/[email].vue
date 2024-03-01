<template>
    <section class="bg-gray-200 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <Error v-if="error" :text=error />
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Reset Password
                    </h1>
                    <div role="alert" class="rounded-xl border border-gray-100 bg-white p-4">
                        <div class="flex items-start gap-4">
                            <span class="text-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" class="h-6 w-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>

                            <div class="flex-1">
                                <strong class="block font-medium text-gray-900">OTP sent</strong>

                                <p class="mt-1 text-sm text-gray-700">OTP code sent to your email</p>
                            </div>
                        </div>
                    </div>
                    <form class="space-y-4 md:space-y-6" action="#">

                        <div>
                            <label for="password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••"
                                v-model="form.password1"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="">
                        </div>
                        <div>
                            <label for="confirm-password"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                                password</label>
                            <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••"
                                v-model="form.password2"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="">
                        </div>
                        <div>
                            <label for="code"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Code</label>
                            <input type="text" name="code" id="code" placeholder="code" v-model="form.code"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="">
                        </div>
                        <button type="button" @click="handleSubmit"
                            class="w-full text-black bg-sky-500/25 hover:bg-sky-500/50 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'ResetPassword',
    data() {
        return {
            error: "",
            email: this.$route.params.email,
            form: {
                password1: '',
                password2: '',
                code: ''
            }
        }
    },
    methods: {
        async handleSubmit() {
            this.error = "";
            try {
                if (this.form.password1 !== this.form.password2) {
                    return this.error = "Passwords do not match"
                }
                const response = await $fetch(`${this.$config.public.apiUrl}/users/reset-password/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        email: this.email,
                        new_password: this.form.password1,
                        code: this.form.code,
                    }
                });

                if (response.code !== "200") {
                    return this.error = response.message
                }
                return await navigateTo(`/auth/login`)

            } catch (error) {
                this.error = "Connection error"
            }

        }
    }
}
</script>
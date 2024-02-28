<template>
    <section class="bg-gray-200 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div role="alert" v-if="error" class="rounded border-s-4 border-red-500 bg-red-50 p-4">
                        <strong class="block font-medium text-red-800"> Something went wrong </strong>

                        <p class="mt-2 text-sm text-red-700">
                            {{ error }}
                        </p>
                    </div>
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Forgot password
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                                email</label>
                            <input type="email" name="email" id="email" v-model="form.email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com" required="">
                        </div>

                        <button type="button" @click="handleSubmit"
                            class="w-full text-white bg-blue-600 hover:bg-sblue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'ForgotPassword',
    data() {
        return {
            error: "",
            form: {
                email: '',
            }
        }
    },
    methods: {
        async handleSubmit() {
            try {
                const response = await $fetch('http://127.0.0.1:9000/users/forgot-password/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        email: this.form.email,
                    }
                });
                console.log(response);
                if (response.code !== "200") {
                    return this.error = response.message
                }
                return await navigateTo(`/auth/reset-password/${this.form.email}`)

            } catch (error) {
                this.error = "Connection error"
                console.error('Error:', error);
            }

        }
    }
}
</script>
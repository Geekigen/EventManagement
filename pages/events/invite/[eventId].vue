<template>
    <section
        class="relative overflow-hidden bg-gray-200">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">


                    <Error v-if="error" :text=error />

                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Invite
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                            <input type="email" name="email" id="email" v-model="form.email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="email" required="">
                        </div>
                        <button type="button" @click="handleSubmit"
                            class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send invite</button>
                       
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import { authStore } from '~/store';

export default {
    name: 'Invite',
    data() {
        return {
            error: "",
            eventId: this.$route.params.eventId,
            userId: authStore().getUser.uuid,
            token: authStore().getToken,
            form: {
                email:'',
            }
        }
    },
    methods: {
        async handleSubmit() {
            try {
                const response = await $fetch(`${this.$config.public.apiUrl}/events/invite/`, {
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
                        email:this.form.email
                    }
                });


                if (response.code == "480") {
                    return await navigateTo(`/auth/login/`)
                }

                if (response.code !== "200") {
                    return this.error = response.message
                }

                alert(response.message)
                return await navigateTo(`/events/event/${this.eventId}`)

            } catch (error) {
                this.error = "Connection error"
            }

        }
    }
}
</script>
<template>
    <section class="bg-gray-50 dark:bg-gray-900">
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
                        Update Role
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" name="name" id="name" v-model="form.name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name" required="">
                        </div>

                        <div>
                            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea name="description" id="description" v-model="form.description"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="description" required=""></textarea>
                        </div>
                        <button type="button" @click="handleSubmit"
                            class="w-full text-black bg-sky-500/50 hover:bg-sky-500/75 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update role</button>
                       
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
            roleId: this.$route.params.roleId,
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
                const response = await $fetch('http://127.0.0.1:8000/events/roles/update/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode:"cors",
                    credentials:"include",
                    body: {
                        user_id: this.userId,
                        token: this.token,
                        role_id: this.roleId,
                        name: this.form.name,
                        description: this.form.description,
                    }
                });

                if (response.code == "480") {
                    return await navigateTo(`/auth/login/`)
                }
                
                alert(response.message)

                if (response.code !== "200") {
                    return this.error = response.message
                }
                return await navigateTo(`/events/event/${this.eventId}`)

            } catch (error) {
                this.error = "Connection error"
                console.error('Error:', error);
            }

        },

        async getRole(){
            try {
                const response = await $fetch('http://127.0.0.1:8000/events/roles/get/id/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode:"cors",
                    credentials:"include",
                    body: {
                        role_id: this.roleId,
                    }
                });

                console.log(response);

                if (response.code !== "200") {
                    return this.error = response.message
                }
                this.form.name = response.roles[0].name
                this.form.description = response.roles[0].description

            } catch (error) {
                this.error = "Connection error"
                console.error('Error:', error);
            }
        }
    },
    created(){
        this.getRole()
    }
}
</script>
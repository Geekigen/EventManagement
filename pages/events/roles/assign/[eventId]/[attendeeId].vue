<template>
    <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 shadow-2xl">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div role="alert" v-if="error" class="rounded border-s-4 border-red-500 bg-red-50 p-4">
                        <strong class="block font-medium text-red-800"> Something went wrong </strong>

                        <p class="mt-2 text-sm text-red-700">
                            {{ error }}
                        </p>
                    </div>
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Assign Role
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="role"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                            <select id="role" v-model="form.roleId"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option v-for="role in roles" v-bind:key="role.uuid" v-bind:value="role.uuid">{{ role.name }}</option>
                            </select>
                        </div>
                        <button type="button" @click="assignRole"
                            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky dark:hover:bg-primary-700 dark:focus:ring-primary-800">Assign
                            role</button>

                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'AssignRole',
    data() {
        return {
            error: "",
            eventId: this.$route.params.eventId,
            attendeeId: this.$route.params.attendeeId,
            roles: [],
            form: {
                roleId: ''
            }
        }
    },
    methods: {
        async assignRole() {
            try {
                const response = await $fetch('http://127.0.0.1:8000/events/roles/assign/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: "cors",
                    credentials: "include",
                    body: {
                        role_id: this.form.roleId,
                        attendee_id: this.attendeeId,
                    }
                });

                if (response.code == "480") {
                    return await navigateTo(`/auth/login/`)
                }
                
                alert(response.message)

                if (response.code !== "200") {
                    return this.error = response.message
                }
                return await navigateTo(`/events/attendees/${this.eventId}`)

            } catch (error) {
                this.error = "Connection error"
                console.error('Error:', error);
            }


        },

        async getRoles() {
            try {
                const response = await $fetch('http://127.0.0.1:8000/events/roles/get/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: "cors",
                    credentials: "include",
                    body: {
                        event_id: this.eventId,
                    }
                });

                if (response.code !== "200") {
                    return this.error = response.message
                }
                console.log(response);
                this.roles = response.roles

            } catch (error) {
                this.error = "Connection error"
                console.error('Error:', error);
            }
        },
    },
    created() {
        this.getRoles()
    }
}
</script>
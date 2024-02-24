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
                        Update event
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event
                                name</label>
                            <input type="text" name="name" id="name" v-model="form.name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name" required="">
                        </div>
                        <div>
                            <label for="description"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event
                                description</label>
                            <textarea name="description" id="description" v-model="form.description"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="description" required=""></textarea>
                        </div>
                        <div>
                            <label for="venue"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Venue</label>
                            <input type="text" name="venue" id="venue" v-model="form.venue"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="venue" required="">
                        </div>
                        <div>
                            <label for="capacity"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Capacity</label>
                            <input type="number" name="capacity" id="capacity" v-model="form.capacity"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="capacity" required="">
                        </div>
                        <div>
                            <label for="price"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                            <input type="number" name="price" id="price" v-model="form.price"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="capacity" required="">
                        </div>
                        <div>
                            <label for="start"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start</label>
                            <input type="datetime-local" name="start" id="start"
                                v-model="form.start"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="">
                        </div>
                        <div>
                            <label for="end"
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End</label>
                            <input type="datetime-local" name="end" id="end" v-model="form.end"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required="">
                        </div>
                        <div>
                            <label for="type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event
                                type</label>
                            <select name="type" id="type" v-model="form.type"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="festival" selected>Festival</option>
                            </select>
                        </div>
                        <button type="button" @click="handleSubmit"
                            class="w-full text-black bg-sky-500/50 hover:bg-sky-500/75 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update event</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

export default {
    name: "UpdateEvent",
    data() {
        return {
            error: "",
            eventId: this.$route.params.eventId,
            form: {
                name: '',
                description: '',
                venue: '',
                price: '',
                capacity: '',
                start: '',
                end: '',
                type: ''
            }
        }
    },
    methods: {
        async handleSubmit() {
            try {
                const response = await $fetch('http://127.0.0.1:8000/events/update/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: {
                        event_id: this.eventId,
                        name: this.form.name,
                        description: this.form.description,
                        venue: this.form.venue,
                        price: this.form.price,
                        capacity: this.form.capacity,
                        start: this.form.start,
                        end: this.form.end,
                        event_type: this.form.type,
                    }
                });

                if (response.code !== "200") {
                    return this.error = response.message
                }
                return await navigateTo(`/events/event/${this.eventId}`)

            } catch (error) {
                this.error = error
            }
        },

        async getEvent() {
            try {
                const response = await $fetch('http://127.0.0.1:8000/events/get/id/', {
                    method: 'POST',
                    body: {
                        event_id: this.eventId
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                let eventData = response.events[0]
                this.form.name = eventData.name
                this.form.description = eventData.description
                this.form.venue = eventData.venue
                this.form.price = eventData.price
                this.form.capacity = eventData.capacity
                this.form.start = eventData.start
                this.form.end = eventData.end
                this.form.type = eventData.type

            } catch (error) {
                this.error = error
            }
        }
    },
    created(){
        this.getEvent()
    }
}

</script>
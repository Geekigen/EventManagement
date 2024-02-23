<template>
    <form class="max-w-md mx-auto">
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
            </div>
            <input type="text" id="search" v-model="form.search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search events.." required />
            <button type="button" @click="searchEvents"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
    </form>

    <div v-if="events.length">
        <div v-for="event in events" :key="event.uuid" class="mb-8">
            <h2>{{ event.uuid }}</h2>
            <h2>{{ event.name }}</h2>
            <h2>{{ event.description }}</h2>
            <h2>{{ event.venue }}</h2>
            <h2>{{ event.capacity }}</h2>
            <h2>{{ event.price }}</h2>
            <h2>{{ event.start }}</h2>
            <h2>{{ event.end }}</h2>
            <button type="button" @click="viewEvent(event.uuid)">View Event</button>
        </div>
    </div>
    <h1 v-if="events.length == 0">No events</h1>
</template>

<script>
export default {
    name: "Events",
    data() {
        return {
            events: [],
            form: {
                search: ''
            }
        };
    },
    methods: {
        async getEvents() {
            const response = await $fetch('http://127.0.0.1:8000/events/get/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            this.events = response.events
            console.log(response);
        },

        async searchEvents() {
            const response = await $fetch('http://127.0.0.1:8000/events/get/search/', {
                method: 'POST',
                body: {
                    search: this.form.search
                },
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            this.events = response.events
            console.log(response);
        },

        async viewEvent(eventId){
            return await navigateTo(`/events/${eventId}`)
        }
    },
    created() {
        this.getEvents();
    },
};
</script>

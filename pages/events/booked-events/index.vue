<template>
    <section class="w-full h-screen bg-gray-100 flex flex-col items-center justify-center">

        <!-- <form v-if="events.length" class="flex-none max-w-md mx-auto my-10">
            <label for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
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
        </form> -->

        <div v-if="events.length" class="w-full bg-gray-100 flex gap-10 flex-row flex-wrap items-center justify-center">
            <div v-for="event in events" :key="event.uuid" class="transition duration-150 ease-in-out md:mt-0 mt-8 top-0 left-0 sm:ml-10 md:ml-10 w-10/12 md:w-1/3 shadow-2xl">

                <div
                    class="w-full bg-white shadow-md border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
                    <a href="#" @click="viewEvent(event.uuid)">
                        <img class="w-full rounded-t-lg h-60 object-fit" :src='event.image' alt="">
                    </a>
                    <div class="p-5">
                        <a href="#" @click="viewEvent(event.uuid)">
                            <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">{{ event.name
                            }}</h5>
                        </a>
                        <p class="font-normal text-gray-700 mb-3 dark:text-gray-400">{{ event.description }}</p>
                        <a href="#" @click="viewEvent(event.uuid)"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            View event
                            <svg class="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <h1 v-if="events.length == 0">No events</h1>
    </section>
</template>

<script>

import { authStore } from '~/store';
import { Base64ToBlobUrl } from '~/services';

export default {
    name: "Events",
    data() {
        return {
            events: [],
            userId: authStore().getUser.uuid,
            token: authStore().getToken,
        };
    },
    methods: {
        async getEvents() {
            const response = await $fetch('http://127.0.0.1:8000/events/get/booked/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: "cors",
                credentials: "include",
                body: {
                    user_id: this.userId,
                }
            });
            this.events = response.events
            console.log(response);

            for (let x in this.events) {
                this.events[x].image = Base64ToBlobUrl(this.events[x].image)
            }
        },

        // async searchEvents() {
        //     const response = await $fetch('http://127.0.0.1:8000/events/get/search/', {
        //         method: 'POST',
        //         body: {
        //             search: this.form.search
        //         },
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //     });
        //     this.events = response.events
        //     console.log(response);
        // },

        async viewEvent(eventId) {
            return await navigateTo(`/events/event/${eventId}`)
        }
    },
    created() {
        this.getEvents();
    },
};
</script>

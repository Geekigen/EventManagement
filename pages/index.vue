<template>
  <section class="w-full min-h-screen bg-gray-100  flex flex-col items-center justify-center px-20">

    <!-- ongoing events -->
    <div v-if="ongoingEvents.length"
      class="w-full min-h-full bg-gray-100 flex flex-col flex-wrap items-start justify-center my-10">
      <h1
        class="mb-10 text-3xl font-extrabold leading-none tracking-tight dark:text-black text-gray-700 md:text-3xl lg:text-4xl">
        ongoing</h1>
      <div class="w-full bg-gray-100 flex gap-10 flex-row flex-wrap items-center justify-start">
        <div v-for="event in ongoingEvents" :key="event.uuid"
          class="transition duration-150 ease-in-out top-0 left-0 w-[400px] shadow-2xl">

          <div class="w-full bg-white shadow-md border border-gray-200 rounded-lg   dark:bg-gray-800 dark:border-gray-700">
            <a href="#" @click="viewEvent(event.uuid)">
              <img class="w-full rounded-t-lg h-60 object-fit" :src='event.image' :onerror='handleImageError'
                :key='event.uuid' alt="">
            </a>
            <div class="p-5">
              <a href="#" @click="viewEvent(event.uuid)">
                <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2  dark:text-white">{{ event.name
                }}</h5>
              </a>
              <p class="font-normal text-gray-700 mb-3 dark:text-white">{{ event.description }}</p>
              <a href="#" @click="viewEvent(event.uuid)"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                View event
                <svg @click="viewEvent(event.uuid)" class="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20"
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

    </div>

    <!-- upcoming events -->
    <div v-if="upcomingEvents.length"
      class="w-full min-h-full bg-gray-100 flex flex-col flex-wrap items-start justify-center my-10">
      <h1
        class="mb-10 text-3xl font-extrabold leading-none tracking-tight text-gray-700 md:text-3xl lg:text-4xl dark:text-black">
        upcoming</h1>
      <div class="w-full bg-gray-100 flex gap-10 flex-row flex-wrap items-center justify-start">
        <div v-for="event in upcomingEvents" :key="event.uuid"
          class="transition duration-150 ease-in-out top-0 left-0 w-[400px] shadow-2xl">

          <div class="w-full bg-white shadow-md border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">
            <a href="#" @click="viewEvent(event.uuid)">
              <img class="w-full rounded-t-lg h-60 object-fit" :src='event.image' :onerror='handleImageError' alt="">
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
                <svg @click="viewEvent(event.uuid)" class="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20"
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
    </div>


    <!-- event types -->

    <div v-for="eventType in eventTypes"
      class="w-full min-h-full bg-gray-100 flex flex-col flex-wrap items-start justify-center my-10">
      <h1 v-if="events.filter(event => event.event_type == eventType).length"
        class="mb-10 text-3xl font-extrabold leading-none tracking-tight text-gray-700 md:text-3xl lg:text-4xl dark:text-black">
        {{ eventType }}</h1>
      <div v-if="events.filter(event => event.event_type == eventType).length"
        class="w-full bg-gray-100 flex gap-10 flex-row flex-wrap items-center justify-start">
        <div v-for="event in events.filter(event => event.event_type == eventType)"
          class="transition duration-150 ease-in-out top-0 left-0 w-[400px] shadow-2xl">
          <div class="bg-white shadow-md border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
            <a href="#" @click="viewEvent(event.uuid)">
              <img class="w-full rounded-t-lg h-60 object-fit" :src='event.image' :onerror='handleImageError' alt="">
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
                <svg @click="viewEvent(event.uuid)" class="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20"
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
    </div>
    <h1 v-if="events.length == 0">No events</h1>
  </section>
</template>


<script>

import { handleImageError } from '~/services';

export default {
  name: "Events",
  data() {
    return {
      ongoingEvents: [],
      upcomingEvents: [],
      events: [],
      eventTypes: [],
    };
  },
  methods: {
    handleImageError,
    async getEvents() {
      const response = await $fetch(`${this.$config.public.apiUrl}/events/get/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      this.events = response.events
    },

    async getUpcomingEvents() {
      const response = await $fetch(`${this.$config.public.apiUrl}/events/get/upcoming/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      this.upcomingEvents = response.events
    },

    async getOngoingEvents() {
      const response = await $fetch(`${this.$config.public.apiUrl}/events/get/ongoing/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      this.ongoingEvents = response.events
    },


    async getEventTypes() {
      const response = await $fetch(`${this.$config.public.apiUrl}/events/event-types/get/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      this.eventTypes = response.event_types
    },

    async viewEvent(eventId) {
      return await navigateTo(`/events/event/${eventId}`)
    }


  },
  created() {
    this.getEvents();
    this.getOngoingEvents();
    this.getUpcomingEvents();
    this.getEventTypes()
  },
};
</script>
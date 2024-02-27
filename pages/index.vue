<template>
  <section class="w-full min-h-screen bg-gray-50 flex flex-col items-center justify-center px-20">
    <div v-for="eventType in eventTypes" class="w-full min-h-full bg-gray-50 flex flex-col flex-wrap items-start justify-center my-10">
      <h1 v-if="events.filter(event => event.event_type == eventType).length" class="mb-10 text-3xl font-extrabold leading-none tracking-tight text-gray-700 md:text-3xl lg:text-4xl dark:text-white">{{ eventType }}s</h1>
      <div v-if="events.length" class="w-full bg-gray-50 flex gap-10 flex-row flex-wrap items-center justify-start">
        <div v-for="event in events" class="max-w-2xl">
          <div v-if="event.event_type == eventType" class="max-w-2xl" :key="event.uuid">
            <div
              class="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
              <a href="#" @click="viewEvent(event.uuid)">
                <img class="rounded-t-lg"
                  src="https://st2.depositphotos.com/1017986/7924/i/450/depositphotos_79249744-stock-photo-group-of-happy-friends-at.jpg"
                  alt="">
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
    </div>
    <h1 v-if="events.length == 0">No events</h1>
  </section>
</template>

<script>
// const config = useRuntimeConfig()
export default {
  name: "Events",
  data() {
    return {
      events: [],
      eventTypes: [],
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

    async getEventTypes() {
      const response = await $fetch('http://127.0.0.1:8000/events/event-types/get/', {
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
    this.getEventTypes()
  },
};
</script>
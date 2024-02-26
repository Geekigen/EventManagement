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
  <div class="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
    <div class="mx-auto max-w-lg text-center">
      <h2 class="text-3xl font-bold sm:text-4xl text-blue-600">Trending</h2>
    </div>
    <div class="flex flex-col justify-center items-center">
        <div v-if="events.length" class="flex flex-row flex-wrap justify-center items-center gap-5">
          <div v-for="(event, index) in events" :key="index" class="mb-8">
          <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img class="p-8 rounded-t-lg" :src="event.image" alt="product image" />
            </a>
            <div class="px-5 pb-5">
              <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">{{ event.name }}</h5>
              <p class="text-white mb-3">{{ event.description }}</p>
              <p class="text-white mb-3">{{ event.venue }}</p>
              <p class="text-white mb-3">{{ event.capacity }}</p>
              <p class="text-red-400">{{ event.price }}</p>
              <p class="text-white mb-3">{{ event.start }}</p>
              <p class="text-white mb-3">{{ event.end }}</p>
              <div class="flex items-center justify-between">
                <button href="#" type="button" @click="attendEvent(event.uuid)"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">view event</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
   <div class="mt-12 text-center">
    <a href="/events" class="inline-block rounded bg-pink-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring focus:ring-yellow-400">View full event list</a>
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
          const response = await $fetch('http://127.0.0.1:9000/events/get/', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              },
          });
          this.events = response.events
          console.log(response);
      },

      async searchEvents() {
          const response = await $fetch('http://127.0.0.1:9000/events/get/search/', {
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

      async attendEvent(eventId){
          const response = await $fetch('http://127.0.0.1:9000/events/attend/', {
              method: 'POST',
              body: {
                  event_id: eventId
              },
              headers: {
                  'Content-Type': 'application/json'
              },
          });
          alert(response.message)
          console.log(response);
      }
  },
  created() {
      this.getEvents();
  },
};
</script>

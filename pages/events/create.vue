<template>
  <section class="bg-gray-100 bg-[url('https://images.unsplash.com/photo-1599739291060-4578e77dac5d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <Error v-if="error" :text=error />
      <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
        <form action="#" enctype="multipart/form-data" class="space-y-4">
          <div>
            <label for="name">Event Name</label>
            <input class="w-full rounded-lg bg-gray-200 border-black p-3 text-sm" placeholder="What is your event's Name?"
              type="text" id="name" v-model="form.name" />
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label for="email">Venue</label>
              <input class="w-full rounded-lg  bg-gray-200 border-black p-3 text-sm" placeholder="Venue" type="text"
                id="email" v-model="form.venue" />
            </div>

            <div>
              <label for="phone">Capacity</label>
              <input class="w-full rounded-lg  bg-gray-200 border-black p-3 text-sm" placeholder="Capacity" type="number"
                id="phone" v-model="form.capacity" />
            </div>
            <div>
              <label for="phone">Price</label>
              <input class="w-full rounded-lg  bg-gray-200 border-black p-3 text-sm" placeholder="Price" type="number"
                id="phone" v-model="form.price" />
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label for="imagename" >Image <svg xmlns="http://www.w3.org/2000/svg" width="4em" height="4em" viewBox="0 0 48 48"><path fill="#8cbcd6" d="M40 41H8c-2.2 0-4-1.8-4-4V11c0-2.2 1.8-4 4-4h32c2.2 0 4 1.8 4 4v26c0 2.2-1.8 4-4 4"/><circle cx="35" cy="16" r="3" fill="#b3ddf5"/><path fill="#9ac9e3" d="M20 16L9 32h22z"/><path fill="#b3ddf5" d="m31 22l-8 10h16z"/><circle cx="38" cy="38" r="10" fill="#43a047"/><g fill="#fff"><path d="M36 32h4v12h-4z"/><path d="M32 36h12v4H32z"/></g></svg>
             </label>
              <input @change="imageUploaded" class=" hidden w-full rounded-lg  bg-gray-200"
                placeholder="Venue" type="file" id="imagename" name="image" />
            </div>

            <div>
              <label for="type"> Event type</label>

              <select name="type" id="type" v-model="form.type"
                class="w-full rounded-lg bg-gray-200 border-black p-3 text-sm">
                <option v-for="eventType in eventTypes" v-bind:key="eventType" v-bind:value="eventType">{{ eventType }}
                </option>
              </select>
            </div>
            <div>
            </div>
          </div>
          <div>
            <label for="message">Description</label>

            <textarea class="w-full rounded-lg  bg-gray-200 border-black p-3 text-sm" placeholder="Description" rows="8"
              id="message" v-model="form.description"></textarea>
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label for="start">Starting date </label>
              <input class="w-full rounded-lg  bg-gray-200 border-black p-3 text-sm" type="datetime-local" id="start"
                v-model="form.start" />
            </div>

            <div>
              <label for="end">End Date </label>
              <input class="w-full rounded-lg  bg-gray-200 border-black p-3 text-sm" type="datetime-local" id="end"
                v-model="form.end" />
            </div>
          </div>

          <div class="mt-4">
            <button @click="handleSubmit" type="button"
              class="inline-block w-full rounded-lg bg-blue-700 px-5 py-3 font-medium text-white sm:w-auto">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>

import { authStore } from '~/store';

export default {
  name: 'CreateEvent',
  data() {
    return {
      error: "",
      base64String: "",
      eventTypes: [],
      userId: authStore().getUser.uuid,
      token: authStore().getToken,
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
    async imageUploaded() {
      let file = document.querySelector(
        'input[type=file]')['files'][0];

      const reader = new FileReader();
      reader.onloadend = () => {
        this.base64String = reader.result
          .replace('data:', '')
          .replace(/^.+,/, '');
      };
      reader.readAsDataURL(file);
    },

    async handleSubmit() {
      try {
        const response = await $fetch(`${this.$config.public.apiUrl}/events/create/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            user_id: this.userId,
            token: this.token,
            name: this.form.name,
            description: this.form.description,
            venue: this.form.venue,
            price: this.form.price,
            capacity: this.form.capacity,
            start: this.form.start,
            end: this.form.end,
            image: this.base64String,
            event_type: this.form.type,
          }
        });

        if (response.code == "480") {
          return await navigateTo(`/auth/login/`)
        }
        console.log(response);
        alert(response.message)

        if (response.code !== "201") {
          return this.error = response.message
        }
        return await navigateTo(`/events/my-events`)

      } catch (error) {
        this.error = "Connection error"
      }

    },
    async getEventTypes() {
      try {
        const response = await $fetch(`${this.$config.public.apiUrl}/events/event-types/get/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        this.eventTypes = response.event_types
      } catch (error) {
        this.error = "Connection error"
      }
    },

  },

  created() {
    this.getEventTypes()
  }
}
</script>
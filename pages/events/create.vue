<template>
  <section class="bg-gray-100">
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
              <input class="w-full rounded-lg  bg-gray-200 border-black p-3 text-sm" placeholder="Capacity" type="text"
                id="phone" v-model="form.capacity" />
            </div>
            <div>
              <label for="phone">Price</label>
              <input class="w-full rounded-lg  bg-gray-200 border-black p-3 text-sm" placeholder="Price" type="text"
                id="phone" v-model="form.price" />
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label for="imagename">Image</label>
              <input @change="imageUploaded" class="w-full rounded-lg  bg-gray-200 border-black p-3 text-sm"
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
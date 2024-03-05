<template>
  <header>
    <div class="navigation bg-white block">
      <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="md:flex md:items-center md:gap-12">
            <a class="block text-teal-600" href="/">
              <img  class="h-16" src="https://res.cloudinary.com/di2a8gjsq/image/upload/v1709623657/EventLogo_2_ok928t.svg" alt="Event Logo">

            </a>
          </div>

          <div class="hidden md:block">
            <nav aria-label="Global">
              <ul class="flex items-center gap-6 text-sm">
                <li>
                  <a class="text-gray-500 transition hover:text-gray-500/75" href="/">
                    Home
                  </a>
                </li>

                <li>
                  <a class="text-gray-500 transition hover:text-gray-500/75" href="/events">
                    Events
                  </a>
                </li>

                <li v-if="isLoggedIn && permissions.create_event">
                  <a class="text-gray-500 transition hover:text-gray-500/75" href="/events/my-events">
                    My events
                  </a>
                </li>

                <li v-if="isLoggedIn">
                  <a class="text-gray-500 transition hover:text-gray-500/75" href="/events/booked-events">
                    Booked events
                  </a>
                </li>

                <li v-if="isLoggedIn && permissions.create_event">
                  <a class="text-gray-500 transition hover:text-gray-500/75" href="/events/create">
                    Create event
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div class="flex items-center gap-4">
            <div class="sm:flex sm:gap-4">
              <a v-if="!isLoggedIn" class="rounded-md bg-blue-700 px-5 py-2.5 text-sm font-medium text-white shadow"
                href="/auth/login">
                Login
              </a>

              <div class="hidden sm:flex">
                <a v-if="!isLoggedIn" class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-800"
                  href="/auth/register">
                  Register
                </a>
              </div>

              <a v-if="isLoggedIn" class="rounded-md bg-blue-700 px-5 py-2.5 text-sm font-medium text-white shadow"
                href="/auth/profile">
                Profile
              </a>

              <div v-if="isLoggedIn" class="hidden sm:flex">
                <a @click="logout" v-if="isLoggedIn"
                  class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-red-800" href="/auth/login">
                  Logout
                </a>
              </div>
            </div>

            <div class="block md:hidden">
              <button class="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { authStore } from '~/store';

export default {
  name: "Header",
  data() {
    return {
      isLoggedIn: authStore().isLoggedIn,
      permissions: {
        create_event: authStore().getPermission("create_event")
      }
    }
  },
  methods: {
    async logout() {
      authStore().logout()
    }
  },
  watch: {
    $route(to, from){
      this.isLoggedIn = authStore().isLoggedIn,
      this.permissions.create_event = authStore().getPermission("create_event")
    }
  }
}

</script>
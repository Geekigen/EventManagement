<template>
    <div class="flex md:flex-row flex-col items-center justify-center px-6 py-8 w-full">
        <div v-if="event" :key="event.uuid"
            class="transition duration-150 ease-in-out md:mt-0 mt-8 top-0 left-0 sm:ml-10 md:ml-10 w-10/12 md:w-1/2 shadow-2xl">

            <div class="bg-white shadow-md border border-gray-200 rounded-lg w-full dark:bg-gray-800 dark:border-gray-700">

                <img class="rounded-t-lg w-full h-80 object-cover"
                    src="https://st2.depositphotos.com/1017986/7924/i/450/depositphotos_79249744-stock-photo-group-of-happy-friends-at.jpg"
                    alt="">

                <div class="p-5">
                    <a href="#" @click="viewEvent(event.uuid)">
                        <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">{{ event.name
                        }} - {{ event.description }}</h5>
                    </a>
                    <p class="font-normal text-gray-700 mb-3 dark:text-gray-400">Venue : {{ event.venue }}</p>
                    <p class="font-normal text-gray-700 mb-3 dark:text-gray-400">Available tickets : {{ event.capacity }}</p>
                    <p class="font-normal text-gray-700 mb-3 dark:text-gray-400">Ticket price : Kshs. {{ event.price }}</p>
                    <p class="font-normal text-gray-700 mb-3 dark:text-gray-400">Start : {{ event.start}}</p>
                    <p class="font-normal text-gray-700 mb-3 dark:text-gray-400">End : {{ event.end }}</p>
                    <div class="flex flex-row gap-10 flex-wrap justify-center items-center my-10">
                        
                       
                        <button type="button" @click="viewAttendees"
                        class="w-100 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky dark:hover:bg-primary-700 dark:focus:ring-primary-800">Attendees</button>
                        <button type="button" @click="viewRoles"
                        class="w-100 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky dark:hover:bg-primary-700 dark:focus:ring-primary-800">Roles</button>
                        <button type="button" @click="updateEvent"
                        class="w-100 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update</button>
                        <button type="button" @click="deleteEvent"
                        class="w-100 text-white bg-blue-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky dark:hover:bg-primary-700 dark:focus:ring-primary-800">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="flex md:flex-row flex-col items-start justify-center px-6 py-8 w-full">
        <!--- more free and premium Tailwind CSS components at https://tailwinduikit.com/ --->

        <!-- Code block starts -->
        <div v-if="attendees.length" id="popover"
            class="transition duration-150 ease-in-out md:mt-0 mt-8 top-0 left-0 sm:ml-10 md:ml-10 w-10/12 md:w-1/2">
            <div class="w-full bg-white rounded shadow-2xl">
                <div class="relative bg-gray-200 rounded-t py-4 px-4 xl:px-8">
                    <h1>Special Attendees</h1>
                </div>
                <div class="w-full h-full px-4 xl:px-8 pt-3 pb-5">
                    <div v-for="attendee in attendees" :key="attendee.uuid">
                        <div v-if="attendee.role !== 'attendee'" class="flex justify-between items-center py-4">
                            <div class="flex items-center">
                                <div class="mr-4 w-12 h-12 rounded shadow">
                                    <img class="w-full h-full overflow-hidden object-cover object-center rounded"
                                        src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                                        alt="avatar" />
                                </div>
                                <div>
                                    <h3 class="mb-2 sm:mb-1 text-gray-800 text-base font-normal leading-4">
                                        {{ attendee.username }}</h3>
                                    <p class="text-gray-600 text-xs leading-3">{{ attendee.role }}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
        <!-- Code block ends -->
    </div>
</template>

<script>

export default {
    name: "Event",
    data() {
        return {
            error: "",
            eventId: this.$route.params.eventId,
            event: {},
            attendees: []
        }
    },
    methods: {
        async getEvent() {
            const response = await $fetch('http://127.0.0.1:8000/events/get/id/', {
                method: 'POST',
                body: {
                    event_id: this.eventId
                },
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            this.event = response.events[0]
            console.log(response);
        },

        async attendEvent() {
            const response = await $fetch('http://127.0.0.1:8000/events/attend/', {
                method: 'POST',
                body: {
                    event_id: this.eventId
                },
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            alert(response.message)
            console.log(response);
        },

        async updateEvent() {
            return await navigateTo(`/events/update/${this.eventId}`)
        },

        async deleteEvent() {
            try {
                const response = await $fetch('http://127.0.0.1:8000/events/delete/', {
                    method: 'POST',
                    body: {
                        event_id: this.eventId
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                alert(response.message)
                console.log(response);
            } catch (error) {
                this.error = error
            }
        },
        async createRole() {
            return await navigateTo(`/events/roles/create/${this.eventId}`)
        },

        async getAttendees() {
            try {
                const response = await $fetch('http://127.0.0.1:8000/events/attendees/get/', {
                    method: 'POST',
                    body: {
                        event_id: this.eventId
                    },
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                console.log(response);
                this.attendees = response.attendees
            } catch (error) {
                this.error = error
            }
        },

        async viewAttendees(){
            return  navigateTo(`/events/attendees/${this.eventId}/`)
        },

        async viewRoles(){
            return  navigateTo(`/events/roles/${this.eventId}/`)
        }

    },

    created() {
        this.getEvent(),
        this.getAttendees()
    }

}

</script>
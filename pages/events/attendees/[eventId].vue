<template>
    <div class="flex md:flex-row flex-col items-center justify-center px-6 py-8 w-full h-screen">
        <!--- more free and premium Tailwind CSS components at https://tailwinduikit.com/ --->

        <!-- Code block starts -->
        
        <div id="popover"
            class="transition duration-150 ease-in-out md:mt-0 mt-8 top-0 left-0 pb-10 sm:ml-10 md:ml-10 w-10/12 md:w-1/2 flex flex-col justify-center items-center gap-10">
            <div class="w-full bg-white rounded shadow-2xl pb-6">
                <div class="relative bg-gray-200 rounded-t py-4 px-4 xl:px-8 mb-5">
                    <h1>Attendees</h1>
                </div>
                <div v-if="attendees.length == 0" class="w-full h-full px-4 xl:px-8 pt-3 pb-10">
                    <h1>No attendees available</h1>
                </div>
                <div v-for="attendee in attendees" :key="attendee.uuid" class="w-full h-full px-8">
                    <div class="flex justify-between items-center">
                        <div class="flex items-center">
                            <div class="mr-4 w-12 h-12 rounded shadow">
                                    <img class="w-full h-full overflow-hidden object-cover object-center rounded"
                                        src="https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg"
                                        alt="avatar" />
                                </div>
                            <div>
                                <h3 class="mb-2 sm:mb-1 text-gray-800 text-base font-normal leading-4">{{ attendee.username }}</h3>
                                <p class="text-gray-600 text-xs leading-3">{{ attendee.role }}</p>
                            </div>
                        </div>
                        <div class="relative font-normal text-xs sm:text-sm flex items-center text-gray-600">
                            <button v-if="attendee.role == 'attendee'" type="button" @click="assignRole(attendee.uuid)"
                                class="w-120 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky dark:hover:bg-primary-700 dark:focus:ring-primary-800">Assign role</button>
                            <button v-if="attendee.role !== 'attendee'"  type="button" @click="unassignRole(attendee.uuid)"
                                class="w-120 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky dark:hover:bg-primary-700 dark:focus:ring-primary-800">Revoke role</button>
                        </div>

                    </div>
                    <hr class="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700">
                </div>
            </div>

        </div>
        <!-- Code block ends -->
    </div>
</template>

<script>

export default {
    name: "Attendees",
    data() {
        return {
            error: "",
            eventId: this.$route.params.eventId,
            attendees:[],
        }
    },
    methods:{
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

        async assignRole(attendeeId){
            return await navigateTo(`/events/roles/assign/${this.eventId}/${attendeeId}`)
        },

        async unassignRole(attendeeId){
            try {
                const response = await $fetch('http://127.0.0.1:8000/events/roles/unassign/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: "cors",
                    credentials: "include",
                    body: {
                        attendee_id: attendeeId,
                    }
                });
                
                if (response.code == "480") {
                    return await navigateTo(`/auth/login/`)
                }
                
                alert(response.message)

                if (response.code !== "200") {
                    return this.error = response.message
                }
                this.getAttendees()

            } catch (error) {
                this.error = "Connection error"
                console.error('Error:', error);
            }

        }
    },
    created(){
        this.getAttendees()
    }
}

</script>
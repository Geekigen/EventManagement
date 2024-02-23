<template>
    <div v-if="event">
        <h2>{{ event.uuid }}</h2>
        <h2>{{ event.name }}</h2>
        <h2>{{ event.description }}</h2>
        <h2>{{ event.venue }}</h2>
        <h2>{{ event.capacity }}</h2>
        <h2>{{ event.price }}</h2>
        <h2>{{ event.start }}</h2>
        <h2>{{ event.end }}</h2>
        <button type="button" @click="updateEvent">Update</button>
        <button type="button" @click="deleteEvent">Delete</button>
        <button type="button" @click="attendEvent">Attend</button>
    </div>
</template>

<script>

export default {
    name: "Event",
    data() {
        return {
            error:"",
            eventId: this.$route.params.eventId,
            event: {}
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

        async attendEvent(){
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

        async updateEvent(){
            return await navigateTo(`/events/update/${this.eventId}`)
        },

        async deleteEvent(){
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
        }
    },
    created() {
        this.getEvent()
    }

}

</script>
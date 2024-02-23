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
        <button type="button">Update</button>
        <button type="button">Delete</button>
    </div>
</template>

<script>

export default {
    name: "Event",
    data() {
        return {
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
        }
    },
    created() {
        this.getEvent()
    }

}

</script>
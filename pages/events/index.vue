<template>
    <div v-if="events.length" class="mb-8">
    <div v-for="event in events" :key="event.uuid">
        <h2>{{ event.uuid }}</h2>
        <h2>{{ event.name }}</h2>
        <h2>{{ event.description }}</h2>
        <h2>{{ event.venue }}</h2>
        <h2>{{ event.capacity }}</h2>
        <h2>{{ event.price }}</h2>
        <h2>{{ event.start }}</h2>
        <h2>{{ event.end }}</h2>
    </div>
    </div>
</template>

<script>
export default {
    name: "Events",
    data() {
        return {
            events: [],
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
    },
    created() {
        this.getEvents();
    },
};
</script>

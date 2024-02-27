<template>
    <div class="flex md:flex-row flex-col items-center justify-center px-6 py-8 w-full h-screen">
        <!--- more free and premium Tailwind CSS components at https://tailwinduikit.com/ --->

        <!-- Code block starts -->
        <div id="popover"
            class="transition duration-150 ease-in-out md:mt-0 mt-8 top-0 left-0 sm:ml-10 md:ml-10 w-10/12 md:w-1/2 flex flex-col justify-center items-center gap-10">
            <div class="w-full bg-white rounded shadow-2xl">
                <div class="relative bg-gray-200 rounded-t py-4 px-4 xl:px-8">
                    <h1>Roles</h1>
                </div>
                <div v-if="roles.length == 1" class="w-full h-full px-4 xl:px-8 pt-3 pb-5">
                    <h1>No roles available</h1>
                </div>
                <div v-for="role in roles" :key="role.uuid" class="w-full h-full">
                    <div v-if="role.name !== 'attendee'" class="w-full h-full px-4 xl:px-8 pt-3 pb-5">
                        <div class="flex justify-between items-center">
                        <div class="flex items-center">
                            <div>
                                <h3 class="mb-2 sm:mb-1 text-gray-800 text-base font-normal leading-4">{{role.name}}</h3>
                                <p class="text-gray-600 text-xs leading-3">{{ role.description }}</p>
                            </div>
                        </div>
                        <div class="relative font-normal text-xs sm:text-sm flex items-center text-gray-600">
                            <button type="button" @click="updateRole(role.uuid)"
                                class="w-100 mx-3 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky dark:hover:bg-primary-700 dark:focus:ring-primary-800">Update</button>
                            <button type="button" @click="deleteRole(role.uuid)"
                                class="w-100 text-white bg-blue-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky dark:hover:bg-primary-700 dark:focus:ring-primary-800">Delete</button>
                        </div>
                    </div>
                    </div>

                </div>
            </div>
             <button type="button" @click="createRole"
                            class="w-1/2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-sky dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create role</button>
        </div>
        <!-- Code block ends -->
    </div>
</template>

<script>

export default{
    name:"Roles",
    data(){
        return{
            error:"",
            roles:[],
            eventId: this.$route.params.eventId
        }
    },
    methods:{
        async getRoles(){
            try {
                const response = await $fetch('http://127.0.0.1:8000/events/roles/get/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode:"cors",
                    credentials:"include",
                    body: {
                        event_id: this.eventId,
                    }
                });

                if (response.code !== "200") {
                    return this.error = response.message
                }
                console.log(response);
                this.roles = response.roles

            } catch (error) {
                this.error = "Connection error"
                console.error('Error:', error);
            }
        },

        async deleteRole(roleId){
            try {
                const response = await $fetch('http://127.0.0.1:8000/events/roles/delete/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode:"cors",
                    credentials:"include",
                    body: {
                        role_id: roleId
                    }
                });

                if (response.code == "480") {
                    return await navigateTo(`/auth/login/`)
                }
                
                alert(response.message)

                if (response.code !== "200") {
                    return this.error = response.message
                }
                this.getRoles()

            } catch (error) {
                this.error = "Connection error"
                console.error('Error:', error);
            }
        },

        async updateRole(roleId){
            return await navigateTo(`/events/roles/update/${roleId}`)
        }, 
        
        async createRole(){
            return await navigateTo(`/events/roles/create/${this.eventId}`)
        }
    },
    created(){
        this.getRoles()
    }
}

</script>
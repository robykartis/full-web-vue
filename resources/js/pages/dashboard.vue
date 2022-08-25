<template>
    <div class="container">
        <h3>Dashboard</h3>
        <button class="btn btn-danger mt-3" @click="logout">Logout</button>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

export default {
    name: 'Dashboard',
    setup() {
        const router = useRouter()
        const store = useStore()
        function logout() {
            store.dispatch('removeToken');
            router.push({ name: 'Home' })
        }
        return {
            logout
        }
    }

}
</script>

<style>
</style>
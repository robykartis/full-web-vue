<template>
    <div class="container">
        <h3>Dashboard</h3>
        <button class="btn btn-danger mt-3" @click="logout">Logout</button>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
    name: 'Dashboard',
    setup() {
        const router = useRouter()
        function logout() {
            localStorage.removeItem('token');
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
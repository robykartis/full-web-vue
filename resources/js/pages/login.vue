<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-5 mt-4">

        <div class="card">
          <div class="card-header bg-dark text-white  ">
            Login
          </div>
          <div class="card-body">
            <h5 class="card-title"></h5>
            <p class="text-danger" v-if="error">{{ error }}</p>
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input v-model="form.email" type="email" class="form-control" id="email" aria-describedby="emailHelp" />
                <div id="emailHelp" class="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input v-model="form.password" type="password" class="form-control" id="password" />
              </div>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
export default {
  name: "Login",
  setup() {
    const router = useRouter()
    const store = useStore()
    let form = reactive({
      email: '',
      password: '',
    })
    let error = ref('')

    const login = async () => {
      await axios.post('/api/login', form).then(res => {
        if (res.data.success) {
          store.dispatch('setToken', res.data.data.token)
          router.push({ name: 'Dashboard' })
        } else {
          error.value = res.data.message
        }
      })
    }
    return {
      form,
      login,
      error,
    }
  }
};
</script>

<style>
</style>
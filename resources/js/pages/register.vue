<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-sm-5 mt-4">
        <div class="card">
          <div class="card-header bg-dark text-white  ">
            Register
          </div>
          <p class="text-danger" v-for="error in errors" :key="error">
            <span v-for="err in error" :key="err">{{ err }}</span>
          </p>
          <div class="card-body">
            <h5 class="card-title"></h5>
            <p class="text-danger" v-if="error">{{ error }}</p>
            <form @submit.prevent="register">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Name</label>
                <input v-model="form.name" type="text" class="form-control" id="name" aria-describedby="emailHelp" />
              </div>

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
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                <input v-model="form.c_password" type="password" class="form-control" id="c_password" />
              </div>
              <button type="submit" class="btn btn-primary">Register</button>
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
  name: "Register",
  setup() {
    const router = useRouter()
    const store = useStore()
    let form = reactive({
      name: '',
      email: '',
      password: '',
      c_password: '',
    })
    let errors = ref([])

    const register = async () => {
      await axios.post('/api/register', form).then(res => {
        if (res.data.success) {
          store.dispatch('setToken', res.data.data.token)
          router.push({ name: 'Dashboard' })
        }
      }).catch(e => {
        errors.value = e.response.data.message
      })
    }
    return {
      form,
      register,
      errors,
    }
  }
};
</script>

<style>
</style>
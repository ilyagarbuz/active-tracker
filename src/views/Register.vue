<template>
 <div class="max-w-screen-sm mx-auto py-4 px-5 sm:px-10">
    <!-- Error Handling -->
    <div v-if="errorMsg" class="bg-light-grey p-4 mb-10 shadow-lg rounded-md">
      <p class="text-red-500">{{errorMsg}}</p>
    </div>

    <!-- Register -->
    <form @submit.prevent="register" class="py-8 px-5 mb:px-8 flex flex-col bg-light-grey shadow-lg rounded-md" action="#">
      <h1 class="text-3xl text-at-light-green mb-4">Register</h1>

      <div class="flex flex-col mb-2">
        <label for="email" class="text-at-light-green text-sm mb-1">Email</label>
        <input v-model="email" required type="text" id="email" class="p-2 text-gray-500 focus:outline-none">
      </div>

      <div class="flex flex-col mb-2">
        <label for="password" class="text-at-light-green text-sm mb-1">Password</label>
        <input v-model="password" required type="password" id="password" class="p-2 text-gray-500 focus:outline-none">
      </div>

      <div class="flex flex-col mb-2">
        <label for="confirm" class="text-at-light-green text-sm mb-1">Confirm password</label>
        <input v-model="confirmpassword" required type="password" id="confirm" class="p-2 text-gray-500 focus:outline-none">
      </div>

      <button type="submit" class="mt-6 py-2 px-6 bg-at-light-green text-sm self-start
       text-white border-solid border-2 border-transparent hover:text-at-light-green hover:bg-white 
       hover:border-at-light-green duration-200"
       >Register</button>

       <router-link :to="{name: 'login'}" class="text-sm text-center mt-9">
        Already have an account? <span class="text-at-light-green">Login</span>
       </router-link>
    </form>
 </div>
</template>

<script>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {supabase} from '@/supabase/init.js';

export default {
  name: "register",
  setup() {
    // Create data / vars
    const router = useRouter();
    const email = ref(null);
    const password = ref(null);
    const confirmpassword = ref(null);
    const errorMsg = ref(null);

    // Register function
    const register = async () => {
      if (password.value === confirmpassword.value) {
        try {
          const {error} = await supabase.auth.signUp({
            email: email.value,
            password: password.value
          });

          if(error) throw error;

          router.push({name: 'login'})
          
        } catch (error) {
            errorMsg.value = error.message;
            setTimeout(() => {
              errorMsg.value = null;
            },5000)
        }

        return;
      }

      errorMsg.value = 'Error: passwords are not match';
      setTimeout(() => {
        errorMsg.value = null;
      },5000)
    }

    return { email, password, confirmpassword, errorMsg, register };
  },
};
</script>

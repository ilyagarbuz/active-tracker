<template>
<div v-if="dataLoaded" class=" container mt-10 px-4">
  <!-- No Data  -->
  <div v-if="data.length === 0" class="w-full flex flex-col items-center">
    <h1 class="text-2xl">Looks empty here...</h1>
    <router-link :to="{name: 'create'}" class="mt-6 py-2 px-6 bg-at-light-green text-sm
       text-white border-solid border-2 border-transparent hover:text-at-light-green hover:bg-white 
       hover:border-at-light-green duration-200">Create Workout
    </router-link>
  </div>

  <!-- Data -->
  <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <router-link 
    v-for="workout in data"
    :key="workout.id"
    :to="{name: 'view-workout', params: {id: workout.id} }" 
    class="flex flex-col items-center bg-light-grey p-8 shadow-md cursor-pointer">

    <!-- Cardio Img -->
    <img v-if="workout.workoutType === 'cardio'" src="@/assets/images/running-light-green.png" class="h-24 w-auto" alt="cardio exercise">

    <!-- Strength Img -->
    <img v-else src="@/assets/images/dumbbell-light-green.png" class="h-24 w-auto" alt="strength exercise">

    <p class="mt-6 py-1 px-3 text-xs text-white bg-at-light-green shadow-md rounded-lg">
      {{workout.workoutType}}
    </p>

    <h1 class="mt-8 mb-2 text-center text-xl text-at-light-green">
      {{workout.workoutName}}
    </h1>
    </router-link>
  </div>
</div>
</template>

<script>
import {ref} from 'vue';
import {supabase} from '@/supabase/init.js'

export default {
  name: "home",
  components: {},
  setup() {
    // Create data / vars
    const data = ref([]);
    const dataLoaded = ref(false);

    // Get data
    const getData = async () => {
      try {
        const { data: activeties, error } = await supabase.from('activeties').select('*');
        if(error) throw error;
        dataLoaded.value = true;
        data.value = activeties;
      } catch (error) {
        console.warn(error.message)
      }
    };

    // Run data function
    getData();
    

    return { data, dataLoaded };
  },
};
</script>

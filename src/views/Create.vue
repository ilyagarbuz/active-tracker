<template>
<div class="">
  <div class="max-w-screen-md mx-auto py-10 px-4">
    <!-- Status Messages -->
    <div v-if="statusMsg || errorMsg" class="mb-10 p-4 bg-light-grey rounded-md shadow-lg">
      <p class="text-at-light-green">{{statusMsg}}</p>
      <p class="text-red-500">{{errorMsg}}</p>
    </div>

    <!-- Create -->
    <div class="p-8 flex items-start bg-light-grey rounded-md shadow-lg">
      <!-- Form -->
      <form @submit.prevent="createWorkout" class="flex flex-col gap-y-5 w-full">

        <h1 class="text-2xl text-at-light-green">Record Workout</h1>

        <!-- Workout Name -->
        <div class="flex flex-col">
          <label for="workout-name" class="md-1 text-sm text-at-light-green">
            Workout Name
          </label>
          <input v-model="workoutName" type="text" required class="p-2 text-gray-500 focus:outline-none" id="workout-name">
        </div>

        <!-- Workout Type -->
        <div class="flex flex-col">
          <label for="workout-type" class="md-1 text-sm text-at-light-green">
            Workout Type
          </label>
          <select v-model="workoutType" @change="workoutTypeChanging " required id="workout-type" class="p-2 text-gray-500 focus:outline-none">
            <option value="select-workout">Select Workout</option>
            <option value="strength">Strength Training</option>
            <option value="cardio">Cardio</option>
          </select>
        </div>

        <!-- Strength Training Inputs -->
        <div v-if="workoutType === 'strength'" class="flex flex-col gap-y-4">
          <div v-for="(item, index) in exercises" :key="index" class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row">
            <div class="flex flex-col md:w-1/3">
              <label for="exercise-name" class="mb-1 text-sm text-at-light-green">
                Exercise
              </label>
              <input v-model="item.exercise" required type="text" class="p-2 w-full text-gray-500 focus:outline-none">
            </div>
            <div class="flex flex-col md:w-1/3">
              <label for="sets" class="mb-1 text-sm text-at-light-green">
                Sets
              </label>
              <input v-model="item.sets" required type="text" class="p-2 w-full text-gray-500 focus:outline-none">
            </div>
            <div class="flex flex-col md:w-1/3">
              <label for="reps" class="mb-1 text-sm text-at-light-green">
                Reps
              </label>
              <input v-model="item.reps" required type="text" class="p-2 w-full text-gray-500 focus:outline-none">
            </div>
            <div class="flex flex-col md:w-1/3">
              <label for="weight" class="mb-1 text-sm text-at-light-green">
                weight
              </label>
              <input v-model="item.weight" required type="text" class="p-2 w-full text-gray-500 focus:outline-none">
            </div>
            <img @click="deleteExercise(item.id)" src="@/assets/images/trash-light-green.png" class="h-4 w-auto absolute -left-5 cursor-pointer" alt="trash">
          </div>
          <button @click="addExercise" type="button" class="mt-6 py-2 px-6 bg-at-light-green text-sm self-start
          text-white border-solid border-2 border-transparent hover:text-at-light-green hover:bg-white 
          hover:border-at-light-green duration-200"
          >Add Exercise</button>
        </div>

        <!-- Cardio Inputs -->
        <div v-if="workoutType === 'cardio'" class="flex flex-col gap-y-4">
          <div v-for="(item, index) in exercises" :key="index" class="flex flex-col gap-x-6 gap-y-2 relative md:flex-row">
            <div class="flex flex-col md:w-1/3">
              <label for="cardio-type" class="mb-1 text-sm text-at-light-green">
                Cardio Type
              </label>
              <select v-model="item.cardioType" id="cardio-type" class="p-2 w-full text-gray-500 focus:outline-none">
                <option value="#">Select Type</option>
                <option value="run">Runs</option>
                <option value="walk">Walk</option>
              </select>
            </div>
            <div class="flex flex-col md:w-1/3">
              <label for="distance" class="mb-1 text-sm text-at-light-green">
                Distance
              </label>
              <input v-model="item.distance" required type="text" class="p-2 w-full text-gray-500 focus:outline-none">
            </div>
            <div class="flex flex-col md:w-1/3">
              <label for="duration" class="mb-1 text-sm text-at-light-green">
                Duration
              </label>
              <input v-model="item.duration" required type="text" class="p-2 w-full text-gray-500 focus:outline-none">
            </div>
            <div class="flex flex-col md:w-1/3">
              <label for="pace" class="mb-1 text-sm text-at-light-green">
                Pace
              </label>
              <input v-model="item.pace" required type="text" class="p-2 w-full text-gray-500 focus:outline-none">
            </div>
            <img @click="deleteExercise(item.id)" src="@/assets/images/trash-light-green.png" class="h-4 w-auto absolute -left-5 cursor-pointer" alt="trash">
          </div>
          <button @click="addExercise" type="button" class="mt-6 py-2 px-6 bg-at-light-green text-sm self-start
          text-white border-solid border-2 border-transparent hover:text-at-light-green hover:bg-white 
          hover:border-at-light-green duration-200"
          >Add Exercise</button>
        </div>

        <button type="submit" class="mt-6 py-2 px-6 bg-at-light-green text-sm self-start
          text-white border-solid border-2 border-transparent hover:text-at-light-green hover:bg-white 
          hover:border-at-light-green duration-200"
        >Record Workout</button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import {ref} from 'vue'
import {uid} from 'uid';
import {supabase} from '@/supabase/init.js'

export default {
  name: "create",
  setup() {
    // Create data
    const workoutName = ref('');
    const workoutType = ref('select-workout');
    const exercises = ref([]);
    const statusMsg = ref(null);
    const errorMsg = ref(null);

    // Add exercise
    const addExercise = () => {
      if(workoutType.value === 'strength') {
        exercises.value.push({
          id: uid(),
          exercise: '',
          sets: '',
          reps: '',
          weight: '',
        })
        return;
      }
      exercises.value.push({
        id: uid(),
        cardioType: '',
        distance: '',
        duration: '',
        pace: '',
      })

    }

    // Delete exercise
    const deleteExercise = (id) => {
      if (exercises.value.length > 1) {
        exercises.value = exercises.value.filter(exercise => exercise.id !== id);
        return;
      }

      errorMsg.value = "Error: Cannot remove, need to at least have one exercise";
      setTimeout(() => {
        errorMsg.value = null;
      },5000);
    }


    // Listens for chaging of workout type input
    const workoutTypeChanging = () => {
      exercises.value = [];
      addExercise();
    }

    // Create workout
    const createWorkout = async () => {
      try {
        const {error} = await supabase.from('activeties').insert([{
          workoutName: workoutName.value,
          workoutType: workoutType.value,
          exercises: exercises.value,
        }])
        if (error) throw error
        statusMsg.value = `Success. Workout created!`
        setTimeout(() => {
          statusMsg.value = null;
        }, 5000);
        workoutName.value = '';
        workoutType.value = 'select-workout';
        exercises.value = [];
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    }


    return {
      workoutName,
      workoutType,
      exercises,
      statusMsg,
      errorMsg,
      addExercise,
      workoutTypeChanging,
      deleteExercise,
      createWorkout,
    };
  },
};
</script>

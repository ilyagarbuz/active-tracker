<template>
  <div class="max-w-screen-sm mx-auto px-4 py-10">
    <!-- App Msg -->
    <div v-if="statusMsg || errorMsg" class="mb-10 p-4 rounded-md shadow-md bg-light-grey">
      <p class="text-at-light-green">
        {{statusMsg}}
      </p>
      <p class="text-red-500">
        {{errorMsg}}
      </p>
    </div>

    <div v-if="dataLoaded">
      <!-- General Workout Information -->
      <div class="flex flex-col items-center p-8 rounded-md shadow-md bg-light-grey relative">

        <!-- Edit and Delete buttons -->
        <div v-if="user" class="flex absolute left-2 top-2 gap-x-2">
          <div @click="editMode" class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg">
            <img class="h-3.5 w-auto" src="@/assets/images/pencil-light.png" alt="pencil">
          </div>
          <div class="h-7 w-7 rounded-full flex justify-center items-center cursor-pointer bg-at-light-green shadow-lg">
            <img @click="deleteWorkout" class="h-3.5 w-auto" src="@/assets/images/trash-light.png" alt="trash">
          </div>
        </div>
        
        <!-- Cardio Image -->
        <img v-if="data.workoutType === 'cardio'" class="h-24 w-auto" src="@/assets/images/running-light-green.png" alt="">

        <!-- Strength Image -->
        <img v-else class="h-24 w-auto" src="@/assets/images/dumbbell-light-green.png" alt="">

        <span class="mt-6 py-1.5 px-5 text-xs text-white bg-at-light-green rounded-lg shadow-md">
          {{data.workoutType}}
        </span>

        <div class="w-full mt-6">
          <input v-if="edit"
           v-model="data.workoutName"
          type="text" 
          class="p-2 w-full text-gray-500 focus:outline-none">
          <h1 v-else class="text-at-light-green text-2xl text-center">
            {{data.workoutName}}
          </h1>
        </div>
      </div>

      <!-- Exercises -->
      <div class="mt-10 p-8 rounded-md flex flex-col items-center bg-light-grey shadow-md">

        <!-- Strength Traning -->
        <div v-if="data.workoutType === 'strength'" class="flex flex-col gap-x-4 w-full">
          <div v-for="exercise in data.exercises" :key="exercise.id" class="mt-2 flex flex-col gap-x-6 gap-y-2 relative sm:flex-row">
            <div class="flex flex-2 flex-col md:w-1/3">
              <label for="exercise-name" class="mb-1 text-sm text-at-light-green">
                Exercise
              </label>
              <input v-if="edit" v-model="exercise.exercise" id="sets" class="p-2 w-full text-gray-500 focus:outline-none" type="text">
              <p v-else>{{exercise.exercise}}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="sets" class="mb-1 text-sm text-at-light-green">
                Sets
              </label>
              <input v-if="edit" v-model="exercise.sets" id="sets" class="p-2 w-full text-gray-500 focus:outline-none" type="text">
              <p v-else>{{exercise.sets}}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="reps" class="mb-1 text-sm text-at-light-green">
                Reps
              </label>
              <input v-if="edit" v-model="exercise.reps" id="reps" class="p-2 w-full text-gray-500 focus:outline-none" type="text">
              <p v-else>{{exercise.reps}}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="weight" class="mb-1 text-sm text-at-light-green">
                Weight
              </label>
              <input v-if="edit" v-model="exercise.weight" id="weight" class="p-2 w-full text-gray-500 focus:outline-none" type="text">
              <p v-else>{{exercise.weight}}</p>
            </div>
            <img @click="deleteExercise(exercise.id)" v-if="edit" class="absolute h-4 w-auto -left-5 cursor-pointer" src="@/assets/images/trash-light-green.png" alt="trash">  
          </div>
          <button @click="addExercise" v-if="edit" type="button" class="mt-6 py-2 px-6 bg-at-light-green text-sm self-start
          text-white border-solid border-2 border-transparent hover:text-at-light-green hover:bg-white 
          hover:border-at-light-green duration-200"
          >Add Exercise</button> 
        </div>

        <!-- Cardio Traning -->
        <div v-else class="flex flex-col gap-x-4 w-full">
          <div v-for="exercise in data.exercises" :key="exercise.id" class="mt-2 flex flex-col gap-x-6 gap-y-2 relative sm:flex-row">
            <div class="flex flex-2 flex-col md:w-1/3">
              <label for="cardio-type" class="mb-1 text-sm text-at-light-green">
                Cardio Type
              </label>
              <select v-if="edit" v-model="exercise.cardioType" id="cardioType" class="p-2 w-full text-gray-500 focus:outline-none" type="text">
                <option value="#">Select Type</option>
                <option value="run">Runs</option>
                <option value="walk">Walk</option>
              </select>
              <p v-else>{{exercise.cardioType}}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="distance" class="mb-1 text-sm text-at-light-green">
                Distance
              </label>
              <input v-if="edit" v-model="exercise.distance" id="distance" class="p-2 w-full text-gray-500 focus:outline-none" type="text">
              <p v-else>{{exercise.distance}}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="duration" class="mb-1 text-sm text-at-light-green">
                Duration
              </label>
              <input v-if="edit" v-model="exercise.duration" id="duration" class="p-2 w-full text-gray-500 focus:outline-none" type="text">
              <p v-else>{{exercise.duration}}</p>
            </div>
            <div class="flex flex-1 flex-col">
              <label for="pace" class="mb-1 text-sm text-at-light-green">
                Pace
              </label>
              <input v-if="edit" v-model="exercise.pace" id="pace" class="p-2 w-full text-gray-500 focus:outline-none" type="text">
              <p v-else>{{exercise.pace}}</p>
            </div>
            <img @click="deleteExercise(exercise.id)" v-if="edit" class="absolute h-4 w-auto -left-5 cursor-pointer" src="@/assets/images/trash-light-green.png" alt="trash">  
          </div>
          <button @click="addExercise" v-if="edit" type="button" class="mt-6 py-2 px-6 bg-at-light-green text-sm self-start
          text-white border-solid border-2 border-transparent hover:text-at-light-green hover:bg-white 
          hover:border-at-light-green duration-200"
          >Add Exercise</button> 
        </div>
      </div>

      <!-- Update -->
      <button v-if="edit" @click="update" type="button" class="mt-10 py-2 px-6 bg-at-light-green text-sm self-start
      text-white border-solid border-2 border-transparent hover:text-at-light-green hover:bg-white 
      hover:border-at-light-green duration-200"
      >Update</button> 
    </div>
  </div>
</template>

<script>
import {ref, computed} from 'vue';
import {useRoute, useRouter} from  'vue-router';
import {supabase} from '@/supabase/init.js'
import store from '@/store/index.js'
import { uid } from 'uid';

export default {
  name: "view-workout",
  setup() {
    // Create data / vars
    const data = ref([]);
    const dataLoaded = ref(false)
    const route = useRoute();
    const router = useRouter();
    const errorMsg = ref(null);
    const statusMsg = ref(null);
    const user = computed(() => store.state.user);
    const edit = ref(false);

    // Get current Id of route
    const currentId = route.params.id;

    // Get workout data
    const getData = async () => {
      try {
        const { data: activeties, error } = await supabase.from('activeties').select('*').eq('id', currentId);
        if(error) throw error;
        dataLoaded.value = true;
        data.value = activeties[0];
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    };

    getData();

    // Delete workout
    const deleteWorkout = async () => {
      try {
        const {error} = await supabase.from('activeties').delete().eq('id', currentId);
        if (error) throw error;
        router.push({name: 'home'});
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000)
      }
    }

    // Edit mode
    const editMode = () => {
      edit.value = !edit.value;
    }

    // Add exercise
        const addExercise = () => {
      if(data.value.workoutType.value === 'strength') {
        data.value.exercises.push({
          id: uid(),
          exercise: '',
          sets: '',
          reps: '',
          weight: '',
        })
        return;
      }
      data.value.exercises.push({
        id: uid(),
        cardioType: '',
        distance: '',
        duration: '',
        pace: '',
      })

    }

    // Delete exercise
    const deleteExercise = (id) => {
      if (data.value.exercises.length > 1) {
        data.value.exercises = data.value.exercises.filter(exercise => exercise.id !== id);
        return;
      }

      errorMsg.value = "Error: Cannot remove, need to at least have one exercise";
      setTimeout(() => {
        errorMsg.value = null;
      },5000);
    }

    // Update Workout
    const update = async () => {
      try {
        const {error} = await supabase.from('activeties')
          .update({
            workoutName: data.value.workoutName,
            exercises: data.value.exercises,
          })
          .eq('id', currentId)
        if(error) throw error;
        edit.value = false;
        statusMsg.value = `Success. Workout updated!`;
        setTimeout(() => {
          statusMsg.value = null;
        }, 5000);  
      } catch (error) {
        errorMsg.value = `Error: ${error.message}`
        setTimeout(() => {
          errorMsg.value = null;
        }, 5000);
      }
    }

    return {
      data, 
      dataLoaded, 
      statusMsg, 
      errorMsg, 
      edit, 
      editMode, 
      user, 
      deleteWorkout, 
      addExercise, 
      deleteExercise, 
      update,
    };
  },
};
</script>

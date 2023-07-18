<script lang="ts" setup>
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { ref, toRefs } from "vue";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { storeToRefs } from "pinia";
import { useloginUserCredentialStore } from "../stores/credential";
import router from "../router";
import {
  REGISTER,
  LOGIN,
  SIGN_IN,
  REGISTER_HERE,
  EMAIL_ADDRESS,
  PASSWORD,
} from "../constants/constants";

const { getEmail } = storeToRefs(useloginUserCredentialStore());
const { updateCreds } = useloginUserCredentialStore();
const props = defineProps({
  selectedTab: String,
});
const { selectedTab } = toRefs(props);

let email = ref("");
let password = ref("");
let username = ref("");
let currentUserEmail = ref("");
let loading = ref(false);

async function register() {
  try {
    loading.value = true;
    const res = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    await updateProfile(res.user, {
      displayName: username.value,
    });
    username.value = "";
    email.value = "";
    password.value = "";
  } catch (e: any) {
    alert(e.message);
    console.error(e.message);
  } finally {
    loading.value = false;
  }
}

async function signin() {
  try {
    loading.value = true;
    const user = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    email.value = "";
    password.value = "";
  } catch (e: any) {
    alert(e.message);
    console.error(e.message);
  } finally {
    loading.value = false;
  }
}

onAuthStateChanged(auth, (currentUser) => {
  updateCreds(currentUser);

  currentUserEmail.value = getEmail?.value;
  if (currentUserEmail.value) {
    router.push("/");
  }
});
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        {{
          selectedTab === LOGIN
            ? "Sign in to your account"
            : "Register a New Account"
        }}
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div v-if="selectedTab == REGISTER">
          <div>
            <label
              for="username"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Username</label
            >
            <div class="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                v-model="username"
              />
            </div>
          </div>
        </div>

        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >{{ EMAIL_ADDRESS }}</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              v-model="email"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >{{ PASSWORD }}</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              v-model="password"
            />
          </div>
        </div>
        <div v-if="loading == true" class="spinner">
          <div role="status">
            <svg
              aria-hidden="true"
              class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <div v-else="loading == false">
          <button
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click.stop.prevent="
              `${selectedTab == LOGIN ? signin() : register()}`
            "
          >
            {{ selectedTab === LOGIN ? SIGN_IN : REGISTER_HERE }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.spinner > div {
  display: flex;
  justify-content: center;
}
</style>

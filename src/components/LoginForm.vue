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

async function register() {
  try {
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
  }
}

async function signin() {
  try {
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

        <div>
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

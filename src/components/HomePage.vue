<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { auth } from "../firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useloginUserCredentialStore } from "../stores/credential";
const { getEmail, getUsername } = storeToRefs(useloginUserCredentialStore());
const { updateCreds } = useloginUserCredentialStore();
import router from "../router";
import { ref } from "vue";
import { signOut } from "firebase/auth";
import { SIGN_OUT } from "../constants/constants";

let currentUserEmail = ref("");
let currentUserUserName = ref("");
let loading = ref(true);

async function signout() {
  try {
    signOut(auth);
  } catch (e: any) {
    alert(e.message);
    console.error(e.message);
  }
}

onAuthStateChanged(auth, (currentUser) => {
  loading.value = true;
  updateCreds(currentUser);

  currentUserEmail.value = getEmail?.value;
  currentUserUserName.value = getUsername?.value;
  loading.value = false;

  if (!currentUserEmail.value) {
    router.push("/signIn");
  }
});
</script>
<template>
  <button
    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sign-out"
    @click.stop.prevent="signout()"
  >
    {{ SIGN_OUT }}
  </button>

  <div class="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
    <img
      src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
      alt=""
      class="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
    />
    <div
      class="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      aria-hidden="true"
    >
      <div
        class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      ></div>
    </div>
    <div
      class="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
      aria-hidden="true"
    >
      <div
        class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      ></div>
    </div>
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Work with us
        </h2>
        <p class="mt-6 text-lg leading-8 text-gray-300">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
          aliqua.
        </p>
      </div>
      <div class="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
        <dl
          class="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div class="flex flex-col-reverse">
            <dt class="text-base leading-7 text-gray-300">
              {{ loading ? "Loading..." : currentUserUserName }}
            </dt>
            <dd class="text-2xl font-bold leading-9 tracking-tight text-white">
              Username
            </dd>
          </div>
          <div class="flex flex-col-reverse">
            <dt class="text-base leading-7 text-gray-300">
              {{ loading ? "Loading..." : currentUserEmail }}
            </dt>
            <dd class="text-2xl font-bold leading-9 tracking-tight text-white">
              Email
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<style>
.sign-out {
  position: absolute;
  width: 95px;
  right: 10px;
  top: 10px;
  z-index: 1;
}
</style>

/** Sign in Page Template */

<script lang="ts" setup>
import LoginForm from "../components/LoginForm.vue";
import {
  SIGN_IN_FORM_LABEL,
  REGISTER_FORM_LABEL,
  LOGIN,
  REGISTER,
} from "../constants/constants";
import { ref } from "vue";

let selectedTab = ref(LOGIN);

function selectLoginTab() {
  selectedTab.value = LOGIN;
}

function selectRegisterTab() {
  selectedTab.value = REGISTER;
}
</script>

<template>
  <main>
    <div>
      <div class="form-section">
        <div class="tabs">
          <div
            @click="selectLoginTab()"
            :class="`${selectedTab === LOGIN && 'selectedTab'}`"
          >
            {{ SIGN_IN_FORM_LABEL }}
          </div>
          <div
            @click="selectRegisterTab()"
            :class="`${selectedTab === REGISTER && 'selectedTab'}`"
          >
            {{ REGISTER_FORM_LABEL }}
          </div>
        </div>
        <LoginForm :selectedTab="selectedTab" />
      </div>
    </div>
  </main>
</template>

<style>
.form-section {
  margin: 4.75rem auto;
  width: 38.75rem;
  border: 1px solid black;
}
.tabs {
  cursor: pointer;
  display: flex;
  color: black;
  justify-content: space-between;
}
.tabs > div {
  width: 50%;
  display: flex;
  justify-content: center;
  padding: 0.375rem;
  border: 0.0625rem solid black;
}
.selectedTab {
  border-bottom: none !important;
}
</style>

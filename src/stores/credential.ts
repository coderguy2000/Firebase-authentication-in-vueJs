import { defineStore } from "pinia";

export const useloginUserCredentialStore = defineStore({
  id: "loginUserCredential",
  state: () => ({
    currentUserEmail: "",
    currentUserUsername: "",
  }),
  getters: {
    getEmail: (state) => {
      return state.currentUserEmail;
    },
    getUsername: (state) => {
      return state.currentUserUsername;
    },
  },
  actions: {
    updateCreds(currentUser: any) {
      this.currentUserEmail = currentUser?.email;
      this.currentUserUsername = currentUser?.displayName;
    },
  },
});

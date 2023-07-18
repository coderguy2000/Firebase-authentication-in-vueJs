import { defineStore } from "pinia";

interface loginUserCredential {
  currentUserEmail: string;
  currentUserUsername: string;
}
export const useloginUserCredentialStore = defineStore({
  id: "loginUserCredential",
  state: () => ({
    currentUserEmail: "",
    currentUserUsername: "",
  }),
  getters: {
    getEmail: (state: loginUserCredential) => {
      return state.currentUserEmail;
    },
    getUsername: (state: loginUserCredential) => {
      return state.currentUserUsername;
    },
  },
  actions: {
    updateCreds(currentUser: any) {
      this.currentUserEmail = currentUser.email;
      this.currentUserUsername = currentUser.displayName;
    },
  },
});

<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Name*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click.prevent="changeUserData()"
          >
            Закрыть
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click.prevent="unconfirmChangingUserData()"
          >
            Подтвердить изменения
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/userStore";

const userStore = useUserStore();

const dialog = ref(true);

const changeUserData = () => {
  dialog.value = false;
  userStore.showChangeUserDataDialog = false;
};
const unconfirmChangingUserData = () => {
  dialog.value = false;
  userStore.showChangeUserDataDialog = false;
};
</script>

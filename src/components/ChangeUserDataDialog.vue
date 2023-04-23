<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="1024" persistent>
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    type="text"
                    v-model="name"
                    :counter="10"
                    :rules="nameRules"
                    label="Name"
                    required
                  ></v-text-field>

                  <v-text-field
                    type="email"
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>

                  <v-text-field
                    type="password"
                    v-model="password"
                    :rules="passRules"
                    label="Password"
                    required
                  ></v-text-field>

                  <v-checkbox
                    v-model="checkbox"
                    :rules="checkboxRules"
                    label="Подтвердить"
                    required
                  ></v-checkbox>

                  <v-alert v-if="error" closable class="mt-7" type="warning">{{
                    error
                  }}</v-alert>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
          <small>*обязательно к заполнению</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click.prevent="changeUserData()"
          >
            Закрыть
            {{ valid }}
          </v-btn>
          <v-btn
            :disabled="!valid || !checkbox || processing"
            color="blue-darken-1"
            variant="text"
            @click.prevent="unconfirmChangingUserData()"
          >
            Подтвердить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script setup>
import { computed, ref } from "vue";
import { useUserStore } from "@/store/userStore";
import { useMainStore } from "@/store/mainStore";

const userStore = useUserStore();
const mainStore = useMainStore();

const dialog = ref(true);
const valid = computed(() => {
  return !!name.value && !!password.value && !!email.value;
});

// CHECKBOX CONFIRMATION
const checkbox = ref(false);
const checkboxRules = [(v) => !!v || "You must agree to continue!"];

// NAME
const name = ref("");
const nameRules = [
  (v) => !!v || "Name is required",
  (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
];

// PASSWORD
const password = ref("");
const passRules = [
  (p) => (p && p.length >= 6) || "Password be more than 5 characters",
];

// EMAIL
const email = ref("");
const emailRules = [
  (v) => !!v || "E-mail is required",
  (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
];

// фикс ошибки
const error = computed(() => mainStore.getError);

// модель для ongoing процесса регистрации
const processing = computed(() => mainStore.getProcessing);

const changeUserData = () => {
  dialog.value = false;
  userStore.showChangeUserDataDialog = false;
};
const unconfirmChangingUserData = () => {
  dialog.value = false;
  userStore.showChangeUserDataDialog = false;
};
</script>

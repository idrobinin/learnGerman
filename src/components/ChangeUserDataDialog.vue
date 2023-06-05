<template>
  <v-row justify="center">
    <v-dialog v-model="dialogModel" max-width="800" persistent>
      <v-card class="pa-2">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <h4 class="mb-5">Подтвердите данные</h4>
                  <v-text-field
                    type="email"
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  />

                  <v-text-field
                    type="password"
                    v-model="password"
                    :rules="passRules"
                    label="Password"
                    required
                  />

                  <h4 class="mb-3">Я хочу изменить</h4>
                  <v-radio-group v-model="changeType">
                    <v-radio label="Имя" value="name" />
                    <v-text-field
                      v-if="changeType === 'name'"
                      type="text"
                      v-model="newName"
                      :counter="10"
                      :rules="nameRules"
                      label="new Name"
                      required
                    />
                    <v-radio label="Почта" value="email" />
                    <v-text-field
                      v-if="changeType === 'email'"
                      type="email"
                      v-model="newEmail"
                      :rules="emailRules"
                      label="new E-mail"
                      required
                    />
                    <v-radio label="Пароль" value="password" />
                    <v-text-field
                      v-if="changeType === 'password'"
                      type="password"
                      v-model="newPassword"
                      :rules="passRules"
                      label="new Password"
                      required
                    />
                  </v-radio-group>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click.prevent="unconfirmChangingUserData"
          >
            Отмена
          </v-btn>
          <v-btn
            :disabled="!valid || processing"
            color="blue-darken-1"
            variant="text"
            @click.prevent="changeUserData"
          >
            Изменить
          </v-btn>
        </v-card-actions>
        <v-alert v-if="error" closable class="mt-7" type="warning">{{
          error
        }}</v-alert>
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

const userId = userStore.userId;

// new Data to change
const newName = ref(null);
const newEmail = ref(null);
const newPassword = ref(null);
const changeType = ref("name");

const dialogModel = ref(true);

const valid = computed(() => {
  return (
    !!password.value &&
    !!email.value &&
    (newPassword.value || newEmail.value || newName.value)
  );
});

// NAME
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

// функция изменения данных пользователя
const changeUserData = async () => {
  await userStore.CHANGE_USER_DATA_PROFILE(
    userId,
    newEmail.value,
    newName.value,
    newPassword.value,
    password.value,
    email.value
  );

  if (!error.value) {
    dialogModel.value = false;
    userStore.showChangeUserDataDialog = false;
  }
};

// функция отмены изменений данных пользователя и закрыть окно
const unconfirmChangingUserData = () => {
  dialogModel.value = false;
  userStore.showChangeUserDataDialog = false;
};
</script>

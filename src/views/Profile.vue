<template>
  <div class="profile">
    <v-container>
      <v-layout class="d-flex flex-wrap">
        <v-col cols="10" offset="1">
          <v-tabs v-model="tabMode" fixed-tabs>
            <v-tab v-for="tab in tabs" :value="tab.key" :key="tab.key">
              {{ tab.name }}
            </v-tab>
          </v-tabs>

          <v-card-text>
            <!--        часть с данными пользователя        -->
            <v-window v-model="tabMode">
              <v-window-item value="data">
                <user-profile-data />
              </v-window-item>

              <!--    часть с книгами   -->
              <v-window-item value="books">
                <books-list />
              </v-window-item>

              <!--    часть со словами    -->
              <v-window-item value="words">
                <user-profile-words />
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-col>
      </v-layout>
    </v-container>
  </div>
</template>

<script setup>
import { ref } from "vue";
import UserProfileData from "@/components/UserProfileData.vue";
import UserProfileWords from "@/components/UserProfileWords.vue";
import { useUserDataStore } from "@/store/userDataStore";
import BooksList from "@/components/BooksList.vue";

const userDataStore = useUserDataStore();

// модель для табов
const tabMode = ref("data");
const tabs = ref([
  { key: "data", name: "Мои данные" },
  { key: "books", name: "Мои книги" },
  { key: "words", name: "Мои слова" },
]);
</script>

<style scoped>
.profile {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.profile::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/images/profile-bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: blur(2px);
}
</style>

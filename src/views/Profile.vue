<template>
  <v-container>
    <v-layout class="d-flex flex-wrap">
      <v-col sm="12" md="10" offset-md="1">
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
            <v-window-item value="books">Мои книги</v-window-item>

            <!--    часть со словами    -->
            <v-window-item value="words">Мои слова</v-window-item>
          </v-window>
        </v-card-text>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import UserProfileData from "@/components/userProfileData.vue";

// модель для табов
const tabMode = ref("data");
const tabs = ref([
  { key: "data", name: "Мои данные" },
  { key: "books", name: "Мои книги" },
  { key: "words", name: "Мои слова" },
]);
</script>

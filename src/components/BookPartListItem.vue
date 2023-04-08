<template>
  <v-card color="blue-lighten-1" class="text-white">
    <v-card-title class="text-h4 text-center">{{ part.title }}</v-card-title>
    {{ part }}

    <v-card-actions>
      <v-spacer></v-spacer>
      <router-link
        v-if="isUserBookLoaded"
        style="width: 100px"
        class="text-decoration-none px-4 py-2 bg-yellow text-center text-blue rounded-lg"
        :to="{
          name: 'bookPart',
          params: { bookId: bookId, partId: part.id },
        }"
        @click="userDataStore.UPDATE_USER_BOOK_PART_STATS(bookId, part.id)"
        >Открыть
      </router-link>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed } from "vue";
import { useUserDataStore } from "@/store/userDataStore";
import { useUserStore } from "@/store/userStore";
import { useMainStore } from "@/store/mainStore";

const userStore = useUserStore();
const mainStore = useMainStore();
const userDataStore = useUserDataStore();

const isUserAuthenticated = userStore.isUserAuthenticated;
const getProcessing = mainStore.getProcessing;

const props = defineProps({
  part: {
    type: Object,
    required: true,
    default: () => {},
  },
  bookId: {
    type: String,
    required: true,
  },
});

const add = () => {
  console.log(456);
};

// проверка загружена ли книга в БД профайл пользователя
const isUserBookLoaded = computed(() => {
  return (
    isUserAuthenticated &&
    !getProcessing &&
    !!userDataStore.userData.books[props.bookId]
  );
});
</script>

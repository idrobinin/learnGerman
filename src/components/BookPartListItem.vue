<template>
  <v-card color="blue-lighten-1" class="text-white d-flex align-center">
    <v-card-title class="text-h4 text-center">
      <v-icon
        v-if="finishedDate"
        icon="mdi-check"
        color="yellow"
        size="large"
      />{{ part.title }}</v-card-title
    >
    <v-spacer />
    <v-card-actions>
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

const userStore = useUserStore();
const userDataStore = useUserDataStore();

const isUserAuthenticated = userStore.isUserAuthenticated;

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

// проверка загружена ли книга в БД профайл пользователя для отображения кнопки
const isUserBookLoaded = computed(() => {
  return isUserAuthenticated && !!userDataStore.userData.books[props.bookId];
});

//если книга загружена и есть чать книги по айди этой части, то возвращаем закончена ли работа с частью для отображения CHECK ICON
const finishedDate = computed(() => {
  if (!isUserBookLoaded.value) return false;
  let book = userDataStore.userData.books[props.bookId];

  return book?.parts[props.part.id]?.finishedDate;
});
</script>

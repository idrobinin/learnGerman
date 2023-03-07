<template>
  <v-container v-if="getPart">
    <v-layout class="d-flex flex-wrap">
      <v-col sm="12" md="10" offset-md="1">
        <book-part-content :part="getPart" />
      </v-col>
      <v-col sm="12" md="10" offset-md="1">
        <book-part-words :words="getPart.words" />
      </v-col>
    </v-layout>
  </v-container>
</template>

<script setup>
import { computed } from "vue";
import { useBooksStore } from "@/store/booksStore";
import BookPartContent from "@/components/BookPartContent.vue";
import BookPartWords from "@/components/BookPartWords.vue";
import { useRoute } from "vue-router";

const bookStore = useBooksStore();
const route = useRoute();

// получаем нужные нам части книги для изучения

const getPart = computed(() => {
  return bookStore.bookParts.find((b) => b.bookId == route.params.bookId);
});
</script>

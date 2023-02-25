<template>
  <v-container v-if="getPart">
    <v-layout class="d-flex flex-wrap">
      <v-col sm="12" md="10" offset-md="1">
        <book-part-content :part="getPart"></book-part-content>
      </v-col>
      <v-col sm="12" md="10" offset-md="1">
        <!--        <book-part-words :words="part.words"> </book-part-words>-->
      </v-col>
    </v-layout>
  </v-container>
</template>

<script setup>
import { computed } from "vue";
import { useBooksStore } from "@/store/booksStore";
import BookPartContent from "@/components/BookPartContent.vue";
import { useRoute } from "vue-router";

const bookStore = useBooksStore();
const route = useRoute();

// defineProps({
//   bookId: {
//     type: String,
//     required: true,
//   },
//   bookPartId: {
//     type: String,
//     required: true,
//   },
// });

// получаем нужные нам части книги для изучения

const getPart = computed(() => {
  return bookStore.bookParts.find((b) => b.bookId == route.params.bookId);
});
</script>

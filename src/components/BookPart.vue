<template>
  <v-container v-if="bookPart">
    <v-layout class="d-flex flex-wrap">
      <v-col sm="12" md="10" offset-md="1">
        <book-part-content :part="bookPart" />
      </v-col>
      <v-col sm="12" md="10" offset-md="1">
        <book-part-words :words="bookPart.words" />
      </v-col>
    </v-layout>
  </v-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import BookPartContent from "@/components/BookPartContent.vue";
import BookPartWords from "@/components/BookPartWords.vue";
import { useRoute } from "vue-router";
import { LOAD_PART } from "@/hooks/loadBookPartFromDb";

const route = useRoute();

// модель для части книги для рендеринга
const bookPart = ref(null);

// получаем нужные нам части книги для изучения по книге и ее части из роута
onMounted(() => {
  LOAD_PART(bookPart, route.params.bookId, route.params.partId);
});
</script>

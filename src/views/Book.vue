<template>
  <div v-if="!getBook">
    <E404 />
  </div>
  <div v-else>
    <v-container>
      <v-layout class="d-flex flex-wrap flex-column">
        <v-col sm="12" md="10" offset-md="1">
          <book-details class="w-100" :book="getBook" />
        </v-col>
        <v-col
          v-for="part in getBook.parts"
          :key="part.id"
          sm="12"
          md="10"
          offset-md="1 "
        >
          <book-part-list-item :part="part" :bookId="getBook.id" />
        </v-col>
      </v-layout>
    </v-container>
  </div>
</template>

<script setup>
import E404 from "@/views/E404.vue";
import BookDetails from "@/components/BookDetails.vue";
import BookPartListItem from "@/components/BookPartListItem.vue";
import { useBooksStore } from "@/store/booksStore";
import { useUserDataStore } from "@/store/userDataStore";
import { useRoute } from "vue-router";
import { getBookByBookId } from "@/hooks/getBookByBookId";

const bookStore = useBooksStore();
const userDataStore = useUserDataStore();
const route = useRoute();

// получаем книгу для отрисовки

const { getBook } = getBookByBookId(route.params.id, bookStore.books);
</script>

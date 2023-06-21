<template>
  <div class="mb-16">
    <v-sheet class="mx-auto" elevation="8" max-width="80vw">
      <v-slide-group
        v-model="model"
        class="pa-4"
        selected-class="bg-primary"
        show-arrows
      >
        <v-slide-group-item v-for="book in shuffledBooks" :key="book.id">
          <v-card
            color="grey-lighten-1"
            class="ma-4 book"
            height="200"
            width="150"
            @click="goToBookPage(book)"
          >
            <v-img
              :width="300"
              aspect-ratio="16/9"
              cover
              :lazy-src="`${book.imageUrl}`"
              :src="`${book.imageUrl}`"
            >
              <v-tooltip activator="parent" location="botton">{{
                book.title
              }}</v-tooltip>
            </v-img>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useBooksStore } from "@/store/booksStore";
import { useRouter } from "vue-router";

const router = useRouter();
const bookStore = useBooksStore();

const shuffledBooks = computed(() => {
  let books = bookStore.books;
  return books.sort(() => 0.5 - Math.random());
});

const model = ref(null);

const goToBookPage = (book) => {
  router.push({ name: "book", params: { id: book.id } });
};
</script>

<style scoped>
.book {
  transition: transform 0.3s ease;
}

.book:hover {
  transform: scale(1.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>

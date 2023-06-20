<template>
  <div class="mb-16">
    <v-sheet class="mx-auto" elevation="8" max-width="80vw">
      <v-slide-group
        v-model="model"
        class="pa-4"
        selected-class="bg-primary"
        show-arrows
      >
        <v-slide-group-item
          v-for="book in shuffledBooks"
          :key="book.id"
          v-slot="{ isSelected, selectedClass }"
        >
          <v-card
            color="grey-lighten-1"
            :class="['ma-4', selectedClass]"
            height="200"
            width="150"
            @click="toggleBook(book)"
          >
            <v-img
              :width="300"
              aspect-ratio="16/9"
              cover
              :lazy-src="`${book.imageUrl}`"
              :src="`${book.imageUrl}`"
            ></v-img>
            <div class="d-flex fill-height align-center justify-center">
              <v-scale-transition>
                <v-icon
                  v-if="isSelected"
                  color="white"
                  size="48"
                  icon="mdi-close-circle-outline"
                ></v-icon>
              </v-scale-transition>
            </div>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>

      <v-expand-transition v-if="showDescription">
        <v-sheet v-if="model != null" height="200">
          <div class="d-flex fill-height align-center justify-center">
            <h3 class="text-h6">{{ model.description }}</h3>
          </div>
        </v-sheet>
      </v-expand-transition>
    </v-sheet>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useBooksStore } from "@/store/booksStore";

const bookStore = useBooksStore();

const shuffledBooks = computed(() => {
  let books = bookStore.books;
  return books.sort(() => 0.5 - Math.random());
});

const model = ref(null);
const showDescription = ref(false);
const toggleBook = (book) => {
  if (model.value === book) {
    showDescription.value = !showDescription.value;
  } else {
    model.value = book;
    showDescription.value = true;
  }
};
</script>

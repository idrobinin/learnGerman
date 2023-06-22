<template>
  <v-layout class="d-block mx-auto">
    <!--      поиск  для больших экранов    -->
    <v-col cols="10" offset="1">
      <v-container fluid>
        <v-layout class="hidden-sm-and-down">
          <!--      поиск по названию и описанию    -->
          <v-col md="8">
            <v-text-field
              label="поиск"
              variant="outlined"
              v-model="searchQuery"
            ></v-text-field>
          </v-col>
          <!--      поиск по уровню    -->
          <v-col md="4">
            <v-combobox
              clearable
              variant="outlined"
              label="сложность"
              :items="booksLevelsList"
              v-model="selectedOption"
            ></v-combobox>
          </v-col>
        </v-layout>
      </v-container>
    </v-col>

    <!--      поиск  для средних и малентких экранов    -->
    <v-col cols="10" offset="1" class="hidden-md-and-up">
      <v-container fluid>
        <v-layout>
          <!--      поиск по названию и описанию    -->
          <v-col>
            <v-text-field
              label="поиск"
              variant="outlined"
              v-model="searchQuery"
            ></v-text-field>
          </v-col>
        </v-layout>
        <!--      поиск по уровню    -->
        <v-layout>
          <v-col>
            <v-combobox
              clearable
              variant="outlined"
              label="сложность"
              :items="booksLevelsList"
              v-model="selectedOption"
            ></v-combobox>
          </v-col>
        </v-layout>
      </v-container>
    </v-col>
    <!--      список книг     -->
    <v-col cols="12">
      <div v-for="book in sortedAndFilteredBooks" :key="book.id">
        <books-list-item :book="book" class="text-white d-flex mb-5" />
      </div>
    </v-col>
  </v-layout>
</template>

<script setup>
import { useBooksStore } from "@/store/booksStore";
import { useFilteredBooks } from "@/hooks/useFilteredBooks";
import { useSortedAndFilteredBooks } from "@/hooks/useSortedAndFilteredBooks";
import { getAllBooksLevels } from "@/hooks/getAllBooksLevels";
import BooksListItem from "@/components/BooksListItem.vue";

const bookStore = useBooksStore();

//  список доступных уровней языка для чтения
const { booksLevelsList } = getAllBooksLevels(bookStore.books);

// список отфильтрованных книг по нескольким параметрам на выбор
const { searchQuery, filteredBooks } = useFilteredBooks(bookStore.books);

// список отфильтрованных книг по нескольким параметрам и уровню языка
const { selectedOption, sortedAndFilteredBooks } =
  useSortedAndFilteredBooks(filteredBooks);
</script>

import { defineStore } from "pinia";
import { onBeforeMount, ref } from "vue";
import { LOAD_BOOKS } from "@/services/loadBooksFromDb";

export const useBooksStore = defineStore("booksStore", () => {
  // массив с книгами
  const books = ref([]);

  // загружаем книги из БД

  onBeforeMount(() => {
    LOAD_BOOKS(books.value);
  });

  return {
    books,
  };
});

import { computed } from "vue";
// получаем книгу из списка books по id

export function useBook(id, books) {
  const getBook = computed(() => {
    return books.find((book) => book.id === id);
  });

  return { getBook };
}

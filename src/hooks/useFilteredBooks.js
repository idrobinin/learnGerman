import { computed, ref } from "vue";

export function useFilteredBooks(books) {
  // модель поиска по query
  const searchQuery = ref("");

  // список отфильтрованных книг по нескольким параметрам на выбор
  const filteredBooks = computed(() => {
    return [...books].filter(
      (el) =>
        el.title
          .toLowerCase()
          .split(" ")
          .join("")
          .includes(searchQuery.value.toLowerCase()) ||
        el.description
          .toLowerCase()
          .split(" ")
          .join("")
          .includes(searchQuery.value.toLowerCase())
    );
  });
  return { searchQuery, filteredBooks };
}

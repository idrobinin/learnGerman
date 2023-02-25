import { computed, ref } from "vue";

export function useSortedAndFilteredBooks(filteredBooks) {
  // модель поиска по query
  const selectedOption = ref("");

  // список отфильтрованных книг по нескольким параметрам на выбор
  const sortedAndFilteredBooks = computed(() => {
    return filteredBooks.value.filter((el) => {
      if (selectedOption.value) {
        return el.levelLanguage.indexOf(selectedOption.value) >= 0;
      } else {
        return filteredBooks.value;
      }
    });
  });
  return { selectedOption, sortedAndFilteredBooks };
}

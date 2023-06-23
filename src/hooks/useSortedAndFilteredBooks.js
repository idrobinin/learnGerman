import { computed, ref } from "vue";
import { useUserDataStore } from "@/store/userDataStore";

export function useSortedAndFilteredBooks(filteredBooks, booksFlag = false) {
  // модель поиска по query
  const selectedOption = ref("");
  const userDataStore = useUserDataStore();

  // список отфильтрованных книг по нескольким параметрам на выбор
  const sortedAndFilteredBooks = computed(() => {
    if (booksFlag) {
      return filteredBooks.value
        .filter((el) => {
          if (selectedOption.value) {
            return el.levelLanguage.indexOf(selectedOption.value) >= 0;
          } else {
            return filteredBooks.value;
          }
        })
        .filter((el) =>
          Object.keys(userDataStore.userData.books).includes(el.id)
        );
    } else {
      return filteredBooks.value.filter((el) => {
        if (selectedOption.value) {
          return el.levelLanguage.indexOf(selectedOption.value) >= 0;
        } else {
          return filteredBooks.value;
        }
      });
    }
  });
  return { selectedOption, sortedAndFilteredBooks };
}

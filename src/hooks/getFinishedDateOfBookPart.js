import { computed } from "vue";
import { useUserDataStore } from "@/store/userDataStore";

// проверяем есть ли поле  finishedDate у данной части книги

export function getFinishedDateOfBookPart(bookId, partId) {
  const finishedDateOfBookPart = computed(() => {
    const userDataStore = useUserDataStore();
    if (
      userDataStore.userData.books[bookId] &&
      userDataStore.userData.books[bookId].parts[partId]
    ) {
      return userDataStore.userData.books[bookId].parts[partId].finishedDate;
    }
  });

  return { finishedDateOfBookPart };
}

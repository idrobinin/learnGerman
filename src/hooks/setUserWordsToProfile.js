import { useUserDataStore } from "@/store/userDataStore";
import { Timestamp } from "firebase/firestore/lite";

// получаем все уровни языка книг в один массив
export const setWords = (userWords) => {
  const userDataStore = useUserDataStore();

  userWords.value = [];
  let userWordsInStore = userDataStore.userData?.words;
  for (let property in userWordsInStore) {
    if (userWordsInStore.hasOwnProperty(property)) {
      let word = userWordsInStore[property];

      let isWordAvailableToShow;

      if (word.nextShowDate instanceof Timestamp) {
        isWordAvailableToShow = word.nextShowDate.toDate() < new Date();
        console.log(isWordAvailableToShow);
        console.log(word.nextShowDate.toDate());
      } else if (word.nextShowDate instanceof Date) {
        isWordAvailableToShow = word.nextShowDate < new Date();
      } else if (typeof word.nextShowDate === "string") {
        isWordAvailableToShow = new Date(word.nextShowDate) < new Date();
      } else {
        // Handle cases when nextShowDate is of unexpected type or undefined.
        console.warn(
          "Unexpected type of nextShowDate:",
          typeof word.nextShowDate
        );
        continue; // Skip this word.
      }
      // заполняем наш массив словами

      if (isWordAvailableToShow) {
        userWords.value.push({
          origText: word.origText,
          transText: word.transText,
          origArticle: word.origArticle ? word.origArticle : null,
          type: word.type ? word.type : null,
          key: property,
          showTranslation: false,
        });
      }
    }
  }

  // показываем первое слово из списка юзеру
  if (userWords.value.length) {
    userDataStore.UPDATE_CURRENT_WORD(userWords.value[0]);
  }
};

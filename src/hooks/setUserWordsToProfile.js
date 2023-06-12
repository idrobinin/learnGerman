import { useUserDataStore } from "@/store/userDataStore";
import { Timestamp } from "firebase/firestore/lite";
import { updateWords } from "@/hooks/updateUserProfileWords";

// получаем все уровни языка книг в один массив
export const setWords = () => {
  const userDataStore = useUserDataStore();
  let userWordsInStore = userDataStore.userData.words;
  userDataStore.userWordsInProfile.length = 0;

  for (let property in userWordsInStore) {
    if (userWordsInStore.hasOwnProperty(property)) {
      let word = userWordsInStore[property];

      let isWordAvailableToShow;

      if (word.nextShowDate instanceof Timestamp) {
        isWordAvailableToShow = word.nextShowDate.toDate() < new Date();
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
        // userDataStore.UPDATE_USER_PROFILE_WORDS(word);
        updateWords(userDataStore.userWordsInProfile, word);
      }
    }
  }

  // показываем первое слово из списка юзеру
  if (userDataStore.userWordsInProfile.length) {
    userDataStore.UPDATE_CURRENT_WORD(userDataStore.userWordsInProfile[0]);
  }
};

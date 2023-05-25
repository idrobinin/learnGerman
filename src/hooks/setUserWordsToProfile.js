import { useUserDataStore } from "@/store/userDataStore";

// получаем все уровни языка книг в один массив
export const setWords = (userWords, currentWord) => {
  const userDataStore = useUserDataStore();

  userWords.value = [];
  let userWordsInStore = userDataStore.userData?.words;
  for (let property in userWordsInStore) {
    if (userWordsInStore.hasOwnProperty(property)) {
      let word = userWordsInStore[property];

      // заполняем наш массив словами

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

  // показываем первое слово из списка юзеру
  if (userWords.value.length) currentWord.value = userWords.value[0];
};

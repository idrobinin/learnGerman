import { useUserDataStore } from "@/store/userDataStore";

// получаем все уровни языка книг в один массив
export const setWords = (words, currentWord) => {
  const userDataStore = useUserDataStore();

  words.value.length = 0;
  let userWords = userDataStore.userData?.words;
  for (let property in userWords) {
    if (userWords.hasOwnProperty(property)) {
      let word = userWords[property];

      // проверяем доступно ли слово для изучения проверяя дату добавления
      // сначала проверяем добавлено ли юзером из книг либо взято из Firestore

      let isWordAvailable =
        word.nextShowDate instanceof Date
          ? word.nextShowDate <= new Date()
          : word.nextShowDate.toDate() <= new Date();

      // заполняем наш массив словами

      if (isWordAvailable) {
        words.value.push({
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
  if (words.value.length) currentWord.value = words.value[0];
};

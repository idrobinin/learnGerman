import { defineStore } from "pinia";
import { ref } from "vue";
import { useMainStore } from "@/store/mainStore";
import { useUserStore } from "@/store/userStore";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteField,
  Timestamp,
} from "firebase/firestore/lite";
import { db } from "@/config/firebase";
import { setWords } from "@/hooks/setUserWordsToProfile";

const defaultUserData = {
  books: {},
  words: {},
};

export const useUserDataStore = defineStore("userDataStore", () => {
  const mainStore = useMainStore();
  const userStore = useUserStore();

  let userData = ref({
    books: {},
    words: {},
  });
  // функция
  const SET_USER_DATA = (data) => {
    userData.value = data;
  };

  // функция загрузки личных данных списка книг и слов одного юзера из БД для рендеринга Profile
  const LOAD_USER_DATA = async (userId) => {
    mainStore.SET_PROCESSING(true);
    try {
      const docRef = doc(db, "userData", `${userId}`);
      const docSnap = await getDoc(docRef);

      // проверяем есть ли коллекция у данного юзера в базе по ID юзера
      if (docSnap.exists()) {
        let fetchedUserData = docSnap.data() || defaultUserData;

        if (!fetchedUserData.books) {
          fetchedUserData.books = {};
        }
        // конвертируем TimeStamp Firestore в нормальный вид даты
        for (let key in fetchedUserData.books) {
          if (fetchedUserData.books.hasOwnProperty(key)) {
            fetchedUserData.books[key].addedDate =
              fetchedUserData.books[key].addedDate.toDate();
          }
        }
        if (!fetchedUserData.words) {
          fetchedUserData.words = {};
        }
        SET_USER_DATA(fetchedUserData);
        mainStore.SET_PROCESSING(false);
      }
    } catch (error) {
      console.log(error);
      mainStore.SET_PROCESSING(false);
    }
    mainStore.SET_PROCESSING(false);
  };

  // функция добавления книги в коллекцию юзера в базе данных  по переданному айди книги
  const ADD_USER_BOOK = async (bookId) => {
    mainStore.SET_PROCESSING(true);

    // создаем объект книги
    let book = {
      addedDate: new Date(),
      parts: {},
    };

    await setDoc(
      doc(db, "userData", `${userStore.userId}`),
      {
        books: {
          [bookId]: book,
        },
      },
      { merge: true }
    ).then(() => {
      getDocSnap(userStore.userId);
    });
    mainStore.SET_PROCESSING(false);
  };

  // функция записи данных в объект Vue (делаем реактивным так как вью не видит изменения в БД) (берем новые данные в БД и записываем в объект)
  const getDocSnap = async (userId) => {
    const docRef = doc(db, "userData", `${userId}`);
    const docSnap = await getDoc(docRef);
    userData.value = docSnap.data();
  };

  // функция добавления и изменения статистики (дата добавления и последнего открытия) в БД по частям каждой книги юзера
  const UPDATE_USER_BOOK_PART_STATS = async (bookId, partId) => {
    try {
      const docRef = doc(db, "userData", `${userStore.userId}`);

      // если данная часть книги не открывалась, то добавляем дату открытия addedDate
      const updatedFields = {};
      if (!userData.value.books[bookId].parts[partId]) {
        updatedFields[`books.${bookId}.parts.${partId}.addedDate`] =
          Timestamp.fromDate(new Date());
      }
      // добавляем новое свойство lastOpenedDate
      updatedFields[`books.${bookId}.parts.${partId}.lastOpenedDate`] =
        Timestamp.fromDate(new Date());

      // Обновляем все поля в одном вызове метода updateDoc()
      await updateDoc(docRef, updatedFields);

      // записываем все изменения в наш Vue oбъект userData
      await getDocSnap(userStore.userId);
    } catch (error) {
      console.log(error);
    }
  };

  // функция завершения работы с частью книги которая записывает рейтин и дату завершения в БД
  const FINISH_USER_BOOK_PART = async (bookId, partId, rating) => {
    try {
      const docRef = doc(db, "userData", `${userStore.userId}`);

      //  добавляем новое свойство finishedDate и выставленный рейтинг пользователем по окончании работы с частью книги

      const updatedFields = {
        [`books.${bookId}.parts.${partId}.finishedDate`]: Timestamp.fromDate(
          new Date()
        ),
        [`books.${bookId}.parts.${partId}.rating`]: rating,
      };

      await updateDoc(docRef, updatedFields);

      // записываем все изменения в наш Vue oбъект userData
      await getDocSnap(userStore.userId);
    } catch (error) {
      console.log(error);
    }
  };

  // функция добавления слов/выражений для изучения в профайл пользователя

  const ADD_USER_WORD = async (payload) => {
    mainStore.SET_PROCESSING(true);
    // создаем объект книги
    let word = {
      origText: payload.origText,
      transText: payload.transText,
      type: payload.type,
      addedDate: new Date(),
      bucket: 1,
      nextShowDate: new Date(),
    };

    if (payload.origArticle) {
      word.origArticle = payload.origArticle;
    }
    await setDoc(
      doc(db, "userData", `${userStore.userId}`),
      {
        words: {
          [payload.key]: word,
        },
      },
      { merge: true }
    ).then(() => {
      getDocSnap(userStore.userId);
    });
    mainStore.SET_PROCESSING(false);
  };

  // функция переноса слова с следующую корзину для изучения и выставления следующей даты показа юзеру
  const PROCESS_USER_WORD = async (words, wordKey, currentWord) => {
    let word = userData.value.words[wordKey];

    const docRef = doc(db, "userData", `${userStore.userId}`);

    if (word.bucket == 5) {
      await updateDoc(docRef, {
        [`words.${wordKey}`]: deleteField(),
      }).then(() => {
        REMOVE_USER_WORD(words, wordKey, currentWord);
        UPDATE_CURRENT_WORD(words[0]);
        getDocSnap(userStore.userId);
      });
    } else {
      let wordBucket = word.bucket;
      let nextDateToShowWord = new Date();

      // выставляем следующую дату показа слова для изучения
      nextDateToShowWord = new Date(
        nextDateToShowWord.setDate(new Date().getDate() + word.bucket * 2)
      );
      // меняем поля в компоненте слов
      word.nextShowDate = nextDateToShowWord;
      word.bucket = wordBucket + 1;

      // записываем в БД
      await setDoc(
        doc(db, "userData", `${userStore.userId}`),
        {
          words: {
            [wordKey]: word,
          },
        },
        { merge: true }
      ).then(() => {
        setWords(words);
        getDocSnap(userStore.userId);
      });
    }
  };

  // функция удаления слова из данных юзера так как оно им изучено(дошло до 5 корзины)
  const REMOVE_USER_WORD = (words, wordKey) => {
    let indexToRemove;

    words.forEach((el, i) => {
      if (el.key === wordKey) {
        indexToRemove = i;
      }
    });

    if (indexToRemove !== undefined) {
      words.splice(indexToRemove, 1);
    }
  };

  // модель текущего слова в профиле юзера
  const currentWord = ref(null);

  // изменяем текущее слово при изменении его в массиве или окончании изучения
  const UPDATE_CURRENT_WORD = (word) => {
    currentWord.value = word;
  };
  return {
    UPDATE_CURRENT_WORD,
    currentWord,
    userData,
    PROCESS_USER_WORD,
    LOAD_USER_DATA,
    SET_USER_DATA,
    ADD_USER_BOOK,
    UPDATE_USER_BOOK_PART_STATS,
    FINISH_USER_BOOK_PART,
    ADD_USER_WORD,
  };
});

import { defineStore } from "pinia";
import { ref } from "vue";
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

const defaultUserData = {
  books: {},
  words: {},
};

export const useUserDataStore = defineStore("userDataStore", () => {
  const userStore = useUserStore();

  let userData = ref({
    books: {},
    words: {},
  });

  // модель массива для отрисовки слов юзера в компонент
  const userWordsInProfile = ref([]);

  const SET_USER_DATA = (data) => {
    userData.value = data;
  };

  // функция загрузки личных данных списка книг и слов одного юзера из БД для рендеринга Profile
  const LOAD_USER_DATA = async (userId) => {
    try {
      const docRef = await doc(db, "userData", `${userId}`);
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  const ADD_USER_BOOK_PROCESSING = ref(false);
  // функция добавления книги в коллекцию юзера в базе данных  по переданному айди книги
  const ADD_USER_BOOK = async (bookId) => {
    try {
      ADD_USER_BOOK_PROCESSING.value = true;

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
      );

      // обновляем стейт
      const updatedUserData = { ...userData.value };
      updatedUserData.books[bookId] = book;
      userData.value = updatedUserData;
    } catch (error) {
      // Обработка ошибок
      console.error(error);
    } finally {
      ADD_USER_BOOK_PROCESSING.value = false;
    }
  };

  // функция добавления и изменения статистики (дата добавления и последнего открытия) в БД по частям каждой книги юзера

  const UPDATE_USER_BOOK_PART_STATS = async (bookId, partId) => {
    try {
      const docRef = await doc(db, "userData", `${userStore.userId}`);

      // Если данная часть книги не открывалась, то добавляем дату открытия addedDate
      if (!userData.value.books[bookId].parts[partId]) {
        userData.value.books[bookId].parts[partId] = {
          addedDate: Timestamp.fromDate(new Date()),
        };
      }
      // Добавляем новое свойство lastOpenedDate
      userData.value.books[bookId].parts[partId].lastOpenedDate =
        Timestamp.fromDate(new Date());

      // Обновляем данные в Firestore
      await updateDoc(docRef, {
        [`books.${bookId}.parts.${partId}`]:
          userData.value.books[bookId].parts[partId],
      });
    } catch (error) {
      console.error(error);
    }
  };

  const FINISH_USER_BOOK_PART = async (bookId, partId, rating) => {
    try {
      const docRef = await doc(db, "userData", `${userStore.userId}`);

      // Добавляем finishedDate
      if (!userData.value.books[bookId].parts[partId].finishedDate) {
        userData.value.books[bookId].parts[partId].finishedDate =
          Timestamp.fromDate(new Date());
      }

      // Добавляем rating
      userData.value.books[bookId].parts[partId].rating = rating;

      // Обновляем данные в Firestore
      await updateDoc(docRef, {
        [`books.${bookId}.parts.${partId}`]:
          userData.value.books[bookId].parts[partId],
      });
    } catch (error) {
      console.error(error);
    }
  };

  // функция добавления слов/выражений для изучения в профайл пользователя
  const ADD_USER_WORD_PROCESSING = ref(false);
  const ADD_USER_WORD = async (payload) => {
    try {
      ADD_USER_WORD_PROCESSING.value = true;

      // // Проверяем, есть ли уже такое слово в массиве words
      if (userData.value.words.hasOwnProperty(payload.key)) {
        console.log("Слово уже существует");
        return; // Возвращаемся из функции, чтобы избежать дублирования слов
      }

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
      );
      userData.value.words[payload.key] = word;
    } catch (error) {
      // Обработка ошибок
      console.error(error);
    } finally {
      ADD_USER_WORD_PROCESSING.value = false;
    }
  };

  // функция переноса слова с следующую корзину для изучения и выставления следующей даты показа юзеру
  const PROCESS_USER_WORD_PROCESSING = ref(false);
  const PROCESS_USER_WORD = async (words, wordKey) => {
    try {
      PROCESS_USER_WORD_PROCESSING.value = true;
      let word = userData.value.words[wordKey];

      const docRef = doc(db, "userData", `${userStore.userId}`);

      if (word.bucket === 5) {
        await updateDoc(docRef, {
          [`words.${wordKey}`]: deleteField(),
        });

        REMOVE_USER_WORD(words, wordKey);
        UPDATE_CURRENT_WORD(words[0]);
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
        );
      }
    } catch (error) {
      // Обработка ошибок
      console.error(error);
    } finally {
      PROCESS_USER_WORD_PROCESSING.value = false;
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
    currentWord.value.showTranslation = false;
  };
  return {
    userWordsInProfile,
    currentWord,
    userData,
    ADD_USER_BOOK_PROCESSING,
    ADD_USER_WORD_PROCESSING,
    PROCESS_USER_WORD_PROCESSING,
    UPDATE_CURRENT_WORD,
    PROCESS_USER_WORD,
    LOAD_USER_DATA,
    SET_USER_DATA,
    ADD_USER_BOOK,
    UPDATE_USER_BOOK_PART_STATS,
    FINISH_USER_BOOK_PART,
    ADD_USER_WORD,
  };
});

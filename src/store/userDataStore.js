import { defineStore } from "pinia";
import { ref } from "vue";
import { useMainStore } from "@/store/mainStore";
import { useUserStore } from "@/store/userStore";
import { doc, getDoc, setDoc } from "firebase/firestore/lite";
import { db } from "@/config/firebase";

const defaultUserData = {
  books: {},
  words: {},
};

export const useUserDataStore = defineStore("userDataStore", () => {
  const mainStore = useMainStore();
  const userStore = useUserStore();

  let userData = ref({});
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

  // функция записи загруженной книги в объект Vue (делаем реактивным так как вью не видит изменения в БД) (берем новые данные в БД и записываем в объект)
  const getDocSnap = async (userId) => {
    const docRef = doc(db, "userData", `${userId}`);
    const docSnap = await getDoc(docRef);
    userData.value = docSnap.data();
  };

  return { userData, LOAD_USER_DATA, SET_USER_DATA, ADD_USER_BOOK };
});

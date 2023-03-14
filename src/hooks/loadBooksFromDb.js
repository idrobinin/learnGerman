// функция загрузки книг из БД

import { collection, getDocs, where, query } from "firebase/firestore/lite";
import { db } from "@/config/firebase";

export const LOAD_BOOKS = async (books) => {
  try {
    const querySnapshot = await getDocs(collection(db, "books"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      let book = {
        ...data,
      };

      books.push(book);
    });
  } catch (error) {
    console.log(error);
  }
};

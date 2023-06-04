import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "@/config/firebase";

// функция для загрузки всех частей со всеми данными книг
//  не используется

export const LOAD_BOOKPARTS = async (bookParts) => {
  try {
    const querySnapshot = await getDocs(collection(db, "bookParts"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      let bookPart = {
        ...data,
      };

      bookParts.push(bookPart);

      return bookParts;
    });
  } catch (error) {
    console.log(error);
  }
};

import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "@/config/firebase";

// функция для загрузки нужной части выбранной пользователем  книги
// подгружается в момент открытия пользователем
export const LOAD_PART = async (partToRender, book, bookPart) => {
  try {
    const q = await query(
      collection(db, "bookParts"),
      where("bookId", "==", `${book}`),
      where("bookPartId", "==", `${bookPart}`)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      partToRender.value = data;

      return partToRender;
    });
  } catch (error) {
    console.log(error);
  }
};

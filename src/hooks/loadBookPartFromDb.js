import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "@/config/firebase";
import { useUserDataStore } from "@/store/userDataStore";

// функция для загрузки нужной части выбранной пользователем  книги
// подгружается в момент открытия пользователем
export const LOAD_PART = async (partToRender, book, bookPart) => {
  const userDataStore = useUserDataStore();
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
    });

    await userDataStore.UPDATE_USER_BOOK_PART_STATS(book, bookPart);

    return partToRender;
  } catch (error) {
    console.log(error);
  }
};

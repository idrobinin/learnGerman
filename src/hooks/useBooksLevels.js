import { computed, ref } from "vue";

// получаем все уровни языка книг в один массив
export function useBooksLevels(books) {
  const levels = ref([]);
  const booksLevelsList = computed(() => {
    books.forEach((el) => {
      levels.value.push(el.levelLanguage);
    });
    const levelsArr = [...new Set(levels.value.flat())];
    return levelsArr;
  });

  return { booksLevelsList };
}

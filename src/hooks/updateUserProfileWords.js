// добавляем слова в массив для отрисовки из БД
export const updateWords = (userWords, word) => {
  userWords.push({
    origText: word.origText,
    transText: word.transText,
    origArticle: word.origArticle ? word.origArticle : null,
    type: word.type ? word.type : null,
    key: word.origArticle
      ? `${word.origArticle}${word.origText}`.toLowerCase().split(" ").join("")
      : `${word.origText}`.toLowerCase().split(" ").join(""),
  });
};

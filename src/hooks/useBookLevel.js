// функция отрисовывающая уровни книги в шаблон

export function useBookLevel() {
  const getBookLevel = (level) => {
    return level.join("/");
  };

  return { getBookLevel };
}

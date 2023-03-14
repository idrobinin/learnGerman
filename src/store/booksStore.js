import { defineStore } from "pinia";
import { onBeforeMount, ref } from "vue";
import { LOAD_BOOKS } from "@/hooks/loadBooksFromDb";
import { LOAD_BOOKPARTS } from "@/hooks/loadBookPartsFromDb";

export const useBooksStore = defineStore("booksStore", () => {
  // массив с книгами
  const books = ref([]);
  // const books = reactive([
  //   {
  //     id: "tfyvbijnomkpm657898",
  //     title: "Harry Potter und Stein der Weisen 1",
  //     description: "Первая глава первой книги о Гарри Поттере",
  //     imageId: "oj34bnrk3jtb3jjb",
  //     levelLanguage: ["B2", "C1"],
  //     rating: 4,
  //     ratingsCount: 104,
  //     youtube_playlist_id: "5f67d8",
  //     parts: [
  //       {
  //         id: "tfvyuyibn",
  //         title: "Part 1",
  //         youtube_id: "ijencviqjnvd324",
  //       },
  //       {
  //         id: "tfojbnibn",
  //         title: "Part 2",
  //         youtube_id: "ijencviqj8yvb",
  //       },
  //       {
  //         id: "rrrruyibn",
  //         title: "Part 3",
  //         youtube_id: "ijencv345vd324",
  //       },
  //       {
  //         id: "tfv4ojnyuyibn",
  //         title: "Part 4",
  //         youtube_id: "ij35nvd324",
  //       },
  //     ],
  //   },
  //   {
  //     id: "tfyvbi34kpm657898",
  //     title: "Harry Potter und Stein der Weisen 2",
  //     description: "Вторая  глава первой книги о Гарри Поттере",
  //     imageId: "oj34blknpkn3jjb",
  //     levelLanguage: ["B1", "B2"],
  //     rating: 3.5,
  //     ratingsCount: 74,
  //     youtube_playlist_id: "5f65kin8",
  //     parts: [
  //       {
  //         id: "tfvyuyibn",
  //         title: "Part 1",
  //         youtube_id: "ijencviqjnvd324",
  //       },
  //       {
  //         id: "tfojbnibn",
  //         title: "Part 2",
  //         youtube_id: "ijencviqj8yvb",
  //       },
  //       {
  //         id: "rrrruyibn",
  //         title: "Part 3",
  //         youtube_id: "ijencv345vd324",
  //       },
  //       {
  //         id: "tfv4ojnyuyibn",
  //         title: "Part 4",
  //         youtube_id: "ij35nvd324",
  //       },
  //     ],
  //   },
  //   {
  //     id: "tfyon5op5m657898",
  //     title: "Harry Potter und Stein der Weisen 3",
  //     description: "Третья  глава первой книги о Гарри Поттере",
  //     imageId: "onbo34inb4o34",
  //     levelLanguage: ["A2"],
  //     rating: 3.7,
  //     ratingsCount: 59,
  //     youtube_playlist_id: "5545kin8",
  //     parts: [
  //       {
  //         id: "tfvyuyibn",
  //         title: "Part 1",
  //         youtube_id: "ijencviqjnvd324",
  //       },
  //       {
  //         id: "tfojbnibn",
  //         title: "Part 2",
  //         youtube_id: "ijencviqj8yvb",
  //       },
  //       {
  //         id: "rrrruyibn",
  //         title: "Part 3",
  //         youtube_id: "ijencv345vd324",
  //       },
  //       {
  //         id: "tfv4ojnyuyibn",
  //         title: "Part 4",
  //         youtube_id: "ij35nvd324",
  //       },
  //     ],
  //   },
  // ]);

  // const bookParts = reactive([
  //   {
  //     bookId: "h1",
  //     bookPartId: "p1",
  //     bookTitle: "Harry Potter und Stein der Weisen 1",
  //     bookPartTitle: "Part 1",
  //     youtube_id: "https://www.youtube.com/watch?v=ATj9eXZivjo",
  //     content: [
  //       {
  //         sentences: [
  //           {
  //             origText:
  //               "Heute scheint die Sonne so hell, dass es fast wehtut, in ihre Richtung zu schauen. Ich frage mich, wie lange dieser sonnige Tag anhalten wird und ob es vielleicht morgen schon wieder regnen wird.",
  //             transText:
  //               "Сегодня солнце светит так ярко, что практически болит смотреть в его сторону. Я задаюсь вопросом, насколько продлится этот солнечный день и не начнется ли завтра снова дождь.",
  //           },
  //           {
  //             origText:
  //               "Es ist so ruhig in diesem Wald, dass man das Gefühl hat, die Zeit wäre stehen geblieben. Man kann nur das Rascheln der Blätter hören und das Zwitschern der Vögel. ",
  //             transText:
  //               "В этом лесу так тихо, что кажется, время остановилось. Можно услышать только шелест листьев и щебетание птиц.",
  //           },
  //           {
  //             origText:
  //               "Ich liebe es, wenn ich am Wochenende einfach ausschlafen und dann den Tag langsam angehen lassen kann. Ich mache mir ein ausgiebiges Frühstück und verbringe den Vormittag damit, ein gutes Buch zu lesen oder Musik zu hören.",
  //             transText:
  //               "Мне нравится, когда я могу просто выспаться на выходных и затем медленно начать день. Я готовлю обильный завтрак и провожу утро, читая хорошую книгу или слушая музыку.",
  //           },
  //         ],
  //       },
  //       {
  //         sentences: [
  //           {
  //             origText:
  //               "Es ist erstaunlich, wie viel man über eine Kultur lernen kann, indem man einfach ihre Küche probiert. Jedes Gericht hat seine eigene Geschichte und ist eng mit der Geschichte und den Traditionen des Landes verbunden.",
  //             transText:
  //               "Удивительно, сколько можно узнать о культуре, просто попробовав ее кухню. Каждое блюдо имеет свою собственную историю и тесно связано с историей и традициями страны.",
  //           },
  //           {
  //             origText:
  //               "Es gibt etwas unglaublich Befriedigendes daran, wenn man seine Fähigkeiten und Talente nutzt, um anderen zu helfen und einen positiven Einfluss auf ihre Leben auszuüben. Ob es darum geht, einem Freund bei einem Problem zu helfen oder sich ehrenamtlich für eine gemeinnützige Organisation zu engagieren - es ist ein unglaublich erfüllendes Gefühl, etwas Gutes zu tun.",
  //             transText:
  //               "Есть что-то невероятно удовлетворительное в том, чтобы использовать свои способности и таланты, чтобы помогать другим и оказывать положительное влияние на их жизнь. Неважно, помогаете ли вы другу с проблемой или участвуете волонтером в благотворительной организации - это невероятно удовлетворительное чувство, делать что-то доброе.)",
  //           },
  //           {
  //             origText:
  //               "Es ist beeindruckend, wie sehr sich die Welt verändert hat und wie schnell sich alles weiterentwickelt. Technologische Fortschritte, gesellschaftliche Veränderungen und globale Ereignisse haben einen enormen Einfluss auf unser tägliches Leben und die Art und Weise, wie wir die Welt wahrnehmen. ",
  //             transText:
  //               "Впечатляет, как сильно изменился мир и насколько быстро всё развивается. Технологические достижения, общественные изменения и глобальные события оказывают огромное влияние на нашу повседневную жизнь и на то, как мы воспринимаем мир.",
  //           },
  //         ],
  //       },
  //     ],
  //     words: [
  //       {
  //         origWord: "Apfel",
  //         transWord: "яблоко",
  //       },
  //       {
  //         origWord: "Schokolade",
  //         transWord: "шоколад",
  //       },
  //       {
  //         origWord: "Berg",
  //         transWord: "гора",
  //       },
  //       {
  //         origWord: "Himmel",
  //         transWord: "небо",
  //       },
  //       {
  //         origWord: "Uhr",
  //         transWord: "часы",
  //       },
  //       {
  //         origWord: "Blume",
  //         transWord: "цветок",
  //       },
  //       {
  //         origWord: "Sonne",
  //         transWord: "солнце",
  //       },
  //       {
  //         origWord: "Kaffee",
  //         transWord: "кофе",
  //       },
  //       {
  //         origWord: "Musik",
  //         transWord: "музыка",
  //       },
  //       {
  //         origWord: "Haus",
  //         transWord: "дом",
  //       },
  //     ],
  //   },
  // ]);

  const bookParts = ref([]);

  // загружаем книги из БД

  onBeforeMount(() => {
    LOAD_BOOKS(books.value);
    LOAD_BOOKPARTS(bookParts.value);
  });

  return {
    books,
    bookParts,
  };
});

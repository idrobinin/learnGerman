<template>
  <v-container>
    <v-layout v-if="bookPart" class="d-flex flex-wrap">
      <v-col sm="12" md="10" offset-md="1">
        <book-part-content :part="bookPart" />
      </v-col>
      <v-col
        v-if="Object.keys(bookPart.words).length"
        sm="12"
        md="10"
        offset-md="1"
      >
        <book-part-words :data="bookPart.words" />
      </v-col>
      <v-col sm="12" md="10" offset-md="1" class="text-center">
        <v-btn
          v-if="!finishedDateOfBookPart"
          color="green darken-1"
          @click="finishDialog = true"
          max-width="30%"
        >
          <v-icon icon="mdi-check" size="x-large"></v-icon>
          Завершить
        </v-btn>
        <div
          v-if="finishedDateOfBookPart"
          class="bg-green-accent-3 d-inline-block rounded-lg px-4 py-2 text-white"
        >
          <v-icon icon="mdi-check" size="x-large"></v-icon>
          <span class="d-inline-block ml-1"> Часть завершена </span>
          <v-card-actions>
            <div>Моя оценка</div>
            <v-rating v-model="savedRating" color="yellow" readonly />
          </v-card-actions>
        </div>

        <v-dialog v-model="finishDialog" width="300px" persistent>
          <v-card class="d-flex align-center flex-column text-center pa-5">
            <v-card-title primary-title>
              <div class="headline">Закончил эту часть!</div>
            </v-card-title>
            <v-card-text>
              <div>Моя оценка</div>
              <v-rating v-model="rating" color="success" half-increments />
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click.prevent="finishDialog = false">
                <v-icon icon="mdi-close" size="x-large"></v-icon>
                Закрыть
              </v-btn>
              <v-btn color="success" @click.prevent="finishWork">
                <v-icon icon="mdi-check" size="x-large"></v-icon>
                Конец работы
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-layout>
  </v-container>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import BookPartContent from "@/components/BookPartContent.vue";
import BookPartWords from "@/components/BookPartWords.vue";
import { useRoute } from "vue-router";
import { LOAD_PART } from "@/hooks/loadBookPartFromDb";
import { getFinishedDateOfBookPart } from "@/hooks/getFinishedDateOfBookPart";
import { useUserDataStore } from "@/store/userDataStore";

const route = useRoute();
const userDataStore = useUserDataStore();

// модель  для рейтинга части книги
const rating = ref(0);

// модель для части книги для рендеринга
const bookPart = ref(null);

// модель для диалогового окна завершающего работу с книгой
const finishDialog = ref(false);

// функция для диалогового окна выполняющая завершение работы с книгой
const finishWork = () => {
  finishDialog.value = false;
  return userDataStore.FINISH_USER_BOOK_PART(
    route.params.bookId,
    route.params.partId,
    rating.value
  );
};

// проверяем есть ли поле  finishedDate у данной части книги для отображения кнопки
const { finishedDateOfBookPart } = getFinishedDateOfBookPart(
  route.params.bookId,
  route.params.partId
);

const savedRating = computed(() => {
  const userDataStore = useUserDataStore();
  return userDataStore.userData.books[route.params.bookId].parts[
    route.params.partId
  ].rating;
});

// получаем нужные нам части книги для изучения по книге и ее части из роута
onMounted(() => {
  LOAD_PART(bookPart, route.params.bookId, route.params.partId);
});
</script>

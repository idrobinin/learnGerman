<template>
  <v-card class="bg-blue">
    <v-container fluid class="hidden-sm-and-down">
      <v-layout class="d-flex">
        <v-col sm="4" lg="3">
          <v-img :src="book.imageUrl" height="255"></v-img>
          <div class="text-center text-subtitle-1 mt-2">
            <v-btn color="primary" rounded="lg">
              <v-icon
                size="large"
                class="mr-2"
                color="white"
                icon="mdi-eye"
              ></v-icon>
              YouTube
            </v-btn>
          </div>
        </v-col>
        <v-col sm="8" lg="9" class="d-flex flex-column justify-space-between">
          <v-card-title>
            <div>
              <div class="text-h5 font-weight-bold text-wrap">
                {{ book.title }}
              </div>
              <v-divider class="white mb-3"></v-divider>
              <div class="text-wrap">{{ book.description }}</div>
              <div>
                Уровень: {{ getBookLevel(book.levelLanguage) }},
                {{ book.parts.length }} частей.
              </div>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-rating
              v-model="book.rating"
              color="yellow"
              readonly
              density="compact"
              half-increments
            ></v-rating>
            <div class="ml-1">
              <span>
                {{ book.rating }}
              </span>
              <span> ({{ book.ratingsCount }}) </span>
            </div>
            <v-spacer></v-spacer>
            <v-btn
              style="min-width: 100px"
              class="text-decoration-none px-4 py-2 text-center text-blue rounded-lg bg-yellow d-block"
              rounded="lg"
              :disabled="!canLoadBook(book.id)"
              @click.prevent="loadBook(book.id)"
              >Загрузить
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-layout>
    </v-container>
    <!--           элемент для экранов меньше 1000            -->
    <v-container fluid class="hidden-md-and-up">
      <v-layout class="d-flex flex-wrap">
        <v-col>
          <v-img :src="book.imageUrl" height="255"></v-img>
          <div class="text-center text-subtitle-1 mt-2">
            <v-btn color="primary" rounded="lg">
              <v-icon
                size="large"
                class="mr-2"
                color="white"
                icon="mdi-eye"
              ></v-icon>
              YouTube
            </v-btn>
          </div>
        </v-col>
      </v-layout>
      <v-layout>
        <v-col class="d-flex flex-column justify-space-between">
          <v-card-title>
            <div>
              <div class="text-h5 font-weight-bold text-wrap">
                {{ book.title }}
              </div>
              <v-divider class="white mb-3"></v-divider>
              <div class="text-wrap">{{ book.description }}</div>
              <div class="text-wrap">
                Уровень: {{ getBookLevel(book.levelLanguage) }},
                {{ book.parts.length }} частей.
              </div>
            </div>
          </v-card-title>
          <v-card-actions class="d-flex flex-wrap gap-5">
            <v-rating
              v-model="book.rating"
              color="yellow"
              readonly
              density="compact"
              half-increments
            ></v-rating>
            <div class="ml-1 min-width-70">
              <span class="mr-2">
                {{ book.rating }}
              </span>
              <span>({{ book.ratingsCount }})</span>
            </div>
            <v-spacer></v-spacer>
            <v-btn
              style="min-width: 100px"
              class="text-decoration-none px-4 py-2 mt-3 text-center text-blue rounded-lg bg-yellow d-block"
              rounded="lg"
              @click.prevent="loadBook(book.id)"
              :disabled="!canLoadBook(book.id)"
              >Загрузить
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script setup>
import { useBookLevel } from "@/hooks/useBookLevel";
import { useUserStore } from "@/store/userStore";
import { useMainStore } from "@/store/mainStore";
import { useUserDataStore } from "@/store/userDataStore";

const { getBookLevel } = useBookLevel();
const userStore = useUserStore();
const mainStore = useMainStore();
const userDataStore = useUserDataStore();

const isUserAuthenticated = userStore.isUserAuthenticated;
const getProcessing = mainStore.getProcessing;

// отрабатывает если есть книга в базе юзера + он аутентифицирован + нет процессов
const canLoadBook = (id) => {
  let book = getUserDataBook(id);
  return getProcessing === false && isUserAuthenticated && !book;
};

// проверяем данные по наличию книги в списке загруженных у юзера по id книги
const getUserDataBook = (id) => {
  if (userDataStore.userData.books && userDataStore.userData.books[id]) {
    return userDataStore.userData.books[id];
  }
};

// функция добавления книги юзером в свой профайл
const loadBook = (bookId) => {
  userDataStore.ADD_USER_BOOK(bookId);
};

defineProps({
  book: {
    type: Object,
    default: () => {},
    required: true,
  },
});
</script>

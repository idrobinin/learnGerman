<template>
  <!--           элемент для больших экранов больше 1000          -->
  <v-card class="bg-blue">
    <v-container class="hidden-sm-and-down">
      <v-layout class="d-flex">
        <v-col sm="4" lg="3">
          <v-img
            :src="book.imageUrl"
            :alt="book.title"
            min-height="155"
          ></v-img>
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
        <v-col sm="8" lg="9">
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

            <router-link
              style="width: 100px"
              class="text-decoration-none px-4 py-2 text-center text-blue rounded-lg bg-yellow d-block"
              rounded="lg"
              :to="{ name: 'book', params: { id: book.id } }"
              >Открыть
            </router-link>
          </v-card-actions>
        </v-col>
      </v-layout>
    </v-container>
    <!--           элемент для экранов меньше 1000            -->
    <v-container fluid class="hidden-md-and-up">
      <v-layout class="d-flex flex-wrap">
        <v-col>
          <v-img
            :src="book.imageUrl"
            :alt="book.title"
            min-height="155"
          ></v-img>
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
        <v-col>
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

            <router-link
              style="width: 100px"
              class="text-decoration-none px-4 py-2 text-center text-blue rounded-lg bg-yellow d-block"
              rounded="lg"
              :to="{ name: 'book', params: { id: book.id } }"
              >Открыть
            </router-link>
          </v-card-actions>
        </v-col>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script setup>
import { useBookLevel } from "@/hooks/useBookLevel";
const { getBookLevel } = useBookLevel();

defineProps({
  book: {
    type: Object,
    default: () => {},
    required: true,
  },
});
</script>

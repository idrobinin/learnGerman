<template>
  <!--  для больших экранов  -->
  <v-layout class="hidden-sm-and-down">
    <v-col class="d-flex flex-wrap justify-space-between">
      <v-card
        min-height="200"
        width="47%"
        class="bg-amber-lighten-5 my-2 mx-2 d-flex flex-wrap justify-space-between"
        variant="outlined"
        v-for="(word, i) in words"
        :key="`word${i}`"
      >
        <div class="d-flex flex-column justify-space-between">
          <v-card-item>
            <original-word :word="word" />
            <v-divider />
            <div class="text-m">
              {{ word.transText }}
            </div>
          </v-card-item>
          <v-card-actions>
            <v-btn
              variant="outlined"
              color="primary"
              :disabled="processing"
              @click="addWord(word)"
            >
              Добавить
            </v-btn>
            <div class="text-center">
              <v-snackbar
                v-model="snackbar"
                :timeout="snackbarTimeout"
                color="orange-lighten-3"
                rounded="pill"
                multi-line
              >
                {{ snackbarText }}
              </v-snackbar>
            </div>
          </v-card-actions>
        </div>
      </v-card>
    </v-col>
  </v-layout>

  <!--  для маленьких экранов  -->
  <v-layout class="hidden-md-and-up">
    <v-col class="d-flex flex-wrap justify-space-between">
      <v-card
        min-height="200"
        width="100%"
        class="bg-amber-lighten-5 my-2 mx-2 d-flex justify-space-between"
        variant="outlined"
        v-for="(word, i) in words"
        :key="`word${i}`"
      >
        <div class="d-flex flex-column justify-space-between">
          <v-card-item>
            <original-word :word="word" />
            <v-divider />
            <div class="text-m">
              {{ word.transText }}
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn
              v-if="!word.addedDate"
              variant="outlined"
              :disabled="processing"
              @click="addWord(word)"
            >
              Добавить
            </v-btn>
            <v-btn
              v-if="word.addedDate"
              variant="outlined"
              @click="deleteWord(word)"
            >
              Удалить
            </v-btn>
            <div class="text-center">
              <v-snackbar
                v-model="snackbar"
                :timeout="snackbarTimeout"
                color="orange-lighten-3"
                rounded="pill"
                multi-line
              >
                {{ snackbarText }}
              </v-snackbar>
            </div>
          </v-card-actions>
        </div>
      </v-card>
    </v-col>
  </v-layout>
</template>

<script setup>
import { computed, ref } from "vue";
import { useUserDataStore } from "@/store/userDataStore";
import { useMainStore } from "@/store/mainStore";
import OriginalWord from "@/components/OriginalWord.vue";

const mainStore = useMainStore();
const userDataStore = useUserDataStore();
const processing = computed(() => mainStore.getProcessing);
const checking = ref(false);

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});

// получаем слова из данных БД (через пропс) и преобразовываем в массив для рендеринга
const words = computed(() => {
  if (!props.data) return [];

  let words = [];

  for (let property in props.data) {
    if (props.data.hasOwnProperty(property)) {
      let word = props.data[property];
      word.key = property;
      words.push(word);
    }
  }

  return words;
});

// модель снекбара
const snackbar = ref(false);
const snackbarTimeout = 2000;
const snackbarText = ref("");

// функция добавления слова в профайл юзера
const addWord = async (word) => {
  checking.value = true;

  let userWordsList = userDataStore.userData?.words || null;
  let wordAdded = null;

  if (userWordsList) {
    wordAdded = userWordsList[word.key];
  }

  if (wordAdded) {
    // проверяем есть ли слово в списке юзера
    snackbar.value = true;
    snackbarText.value = "Уже есть в важем списке";
  } else if (userWordsList && Object.keys(userWordsList).length >= 100) {
    // проверяем чтобы не было больше 100 слов в списке у юзера
    snackbar.value = true;
    snackbarText.value = "Вы не можете добавлять более 100 слов и выражений";
  } else {
    await userDataStore.ADD_USER_WORD(word);
    snackbar.value = true;
    snackbarText.value = "Добавлено";
  }
  checking.value = true;
};
</script>

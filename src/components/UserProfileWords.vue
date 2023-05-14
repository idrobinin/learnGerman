<template>
  <div>
    <v-card>
      <v-card-item>
        <original-word :word="currentWord" />
        <v-divider />
        <Transition name="fade">
          <div v-if="currentWord.showTranslation === true" class="text-m">
            {{ currentWord.transText }}
          </div>
        </Transition>
      </v-card-item>
      <v-card-actions>
        <v-btn
          color="#5865f2"
          rounded
          class="border-sm"
          @click="currentWord.showTranslation = !currentWord.showTranslation"
        >
          {{
            currentWord.showTranslation === false
              ? "Показать перевод"
              : "Скрыть перевод"
          }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="#00CC00" rounded class="border-sm"> Я запомнил </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useUserDataStore } from "@/store/userDataStore";
import OriginalWord from "@/components/OriginalWord.vue";

const userDataStore = useUserDataStore();

const words = ref([]);
const currentWord = ref(null);

const setWords = () => {
  words.value.length = 0;
  let userWords = userDataStore.userData?.words;
  for (let property in userWords) {
    if (userWords.hasOwnProperty(property)) {
      let word = userWords[property];

      // проверяем доступно ли слово для изучения проверяя дату добавления
      // сначала проверяем добавлено ли юзером из книг либо взято из Firestore

      let isWordAvailable =
        word.nextShowDate instanceof Date
          ? word.nextShowDate <= new Date()
          : word.nextShowDate.toDate() <= new Date();

      // заполняем наш массив словами

      if (isWordAvailable) {
        words.value.push({
          origText: word.origText,
          transText: word.transText,
          origArticle: word.origArticle ? word.origArticle : null,
          type: word.type ? word.type : null,
          key: property,
          showTranslation: false,
        });
      }
    }
  }

  // показываем первое слово из списка юзеру
  if (words.value.length) currentWord.value = words.value[0];
};

onBeforeMount(() => {
  setWords();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-move {
  transition: all 0.3s ease;
}
.fade-leave {
  transition: all 0.3s ease;
}
</style>

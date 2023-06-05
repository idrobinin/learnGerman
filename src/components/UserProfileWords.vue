<template>
  <div v-if="userDataStore.userWords.length">
    <!--    секция текущего слова для изучения      -->
    <v-card class="mb-5 border-md" color="#CCFFFF">
      <v-card-item>
        <original-word :word="userDataStore.currentWord" />
        <v-divider />
        <Transition name="fade">
          <div
            v-if="userDataStore.currentWord.showTranslation === true"
            class="font-italic"
          >
            {{ userDataStore.currentWord.transText }}
          </div>
        </Transition>
      </v-card-item>
      <v-card-actions>
        <v-btn
          height="38px"
          color="#5865f2"
          rounded
          class="border-sm text-none mr-2"
          @click="
            userDataStore.currentWord.showTranslation =
              !userDataStore.currentWord.showTranslation
          "
        >
          {{
            userDataStore.currentWord.showTranslation === false
              ? "Показать перевод"
              : "Скрыть перевод"
          }}
        </v-btn>
        <button
          v-if="ableToPronounce"
          @click="playAudioText(userDataStore.currentWord.origText, 0.8)"
        >
          <span
            class="d-flex justify-center align-center"
            style="
              width: 38px;
              height: 38px;
              border-radius: 100%;
              border: 1px solid black;
            "
          >
            <svg-icon type="mdi" :path="mdiVolumeHigh"></svg-icon>
            <v-tooltip activator="parent" location="bottom"
              >Воспроизвести</v-tooltip
            >
          </span>
        </button>
        <v-spacer></v-spacer>
        <v-btn
          height="38px"
          color="#00CC00"
          rounded
          class="border-sm text-none"
          @click="
            userDataStore.PROCESS_USER_WORD(
              userDataStore.userWords,
              userDataStore.currentWord.key
            )
          "
        >
          Я запомнил
        </v-btn>
      </v-card-actions>
    </v-card>

    <!--    список всех добавленных слов    -->
    <div>
      <div class="text-center text-h5 mb-3">
        Всего {{ userDataStore.userWords.length }}
      </div>
      <div class="text-center text-h5 mb-3">
        {{ userDataStore.userWords }}
      </div>

      <v-card
        v-for="word in userDataStore.userWords"
        :key="word.key"
        class="mb-1"
      >
        <div v-if="userDataStore.currentWord.key != word.key" class="border-sm">
          <v-card-item>
            <original-word :word="word" />
            <v-divider />
            <div class="font-italic">
              {{ word?.transText }}
            </div>
          </v-card-item>
          <v-card-actions>
            <div class="d-flex justify-space-between w-100">
              <button @click="setWordAsCurrent(word)" class="mr-2">
                <span
                  class="d-flex justify-center align-center"
                  style="
                    width: 38px;
                    height: 38px;
                    border-radius: 100%;
                    border: 1px solid black;
                  "
                >
                  <svg-icon type="mdi" :path="mdiArrowUp"></svg-icon>
                  <v-tooltip activator="parent" location="bottom"
                    >Сделать текущим</v-tooltip
                  >
                </span>
              </button>

              <button
                v-if="ableToPronounce"
                @click="playAudioText(word.origText, 0.8)"
              >
                <span
                  class="d-flex justify-center align-center"
                  style="
                    width: 38px;
                    height: 38px;
                    border-radius: 100%;
                    border: 1px solid black;
                  "
                >
                  <svg-icon type="mdi" :path="mdiVolumeHigh"></svg-icon>
                  <v-tooltip activator="parent" location="bottom"
                    >Воспроизвести</v-tooltip
                  >
                </span>
              </button>
            </div>
          </v-card-actions>
        </div>
      </v-card>
    </div>
  </div>

  <div v-else class="text-center text-h5">У вас нет добавленных слов</div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useUserDataStore } from "@/store/userDataStore";
import OriginalWord from "@/components/OriginalWord.vue";
import { setWords } from "@/hooks/setUserWordsToProfile";
import { playAudioText } from "@/hooks/usePlayingText";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiVolumeHigh, mdiArrowUp } from "@mdi/js";

const userDataStore = useUserDataStore();

const ableToPronounce = ref(false);

const checkAvailabilityToPronounceWords = () => {
  if (window.speechSynthesis) ableToPronounce.value = true;
};

// функция замены текущего слова на желаемое
const setWordAsCurrent = (word) => {
  userDataStore.UPDATE_CURRENT_WORD(word);
};

onBeforeMount(() => {
  setWords(userDataStore.userWords);
  checkAvailabilityToPronounceWords();
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

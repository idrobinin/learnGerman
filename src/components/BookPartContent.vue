<template>
  <!--  content    -->
  <v-card class="pa-5 bg-amber-lighten-5">
    <div class="pb-5">
      <div class="text-h4 text-center pb-4">{{ part.bookTitle }}</div>
      <div class="text-h5 text-center">{{ part.bookPartTitle }}</div>
    </div>
    <div class="d-flex justify-center overflow-hidden">
      <YouTube
        class="d-flex justify-center overflow-hidden"
        :src="part.youtube_id"
      />
    </div>
    <div class="mt-3">
      <v-tabs v-model="tabMode" fixed-tabs>
        <v-tab v-for="tab in tabs" :value="tab.key" :key="tab.key">
          {{ tab.name }}
        </v-tab>
      </v-tabs>

      <!--  slider   -->
      <div class="mx-auto mt-3 bg-amber-lighten-5">
        <div
          class="text-subheading text-center"
          :style="{ fontSize: `${fontSize}px` }"
        >
          Размер шрифта
        </div>

        <v-slider
          v-model="fontSize"
          color="indigo"
          track-color="grey"
          :min="minFontSize"
          :max="maxFontSize"
          :step="step"
        >
          <template v-slot:prepend>
            <v-btn
              size="small"
              variant="text"
              icon="mdi-minus"
              color="indigo"
              @click="decrementFontSize"
            ></v-btn>
          </template>

          <template v-slot:append>
            <v-btn
              size="small"
              variant="text"
              icon="mdi-plus"
              color="indigo"
              @click="incrementFontSize"
            ></v-btn>
          </template>
        </v-slider>
      </div>

      <v-card-text>
        <!--        часть с подсказками        -->
        <v-window v-model="tabMode">
          <v-window-item value="german">
            <TransitionGroup name="fade">
              <div v-for="(paragraph, i) in part.content" :key="`par1${i}`">
                <TransitionGroup name="fade">
                  <div
                    style="line-height: 1.4em"
                    v-for="(sentence, y) in paragraph.sentences"
                    :key="`par1${i}sen1${y}`"
                    :style="currentFontSize"
                  >
                    <span> {{ sentence.origText }}</span>
                    <span
                      style="cursor: pointer"
                      @click="toggleTranslate(i, y)"
                    >
                      <v-icon
                        class="mb-2 mr-2 bg-yellow rounded-circle"
                        icon="mdi-help"
                        :size="fontSize"
                      >
                      </v-icon>
                      <v-tooltip activator="parent" location="bottom"
                        >Подсказка</v-tooltip
                      >
                    </span>
                    <div
                      v-if="getVisibilityKey(i, y).flagValue"
                      class="text-success"
                    >
                      {{ sentence.transText }}
                    </div>
                  </div>
                </TransitionGroup>
              </div>
            </TransitionGroup>
          </v-window-item>

          <!--    параллельная часть    -->
          <v-window-item value="sidebyside">
            <v-container>
              <v-layout
                v-for="(paragraph, i) in part.content"
                :key="`par2${i}`"
                class="d-flex flex-wrap"
              >
                <v-col sm="12">
                  <div
                    v-for="(sentence, y) in paragraph.sentences"
                    :key="`par2${i}sen2${y}`"
                    :style="currentFontSize"
                  >
                    <v-layout>
                      <div class="my-3 w-50 pa-2">{{ sentence.origText }}</div>
                      <div class="my-3 w-50 pa-2">{{ sentence.transText }}</div>
                    </v-layout>

                    <v-divider />
                  </div>
                </v-col>
              </v-layout>
            </v-container>
          </v-window-item>
        </v-window>
      </v-card-text>
    </div>
  </v-card>
</template>

<script setup>
import { computed, onBeforeMount, ref } from "vue";

const props = defineProps({
  part: {
    type: Object,
    required: true,
  },
});

// модель размера текста

const fontSize = ref(16);

const currentFontSize = computed(() => {
  return { fontSize: `${fontSize.value}px` };
});

// массив флагов для показа перевода
const visibilityKeys = ref([]);

// получаем нужный элемент в массиве флагов по ключу равному конкатенации индексов
const getVisibilityKey = (i, y) => {
  return visibilityKeys.value.find((el) => el.key === `${i}${y}`);
};

// показываем или скрываем пеервод по ключу если вэлью == тру
const toggleTranslate = (i, y) => {
  let flag = getVisibilityKey(i, y);
  flag.flagValue = !flag.flagValue;
};

// модель для табов
const tabMode = ref("german");

const tabs = ref([
  { key: "german", name: "текст с подсказками" },
  { key: "sidebyside", name: "параллельно" },
]);

// функции и модели изменения размера шрифта
const step = 1;
const minFontSize = 10;
const maxFontSize = 25;

const incrementFontSize = () => {
  if (fontSize.value < maxFontSize) {
    fontSize.value++;
  }
};

const decrementFontSize = () => {
  if (fontSize.value > minFontSize) {
    fontSize.value--;
  }
};

// заполняем массив ключей для функции показывающей перевод текста уникальными ключами (номер параграфа + номер предложения)
// и добавляем каждому элементу бул флаг
onBeforeMount(() => {
  const content = props.part?.content;
  for (let i = 0; i < content.length; i++) {
    for (let y = 0; y < content[i].sentences.length; y++) {
      visibilityKeys.value.push({
        key: `${i}${y}`,
        flagValue: false,
      });
    }
  }
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

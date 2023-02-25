<template>
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
        <v-tab
          class="d-block"
          v-for="tab in tabs"
          :value="tab.key"
          :key="tab.key"
        >
          {{ tab.name }}
        </v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tabMode">
          <v-window-item value="german">
            <div v-for="(paragraph, i) in part.content" :key="`par1${i}`">
              <div
                v-for="(sentence, ind) in paragraph.sentences"
                :key="`par1${i}sen1${ind}`"
              >
                <span class="text-h6"
                  >{{ ind + 1 }}. {{ sentence.origText }}</span
                >
                <span>
                  <v-icon
                    class="mb-2 bg-yellow rounded-circle"
                    icon="mdi-help"
                  ></v-icon>
                </span>
              </div>
            </div>
          </v-window-item>
          <v-window-item value="sidebyside"> </v-window-item>
        </v-window>
      </v-card-text>
    </div>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  part: {
    type: Object,
    required: true,
  },
});

// модель для табов
const tabMode = ref("german");

const tabs = ref([
  { key: "german", name: "текст с подсказками" },
  { key: "sidebyside", name: "параллельно" },
]);
</script>

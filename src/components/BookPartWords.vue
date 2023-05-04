<template>
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
            <div>
              <div class="text-h6 mb-1">{{ word.origText }}</div>
              <div class="text-caption">
                {{ word.transText }}
              </div>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn variant="outlined"> Добавить </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-col>
  </v-layout>

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
            <div>
              <div class="text-h6 mb-1">{{ word.origText }}</div>
              <div class="text-caption">
                {{ word.transText }}
              </div>
            </div>
          </v-card-item>

          <v-card-actions>
            <v-btn variant="outlined"> Добавить </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-col>
  </v-layout>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});

// получаем слова из данных БД (через пропс) и преобразовываем в массив
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
</script>

<template>
  <v-table class="bg-amber-lighten-5">
    <thead>
      <tr>
        <th class="text-left">Оригинал</th>
        <th class="text-left">Перевод</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(word, i) in words" :key="`word${i}`">
        <td style="vertical-align: top">
          <div class="d-inline-block" style="min-width: 100px">
            {{ word.origText }}
          </div>
          <v-spacer />
          <div class="my-3 d-flex justify-end">
            <v-btn icon size="small" class="bg-amber-lighten-5">
              <span>+</span>
              <v-tooltip activator="parent" location="bottom"
                >Добавить</v-tooltip
              >
            </v-btn>
            <v-btn icon size="small" class="bg-amber-lighten-5">
              <span>-</span>
              <v-tooltip activator="parent" location="bottom"
                >Удалить</v-tooltip
              >
            </v-btn>
          </div>
        </td>
        <td style="vertical-align: top">{{ word.transText }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});

// получаем слова из данных БД и преобразовываем в массив
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

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
        <td>
          <span class="d-inline-block" style="min-width: 100px">{{
            word.origWord
          }}</span>
          <v-btn icon size="small" class="bg-amber-lighten-5">
            <span>+</span>
            <v-tooltip activator="parent" location="bottom">Добавить</v-tooltip>
          </v-btn>
          <v-btn icon size="small" class="bg-amber-lighten-5">
            <span>-</span>
            <v-tooltip activator="parent" location="bottom">Удалить</v-tooltip>
          </v-btn>
        </td>
        <td>{{ word.transWord }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
defineProps({
  words: {
    type: Array,
    required: true,
  },
});
</script>

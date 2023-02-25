<template>
  <v-card color="blue-lighten-1" class="text-white">
    <v-card-title class="text-h4 text-center">{{ part.title }}</v-card-title>
    {{ part }}

    <v-card-actions>
      <v-spacer></v-spacer>
      <router-link
        style="width: 100px"
        class="text-decoration-none px-4 py-2 bg-yellow text-center text-blue rounded-lg"
        :to="{
          name: 'bookPart',
          params: { bookId: bookId, partId: part.id },
        }"
        >Открыть
      </router-link>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({
  part: {
    type: Object,
    required: true,
    default: () => {},
  },
  bookId: {
    type: String,
    required: true,
  },
});
</script>

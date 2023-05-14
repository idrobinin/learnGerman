<template>
  <div>
    <div class="text-h6 mb-1">
      {{ word?.origArticle }}
      {{ word.origText }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  word: {
    type: Object,
    default: () => {},
  },
});
</script>

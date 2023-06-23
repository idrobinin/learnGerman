<template>
  <div class="books">
    <v-container>
      <books-list />
    </v-container>
  </div>
</template>

<script setup>
import BooksList from "@/components/BooksList.vue";
</script>

<style scoped>
.books {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.books::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/images/BooksBG.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: blur(2px);
}
</style>

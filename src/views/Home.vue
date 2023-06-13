<template>
  <v-parallax
    class="h-75"
    src="https://firebasestorage.googleapis.com/v0/b/learn-german-8bfa3.appspot.com/o/HomeHeaderImg.jpg?alt=media&token=eb127f89-fa80-41e4-af1a-4611269d478e"
  >
    <div
      class="d-flex flex-column fill-height justify-center align-center text-white"
    >
      <h1 class="title text-h1 font-weight-bold mb-4">Deutch</h1>
      <h4 class="subheading">Учим немецкий язык</h4>
    </div>
  </v-parallax>
</template>

<script setup></script>

<style scoped>
.title {
  cursor: pointer;
  transition: transform 0.4s;
}
.title:hover {
  object-fit: cover;
  transform: scale(1.2);
}
.title:not(:hover) {
  transform: scale(1);
}
</style>

<template>
  <section>
    <v-parallax
      class="h-75"
      src="https://firebasestorage.googleapis.com/v0/b/learn-german-8bfa3.appspot.com/o/HomeHeaderImg.jpg?alt=media&token=eb127f89-fa80-41e4-af1a-4611269d478e"
    >
      <div
        class="d-flex flex-column fill-height justify-center align-center text-white"
      >
        <h1 class="title text-h1 font-weight-bold mb-4">Deutch</h1>
        <h4 class="subheading text-h3">Учим немецкий язык</h4>
      </div>
    </v-parallax>
  </section>
  <section>
    <div>
      <v-container class="m-6">
        <v-row align="center" no-gutters style="height: 300px">
          <v-col cols="12" sm="6" md="4">
            <v-card
              class="mx-2 my-2"
              color="#63bcf9"
              theme="dark"
              prepend-icon="mdi-book"
              title="Читай книги"
              height="230"
            >
              <v-card-text class="text-body-1 py-2">
                Читай адаптированные и не адаптированне немецкие книги, слушай
                песни и сказки , выбирай то, что нравится именно тебе
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-card
              class="mx-2 my-2"
              color="#63bcf9"
              theme="dark"
              prepend-icon="mdi-check"
              title="Учи слова"
              height="230"
            >
              <v-card-text class="text-body-1 py-2">
                Каждый текст собержит набор самых интересных и важных слов,
                которые ты можешь добавить в свой личный кабинет для дальнейшего
                изучения.
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="12" md="4">
            <v-card
              class="mx-2 my-2"
              color="#63bcf9"
              theme="dark"
              prepend-icon="mdi-window-restore"
              title="Учись на любом устройстве"
              height="230"
            >
              <v-card-text class="text-body-1 py-2">
                Этот веб сайт адаптирован для работы на любом устройстве. Учись
                со своего стационарного компьютера, планшета или мобильного
                телефона.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </section>
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

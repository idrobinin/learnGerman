<template>
  <div style="height: fit-content">
    <section style="max-height: 75vh">
      <v-parallax
        src="https://firebasestorage.googleapis.com/v0/b/learn-german-8bfa3.appspot.com/o/HomeHeaderImg.jpg?alt=media&token=eb127f89-fa80-41e4-af1a-4611269d478e"
        lazy-src="https://firebasestorage.googleapis.com/v0/b/learn-german-8bfa3.appspot.com/o/HomeHeaderImg.jpg?alt=media&token=eb127f89-fa80-41e4-af1a-4611269d478e"
      >
        <div
          class="d-flex flex-column fill-height justify-center align-center text-white"
        >
          <h1 class="title text-h1 font-weight-bold mb-4">Deutch</h1>
          <h4 class="subheading text-h3">Учим немецкий язык</h4>
        </div>
      </v-parallax>
    </section>
    <section
      class="tips-section"
      :class="{ 'tips-section-show': showTipsSection === true }"
    >
      <v-container>
        <v-row align="center" no-gutters style="height: 300px">
          <v-col cols="12" sm="6" md="4">
            <v-card
              class="mx-2 my-2 info-card"
              color="#63bcf9"
              theme="dark"
              prepend-icon="mdi-book"
              title="Читай книги"
              v-ripple
            >
              <v-card-text class="text-body-1 py-2">
                Читай адаптированные и не адаптированне немецкие книги, слушай
                песни и сказки , выбирай то, что нравится именно тебе
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-card
              class="mx-2 my-2 info-card"
              color="#63bcf9"
              theme="dark"
              prepend-icon="mdi-check"
              title="Учи слова"
              v-ripple
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
              class="mx-2 my-2 info-card"
              color="#63bcf9"
              theme="dark"
              prepend-icon="mdi-window-restore"
              title="Учись на любом устройстве"
              v-ripple
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
    </section>
    <section>
      <div class="mb-16 mx-10">
        <v-timeline direction="vertical">
          <v-timeline-item>
            <template v-slot:opposite> Первый шаг </template>
            <div class="timeline-item">
              <div class="text-h6">Начало обучения</div>
              <p>
                Выбирай любую книгу подходящую именно тебе по уровню и по
                сожержанию для старта изучения любимого языка.
              </p>
            </div>
          </v-timeline-item>

          <v-timeline-item>
            <template v-slot:opposite> Второй шаг </template>
            <div class="timeline-item">
              <div class="text-h6">Процесс обучения</div>
              <p>
                Читай, пользуйся подсказками, добавляй слова для изученя в свой
                профайл. После прочтения, выбирай новую и более сложную для себя
                литературу для прогресса в обучении.
              </p>
            </div>
          </v-timeline-item>

          <v-timeline-item>
            <template v-slot:opposite> Третий шаг </template>
            <div class="timeline-item">
              <div class="text-h6">Не останавливайся</div>
              <p>
                Читай без подсказок и переводи самостоятельно. Обращай внимание
                на все нюансы языка и практикуйся в произношении. Смотри видео с
                субтирами и без.
              </p>
            </div>
          </v-timeline-item>
        </v-timeline>
      </div>
    </section>
    <section class="carousel" ref="carouselSection">
      <RandomBooksCarousel />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import RandomBooksCarousel from "@/components/RandomBooksCarousel.vue";
const carouselSection = ref(null);
const showTipsSection = ref(false);

onMounted(() => {
  setTimeout(() => {
    showTipsSection.value = true;
  }, 800);
  const animateTipsSection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");

        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(animateTipsSection, {});

  observer.observe(carouselSection.value);
});
</script>

<style scoped>
.tips-section {
  transform: translateY(250px);
  opacity: 0;
  transition: opacity 1s ease, transform 0.5s ease;
}
.tips-section-show {
  opacity: 1;
  transform: translateY(0);
}

.title-wrapper {
  min-height: 400px;
}

.title {
  transition: transform 0.4s;
}
.title:hover {
  object-fit: cover;
  transform: scale(1.2);
}
.title:not(:hover) {
  transform: scale(1);
}

.carousel {
  opacity: 1;
  transform: translateY(150px);
  transition: opacity 1s ease, transform 0.5s ease;
}

.carousel.show {
  opacity: 1;
  transform: translateY(0);
}

.info-card {
  height: 230px;
  font-size: 1em;
}

@media screen and (max-width: 959px) {
  .tips-section {
    height: 490px;
  }
  .info-card {
    height: 195px;
  }
}
@media screen and (max-width: 599px) {
  .tips-section {
    height: 610px;
  }
  .info-card {
    height: 170px;
  }
}
</style>

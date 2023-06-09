<template>
  <div>
    <!--    mobile nav bar-->
    <v-navigation-drawer
      absolute
      temporary
      v-model="drawer"
      class="hidden-md-and-up"
    >
      <v-list density="compact">
        <v-list-item
          v-for="(item, i) in menuItems"
          :key="i"
          :value="item"
          active-color="primary"
          :to="{ name: `${item.route}` }"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!--    main bar-->

    <v-app-bar app :elevation="8" class="bg-primary text-h6 font-weight-bold">
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
      <router-link :to="{ name: 'home' }" class="text-decoration-none">
        <v-app-bar-title
          class="ml-3 text-h6 font-weight-bold text-shades-white"
        >
          Ich Lerne Deusch
        </v-app-bar-title>
      </router-link>

      <confirmation-dialog v-if="userStore.showSignoutDialog" />

      <v-spacer></v-spacer>

      <v-toolbar-items variant="tonal" class="hidden-sm-and-down">
        <v-btn
          v-for="(item, i) in menuItems"
          :key="`${item.title}${i}`"
          :to="{ name: `${item.route}` }"
        >
          <v-icon size="large" class="mr-2" :icon="item.icon"></v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn
          @click.prevent="userStore.showSignoutDialog = true"
          v-if="isUserAuthenticated"
        >
          <v-icon
            size="large"
            class="mr-2"
            icon="mdi-account-arrow-left"
          ></v-icon>
          Выйти
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/store/userStore";
import ConfirmationDialog from "@/components/ExitConfirmationDialog.vue";
const userStore = useUserStore();
// модель для отображения мобильного или веб меню
const drawer = ref(false);

// модель окна подтверждения выхода юзера из аккаунта

const isUserAuthenticated = computed(() => userStore.isUserAuthenticated);

// список кнопок меню
const menuItems = computed(() => {
  return isUserAuthenticated.value === true
    ? [
        {
          title: "Читать",
          route: "books",
          icon: "mdi-eye",
        },
        {
          title: "Мой кабинет",
          route: "profile",
          icon: "mdi-account",
        },
      ]
    : [
        {
          title: "Войти",
          route: "signin",
          icon: "mdi-login-variant",
        },
        {
          title: "Зарегистрироваться",
          route: "signup",
          icon: "mdi-account-plus",
        },
      ];
});
</script>

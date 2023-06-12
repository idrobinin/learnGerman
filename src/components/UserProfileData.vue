<template>
  <change-user-data-dialog v-if="userStore.showChangeUserDataDialog" />

  <v-card v-else class="mx-auto bg-blue">
    <v-card-text>
      <div>
        <p class="text-h5 mb-3">
          <v-icon class="mr-2" icon="mdi-account" />
          {{ userName }}
        </p>
        <p class="text-h5 mb-3">
          <v-icon class="mr-2" icon="mdi-email" /> {{ userEmail }}
        </p>
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        variant="text"
        @click.prevent="userStore.showChangeUserDataDialog = true"
        >Изменить мои данные</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useUserStore } from "@/store/userStore";
import { computed } from "vue";
import ChangeUserDataDialog from "@/components/ChangeUserDataDialog.vue";

const userStore = useUserStore();

const userName = computed(() => {
  return userStore.user.displayName;
});
const userEmail = computed(() => {
  return userStore.user.email;
});
</script>

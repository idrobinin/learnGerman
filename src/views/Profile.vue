<template>
  <h1>PROFILE</h1>
  {{ userStore.user }}
</template>

<script setup>
import { useUserStore } from "@/store/userStore";

const userStore = useUserStore();
</script>

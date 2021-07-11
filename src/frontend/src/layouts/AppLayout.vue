<template>
  <div class="app-layout">
    <AppLayoutHeader />
    <Index />
  </div>
</template>

<script>
import AppLayoutHeader from "./AppLayoutHeader.vue";
import Index from "@/views/Index.vue";

export default {
  name: "AppLayout",
  components: { AppLayoutHeader, Index },
};
</script>

<style scoped></style>

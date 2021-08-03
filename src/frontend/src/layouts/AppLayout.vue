<template>
  <div class="app-layout">
    <component :is="layout">
      <slot />
    </component>
  </div>
</template>

<script>
import { DEFAULT_LAYOUT } from "../common/constants";

export default {
  name: "AppLayout",

  computed: {
    layout() {
      const layout = this.$route.meta?.layout || DEFAULT_LAYOUT;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>

<style scoped></style>

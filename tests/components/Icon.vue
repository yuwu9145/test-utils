<template>
  <component :is="getComponent" />
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'

export default {
  name: 'Icon',
  props: {
    element: String,
  },

  computed: {
    getComponent(): any {
      // @ts-ignore
      return defineAsyncComponent(() => import(`./${this.element}.vue`));
    },
  },
};
</script>
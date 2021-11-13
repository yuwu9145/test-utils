<template>
  <div>
    <ToggleButton 
      v-model="checked" 
      onLabel="I confirm" 
      offLabel="I reject" 
      onIcon="pi pi-check"
      offIcon="pi pi-times" 
      style="width: 10em" 
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked = ref(true)
</script>

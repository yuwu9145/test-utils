<template>
  <button @click="handle" />
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (event: 'deleteItem', id: number): void
}>()

const handle = () => {
  emit('deleteItem', 5)
}
</script>
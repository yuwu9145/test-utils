<template>
  <MessageListItem @deleteItem="deleted" />
</template>

<script lang="ts" setup>
import { deleteService } from './deleteService'
import MessageListItem from './MessageListItem.vue'

const deleted = (id: number) => {
  deleteService.deleteById(id)
}
</script>
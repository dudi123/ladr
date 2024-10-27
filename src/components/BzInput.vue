<template>
   <v-text-field v-if="!multiline" v-bind="$attrs" />
   <v-textarea v-else v-bind="$attrs" />
</template>

<script setup>
const props = defineProps({
   multiline: {
      type: Boolean
   }
});
</script>

<style lang="scss" scoped></style>

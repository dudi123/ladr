<template>
   <v-container fluid class="px-10">
      <div class="d-flex justify-space-between full-width">
         <div class="text-h6">{{ title }}</div>
         <slot name="actions" />
      </div>

      <div class="d-flex align-center mt-4" style="gap: 15px">
         <slot name="filters" />
      </div>
      <div class="mt-10">
         <slot />
      </div>
   </v-container>
</template>

<script setup>
const props = defineProps({
   title: {
      type: String
   }
});
</script>

<style lang="scss" scoped></style>

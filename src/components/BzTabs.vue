<template>
   <v-btn-toggle
      v-bind="$attrs"
      density="compact"
      style="border-bottom: none"
      class="button-group"
   >
      <v-btn
         style="text-transform: capitalize"
         v-for="(item, index) in items"
         :text="item.title"
         selected-class="selected-button"
      />
   </v-btn-toggle>
</template>

<script setup>
import { useTheme } from 'vuetify';

const { current } = useTheme();

const props = defineProps({
   items: {
      type: Array,
      default: () => []
   }
});

const selectedTabColor = current.value.colors.primary300;
const selectedTabBgColor = current.value.colors.primary100;
</script>

<style lang="scss" scoped>
.selected-button {
   color: v-bind(selectedTabColor) !important;
   background-color: v-bind(selectedTabBgColor) !important;
   text-transform: capitalize;
}

.button-group {
   gap: 0px;
   border-radius: 8px 8px 0px 0px;
   box-shadow: 0px 1px 2px 0px #1018280d !important;
   border: 1px solid #d0d5dd;
   border-bottom: none;
}
</style>

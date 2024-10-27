<template>
   <layout title="Removals">
      <v-data-table
         :headers="columns"
         hide-default-footer
         class="mt-10 table"
         height="calc(100vh - 400px)"
      >
         <template #bottom>
            <v-divider />
            <div>
               <v-pagination
                  v-model="page"
                  variant="text"
                  :length="10"
                  :total-visible="6"
                  class="pa-3"
               />
            </div>
         </template>
      </v-data-table>
   </layout>
</template>

<script setup>
import Layout from '@/layouts/PageLayout.vue';
</script>

<style lang="scss" scoped>
.table {
   border: 1px solid rgba(234, 236, 240, 1);
   box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.06);
   box-shadow: 0px 1px 3px 0px rgba(16, 24, 40, 0.1);
   border-radius: 0px 12px 12px 12px;
}
</style>

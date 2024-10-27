<template>
   <v-app-bar color="neutral50">
      <div class="full-width d-flex justify-space-between align-center px-4">
         <v-img :src="logo" :max-width="66" />
         <div
            class="d-flex align-center flex-grow-1 justify-center"
            style="column-gap: 24px"
         >
            <v-btn
               v-for="item of navButtons"
               :key="item.value"
               size="large"
               class="text-body-1 nav-button"
               :class="route.name === item.to.name ? 'nav-button-selected' : ''"
               :to="item.to"
               exact
            >
               {{ item.text }}
            </v-btn>
         </div>
         <div class="d-flex align-center" style="column-gap: 16px">
            <v-icon icon="mdi-bell-outline" @click="showNotifications" />
            <v-avatar :image="avatar" :size="35" />
            <v-menu>
               <template v-slot:activator="{ props }">
                  <v-btn color="textPrimary" class="px-0" v-bind="props">
                     <span
                        style="text-transform: capitalize"
                        class="text-subtitle-2"
                        >Sholamit Cohen</span
                     >
                     <template v-slot:append>
                        <v-icon icon="mdi-chevron-down"></v-icon>
                     </template>
                  </v-btn>
               </template>
            </v-menu>
         </div>
      </div>
   </v-app-bar>
</template>

<script setup>
import { useLocale } from 'vuetify';
import logo from '@/assets/bazan-logo.png';
import avatar from '@/assets/avatar.png';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { watch } from 'vue';

const { t } = useLocale();
const router = useRouter();
const route = useRoute();

const nav = ref('home');
const navButtons = ref([
   {
      text: 'Home',
      value: 'home',
      selected: true,
      to: {
         name: 'home'
      }
   },
   {
      text: 'Components',
      value: 'components',
      selected: false,
      to: {
         name: 'components'
      }
   },
   {
      text: 'Cycles',
      value: 'cycles',
      selected: false,
      to: {
         name: 'cycles'
      }
   },
   {
      text: 'Removals',
      value: 'removals',
      selected: false,
      to: {
         name: 'removals'
      }
   },
   {
      text: 'Reports',
      value: 'reports',
      selected: false,
      to: {
         name: 'reports'
      }
   }
]);

const showNotifications = () => {};

//
</script>

<style lang="scss" scoped>
.nav-button {
   border-radius: 6px;
   padding: 8px 12px 8px 12px;
}

.nav-button-selected {
   background: rgba(121, 198, 224, 0.15);
   color: #0089d7;
}
</style>

<template>
   <layout title="Components">
      <template #actions>
         <div class="d-flex align-center" style="gap: 10px">
            <v-menu>
               <template v-slot:activator="{ props }">
                  <v-btn
                     color="button"
                     variant="text"
                     v-bind="props"
                     style="text-transform: capitalize"
                  >
                     <template v-slot:prepend>
                        <v-icon icon="mdi-star" color="#FFCB15"></v-icon>
                     </template>
                     <template v-slot:append>
                        <v-icon icon="mdi-chevron-down"></v-icon>
                     </template>
                     <span
                        style="text-transform: capitalize"
                        class="text-subtitle-2"
                        >Load query from favorites</span
                     >
                  </v-btn>
               </template>
            </v-menu>
            <v-menu>
               <template v-slot:activator="{ props }">
                  <v-btn
                     color="button"
                     variant="text"
                     v-bind="props"
                     style="text-transform: capitalize"
                  >
                     <template v-slot:append>
                        <v-icon icon="mdi-chevron-down"></v-icon>
                     </template>
                     <span
                        style="text-transform: capitalize"
                        class="text-subtitle-2"
                        >Advanced search</span
                     >
                  </v-btn>
               </template>
            </v-menu>
         </div>
      </template>

      <template #filters>
         <v-autocomplete
            density="compact"
            variant="outlined"
            hide-details
            color="#D0D5DD"
            label="Site name"
            :width="300"
            class="text-subtitle-2 input-field"
         />
         <v-autocomplete
            density="compact"
            variant="outlined"
            hide-details
            color="#D0D5DD"
            label="Section"
            :width="200"
            class="text-subtitle-2 input-field"
         />
         <v-autocomplete
            density="compact"
            variant="outlined"
            hide-details
            color="#D0D5DD"
            label="PID"
            :width="200"
            class="text-subtitle-2"
         />
         <v-text-field
            density="compact"
            variant="outlined"
            hide-details
            color="#D0D5DD"
            label="Tag"
            :width="200"
            class="text-subtitle-2"
         />
         <v-text-field
            density="compact"
            variant="outlined"
            hide-details
            color="#D0D5DD"
            label="Extension"
            :width="100"
            class="text-subtitle-2"
         />
         <v-autocomplete
            density="compact"
            variant="outlined"
            hide-details
            color="#D0D5DD"
            label="Out of service"
            :width="200"
            class="text-subtitle-2"
         />
         <v-btn style="text-transform: capitalize" color="button"
            >Show results</v-btn
         >
      </template>
      <v-row>
         <v-col :lg="!currentSelectedRowId ? 12 : 6">
            <div>
               <bz-tabs v-model="selectedMasterTab" :items="masterTabs" />
               <v-card
                  flat
                  style="border-top-left-radius: 0"
                  height="calc(100vh - 350px)"
               >
                  <v-data-table
                     v-model="selectedComponents"
                     :headers="columns"
                     hide-default-footer
                     hover
                     height="calc(100vh - 405px)"
                     sort-asc-icon="mdi-arrow-down"
                     sort-desc-icon="mdi-arrow-up"
                     show-select
                     select-strategy="all"
                     @click:row="onRowClicked"
                     item-value="pid"
                     :items="items"
                  >
                     <template v-slot:item="{ item, isSelected, toggleSelect }">
                        <tr
                           @click="onRowClicked(item)"
                           :class="{
                              'bg-primary100': currentSelectedRowId === item.pid
                           }"
                        >
                           <td>
                              <v-checkbox
                                 hide-details
                                 :model-value="
                                    isSelected({
                                       value: item.pid,
                                       selectable: true
                                    })
                                 "
                                 @update:model-value="
                                    toggleSelect({
                                       value: item.pid,
                                       selectable: true
                                    })
                                 "
                              />
                           </td>
                           <td>{{ item.site }}</td>
                           <td>{{ item.section }}</td>
                           <td>{{ item.pid }}</td>
                           <td>{{ item.tag }}</td>
                           <td>{{ item.extension }}</td>
                           <td>
                              <v-chip
                                 v-if="item.outOfService === 'In Service'"
                                 color="accent2"
                                 class="font-weight-semibold"
                                 size="small"
                              >
                                 <span
                                    class="bg-accent2 mr-2"
                                    style="
                                       width: 6px;
                                       height: 6px;
                                       border-radius: 3px;
                                    "
                                 />
                                 {{ item.outOfService }}
                              </v-chip>

                              <v-chip
                                 v-else
                                 color="neutral800"
                                 class="font-weight-semibold"
                                 size="small"
                              >
                                 <span
                                    class="bg-neutral800 mr-2"
                                    style="
                                       width: 6px;
                                       height: 6px;
                                       border-radius: 3px;
                                    "
                                 />
                                 {{ item.outOfService }}
                              </v-chip>
                           </td>
                        </tr>
                     </template>
                     <template #bottom>
                        <v-divider />
                        <div
                           style="height: 55px; width: 100%; overflow: hidden"
                           class="d-flex justify-space-between align-center px-6"
                        >
                           <v-btn
                              variant="outlined"
                              text="Previous"
                              class="text-capitalize"
                              :disabled="page === 1"
                              rounded="lg"
                              @click="page--"
                              :height="36"
                              border="#D0D5DD"
                           >
                              <template v-slot:prepend>
                                 <v-icon icon="mdi-arrow-left" />
                              </template>
                           </v-btn>
                           <v-pagination
                              v-model="page"
                              density="compact"
                              variant="text"
                              :length="numOfPages"
                              :next-icon="null"
                              :prev-icon="null"
                              :total-visible="8"
                           />
                           <v-btn
                              variant="outlined"
                              text="Next"
                              :height="36"
                              :disabled="page === numOfPages"
                              rounded="lg"
                              @click="page++"
                              class="text-capitalize"
                           >
                              <template v-slot:append>
                                 <v-icon icon="mdi-arrow-right" /> </template
                           ></v-btn>
                        </div>
                     </template>
                     <template
                        v-slot:headers="{
                           columns,
                           toggleSort,
                           isSorted,
                           getSortIcon
                        }"
                     >
                        <tr style="background-color: #eaecf0">
                           <template
                              v-for="column in columns"
                              :key="column.key"
                           >
                              <td>
                                 <span
                                    class="mr-2 cursor-pointer text-textHint font-weight-semibold text-cpation"
                                    @click="() => toggleSort(column)"
                                    >{{ column.title }}</span
                                 >
                                 <template v-if="column.sortable">
                                    <v-icon
                                       :icon="getSortIcon(column)"
                                       @click="() => toggleSort(column)"
                                       color="textHint"
                                    ></v-icon>
                                 </template>
                              </td>
                           </template>
                        </tr>
                     </template>
                  </v-data-table>
               </v-card>
            </div>
         </v-col>

         <v-col :lg="6">
            <v-expand-x-transition :disabled="!currentSelectedRowId">
               <div v-if="currentSelectedRowId">
                  <bz-tabs v-model="selectedDetailsTab" :items="detailsTabs" />
                  <v-card
                     flat
                     height="calc(100vh - 350px)"
                     style="border-top-left-radius: 0"
                  >
                     <v-card-title
                        class="bg-neutral50 text-subtitle-2 d-flex align-center"
                        style="height: 52px"
                        >Details</v-card-title
                     >
                     <v-card-text class="pa-8">
                        <v-row>
                           <v-col :lg="4">
                              <v-autocomplete
                                 variant="outlined"
                                 density="comfortable"
                                 hide-details
                                 persistent-placeholder
                                 placeholder="Select value"
                                 clearable
                                 label="Site name"
                                 class="text-subtitle-2 input-field"
                              />
                           </v-col>
                           <v-col :lg="4">
                              <v-autocomplete
                                 variant="outlined"
                                 density="comfortable"
                                 hide-details
                                 clearable
                                 placeholder="Select value"
                                 label="Section name"
                                 persistent-placeholder
                                 class="text-subtitle-2 input-field"
                              />
                           </v-col>
                           <v-col :lg="4">
                              <v-text-field
                                 variant="outlined"
                                 density="comfortable"
                                 hide-details
                                 clearable
                                 placeholder="Select value"
                                 label="PID"
                                 persistent-placeholder
                                 class="text-subtitle-2 input-field"
                              />
                           </v-col>
                           <v-col :lg="4">
                              <v-autocomplete
                                 variant="outlined"
                                 density="comfortable"
                                 hide-details
                                 :items="[
                                    {
                                       title: 'dsds'
                                    }
                                 ]"
                                 clearable
                                 placeholder="Select value"
                                 persistent-placeholder
                                 label="Tag"
                                 class="text-subtitle-2 input-field"
                              />
                           </v-col>
                           <v-col :lg="4">
                              <v-autocomplete
                                 variant="outlined"
                                 clearable
                                 density="comfortable"
                                 hide-details
                                 placeholder="Select value"
                                 persistent-placeholder
                                 label="Extension"
                                 class="text-subtitle-2 input-field"
                              />
                           </v-col>
                           <v-col :lg="4">
                              <v-autocomplete
                                 variant="outlined"
                                 density="comfortable"
                                 hide-details
                                 clearable
                                 placeholder="Select value"
                                 persistent-placeholder
                                 label="Out of Service"
                                 class="text-subtitle-2 input-field"
                              />
                           </v-col> </v-row
                     ></v-card-text>
                     <v-card-actions class="pa-8">
                        <v-btn
                           variant="flat"
                           text="Cancel"
                           size="x-large"
                           :rounded="'md'"
                           class="text-capitalize text-subtitle-2"
                           style="border: 1px solid #d0d5dd"
                        />
                        <v-btn
                           variant="flat"
                           color="primary300"
                           text="Update"
                           rounded="md"
                           size="x-large"
                           class="text-capitalize text-subtitle-2"
                        />
                     </v-card-actions>
                  </v-card>
               </div>
            </v-expand-x-transition>
         </v-col>
      </v-row>
   </layout>
</template>

<script setup>
import Layout from '@/layouts/PageLayout.vue';
import { ref } from 'vue';
import { BzTabs } from '@/components';
import { nextTick } from 'vue';

const columns = [
   {
      title: 'Site name',
      sortable: false,
      key: 'site'
   },
   {
      title: 'Section',
      sortable: true,
      key: 'section'
   },
   {
      title: 'PID',
      sortable: true,
      key: 'pid'
   },
   {
      title: 'Tag',
      sortable: true,
      key: 'tag'
   },
   {
      title: 'Extension',
      sortable: true,
      key: 'extension'
   },
   {
      title: 'Out of service',
      sortable: true,
      key: 'outOfService'
   }
];

const items = ref([
   {
      site: 'Site name 1',
      section: 'Section name 1',
      pid: 'PID 1',
      tag: 'Tag 1',
      extension: 'Extension 1',
      outOfService: 'Out of Service'
   },
   {
      site: 'Site name 1',
      section: 'Section name 1',
      pid: 'PID 2',
      tag: 'Tag 1',
      extension: 'Extension 1',
      outOfService: 'In Service'
   },
   {
      site: 'Site name 1',
      section: 'Section name 1',
      pid: 'PID 3',
      tag: 'Tag 1',
      extension: 'Extension 1',
      outOfService: 'Out of Service 1'
   },
   {
      site: 'Site name 1',
      section: 'Section name 1',
      pid: 'PID 4',
      tag: 'Tag 1',
      extension: 'Extension 1',
      outOfService: 'Out of Service 1'
   }
]);

const masterTabs = ref([
   {
      title: 'Planning mode',
      value: 'planning'
   },
   {
      title: 'Working mode',
      value: 'working'
   },
   {
      title: 'Show all columns',
      value: 'all'
   }
]);

const detailsTabs = ref([
   {
      title: 'Details',
      value: 'details'
   },
   {
      title: 'Cycles & leaks',
      value: 'cycles'
   },
   {
      title: 'History',
      value: 'history'
   },
   {
      title: 'Documents',
      value: 'documents'
   }
]);

const page = ref(1);
const selectedComponents = ref([]);
const currentSelectedRowId = ref(null);

const selectedMasterTab = ref(0);
const selectedDetailsTab = ref(0);

const numOfPages = ref(10);

const onRowClicked = (row) => {
   if (currentSelectedRowId.value === row.pid) {
      currentSelectedRowId.value = null;
   } else {
      currentSelectedRowId.value = null;

      nextTick(() => {
         currentSelectedRowId.value = row.pid;
      });

      selectedDetailsTab.value = 0;
   }
};
</script>

<style lang="scss" scoped>
.input-field input {
   box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05) !important;
}

.table {
   border: 1px solid rgba(234, 236, 240, 1);
   box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.06);
   box-shadow: 0px 1px 3px 0px rgba(16, 24, 40, 0.1);
   border-radius: 0px 12px 12px 12px;
}

.selected-tab {
   color: #0089d7 !important;
   text-transform: capitalize;
}
</style>

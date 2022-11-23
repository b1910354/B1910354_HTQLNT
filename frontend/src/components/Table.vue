<template>
  <table class="border-collapse table-auto w-full">
    <thead>
      <tr
        class="text-white border border-solid border-violet-400 border-l-0 border-r-0 uppercase text-base bg-slate-900"
      >
        <th class="p-2"><span class="float-left">#</span></th>
        <th class="p-2 relative" v-for="(field, index) in fields" :key="index">
          <span class="float-left">{{ field }}</span>
          <Sort class="text-white" />
        </th>
        <th class="p-2 w-20"><span class="float-left">Actions</span></th>
      </tr>
    </thead>
    <tbody>
      <tr
        class="text-white border border-solid border-violet-400 border-l-0 border-r-0 text-base lowercase"
        v-for="(item, index) in items"
        :key="item._id"
      >
        <td class="p-2">
          <router-link
            :to="{ name: actionList[0], params: { id: item._id } }"
            class="float-left text-blue-500"
          >
            #{{ sliceID(item._id, index) }}
          </router-link>
        </td>
        <td v-for="(label, index) in labels" :key="index" class="p-2">
          <span class="float-left">{{ setGender(label, item[label]) }}</span>
        </td>
        <td class="p-2">
          <div class="flex">
            <!-- view -->
            <router-link
              :to="{ name: actionList[0], params: { id: item._id } }"
            >
              <IDetail
                class="text-lg text-white hover:bg-slate-500 px-1 hover:text-white cursor-pointer rounded-sm"
              />
            </router-link>

            <!-- edit -->
            <router-link
              v-if="actionList.length > 1"
              :to="{ name: actionList[1], params: { id: item._id } }"
            >
              <IEdit
                class="text-lg text-yellow-500 hover:bg-yellow-500 px-1 hover:text-white cursor-pointer rounded-sm"
              />
            </router-link>
            <IEdit
              v-else
              @click="updateItem(item._id)"
              class="text-lg text-yellow-500 hover:bg-yellow-500 px-1 hover:text-white cursor-pointer rounded-sm"
            />

            <!-- delete -->
            <IDelete
              @click="deleteItem(item._id)"
              class="text-lg text-red-500 hover:bg-red-500 px-1 hover:text-white cursor-pointer rounded-sm"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <span v-if="items.length == 0" class="flex justify-center my-3 text-white"
    >No matching records found</span
  >
</template>

<script>
import IDetail from "./icons/Detail.vue";
import IEdit from "./icons/Edit.vue";
import IDelete from "./icons/Delete.vue";
import Sort from "./Sort.vue";

export default {
  components: {
    IDetail,
    IEdit,
    IDelete,
    Sort,
  },
  props: {
    items: {
      type: Array,
      default: [],
    },
    fields: {
      type: Array,
      default: ["Name", "Age", "Payment"],
    },
    labels: {
      type: Array,
      default: [],
    },
    actionList: {
      type: Array,
      default: [],
    },
  },
  emits: ["update:activeAction", "deleteItem", "update:item"],
  methods: {
    sliceID(id, index) {
      return id.substring(18, 22).concat(index);
    },
    setGender(name, value) {
      if (name == "gender" && value == true) return "male";
      else if (name == "gender" && value == false) return "female";
      return value;
    },
    updateActiveAction(index) {
      this.$emit("update:activeAction", index);
    },
    deleteItem(id) {
      this.$emit("deleteItem", id);
    },
    updateItem(id) {
      this.$emit("update:item", id);
    },
  },
};
</script>

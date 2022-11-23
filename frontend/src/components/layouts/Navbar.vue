<template>
  <div class="flex flex-row items-center">
    <div class="basis-1/2 space-x-4">
      <!-- <form action="" class="relative ml-2">
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
          <ISearch class="text-violet-500 cursor-pointer" @click="onSearch = !onSearch"/>
        </span>
        <input v-if="onSearch"
          type="search"
          name="search"
          id="search"
          placeholder="Search for anything..."
          class="bg-inherit rounded-md py-2 pl-9 pr-3 w-full border border-solid border-violet-500 placeholder:italic placeholder:text-sm placeholder:text-white block focus:rounded-md shadow-sm focus:outline-none focus:border-violet-500 focus:ring-violet-500 focus:ring-1"
        />
      </form> -->
      <span class="text-green-500 text-xl ml-2 uppercase tracking-widest">Nursery</span>
      <span class="text-yellow-500 text-xl ml-2 uppercase tracking-widest">Management</span>
      <span class="text-red-500 text-xl ml-2 uppercase tracking-widest">System</span>
    </div>
    <div class="basis-1/4">
      <!-- task -->
      <div class="flex justify-end items-center">
        <a class="flex items-center group rounded-sm group">
          <span
            class="material-symbols-outlined group-hover:text-white text-violet-500 group-hover:p-2 group-hover:border group-hover:border-solid group-hover:border-violet-500 group-hover:rounded-md cursor-pointer"
          >
            dark_mode
          </span>
        </a>
        <a class="flex items-center group border rounded-sm mx-2">
          <span
            class="material-symbols-outlined group-hover:text-white text-violet-500 group-hover:p-2 group-hover:border group-hover:border-solid group-hover:border-violet-500 group-hover:rounded-md cursor-pointer"
          >
            notifications
          </span>
        </a>
        <a class="flex items-center group border rounded-sm">
          <span
            class="material-symbols-outlined group-hover:text-white text-violet-500 group-hover:p-2 group-hover:border group-hover:border-solid group-hover:border-violet-500 group-hover:rounded-md cursor-pointer"
          >
            apps
          </span>
        </a>
      </div>
      <!-- dropdown -->
      <!-- <div class="absolute h-auto top-16 bg-white right-72 mr-5 rounded-sm">
          a
        </div> -->
    </div>
    <div class="basis-1/4">
      <!-- user -->
      <div
        @click="showUsers"
        class="group flex justify-end items-center overflow-hidden my-1 cursor-pointer"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        <img
          class="shrink-0 h-12 w-12 rounded-full"
          src="https://cdn.pixabay.com/photo/2022/05/15/13/38/woman-7198072__340.jpg"
          alt=""
        />
        <div class="ml-3 mr-2">
          <p class="text-base font-medium text-white">Tran Tuan Duy</p>
          <p class="text-xs font-medium text-white group-hover:italic">
            Product Manager
          </p>
        </div>
      </div>
      <!-- dropdown -->
      <div
        v-if="usersToggle"
        class="absolute h-auto w-40 top-16 bg-slate-800 right-0 mr-2 shadow-lg rounded-sm"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <div
          class="border border-solid border-violet-200 border-t-0 border-r-0 border-l-0"
        >
          <a
            class="group flex items-center p-2 text-white hover:bg-violet-500 text-sm hover:text-white"
          >
            <span class="material-symbols-outlined text-violet-500 group-hover:text-white mr-4 text-xl"> person </span>
            <span>Profile</span>
          </a>
          <a
            class="group flex items-center p-2 text-white hover:bg-violet-500 text-sm hover:text-white"
          >
            <span class="material-symbols-outlined text-violet-500 group-hover:text-white mr-4 text-xl"> forward_to_inbox </span>
            <span>Inbox</span>
          </a>
          <a
            class="group flex items-center p-2 text-white hover:bg-violet-500 text-sm hover:text-white"
          >
            <span class="material-symbols-outlined text-violet-500 group-hover:text-white mr-4 text-xl"> task </span>
            <span>Task</span>
          </a>
          <a
            class="group flex items-center p-2 text-white hover:bg-violet-500 text-sm hover:text-white"
          >
            <span class="material-symbols-outlined text-violet-500 group-hover:text-white mr-4 text-xl"> chat </span>
            <span>Chat</span>
          </a>
        </div>
        <a
          class="group flex items-center p-2 text-white hover:bg-violet-500 text-sm hover:text-white"
        >
          <span class="material-symbols-outlined text-violet-500 group-hover:text-white mr-4 text-xl"> logout </span>
          <span>Logout</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import ISearch from "../icons/Search.vue";
export default {
  components: {
    ISearch,
  },
  data() {
    return {
      usersToggle: false,
      onSearch: false,
    };
  },
  methods: {
    showUsers() {
      this.usersToggle = !this.usersToggle;
    },
  },
};
</script>

<style scoped></style>

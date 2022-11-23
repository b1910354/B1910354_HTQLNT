<template>
  <div
    v-if="sidebarToggle"
    v-on:mouseover="showToggle"
    class="fixed top-0 left-0 overflow-auto max-h-screen min-h-screen w-1/12 bg-slate-800 shadow-2xl"
  >
    <div class="flex flex-col items-center justify-content-center">
      <div class="mt-3">
        <span
          class="material-symbols-outlined text-6xl text-green-500 animate-spin"
        >
          toys_fan
        </span>
      </div>
      <div class="mt-4">
        <router-link
          :to="{ name: `Dashboard` }"
          class="my-3 flex items-center overflow-hidden px-2 py-1 w-full text-base"
          :class="[
            1000 === activeIndex
              ? 'border-2 border-solid border-violet-500 text-white rounded-sm'
              : 'text-violet-500',
          ]"
          @click="updateActiveIndex(1000)"
        >
          <span class="material-symbols-outlined text-3xl"> home </span>
        </router-link>
      </div>
      <div class="flex flex-col items-center">
        <a href="" class="mb-3"><i class="text-violet-500 text-3xl">...</i></a>
        <router-link
          :to="{ name: `${sidebarTask.name}` }"
          class="my-3 flex items-center overflow-hidden py-1 px-2 w-full text-base"
          v-for="sidebarTask in sidebarTasks"
          :key="sidebarTask.id"
          :class="[
            sidebarTask.id === activeIndex
              ? 'border-2 border-solid border-violet-500 text-white rounded-sm'
              : 'text-violet-500',
          ]"
          @click="updateActiveIndex(sidebarTask.id)"
        >
          <span class="material-symbols-outlined text-3xl">
            {{ sidebarTask.icon }}
          </span>
        </router-link>
        <a href="" class="mb-3"><i class="text-violet-500 text-3xl">...</i></a>
      </div>
      <router-link
        :to="{ name: `Setting` }"
        class="my-3 flex items-center overflow-hidden py-1 px-2 text-base"
        :class="[
          2000 === activeIndex
            ? 'border-2 border-solid border-violet-500 text-white rounded-sm'
            : 'text-violet-500',
        ]"
        @click="updateActiveIndex(2000)"
      >
        <span class="material-symbols-outlined text-3xl"> settings </span>
      </router-link>
    </div>
  </div>
  <!-- hover -->
  <div
    v-else
    v-on:mouseleave="showToggle"
    class="fixed top-0 left-0 overflow-auto max-h-screen min-h-screen w-2/12 bg-slate-800 shadow-lg z-10"
  >
    <div class="flex flex-col items-center justify-content-center">
      <!-- Logo -->
      <div class="w-11/12 mt-3 flex items-center">
        <span
          class="material-symbols-outlined text-6xl text-green-500 animate-spin"
        >
          toys_fan
        </span>
        <span class="text-5xl logo text-yellow-500">KeyOne</span>
      </div>
      <!-- Dashboards -->
      <router-link
        :to="{ name: `Dashboard` }"
        class="mb-5 mt-8 flex items-center overflow-hidden py-1 px-2 w-11/12 text-base "
        :class="[
          1000 === activeIndex
            ? 'border-2 border-solid border-violet-500 text-white rounded-md'
            : 'text-violet-700 hover:border hover:border-solid hover:border-violet-500 hover:text-white hover:rounded-md',
        ]"
        @click="updateActiveIndex(1000)"
      >
        <span
          class="material-symbols-outlined text-2xl mr-4"
          :class="[1000 === activeIndex ? '' : 'shadow-lg shadow-violet-500']"
        >
          home
        </span>
        <span class="text-lg text-white sidebar">Dashboards</span>
      </router-link>
      <div class="border border-1 border-dotted border-violet-900 w-full mt-2"></div>
      <!-- Tasks -->
      <div
        v-for="sidebarTask in sidebarTasks"
        :key="sidebarTask.id"
        class="flex flex-col items-center w-11/12"
      >
        <router-link
          :to="{ name: `${sidebarTask.name}` }"
          class="my-5 flex items-center justify-between overflow-hidden py-1 px-2 w-full text-base"
          :class="[
            sidebarTask.id === activeIndex
              ? 'border-2 border-solid border-violet-500 text-white rounded-md'
              : 'text-violet-700 hover:border hover:border-solid hover:border-violet-500 hover:text-white hover:rounded-md',
          ]"
          @click="updateActiveIndex(sidebarTask.id)"
        >
          <div class="flex items-center">
            <span
              class="material-symbols-outlined text-2xl mr-4"
              :class="[
                sidebarTask.id === activeIndex
                  ? ''
                  : 'shadow-lg shadow-violet-500',
              ]"
            >
              {{ sidebarTask.icon }}
            </span>
            <span class="text-lg text-white sidebar">{{
              sidebarTask.name
            }}</span>
          </div>

          <!-- child tasks -->
          <div
            v-if="sidebarTask.children.length != 0"
            class="flex items-center"
          >
            <span class="material-symbols-outlined text-lg" :class="[sidebarTask.id === activeIndex ? 'text-white' : 'text-violet-500']">
              {{sidebarTask.id === activeIndex ? 'expand_more' : 'navigate_next'}}
            </span>
          </div>
        </router-link>
        <!-- child tasks -->
        <router-link
          v-if="sidebarTask.id === activeIndex"
          v-for="(childTask, indexChild) in sidebarTask.children"
          :to="{ name: `${childTask.route}` }"
          class="flex items-center overflow-hidden py-1 px-2 w-11/12 text-base my-3"
          :class="[
            indexChild === activeIndexChild && sidebarTask.id === activeIndex
              ? 'border-2 border-solid border-violet-500 text-white rounded-md'
              : 'text-violet-700 hover:border hover:border-solid hover:border-violet-500 hover:text-white hover:rounded-md',
          ]"
          @click="activeIndexChild = indexChild"
        >
          <span
            class="material-symbols-outlined text-2xl mr-2"
            :class="[indexChild === activeIndexChild ? 'text-yellow-500' : '']"
          >
            fiber_manual_record
          </span>
          <span class="text-md text-yellow-500 sidebar">{{ childTask.name }}</span>
        </router-link>
      </div>
      <div class="border border-1 border-dotted border-violet-900 w-full mt-2"></div>
      <!-- Setting -->
      <router-link
        :to="{ name: `Setting` }"
        class="flex items-center overflow-hidden py-1 px-2 w-11/12 text-base my-5"
        :class="[
          2000 === activeIndex
            ? 'border-2 border-solid border-violet-500 text-white rounded-md'
            : 'text-violet-700 hover:border hover:border-solid hover:border-violet-500 hover:text-white hover:rounded-md',
        ]"
        @click="updateActiveIndex(2000)"
      >
        <span
          class="material-symbols-outlined text-2xl mr-4"
          :class="[2000 === activeIndex ? '' : 'shadow-lg shadow-violet-500']"
        >
          settings
        </span>
        <span class="text-lg text-white sidebar">Settings</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activeIndex: { type: Number, default: -1 },
    activeIndexChild: { type: Number, default: -1 },
  },
  emits: ["update:activeIndex"],
  data() {
    return {
      sidebarToggle: true,
      sidebarTasks: [
        {
          id: 1,
          icon: "family_restroom",
          name: "Children",
          children: [
            {
              id: 11,
              name: "Children DI",
              route: "CDI"
            }
          ],
        },
        {
          id: 2,
          icon: "airline_seat_recline_normal",
          name: "Teacher",
          children: [
            {
              id: 21,
              name: "Position", 
              route: "Position"
            },
            {
              id: 22,
              name: "Diploma",
              route: "Diploma"
            }
          ],
        },
        {
          id: 3,
          icon: "event_available",
          name: "Todo",
          children: [
            // {
            //   id: 31,
            //   name: "Assignment",
            //   route: "Assignment"
            // },
            {
              id: 32,
              name: "Duty",
              route: "Duty"
            }
          ]
        },
        {
          id: 4,
          icon: "apartment",
          name: "Grade",
          children: [
            {
              id: 41,
              name: 'Classes',
              route: 'Classes'
            },
            {
              id: 42,
              name: "School Year",
              route: "SchoolYear"
            },
            {
              id: 43,
              name: "Tuition Fees",
              route: "TuitionFees"
            },
            {
              id: 44,
              name: "Collection Rates",
              route: "CollectionRates"
            },
          ]
        }
      ],
    };
  },
  methods: {
    showToggle() {
      this.sidebarToggle = !this.sidebarToggle;
    },
    onClick() {
      this.sidebarTasks.active = true;
    },
    updateActiveIndex(index) {
      this.$emit("update:activeIndex", index);
    },
  },
};
</script>

<style>
/* .bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
} */
/* @keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
} */
.active {
  background-color: black;
}
</style>

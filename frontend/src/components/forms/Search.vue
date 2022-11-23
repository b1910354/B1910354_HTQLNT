<template>
  <div class="relative flex items-center">
    <span
      class="absolute left-0 px-2 border border-solid border-violet-500 border-t-0 border-b-0 border-l-0 h-full flex items-center"
    >
      <ISearch class="text-violet-500" />
    </span>
    <input
      type="text"
      placeholder="Search for anything..."
      class="w-full py-2 pl-14 pr-3 border border-solid border-violet-500 rounded-md placeholder:italic placeholder:text-sm placeholder:text-white bg-inherit focus:bg-white text-white focus:text-slate-700"
      :value="modelValue"
      @input="updateModelValue"
    />
  </div>
</template>

<script>
import ISearch from "../icons/Search.vue";
export default {
  components: {
    ISearch,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  methods: {
    updateModelValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>

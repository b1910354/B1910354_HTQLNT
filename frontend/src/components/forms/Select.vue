<template>
  <div class="relative w-full flex items-center flex-row-reverse bg-inherit border border-solid border-violet-500 rounded-md">
    <span class="material-symbols-outlined px-2 border border-solid border-violet-500 border-t-0 border-b-0 border-r-0 h-full flex items-center cursor-pointer"
    :class="[activeSelect == true ? 'text-white' : 'text-violet-500']"
    @click="activeSelect = !activeSelect"
    >  {{activeSelect == true ? 'expand_less' : 'expand_more'}}</span>
    <input type="text" class="bg-inherit w-full placeholder:text-white text-white px-2 text-md"
    :value="modelValue"
    @input="activeSelect = true"
    @focus="activeSelect = true"
    />
    <!-- options -->
    <div v-if="activeSelect" class="absolute top-0 mt-12 w-full rounded-md bg-slate-800 border border-solid border-violet-500 text-white overflow-auto flex flex-col items-start justify-start z-10">
        <span
        v-for="(option, index) in options" :key="index"
        @click="[updateModelValue(option._id), activeSelect = false, modelValue = option.name]"
        class="hover:bg-violet-500 w-full py-1 px-2 text-white">{{option.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        modelValue: "",
        options: {
            type: Array, default: []
        },
    },
    emits: ['update:modelValue'],
    data() {
        return {
            activeSelect: false,
        }
    },
    methods: {
        updateModelValue(value) {
            this.$emit('update:modelValue', value)
        }
    },
}
</script>

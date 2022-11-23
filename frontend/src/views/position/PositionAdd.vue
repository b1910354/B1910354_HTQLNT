<template>
  <div class="absolute top-0 right-0 w-screen h-screen z-50 flex">
    <div class="bg-slate-900 h-screen opacity-50 flex-1"></div>
    <div class="bg-slate-800 h-screen w-96">
      <div
        class="flex flex-row justify-between items-center px-3 py-3 bg-violet-500 text-white text-lg"
      >
        <span>Add New Position</span>
        <span @click="cancel" class="material-symbols-outlined cursor-pointer"> close </span>
      </div>
      <div class="flex flex-col my-5">
        <Form />
      </div>
    </div>
  </div>
</template>

<script>
import Form from '../../components/FormTeacher.vue';
export default {
    components: {
        Form
    },
    emits: ['cancel'],
    data() {
        return {
            newPosition: {
                name: ""
            }
        }
    },
    methods: {
        cancel() {
            this.$emit('cancel', false);
        }
    }
}
</script>

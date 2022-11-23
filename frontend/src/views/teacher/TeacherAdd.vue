<template>
  <div class="absolute top-0 right-0 w-screen h-screen z-50 flex overflow-auto">
    <div class="bg-slate-900 h-screen opacity-50 flex-1"></div>
    <div class="bg-slate-800 h-screen w-96 overflow-auto">
      <div
        class="flex flex-row justify-between items-center px-3 py-3 bg-violet-500 text-white text-lg"
      >
        <span>Add New Teacher</span>
        <span @click="cancel" class="material-symbols-outlined cursor-pointer">
          close
        </span>
      </div>
      <div class="flex flex-col my-5 mx-3">
        <Form
          :teacher="teacher"
          @submit:teacher="create"
          @cancel="(value) => this.$emit('cancel', value)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Form from "../../components/FormTeacher.vue";
import Teacher from "../../services/teacher.service";
import Swal from "sweetalert2";

export default {
  components: {
    Form,
  },
  props: {},
  emits: ["cancel"],
  data() {
    return {
      teacher: {
        name: "",
        gender: true,
        dateOfBirth: new Date("2001-01-01"),
        phone: "",
        mail: "",
        position: "",
        diploma: "",
      },
      background: "rgb(71 55 133 / var(--tw-bg-opacity))",
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel", false);
    },
    async create() {
      try {
        await Teacher.create(this.teacher);
        Swal.fire({
            background: this.background,
            color: 'white',
            icon: 'success',
            text: 'Successfully creation',
            timer: 2000,
        })
        this.cancel();
      } catch (err) {
        console.log(err);
      }
    },
    
  },
};
</script>

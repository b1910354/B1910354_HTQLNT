<template>
    <div class="absolute top-0 right-0 w-screen h-screen z-50 flex overflow-auto">
      <div class="bg-slate-900 h-screen opacity-50 flex-1"></div>
      <div class="bg-slate-800 h-screen w-96 overflow-auto">
        <div
          class="flex flex-row justify-between items-center px-3 py-3 bg-violet-500 text-white text-lg"
        >
          <span>Add New collectionRate</span>
          <span @click="cancel" class="material-symbols-outlined cursor-pointer">
            close
          </span>
        </div>
        <div class="flex flex-col my-5 mx-3">
          <Form
            :collectionRate="collectionRate"
            @submit:collectionRate="create"
            @cancel="(value) => this.$emit('cancel', value)"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Form from "../../components/FormCollectionRates.vue";
  import CollectionRates from "../../services/collection-rates.service";
  import Swal from "sweetalert2";
  
  export default {
    components: {
      Form,
    },
    props: {},
    emits: ["cancel"],
    data() {
      return {
        collectionRate: {
          money: "",
          startDate: "",
          endDate: "",
          grade: "",
          tuitionFees: "",
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
          await CollectionRates.create(this.collectionRate);
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
  
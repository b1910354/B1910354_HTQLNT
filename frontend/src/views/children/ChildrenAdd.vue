<template>
    <div class="absolute top-0 right-0 w-screen h-screen z-50 flex overflow-auto items-center justify-center">
      <div class="bg-slate-900 h-screen opacity-50 flex-1 relative"></div>
      <div class="bg-slate-800 h-auto w-7/12 absolute rounded-md shadow-xl">
        <div
          class="flex flex-row justify-between items-center px-3 py-3  bg-violet-800 text-white text-lg"
        >
          <span>Add a New Child</span>
          <span @click="cancel" class="material-symbols-outlined cursor-pointer">
            close
          </span>
        </div>
        <div class="flex flex-col my-5 mx-3">
          <Form
            :children="children"
            :parentsDetail="parentsDetail"
            @submit:form="create"
            @cancel="(value) => this.$emit('cancel', value)"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Form from "../../components/FormChildren.vue";
  import Children from "../../services/children.service";
  import Parents from "../../services/parents.service";
  import ParentsDetail from "../../services/parents-detail.service"
  import Swal from "sweetalert2";
  
  export default {
    components: {
      Form,
    },
    props: {},
    emits: ["cancel"],
    data() {
      return {
        parentsDetail: {
            name: "",
            gender: true,
            phone: "",
            mail: "",
            relationship: "",
            address: "",
            parents: "",
        },
        parents: {},
        parents_detail: {},
        children: {
            name: "",
            gender: true,
            dateOfBirth: "",
            address: "",
            parentsDetail: ""
        },
        background: "rgb(71 55 133 / var(--tw-bg-opacity))",
      };
    },
    methods: {
      cancel() {
        this.$emit("cancel", false);
      },
      async create() {
        // create parents
        try{
            this.parents = await Parents.create();
            this.parentsDetail.parents = this.parents._id;
        }catch(err) {
            console.log(err);
        }
        
        // create parents detail
        try {
            console.log(this.parentsDetail.parents);
            console.log(this.parentsDetail);
            this.parents_detail = await ParentsDetail.create(this.parentsDetail);
            this.children.parentsDetail = this.parents_detail._id;
        }catch(err) {
            console.log(err);
        }

        // create children
        try {
          await Children.create(this.children);
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
  
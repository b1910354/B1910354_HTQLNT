<template>
    <div class="w-full">
      <div class="bg-slate-800 rounded-md">
        <div class="flex flex-row mx-2 py-5 justify-between">
          <div class="flex">
            <span class="text-white text-sm flex items-center">Show</span>
            <Select
              :options="listEntries"
              :modelValue="entryValue"
              v-model="entryValue"
              class="w-20 mx-2"
            />
            <span class="text-white text-sm flex items-center">entries</span>
          </div>
          <div class="flex justify-between w-7/12">
            <Search v-model="searchText" class="w-full" />
            <BAdd class="ml-10" @click="activeAdd = true" />
          </div>
        </div>
        <Table
          :items="formatCDI(setPages)"
          :fields="fields"
          :labels="labels"
          :actionList="actionList"
          @deleteItem="(value) => (deleteValue = value)"
          @update:item="(value) => (editValue = value)"
        />
        <Pagination
          :numberOfPages="numberOfPages"
          :totalRow="totalRow"
          :startRow="startRow"
          :endRow="endRow"
          v-model:currentPage="currentPage"
        />
      </div>
    </div>
  
    <!-- Add -->
    <CDIAdd v-if="activeAdd" @cancel="value => activeAdd = value" />
  </template>
  
  <script>
  import Search from "../../components/forms/Search.vue";
  import BAdd from "../../components/buttons/Add.vue";
  import Select from "../../components/forms/Select.vue";
  import Table from "../../components/Table.vue";
  import Pagination from "../../components/Pagination.vue";
  import CDI from "../../services/cdi.service";
  import Swal from "sweetalert2";
  import CDIAdd from "./CDIAdd.vue";
  
  export default {
    components: {
      Search,
      BAdd,
      Select,
      Table,
      Pagination,
      CDIAdd
    },
    data() {
      return {
        listEntries: [
          {
            _id: 5,
            name: 5,
          },
          {
            _id: 10,
            name: 10,
          },
          {
            _id: 15,
            name: 15,
          },
        ],
        searchText: "",
        entryValue: 5,
        cdi_es: [],
        cdi: {},
        fields: ["name", "month", "class name", "height", "weight", "health", "number of roses"],
        labels: ["name", "month", "class", "height", "weight", "health", "numberOfRoses"],
        actionList: [],
        deleteValue: "",
        editValue: "",
        numberOfPages: 1,
        totalRow: 0,
        endRow: 0,
        startRow: 0,
        currentPage: 1,
        background: "rgb(71 55 133 / var(--tw-bg-opacity))",
        activeAdd: false,
      };
    },
    watch: {
      searchText() {
        this.currentPage = 1;
      },
      async deleteValue() {
        await this.getOne(this.deleteValue);
        await this.deleteOne();
        await this.refresh();
      },
      async editValue() {
        await this.getOne(this.editValue);
        await this.update();
        await this.refresh();
      },
      activeAdd() {
          this.refresh();
      }
    },
    computed: {
      // convert [object] -> [string]
      toString() {
        return this.cdi_es.map((cdi, index) => {
          return [cdi.height, cdi.weight, cdi.health, cdi.numberOfRoses, cdi.month.name, cdi.children.name].join("");
        });
      },
  
      // filter data when searchText change
      filter() {
        return this.cdi_es.filter((cdi, index) => {
          return this.toString[index].includes(this.searchText.toLowerCase());
        });
      },
  
      filtered() {
        if (!this.searchText) {
          this.totalRow = this.cdi_es.length;
          return this.cdi_es;
        } else {
          this.totalRow = this.filter.length;
          return this.filter;
        }
      },
  
      setNumberOfPages() {
        return Math.ceil(this.filtered.length / this.entryValue);
      },
  
      setPages() {
        if (this.setNumberOfPages == 0) this.numberOfPages = 1;
        else this.numberOfPages = this.setNumberOfPages;
  
        this.startRow = (this.currentPage - 1) * this.entryValue + 1;
        this.endRow = this.currentPage * this.entryValue;
  
        return this.filtered.filter((cdi, index) => {
          return (
            index + 1 > (this.currentPage - 1) * this.entryValue &&
            index + 1 <= this.currentPage * this.entryValue
          );
        });
      },
    },
    methods: {
      formatCDI(cdi_es) {
        return cdi_es.map((cdi, index) => {
          return {
            _id: cdi._id,
            height: cdi.height + 'cm',
            weight: cdi.weight + 'kg',
            health: cdi.health,
            numberOfRoses: cdi.numberOfRoses + ' ' + 'roses',
            month: cdi.month.name,
            name: cdi.child.name,
            class: cdi.class.name
          };
        });
      },
  
      checkCreate(value) {
        // return this.cdi_es.filter((cdi, index) => {
        //   return this.toString[index].includes(value.toLowerCase());
        // });
        for (var cdi of this.cdi_es) {
          if (cdi.name === value) {
            return true;
          }
        }
        return false;
      },
  
      async getAll() {
        try {
          this.cdi_es = await CDI.getAll();
        } catch (err) {
          console.log(err);
        }
      },
  
      async refresh() {
        await this.getAll();
        console.log(this.cdi_es);
      },
  
      async getOne(id) {
        try {
          this.cdi = await CDI.get(id);
        } catch (err) {
          console.log(err);
        }
      },
  
      async deleteOne() {
        const option = Swal.fire({
          background: this.background,
          color: "white",
          icon: "warning",
          html:
            "<p>I want to remove this" +
            ' "' +
            '<span class="text-blue-500 text-lg">' +
            this.cdi.name +
            "</span>" +
            '"' +
            "</p>",
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: "Delete",
          confirmButtonColor: "red",
          reverseButtons: true,
        });
  
        if ((await option).isConfirmed) {
          try {
            CDI.delete(this.deleteValue);
            Swal.fire({
              background: this.background,
              color: "white",
              text: "Successfully deletion",
              icon: "success",
              timer: 2000,
            });
          } catch (err) {
            console.log(err);
          }
        }
      },
    },
    created() {
      this.refresh();
    },
  };
  </script>
  
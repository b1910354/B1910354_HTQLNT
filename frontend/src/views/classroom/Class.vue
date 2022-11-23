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
          :items="formatClass_s(setPages)"
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
    <ClassAdd v-if="activeAdd" @cancel="value => activeAdd = value" />
  </template>
  
  <script>
  import Search from "../../components/forms/Search.vue";
  import BAdd from "../../components/buttons/Add.vue";
  import Select from "../../components/forms/Select.vue";
  import Table from "../../components/Table.vue";
  import Pagination from "../../components/Pagination.vue";
  import Classes from "../../services/class.service";
  import Swal from "sweetalert2";
  import ClassAdd from "./ClassAdd.vue";
  
  export default {
    components: {
      Search,
      BAdd,
      Select,
      Table,
      Pagination,
      ClassAdd
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
        classes: [],
        class_s: {},
        fields: ["name", "grade", "school year", "children"],
        labels: ["name", "grade", "schoolYear", "children"],
        actionList: ["Class.detail"],
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
        return this.classes.map((class_s, index) => {
          return [class_s.name, class_s.grade.name, class_s.schoolYear.name].join("");
        });
      },
  
      // filter data when searchText change
      filter() {
        return this.classes.filter((class_s, index) => {
          return this.toString[index].includes(this.searchText.toLowerCase());
        });
      },
  
      filtered() {
        if (!this.searchText) {
          this.totalRow = this.classes.length;
          return this.classes;
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
  
        return this.filtered.filter((class_s, index) => {
          return (
            index + 1 > (this.currentPage - 1) * this.entryValue &&
            index + 1 <= this.currentPage * this.entryValue
          );
        });
      },
    },
    methods: {
      formatClass_s(classes) {
        return classes.map((class_s, index) => {
          return {
            _id: class_s._id,
            name: class_s.name,
            schoolYear: class_s.grade.schoolYear.name,
            grade: class_s.grade.name,
            children: class_s.children.length,
          };
        });
      },
  
      checkCreate(value) {
        // return this.classes.filter((class_s, index) => {
        //   return this.toString[index].includes(value.toLowerCase());
        // });
        for (var class_s of this.classes) {
          if (class_s.name === value) {
            return true;
          }
        }
        return false;
      },
  
      async getAll() {
        try {
          this.classes = await Classes.getAll();
        } catch (err) {
          console.log(err);
        }
      },
  
      async refresh() {
        await this.getAll();
        console.log(this.classes);
      },
  
      async getOne(id) {
        try {
          this.class_s = await Classes.get(id);
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
            this.class_s.name +
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
            Classes.delete(this.deleteValue);
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
  
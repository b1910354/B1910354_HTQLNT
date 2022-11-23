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
            <BAdd class="ml-10" @click="activeAdd = true"/>
          </div>
        </div>
        <Table
          :items="formatChildren(setPages)"
          :fields="fields"
          :labels="labels"
          :actionList="actionList"
          @deleteItem="(value) => (deleteValue = value)"
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
    <!-- Add New child -->
    <ChildrenAdd v-if="activeAdd" @cancel="(value) => activeAdd = value"/>
  </template>
  
  <script>
  import Search from "../../components/forms/Search.vue";
  import BAdd from "../../components/buttons/Add.vue";
  import Select from "../../components/forms/Select.vue";
  import Table from "../../components/Table.vue";
  import Pagination from "../../components/Pagination.vue";
  import Swal from "sweetalert2";
  import Children from "../../services/children.service";
  import ChildrenAdd from "./ChildrenAdd.vue";
  
  export default {
    components: {
      Search,
      BAdd,
      Select,
      Table,
      Pagination,
      ChildrenAdd
    },
    data() {
      return {
        activeAdd: false,
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
        children: [],
        formatList: [],
        child: {},
        fields: [
          "name",
          "gender",
          "dateOfBirth",
          "address",
        ],
        labels: ["name", "gender", "dateOfBirth", "address"],
        actionList: [],
        deleteValue: "",
        numberOfPages: 1,
        totalRow: 0,
        endRow: 0,
        startRow: 0,
        currentPage: 1,
        background: "rgb(71 55 133 / var(--tw-bg-opacity))",
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
      async activeAdd() {
        await this.refresh();
      }
    },
    computed: {
      // convert [object] -> [string]
      toString() {
        return this.children.map((child, index) => {
          return [child.name, child.gender, child.dateOfBirth, child.address].join("");
        });
      },
      // filter data when searchText change
      filter() {
        return this.children.filter((child, index) => {
          return this.toString[index].includes(this.searchText.toLowerCase());
        });
      },
  
      filtered() {
        if (!this.searchText) {
          this.totalRow = this.children.length;
          return this.children;
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
  
        return this.filtered.filter((child, index) => {
          return (
            index + 1 > (this.currentPage - 1) * this.entryValue &&
            index + 1 <= this.currentPage * this.entryValue
          );
        });
      },
    },
    methods: {
      formatDateOfBirth(data) {
        const dateOfBirth = new Date(data);
        const y = dateOfBirth.getFullYear();
        const m = dateOfBirth.getMonth();
        const d = dateOfBirth.getDay();
        return `${d}-${m}-${y}`;
      },
  
      formatChildren(children) {
        return children.map((child, index) => {
          return {
            _id: child._id,
            name: child.name,
            gender: child.gender,
            dateOfBirth: this.formatDateOfBirth(child.dateOfBirth),
            address: child.address,
          };
        });
      },
  
      checkCreate(value) {
        // return this.children.filter((child, index) => {
        //   return this.toString[index].includes(value.toLowerCase());
        // });
        for (var child of this.children) {
          if (child.name === value) {
            return true;
          }
        }
        return false;
      },
  
      async getAll() {
        try {
          this.children = await Children.getAll();
        } catch (err) {
          console.log(err);
        }
      },
  
      async refresh() {
        await this.getAll();
      },
  
      async getOne(id) {
        try {
          this.child = await Children.get(id);
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
            "<p>I want to remove child" +
            ' "' +
            '<span class="text-blue-500 text-lg">' +
            this.child.name +
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
            Children.delete(this.deleteValue);
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
  
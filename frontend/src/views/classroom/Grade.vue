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
        :items="formatGrade(setPages)"
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
  <GradeAdd v-if="activeAdd" @cancel="value => activeAdd = value" />
</template>

<script >
import Search from "../../components/forms/Search.vue";
import BAdd from "../../components/buttons/Add.vue";
import Select from "../../components/forms/Select.vue";
import Table from "../../components/Table.vue";
import Pagination from "../../components/Pagination.vue";
import Grade from "../../services/grade.service";
import Swal from "sweetalert2";
import GradeAdd from './GradeAdd.vue';

export default {
  components: {
    Search,
    BAdd,
    Select,
    Table,
    Pagination,
    GradeAdd,
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
      grades: [],
      grade: {},
      fields: ["name", "school year", "note", "classes"],
      labels: ["name", "schoolYear", "note", "classes"],
      actionList: ["Grade.detail"],
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
      return this.grades.map((grade, index) => {
        return [grade.name, grade.note, grade.schoolYear.name, grade.class.length].join("");
      });
    },

    // filter data when searchText change
    filter() {
      return this.grades.filter((grade, index) => {
        return this.toString[index].includes(this.searchText.toLowerCase());
      });
    },

    filtered() {
      if (!this.searchText) {
        this.totalRow = this.grades.length;
        return this.grades;
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

      return this.filtered.filter((grade, index) => {
        return (
          index + 1 > (this.currentPage - 1) * this.entryValue &&
          index + 1 <= this.currentPage * this.entryValue
        );
      });
    },
  },
  methods: {
    formatGrade(grades) {
      return grades.map((grade, index) => {
        return {
          _id: grade._id,
          name: grade.name,
          note: grade.note,
          schoolYear: grade.schoolYear.name,
          classes: grade.class.length
        };
      });
    },

    checkCreate(value) {
      // return this.Grades.filter((Grade, index) => {
      //   return this.toString[index].includes(value.toLowerCase());
      // });
      for (var grade of this.grades) {
        if (grade.name === value) {
          return true;
        }
      }
      return false;
    },

    async getAll() {
      try {
        this.grades = await Grade.getAll();
      } catch (err) {
        console.log(err);
      }
    },

    async refresh() {
      await this.getAll();
      console.log(this.grades);
    },

    async getOne(id) {
      try {
        this.grade = await Grade.get(id);
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
          this.grade.name +
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
          Grade.delete(this.deleteValue);
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

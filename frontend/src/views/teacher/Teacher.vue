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
        :items="formatTeacher(setPages)"
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
  <!-- Add New Teacher -->
  <TeacherAdd v-if="activeAdd" @cancel="(value) => activeAdd = value"/>
</template>

<script>
import Search from "../../components/forms/Search.vue";
import BAdd from "../../components/buttons/Add.vue";
import Select from "../../components/forms/Select.vue";
import Table from "../../components/Table.vue";
import Pagination from "../../components/Pagination.vue";
import Swal from "sweetalert2";
import Teacher from "../../services/teacher.service";
import TeacherAdd from "../../views/teacher/TeacherAdd.vue";

export default {
  components: {
    Search,
    BAdd,
    Select,
    Table,
    Pagination,
    TeacherAdd,
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
      teachers: [],
      formatList: [],
      teacher: {},
      fields: [
        "name",
        "gender",
        "dateOfBirth",
        "phone number",
        "mail",
        "position",
      ],
      labels: ["name", "gender", "dateOfBirth", "phone", "mail", "position"],
      actionList: ["Teacher.detail", "Teacher.edit"],
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
      return this.teachers.map((teacher, index) => {
        const { name } = teacher;
        return [name].join("");
      });
    },

    // filter data when searchText change
    filter() {
      return this.teachers.filter((teacher, index) => {
        return this.toString[index].includes(this.searchText.toLowerCase());
      });
    },

    filtered() {
      if (!this.searchText) {
        this.totalRow = this.teachers.length;
        return this.teachers;
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

      return this.filtered.filter((teacher, index) => {
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

    formatTeacher(teachers) {
      return teachers.map((teacher, index) => {
        return {
          _id: teacher._id,
          name: teacher.name,
          gender: teacher.gender,
          dateOfBirth: this.formatDateOfBirth(teacher.dateOfBirth),
          phone: teacher.phone,
          mail: teacher.mail,
          position: teacher.position.name,
        };
      });
    },

    checkCreate(value) {
      // return this.teachers.filter((teacher, index) => {
      //   return this.toString[index].includes(value.toLowerCase());
      // });
      for (var teacher of this.teachers) {
        if (teacher.name === value) {
          return true;
        }
      }
      return false;
    },

    async getAll() {
      try {
        this.teachers = await Teacher.getAll();
      } catch (err) {
        console.log(err);
      }
    },

    async refresh() {
      await this.getAll();
    },

    async getOne(id) {
      try {
        this.teacher = await Teacher.get(id);
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
          "<p>I want to remove teacher" +
          ' "' +
          '<span class="text-blue-500 text-lg">' +
          this.teacher.name +
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
          Teacher.delete(this.deleteValue);
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

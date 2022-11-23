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
        :items="formatCollectionRates(setPages)"
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
  <CollectionRatesAdd v-if="activeAdd" @cancel="value => activeAdd = value" />
</template>

<script>
import Search from "../../components/forms/Search.vue";
import BAdd from "../../components/buttons/Add.vue";
import Select from "../../components/forms/Select.vue";
import Table from "../../components/Table.vue";
import Pagination from "../../components/Pagination.vue";
import CollectionRates from "../../services/collection-rates.service";
import Swal from "sweetalert2";
import CollectionRatesAdd from './CollectionRatesAdd.vue';

export default {
  components: {
    Search,
    BAdd,
    Select,
    Table,
    Pagination,
    CollectionRatesAdd,
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
      collectionRates: [],
      collectionRate: {},
      fields: [
        "tuition Fees",
        "money",
        "grade",
        "school Year",
        "start date",
        "end date",
      ],
      labels: [
        "tuitionFees",
        "money",
        "grade",
        "schoolYear",
        "startDate",
        "endDate",
      ],
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
    },
  },
  computed: {
    // convert [object] -> [string]
    toString() {
      return this.collectionRates.map((collectionRate, index) => {
        // const { money, startDate, endDate, } = collectionRate;
        return [
          collectionRate.money,
          collectionRate.startDate,
          collectionRate.endDate,
          collectionRate.grade.name,
          collectionRate.grade.schoolYear.name,
          collectionRate.tuitionFees.name
        ].join("");
      });
    },

    // filter data when searchText change
    filter() {
      return this.collectionRates.filter((collectionRate, index) => {
        return this.toString[index].includes(this.searchText.toLowerCase());
      });
    },

    filtered() {
      if (!this.searchText) {
        this.totalRow = this.collectionRates.length;
        return this.collectionRates;
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

      return this.filtered.filter((collectionRate, index) => {
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
      const m = dateOfBirth.getMonth() + 1;
      const d = dateOfBirth.getDate();
      return `${d}-${m}-${y}`;
    },

    formatCash(str) {
      return str
        .split("")
        .reverse()
        .reduce((prev, next, index) => {
          return (index % 3 ? next : next + ",") + prev;
        });
    },

    formatCollectionRates(collectionRates) {
      return collectionRates.map((collectionRate, index) => {
        return {
          _id: collectionRate._id,
          money: this.formatCash(collectionRate.money) + " " + "vnd",
          startDate: this.formatDateOfBirth(collectionRate.startDate),
          endDate: this.formatDateOfBirth(collectionRate.endDate),
          grade: collectionRate.grade.name,
          schoolYear: collectionRate.grade.schoolYear.name,
          tuitionFees: collectionRate.tuitionFees.name,
        };
      });
    },

    checkCreate(value) {
      // return this.collectionRates.filter((collectionRate, index) => {
      //   return this.toString[index].includes(value.toLowerCase());
      // });
      for (var collectionRate of this.collectionRates) {
        if (collectionRate.name === value) {
          return true;
        }
      }
      return false;
    },

    async getAll() {
      try {
        this.collectionRates = await CollectionRates.getAll();
      } catch (err) {
        console.log(err);
      }
    },

    async refresh() {
      await this.getAll();
      console.log(this.collectionRates);
    },

    async getOne(id) {
      try {
        this.collectionRate = await CollectionRates.get(id);
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
          this.collectionRate.name +
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
          CollectionRates.delete(this.deleteValue);
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

<template>
  <!-- <div class="w-full bg-slate-800 mb-4">
    <div class="flex py-2 w-full">
      <div class="flex flex-col w-full mr-10 ml-2">
        <span class="text-white text-sm">Height</span>
        <input
          type="text"
          name=""
          id=""
          v-model="heightValue"
          placeholder="Enter height (cm)"
          class="w-full p-2 bg-inherit border border-solid border-violet-500 rounded-md text-white"
        />
      </div>
      <div class="flex flex-col w-full mr-10">
        <span class="text-white text-sm">Weight</span>
        <input
          type="text"
          name=""
          id=""
          v-model="weightValue"
          placeholder="Enter weight (kg)"
          class="w-full p-2 bg-inherit border border-solid border-violet-500 rounded-md text-white"
        />
      </div>
      <div class="flex flex-col w-full mr-10">
        <span class="text-white text-sm">Health</span>
        <input
          type="text"
          name=""
          id=""
          v-model="healthValue"
          placeholder=""
          class="w-full p-2 bg-inherit border border-solid border-violet-500 rounded-md text-white"
        />
      </div>
      <div class="flex flex-col w-full mr-2">
        <span class="text-white text-sm">Number of Roses</span>
        <Select
          :options="listRoses"
          :modelValue="roseValue"
          v-model="roseValue"
          class="w-full p-2"
        />
      </div>
    </div>
  </div> -->
  <Form>
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
            <!-- ! -->
            <span class="flex items-center text-white text-sm ml-24"
              >Month</span
            >
            <Select
              :options="listMonth"
              :modelValue="monthValue"
              v-model="monthValue"
              class="w-20 mx-2"
            />
          </div>
          <div class="flex justify-between w-7/12">
            <Search v-model="searchText" class="w-full" />
          </div>
        </div>
        <!-- ! -->
        <div class="flex mb-4 justify-end mx-2 text-white">
          <span
            class="py-2 px-6 border border-solid border-blue-500 rounded-md mx-10 cursor-pointer hover:bg-blue-500"
            ><router-link :to="{ name: 'Class.addCDI', params: { id: id } }"
              >Add</router-link
            ></span
          >
          <span
            class="py-2 px-6 border border-solid border-yellow-500 rounded-md cursor-pointer hover:bg-yellow-500"
            >Edit</span
          >
        </div>
        <!-- !Table -->
        <table class="border-collapse table-auto w-full">
          <thead>
            <tr
              class="text-white border border-solid border-violet-400 border-l-0 border-r-0 uppercase text-base bg-slate-900"
            >
              <th class="p-2"><span class="float-left">#</span></th>
              <th class="p-2"><span class="float-left">Name</span></th>
              <th class="p-2"><span class="float-left">Month</span></th>
              <th class="p-2"><span class="float-left">Height(cm)</span></th>
              <th class="p-2"><span class="float-left">weight(kg)</span></th>
              <th class="p-2"><span class="float-left">Health</span></th>
              <th class="p-2">
                <span class="float-left">Number of Roses</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="text-white border border-solid border-violet-400 border-l-0 border-r-0 text-base lowercase"
              v-for="(value, index) in setPages"
              :key="index"
            >
              <td class="p-2 float-left text-blue-500">
                #{{ sliceID(value.childId, index) }}
              </td>
              <td class="p-2">
                <span>{{ value.childName }}</span>
              </td>
              <td class="p-2">
                <span>{{ value.month }}</span>
              </td>
              <td class="p-2">
                <span>{{ value.height }}</span>
              </td>
              <td class="p-2">
                <span>{{ value.weight }}</span>
              </td>
              <td class="p-2">
                <span>{{ value.health }}</span>
              </td>
              <td class="p-2">
                <span>{{ value.numberOfRoses }}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- !End Table -->
        <Pagination
          :numberOfPages="numberOfPages"
          :totalRow="totalRow"
          :startRow="startRow"
          :endRow="endRow"
          v-model:currentPage="currentPage"
        />{{ roseValue }}
      </div>
    </div>
  </Form>
</template>

<script>
import Search from "../../../components/forms/Search.vue";
import BAdd from "../../../components/buttons/Add.vue";
import Select from "../../../components/forms/Select.vue";
import Table from "../../../components/Table.vue";
import Pagination from "../../../components/Pagination.vue";
import CDI from "../../../services/cdi.service";
import Swal from "sweetalert2";
import classService from "../../../services/class.service";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    Search,
    BAdd,
    Select,
    Table,
    Pagination,
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    cdi_s: {
      type: Array,
      default: [],
    },
    id: {
      type: String,
      required: true,
    },
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
      cdiList: [],
      cdi_es: [],
      cdi: {},
      fields: [
        "name",
        "month",
        "class name",
        "height",
        "weight",
        "health",
        "number of roses",
      ],
      labels: [
        "name",
        "month",
        "class",
        "height",
        "weight",
        "health",
        "numberOfRoses",
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
      monthValue: new Date().getMonth() + 1,
      listMonth: [
        {
          _id: 1,
          name: 1,
        },
        {
          _id: 2,
          name: 2,
        },
        {
          _id: 3,
          name: 3,
        },
        {
          _id: 4,
          name: 4,
        },
        {
          _id: 5,
          name: 5,
        },
        {
          _id: 6,
          name: 6,
        },
        {
          _id: 7,
          name: 7,
        },
        {
          _id: 8,
          name: 8,
        },
        {
          _id: 9,
          name: 9,
        },
        {
          _id: 10,
          name: 10,
        },
        {
          _id: 11,
          name: 11,
        },
        {
          _id: 12,
          name: 12,
        },
      ],
      classList: [],
      childrenList: [],
      cdiObject: {},
      cdiList: [],
      cdiOfClass: [],
    };
  },
  watch: {
    searchText() {
      this.currentPage = 1;
    },
    async monthValue() {
      await this.getClass();
    },
  },
  computed: {
    // convert [object] -> [string]
    toString() {
      return this.cdiList.map((cdi, index) => {
        return [
          cdi.height,
          cdi.weight,
          cdi.health,
          cdi.numberOfRoses,
          // cdi.month,
          cdi.childName,
          // cdi.childId,
        ].join("");
      });
    },

    // filter data when searchText change
    filter() {
      return this.cdiList.filter((cdi, index) => {
        return this.toString[index].includes(this.searchText.toLowerCase());
      });
    },

    filtered() {
      if (!this.searchText) {
        this.totalRow = this.cdiList.length;
        return this.cdiList;
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
    sliceID(id, index) {
      return id.substring(18, 22).concat(index);
    },
    async getClass() {
      try {
        this.classList = await classService.get(this.id);
        this.getChildren();
        this.getAllCDI();
        this.getCdiList();
      } catch (error) {
        console.log(error);
      }
    },

    getChildren() {
      this.childrenList = this.classList.children;
    },

    async getCDI(id) {
      try {
        this.cdiObject = await CDI.get(id);
      } catch (error) {
        console.log(error);
      }
    },

    getAllCDI() {
      try {
        this.cdiOfClass = this.classList.cdi;
      } catch (error) {}
    },

    getCdiList() {
      this.cdiList = this.childrenList.map((value, index) => {
        for (var cdi of this.cdiOfClass) {
          if (
            cdi.child == value._id &&
            Math.ceil(cdi.month.name) == this.monthValue
          ) {
            return {
              classId: this.id,
              childName: value.name,
              childId: value._id,
              month: this.monthValue,
              height: cdi.height,
              weight: cdi.weight,
              health: cdi.health,
              numberOfRoses: cdi.numberOfRoses,
            };
          }
        }
        return {
          classId: this.id,
          childName: value.name,
          childId: value._id,
          month: this.monthValue,
          height: 0,
          weight: 0,
          health: "normal",
          numberOfRoses: 0,
        };
      });
    },
  },
  async created() {
    this.getClass();
  },
};
</script>

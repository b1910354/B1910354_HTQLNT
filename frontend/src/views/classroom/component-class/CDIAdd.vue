<template>
  <div class="my-6 bg-slate-800">
    <div class="flex flex-row justify-between py-4 px-2">
      <div v-if="activeAdd == 1" class="text-white text-xl flex items-center">
        Add Children
      </div>
      <div v-if="active == 1" class="text-white text-xl flex items-center">
        Add Child Development Index
      </div>
      <div v-if="active == 2" class="text-white text-xl flex items-center">
        Edit Child Development Index
      </div>
      <div class="flex">
        <div
          @click="activeAdd = 1"
          :class="[activeAdd == 1 ? 'bg-violet-500' : '']"
          class="py-2 px-5 border border-solid text-white border-violet-500 cursor-pointer hover:bg-violet-500"
        >
          <router-link :to="{ name: 'Class.addChildren', params: { id: id } }"
            >Children</router-link
          >
        </div>
        <div
          @click="activeAdd = 2"
          :class="[activeAdd == 2 ? 'bg-violet-500' : '']"
          class="py-2 px-5 border border-solid text-white border-violet-500 cursor-pointer hover:bg-violet-500"
        >
          Child Development Index
        </div>
      </div>
    </div>
    <!-- ! -->
    <div v-if="active == 1 || active == 2" class="flex justify-between">
      <div class="flex">
        <span class="text-white text-sm flex items-center ml-2">Show</span>
        <Select
          :options="listEntries"
          :modelValue="entryValue"
          v-model="entryValue"
          class="w-20 mx-2"
        />
        <span class="text-white text-sm flex items-center">entries</span>
      </div>
      <div class="flex mx-10">
        <span class="text-sm text-white flex items-center mx-2">Month</span>
        <Select
          :options="listMonth"
          :modelValue="monthValue"
          v-model="monthValue_id"
          class="w-40"
        />
      </div>
      <Search class="flex-1 mx-2" v-model="searchText" />
    </div>
    <div class="flex mt-6 items-start rounded-md">
      <!-- ! Add Many -->
      <table
        v-if="active == 1"
        class="border-collapse table-fixed w-9/12 ml-2 rounded-md"
      >
        <thead>
          <tr
            class="text-white border border-solid border-violet-400 uppercase text-base bg-slate-900"
          >
            <th class="p-2 w-10">&emsp;</th>
            <th class="p-2"><span class="float-left">Name</span></th>
            <th class="p-2"><span class="float-left">Height(cm)</span></th>
            <th class="p-2"><span class="float-left">weight(kg)</span></th>
            <th class="p-2"><span class="float-left">Health</span></th>
            <th class="p-2">
              <span class="float-left">Roses</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value, index) in setPages"
            :key="index"
            class="text-white border border-solid border-violet-400 text-base lowercase"
          >
            <td class="p-2">
              <input
                type="checkbox"
                class="checked:bg-blue-500"
              />
            </td>
            <td class="p-2">
              <span>{{ value.childName }}</span>
            </td>
            <td class="p-2">
              <span v-if="value.height">{{ value.height }}</span>
              <input
                v-if="!value.height"
                type="text"
                class="w-20 py-1 px-2 bg-inherit text-white border border-solid border-green-500 rounded-md"
                v-model="newValue[index].height"
              />
              <div v-if="!value.height" class="">
                <p
                  v-if="checkHeight(newValue[index].height)"
                  class="text-sm text-green-500 mt-1"
                >
                  invalid!
                </p>
              </div>
            </td>
            <td class="p-2">
              <span v-if="value.weight">{{ value.weight }}</span>
              <input
                v-if="!value.weight"
                type="text"
                class="w-20 py-1 px-2 bg-inherit text-white border border-solid border-green-500 rounded-md"
                v-model="newValue[index].weight"
              />
              <div v-if="!value.weight" class="">
                <p
                  v-if="checkWeight(newValue[index].weight)"
                  class="text-sm text-green-500 mt-1"
                >
                  invalid!
                </p>
              </div>
            </td>
            <td class="p-2">
              <span v-if="value.health">{{ value.health }}</span>
              <input
                v-if="!value.health"
                type="text"
                class="w-full py-1 px-2 bg-inherit text-white border border-solid border-green-500 rounded-md"
                v-model="newValue[index].health"
              />
              <div class="" v-if="!value.health">
                <p
                  v-if="checkHealth(newValue[index].health)"
                  class="text-sm text-green-500 mt-1"
                >
                  invalid!
                </p>
              </div>
            </td>
            <td class="p-2">
              <span v-if="value.numberOfRoses">{{ value.numberOfRoses }}</span>
              <input
                v-if="!value.numberOfRoses"
                type="text"
                class="w-20 py-1 px-2 bg-inherit text-white border border-solid border-green-500 rounded-md"
                v-model="newValue[index].numberOfRoses"
              />
              <div v-if="!value.numberOfRoses" class="">
                <p
                  v-if="checkRoses(newValue[index].numberOfRoses)"
                  class="text-sm text-green-500 mt-1"
                >
                  invalid!
                </p>
              </div>
            </td>
          </tr>
          <!-- ! -->
          <tr
            v-if="setPages.length == 0"
            class="text-white border border-solid border-violet-400 text-base lowercase"
          >
            <td colspan="6" class="text-white text-lg text-center py-4">
              No matching records found
            </td>
          </tr>
          <!-- ! -->
          <tr
            v-if="setPages.length != 0"
            class="text-white border border-solid border-violet-400 text-base lowercase"
          >
            <td colspan="6" class="text-white text-lg text-center py-4">
              <button
                @click="addCDI"
                type="submit"
                class="bg-green-500 rounded-md py-2 px-4 hover:bg-green-700"
              >
                Add
              </button>
            </td>
          </tr>
          <!-- ! -->
          <tr>
            <td colspan="6">
              <Pagination
                :numberOfPages="numberOfPages"
                :totalRow="totalRow"
                :startRow="startRow"
                :endRow="endRow"
                v-model:currentPage="currentPage"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <!-- ! Edit -->
      <table
        v-if="active == 2"
        class="border-collapse table-fixed w-9/12 ml-2 rounded-md"
      >
        <thead>
          <tr
            class="text-white border border-solid border-violet-400 uppercase text-base bg-slate-900"
          >
            <th class="p-2 w-10">&emsp;</th>
            <th class="p-2"><span class="float-left">Name</span></th>
            <th class="p-2"><span class="float-left">Height(cm)</span></th>
            <th class="p-2"><span class="float-left">weight(kg)</span></th>
            <th class="p-2"><span class="float-left">Health</span></th>
            <th class="p-2">
              <span class="float-left">Roses</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value, index) in setPages"
            :key="index"
            class="text-white border border-solid border-violet-400 text-base lowercase"
          >
            <td class="p-2">
              <input
                type="checkbox"
                class="checked:bg-blue-500 bg-blue-500 focus:bg-blue-500"
              />
            </td>
            <td class="p-2">
              <span>{{ value.childName }}</span>
            </td>
            <td class="p-2">
              <span v-if="!value.height">{{ value.height }}</span>
              <input
                v-if="value.height"
                type="text"
                class="w-20 py-1 px-2 bg-inherit text-white border border-solid border-yellow-500 rounded-md"
                :placeholder="cdiList[index].height"
                @input="
                  (event) => (newValue[index].height = event.target.value)
                "
                @click="activeValid[index].activeHeight = index"
              />
              <div v-if="value.height" class="">
                <p
                  v-if="
                    checkHeight(newValue[index].height) &&
                    activeValid[index].activeHeight == index
                  "
                  class="text-sm text-yellow-500 mt-1"
                >
                  invalid!
                </p>
              </div>
            </td>
            <td class="p-2">
              <span v-if="!value.weight">{{ value.weight }}</span>
              <input
                v-if="value.weight"
                type="text"
                class="w-20 py-1 px-2 bg-inherit text-white border border-solid border-yellow-500 rounded-md"
                :placeholder="cdiList[index].weight"
                @input="
                  (event) => (newValue[index].weight = event.target.value)
                "
                @click="activeValid[index].activeWeight = index"
              />
              <div v-if="value.weight" class="">
                <p
                  v-if="
                    checkWeight(newValue[index].weight) &&
                    activeValid[index].activeWeight == index
                  "
                  class="text-sm text-yellow-500 mt-1"
                >
                  invalid!
                </p>
              </div>
            </td>
            <td class="p-2">
              <span v-if="!value.health">{{ value.health }}</span>
              <input
                v-if="value.health"
                type="text"
                class="w-full py-1 px-2 bg-inherit text-white border border-solid border-yellow-500 rounded-md"
                :placeholder="cdiList[index].health"
                @input="
                  (event) => (newValue[index].health = event.target.value)
                "
                @click="activeValid[index].activeHealth = index"
              />
              <div class="" v-if="value.health">
                <p
                  v-if="
                    checkHealth(newValue[index].health) &&
                    activeValid[index].activeHealth == index
                  "
                  class="text-sm text-yellow-500 mt-1"
                >
                  invalid!
                </p>
              </div>
            </td>
            <td class="p-2">
              <span v-if="!value.numberOfRoses">{{ value.numberOfRoses }}</span>
              <input
                v-if="value.numberOfRoses"
                type="text"
                class="w-20 py-1 px-2 bg-inherit text-white border border-solid border-yellow-500 rounded-md"
                :placeholder="cdiList[index].numberOfRoses"
                @input="
                  (event) =>
                    (newValue[index].numberOfRoses = event.target.value)
                "
                @click="activeValid[index].activeRoses = index"
              />
              <div v-if="value.numberOfRoses" class="">
                <p
                  v-if="
                    checkRoses(newValue[index].numberOfRoses) &&
                    activeValid[index].activeRoses == index
                  "
                  class="text-sm text-yellow-500 mt-1"
                >
                  invalid!
                </p>
              </div>
            </td>
          </tr>
          <!-- ! -->
          <tr
            v-if="setPages.length == 0"
            class="text-white border border-solid border-violet-400 text-base lowercase"
          >
            <td colspan="6" class="text-white text-lg text-center py-4">
              No matching records found
            </td>
          </tr>
          <!-- ! -->
          <tr
            v-if="setPages.length != 0"
            class="text-white border border-solid border-violet-400 text-base lowercase"
          >
            <td colspan="6" class="text-white text-lg text-center py-4">
              <button
                @click="editCDI"
                type="submit"
                class="bg-yellow-500 rounded-md py-2 px-4 hover:bg-yellow-700"
              >
                Edit
              </button>
            </td>
          </tr>
          <!-- ! -->
          <tr>
            <td colspan="6">
              <Pagination
                :numberOfPages="numberOfPages"
                :totalRow="totalRow"
                :startRow="startRow"
                :endRow="endRow"
                v-model:currentPage="currentPage"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="flex flex-col flex-1 bg-slate-400 mx-8 justify-start items-center text-black rounded-md mb-4"
      >
        <div
          :class="[active == 1 ? 'bg-blue-700 text-white' : '']"
          @click="active = 1"
          class="my-4 w-40 h-10 rounded-md border-2 border-solid border-blue-700 flex items-center justify-center hover:bg-blue-700 hover:text-white cursor-pointer"
        >
          Add
        </div>
        <div
          :class="[active == 2 ? 'bg-blue-700 text-white' : '']"
          @click="active = 2"
          class="mb-4 w-40 h-10 rounded-md border-2 border-solid border-blue-700 flex items-center justify-center hover:bg-blue-700 hover:text-white cursor-pointer"
        >
          Edit
        </div>
        <div
          :class="[active == 4 ? 'bg-violet-500 text-white' : '']"
          @click="
            [
              (active = 4),
              $router.push({ name: 'Class.detail', params: { id: id } }),
            ]
          "
          class="mb-4 w-40 h-10 rounded-md border-2 border-solid border-violet-500 flex items-center justify-center hover:bg-violet-500 hover:text-white cursor-pointer"
        >
          List of Class
        </div>
      </div>
    </div>
    <!-- ! -->
  </div>
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
import Month from "../../../services/month.service";

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
      activeAdd: 2,
      monthValue: new Date().getMonth() + 1,
      monthValue_id: "",
      listMonth: [],
      classList: [],
      childrenList: [],
      cdiObject: {},
      cdiList: [],
      cdiOfClass: [],
      active: 1,
      newValue: [],
      currentValue: [],
      activeValid: [],
    };
  },
  watch: {
    searchText() {
      this.currentPage = 1;
    },
    async monthValue_id() {
      await this.getClass();
      this.newValue = this.childrenList.map((value, index) => {
        return {
          classId: this.id,
          childName: value.name,
          childId: value._id,
          month: this.monthValue,
          height: 0,
          weight: 0,
          health: "",
          numberOfRoses: 0,
        };
      });
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
      this.activeValid = this.childrenList.map((value, index) => {
        return {
          activeHeight: -1,
          activeWeight: -1,
          activeHealth: -1,
          activeRoses: -1,
        };
      });
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
          console.log(cdi.month._id);
          console.log(this.monthValue_id);
          if (cdi.child == value._id && cdi.month._id == this.monthValue_id) {
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
          health: "",
          numberOfRoses: 0,
        };
      });
    },

    async getMonth() {
      try {
        this.listMonth = await Month.getAll();
        for (var value of this.listMonth) {
          if (Math.ceil(value.name) - Math.ceil(this.monthValue) == 0) {
            this.monthValue_id = value._id;
            break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    checkHeight(value) {
      if (value - 1 > 50 && value - 1 < 150) return false;
      return true;
    },

    checkWeight(value) {
      if (value - 1 > 10 && value - 1 < 100) return false;
      return true;
    },

    checkRoses(value) {
      if (value - 1 < 5 && value - 1 >= 0) return false;
      return true;
    },

    checkHealth(value) {
      if (value - 1 >= 0 || value - 1 <= 0 || value.length <= 2 || value == "")
        return true;
      return false;
    },

    async addCDI() {
      console.log("start");
      for (var value of this.newValue) {
        var check = true;
        for (var cdi of this.cdiOfClass) {
          if (
            value.childId == cdi.child &&
            this.monthValue_id == cdi.month._id
          ) {
            check = false;
          }
        }
        if (check) {
          var body = {
            month: this.monthValue_id,
            child: value.childId,
            class: this.id,
            height: value.height,
            weight: value.weight,
            numberOfRoses: value.numberOfRoses,
            health: value.health,
          };
          if (
            body.height != 0 &&
            body.weight != 0 &&
            body.numberOfRoses != 0 &&
            body.health != ""
          ) {
            try {
              await CDI.create(body);
              Swal.fire({
                background: this.background,
                color: "white",
                text: "Successfully",
                icon: "success",
                timer: 2000,
              });
              //   this.$forceUpdate();
            } catch (err) {
              console.log(err);
            }
          }
        }
      }
      //   this.monthValue = 3;
      await this.getClass();
      this.newValue = this.childrenList.map((value, index) => {
        return {
          classId: this.id,
          childName: value.name,
          childId: value._id,
          month: this.monthValue,
          height: 0,
          weight: 0,
          health: "",
          numberOfRoses: 0,
        };
      });
    },

    async editCDI() {
      console.log("start");
      for (var value of this.newValue) {
        var check = false;
        for (var cdi of this.cdiOfClass) {
          if (
            value.childId == cdi.child &&
            this.monthValue_id == cdi.month._id
          ) {
            check = true;
          }
        }

        if (check) {
          var body = {
            month: this.monthValue_id,
            child: value.childId,
            class: this.id,
            height: value.height,
            weight: value.weight,
            numberOfRoses: value.numberOfRoses,
            health: value.health,
          };

          for (var cdi_ of this.cdiList) {
            if (body.height == 0 && body.child == cdi_.childId) {
              body.height = cdi_.height;
            }
            if (body.weight == 0 && body.child == cdi_.childId) {
              body.weight = cdi_.weight;
            }
            if (body.health == "" && body.child == cdi_.childId) {
              body.health = cdi_.health;
            }
            if (body.numberOfRoses == 0 && body.child == cdi_.childId) {
              body.numberOfRoses = cdi_.numberOfRoses;
            }
          }

          try {
            await CDI.update(body);
            Swal.fire({
              background: this.background,
              color: "white",
              text: "Successfully",
              icon: "success",
              timer: 2000,
            });
            //   this.$forceUpdate();
          } catch (err) {
            console.log(err);
          }
        }
      }

      await this.getClass();
      this.newValue = this.childrenList.map((value, index) => {
        return {
          classId: this.id,
          childName: value.name,
          childId: value._id,
          month: this.monthValue,
          height: 0,
          weight: 0,
          health: "",
          numberOfRoses: 0,
        };
      });
    },
  },
  async created() {
    await this.getClass();
    await this.getMonth();
    this.newValue = this.cdiList;
    this.currentValue = this.cdiList;
  },
};
</script>

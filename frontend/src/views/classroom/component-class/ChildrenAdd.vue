<template>
  <Form @submit="onSubmit">
    <div class="my-6 bg-slate-800">
      <div class="flex flex-row justify-between py-4 px-2">
        <div v-if="activeAdd == 1" class="text-white text-xl flex items-center">
          Add Children
        </div>
        <div v-if="activeAdd == 2" class="text-white text-xl flex items-center">
          Add Child Development Index
        </div>
        <div class="flex">
          <div
            @click="activeAdd = 1"
            :class="[activeAdd == 1 ? 'bg-violet-500' : '']"
            class="py-2 px-5 border border-solid text-white border-violet-500 cursor-pointer hover:bg-violet-500"
          >
            Children
          </div>
          <div
            @click="activeAdd = 2"
            :class="[activeAdd == 2 ? 'bg-violet-500' : '']"
            class="py-2 px-5 border border-solid text-white border-violet-500 cursor-pointer hover:bg-violet-500"
          >
            <router-link :to="{name: 'Class.addCDI', params: {id: id}}">Child Development Index</router-link>
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
        <Select
          :options="listAge"
          :modelValue="ageValue"
          v-model="ageValue_id"
          class="w-40 ml-10 mr-10"
        />
        <Search class="flex-1 mx-2" v-model="searchText" />
      </div>
      <div class="flex mt-6 items-start rounded-md">
        <!--! Add one -->
        <table
          v-if="active == 1"
          class="border-collapse table-fixed w-9/12 ml-2 rounded-md"
        >
          <thead>
            <tr
              class="text-white border border-solid border-violet-400 uppercase text-base bg-slate-900"
            >
              <th class="p-2 w-20">#</th>
              <th class="p-2"><span class="float-left">Children Name</span></th>
              <th class="p-2"><span class="float-left">Gender</span></th>
              <th class="p-2"><span class="float-left">Age</span></th>
              <th class="p-2"><span class="float-left">Address</span></th>
              <th class="p-2 w-28">
                <span class="float-left">Add Child</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(value, index) in setPages"
              :key="index"
              class="text-white border border-solid border-violet-400 text-base lowercase"
            >
              <td class="p-2 text-blue-500">
                #{{ sliceID(value._id, index) }}
              </td>
              <td class="p-2">{{ value.name }}</td>
              <td class="p-2">{{ value.gender ? "male" : "female" }}</td>
              <td class="p-2">
                {{
                  Math.ceil(new Date().getFullYear()) -
                  Math.ceil(new Date(value.dateOfBirth).getFullYear())
                }}
              </td>
              <td class="p-2">{{ value.address }}</td>
              <td class="p-2">
                <span
                  @click="[(addChild_id = value._id), $emit('refresh', true)]"
                  class="material-symbols-outlined cursor-pointer hover:text-yellow-500 flex items-center w-8"
                >
                  add_box
                </span>
              </td>
            </tr>
            <tr
              v-if="setPages.length == 0"
              class="text-white border border-solid border-violet-400 text-base lowercase"
            >
              <td colspan="6" class="text-white text-lg text-center py-4">
                No matching records found
              </td>
            </tr>
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
        <!-- ! Add Many -->
        <table
          v-if="active == 2"
          class="border-collapse table-fixed w-9/12 ml-2 rounded-md"
        >
          <thead>
            <tr
              class="text-white border border-solid border-violet-400 uppercase text-base bg-slate-900"
            >
              <th class="p-2 w-10">&emsp;</th>
              <th class="p-2"><span class="float-left">Children Name</span></th>
              <th class="p-2"><span class="float-left">Gender</span></th>
              <th class="p-2"><span class="float-left">Age</span></th>
              <th class="p-2"><span class="float-left">Address</span></th>
              <th class="p-2 w-28">
                <span class="float-left">Add Child</span>
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
                <Field
                  type="checkbox"
                  :name="`${value._id}`"
                  :id="`${value._id}`"
                  :value="`${value._id}`"
                />
              </td>
              <td class="p-2">{{ value.name }}</td>
              <td class="p-2">{{ value.gender ? "male" : "female" }}</td>
              <td class="p-2">
                {{
                  Math.ceil(new Date().getFullYear()) -
                  Math.ceil(new Date(value.dateOfBirth).getFullYear())
                }}
              </td>
              <td class="p-2">{{ value.address }}</td>
              <td class="p-2">
                <span
                  @click="[(addChild_id = value._id), $emit('refresh', true)]"
                  class="material-symbols-outlined cursor-pointer hover:text-yellow-500 flex items-center w-8"
                >
                  add_box
                </span>
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
        <!-- ! Add auto -->
        <div
          v-if="active == 3"
          class="w-9/12 ml-2 rounded-md border border-solid border-violet-500 mb-4"
        >
          <!-- ! -->
          <div class="my-4 mx-4 flex justify-between">
            <label
              for="className"
              class="text-white text-md mr-10 flex items-center"
              >Class Name</label
            >
            <Field
              disabled
              :value="`${classObject.name}`"
              name="className"
              type="text"
              placeholder=""
              class="w-2/4 text-white bg-inherit border border-solid border-violet-500 p-2 rounded-md placeholder:text-slate-500"
            />
          </div>
          <!-- ! -->
          <div class="my-4 mx-4 flex justify-between">
            <label
              for="maximumNumber"
              class="text-white text-md mr-10 flex items-center"
              >Maximum Number of Classroom</label
            >
            <div class="flex flex-col w-2/4">
              <Field
                name="maximumNumber"
                type="text"
                v-model="AddAutoInfo.maximumNumber"
                placeholder="Enter maximum number of Classroom"
                class="w-full text-white bg-inherit border border-solid border-violet-500 p-2 rounded-md placeholder:text-slate-500"
              />
              <p
                v-if="AddAutoInfo.maximumNumber == 0"
                class="text-red-500 mt-1"
              >
                Maximum number of classroom must have valid!
              </p>
              <p
                v-if="
                  AddAutoInfo.maximumNumber != 0 &&
                  classLength >= AddAutoInfo.maximumNumber
                "
                class="text-red-500 mt-1"
              >
                Maximum number of classroom must have valid more than
                {{ classLength }}!
              </p>
            </div>
          </div>
          <!-- ! -->
          <div class="my-4 mx-4 flex justify-between">
            <label
              for="number"
              class="text-white text-md mr-10 flex items-center"
              >Number of Children</label
            >
            <div class="flex flex-col w-2/4">
              <Field
                name="number"
                type="text"
                v-model="AddAutoInfo.number"
                placeholder="Enter number of Classroom"
                class="w-full text-white bg-inherit border border-solid border-violet-500 p-2 rounded-md placeholder:text-slate-500"
              />
              <p
                v-if="
                  AddAutoInfo.number != 0 && classLength >= AddAutoInfo.number
                "
                class="text-red-500 mt-1"
              >
                Number of classroom must have valid more than {{ classLength }}!
              </p>
            </div>
          </div>
          <!-- ! -->
          <div class="my-4 mx-4 flex justify-between">
            <label for="" class="text-white text-md mr-10 flex items-center"
              >Age of children</label
            >
            <div class="flex flex-col w-2/4">
              <Select
                class="w-full p-2"
                :options="listAge"
                :modelValue="ageValue"
                v-model="AddAutoInfo.age"
              />
              <p v-if="AddAutoInfo.age == 0" class="text-red-500 mt-1">
                Age must have valid!
              </p>
            </div>
          </div>
          <div class="flex justify-end my-4 mx-4">
            <span
              @click="AddAuto"
              class="py-2 px-6 bg-green-500 rounded-md hover:bg-green-700 cursor-pointer text-white"
              >Add</span
            >
          </div>
        </div>
        <!-- ! -->
        <div
          class="flex flex-col flex-1 bg-slate-400 mx-8 justify-start items-center text-black rounded-md mb-4"
        >
          <div
            :class="[active == 1 ? 'bg-blue-700 text-white' : '']"
            @click="active = 1"
            class="my-4 w-40 h-10 rounded-md border-2 border-solid border-blue-700 flex items-center justify-center hover:bg-blue-700 hover:text-white cursor-pointer"
          >
            Add One
          </div>
          <div
            :class="[active == 2 ? 'bg-blue-700 text-white' : '']"
            @click="active = 2"
            class="mb-4 w-40 h-10 rounded-md border-2 border-solid border-blue-700 flex items-center justify-center hover:bg-blue-700 hover:text-white cursor-pointer"
          >
            Add Many
          </div>
          <div
            :class="[active == 3 ? 'bg-blue-700 text-white' : '']"
            @click="active = 3"
            class="mb-4 w-40 h-10 rounded-md border-2 border-solid border-blue-700 flex items-center justify-center hover:bg-blue-700 hover:text-white cursor-pointer"
          >
            Add Auto
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
  </Form>
</template>

<script>
import Children from "../../../services/children.service";
import Classes from "../../../services/class.service";
import Search from "../../../components/forms/Search.vue";
import BAdd from "../../../components/buttons/Add.vue";
import Select from "../../../components/forms/Select.vue";
import Pagination from "../../../components/Pagination.vue";
import Swal from "sweetalert2";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    Search,
    BAdd,
    Select,
    Pagination,
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    activeAdd: {
      type: Number,
      default: 1,
    },
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      children: [],
      childrenNoClass: [],
      classInfo: {},
      active: 1,
      addChild_id: "",
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
      listAge: [
        {
          _id: new Date().getFullYear() - 5,
          name: "5 years old",
        },
        {
          _id: new Date().getFullYear() - 4,
          name: "4 years old",
        },
        {
          _id: new Date().getFullYear() - 3,
          name: "3 years old",
        },
      ],
      ageValue: "Select age",
      ageValue_id: 0,
      ageValue_id_auto: 0,
      ageValue_auto: "Select age",
      numberOfPages: 1,
      totalRow: 0,
      endRow: 0,
      startRow: 0,
      currentPage: 1,
      classObject: {},
      background: "rgb(71 55 133 / var(--tw-bg-opacity))",
      AddAutoInfo: {
        maximumNumber: 0,
        number: 0,
        age: 0,
      },
      classLength: 0,
    };
  },
  watch: {
    async addChild_id() {
      const option = Swal.fire({
        background: this.background,
        color: "white",
        icon: "warning",
        html:
          "<p>Are you sure ?" ,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Ok",
        confirmButtonColor: "green",
        reverseButtons: true,
      });

      if ((await option).isConfirmed) {
        await this.addChild(this.addChild_id);
        Swal.fire({
          background: this.background,
          color: "white",
          text: "Successfully",
          icon: "success",
          timer: 2000,
        });

        await this.getAllChildren();
        this.$router.push({ name: "Class.detail", params: { id: this.id } });
      }
    },
    searchText() {
      this.currentPage = 1;
    },
    async ageValue_id() {
      await this.getAllChildren();
    },
  },
  computed: {
    // convert [object] -> [string]
    toString() {
      return this.childrenNoClass.map((child, index) => {
        return [
          child.name,
          child.gender,
          child.dateOfBirth,
          child.address,
        ].join("");
      });
    },
    // filter data when searchText change
    filter() {
      return this.childrenNoClass.filter((child, index) => {
        return this.toString[index].includes(this.searchText.toLowerCase());
      });
    },
    filtered() {
      if (!this.searchText) {
        this.totalRow = this.childrenNoClass.length;
        return this.childrenNoClass;
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
    sliceID(id, index) {
      return id.substring(18, 22).concat(index);
    },
    async getAllChildren() {
      try {
        this.children = await Children.getAll();
        this.classInfo = await Classes.get(this.id);
        this.childrenNoClass = this.children.filter((value, index) => {
          var age = Math.ceil(new Date(value.dateOfBirth).getFullYear());
          if (age == this.ageValue_id) {
            if (value.class.length == 0) return true;
            if (value.class.length == 3) return false;
            if (value.class.length == 1 || value.class.length == 2) {
              for (var class_s of value.class) {
                if (
                  class_s.grade.schoolYear.name ==
                  this.classInfo.grade.schoolYear.name
                ) {
                  return false;
                }
              }
            }
            return true;
          }

          if (this.ageValue_id == 0) {
            if (value.class.length == 0) return true;
            if (value.class.length == 3) return false;
            if (value.class.length == 1 || value.class.length == 2) {
              for (var class_s of value.class) {
                if (
                  class_s.grade.schoolYear.name ==
                  this.classInfo.grade.schoolYear.name
                ) {
                  return false;
                }
              }
            }
            return true;
          }
        });
      } catch (error) {
        console.log(error);
      }
    },

    async addChild(id) {
      try {
        await Classes.addChild(this.id, { child: id });
      } catch (error) {
        console.log(error);
      }
    },

    async onSubmit(values) {
      var children = JSON.stringify(values, null, 2);
      children = JSON.parse(children);
      var obj = children;

      const option = Swal.fire({
        background: this.background,
        color: "white",
        icon: "warning",
        html:
          "<p>Are you sure ?",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Ok",
        confirmButtonColor: "green",
        reverseButtons: true,
      });

      if ((await option).isConfirmed) {
        for (const key of Object.keys(obj)) {
          await this.addChild(key);
        }
        Swal.fire({
          background: this.background,
          color: "white",
          text: "Successfully",
          icon: "success",
          timer: 2000,
        });

        await this.getAllChildren();
        this.$router.push({ name: "Class.detail", params: { id: this.id } });
      }
    },

    async getClass() {
      try {
        this.classObject = await Classes.get(this.id);
        this.classLength = this.classObject.children.length;
      } catch (err) {
        console.log(err);
      }
    },

    async AddAuto() {
      if (
        this.AddAutoInfo.age != 0 &&
        this.AddAutoInfo.maximumNumber != 0 &&
        this.AddAutoInfo.maximumNumber > this.classLength &&
        this.AddAutoInfo.number == 0
      ) {
        var numbersNeed =
          this.AddAutoInfo.maximumNumber - this.classObject.children.length;
        for (var value of this.childrenNoClass) {
          if (
            Math.ceil(new Date(value.dateOfBirth).getFullYear()) -
              Math.ceil(this.AddAutoInfo.age) ==
            0
          ) {
            await this.addChild(value._id);
          }

          await this.getClass();
          if (this.classLength - this.AddAutoInfo.maximumNumber == 0) break;
        }

        await this.getAllChildren();
        this.$router.push({ name: "Class.detail", params: { id: this.id } });
      }

      if (
        this.AddAutoInfo.age != 0 &&
        this.AddAutoInfo.maximumNumber != 0 &&
        this.AddAutoInfo.maximumNumber > this.classLength &&
        this.classLength < this.AddAutoInfo.number &&
        this.AddAutoInfo.number != 0
      ) {
        var numbersNeed =
          this.AddAutoInfo.maximumNumber - this.classObject.children.length;
        var count = 0;
        for (var value of this.childrenNoClass) {
          if (
            Math.ceil(new Date(value.dateOfBirth).getFullYear()) -
              Math.ceil(this.AddAutoInfo.age) ==
            0
          ) {
            await this.addChild(value._id);
          }

          count++;

          if (count - this.AddAutoInfo.number == 0) break;

          await this.getClass();
          if (this.classLength - this.AddAutoInfo.maximumNumber == 0) break;
        }

        await this.getAllChildren();
        this.$router.push({ name: "Class.detail", params: { id: this.id } });
      }
    },
  },
  async created() {
    await this.getAllChildren();
    await this.getClass();
  },
};
</script>

<template>
  <div class="w-full">
    <div class="bg-slate-800 rounded-md" >
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
          <Search v-model="searchText" class="w-full"/>
          <BAdd class="ml-10" @click="create" />
        </div>
      </div>
      <Table 
        :items="setPages"
        :fields="fields"
        :labels="labels"
        :actionList="actionList"
        @deleteItem="(value) => (deleteValue = value)"
        @update:item="value => editValue = value"
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
</template>

<script>
import Search from "../../components/forms/Search.vue";
import BAdd from "../../components/buttons/Add.vue";
import Select from "../../components/forms/Select.vue";
import Table from "../../components/Table.vue";
import Pagination from "../../components/Pagination.vue";
import Diploma from '../../services/diploma.service';
import Swal from "sweetalert2";

export default {
  components: {
    Search,
    BAdd, 
    Select,
    Table,
    Pagination,
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
          name: 10
        },
        {
          _id: 15,
          name: 15
        }
      ],
      searchText: "",
      entryValue: 5,
      diplomas: [],
      diploma: {},
      fields: ["name"],
      labels: ["name"],
      actionList: ["Diploma.detail"],
      deleteValue: "",
      editValue: "",
      numberOfPages: 1,
      totalRow: 0,
      endRow: 0,
      startRow: 0,
      currentPage: 1,
      background: "rgb(71 55 133 / var(--tw-bg-opacity))"
    }
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
    }
  },
  computed: {

    // convert [object] -> [string]
    toString() {
      return this.diplomas.map((diploma, index) => {
        const {name} = diploma;
        return [name].join("");
      })
    },

    // filter data when searchText change
    filter() {
      return this.diplomas.filter((diploma, index) => {
        return this.toString[index].includes(this.searchText.toLowerCase());
      });
    },

    filtered() {
      if(!this.searchText) {
        this.totalRow = this.diplomas.length;
        return this.diplomas;
      }else {
        this.totalRow = this.filter.length;
        return this.filter;
      }
    },

    setNumberOfPages() {
      return Math.ceil(this.filtered.length / this.entryValue);
    },

    setPages() {
      if(this.setNumberOfPages == 0) this.numberOfPages = 1;
      else this.numberOfPages = this.setNumberOfPages;

      this.startRow = (this.currentPage - 1) * this.entryValue + 1;
      this.endRow = this.currentPage * this.entryValue;

      return this.filtered.filter((diploma, index) => {
        return(
        index + 1 > (this.currentPage - 1) * this.entryValue &&
        index + 1 <= this.currentPage * this.entryValue
        );
      });
    },
  },
  methods: {
    checkCreate(value) {
      // return this.diplomas.filter((diploma, index) => {
      //   return this.toString[index].includes(value.toLowerCase());
      // });
      for(var diploma of this.diplomas) {
        if(diploma.name === value) {
          return true;
        }
      }
      return false;
    },

    async getAll() {
      try {
        this.diplomas = await Diploma.getAll();
      }catch(err) {
        console.log(err);
      }
    },

    async refresh() {
      await this.getAll();

    },

    async create() {
      const {value: text} = await Swal.fire({
        background: this.background,
        color: 'white',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        title: 'Add New Diploma',
        reverseButtons: true,
        input: 'text',
        inputAutoTrim: true,
        inputPlaceholder: 'Enter a new diploma',
        inputValidator: (value) => {
          if(!value) {
            return 'You need to write position.';
          }
          if(this.checkCreate(value)) {
            console.log(this.checkCreate(value));
            console.log(value);
            return 'Diploma already exists.'
          }
        }
      });

      if(text) {
        try {
          await Diploma.create({name: `${text}`});
          Swal.fire({
            background: this.background,
            color: 'white',
            text: 'Successful addition',
            icon: 'success',
            timer: 2000,
          });
          this.refresh();
          this.currentPage = this.numberOfPages;
        }catch(err) {
          console.log(err);
        }
      }
    },

    async getOne(id) {
      try{
        this.diploma = await Diploma.get(id);
      }catch(err) {
        console.log(err);
      }
    },

    async update() {
      const {value: text} = await Swal.fire({
        background: this.background,
        color: 'white',
        title: 'Edit Diploma',
        showCancelButton: true,
        reverseButtons: true,
        input: 'text',
        inputAutoTrim: true,
        inputValue: this.diploma.name,
        inputValidator: (value) => {
          if(!value) {
            return 'Data to update can not be empty.';
          }
          if(this.checkCreate(value)) {
            return 'Diploma already exists.';
          }
        }
      });

      if(text) {
        try {
          await Diploma.update(this.editValue, {name: `${text}`});
          Swal.fire({
            background: this.background,
            color: 'white',
            text: 'Successfully edition',
            icon: 'success',
            timer: 2000,
          });
          this.searchText= `${text}`;
        }catch(err) {
          console.log(err);
        }
      }
    },

    async deleteOne() {
      const option = Swal.fire({
        background: this.background,
        color: 'white',
        icon: 'warning',
        html: '<p>I want to remove this' + ' \"' + '<span class="text-blue-500 text-lg">' + this.diploma.name
          + '</span>' + '\"' + '</p>'
          ,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Delete',
        confirmButtonColor: 'red',
        reverseButtons: true,
      });

      if((await option).isConfirmed) {
        try {
          Diploma.delete(this.deleteValue);
          Swal.fire({
            background: this.background,
            color: 'white',
            text: 'Successfully deletion',
            icon: 'success',
            timer: 2000,
          });
        }catch(err) {
          console.log(err);
        }
      }
    }
  },
  created() {
    this.refresh();
  }
}
</script>
<template>
    <div class="w-full">
        <div class="flex justify-between">
            <!-- class detail -->
            <div class="bg-slate-800 text-white mr-4 rounded-md">
                <!-- ! -->
                <div
                    class="span flex justify-center py-4 text-xl border border-solid border-t-0 border-l-0 border-r-0 border-slate-500">
                    Class Details
                </div>
                <!-- ! -->
                <div class="flex">
                    <div class="flex flex-col p-4 mr-4 text-lg">
                        <span>Class Name</span>
                        <span>Grade Name</span>
                        <span>Note</span>
                        <span>School Year</span>
                        <span>Number of Class</span>
                    </div>
                    <div class="flex flex-col p-4 text-blue-500 text-lg">
                        <span>{{ classInfo.name }}</span>
                        <span>{{ classInfo.grade }}</span>
                        <span>{{ classInfo.note }}</span>
                        <span>{{ classInfo.schoolYear }}</span>
                        <span>{{ children.length }}</span>
                    </div>
                </div>
            </div>
            <!-- teacher detail -->
            <div class="bg-slate-800 text-white rounded-md flex-1">
                <!-- ! -->
                <div
                    class="span flex justify-center py-4 text-xl border border-solid border-t-0 border-l-0 border-r-0 border-slate-500">
                    Teacher Details
                </div>
                <!-- ! -->
                <div class="flex justify-between">
                    <!-- ! -->
                    <div class="flex border border-solid border-t-0 border-b-0 border-l-0 border-slate-500">
                        <div class="flex flex-col p-4 text-lg">
                            <span>Teacher</span>
                            <span>Gender</span>
                            <span>Phone</span>
                            <span>Email</span>
                            <span>Position</span>
                        </div>
                        <div class="flex flex-col py-4 text-blue-500 text-lg">
                            <span>{{ teacherInfo.name }}</span>
                            <span>{{ teacherInfo.gender }}</span>
                            <span>{{ teacherInfo.phone }}</span>
                            <span>{{ teacherInfo.mail }}</span>
                            <span>{{ position }}</span>
                        </div>
                    </div>
                    <!-- ! -->
                    <div class="flex">
                        <div class="flex flex-col p-4 mr-4 text-lg">
                            <span>Diplomas</span>
                        </div>
                        <div class="flex flex-col p-4 text-blue-500 text-lg">
                            <span v-for="(value, index) in this.teacherInfo.diplomas" :key="index">{{ value.name
                            }}</span>
                        </div>
                    </div>
                    <!-- ! -->
                </div>
            </div>
        </div>
    </div>
    <!-- ! -->
    <div class="w-full mt-12 bg-slate-800 py-4 px-2">
        <div class="flex flex-row justify-between">
            <div v-if="activeAction == 1" class="text-white text-xl flex items-center">List Of Children</div>
            <div v-if="activeAction == 2" class="text-white text-xl flex items-center">List Of Child Development Index</div>
            <div v-if="activeAction == 3" class="text-white text-xl flex items-center">List Of Receipt</div>
            <div class="flex">
                <div @click="activeAction = 1" :class="[activeAction == 1 ? 'bg-violet-500' : '']"
                    class="py-2 px-5 border border-solid text-white border-violet-500 cursor-pointer hover:bg-violet-500">
                    Children
                </div>
                <div @click="activeAction = 2" :class="[activeAction == 2 ? 'bg-violet-500' : '']"
                    class="py-2 px-5 border border-solid text-white border-violet-500 cursor-pointer hover:bg-violet-500">
                    Child Development Index
                </div>
                <div @click="activeAction = 3" :class="[activeAction == 3 ? 'bg-violet-500' : '']"
                    class="py-2 px-5 border border-solid text-white border-violet-500 cursor-pointer hover:bg-violet-500">
                    Receipts
                </div>
            </div>
        </div>
    </div>
    <!-- ! -->
    <div class="mt-4"></div>
    <ChildrenVue v-if="activeAction == 1" :id="id" />
    <CDIVue v-if="activeAction == 2" :id="id"/>
</template>
<script >
import Classes from "../../services/class.service";
import Teacher from "../../services/teacher.service";
import Table from "../../components/Table.vue";
import ChildrenVue from "./component-class/Children.vue";
import CDIVue from "./component-class/CDI.vue";

export default {
    components: {
        Table,
        ChildrenVue,
        CDIVue
    },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            classList: {},
            classInfo: {},
            teacherInfo: {},
            activeAction: 1,
            children: [],
            cdi_ed: [],
            refresh: false,
            position: "",
        };
    },
    watch: {
        async refresh() {
            this.$forceUpdate();
        }
    },
    methods: {
        async getClasses() {
            try {
                this.classList = await Classes.get(this.id);
                this.classInfo = {
                    name: this.classList.name,
                    grade: this.classList.grade.name,
                    note: this.classList.grade.note,
                    schoolYear: this.classList.grade.schoolYear.name,
                };
                this.getTeacher(this.classList.assignment.teacher);
                this.children = this.classList.children;
                this.cdi_es = this.classList.cdi;
            } catch (error) {
                console.log(error);
            }
        },
        async getTeacher(id) {
            try {
                this.teacherInfo = await Teacher.get(id);
                this.position = this.teacherInfo.position.name;
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getClasses();
    },
};
</script>

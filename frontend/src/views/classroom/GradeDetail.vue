<template>
    <div class="w-full">
        <div class="flex justify-between items-start">
            <!-- grade detail -->
            <div class="bg-slate-800 text-white mr-4 rounded-md">
                <div
                    class="span flex justify-center py-4 text-xl border border-solid border-t-0 border-l-0 border-r-0 border-slate-500">
                    Grade Details
                </div>
                <div class="flex">
                    <div class="flex flex-col p-4 mr-4 text-lg">
                        <span>Grade Name</span>
                        <span>Note</span>
                        <span>School Year</span>
                        <span>Number of Class</span>
                    </div>
                    <div class="flex flex-col p-4 text-blue-500 text-lg">
                        <span>{{ grade.name }}</span>
                        <span>{{ grade.note }}</span>
                        <span>{{ schoolYear }}</span>
                        <span>{{ numberOfClass }}</span>
                    </div>
                </div>
            </div>
            <!-- collection rate -->
            <div class="bg-slate-800 text-white rounded-md flex-1">
                <div
                    class="span flex justify-center py-4 text-xl border border-solid border-t-0 border-l-0 border-r-0 border-slate-500">
                    Collection Rates
                </div>
                <div class="flex justify-center">
                    <div class="flex flex-col p-4 mr-4 text-lg">
                        <table class="border-collapse table-auto">
                            <thead>
                                <tr class="my-2 border border-solid border-t-0 border-l-0 border-r-0 border-slate-500">
                                    <th class="px-5">Tuition Fees</th>
                                    <th class="px-5">Money</th>
                                    <th class="px-5">Start Date</th>
                                    <th class="px-5">End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="value in collectionRates" :key="index" class="my-2">
                                    <td class="px-5 pt-1">{{ value.name }}</td>
                                    <td class="px-5">{{ formatCash(value.money) }}</td>
                                    <td class="px-5">{{ value.startDate }}</td>
                                    <td class="px-5">{{ value.endDate }}</td>
                                </tr>
                                <tr
                                    class="text-blue-500 my-2 border border-solid border-b-0 border-l-0 border-r-0 border-slate-500">
                                    <td class="px-5 pt-1">Total mount:</td>
                                    <td class="px-5">{{ totalAmount }} vnd</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- class -->
        <div class="w-full mt-6">
            <div class="flex flex-wrap justify-between">
                <div v-for="(value, index) in classes" :key="index" class="w-3/12 rounded-md text-white bg-slate-800 mx-1 my-4 border border-solid border-slate-500">
                    <span class="flex justify-center text-xl my-4 text-blue-500 uppercase">{{value.name}}</span>
                    <span
                        class="border border-solid border-l-0 border-r-0 border-slate-500 px-2 py-2 flex justify-center">
                        Teacher 
                    </span>
                    <div class="flex justify-between mt-2 mx-2">
                        <span>Numbers</span>
                        <span>Male</span>
                        <span>Female</span>
                    </div>
                    <div class="flex justify-between m-2 flex-wrap">
                        <span class="rounded-full border border-solid border-blue-500 w-16 h-16 flex flex-col mb-2 items-center justify-center">
                            <span>{{value.numbers}}</span>
                        </span>
                        <span class="rounded-full border border-solid border-blue-500 w-16 h-16 flex flex-col mb-2 items-center justify-center">
                            <span>{{value.male}}</span>
                        </span>
                        <span class="rounded-full border border-solid border-blue-500 w-16 h-16 flex flex-col mb-2 items-center justify-center">
                            <span>{{value.female}}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-5"></div>
    <GradeVue class="" />
</template>
<script>
import Grade from "../../services/grade.service";
import GradeVue from "./Grade.vue";
export default {
    components: {
        GradeVue,
    },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    watch: {
        async id() {
            await this.getGrade(this.id);
            this.getCollectionRates();
            this.getClasses();
        }
    },
    data() {
        return {
            grade: {},
            schoolYear: "",
            numberOfClass: 0,
            collectionRates: {},
            classes: [],
            assignment: "",
        };
    },
    computed: {
        totalAmount() {
            const totalAmount = this.collectionRates.reduce((acc, curr) => {
                return acc + Math.floor(curr.money);
            }, 0);
            return this.formatCash(totalAmount.toString());
        },
        getTeacher(index) {
            this.assignment = this.grade.class[index].assignment.teacher.name;
        }
    },
    methods: {
        async getGrade(id) {
            try {
                this.grade = await Grade.get(id);
                this.schoolYear = this.grade.schoolYear.name;
                this.numberOfClass = this.grade.class.length;
            } catch (error) {
                console.log(error);
            }
        },

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

        getCollectionRates() {
            this.collectionRates = this.grade.collectionRates.map((value, index) => {
                return {
                    name: value.tuitionFees.name,
                    money: value.money,
                    startDate: this.formatDateOfBirth(value.startDate),
                    endDate: this.formatDateOfBirth(value.endDate),
                };
            });
        },

        getClasses() {
            this.classes = this.grade.class.map(
                (value, index) => {
                    return {
                        name: value.name,
                        numbers: value.children.length,
                        male: 0,
                        female: 0,
                    }
                }
            )
        },

    },
    async created() {
        await this.getGrade(this.id);
        this.getCollectionRates();
        this.getClasses();
    },
};
</script>

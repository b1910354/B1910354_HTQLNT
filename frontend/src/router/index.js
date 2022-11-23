import { createWebHistory, createRouter } from "vue-router";

const routes = [
    // Dashboard
    {   
        path: '/',
        name: 'Dashboard',
        component: () => import ('../views/Dashboard.vue')
    },
    // Kid 
    {
        path: '/children',
        name: 'Children',
        component: () => import ('../views/children/Children.vue')
    },
    // Parent Detail
    {
        path: '/parents-detail',
        name: 'ParentsDetail',
        component: () => import ('../views/children/ParentsDetail.vue')
    },
    // Teacher
    {
        path: '/teachers',
        name: 'Teacher',
        component: () => import ('../views/teacher/Teacher.vue')
    },
    {
        path: '/teachers/:id',
        name: 'Teacher.edit',
        component: () => import ('../views/teacher/TeacherEdit.vue'),
        props: true
    },
    {
        path: '/teachers/:id',
        name: 'Teacher.detail',
        component: () => import ('../views/teacher/TeacherDetail.vue'),
        props: true
    },
    // ToDo
    {
        path: '/todo',
        name: 'Todo',
        component: () => import ('../views/todo/ToDo.vue')
    },
    // Assignment
    {
        path: '/assignment',
        name: 'Assignment',
        component: () => import ('../views/todo/Assignment.vue')
    },
    // Duty
    {
        path: '/duty',
        name: 'Duty',
        component: () => import ('../views/todo/Duty.vue'),
    },
    // Classroom
    // Grade
    {
        path: '/grade',
        name: 'Grade',
        component: () => import ('../views/classroom/Grade.vue')
    },
    {
        path: '/grade/:id',
        name: 'Grade.detail',
        component: () => import ('../views/classroom/GradeDetail.vue'),
        props: true,
    },
    // Class
    {
        path: '/classes',
        name: 'Classes',
        component: () => import ('../views/classroom/Class.vue')
    },
    {
        path: '/classes/:id',
        name: 'Class.detail',
        component: () => import ('../views/classroom/ClassDetail.vue'),
        props: true,
    },
    {
        path: '/classes/:id/add-children',
        name: 'Class.addChildren',
        component: () => import ('../views/classroom/component-class/ChildrenAdd.vue'),
        props: true,
    },
    {
        path: '/classes/:id/add-cdi',
        name: 'Class.addCDI',
        component: () => import ('../views/classroom/component-class/CDIAdd.vue'),
        props: true,
    },
    // School Year
    {
        path: '/school-year',
        name: 'SchoolYear',
        component: () => import ('../views/classroom/SchoolYear.vue')
    },
    {
        path: '/school-year/:id',
        name: 'SchoolYear.detail',
        component: () => import ('../views/classroom/SchoolYearDetail.vue'),
        props: true,
    },
    // Tuition Fees
    {
        path: '/tuition-fees',
        name: 'TuitionFees',
        component: () => import ('../views/classroom/TuitionFees.vue')
    },
    {
        path: '/tuition-fees/:id',
        name: 'TuitionFees.detail',
        component: () => import ('../views/classroom/TuitionFeesDetail.vue'),
        props: true,
    },
    // Collection Rates
    {
        path: '/collection-rates',
        name: 'CollectionRates',
        component: () => import ('../views/classroom/CollectionRates.vue')
    },
    // cdi
    {
        path: '/children-development-index',
        name: "CDI",
        component: () => import ('../views/classroom/CDI.vue'),
    },
    // Invoice
    
    // Position
    {
        path: '/positions',
        name: 'Position',
        component:  () => import ('../views/position/Position.vue')
    },
    {
        path: '/positions/:id',
        name: 'Position.detail',
        component: () => import ('../views/position/PositionDetail.vue'),
        props: true
    },
    // Diplomas
    {
        path: '/diplomas',
        name: 'Diploma',
        component: () => import ('../views/diploma/Diploma.vue')
    },
    {
        path: '/diplomas/:id',
        name: 'Diploma.detail',
        component: () => import ('../views/diploma/DiplomaDetail.vue'),
        props: true,
    },
    // Setting
    {
        path: '/settings',
        name: 'Setting',
        component: () => import ('../views/Setting.vue')
    },
    // Not found
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("../views/NotFound.vue"),
    },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;

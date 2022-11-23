<template>
    <div class="flex justify-between items-center py-5 px-2">
        <p class="text-white text-sm">
            Showing {{totalRow == 0 ? 0 : startRow}} to {{endRow>totalRow ? totalRow : endRow}} of {{totalRow}} entries
        </p>
        <div class="flex items-center">
            <span class="rounded-full w-8 h-8 flex items-center justify-center border border-solid border-violet-500 hover:bg-violet-500 cursor-pointer"
            @click="updatePrevPage(currentPage)"
            >
                <Prev class="text-white"/>
            </span>
            <div class="flex mx-2 rounded-full border border-solid border-violet-500">
                <span class="rounded-full w-8 h-8 flex items-center justify-center cursor-pointer text-white"
                v-for="(numberOfPage, index) in numberOfPages" :key="numberOfPage" 
                @click="updateCurrentPage(numberOfPage)"
                :class="[index === (currentPage - 1) ? 'bg-violet-500' : 'hover:bg-violet-500']"
                >
                    {{numberOfPage}}
                </span>
            </div>
            <span class="rounded-full w-8 h-8 flex items-center justify-center border border-solid border-violet-500 hover:bg-violet-500 cursor-pointer"
            @click="updateNextPage(currentPage)"
            >
                <Next class="text-white"/>
            </span>
        </div>
    </div>
</template>

<script>
import Next from './icons/NavigateNext.vue';
import Prev from './icons/NavigatePrev.vue';
export default {
    components: {
        Next,
        Prev
    },
    props: {
        totalRow: {
            type: Number, default: 0
        },
        currentPage: {
            type: Number, default: 5
        },
        numberOfPages: {
            type: Number, default: 1
        },
        startRow: {
            type: Number, default: 0
        },
        endRow: {
            type: Number, default: 0
        }
    },
    emits: ['update:currentPage'],
    methods: {
        updateCurrentPage(number) {
            this.$emit('update:currentPage', number);
        },
        updateNextPage(number) {
            if(number < this.numberOfPages && number > 0) {
                this.$emit('update:currentPage', number + 1);
            }
        },
        updatePrevPage(number) {
            if(number <= this.numberOfPages && number > 1) {
                this.$emit('update:currentPage', number - 1);
            }
        }
    }
}
</script>
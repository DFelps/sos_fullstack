<template>
  <SectionCard :title="title">
    <div v-if="items.length" class="space-y-3">
      <div v-for="item in paginatedItems" :key="item.id" class="rounded-2xl border border-slate-100 p-4 text-sm text-slate-700">
        <slot :item="item" />
      </div>
      <AppPagination :current-page="currentPage" :total-pages="totalPages" @prev="prevPage" @next="nextPage" />
    </div>
    <p v-else class="text-sm text-slate-500">{{ emptyText }}</p>
  </SectionCard>
</template>

<script setup lang="ts" generic="T extends { id: string }">
    import { computed, ref, watch } from 'vue';
    import SectionCard from '@/components/common/SectionCard.vue';
    import AppPagination from '@/components/common/AppPagination.vue';

    const props = defineProps<{
    title: string;
    items: T[];
    emptyText: string;
    }>();

    const currentPage = ref(1);
    const perPage = 5;

    const totalPages = computed(() => Math.max(1, Math.ceil(props.items.length / perPage)));
    const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * perPage;
    return props.items.slice(start, start + perPage);
    });

    watch(() => props.items.length, () => {
    if (currentPage.value > totalPages.value) currentPage.value = totalPages.value;
    });

    const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
    const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };
</script>
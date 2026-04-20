<template>
  <div v-if="categories.length" class="grid gap-4 md:grid-cols-2">
    <div v-for="item in paginatedCategories" :key="item.id" class="rounded-2xl border border-slate-100 p-5">
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <span class="h-4 w-4 rounded-full" :style="{ background: item.color }"></span>
          <h4 class="font-bold text-slate-900">{{ item.name }}</h4>
        </div>

        <div class="flex gap-2">
          <button @click="$emit('edit', item)" class="rounded-xl bg-[#001EAA] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#0048CA]">Editar</button>
          <button @click="$emit('remove', item)" class="rounded-xl bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700">Excluir</button>
        </div>
      </div>

      <p class="mt-2 text-sm text-slate-500">{{ item.description || 'Sem descrição.' }}</p>
    </div>

    <div class="md:col-span-2">
      <AppPagination :current-page="currentPage" :total-pages="totalPages" @prev="prevPage" @next="nextPage" />
    </div>
  </div>

  <p v-else class="text-sm text-slate-500">Nenhuma categoria cadastrada.</p>
</template>

<script setup lang="ts">
    import { computed, ref, watch } from 'vue';
    import AppPagination from '@/components/common/AppPagination.vue';
    import type { Category } from '@/types';

    const props = defineProps<{
    categories: Category[];
    }>();

    defineEmits<{
    (e: 'edit', category: Category): void;
    (e: 'remove', category: Category): void;
    }>();

    const currentPage = ref(1);
    const perPage = 6;

    const totalPages = computed(() => Math.max(1, Math.ceil(props.categories.length / perPage)));
    const paginatedCategories = computed(() => {
    const start = (currentPage.value - 1) * perPage;
    return props.categories.slice(start, start + perPage);
    });

    watch(() => props.categories.length, () => {
    if (currentPage.value > totalPages.value) currentPage.value = totalPages.value;
    });

    const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
    const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };
</script>
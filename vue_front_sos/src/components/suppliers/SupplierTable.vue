<template>
  <div v-if="suppliers.length" class="overflow-x-auto">
    <table class="table-sos">
      <thead><tr><th>Empresa</th><th>Contato</th><th>E-mail</th><th>Telefone</th><th>Ações</th></tr></thead>
      <tbody>
        <tr v-for="item in paginatedSuppliers" :key="item.id" class="border-b border-slate-100">
          <td>{{ item.tradeName }}</td>
          <td>{{ item.contactName }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>
            <div class="flex gap-2">
              <button @click="$emit('edit', item)" class="rounded-xl bg-[#001EAA] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#0048CA]">Editar</button>
              <button @click="$emit('remove', item)" class="rounded-xl bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700">Excluir</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <AppPagination :current-page="currentPage" :total-pages="totalPages" @prev="prevPage" @next="nextPage" />
  </div>

  <p v-else class="text-sm text-slate-500">Nenhum fornecedor cadastrado.</p>
</template>

<script setup lang="ts">
    import { computed, ref, watch } from 'vue';
    import AppPagination from '@/components/common/AppPagination.vue';
    import type { Supplier } from '@/types';

    const props = defineProps<{
    suppliers: Supplier[];
    }>();

    defineEmits<{
    (e: 'edit', supplier: Supplier): void;
    (e: 'remove', supplier: Supplier): void;
    }>();

    const currentPage = ref(1);
    const perPage = 8;

    const totalPages = computed(() => Math.max(1, Math.ceil(props.suppliers.length / perPage)));
    const paginatedSuppliers = computed(() => {
    const start = (currentPage.value - 1) * perPage;
    return props.suppliers.slice(start, start + perPage);
    });

    watch(() => props.suppliers.length, () => {
    if (currentPage.value > totalPages.value) currentPage.value = totalPages.value;
    });

    const prevPage = () => { if (currentPage.value > 1) currentPage.value--; };
    const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++; };
</script>
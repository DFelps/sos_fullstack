<template>
  <AppLayout title="Categorias" subtitle="Organização por grupos de produto">
    <div class="grid gap-6 xl:grid-cols-[0.85fr,1.15fr]">
      <SectionCard title="Nova categoria" description="Crie grupos para facilitar filtros e relatórios">
        <SimpleEntityForm :fields="fields" :initial-values="{ color: '#0048CA' }" @submit="onSubmit" />
      </SectionCard>
      <SectionCard title="Lista de categorias">
        <div class="grid gap-4 md:grid-cols-2">
          <div v-for="item in store.categories" :key="item.id" class="rounded-2xl border border-slate-100 p-5">
            <div class="flex items-center gap-3">
              <span class="h-4 w-4 rounded-full" :style="{ background: item.color }"></span>
              <h4 class="font-bold text-slate-900">{{ item.name }}</h4>
            </div>
            <p class="mt-2 text-sm text-slate-500">{{ item.description }}</p>
          </div>
        </div>
      </SectionCard>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue';
import SectionCard from '@/components/common/SectionCard.vue';
import SimpleEntityForm, { type FieldConfig } from '@/components/forms/SimpleEntityForm.vue';
import { useInventoryStore } from '@/stores/inventory';

const store = useInventoryStore();
const fields: FieldConfig[] = [
  { key: 'name', label: 'Nome' },
  { key: 'description', label: 'Descrição', full: true },
  { key: 'color', label: 'Cor', type: 'color' }
];
const onSubmit = (payload: Record<string, string>) => store.addCategory({ name: payload.name, description: payload.description, color: payload.color });
</script>

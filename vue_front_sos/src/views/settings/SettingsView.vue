<template>
  <AppLayout title="Configurações" subtitle="Diretrizes visuais e roadmap do projeto">
    <div class="grid gap-6 xl:grid-cols-[1fr,1fr]">
      <SectionCard title="Identidade visual SOS">
        <div class="grid gap-4 md:grid-cols-5">
          <div v-for="item in palette" :key="item.hex" class="rounded-2xl border border-slate-100 p-4 text-center">
            <div class="mx-auto h-16 w-16 rounded-full border border-slate-200" :style="{ background: item.hex }"></div>
            <p class="mt-3 font-semibold text-slate-900">{{ item.name }}</p>
            <p class="text-xs text-slate-500">{{ item.hex }}</p>
          </div>
        </div>
      </SectionCard>
      <SectionCard title="Stack do projeto">
        <ul class="space-y-3 text-sm text-slate-700">
          <li>Vue 3 + TypeScript + Vite</li>
          <li>Tailwind CSS com paleta herdada do SOS original</li>
          <li>Pinia e Vue Router</li>
          <li>Laravel API com controllers, models, requests e migrations</li>
          <li>Estrutura pronta para autenticação via Sanctum ou JWT</li>
        </ul>
      </SectionCard>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue';
import SectionCard from '@/components/common/SectionCard.vue';

const palette = [
  { name: 'Midnight', hex: '#000531' },
  { name: 'Black', hex: '#000000' },
  { name: 'Primary', hex: '#0048CA' },
  { name: 'Secondary', hex: '#001EAA' },
  { name: 'White', hex: '#FFFFFF' }
];
</script>

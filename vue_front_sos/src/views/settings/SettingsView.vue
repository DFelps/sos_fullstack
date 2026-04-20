<template>
  <AppLayout title="Configurações" subtitle="Diretrizes visuais e preferências do sistema">
    <div class="grid gap-6 xl:grid-cols-[1fr,1fr]">
      <BrandPaletteCard :palette="palette" />
      <SystemInfoCard />
      <div class="xl:col-span-2">
        <GeneralSettingsCard />
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue';
import BrandPaletteCard from '@/components/settings/BrandPaletteCard.vue';
import SystemInfoCard from '@/components/settings/SystemInfoCard.vue';
import GeneralSettingsCard from '@/components/settings/GeneralSettingsCard.vue';

const palette = [
  { name: 'Midnight', hex: '#000531' },
  { name: 'Black', hex: '#000000' },
  { name: 'Primary', hex: '#0048CA' },
  { name: 'Secondary', hex: '#001EAA' },
  { name: 'White', hex: '#FFFFFF' }
];
</script>
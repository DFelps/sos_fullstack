<template>
  <SectionCard title="Stack do projeto">
    <ul class="space-y-3 text-sm text-slate-700">
      <li>Vue 3 + TypeScript + Vite</li>
      <li>Tailwind CSS com paleta herdada do SOS original</li>
      <li>Pinia e Vue Router</li>
      <li>Laravel API com controllers, models, requests e migrations</li>
      <li>Estrutura pronta para autenticação via Sanctum ou JWT</li>
    </ul>
  </SectionCard>
</template>

<script setup lang="ts">
    import SectionCard from '@/components/common/SectionCard.vue';
</script>
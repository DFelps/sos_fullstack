<template>
  <SectionCard title="Identidade visual SOS">
    <div class="grid gap-4 md:grid-cols-5">
      <div v-for="item in palette" :key="item.hex" class="rounded-2xl border border-slate-100 p-4 text-center">
        <div class="mx-auto h-16 w-16 rounded-full border border-slate-200" :style="{ background: item.hex }"></div>
        <p class="mt-3 font-semibold text-slate-900">{{ item.name }}</p>
        <p class="text-xs text-slate-500">{{ item.hex }}</p>
      </div>
    </div>
  </SectionCard>
</template>

<script setup lang="ts">
    defineProps<{ palette: { name: string; hex: string }[] }>();
    import SectionCard from '@/components/common/SectionCard.vue';
</script>
<template>
  <div class="flex min-h-screen bg-sos-midnight">
    <AppSidebar />
    <main class="flex-1 bg-[radial-gradient(circle_at_top_right,_rgba(0,72,202,0.45),_transparent_35%),linear-gradient(180deg,_rgba(0,5,49,1)_0%,_rgba(0,0,0,1)_100%)] px-4 py-4 lg:px-8 lg:py-6">
      <AppHeader :title="title" :subtitle="subtitle" />
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from './AppHeader.vue';
import AppSidebar from './AppSidebar.vue';

defineProps<{ title: string; subtitle: string }>();
</script>

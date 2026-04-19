<template>
  <header class="mb-6 flex items-center justify-between rounded-3xl border border-white/10 bg-sos-gradient px-6 py-5 shadow-panel">
    <div>
      <p class="text-sm text-white/70">{{ subtitle }}</p>
      <h2 class="text-2xl font-bold text-white">{{ title }}</h2>
    </div>
    <div class="flex items-center gap-3">
      <div class="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-right">
        <p class="text-xs uppercase tracking-wide text-white/60">Usuário</p>
        <p class="font-semibold text-white">{{ auth.userName }}</p>
      </div>
      <button class="btn-secondary !border-white/20 !bg-white/10 !text-white hover:!bg-white/20" @click="logout">Sair</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const props = defineProps<{ title: string; subtitle: string }>();
const auth = useAuthStore();
const router = useRouter();

const logout = () => {
  auth.logout();
  router.push('/login');
};
</script>

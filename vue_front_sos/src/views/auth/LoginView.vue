<template>
  <div class="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(0,72,202,0.25),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(0,30,170,0.35),_transparent_30%),linear-gradient(135deg,_#000000,_#000531)] px-4">
    <div class="grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/60 shadow-panel backdrop-blur lg:grid-cols-[1.2fr,0.8fr]">
      <div class="hidden min-h-[720px] flex-col justify-between bg-sos-gradient p-10 lg:flex">
        <div>
          <p class="text-sm uppercase tracking-[0.45em] text-white/60">SOS</p>
          <h1 class="mt-5 max-w-md text-5xl font-black leading-tight text-white">System Operation of Stock</h1>
          <p class="mt-5 max-w-lg text-lg text-white/80">Revivendo primeiro projeto de 6 anos atrás, agora com Vue, Tailwind e API Laravel.</p>
        </div>
        <div class="rounded-3xl border border-white/15 bg-black/20 p-6 text-white/80">
          <p class="text-sm">Paleta original preservada</p>
          <div class="mt-4 flex gap-3">
            <span v-for="color in colors" :key="color" class="h-10 w-10 rounded-full border border-white/20" :style="{ background: color }"></span>
          </div>
        </div>
      </div>

      <div class="bg-white p-8 md:p-12">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-sos-primary">Acesso ao sistema</p>
        <h2 class="mt-4 text-3xl font-black text-slate-900">Entrar no SOS</h2>
        <p class="mt-2 text-sm text-slate-500">Use a conta demo para navegar pelo sistema.</p>

        <form class="mt-10 space-y-5" @submit.prevent="submitLogin">
          <div>
            <label class="label-sos">E-mail</label>
            <input v-model="email" type="email" class="input-sos" />
          </div>
          <div>
            <label class="label-sos">Senha</label>
            <input v-model="password" type="password" class="input-sos" />
          </div>
          <p v-if="errorMessage" class="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{{ errorMessage }}</p>
          <button class="btn-primary w-full">Acessar painel</button>
        </form>

        <div class="mt-8 rounded-2xl bg-slate-50 p-5 text-sm text-slate-600">
          <p><strong>Login demo:</strong> {{ auth.demoEmail }}</p>
          <p><strong>Senha demo:</strong> {{ auth.demoPassword }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const router = useRouter();
const email = ref(auth.demoEmail);
const password = ref(auth.demoPassword);
const errorMessage = ref('');
const colors = ['#000531', '#000000', '#0048CA', '#001EAA', '#FFFFFF'];

const submitLogin = () => {
  if (!auth.login(email.value, password.value)) {
    errorMessage.value = 'Credenciais inválidas.';
    return;
  }

  errorMessage.value = '';
  router.push('/');
};
</script>

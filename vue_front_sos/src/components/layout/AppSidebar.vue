<template>
  <aside class="hidden w-72 shrink-0 lg:block">
    <div class="sticky top-0 flex min-h-screen flex-col border-r border-white/10 bg-black/90 px-6 py-8">
      <div class="mb-10">
        <p class="text-xs uppercase tracking-[0.35em] text-white/50">SOS</p>
        <h1 class="mt-3 text-2xl font-bold text-white">System Operation of Stock</h1>
      </div>

      <nav class="space-y-2">
        <RouterLink v-for="item in items" :key="item.to" :to="item.to" class="flex items-center gap-3 rounded-2xl px-4 py-4 text-sm font-medium text-white/80 transition hover:bg-sos-primary/20 hover:text-white" active-class="bg-sos-gradient text-white shadow-panel">
          <component :is="item.icon" class="h-6 w-6" />
          <span>{{ item.label }}</span>
        </RouterLink>
      </nav>

      <div class="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
        Revivendo o projeto original SOS com visual moderno, tipagem e base pronta para API Laravel.
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import {
  ArchiveBoxIcon,
  ChartBarSquareIcon,
  Cog6ToothIcon,
  HomeIcon,
  Squares2X2Icon,
  TruckIcon,
  UsersIcon,
  ArrowsRightLeftIcon
} from '@heroicons/vue/24/outline';

const items = [
  { to: '/', label: 'Dashboard', icon: HomeIcon },
  { to: '/produtos', label: 'Cadastrar produtos', icon: ArchiveBoxIcon },
  { to: '/categorias', label: 'Categorias', icon: Squares2X2Icon },
  { to: '/fornecedores', label: 'Fornecedores', icon: TruckIcon },
  { to: '/clientes', label: 'Clientes', icon: UsersIcon },
  { to: '/movimentacoes', label: 'Histórico', icon: ArrowsRightLeftIcon },
  { to: '/relatorios', label: 'Relatórios', icon: ChartBarSquareIcon },
  { to: '/configuracoes', label: 'Configurações', icon: Cog6ToothIcon }
];
</script>

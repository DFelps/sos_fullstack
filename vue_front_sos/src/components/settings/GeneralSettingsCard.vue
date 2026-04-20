<template>
  <SectionCard title="Informações gerais">
    <form class="grid gap-4 md:grid-cols-2" @submit.prevent="saveSettings">
      <div><label class="label-sos">Nome da empresa</label><input v-model="form.companyName" class="input-sos" /></div>
      <div><label class="label-sos">Responsável</label><input v-model="form.manager" class="input-sos" /></div>
      <div><label class="label-sos">E-mail operacional</label><input v-model="form.email" type="email" class="input-sos" /></div>
      <div><label class="label-sos">Telefone</label><input v-model="form.phone" class="input-sos" /></div>
      <div><label class="label-sos">Estoque mínimo padrão</label><input v-model.number="form.defaultMinStock" type="number" min="0" class="input-sos" /></div>
      <div><label class="label-sos">Moeda</label><input v-model="form.currency" class="input-sos" /></div>
      <div class="md:col-span-2 flex justify-end"><button class="btn-primary">Salvar preferências</button></div>
    </form>
  </SectionCard>
</template>

<script setup lang="ts">
    import { reactive, onMounted } from 'vue';
    import SectionCard from '@/components/common/SectionCard.vue';

    const STORAGE_KEY = 'sos_settings';

    const form = reactive({
    companyName: 'SOS',
    manager: 'Administrador SOS',
    email: 'contato@sos.local',
    phone: '(11) 4002-0000',
    defaultMinStock: 10,
    currency: 'BRL'
    });

    onMounted(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) Object.assign(form, JSON.parse(raw));
    });

    const saveSettings = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    };
</script>
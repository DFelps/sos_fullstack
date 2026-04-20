<template>
  <div class="grid gap-4 md:grid-cols-[1fr,220px]">
    <div>
      <label class="label-sos">Buscar</label>
      <input :value="search" class="input-sos" placeholder="Produto ou motivo" @input="$emit('update:search', ($event.target as HTMLInputElement).value)" />
    </div>
    <div>
      <label class="label-sos">Tipo</label>
      <select :value="type" class="input-sos" @change="$emit('update:type', ($event.target as HTMLSelectElement).value)">
        <option value="all">Todos</option>
        <option value="entry">Entrada</option>
        <option value="exit">Saída</option>
        <option value="adjustment">Ajuste</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ search: string; type: string }>();

defineEmits<{
  (e: 'update:search', value: string): void;
  (e: 'update:type', value: string): void;
}>();
</script>
<template>
  <AppModal :open="open" :title="title" @close="$emit('cancel')">
    <div class="space-y-6">
      <p class="text-sm text-slate-600">{{ message }}</p>
      <div class="flex justify-end gap-3">
        <button @click="$emit('cancel')" class="btn-secondary">Cancelar</button>
        <button @click="$emit('confirm')" class="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700">Excluir</button>
      </div>
    </div>
  </AppModal>
</template>

<script setup lang="ts">
    import AppModal from '@/components/common/AppModal.vue';

    defineProps<{
    open: boolean;
    title: string;
    message: string;
    }>();

    defineEmits<{
    (e: 'cancel'): void;
    (e: 'confirm'): void;
    }>();
</script>
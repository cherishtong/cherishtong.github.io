<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <div class="lab-demo">
    <div class="lab-demo-value">{{ count }}</div>
    <div class="lab-demo-actions">
      <button type="button" class="btn btn-ghost btn-sm" @click="count--">−1</button>
      <button type="button" class="btn btn-vermilion btn-sm" @click="count++">+1</button>
      <button type="button" class="btn btn-primary btn-sm" @click="count = 0">Reset</button>
    </div>
    <p class="lab-demo-meta">Hydrated with <code>client:visible</code> · Vue 3.5</p>
  </div>
</template>

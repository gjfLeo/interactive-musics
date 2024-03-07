<template>
  <template v-if="href">
    <NA :href="href" target="_blank" v-bind="$attrs">
      <slot />
    </NA>
  </template>
  <template v-else-if="to">
    <RouterLink :to="to" #="{ navigate, href }" custom>
      <NA :href="href" v-bind="$attrs" @click="navigate">
        <slot />
      </NA>
    </RouterLink>
  </template>
  <template v-else>
    <NA v-bind="$attrs">
      <slot />
    </NA>
  </template>
</template>

<script lang="ts" setup>
defineProps<{
  href?: string;
  to?: string;
}>();
</script>

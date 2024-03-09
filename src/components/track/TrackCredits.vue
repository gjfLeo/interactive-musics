<template>
  <NForm label-placement="left" label-width="auto" :show-feedback="false">
    <NFormItem
      v-for="item in credits" :key="item[0]"
      :label="item[0]"
    >
      {{ item.slice(1).join(" / ") }}
    </NFormItem>
  </NForm>
</template>

<script lang="ts" setup>
import type { IMTrack } from "@/utils/types";

defineProps<{
  credits: Exclude<IMTrack["credits"], undefined>;
}>();
</script>

<template>
  <NH1>starter-vue</NH1>

  <NH2>UI框架</NH2>

  <NH3>NaiveUI</NH3>

  <div class="flex flex-col gap-4">
    <NSpace>
      <NButton type="primary">
        Primary
      </NButton>
      <NButton>
        Normal
      </NButton>
      <NButton circle @click="isDark = !isDark">
        <template #icon><div class="i-carbon:sun dark:i-carbon:moon" /></template>
      </NButton>
    </NSpace>

    <NSpace>
      <NButton type="success" @click="message.success('success')">
        Success
      </NButton>
      <NButton type="warning" @click="message.warning('warning')">
        Warning
      </NButton>
      <NButton type="error" @click="message.error('error')">
        Error
      </NButton>
      <NButton type="info" @click="message.info('info')">
        Info
      </NButton>
    </NSpace>

    <NForm inline>
      <NFormItem label="Input">
        <NInput />
      </NFormItem>
      <NFormItem label="DatePicker">
        <NDatePicker type="date" />
      </NFormItem>
    </NForm>
  </div>

  <NH3>UnoCSS</NH3>

  <NH3>PostCSS</NH3>
  <NUl>
    <NLi><GLink href="https://github.com/postcss/autoprefixer">autoprefixer</GLink>：<span class="select-all">自动添加厂商前缀</span></NLi>
    <NLi><GLink href="https://unocss.dev/integrations/postcss">@unocss/postcss</GLink>：<span class="unocss-postcss-test">UnoCSS 集成</span></NLi>
  </NUl>

  <NH3>图标</NH3>

  <NTable class="w-auto" :single-line="false">
    <NTbody>
      <NTr>
        <NTh><GLink href="https://icones.js.org/collection/carbon">@iconify/carbon</GLink></NTh>
        <NTd><div class="i-carbon:add" /></NTd>
        <NTd><div class="i-carbon:subtract" /></NTd>
        <NTd><div class="i-carbon:search" /></NTd>
        <NTd><div class="i-carbon:copy" /></NTd>
        <NTd><div class="i-carbon:trash-can" /></NTd>
        <NTd><div class="i-carbon:overflow-menu-horizontal" /></NTd>
      </NTr>
      <NTr>
        <NTh><GLink href="https://icones.js.org/collection/mdi">@iconify/mdi</GLink></NTh>
        <NTd><div class="i-mdi:plus" /></NTd>
        <NTd><div class="i-mdi:minus" /></NTd>
        <NTd><div class="i-mdi:magnify" /></NTd>
        <NTd><div class="i-mdi:content-copy" /></NTd>
        <NTd><div class="i-mdi:trash-can" /></NTd>
        <NTd><div class="i-mdi:dots-horizontal" /></NTd>
      </NTr>
    </NTbody>
  </NTable>

  <NH2>插件</NH2>

  <NUl>
    <NLi><GLink href="https://github.com/unplugin/unplugin-auto-import">unplugin-auto-import</GLink>：API 自动导入</NLi>
    <NLi><GLink href="https://github.com/unplugin/unplugin-vue-components">unplugin-vue-components</GLink>：组件自动导入</NLi>
    <NLi><GLink href="https://github.com/posva/unplugin-vue-router">unplugin-vue-router</GLink>：根据文件路径自动生成路由</NLi>
    <NLi><GLink href="https://github.com/unplugin/unplugin-vue-markdown">unplugin-vue-markdown</GLink>：将 Markdown 转为 Vue 组件</NLi>
  </NUl>
</template>

<script lang="ts" setup>
useHead({
  title: "Demo",
});

const message = useMessage();

const isDark = useDark();
</script>

<style scoped>
.unocss-postcss-test {
  &:hover {
    @apply opacity-50;
  }
}
</style>

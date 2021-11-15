<template>
  <section class="demo-group">
    <div class="item-group">
      <DeBadge :value="8" size="small">
        <DeIcon name="bell-l" />
      </DeBadge>
      <DeBadge :value="18">
        <DeIcon name="bell-l" />
      </DeBadge>
      <DeBadge :value="188" background-color="blue">
        <DeIcon name="bell-l" />
      </DeBadge>
      <DeBadge :value="188" background-color="green" overflow="99">
        <DeIcon name="bell-l" />
      </DeBadge>
      <DeBadge :value="18" background-color="orange" text-color="black">
        <DeIcon name="bell-l" />
      </DeBadge>
      <DeBadge
        :value="18"
        background-color="black"
        text-color="gold"
        text="Plus"
      >
        <DeIcon name="bell-l" />
      </DeBadge>
      <DeBadge :value="18" background-color="red" text-color="white">
        <DeIcon name="bell-l" />
        <template #count>New</template>
      </DeBadge>
    </div>
    <div class="item-group">
      <DeBadge :value="8" size="small" theme="dot">
        <DeIcon name="bell-l" />
      </DeBadge>
      <DeBadge :value="18" theme="dot">
        <DeIcon name="bell-l" />
      </DeBadge>
      <DeBadge :value="18" theme="dot" background-color="blue">
        <DeIcon name="bell-l" />
      </DeBadge>
      <DeBadge :value="18" theme="dot" background-color="green">
        <DeIcon name="bell-l" />
      </DeBadge>
    </div>
  </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {DeBadge, DeIcon} from '@/packages';

export default defineComponent({
  components: {
    DeBadge,
    DeIcon,
  },
});
</script>
<style lang="less">
.item-group > * {
  margin: 0;
}
</style>

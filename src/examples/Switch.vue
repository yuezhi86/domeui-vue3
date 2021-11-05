<template>
  <section class="demo-group">
    <div class="item-group">
      <DeSwitch
        v-model="b"
        name="b"
        :disabled="disabled"
        @onChange="onChange"
      />
      <DeSwitch
        v-model="c"
        name="c"
        type="success"
        :width="80"
        :height="30"
        :disabled="disabled"
        @onChange="onChange"
      >
        <template #on>已打开</template>
        <template #off>已关闭</template>
      </DeSwitch>
      <DeButton @click="onTrigger">{{ disabled ? '启用' : '禁用' }}</DeButton>
    </div>
    <div class="item-group">
      <h3>beforeChange</h3>
      <DeSwitch
        v-model="a"
        name="a"
        :disabled="disabled"
        :before-change="beforeChange"
        @onChange="onChange"
      />
    </div>
  </section>
</template>

<script lang="ts">
import {ref} from 'vue';
import {DeSwitch, DeButton} from '@/packages';
export default {
  components: {
    DeSwitch,
    DeButton,
  },
  setup() {
    const disabled = ref(false);
    return {
      a: ref(false),
      b: ref(true),
      c: ref(''),
      disabled,
      beforeChange(checked: boolean) {
        console.log(checked);
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            resolve();
          }, 3000);
        });
      },
      onChange(e: any) {
        console.log(2, e);
      },
      onBeforeChange(e: any) {
        console.log(1, e);
      },
      onTrigger() {
        disabled.value = !disabled.value;
      },
    };
  },
};
</script>

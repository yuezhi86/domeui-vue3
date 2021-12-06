<template>
  <section class="demo-group">
    <div class="item-group">
      <DeInput
        v-model="c"
        placeholder="请输入..."
        size="xsmall"
        :counter="false"
      />
      <DeInput
        v-model="c"
        placeholder="请输入..."
        size="small"
        :clearable="false"
      />
      <DeInput v-model="c" placeholder="请输入..." prefix="户型" suffix="室" />
      <DeInput v-model="a" placeholder="请输入..." readonly />
      <DeInput v-model="b" placeholder="请输入..." disabled />
      <DeInput
        v-model.uppercase="c"
        placeholder="请输入..."
        init-uppercase
        size="large"
        maxlength="0"
        @change="onChange"
        @change:native="onChangeNative"
      />
      <DeInput v-model="c" placeholder="请输入..." size="xlarge" long />
      <DeInput
        v-model="c"
        placeholder="请输入..."
        type="textarea"
        maxlength="300"
        resize="vertical"
        long
      />
    </div>
  </section>
</template>

<script lang="ts">
import {ref} from 'vue';
import {DeInput} from '@/packages';
export default {
  components: {
    DeInput,
  },
  setup() {
    const a = ref(12345);
    const b = ref('zhanghaibin');
    const c = ref('abc');
    return {
      a,
      b,
      c,
      onChange(value: string) {
        console.log(value);
      },
      onChangeNative(e: any) {
        console.log(e);
      },
    };
  },
};
</script>

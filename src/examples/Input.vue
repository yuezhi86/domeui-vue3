<template>
  <section class="demo-group">
    <div class="item-group">
      <DeInput v-model="c" placeholder="请输入..." size="xsmall" />
      <DeInput placeholder="请输入..." size="small" />
      <DeInput placeholder="请输入..." />
      <DeInput v-model="a" placeholder="请输入..." readonly />
      <DeInput v-model="b" placeholder="请输入..." disabled />
      <DeInput v-model="c" placeholder="请输入..." size="large" />
      <DeInput placeholder="请输入..." size="xlarge" style="width: 300px" />
      <DeInput placeholder="请输入..." type="textarea" />
    </div>
  </section>
</template>

<script>
import {ref} from 'vue';
import {DeInput} from '@/packages';
export default {
  components: {
    DeInput,
  },
  setup() {
    const a = ref(12345);
    const b = ref('zhanghaibin');
    const c = ref('');
    return {
      a,
      b,
      c,
    };
  },
};
</script>

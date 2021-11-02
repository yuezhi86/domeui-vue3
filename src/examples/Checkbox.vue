<template>
  <section class="demo-group">
    <div class="item-group">
      <DeCheckbox v-model="a" />
    </div>
  </section>
</template>

<script>
import {ref} from 'vue';
import {DeCheckbox} from '@/packages';
export default {
  components: {
    DeCheckbox,
  },
  setup() {
    return {
      a: ref([]),
      b: ref(true),
      c: ref(false),
    };
  },
};
</script>

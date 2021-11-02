<template>
  <section class="demo-group">
    <div class="item-group">
      <DeCheckbox
        v-model="b"
        html-type="radio"
        label="苹果"
        value="apple"
        radio-optional
      />
      <DeCheckbox html-type="checkbox" label="香蕉" value="banana" />
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
      b: ref('apple'),
      c: ref(''),
    };
  },
};
</script>

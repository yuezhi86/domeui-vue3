<template>
  <section class="demo-group">
    <div class="item-group">
      <DeCheckbox
        v-model="b"
        html-type="radio"
        label="苹果"
        value="apple"
        radio-optional
        @onBeforeChange="onBeforeChange"
        @onChange="onChange"
      />
      <DeCheckbox
        v-model="c"
        v-model:indeterminate="indeterminate"
        html-type="checkbox"
        label="香蕉"
        value="banana"
        @onBeforeChange="onBeforeChange"
        @onChange="onChange"
      />
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
      b: ref(''),
      c: ref(''),
      indeterminate: ref(false),
      onChange(e) {
        console.log(2, e);
      },
      onBeforeChange(e) {
        console.log(1, e);
      },
    };
  },
};
</script>

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
    <div class="item-group">
      <DeCheckboxGroup v-model="a" name="a" :disabled="disabled" vertical>
        <DeCheckbox value="apple">苹果</DeCheckbox>
        <DeCheckbox value="banana">香蕉</DeCheckbox>
      </DeCheckboxGroup>
    </div>
    <DeButton @click="onTrigger">{{ disabled ? '启用' : '禁用' }}</DeButton>
  </section>
</template>

<script>
import {ref} from 'vue';
import {DeCheckbox, DeCheckboxGroup, DeButton} from '@/packages';
export default {
  components: {
    DeCheckbox,
    DeCheckboxGroup,
    DeButton,
  },
  setup() {
    const disabled = ref(false);
    return {
      a: ref(['apple']),
      b: ref(''),
      c: ref(''),
      disabled,
      indeterminate: ref(false),
      onChange(e) {
        console.log(2, e);
      },
      onBeforeChange(e) {
        console.log(1, e);
      },
      onTrigger() {
        disabled.value = !disabled.value;
      },
    };
  },
};
</script>

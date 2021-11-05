<template>
  <section class="demo-group">
    <div class="item-group">
      <h3>单个使用</h3>
      <DeCheckbox
        v-model="b"
        html-type="radio"
        label="可取消的单选按钮"
        radio-optional
        name="b"
        :disabled="disabled"
        @onBeforeChange="onBeforeChange"
        @onChange="onChange"
      />
      <DeCheckbox
        v-model="c"
        v-model:indeterminate="indeterminate"
        html-type="checkbox"
        label="香蕉"
        name="c"
        :true-value="1"
        :false-value="0"
        :disabled="disabled"
        @onBeforeChange="onBeforeChange"
        @onChange="onChange"
      />
    </div>
    <div class="item-group">
      <h3>横向组</h3>
      <DeCheckboxGroup
        v-model="a"
        name="a"
        html-type="radio"
        :disabled="disabled"
      >
        <DeCheckbox true-value="apple">苹果</DeCheckbox>
        <DeCheckbox true-value="banana">香蕉</DeCheckbox>
        <DeCheckbox true-value="pear">梨</DeCheckbox>
      </DeCheckboxGroup>
    </div>
    <div class="item-group">
      <h3>纵向组</h3>
      <DeCheckboxGroup
        v-model="d"
        name="d"
        html-type="checkbox"
        :disabled="disabled"
        vertical
        radio-optional
      >
        <DeCheckbox true-value="apple">苹果</DeCheckbox>
        <DeCheckbox true-value="banana">香蕉</DeCheckbox>
        <DeCheckbox true-value="pear">梨</DeCheckbox>
      </DeCheckboxGroup>
    </div>
    <DeButton @click="onTrigger">{{ disabled ? '启用' : '禁用' }}</DeButton>
  </section>
</template>

<script lang="ts">
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
      a: ref('apple'),
      b: ref(''),
      c: ref(''),
      d: ref(['apple', 'pear']),
      disabled,
      indeterminate: ref(false),
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

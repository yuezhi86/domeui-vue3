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
        v-model="b"
        name="b"
        type="success"
        :disabled="disabled"
        @onChange="onChange"
      />
    </div>
    <!--    <div class="item-group">-->
    <!--      <h3>横向组</h3>-->
    <!--      <DeCheckboxGroup-->
    <!--        v-model="a"-->
    <!--        name="a"-->
    <!--        html-type="radio"-->
    <!--        :disabled="disabled"-->
    <!--      >-->
    <!--        <DeCheckbox true-value="apple">苹果</DeCheckbox>-->
    <!--        <DeCheckbox true-value="banana">香蕉</DeCheckbox>-->
    <!--        <DeCheckbox true-value="pear">梨</DeCheckbox>-->
    <!--      </DeCheckboxGroup>-->
    <!--    </div>-->
    <!--    <div class="item-group">-->
    <!--      <h3>纵向组</h3>-->
    <!--      <DeCheckboxGroup-->
    <!--        v-model="d"-->
    <!--        name="d"-->
    <!--        html-type="checkbox"-->
    <!--        :disabled="disabled"-->
    <!--        vertical-->
    <!--        radio-optional-->
    <!--      >-->
    <!--        <DeCheckbox true-value="apple">苹果</DeCheckbox>-->
    <!--        <DeCheckbox true-value="banana">香蕉</DeCheckbox>-->
    <!--        <DeCheckbox true-value="pear">梨</DeCheckbox>-->
    <!--      </DeCheckboxGroup>-->
    <!--    </div>-->
    <DeButton @click="onTrigger">{{ disabled ? '启用' : '禁用' }}</DeButton>
  </section>
</template>

<script>
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
      a: ref('apple'),
      b: ref(''),
      c: ref(''),
      d: ref(['apple', 'pear']),
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

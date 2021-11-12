<template>
  <section class="demo-group">
    <div class="item-group">
      <DeIcon name="arrow-down" />
      <DeIcon name="arrow-down" size="40" color="red" />
    </div>
  </section>
</template>

<script lang="ts">
import {DeIcon} from '@/packages';

export default {
  components: {
    DeIcon,
  },
};
</script>

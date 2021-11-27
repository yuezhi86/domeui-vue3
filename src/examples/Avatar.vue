<template>
  <section class="demo-group">
    <div class="item-group">
      <DeAvatar src="a.png" />
      <DeAvatar src="a.png" size="40" />
      <DeAvatar src="a.png" size="80" radius="10px" />
    </div>
  </section>
</template>

<script lang="ts">
import {DeAvatar} from '@/packages';

export default {
  components: {
    DeAvatar,
  },
};
</script>

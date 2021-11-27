<template>
  <section class="demo-group">
    <DeImage
      src="a.png"
      width="200"
      height="200"
      :load-params="{
        errorImgWidth: '60px',
        errorImgHeight: '60px',
      }"
      style="margin-right: 20px"
    />
    <DeImage
      src="https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg"
      width="200"
      height="200"
    />
  </section>
</template>

<script lang="ts">
import {DeImage} from '@/packages';

export default {
  components: {
    DeImage,
  },
};
</script>

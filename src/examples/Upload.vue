<template>
  <section class="demo-group">
    <div class="item-group">
      <DeUpload :upload-handle="uploadHandle" multiple />
    </div>
  </section>
</template>

<script lang="ts">
import {DeUpload} from '@/packages';
import {
  UploadFileItem,
  UploadDoneFn,
} from '@/packages/components/upload/upload.vue';

export default {
  components: {
    DeUpload,
  },
  setup() {
    return {
      uploadHandle(files: UploadFileItem[], done: UploadDoneFn) {
        console.log(files, done);
      },
    };
  },
};
</script>

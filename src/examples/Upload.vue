<template>
  <section class="demo-group">
    <div class="item-group">
      <DeUpload :upload-handle="uploadHandle" multiple />
      <DeUpload
        :upload-handle="uploadHandle"
        multiple
        sortable
        :max-count="10"
        :default-file-list="imgList"
      />
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
    const imgList = [
      {
        value:
          'https://static.rjc-zfzl.com/rjc/file/20220602/2d6cdbad80b54c0780a8aee50e653905',
      },
      {
        value:
          'https://static.rjc-zfzl.com/rjc/file/20220602/f5e13b28c2ea4499ad83aaf0153e541f',
      },
      {
        value:
          'https://static.rjc-zfzl.com/rjc/file/20220602/f5e13b28c2ea4499ad83aaf0153e5412',
      },
    ];

    return {
      imgList,
      uploadHandle(files: UploadFileItem[], done: UploadDoneFn) {
        console.log(files, done);
      },
    };
  },
};
</script>

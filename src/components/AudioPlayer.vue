<template>
  <audio ref="player" controls="controls">
    <source :src="fileUrl" type="audio/mpeg" />
    Тег audio не поддерживается вашим браузером.
    <a :href="fileUrl" download>Скачайте музыку.</a>
  </audio>
</template>

<script>
export default {
  mounted: function() {
    this.$watch('fileUrl', () => {
      this.$refs.player.load();
    });
  },
  props: {
    fileUrl: {
      required: true,
      type: String,
    },
  },
};
</script>

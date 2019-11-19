<template>
  <div id="app" class="container">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  async created() {
    await this.getAppData();
  },
  methods: {
    ...mapActions(['getAppData']),
  },
};
</script>

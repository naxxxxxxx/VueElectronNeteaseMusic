<template>
    <div class="songItems" id="offical">
        <List v-for="item in songs" :key="item.key" :music="item" />
    </div>
</template>

<script>
import List from "./List";
export default {
  name: "offical",
  components: {
    List
  },
  data() {
    return {
      songs: [3, 0, 2, 1, 4]
    };
  }
};
</script>
<style scoped>
.songItems {
  zoom: 1;
}
.songItems::after,
.songItems::before {
  content: "";
  display: table;
}
.songItems::after {
  clear: both;
}
</style>

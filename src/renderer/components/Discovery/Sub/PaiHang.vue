<template>
  <div class="subItem" id="paiHang">
      <div class="ph-title">
        <router-link to="/main/discovery/paihang/offical" tag="label">官方榜</router-link>
        <router-link to="/main/discovery/paihang/world" tag="label">全球榜</router-link>
      </div>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "paiHang"
};
</script>

<style>
#paiHang .ph-title {
  border-bottom: 1px solid #ddd;
  font-weight: bold;
  zoom: 1;
  margin-bottom: 20px;
}
#paiHang .ph-title::after,
#paiHang .ph-title::before{
  content:'';
  display: table;
}
#paiHang .ph-title::after{
  clear: both;
}
#paiHang .ph-title label {
  margin-right: 20px;
  line-height: 28px;
  display: block;
  float: left;
}
#paiHang .ph-title label.router-link-active {
  font-size: 20px;
  color: #333;
  border-bottom: 3px solid #ddd;
}
</style>

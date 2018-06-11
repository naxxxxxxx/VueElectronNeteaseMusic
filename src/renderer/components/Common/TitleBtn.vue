<template>
  <div class="titlebtn" v-bind:style="style" v-on:click="click">
    <span v-bind:class="iconClass"></span>
  </div>
</template>

<script>
const { ipcRenderer: ipc } = require("electron");
const style = {
  min: {
    backgroundColor: "rgb(255,190,0)",
    left: "28px"
  },
  max: {
    backgroundColor: "rgb(0,214,70)",
    left: "48px"
  },
  close: {
    backgroundColor: "rgb(255,71,70)",
    left: "8px"
  }
};
export default {
  name: "Titlebtn",
  props: ["type"],
  computed: {
    style() {
      return style[this.type];
    },
    iconClass() {
      return this.type;
    }
  },
  methods: {
    click() {
      ipc.send(this.type);
    }
  }
};
</script>

<style>
.titlebtn {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 12px;
  top: 5px;
  bottom: 0;
  -webkit-app-region: no-drag;
  color: #fff;
  line-height: 14px;
  text-align: center;
  cursor: pointer;
}
.titlebtn span {
  position: relative;
  width: 12px;
  height: 12px;
  display: block;
  opacity: 0;
}
.titlebtn span::after,
.titlebtn span::before {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  display: block;
  background-color: rgba(0, 0, 0, 0.4);
  content: "";
}
.titlebtn span.close {
  transform-origin: 10% 140% 0;
  -webkit-transform: translate(-50%, -50%) rotate(45deg);
  transform: translate(-50%, -50%) rotate(45deg);
}
.titlebtn span.close::before {
  width: 2px;
  height: 8px;
}
.titlebtn span.close::after {
  width: 8px;
  height: 2px;
}

.titlebtn span.min::before {
  width: 8px;
  height: 2px;
}

.titlebtn span.max::before {
  width: 2px;
  height: 8px;
}
.titlebtn span.max::after {
  width: 8px;
  height: 2px;
}
.btnController {
  width: 80px;
  position: relative;
}
.btnController:hover span {
  opacity: 1;
}
</style>

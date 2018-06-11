import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const mainUi = require('@/components/Common/Main//Index').default
const discovery = require('@/components/Discovery/Index').default
const discoveryTuiJian = require('@/components/Discovery/Sub/TuiJian').default
const discoveryPaiHang = require('@/components/Discovery/Sub/PaiHang.vue').default
const discoveryPaiHangOffical = require('@/components/Discovery/Sub/PaiHangSub/Offical').default
const discoveryPaiHangWorld = require('@/components/Discovery/Sub/PaiHangSub/World').default

const discoveryGeDan = require('@/components/Discovery/Sub/GeDan').default

const discoveryZhuBo = require('@/components/Discovery/Sub/ZhuBo').default
const discoveryZuiXin = require('@/components/Discovery/Sub/ZuiXin').default
const privates = require('@/components/Private/Index').default
const movie = require('@/components/Movie/Index').default
const friends = require('@/components/Friends/Index').default
const login = require('@/components/Common/Login/Index').default

const songList = require('@/components/Common/SongList/Songs').default
const songListSubList = require('@/components/Common/SongList/Sub/List').default
const songListSubComment = require('@/components/Common/SongList/Sub/Comment').default
const songListSubCollector = require('@/components/Common/SongList/Sub/Collector').default

const paths = [{
    path: '/main',
    name: 'main',
    component: mainUi,
    children: [{
      path: '/main/discovery',
      name: 'discovery',
      component: discovery,
      children: [{
        name: 'tuijian',
        path: '/main/discovery/tuijian',
        component: discoveryTuiJian
      }, {
        name: 'tuijian',
        path: '',
        redirect: '/main/discovery/tuijian'
      }, {
        name: 'paihang',
        path: '/main/discovery/paihang',
        component: discoveryPaiHang,
        children: [{
          name: 'offical',
          path: '/main/discovery/paihang/offical',
          component: discoveryPaiHangOffical
        }, {
          name: 'world',
          path: '/main/discovery/paihang/world',
          component: discoveryPaiHangWorld
        }, {
          path: '',
          redirect: '/main/discovery/paihang/offical'
        }]
      }, {
        name: 'gedan',
        path: '/main/discovery/gedan/:tag',
        component: discoveryGeDan
      }, {
        name: 'zhubo',
        path: '/main/discovery/zhubo',
        component: discoveryZhuBo
      }, {
        name: 'zuixin',
        path: '/main/discovery/zuixin',
        component: discoveryZuiXin
      }, {
        path: '/main/discovery/gedan/',
        redirect: '/main/discovery/gedan/0'
      }]
    }, {
      path: '/main/songlist/:id',
      name: 'songlist',
      component: songList,
      children: [{
        path: '/main/songlist/:id/list',
        name: 'list',
        component: songListSubList,
      }, {
        path: '/main/songlist/:id/comment',
        name: 'comment',
        component: songListSubComment,
      }, {
        path: '/main/songlist/:id/collector',
        name: 'collector',
        component: songListSubCollector,
      }, {
        name: 'list',
        path: '',
        redirect: '/main/songlist/:id/list'
      }]
    }, {
      path: '/main/private',
      name: 'private',
      component: privates
    }, {
      path: '/main/movie',
      name: 'movie',
      component: movie
    }, {
      path: '/main/friends',
      name: 'friends',
      component: friends
    }, {
      path: '',
      redirect: '/main/discovery'
    }]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/',
    redirect: '/main'
  }, {
    path: '',
    redirect: '/main'
  }
]


export default new Router({
  routes: paths
})
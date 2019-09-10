<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          :style="$route.meta.hasBackButton ? '' : 'visibility:hidden;'"
          :icon="$route.meta.hasBackButton ? 'ion-ios-arrow-back' : ''"
          round flat dense
          @click="$route.meta.hasBackButton && $router.go(-1)"/>
        
        <q-toolbar-title class="text-center">
          <strong>{{ $route.meta.title }}</strong>
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          @click="rightDrawerOpen = !rightDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="fas fa-bars" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      bordered
      content-class="bg-grey-2">
      <q-list class="text-grey-8">
        <q-item-label header overline class="text-uppercase">Menu</q-item-label>
        
        <q-item clickable to="/inicio">
          <q-item-section avatar>
            <q-icon name="ion-ios-home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Início</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/ranking">
          <q-item-section avatar>
            <q-icon name="ion-ios-trophy" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Ranking</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/palpites">
          <q-item-section avatar>
            <q-icon name="ion-ios-clipboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Palpites</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/grupos">
          <q-item-section avatar>
            <q-icon name="ion-ios-people" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Grupos</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/regulamento">
          <q-item-section avatar>
            <q-icon name="ion-ios-information-circle-outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Regulamento</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/conta">
          <q-item-section avatar>
            <q-icon name="ion-ios-contact" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Conta</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <transition
        appear
        :enter-active-class="`animated animated-delay ${transition.enter}`"
        :leave-active-class="`animated ${transition.leave}`">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MainLayout',
  data () {
    return {
      rightDrawerOpen: this.$q.platform.is.desktop,
      transition: {enter: 'fadeInUp', leave: 'fadeOutUp'}
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      if (toDepth < fromDepth) {
        this.transition = {enter: 'fadeInLeft', leave: 'fadeOutRight'};
      } else if (toDepth > fromDepth) {
        this.transition = {enter: 'fadeInRight', leave: 'fadeOutLeft'};
      } else {
        this.transition = {enter: 'fadeIn', leave: 'fadeOut'};
      }
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
.animated {
  animation-duration: 0.2s !important;
  animation-fill-mode: both;
}
.animated-delay {
  animation-delay: 0.2s;
}
</style>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-red" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="$route.name == 'Inicio' ? leftDrawerOpen = !leftDrawerOpen : $router.push('inicio')"
          aria-label="Menu"
        >
          <q-icon :name="$route.name == 'Inicio' ? 'fas fa-bars' : 'fas fa-arrow-left'" />
        </q-btn>

        <q-toolbar-title class="text-center">
          <strong>{{ $route.name }}</strong>
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          to="/carrinho"
          aria-label="Menu"
        >
          <q-icon name="fas fa-shopping-cart" />
        </q-btn>
        <!-- <q-btn
          :style="$route.meta.hasBackButton ? '' : 'visibility:hidden;'"
          :icon="$route.meta.hasBackButton ? 'ion-ios-arrow-back' : ''"
          round flat dense
          @click="$route.meta.hasBackButton && $router.go(-1)"/> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      side="left"
      bordered
      content-class="bg-grey-2">
      <q-list class="text-grey-8">
        <q-item-label header overline class="text-uppercase">Menu</q-item-label>

        <q-item clickable to="/inicio" active-class="text-red">
          <q-item-section avatar>
            <q-icon name="ion-ios-home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Início</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/carrinho" active-class="text-red">
          <q-item-section avatar>
            <q-icon name="ion-ios-cart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Carrinho</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/conta" active-class="text-red">
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
      leftDrawerOpen: this.$q.platform.is.desktop,
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

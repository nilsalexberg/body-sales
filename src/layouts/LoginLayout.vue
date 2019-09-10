<template>
  <q-layout view="lHh Lpr lFf">
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
export default {
  data () {
    return {
      transition: {enter: 'fadeInUp', leave: 'fadeOutUp'}
    }
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      if (toDepth < fromDepth) {
        this.transition = {enter: 'fadeInLeft', leave: 'fadeOutRight'};
      } else {
        this.transition = {enter: 'fadeInRight', leave: 'fadeOutLeft'};
      }
    }
  },
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
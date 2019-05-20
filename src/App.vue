<template>
  <div>
    <!-- Pages content -->
    <div class="container">
      <transition name="fade" mode="out-in">
        <!-- View injected here -->
        <router-view />
        <!--/ View injected here -->
      </transition>
    </div>
    <!--/ Pages content -->
  </div>
</template>

<script>
import './style.css'

export default {
  data() {
    return {}
  }
}
</script>

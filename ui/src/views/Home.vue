<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container">
        <app-title></app-title>
      </div>
    </div>
  </section>
</template>

<script>
import AppTitle from "@/components/AppTitle.vue";
export default {
  name: "home",
  components: {
    "app-title": AppTitle
  }
};
</script>

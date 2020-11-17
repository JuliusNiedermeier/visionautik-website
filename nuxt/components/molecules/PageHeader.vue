<template>
  <div class="va-mo--PageHeader">
    <div class="va-mo--PageHeader__background">
      <img class="va-mo--PageHeader__background__image" :src="imageUrl" />
    </div>
    <div class="va-mo--PageHeader__overlay">
      <div class="va-mo--PageHeader__overlay__body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'va-mo--PageHeader',
  props: ['imageUrl'],
}
</script>

<style lang="scss">
.va-mo--PageHeader {
  position: relative;
  height: 100%;

  &__background {
    height: 100%;

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    @include background-gradient(90deg, 'dark-transparent');
    color: white;

    @include desktops {
      padding-right: $spacing__macro--xl + $spacing__micro--xl;
    }

    &__body {
      height: 100%;
      @include page-margin;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
  }
}
</style>
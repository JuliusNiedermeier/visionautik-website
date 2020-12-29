<template>
  <va-at--PageSection padding="both" class="va-ps--Story">
    <div class="va-ps--Story__header">
      <h2 class="va-ps--Story__header__heading">{{ heading }}</h2>
    </div>
    <div class="va-ps--Story__main">
      <div class="va-ps--Story__main__text">
        <h4>{{ subHeading }}</h4>
        <p>{{ text }}</p>
      </div>
      <div class="va-ps--Story__main__timeline"></div>
    </div>
    <va-at--Button>Mehr erfahren</va-at--Button>
  </va-at--PageSection>
</template>

<script>
import PageSection from '@/components/atoms/PageSection.vue'
import Button from '@/components/atoms/Button.vue'
export default {
  name: 'va-ps--Story',
  components: { 'va-at--Button': Button, 'va-at--PageSection': PageSection },
  props: ['heading', 'subHeading', 'text'],
}
</script>

<style lang="scss" scoped>
.va-ps--Story {
  &__header {
    @include background-gradient(90deg, 'blue');
    padding: $spacing--micro--xl;
    margin-bottom: $spacing--macro--xs;

    &__heading {
      color: white;
    }
  }

  &__main {
    display: flex;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        $color--grey--light 100%
      );
      pointer-events: none;
    }
  }
}
</style>
<template>
  <div class="va-sl--CallToAction">
    <div class="va-sl--CallToAction__content">
      <h4 class="va-sl--CallToAction__content__heading">
        {{ slice.primary.heading }}
      </h4>
      <p class="va-sl--CallToAction__content__body">
        {{ slice.primary.text }}
      </p>
    </div>
    <div class="va-sl--CallToAction__actions">
      <va-at--Button
        class="va-sl--CallToAction__actions__button"
        v-for="(action, index) of slice.items"
        :key="index"
        :to="action.link.url"
        :appearance="action.emphasized ? 'dark' : 'light'"
        grow
        >{{ action.label }}</va-at--Button
      >
    </div>
  </div>
</template>

<script>
import Button from '@/components/atoms/Button.vue'
export default {
  name: 'va-sl--CallToAction',
  components: { 'va-at--Button': Button },
  props: { slice: Object },
}
</script>

<style lang="scss" scoped>
.va-sl--CallToAction {
  background-color: $color--red--base;
  padding: $spacing--micro--xl;
  display: flex;
  flex-direction: column;

  @include desktops {
    flex-direction: row;
    align-items: center;
  }

  &__content {
    margin-bottom: $spacing--micro--xl;

    @include desktops {
      margin-bottom: 0;
      margin-right: $spacing--micro--xl;
    }

    &__heading {
      margin-top: 0;
      color: $color--grey--dark;
    }

    &__body {
      margin-bottom: 0;
      color: $color--grey--dark;
    }
  }

  &__actions {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    &__button + &__button {
      margin-top: $spacing--micro--xl;
    }
  }
}
</style>
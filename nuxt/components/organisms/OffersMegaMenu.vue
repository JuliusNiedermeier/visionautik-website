<template>
  <div class="va-or--OffersMegaMenu">
    <va-at--Button
      class="va-or--OffersMegaMenu__section"
      v-for="(section, index) of sections"
      :key="index"
      :to="section.to"
      :appearance="section.appearance || 'dark'"
      iconName="chevron-right"
      explode
    >
      <small class="va-or--OffersMegaMenu__section__heading">{{
        section.heading
      }}</small>
      <br />
      <small class="va-or--OffersMegaMenu__section__info">
        {{ section.info }}
      </small>
    </va-at--Button>
  </div>
</template>

<script>
import MegaMenuLink from '@/components/molecules/MegaMenuLink'
import Button from '@/components/atoms/Button.vue'
export default {
  name: 'va-or--OffersMegaMenu',
  components: { 'va-mo--MegaMenuLink': MegaMenuLink, 'va-at--Button': Button },

  computed: {
    sections() {
      return [
        {
          heading: this.$t('layout.header.offersMegaMenu.allOffers.heading'),
          info: this.$t('layout.header.offersMegaMenu.allOffers.info'),
          to: { name: 'offers' },
        },
        {
          heading: this.$t('layout.header.offersMegaMenu.nextEvents.heading'),
          info: this.$t('layout.header.offersMegaMenu.nextEvents.info'),
          to: {
            name: 'offers',
            query: { exclude: ['course', 'book', 'merchandise', 'download'] },
          },
        },
        {
          heading: this.$t('layout.header.offersMegaMenu.archive.heading'),
          info: this.$t('layout.header.offersMegaMenu.archive.info'),
          to: { name: 'archive' },
          appearance: 'reduced',
        },
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.va-or--OffersMegaMenu {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: strech;

  @include desktops {
    flex-direction: row;
    justify-content: flex-start;
  }

  &__section {
    flex: 1;
    text-align: left;
    padding: $spacing--micro--xl;

    & + & {
      margin-top: $spacing--micro--xl;

      @include desktops {
        margin-top: 0;
        margin-left: $spacing--micro--xl;
      }
    }

    &__info {
      font-weight: normal;
      text-transform: none;
    }
  }
}
</style>
<template>
  <div class="va-or--OffersMegaMenu">
    <div class="va-or--OffersMegaMenu__section">
      <va-mo--MegaMenuLink
        to="/offers"
        :label="$t('global.targetGroups.changemakers.for')"
      />
      <va-mo--MegaMenuLink
        to="/offers"
        :label="$t('global.targetGroups.businesses.for')"
      />
      <va-mo--MegaMenuLink
        to="/offers"
        :label="$t('global.targetGroups.facilitators.for')"
      />
    </div>
    <div class="va-or--OffersMegaMenu__section"></div>
    <div class="va-or--OffersMegaMenu__section"></div>
  </div>
</template>

<script>
import MegaMenuLink from '@/components/molecules/MegaMenuLink'
export default {
  name: 'va-or--OffersMegaMenu',
  components: { 'va-mo--MegaMenuLink': MegaMenuLink },
}
</script>

<style lang="scss" scoped>
.va-or--OffersMegaMenu {
  padding: $spacing__macro--sm 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: strech;

  @include desktops {
    flex-direction: row;
    justify-content: flex-start;
  }

  &__section {
    flex: 1;

    & + & {
      margin-left: $spacing__macro--md;
    }

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;

    > * {
      padding: $spacing__micro--md 0;
    }
  }
}
</style>
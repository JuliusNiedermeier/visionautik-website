<template>
  <va-at--PageSection standout padding="both" class="va-ps--Partner">
    <h2 class="va-ps--Partner__heading">{{ heading }}</h2>
    <p class="va-ps--Partner__text">{{ text }}</p>
    <div
      class="va-ps--Partner__main"
      v-if="memberships.length + partners.length > 0"
    >
      <div
        class="va-ps--Partner__main__column"
        v-for="column of columns"
        :key="column.key"
      >
        <h4>{{ column.heading }}</h4>
        <div class="va-ps--Partner__main__column__list">
          <va-at--Link
            class="va-ps--Partner__main__column__list__organization"
            :class="column.key"
            v-for="(organization, index) of column.items"
            :key="index"
            :to="organization.general__link.url"
            newTab
          >
            <img
              class="va-ps--Partner__main__column__list__organization__logo"
              :src="organization.general__logo.url"
            />
          </va-at--Link>
        </div>
      </div>
    </div>
  </va-at--PageSection>
</template>

<script>
import PageSection from '@/components/atoms/PageSection.vue'
import Link from '@/components/atoms/Link.vue'
export default {
  name: 'va-ps--Partner',
  components: { 'va-at--Link': Link, 'va-at--PageSection': PageSection },
  props: [
    'heading',
    'text',
    'membershipsHeading',
    'partnersHeading',
    'memberships',
    'partners',
  ],
  computed: {
    columns() {
      return [
        {
          heading: this.membershipsHeading,
          items: this.memberships,
          key: 'membership',
        },
        {
          heading: this.partnersHeading,
          items: this.partners,
          key: 'partner',
        },
      ].filter((column) => column.items.length)
    },
  },
}
</script>

<style lang="scss" scoped>
.va-ps--Partner {
  &__main {
    display: flex;
    flex-direction: column;
    margin-top: $spacing--macro--xs;

    @include desktops {
      flex-direction: row;
    }

    &__column {
      @include desktops {
        flex: 1;
      }

      & + & {
        margin-top: $spacing--macro--xs;

        @include desktops {
          margin-top: 0;
          margin-left: $spacing--macro--xs;
        }
      }

      &__list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: $spacing--micro--xl;

        &__organization {
          flex: 1;
          min-width: $spacing--macro--md;
          padding: $spacing--micro--xl;
          background-color: $color--grey--dark;

          &:hover {
            background-color: $color--grey--light;
          }

          &.membership,
          &.partner {
            border-width: $spacing--micro--xs;
            border-style: solid;
          }

          &.membership {
            border-color: $color--blue--base;
          }

          &.partner {
            border-color: $color--red--base;
          }

          &__logo {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      }
    }
  }
}
</style>
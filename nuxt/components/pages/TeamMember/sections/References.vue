<template>
  <div class="va-ps--References">
    <va-at--Button
      class="va-ps--References__website"
      v-if="websiteUrl"
      iconName="language"
      :to="websiteUrl"
      iconPosition="left"
      align="left"
      grow
      big
    >
      <span>{{ websiteLabel }}</span>
      <br />
      <small class="va-ps--References__website__url">{{ websiteUrl }}</small>
    </va-at--Button>
    <va-at--Button
      class="va-ps--References__email"
      v-if="email"
      @click="handleEmailClick"
      iconName="mail"
      iconPosition="left"
      align="left"
      grow
      big
    >
      <span>{{ emailLabel }}</span>
      <br />
      <small class="va-ps--References__email__address">{{ email }}</small>
    </va-at--Button>
    <prismic-embed
      class="va-ps--References__video"
      v-if="videoEmbed"
      :field="videoEmbedField"
    />
  </div>
</template>
    
<script>
import Button from '@/components/atoms/Button.vue'
import { singles } from '@/assets/js/types.js'
export default {
  name: 'va-ps--References',
  components: { 'va-at--Button': Button },
  props: {
    websiteUrl: String,
    email: String,
    videoEmbed: Object | undefined,
  },

  computed: {
    websiteLabel() {
      return this.$t(
        `types.${singles.teamMemberPage.typeName}.references.website`
      )
    },
    emailLabel() {
      return this.$t(
        `types.${singles.teamMemberPage.typeName}.references.email`
      )
    },
    videoEmbedField() {
      return { ...this.videoEmbed, width: '300' }
    },
  },

  methods: {
    handleEmailClick() {
      window.open('mailto:' + this.email)
    },
  },
}
</script>

<style lang="scss" scoped>
.va-ps--References {
  &__website {
    text-align: left;

    &__url {
      font-weight: normal;
      text-transform: none;
    }
  }

  &__email {
    text-align: left;

    &__address {
      font-weight: normal;
      text-transform: none;
    }
  }

  &__website,
  &__email {
    margin-bottom: $spacing--micro--xl;
  }
}
</style>
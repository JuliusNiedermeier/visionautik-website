<template>
  <va-mo--DropDown
    class="va-mo--TeamMember"
    @expanded="$emit('expanded')"
    :collapse="collapse"
  >
    <template slot="header">
      <div class="va-mo--TeamMember__header">
        <img
          class="va-mo--TeamMember__header__image"
          :src="imageUrl"
          width="100"
          height="100"
        />
        <div class="va-mo--TeamMember__header__body">
          <h3 class="va-mo--TeamMember__header__body__name">{{ name }}</h3>
          <small class="va-mo--TeamMember__header__body__occupation">
            {{ occupation }}
          </small>
        </div>
      </div>
    </template>
    <template slot="content">
      <div class="va-mo--TeamMember__content">
        <small class="va-mo--TeamMember__content__excerpt">{{ excerpt }}</small>
        <va-at--Button
          class="va-mo--TeamMember__content__button"
          :to="{ name: 'team-member', params: { uid } }"
          >Zum Profil</va-at--Button
        >
      </div>
    </template>
  </va-mo--DropDown>
</template>

<script>
import DropDown from '@/components/molecules/DropDown.vue'
import Button from '@/components/atoms/Button.vue'
export default {
  name: 'va-mo--TeamMember',
  components: { 'va-mo--DropDown': DropDown, 'va-at--Button': Button },
  props: {
    uid: String,
    imageUrl: String | null,
    name: String | null,
    occupation: String | null,
    excerpt: String | null,
    collapse: Boolean,
  },
}
</script>

<style  lang="scss" scoped>
.va-mo--TeamMember {
  &__header {
    display: flex;
    &__image {
      object-fit: cover;
      margin-right: $spacing--micro--xl;
    }

    &__body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      white-space: nowrap;
      &__name {
        margin-top: 0;
        margin-bottom: $spacing--micro--md;
      }
    }
  }

  &__content {
    padding: $spacing--micro--xl;

    &__excerpt {
      display: block;
      margin-bottom: $spacing--micro--xl;
    }
  }
}
</style>
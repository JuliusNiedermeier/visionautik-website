<template>
  <div class="va-mo--DropDown" :class="{ expanded }">
    <div class="va-mo--DropDown__header" @click="handleHeaderClick()">
      <div class="va-mo--DropDown__header__content"><slot name="header" /></div>
      <div class="va-mo--DropDown__header__icon">
        <va-at--Icon name="chevron-down" />
      </div>
    </div>
    <div class="va-mo--DropDown__content"><slot name="content" /></div>
  </div>
</template>

<script>
import Icon from '@/components/atoms/Icon.vue'
export default {
  name: 'va-mo--DropDown',
  components: { 'va-at--Icon': Icon },
  props: { collapse: Boolean },
  data() {
    return {
      expanded: false,
    }
  },
  watch: {
    collapse(collapse) {
      if (collapse) {
        this.expanded = false
      } else if (collapse === false) {
        this.expanded = true
      }
    },
  },

  methods: {
    handleHeaderClick() {
      this.expanded = !this.expanded
      if (this.expanded) this.$emit('expanded')
    },
  },
}
</script>

<style lang="scss" scoped>
.va-mo--DropDown {
  &__header {
    height: $spacing--macro--sm;
    @include background-gradient(90deg, 'blue');
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;

    &__content {
      margin-right: $spacing--macro--xs;
    }

    &__icon {
      margin-right: $spacing--micro--xl;
      transition: transform $duration--fast ease;
    }
  }

  &__content {
    height: 0;
    overflow: hidden;
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    transition: clip-path $duration--fast ease;
  }

  &.expanded &__header__icon {
    transform: rotate(-180deg);
  }

  &.expanded &__content {
    height: auto;
    background-color: $color--lilac--base;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}
</style>
<template>
  <div class="va-ps--InfoList">
    <h3>{{ heading }}</h3>
    <div
      class="va-ps--InfoList__info"
      v-for="(info, index) of infos"
      :key="index"
    >
      <small>{{ info.text }}</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'va-ps--InfoList',
  props: {
    heading: String,
    infos: Array,
  },
}
</script>

<style lang="scss" scoped>
.va-ps--InfoList {
  &__info {
    padding: $spacing--micro--lg $spacing--micro--xl;
    background-color: $color--lilac--base;
    color: $color--blue--light;

    & + & {
      margin-top: $spacing--micro--xl;
    }
  }
}
</style>
<template>
  <div class="va-at--AirmailStripe" />
</template>

<script>
export default {
  name: 'va-at--AirmailStripe',
}
</script>

<style lang="scss" scoped>
.va-at--AirmailStripe {
  width: 100%;
  height: 10px;
  background-image: linear-gradient(
    135deg,
    $color__red--base 20%,
    white 20%,
    white 40%,
    $color__blue--base 40%,
    $color__blue--base 60%,
    white 60%,
    white 80%,
    $color__red--base 80%
  );
  $height: 20px;
  background-size: $height * 4 $height;
  background-repeat: repeat-x;
}
</style>
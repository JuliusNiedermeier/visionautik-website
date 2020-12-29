<template>
  <div class="va-ps--Vision">
    <h2>{{ heading }}</h2>
    <va-or--SliceContent :slices="slices" />
  </div>
</template>

<script>
import SliceContent from '@/components/organisms/SliceContent'
export default {
  name: 'va-ps--Vision',
  props: ['heading', 'slices'],
  components: { 'va-or--SliceContent': SliceContent },
}
</script>

<style>
</style>
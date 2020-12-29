<template>
  <prismic-rich-text class="va-ps--Vita" :field="richTextField" />
</template>
    
<script>
export default {
  name: 'va-ps--Vita',
  props: { richTextField: Array },
}
</script>
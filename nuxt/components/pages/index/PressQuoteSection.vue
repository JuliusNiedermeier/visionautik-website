<template>
  <div class="press-quote-section">
    <va-carousel class="press-quote-section__carousel" randomize autoplayInterval="5000">
      <li>
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Welt_kompakt_Logo_2015.png" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum id aliquid autem nemo. Laudantium, maiores a sapiente adipisci perspiciatis amet molestias itaque expedita, ex quia mollitia omnis enim illum esse!</p>
      </li>
      <li>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Taz_Logo.svg/2000px-Taz_Logo.svg.png"
        />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum id aliquid autem nemo. Laudantium, maiores a sapiente adipisci perspiciatis amet molestias itaque expedita, ex quia mollitia omnis enim illum esse!</p>
      </li>
    </va-carousel>
  </div>
</template>

<script>
import Carousel from '@/components/global/Carousel'
export default {
  components: { 'va-carousel': Carousel },
}
</script>

<style lang="scss" scoped>
.press-quote-section {
  background-color: $color--grey--light;
  @include fill-screen-width;
  overflow: hidden;
  padding: 10rem 0;

  &__carousel {
    @include page-margin;

    li {
      text-align: center;
      padding-top: 5rem;

      img {
        width: 100%;
        max-width: 300px;
        max-height: 80px;
        object-fit: contain;
      }
    }
  }
}
</style>
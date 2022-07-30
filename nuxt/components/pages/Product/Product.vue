<template>
  <div class="va-pa--Product">
    <!-- <va-mo--PageHeader
      sidebarPadding
      :imageUrl="document.general__featured_image.url"
    >
      <h2>{{ document.general__heading }}</h2>
      <i>{{ document.general__excerpt }}</i>
    </va-mo--PageHeader>

    <va-te--Sidebar>
      <template slot="main">
        <va-or--SliceContent :slices="[...document.content__slices]" />
      </template>
      <template slot="sidebar">
        <va-at--Sidebar>
          <template slot="top">
            <va-mo--SectionAnchorList />
          </template>
          <template slot="bottom">
            <va-mo--AddToCart :product="product" :customFields="customFields" />
          </template>
        </va-at--Sidebar>
      </template>
    </va-te--Sidebar> -->
  </div>
</template>

<script>
import { repeatables } from '@/assets/js/types.js'
import HeaderAndSidebar from '@/components/templates/tertiary/HeaderAndSidebar'
import SidebarTemplate from '@/components/templates/tertiary/Sidebar'
import SliceContent from '@/components/organisms/SliceContent.vue'
import Sidebar from '@/components/atoms/Sidebar.vue'
import SectionAnchorList from '@/components/molecules/SectionAnchorList'
import AddToCart from '@/components/molecules/AddToCart.vue'
import PageHeader from '@/components/molecules/PageHeader'

import formatCmsResultForProp from '@/assets/js/util/formatCmsResultForProp.js'
import queryCms from '@/mixins/util/queryCms.js'
import fetchOneByUid from '@/mixins/usecases/fetchOneByUid.js'

export default {
  name: 'va-pa--Product',
  mixins: [queryCms, fetchOneByUid],
  components: {
    'va-te--HeaderAndSidebar': HeaderAndSidebar,
    'va-te--Sidebar': SidebarTemplate,
    'va-or--SliceContent': SliceContent,
    'va-at--Sidebar': Sidebar,
    'va-mo--SectionAnchorList': SectionAnchorList,
    'va-mo--AddToCart': AddToCart,
    'va-mo--PageHeader': PageHeader,
  },

  data() {
    return {
      document: {
        general__featured_image: { url: null },
        content__slices: [],
        options__slices: [],
      },
    }
  },

  async fetch() {
    const response = this.fetchOneByUid(
      repeatables.product.typeName,
      this.$route.params.uid
    )
    if (!response) return

    this.document = formatCmsResultForProp(response.results[0])
  },

  computed: {
    product() {
      return {
        id: this.document.uid,
        name: this.document.general__heading,
        description: this.document.general__excerpt,
        price: this.document.general__price,
      }
    },

    customFields() {
      return this.document.options__slices.map((slice) => ({
        label: slice.primary.label,
        queryKey: slice.primary.id,
        options: slice.items.map((option) => ({
          id: option.label,
          label: option.label,
          priceDifference: option.price_increase,
        })),
      }))
    },
  },
}
</script>
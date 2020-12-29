import queryCms from '@/mixins/util/queryCms.js'
import { repeatables } from '@/assets/js/types.js'

const getRequiredFieldsByType = function (typeNames) {
  let fields = []
  for (const typeName of typeNames) {
    if (typeName === repeatables.activity.typeName) {
      fields.push(
        typeName + '.general__heading',
        typeName + '.general__featured_image',
        typeName + '.general__excerpt',
        typeName + '.general__category',
        typeName + '.pricing__slices'
      )
    } else if (typeName === repeatables.blogPost.typeName) {
      fields.push(
        typeName + '.general__heading',
        typeName + '.general__featured_image',
        typeName + '.general__excerpt',
        typeName + '.general__category'
      )
    }
  }
  return fields
}

const fetchLatestActivityByCategory = function (category) {
  const typeName = repeatables.activity.typeName
  const predicate = this.$prismic.predicates.at(
    `my.${typeName}.general__category`,
    category
  )
  const options = {
    orderings: '[document.first_publication_date desc]',
    pageSize: 1,
    fetch: getRequiredFieldsByType.apply(this, [[typeName]]),
  }
  return this.queryCms([predicate], options, false)
}

const fetchLatestBlogPost = function () {
  const typeName = repeatables.blogPost.typeName
  const predicate = this.$prismic.predicates.at('document.type', typeName)
  const options = {
    orderings: '[document.first_publication_date desc]',
    pageSize: 1,
    fetch: getRequiredFieldsByType.apply(this, [[typeName]]),
  }
  return this.queryCms([predicate], options, false)
}

const fetchPendingContent = function (fetchedIds, pendingDocumentsCount) {
  const typeNames = [
    repeatables.activity.typeName,
    repeatables.blogPost.typeName,
  ]

  let predicates = [this.$prismic.predicates.any('document.type', typeNames)]
  for (const id of fetchedIds) {
    predicates.push(this.$prismic.predicates.not('document.id', id))
  }

  const options = {
    orderings: '[document.first_publication_date desc]',
    pageSize: pendingDocumentsCount || 1,
    fetch: getRequiredFieldsByType.apply(this, [typeNames]),
  }

  return this.queryCms([predicate], options, false)
}

export default {
  mixins: [queryCms],
  methods: {
    async fetchRecommendations() {
      let responses = await Promise.all([
        fetchLatestActivityByCategory.apply(this, ['course']),
        fetchLatestActivityByCategory.apply(this, ['event']),
        fetchLatestBlogPost.call(this),
      ])

      responses = responses.filter((response) => response.results_size > 0)

      if (responses.length < 3) {
        responses = responses.push(
          await fetchPendingContent.apply(this, [
            responses.map((response) => response.results[0].id),
            3 - responses.length,
          ])
        )
      }

      let results = []
      responses.forEach((response) => {
        response.results?.forEach((result) => results.push(result))
      })

      return results
    },
  },
}

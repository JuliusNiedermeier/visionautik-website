export const pages = {
  index: { typeName: 'index__page' },
  about: { typeName: 'about__page' },
  history: { typeName: 'history__page' },
}
export const collections = {
  offers: { typeName: 'offers__collection' },
  blog: { typeName: 'blog__collection' },
  projects: { typeName: 'projects__collection' },
  archive: { typeName: 'archive__collection' },
}
export const singles = {
  offerPage: { typeName: 'offer__single' },
  productPage: { typeName: 'product__single' },
  blogPostPage: { typeName: 'blog_post__single' },
  projectPage: { typeName: 'project__single' },
  teamMemberPage: { typeName: 'team_member__single' },
}
export const repeatables = {
  offer: { typeName: 'offer__repeatable', categories: ['course', 'event'] },
  course: { typeName: 'course__repeatable' },
  event: { typeName: 'event__repeatable' },
  product: {
    typeName: 'product__repeatable',
    categories: ['book', 'merchandise', 'download'],
  },
  blogPost: { typeName: 'blog_post__repeatable' },
  project: { typeName: 'project__repeatable' },
  teamMember: { typeName: 'team_member__repeatable' },
  organization: { typeName: 'organization__repeatable' },
  pressArticle: { typeName: 'press_article__repeatable' },
  pressQuote: { typeName: 'press_quote__repeatable' },
  testimonial: { typeName: 'testimonial__repeatable' },
}

export default { pages, collections, singles, repeatables }

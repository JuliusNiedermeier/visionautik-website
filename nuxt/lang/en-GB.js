import types from '@/plugins/cms/types'

export default {
  notifications: {
    close: 'close',
    messages: {
      languageNotAvailable: 'Sorry, this page is not fully translated yet!',
    },
  },

  layout: {
    header: {
      navigationMenu: {
        start: 'Home',
        offers: 'Offers',
        about: 'About',
        projects: 'Projects',
        blog: 'Blog',
      },
    },

    footer: {
      address: 'Visionautik e.V., Görlitzer Str. 65, 10997 Berlin',
      contactButton: 'Contact',
      termsOfUse: 'Terms Of Use',
      privacyPolicy: 'Privacy Policy',
      legalNotice: 'Legal notice',
      newsletterForm: {
        namePlaceholder: 'Name',
        emailPlaceholder: 'Your email address',
        gdprConsentLabel: 'I agree with your privacy policy',
        submitButtonLabel: 'Subscribe to our newsletter',
      },
    },
  },

  global: {
    auxiliaries: {
      // for: 'for',
    },
    targetGroups: {
      changemakers: {
        singular: 'changemaker',
        plural: 'changemakers',
        for: 'For changemakers',
      },
      businesses: {
        singular: 'business',
        plural: 'businesses',
        for: 'For businesses',
      },
      facilitators: {
        singular: 'facilitator',
        plural: 'facilitators',
        for: 'For facilitators',
      },
    },
  },

  types: {
    // PAGES
    [types.pages.index.typeName]: {
      coursesSection: {
        allCourses: 'All courses',
        placeholderHeading: 'No suitable course available?',
        placeholderBody:
          'Would you like to be notified when new courses are available?',
        notify: 'Notify',
      },
      ourVisionSection: {
        readMore: 'Read more',
      },
    },

    // COLLECTIONS
    [types.collections.offers.typeName]: {
      searchBarPlaceholder: 'Search...',
      allTargetGroupsLabel: 'All',
      courseResultsPlaceholder: {
        heading: 'No suitable course available?',
        body: 'Would you like to be notified when new courses are available?',
        buttonLabel: 'Notify',
      },
      eventResultsPlaceholder: {
        heading: 'No suitable event available?',
        body:
          'Would you like to be notified as soon as new events are planned?',
        buttonLabel: 'Notify',
      },
      productResultsPlaceholder: {
        heading: 'No suitable product available?',
        body: 'Would you like to be notified when new products are available?',
        buttonLabel: 'Notify',
      },
      resultsPlaceholder: {
        heading: 'No search results...',
        body: 'Would you like to be notified when new offers are available?',
        buttonLabel: 'Notify',
      },
    },
    [types.collections.blog.typeName]: {},
    [types.collections.projects.typeName]: {},
    [types.collections.archive.typeName]: {},

    // SINGLES
    [types.singles.offerPage.typeName]: {},
    [types.singles.productPage.typeName]: {},
    [types.singles.blogPostPage.typeName]: {},
    [types.singles.projectPage.typeName]: {},
    [types.singles.teamMemberPage.typeName]: {},

    // REPEATABLES
    [types.repeatables.offer.typeName]: {
      singular: 'offer',
      plural: 'offers',
      categories: {
        course: {
          singular: 'course',
          plural: 'courses',
        },
        event: {
          singular: 'event',
          plural: 'events',
        },
      },
    },
    [types.repeatables.product.typeName]: {
      singular: 'product',
      plural: 'products',
      categories: {
        book: {
          singular: 'book',
          plural: 'books',
        },
        merchandise: {
          singular: 'merchandise',
          plural: 'merchandise',
        },
        download: {
          singular: 'download',
          plural: 'downloads',
        },
      },
    },
    [types.repeatables.blogPost.typeName]: {
      singular: 'blog post',
      plural: 'blog posts',
    },
    [types.repeatables.teamMember.typeName]: {
      readMore: 'Visit profile',
    },
  },
}

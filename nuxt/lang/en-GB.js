import types from '@/assets/js/types.js'

export default {
  notifications: {
    close: 'close',
    messages: {
      languageNotAvailable: 'Sorry, this page is not fully translated yet!',
      missingContent: 'Some contents of this page are currently not available!',
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
      offersMegaMenu: {
        allOffers: {
          heading: 'All offers',
          info:
            'See all our offers for changemakers, businesses and facilitators.',
        },
        nextEvents: {
          heading: 'Next events',
          info: 'Check out our upcoming events.',
        },
        archive: {
          heading: 'Archive',
          info: "Look at what's been happening lately at Visionautics Academy.",
        },
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

    pageNotFound: {
      heading: 'Page not found',
      body: 'Please make sure that the URL you have entered is correct.',
      buttonLabel: 'back',
    },
  },

  global: {
    placeholders: {
      courses: {
        heading: 'No suitable course available?',
        body: 'Would you like to be notified when new courses are available?',
        buttonLabel: 'Notify',
      },
      events: {
        heading: 'No suitable event available?',
        body:
          'Would you like to be notified as soon as new events are planned?',
        buttonLabel: 'Notify',
      },
      products: {
        heading: 'No suitable product available?',
        body: 'Would you like to be notified when new products are available?',
        buttonLabel: 'Notify',
      },
      searchResults: {
        heading: 'No search results...',
        body: 'Would you like to be notified when new offers are available?',
        buttonLabel: 'Notify',
      },
    },

    auxiliaries: {
      // for: 'for',
    },
    ecommerce: {
      free: 'Free',
      notAvailable: 'Not available',
      addToCart: 'Add to cart',
      toEventbrite: 'Continue with Eventbrite',
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

  slices: {
    pricingPlanList: {
      nextEffectiveDateLabel: 'after',
      notAvailableYet: 'Not available yet',
    },
  },

  types: {
    // PAGES
    [types.pages.index.typeName]: {
      coursesSection: {
        allCourses: 'All courses',
      },
      eventsSection: {
        allEvents: 'All events',
      },
      teamSection: {
        allTeamMembers: 'All members und supporters',
      },
      ourVisionSection: {
        readMore: 'Read more',
      },
    },

    [types.pages.about.typeName]: {
      contactForm: {
        name: 'Name',
        email: 'Your email address',
        subject: 'Subject',
        message: 'Your message...',
        submit: 'send email',
        successMessage: 'Thanks! We got your message.',
        errorMessage:
          'Something went wrong while sending your message! Please try again later.',
      },
    },

    // COLLECTIONS
    [types.collections.offers.typeName]: {
      searchBarPlaceholder: 'Search...',
      allTargetGroupsLabel: 'All',
    },
    [types.collections.blog.typeName]: {},
    [types.collections.projects.typeName]: {},
    [types.collections.archive.typeName]: {},

    // SINGLES
    [types.singles.offerPage.typeName]: {},
    [types.singles.productPage.typeName]: {},
    [types.singles.blogPostPage.typeName]: {},
    [types.singles.projectPage.typeName]: {},
    [types.singles.teamMemberPage.typeName]: {
      references: {
        website: 'website',
        email: 'email',
      },
    },

    // REPEATABLES
    [types.repeatables.offer.typeName]: {
      label: 'offer | offers | {count} offers',
      categories: {
        course: 'course | courses | {count} courses',
        event: 'event | events | {count} events',
      },
      choosePricingPlan: 'Choose a pricing plan',
    },
    [types.repeatables.product.typeName]: {
      label: 'product | products | {count} products',
      categories: {
        book: 'book | books | {count} books',
        merchandise: 'merch | merch | {count} merch',
        download: 'download | downloads | {count} downloads',
      },
    },
    [types.repeatables.blogPost.typeName]:
      'blog post | blog posts | {count} blog posts',
    [types.repeatables.teamMember.typeName]: {
      readMore: 'Visit profile',
    },
  },
}

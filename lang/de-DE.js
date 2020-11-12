import types from '@/plugins/api/types'

export default {
  notifications: {
    close: 'Schließen',
    messages: {
      languageNotAvailable:
        'Es tut uns leid, diese Seite ist noch nicht vollständig übersetzt!',
    },
  },

  layout: {
    header: {
      navigationMenu: {
        start: 'Start',
        offers: 'Angebote',
        about: 'Über uns',
        projects: 'Projekte',
        blog: 'Blog',
      },
    },

    footer: {
      address: 'Visionautik e.V., Görlitzer Str. 65, 10997 Berlin',
      contactButton: 'Kontakt',
      termsOfUse: 'Nutzungsbedingungen',
      privacyPolicy: 'Datenschutz',
      legalNotice: 'Impressum',
      newsletterForm: {
        namePlaceholder: 'Name',
        emailPlaceholder: 'Deine Email-Adresse',
        gdprConsentLabel: 'Ich bin mit dem Datenschutz einverstanden.',
        submitButtonLabel: 'Newsletter abonieren',
      },
    },
  },

  global: {
    auxiliaries: {
      // for: 'for',
    },
    targetGroups: {
      changemakers: {
        singular: 'Changemaker',
        plural: 'Changemakers',
        for: 'Für Changemaker',
      },
      businesses: {
        singular: 'Unternehmen',
        plural: 'Unternehmen',
        for: 'Für Unternehmen',
      },
      facilitators: {
        singular: 'Prozessbegleiter',
        plural: 'Prozessbegleiter',
        for: 'Für Prozessbegleiter',
      },
    },
  },

  types: {
    // PAGES
    [types.pages.index.typeName]: {
      coursesSection: {
        allCourses: 'Alle Kurse',
        placeholderHeading: 'Kein passender Kurs dabei?',
        placeholderBody:
          'Wir benachrichtigen dich gerne sobald neue Kurse verfügbar sind"!',
        notify: 'Benachrichtigen',
      },
      ourVisionSection: {
        readMore: 'Mehr erfahren',
      },
    },

    // COLLECTIONS
    [types.collections.offers.typeName]: {
      searchBarPlaceholder: 'Suchen...',
      allTargetGroupsLabel: 'Alle',
      courseResultsPlaceholder: {
        heading: 'Kein passender Kurs dabei?',
        body:
          'Wir benachrichtigen dich gerne sobald neue Kurse verfügbar sind!',
        buttonLabel: 'Benachrichtigen',
      },
      eventResultsPlaceholder: {
        heading: 'Kein passendes Event dabei?',
        body: 'Wir benachrichtigen dich gerne sobald neue Events geplant sind!',
        buttonLabel: 'Benachrichtigen',
      },
      productResultsPlaceholder: {
        heading: 'Kein passendes Produkt dabei?',
        body:
          'Wir benachrichtigen dich gerne sobald neue Produkte verfügbar sind!',
        buttonLabel: 'Benachrichtigen',
      },
      resultsPlaceholder: {
        heading: 'Deine Suche ergab keine Ergebnisse...',
        body:
          'Wir benachrichtigen dich aber gerne sobald neue Angebote verfügbar sind!',
        buttonLabel: 'Benachrichtigen',
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
      singular: 'Angebot',
      plural: 'Angebote',
      categories: {
        course: {
          singular: 'Kurs',
          plural: 'Kurse',
        },
        event: {
          singular: 'Event',
          plural: 'Events',
        },
      },
    },
    [types.repeatables.product.typeName]: {
      singular: 'Produkt',
      plural: 'Produkte',
      categories: {
        book: {
          singular: 'Buch',
          plural: 'Bücher',
        },
        merchandise: {
          singular: 'Merchandise',
          plural: 'Merchandise',
        },
        download: {
          singular: 'Download',
          plural: 'Downloads',
        },
      },
    },
    [types.repeatables.blogPost.typeName]: {
      singular: 'Blogbeitrag',
      plural: 'Blogbeiträge',
    },
    [types.repeatables.teamMember.typeName]: {
      readMore: 'Profil ansehen',
    },
  },
}

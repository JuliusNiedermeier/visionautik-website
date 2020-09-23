export default {
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
  types: {
    pages: {
      index: {
        forChangemakers: 'Für Changemaker',
        forBusiness: 'Für Unternehemen',
        forFacilitators: 'Für Prozessbegleiter',
        allCourses: 'Alle Kurse',
      },
      about: {},
      history: {},
    },
    collections: {
      offers: {
        categories: {
          course: 'Kurse',
          event: 'Events',
          book: 'Bücher',
          merchandise: 'Merch',
          download: 'Downloads',
        },
        searchBarPlaceholder: 'Nach Angeboten suchen...',
        targetGroups: {
          all: 'Alle',
          changemakers: 'Für Changemaker',
          business: 'Für Unternehmen',
          facilitators: 'Für Prozessbegleiter',
        },
        tags: {
          book: 'Buch',
          merchandise: 'Merch',
          download: 'Download',
        },
        resultSections: {
          courses: 'Kurse',
          events: 'Events',
          products: 'Produkte',
        },
      },
      blog: {},
      projects: {},
      archive: {},
    },
    singles: {
      coursePage: {},
      eventPage: {},
      productPage: {},
      blogPostPage: {},
      projectPage: {},
      teamMemberPage: {},
    },
    repeatables: {
      course: {
        tag: 'Kurs',
      },
      event: {
        tag: 'Event',
      },
      product: {
        tags: {
          book: 'Buch',
          merchandise: 'Merch',
          download: 'Download',
        },
      },
      blogPost: {
        tag: 'Blogbeitrag',
      },
      teamMember: {
        readMore: 'Zum Profil',
      },
    },
  },
}

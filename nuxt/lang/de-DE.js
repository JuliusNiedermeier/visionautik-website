import types from '@/assets/js/types.js'

export default {
  notifications: {
    close: 'Schließen',
    messages: {
      languageNotAvailable:
        'Es tut uns leid, diese Seite ist noch nicht vollständig übersetzt!',
      missingContent:
        'Einige Inhalte dieser Seite sind aktuell leider nicht verfügbar!',
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
      offersMegaMenu: {
        allOffers: {
          heading: 'Alle Angebote',
          info:
            'Sieh dir unsere Angebote für Changemaker, Unternehmen und Prozessbegleiter an.',
        },
        nextEvents: {
          heading: 'Nächste Events',
          info: 'Check out our upcoming events.',
        },
        archive: {
          heading: 'Archiv',
          info: 'Rückblick auf abgeschlossene Kurse und Events',
        },
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

    pageNotFound: {
      heading: 'Seite nicht gefunden',
      body: 'Bitte vergewissere dich, dass die von dir eingegebene URL korrekt ist.',
      buttonLabel: 'Zurück',
    },
  },

  global: {
    placeholders: {
      courses: {
        heading: 'Kein passender Kurs dabei?',
        body:
          'Wir benachrichtigen dich gerne sobald neue Kurse verfügbar sind!',
        buttonLabel: 'Benachrichtigen',
      },
      events: {
        heading: 'Kein passendes Event dabei?',
        body: 'Wir benachrichtigen dich gerne sobald neue Events geplant sind!',
        buttonLabel: 'Benachrichtigen',
      },
      products: {
        heading: 'Kein passendes Produkt dabei?',
        body:
          'Wir benachrichtigen dich gerne sobald neue Produkte verfügbar sind!',
        buttonLabel: 'Benachrichtigen',
      },
      searchResults: {
        heading: 'Deine Suche ergab keine Ergebnisse...',
        body:
          'Wir benachrichtigen dich aber gerne sobald neue Angebote verfügbar sind!',
        buttonLabel: 'Benachrichtigen',
      },
    },

    auxiliaries: {
      // for: 'for',
    },
    ecommerce: {
      free: 'Kostenlos',
      notAvailable: 'Nicht verfügbar',
      addToCart: 'In den Warenkorb',
      toEventbrite: 'Weiter zu Eventbrite',
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

  slices: {
    pricingPlanList: {
      nextEffectiveDateLabel: 'ab dem',
      notAvailableYet: 'Noch nicht verfügbar',
    },
  },

  types: {
    // PAGES
    [types.pages.index.typeName]: {
      coursesSection: {
        allCourses: 'Alle Kurse',
      },
      eventsSection: {
        allEvents: 'Alle Events',
      },
      teamSection: {
        allTeamMembers: 'Alle Mitglieder und Unterstützer',
      },
      ourVisionSection: {
        readMore: 'Mehr erfahren',
      },
    },

    [types.pages.about.typeName]: {
      contactForm: {
        name: 'Name',
        email: 'Deine Email-Addresse',
        subject: 'Betreff',
        message: 'Deine Nachricht an uns...',
        submit: 'Email senden',
        successMessage: 'Danke! Wir haben deine Nachricht erhalten.',
        errorMessage:
          'Beim senden deiner Nachricht ist etwas schiefgelaufen! Versuche es bitte später noch einmal.',
      },
    },

    // COLLECTIONS
    [types.collections.offers.typeName]: {
      searchBarPlaceholder: 'Suchen...',
      allTargetGroupsLabel: 'Alle',
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
        website: 'Webseite',
        email: 'Email',
      },
    },

    // REPEATABLES
    [types.repeatables.activity.typeName]: {
      label: 'Angebot | Angebote | {count} Angebote',
      categories: {
        course: 'Kurs | Kurse | {count} Kurse',
        event: 'Event | Events | {count} Events',
      },
      choosePricingPlan: 'Angebot wählen',
    },
    [types.repeatables.product.typeName]: {
      label: 'Produkt | Produkte | {count} Produkte',
      categories: {
        book: 'Buch | Bücher | {count} Bücher',
        merchandise: 'Merchandise | Merchandise | {count} Merchandise',
        download: 'Download | Downloads | {count} Downloads',
      },
    },
    [types.repeatables.blogPost.typeName]:
      'Blogbeitrag | Blogbeiträge | {count} Blogbeiträge',
    [types.repeatables.teamMember.typeName]: {
      readMore: 'Profil ansehen',
    },
  },
}

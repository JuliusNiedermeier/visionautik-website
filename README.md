# Official website rebuild of the Visionautik Akademie

This repository contains the rebuild of the official Visionautik Akademie website.

## Built With

- [Nuxt.js](https://nuxtjs.org/)
- [Prismic](https://prismic.io/)
- [Snipcart](https://snipcart.com/)
- [Firebase](https://firebase.google.com/)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installation

After cloning this repository and installing all dependencies run `npm run dev` to serve the page on `localhost:3000`.

## Deployment

See pre-demploy.md for all pre deployment steps.

### Deployment

Login to the Firebase account you want to deploy to:
```bash
firebase login
```

```bash
# deploy functions
firebase deploy --only functions

# deploy hosting
firebase deploy --only hosting

# deploy everything
firebase deploy
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Visionautik-Akademie/Visionautik-de/tags).

## Authors

- **[Julius Niedermeier](https://github.com/JuliusNiedermeier)** - _Initial work_

See also the list of [contributors](https://github.com/Visionautik-Akademie/Visionautik-de/contributors) who participated in this project.

## Acknowledgments

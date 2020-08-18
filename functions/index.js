const functions = require("firebase-functions");
const ssrapp = require("./ssr/ssrapp");

exports.ssrapp = functions.https.onRequest(ssrapp);

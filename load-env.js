/* This empty plugin has the only purpose to make environments vars available
to the parcel-reporter-static-files-copy through dotenv.
Please execute this plugin before the parcel-reporter-static-files-copy plugin.
See the .parcelrc file */
"use strict";
const { Reporter } = require("@parcel/plugin");

const loadEnv = new Reporter({
  async report() {
    require('dotenv').config();
  },
});

exports.default = loadEnv;

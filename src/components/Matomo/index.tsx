/* eslint-disable */
import { useEffect } from 'react';
import utils from 'utils';
import { type ENVIRONMENT } from 'utils/config';
declare global {
  interface Window {
    _mtm: any[];
  }
}

//** This Map work in conjuction with the parcel-reporter-static-files-copy parcel plugin.
// See the package.json file for more information and the property staticFiles.
// The plugin copies the matomo rigth file to the dist folder based on the environment and the
// environment variable ENV value. Please don't forget to set the ENV environment variable before
// running the build command. */
const matomoMap: Record<ENVIRONMENT, string> = {
  "LOCAL": '', // No tracking script for LOCAL
  "DEV": '/matomo/container_KHGZHzVu.js',
  "UAT": '/matomo/container_DHShZNWx.js',
  "PROD": '/matomo/container_a7fdRBO1.js',
};

const Matomo = () => {
  useEffect(() => {
    // doesn't track on local environments
    if (utils.config.env === "LOCAL" || window.location.hostname === "localhost") return
    var _mtm = (window._mtm = window._mtm || []);
    _mtm.push({ 'mtm.startTime': new Date().getTime(), event: 'mtm.Start' });
    var d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0];
    g.async = true;
    g.src = matomoMap[utils.config.env];
    if (s.parentNode) {
      s.parentNode.insertBefore(g, s);
    }
  }, []);

  return null; // This component does not render anything
};

export default Matomo;

import { useEffect } from 'react';
import utils from 'utils';
import { type ENVIRONMENT } from 'utils/config';

//** This Map work in conjuction with the parcel-reporter-static-files-copy parcel plugin.
// See the package.json file for more information and the property staticFiles.
// The plugin copies the oneTrust assets right folder to the dist folder based on the environment and the
// environment variable ENV value. Please don't forget to set the ENV environment variable before
// running the build command. */
const cookieBannerMap: Record<ENVIRONMENT, string> = {
  LOCAL: '',
  DEV: '019501b5-266d-7001-9222-526523cd490d-test',
  UAT: '019501b5-266d-7001-9222-526523cd490d-test',
  PROD: '019501b5-266d-7001-9222-526523cd490d'
};

const CookieBanner = () => {
  useEffect(() => {
    if (window.location.hostname === 'localhost') return;
    const d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0];
    g.src = '/onetrust/scriptTemplates/otSDKStub.js';
    g.type = 'text/javascript';
    g.charset = 'UTF-8';
    g.setAttribute('data-domain-script', cookieBannerMap[utils.config.env]);
    if (s?.parentNode) {
      s.parentNode.insertBefore(g, s);
    }
  }, []);

  return null; // This component does not render anything
};

export default CookieBanner;

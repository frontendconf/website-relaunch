export const HUBSPOT_TRACKING_ID = "1935562";

export const pageview = url => {
  _hsq.push(["setPath", url]);
  _hsq.push(["trackPageView"]);
};

export const event = ({ id, value }) => {
  _hsq.push([
    "trackEvent",
    {
      id,
      value
    }
  ]);
};

export const Script = () => (
  <script
    async
    src={`//js.hs-scripts.com/${HUBSPOT_TRACKING_ID}.js`}
    id="hs-script-loader"
  />
);

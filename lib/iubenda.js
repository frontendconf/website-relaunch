export const IUBENDA_SITE_ID = 1032526;
export const IUBENDA_COOKIE_POLICY_ID = 28536979;

export const Script = () => (
  <>
    <script
      async
      src="//cdn.iubenda.com/cookie_solution/safemode/iubenda_cs.js"
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `
          var _iub = _iub || [];
          _iub.csConfiguration = {
            cookiePolicyId: ${28536979},
            siteId: ${1032526},
            lang: "en",
            banner: {
              slideDown: false,
              applyStyles: false
            }
          };
        `
      }}
    />
  </>
);

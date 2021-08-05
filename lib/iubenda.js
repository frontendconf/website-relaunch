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
              slideDown: true,
              applyStyles: false
            },
            callback: {
              onBannerShown: function() {
                const iubendaNode = document.getElementById("iubenda-cs-banner");
                iubendaNode.classList.add('iubenda-cs-banner--shown');
                window.iubendaNodeClone = iubendaNode.cloneNode(true); 
              },
              onConsentFirstGiven: function() {
                document.body.appendChild(window.iubendaNodeClone);
                window.setTimeout(function() {
                  window.iubendaNodeClone.classList.remove('iubenda-cs-banner--shown');
                }, 0);
              }
            },
          };
        `
      }}
    />
  </>
);

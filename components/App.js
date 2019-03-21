import { colors, fonts } from './styles/variables';

export default ({ children }) => (
  <main>
    {children}
    <style jsx global>{`
      // TODO: preload critical assets like fonts
      @font-face {
        font-family: "${fonts.families.default}";
        font-weight: ${fonts.weights.normal};
        src: url('/static/fonts/38F325_1_unhinted_0.woff2') format('woff2'),
          url('/static/fonts/38F325_1_unhinted_0.woff') format('woff'),
          url('/static/fonts/38F325_1_unhinted_0.ttf')  format('truetype');
        font-display: swap;
      }
      @font-face {
        font-family: "${fonts.families.default}";
        font-weight: ${fonts.weights.bold};
        src: url('/static/fonts/38F325_0_unhinted_0.woff2') format('woff2'),
          url('/static/fonts/38F325_0_unhinted_0.woff') format('woff'),
          url('/static/fonts/38F325_0_unhinted_0.ttf')  format('truetype');
        font-display: swap;
      }
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        padding: 0;
        font-family: "${fonts.families.default}", Helvetica, sans-serif;
        background-color: ${colors.black};
        color: ${colors.white};
        font-weight: ${fonts.weights.normal};
      }
    `}</style>
  </main>
)

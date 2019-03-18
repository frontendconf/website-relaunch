import { colors } from './styles/variables';

export default ({ children }) => (
  <main>
    {children}
    <style jsx global>{`
      @font-face {
        font-family: "Code-Pro-LC";
        font-weight: 400;
        src: url('/static/fonts/38F325_1_unhinted_0.woff2') format('woff2'),
          url('/static/fonts/38F325_1_unhinted_0.woff') format('woff'),
          url('/static/fonts/38F325_1_unhinted_0.ttf')  format('truetype');
        font-display: swap;
      }
      @font-face {
        font-family: "Code-Pro-LC";
        font-weight: 700;
        src: url('/static/fonts/38F325_0_unhinted_0.woff2') format('woff2'),
          url('/static/fonts/38F325_0_unhinted_0.woff') format('woff'),
          url('/static/fonts/38F325_0_unhinted_0.ttf')  format('truetype');
        font-display: swap;
      }
      body {
        margin: 0;
        padding: 0;
        font-family: "Code-Pro-LC", Helvetica, sans-serif;
        background-color: ${colors.black};
        color: ${colors.white};
      }
    `}</style>
  </main>
)

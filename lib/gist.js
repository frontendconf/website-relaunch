export const GIST_ID = "itiq4qhs";

export const Script = () => (
  <>
    <script
      dangerouslySetInnerHTML={{
        __html: `
           (function(d,h,w){var gist=w.gist=w.gist||[];gist.methods=['trackPageView','identify','track','setAppId'];gist.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);gist.push(e);return gist;}};for(var i=0;i<gist.methods.length;i++){var c=gist.methods[i];gist[c]=gist.factory(c)}s=d.createElement('script'),s.src="https://widget.getgist.com",s.async=!0,e=d.getElementsByTagName(h)[0],e.appendChild(s),s.addEventListener('load',function(e){},!1),gist.setAppId("${GIST_ID}"),gist.trackPageView()})(document,'head',window);
        `
      }}
    />
  </>
);

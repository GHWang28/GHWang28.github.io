"use strict";(self.webpackChunkmygithubpage=self.webpackChunkmygithubpage||[]).push([[3047],{595:function(e){function n(e){!function(e){function n(e,n){return"___"+e.toUpperCase()+n+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(t,a,r,o){if(t.language===a){var u=t.tokenStack=[];t.code=t.code.replace(r,(function(e){if("function"===typeof o&&!o(e))return e;for(var r,i=u.length;-1!==t.code.indexOf(r=n(a,i));)++i;return u[i]=e,r})),t.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(t,a){if(t.language===a&&t.tokenStack){t.grammar=e.languages[a];var r=0,o=Object.keys(t.tokenStack);!function u(i){for(var c=0;c<i.length&&!(r>=o.length);c++){var g=i[c];if("string"===typeof g||g.content&&"string"===typeof g.content){var p=o[r],s=t.tokenStack[p],l="string"===typeof g?g:g.content,f=n(a,p),k=l.indexOf(f);if(k>-1){++r;var h=l.substring(0,k),m=new e.Token(a,e.tokenize(s,t.grammar),"language-"+a,s),y=l.substring(k+f.length),d=[];h&&d.push.apply(d,u([h])),d.push(m),y&&d.push.apply(d,u([y])),"string"===typeof g?i.splice.apply(i,[c,1].concat(d)):g.content=d}}else g.content&&u(g.content)}return i}(t.tokens)}}}})}(e)}e.exports=n,n.displayName="markupTemplating",n.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_markupTemplating.b5b4a840.chunk.js.map
(()=>{"use strict";var n,o={218:(n,o,a)=>{var e=a(133),r=a.n(e),t=(a(39),a(968),a(993),a(379)),i=a.n(t),l=a(387);i()(l.Z,{insert:"head",singleton:!1}),l.Z.locals,r()(window).on("load",(function(){r()(".floatmenu").on("click",(function(n){n.stopPropagation(),r()("nav").toggleClass("open")})),r()("nav").on("click",(function(n){n.stopPropagation()})),r()(window).on("resize",(function(){r()("nav").hasClass("open")&&!r()(".floatmenu").is(":visible")&&r()("nav").removeClass("open")})),r()("main").on("click",(function(){r()("nav").removeClass("open")})),r()(".year").text((new Date).getFullYear())}))},387:(n,o,a)=>{a.d(o,{Z:()=>t});var e=a(286),r=a.n(e)()((function(n){return n[1]}));r.push([n.id,"html {\n  box-sizing: border-box;\n  scroll-behavior: smooth;\n}\n\nbody,\nhtml {\n  height: 100%;\n}\n\nhtml,\nbody,\nh1,\nh2,\np,\nli,\nol,\nul {\n  margin: 0;\n  padding: 0;\n}\n\nul {\n  list-style: none;\n}\n\nimg {\n  height: auto;\n  display: block;\n  max-width: 100%;\n}\n\n*,\n:after,\n:before {\n  box-sizing: inherit;\n}\n\n:root {\n  --primary: #dd9933;\n  --primary-shadow: #dd99334d;\n  --text-clr: #ffffff;\n  --text-gray: #777777;\n  --body-bg: #2d2d2d;\n  --body-bg-dark: #181717;\n  --body-bg-black: #000000;\n  --menu-hover: var(--primary);\n}\n\n::-webkit-scrollbar {\n  -webkit-appearance: none;\n}\n\n::-webkit-scrollbar {\n  width: 3px;\n  height: 3px;\n}\n\n::-webkit-scrollbar-track {\n  background: var(--body-bg);\n}\n\n::-webkit-scrollbar-thumb {\n  background: #454545;\n  height: 100px;\n  border-radius: 10px;\n}\n\n::-webkit-scrollbar-thumb:hover {\n  background: var(--body-bg-black);\n}\n\nhtml {\n  font-size: 16px;\n  text-rendering: optimizeLegibility;\n  text-size-adjust: 100%;\n}\n\nbody {\n  font-size: 1rem;\n  line-height: 1.55;\n  background-color: var(--body-bg-dark);\n  color: var(--text-clr);\n  -webkit-font-smoothing: antialiased;\n  overflow-x: hidden;\n  font-family: 'Quicksand', 'Roboto', 'Ubuntu', 'Fira Sans', 'Droid Sans',\n    'Helvetica Neue', sans-serif !important;\n}\n\na {\n  text-decoration: none;\n  color: inherit;\n  -webkit-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n}\n\na:hover {\n  text-decoration: none;\n  color: var(--text-gray);\n}\n\nmain {\n  max-width: 950px;\n  height: 100vh;\n  width: 100%;\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\nsection#left {\n  width: 100%;\n}\n\nsection#left img {\n  margin: 0 auto;\n  max-width: 300px;\n  width: 80%;\n}\n\nsection#left p {\n  font-size: 16px;\n  text-align: center;\n  margin: 1em auto 0;\n}\n\nnav {\n  position: fixed;\n  bottom: 0.7rem;\n  background-color: var(--body-bg);\n  text-align: left;\n  right: 0.7rem;\n  border-radius: 1rem;\n  z-index: 100;\n}\n\nnav.open {\n  padding: 1rem;\n  box-shadow: 0 5px 40px -15px rgba(0, 0, 0, 0.25);\n  transform: scale(1);\n}\n\nnav .floatmenu {\n  position: absolute;\n  right: 0.5rem;\n  bottom: 0.5rem;\n  height: 50px;\n  width: 50px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: var(--primary);\n  color: var(--text-clr);\n  border: none;\n  border-radius: 50%;\n}\n\nnav .floatmenu:focus {\n  outline: none;\n  box-shadow: 0 0 0 4px var(--primary-shadow);\n}\n\nnav .floatmenu svg {\n  height: 30px;\n  width: 30px;\n}\n\nnav .floatmenu .icon__close {\n  display: none;\n}\n\nnav .nav__list {\n  display: none;\n  margin-bottom: 3.5rem;\n  overflow: hidden;\n}\n\nnav .nav__list li {\n  display: block;\n  padding: 3px 0;\n  font-weight: 500;\n}\n\nnav .nav__list li + li {\n  margin-top: 0.5rem;\n}\n\nnav .nav__list a {\n  display: inline-block;\n  margin: 0 2px;\n  padding: 0.8rem 0.9rem 0.8rem 0.7rem;\n  border-radius: 0.4rem;\n  color: var(--text-clr);\n  -webkit-transition: all 0.3s ease;\n  -o-transition: all 0.3s ease;\n  transition: all 0.3s ease;\n  font-weight: 600;\n  font-size: 16px;\n}\n\nnav .nav__list a:focus {\n  outline: none;\n  box-shadow: 0 0 0 2px var(--primary-shadow);\n}\n\nnav .nav__list a:hover {\n  color: var(--body-bg-black);\n  background-color: var(--menu-hover);\n  box-shadow: none;\n}\n\nnav .nav__list .material-icons {\n  margin-right: 10px;\n  font-size: 22px;\n  vertical-align: text-bottom;\n}\n\nnav.open {\n  padding: 1rem 1rem;\n  box-shadow: 0 5px 40px -10px rgba(0, 0, 0, 0.5);\n  transform: scale(1);\n}\n\nnav.open .nav__list {\n  display: block;\n  min-width: 120px;\n}\n\nnav.open .floatmenu .icon__open {\n  display: none;\n}\n\nnav.open .floatmenu .icon__close {\n  display: block;\n}\n\nsection#right {\n  width: 100%;\n}\n\nsection#right img {\n  width: 85%;\n  height: 350px;\n  margin: 5em auto 0;\n}\n\nfooter {\n  width: 100%;\n  background-color: var(--body-bg-black);\n  text-align: center;\n  font-size: 12px;\n  padding: 1em;\n}\n\n.branding {\n  color: var(--primary);\n}\n\n@media screen and (min-width: 768px) {\n  main {\n    flex-direction: row;\n  }\n\n  section#right img {\n    margin: 0 auto;\n  }\n\n  nav {\n    position: static;\n    background-color: transparent;\n    text-align: center;\n  }\n\n  nav .floatmenu {\n    display: none;\n  }\n\n  nav .nav__list {\n    display: block;\n    margin: 3em auto 0;\n    color: var(--text-clr);\n  }\n\n  nav .nav__list li {\n    display: inline-block;\n  }\n\n  nav .nav__list li + li {\n    margin-top: 0;\n    margin-left: 0.5rem;\n  }\n\n  nav .nav__list a {\n    padding: 0.8rem 1.3rem 0.8rem 1rem;\n    color: var(--body-bg-black);\n    background-color: var(--primary);\n  }\n\n  nav .nav__list a:focus {\n    outline: none;\n    box-shadow: 0 0 0 4px var(--primary-shadow);\n  }\n\n  nav .nav__list a:hover {\n    color: var(--text-clr);\n    background-color: var(--body-bg-black);\n    box-shadow: none;\n  }\n}\n",""]);const t=r}},a={};function e(n){var r=a[n];if(void 0!==r)return r.exports;var t=a[n]={id:n,loaded:!1,exports:{}};return o[n].call(t.exports,t,t.exports,e),t.loaded=!0,t.exports}e.m=o,n=[],e.O=(o,a,r,t)=>{if(!a){var i=1/0;for(d=0;d<n.length;d++){for(var[a,r,t]=n[d],l=!0,s=0;s<a.length;s++)(!1&t||i>=t)&&Object.keys(e.O).every((n=>e.O[n](a[s])))?a.splice(s--,1):(l=!1,t<i&&(i=t));l&&(n.splice(d--,1),o=r())}return o}t=t||0;for(var d=n.length;d>0&&n[d-1][2]>t;d--)n[d]=n[d-1];n[d]=[a,r,t]},e.n=n=>{var o=n&&n.__esModule?()=>n.default:()=>n;return e.d(o,{a:o}),o},e.d=(n,o)=>{for(var a in o)e.o(o,a)&&!e.o(n,a)&&Object.defineProperty(n,a,{enumerable:!0,get:o[a]})},e.o=(n,o)=>Object.prototype.hasOwnProperty.call(n,o),e.nmd=n=>(n.paths=[],n.children||(n.children=[]),n),(()=>{var n={826:0};e.O.j=o=>0===n[o];var o=(o,a)=>{var r,t,[i,l,s]=a,d=0;for(r in l)e.o(l,r)&&(e.m[r]=l[r]);if(s)var c=s(e);for(o&&o(a);d<i.length;d++)t=i[d],e.o(n,t)&&n[t]&&n[t][0](),n[i[d]]=0;return e.O(c)},a=self.webpackChunkwebhook=self.webpackChunkwebhook||[];a.forEach(o.bind(null,0)),a.push=o.bind(null,a.push.bind(a))})();var r=e.O(void 0,[413,133],(()=>e(218)));r=e.O(r)})();
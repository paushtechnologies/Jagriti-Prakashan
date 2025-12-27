import{r as n,j as e,B as t,I as R,P as B,S as h,T as S,C as N,u as M}from"./index-DtdiYH6P.js";import{C as E}from"./ChevronLeft-DWGo09PA.js";import{B as z}from"./BookCard-SyQtv15A.js";import{C as T,a as $}from"./DialogContent-WbLThmhQ.js";import{A as O}from"./ArrowForwardIos-FazXwDqZ.js";import"./Dialog-BIh4By4I.js";const P=6e3,W=2e3;function _({books:i=[],bannerMode:m=!1,autoPlay:u=!0}){const[f,x]=n.useState(0),[p,k]=n.useState(u),[d,g]=n.useState(null),[w,j]=n.useState(null),[C,v]=n.useState(!1),y=typeof window<"u"&&window.matchMedia("(max-width:600px)").matches,b=m?1:4,r=Math.max(0,Math.ceil(i.length/b)-1);n.useEffect(()=>{if(!p||r===0)return;const a=setInterval(()=>{x(c=>c<r?c+1:0)},P);return()=>clearInterval(a)},[p,r,f]);const s=()=>{x(a=>a>0?a-1:r)},l=()=>{x(a=>a<r?a+1:0)},o=n.useMemo(()=>{if(!m||!i.length)return null;const a=i[f*b];return a?`/banners/${y&&a.bannerMobile||a.banner}`:null},[i,f,b,y,m]);n.useEffect(()=>{if(!o)return;if(!d){const c=new Image;c.src=o,c.onload=()=>{g(o)};return}if(o===d)return;const a=new Image;a.src=o,a.onload=()=>{j(o),v(!0),setTimeout(()=>{g(o),j(null),v(!1)},W)}},[o,d]);const I=7,A=Array.from({length:I});return e.jsxs(t,{sx:{position:"relative",overflow:"hidden"},children:[e.jsx("style",{children:`
          /* EXTRA SOFT EASING */
          @keyframes sliceEnter {
            0% { 
              opacity: 0; 
              transform: translateX(30px) scale(1.05); /* Reduced movement, subtle scale */
            }
            100% { 
              opacity: 1; 
              transform: translateX(0) scale(1); 
            }
          }

          .slice-container {
            position: absolute;
            inset: 0;
            display: flex;
            width: 100%;
            height: 100%;
          }

          .slice-item {
            position: relative;
            height: 100%;
            flex: 1; 
            /* 101% width to overlap seams */
            width: calc(100% / ${I} + 1px);
            margin-right: -1px;
            
            background-size: ${I*100}% 100%;
            background-repeat: no-repeat;
            will-change: transform, opacity;
          }

          /* Staggered animation for slices - Ultra Smooth */
          ${A.map((a,c)=>`
            .slice-anim-${c} {
              animation: sliceEnter 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              animation-delay: ${c*100}ms; 
            }
          `).join("")}
        `}),e.jsx(R,{onClick:s,sx:{position:"absolute",left:{xs:0,md:3},top:"50%",transform:"translateY(-50%)",zIndex:20,bgcolor:{xs:"transparent",md:"rgba(0,0,0,0.25)"},backdropFilter:{xs:"none",md:"blur(4px)"},border:{xs:"none",md:"1px solid rgba(255,255,255,0.2)"},"&:hover":{bgcolor:"rgba(0,0,0,0.5)",borderColor:"#fff"},color:"#fff",width:{xs:32,md:48},height:{xs:32,md:48},padding:{xs:0,md:1},justifyContent:{xs:"flex-start",md:"center"}},children:e.jsx(E,{sx:{fontSize:{xs:24,md:32},filter:"drop-shadow(0 2px 3px rgba(0,0,0,0.7))"}})}),e.jsxs(B,{elevation:0,sx:{position:"relative",aspectRatio:{xs:"2.5 / 1",md:"1400 / 360"},minHeight:{md:300},backgroundColor:"transparent",overflow:"hidden",borderRadius:0},children:[!d&&e.jsx(h,{variant:"rectangular",width:"100%",height:"100%",animation:"wave",sx:{transform:"scale(1)",bgcolor:"rgba(0,0,0,0.1)"}}),d&&e.jsx(t,{sx:{position:"absolute",inset:0,backgroundImage:`url(${d})`,backgroundSize:"cover",backgroundPosition:"center",zIndex:1}}),w&&C&&e.jsx(t,{className:"slice-container",sx:{zIndex:2},children:A.map((a,c)=>e.jsx(t,{className:`slice-item slice-anim-${c}`,sx:{backgroundImage:`url(${w})`,backgroundPosition:`${c/(I-1)*100}% center`}},c))}),e.jsx(t,{sx:{position:"absolute",bottom:16,left:16,zIndex:10},children:e.jsx(S,{variant:"h6",color:"#fff",sx:{textShadow:"0 2px 4px rgba(0,0,0,0.8)"},children:i[f]?.title||""})})]}),e.jsx(R,{onClick:l,sx:{position:"absolute",right:{xs:0,md:3},top:"50%",transform:"translateY(-50%)",zIndex:20,bgcolor:{xs:"transparent",md:"rgba(0,0,0,0.25)"},backdropFilter:{xs:"none",md:"blur(4px)"},border:{xs:"none",md:"1px solid rgba(255,255,255,0.2)"},"&:hover":{bgcolor:"rgba(0,0,0,0.5)",borderColor:"#fff"},color:"#fff",width:{xs:32,md:48},height:{xs:32,md:48},padding:{xs:0,md:1},justifyContent:{xs:"flex-end",md:"center"}},children:e.jsx(N,{sx:{fontSize:{xs:24,md:32},filter:"drop-shadow(0 2px 3px rgba(0,0,0,0.7))"}})})]})}function G({books:i=[],addToCart:m,loading:u=!1}){const f=M(),x=n.useRef(null),p=n.useRef({}),[k,d]=n.useState({}),g=n.useMemo(()=>i.filter(r=>r.display==="card").slice(0,8),[i]),w=n.useMemo(()=>{const r=new Set;return i.filter(s=>s.display==="card").forEach(s=>r.add(s.category)),Array.from(r)},[i]),j=n.useMemo(()=>{const r={};return i.filter(s=>s.display==="card").forEach(s=>{r[s.category]||(r[s.category]=[]),r[s.category].push(s)}),r},[i]),C=n.useMemo(()=>[{banner:"1.png",bannerMobile:"1-mobile.png"},{banner:"2.png",bannerMobile:"2-mobile.png"},{banner:"3.png",bannerMobile:"3-mobile.png"},{banner:"4.png",bannerMobile:"4-mobile.png"},{banner:"5.png",bannerMobile:"5-mobile.png"}],[]),v=n.useCallback(r=>{const s=p.current[r];s&&d(l=>{const o=s.scrollWidth>s.clientWidth+4;return l[r]===o?l:{...l,[r]:o}})},[]),y=n.useCallback(r=>{p.current[r]?.scrollBy({left:420,behavior:"smooth"})},[]);n.useEffect(()=>{if(!x.current)return;const r=new IntersectionObserver(s=>{s.forEach(l=>{l.isIntersecting&&(l.target.classList.add("visible"),r.unobserve(l.target))})},{threshold:.18,rootMargin:"0px 0px -40px 0px"});return requestAnimationFrame(()=>{x.current.querySelectorAll(".reveal").forEach(s=>r.observe(s))}),()=>r.disconnect()},[i,u]);const b=(r=5)=>e.jsx(t,{className:"scroll-row",sx:{display:"flex",gap:2,overflowX:"hidden",pb:2,pt:1},children:Array.from(new Array(r)).map((s,l)=>e.jsxs(t,{sx:{flex:{xs:"0 0 100px",sm:"0 0 150px"}},children:[e.jsx(h,{variant:"rectangular",height:220,width:"100%",sx:{borderRadius:2}}),e.jsx(h,{width:"80%",sx:{mt:1}}),e.jsx(h,{width:"40%"})]},l))});return e.jsxs(t,{ref:x,sx:{mt:{xs:1,sm:8},maxWidth:1400,mx:"auto"},children:[e.jsx(t,{sx:{mb:{xs:2,sm:4},borderRadius:{xs:"14px",sm:"32px"},overflow:"hidden",boxShadow:"0 10px 40px -10px rgba(0,0,0,0.15)"},children:e.jsx(_,{books:C,bannerMode:!0})}),e.jsx(t,{className:"animated-border",sx:{position:"relative",borderRadius:{xs:"14px",sm:"32px"},overflow:"hidden"},children:e.jsxs(t,{sx:{p:{xs:1.5,sm:3}},children:[e.jsx(S,{sx:{mb:{xs:0,sm:0},fontWeight:600,color:"#56524cff",fontSize:{xs:16,sm:28}},children:"Featured"}),u&&i.length===0?b(6):e.jsx(t,{className:"scroll-row",sx:{display:"flex",gap:{xs:2,md:3},overflowX:"auto",pb:2,pt:1},children:g.map(r=>e.jsx(t,{sx:{flex:{xs:"0 0 100px",sm:"0 0 150px"}},children:e.jsx(z,{book:r,onAddToCart:m})},r.id))})]})}),e.jsx(t,{sx:{mt:{xs:3,sm:6}},children:u&&i.length===0?Array.from(new Array(2)).map((r,s)=>e.jsxs(t,{className:"reveal",sx:{mb:{xs:2,md:4},p:{xs:1,md:2}},children:[e.jsx(h,{width:200,height:40,sx:{mb:2}}),b(6)]},s)):w.map((r,s)=>{const l=j[r]||[];return e.jsxs(t,{className:"reveal",sx:{mb:{xs:2,md:4},bgcolor:s%2===0?"rgba(13,27,42,0.05)":"transparent",p:{xs:1,md:2},borderRadius:1},children:[e.jsx(S,{fontSize:{xs:20,md:32},fontWeight:700,color:"#b8792e",mb:1,children:r}),e.jsxs(t,{sx:{display:"flex"},children:[e.jsx(t,{className:"scroll-row",ref:o=>{p.current[r]=o,o&&requestAnimationFrame(()=>v(r))},sx:{display:"flex",gap:{xs:2,md:3},overflowX:"auto",pb:2,pt:1},children:l.map(o=>e.jsx(t,{sx:{flex:{xs:"0 0 100px",sm:"0 0 150px"}},children:e.jsx(z,{book:o,onAddToCart:m})},o.id))}),k[r]&&e.jsx(T,{sx:{ml:1,minWidth:{xs:20,md:30},bgcolor:"#f0b04f",display:"flex",alignItems:"center",cursor:"pointer"},onClick:()=>y(r),children:e.jsx($,{sx:{p:0},children:e.jsx(O,{sx:{color:"#fff"}})})})]})]},r)})}),e.jsxs(t,{className:"reveal",sx:{mt:{xs:2,md:4},textAlign:"center"},children:[e.jsx(S,{variant:"h6",children:"Want to see all books?"}),e.jsx(t,{component:"button",onClick:()=>f("/gallery"),sx:{mt:{xs:1,md:2},px:{xs:2,md:4},py:{xs:1.25,md:1.5},bgcolor:"primary.main",color:"#fff",border:"none",borderRadius:1,fontWeight:700,cursor:"pointer"},children:"Open Gallery"})]}),e.jsx("style",{children:`
          .reveal {
            opacity: 0;
            transform: translateY(28px) scale(0.98);
            transition:
              opacity 700ms cubic-bezier(.2,.6,.2,1),
              transform 700ms cubic-bezier(.2,.6,.2,1);
          }

          /* 🔑 show first two sections (Banner & Bestsellers) immediately for a full fold */
          .reveal.visible {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          .animated-border::before {
            content: "";
            position: absolute;
            inset: -2px;
            border-radius: inherit;
            background: conic-gradient(
              from 0deg,
              transparent 0deg,
              #f1950aff 90deg,
              transparent 180deg,
              #f0b04f 270deg,
              transparent 360deg
            );
            animation: rotateBorder 22s linear infinite;
            z-index: 0;
          }

          .animated-border::after {
            content: "";
            position: absolute;
            inset: 3px;
            background: linear-gradient(
              90deg,
              #f8c978 0%,
              #fde9c3 30%,
              #fdf6e6 60%,
              #edc27dff 100%
            );
            border-radius: inherit;
            z-index: 1;
          }

          .animated-border > * {
            position: relative;
            z-index: 2;
          }

          @keyframes rotateBorder {
            to { transform: rotate(360deg); }
          }

          .scroll-row::-webkit-scrollbar {
            height: 5px;
          }

          .scroll-row::-webkit-scrollbar-thumb {
            background-color: rgba(0,0,0,0.35);
            border-radius: 10px;
          }

          @media (max-width: 768px) {
            .scroll-row::-webkit-scrollbar {
              height: 3px;
            }

            .scroll-row::-webkit-scrollbar-thumb {
              background-color: rgba(0,0,0,0.15);
            }
          }
        `})]})}export{G as default};

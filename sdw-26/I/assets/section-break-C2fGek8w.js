import{B as e,Ct as t,D as n,G as r,H as i,Q as a,R as o,S as s,b as c,bt as l,ft as u,tt as ee,v as d,x as f,y as p}from"./modules/shiki-9aTtk8wg.js";import{at as m,rt as h,vt as g}from"./index-DqwhlSgL.js";import"./client-D14OkI2T.js";var _=192,v=108,y=`
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`,b=`
precision highp float;
uniform sampler2D uState;
uniform vec2  uGrid;
uniform float uGen;
uniform float uBirth;

float cellAt(vec2 c) {
  // Torus wrap by hand: WebGL1 only repeats power-of-two textures.
  vec2 w = mod(c + uGrid, uGrid);
  return texture2D(uState, (w + 0.5) / uGrid).r;
}

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 c = floor(gl_FragCoord.xy);
  vec4 s = texture2D(uState, (c + 0.5) / uGrid);
  float alive = s.r;

  float n = cellAt(c + vec2(-1.0, -1.0)) + cellAt(c + vec2(0.0, -1.0)) + cellAt(c + vec2(1.0, -1.0))
          + cellAt(c + vec2(-1.0,  0.0))                               + cellAt(c + vec2(1.0,  0.0))
          + cellAt(c + vec2(-1.0,  1.0)) + cellAt(c + vec2(0.0,  1.0)) + cellAt(c + vec2(1.0,  1.0));

  // B3/S23, the original rules.
  float next = alive > 0.5
    ? ((n > 1.5 && n < 3.5) ? 1.0 : 0.0)
    : ((n > 2.5 && n < 3.5) ? 1.0 : 0.0);

  // A trickle of new cells so the field keeps provoking structure instead of
  // settling into still lifes a few minutes in.
  if (hash(c + uGen * 7.77) < uBirth)
    next = 1.0;

  // Afterglow: a dying cell fades over several generations rather than
  // blinking out, which is most of what makes this read as slow.
  float glow = max(next, s.g * 0.86);

  gl_FragColor = vec4(next, glow, 0.0, 1.0);
}
`,x=`
precision highp float;
uniform sampler2D uCur;
uniform sampler2D uPrev;
uniform vec2  uRes;
uniform vec2  uGrid;
uniform float uMix;
uniform float uTime;
uniform float uSeed;
uniform float uIntensity;
uniform vec3  uC0;
uniform vec3  uC1;
uniform vec3  uC2;
uniform float uVignette;
uniform float uCenterAlpha;

float bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}
#define bayer4(a) (bayer2(0.5 * (a)) * 0.25 + bayer2(a))
#define bayer8(a) (bayer4(0.5 * (a)) * 0.25 + bayer2(a))

float sampleLife(vec2 uv) {
  vec2 w = fract(uv);
  vec4 a = texture2D(uCur, w);
  vec4 b = texture2D(uPrev, w);
  // Crossfade the two most recent generations, and weight the afterglow in.
  float cur = a.r * 0.62 + a.g * 0.38;
  float prv = b.r * 0.62 + b.g * 0.38;
  return mix(prv, cur, uMix);
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  float aspect = uRes.x / uRes.y;
  vec2 uv0 = frag / uRes;
  vec2 p0 = vec2(uv0.x * aspect, uv0.y);

  // ---- the drifting lens ----
  // Two incommensurable periods, so it never visibly repeats within a talk.
  vec2 lens = vec2(
    0.5 * aspect + 0.31 * aspect * sin(uTime * 0.00515 + uSeed * 2.4),
    0.5 + 0.27 * cos(uTime * 0.0035 + uSeed * 1.3)
  );
  float radius = 0.30;
  float d = distance(p0, lens);
  float g = smoothstep(radius, radius * 0.55, d);
  float rim = smoothstep(radius * 1.05, radius, d) - smoothstep(radius, radius * 0.88, d);

  // Magnify toward the lens centre: inside the glass you are looking at fewer,
  // bigger cells, so the structure of the simulation becomes legible.
  vec2 p = mix(p0, lens + (p0 - lens) * 0.34, g * uIntensity);
  vec2 uv = vec2(p.x / aspect, p.y);

  float v = sampleLife(uv);

  // Blur only inside the glass, in cell units so it scales with the zoom.
  if (g > 0.01) {
    vec2 e = vec2(1.6, 1.6) / uGrid * g;
    float b = sampleLife(uv + vec2(e.x, 0.0))
            + sampleLife(uv + vec2(-e.x, 0.0))
            + sampleLife(uv + vec2(0.0, e.y))
            + sampleLife(uv + vec2(0.0, -e.y));
    v = mix(v, (v + b) * 0.2, g * 0.85);
  }

  // Flatten outside the lens so the field stays wallpaper and the glass is the
  // event; lift contrast inside so it announces itself.
  v = mix(v * 0.68, smoothstep(0.06, 0.62, v), g);

  // ---- ordered dither ----
  float cellPx = mix(2.0, 6.0, g);
  float levels = mix(5.0, 3.0, g);
  float threshold = bayer8(frag / cellPx) - 0.5;
  float q = floor(v * levels + threshold) / (levels - 1.0);
  q = clamp(q + rim * 0.5, 0.0, 1.0);

  // ---- brand ramp ----
  // Biased hard toward the ground colour: white type sits on top of this.
  float k = pow(q, 1.35) * uIntensity;
  vec3 col = k < 0.5
    ? mix(uC0, uC1, k * 2.0)
    : mix(uC1, uC2, (k - 0.5) * 2.0);
  col = mix(uC0, col, mix(0.62, 1.0, g));

  // ---- the ellipse ----
  // One soft ellipse, wider than it is tall so it follows the shape of a 16:9
  // frame rather than sitting on it as a circle, breathing on a period of
  // several minutes. Slow enough that you never catch it moving, but two
  // dividers an hour apart are not the same frame. It drives two things.
  vec2 vc = (uv0 - 0.5) * vec2(1.0, 0.86);
  float breathe = 0.5 + 0.5 * sin(uTime * 0.00625 + uSeed * 0.7);
  float vd = length(vc) / (0.40 * mix(0.94, 1.10, breathe));

  // First: how much of the simulation shows through. Held down to uCenterAlpha
  // inside the ellipse, where the type sits, and rising to full outside it, so
  // the field is liveliest at the edges and quietest under the words. The ramp
  // is a smoothstep across the whole ellipse rather than a hard boundary, so
  // there is no visible rim where the two levels meet.
  float alpha = mix(uCenterAlpha, 1.0, smoothstep(0.0, 1.0, vd));
  col = mix(uC0, col, alpha);

  // Second: a gentle vignette. Multiplying rather than mixing toward black
  // keeps it inside the blue - at the default 0.2 the darkest corner is about
  // #0000b0, the brand blue with the lights down rather than a grey.
  float vig = 1.0 - uVignette * smoothstep(0.30, 1.35, vd);
  col *= vig;

  gl_FragColor = vec4(col, 1.0);
}
`,S=g(n({__name:`ShaderField`,props:{palette:{default:`blue`},seed:{default:1},intensity:{default:.62},speed:{default:.4},density:{default:.28},resolution:{default:520},motion:{default:`auto`},vignette:{default:.2},centerAlpha:{default:.5},fadeIn:{default:7}},setup(t){let{$slidev:n,$nav:r,$clicksContext:c,$clicks:l,$page:ee,$renderContext:f,$frontmatter:p}=m(),g=t,S=u(null),C=h(),w=!1,T=u(typeof window<`u`&&!!window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches);typeof window<`u`&&window.matchMedia&&window.matchMedia(`(prefers-reduced-motion: reduce)`).addEventListener?.(`change`,e=>{T.value=e.matches});let E=d(()=>g.motion===`off`?!1:g.motion===`always`||!T.value),D={blue:[[0,0,.863],[.16,.42,.95],[.45,.8,1]],ice:[[0,0,.663],[.24,.62,.98],[.56,.86,1]],mono:[[0,0,.863],[0,0,.863],[.38,.62,.98]]},O=null,k=null,A=null,j=null,M=null,N=null,P=null,F=!0,I=0,L=0,R=0,z=0,B=1;function V(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.warn(`[ShaderField] compile failed:`,e.getShaderInfoLog(r)),null)}function H(e,t){let n=V(e,e.VERTEX_SHADER,y),r=V(e,e.FRAGMENT_SHADER,t);if(!n||!r)return null;let i=e.createProgram();return e.attachShader(i,n),e.attachShader(i,r),e.linkProgram(i),e.getProgramParameter(i,e.LINK_STATUS)?i:(console.warn(`[ShaderField] link failed:`,e.getProgramInfoLog(i)),null)}function U(e){let t=new Uint8Array(82944),n=Math.imul(e||1,2654435761)>>>0,r=()=>(n^=n<<13,n>>>=0,n^=n>>17,n^=n<<5,n>>>=0,n/4294967295);for(let e=0;e<20736;e++){let n=r()<g.density?255:0;t[e*4]=n,t[e*4+1]=n,t[e*4+3]=255}return t}function W(e,t){let n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,_,v,0,e.RGBA,e.UNSIGNED_BYTE,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);let r=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,r),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindFramebuffer(e.FRAMEBUFFER,null),i?{tex:n,fbo:r}:null}function G(){let e=S.value;if(!e||(O=e.getContext(`webgl`,{antialias:!1,alpha:!1,preserveDrawingBuffer:!0})||e.getContext(`experimental-webgl`,{antialias:!1,alpha:!1}),!O)||(k=H(O,b),A=H(O,x),!k||!A))return!1;let t=U(g.seed),n=W(O,t),r=W(O,t);if(!n||!r)return!1;j=n.tex,N=n.fbo,M=r.tex,P=r.fbo,F=!0,z=0;let i=O.createBuffer();O.bindBuffer(O.ARRAY_BUFFER,i),O.bufferData(O.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),O.STATIC_DRAW);for(let e of[k,A]){O.useProgram(e);let t=O.getAttribLocation(e,`aPos`);O.enableVertexAttribArray(t),O.vertexAttribPointer(t,2,O.FLOAT,!1,0,0)}return!0}function K(){if(!O||!k)return;let e=F?j:M,t=F?P:N;O.useProgram(k),O.bindFramebuffer(O.FRAMEBUFFER,t),O.viewport(0,0,_,v),O.activeTexture(O.TEXTURE1),O.bindTexture(O.TEXTURE_2D,null),O.activeTexture(O.TEXTURE0),O.bindTexture(O.TEXTURE_2D,e),O.uniform1i(O.getUniformLocation(k,`uState`),0),O.uniform2f(O.getUniformLocation(k,`uGrid`),_,v),O.uniform1f(O.getUniformLocation(k,`uGen`),z),O.uniform1f(O.getUniformLocation(k,`uBirth`),.0016),O.drawArrays(O.TRIANGLES,0,3),O.bindFramebuffer(O.FRAMEBUFFER,null),F=!F,z++}function q(){let e=S.value;if(!e)return;let t=Math.max(64,Math.round(g.resolution)),n=e.getBoundingClientRect(),r=Math.max(64,Math.round(t*(n.height||9)/(n.width||16)));(e.width!==t||e.height!==r)&&(e.width=t,e.height=r)}function J(e){let t=S.value;if(!O||!A||!t)return;q(),O.useProgram(A),O.viewport(0,0,t.width,t.height);let n=F?j:M,r=F?M:j;O.activeTexture(O.TEXTURE0),O.bindTexture(O.TEXTURE_2D,n),O.uniform1i(O.getUniformLocation(A,`uCur`),0),O.activeTexture(O.TEXTURE1),O.bindTexture(O.TEXTURE_2D,r),O.uniform1i(O.getUniformLocation(A,`uPrev`),1);let i=D[g.palette]??D.blue;O.uniform2f(O.getUniformLocation(A,`uRes`),t.width,t.height),O.uniform2f(O.getUniformLocation(A,`uGrid`),_,v),O.uniform1f(O.getUniformLocation(A,`uMix`),B),O.uniform1f(O.getUniformLocation(A,`uTime`),e),O.uniform1f(O.getUniformLocation(A,`uSeed`),g.seed),O.uniform1f(O.getUniformLocation(A,`uIntensity`),g.intensity),O.uniform1f(O.getUniformLocation(A,`uVignette`),g.vignette),O.uniform1f(O.getUniformLocation(A,`uCenterAlpha`),g.centerAlpha),O.uniform3fv(O.getUniformLocation(A,`uC0`),i[0]),O.uniform3fv(O.getUniformLocation(A,`uC1`),i[1]),O.uniform3fv(O.getUniformLocation(A,`uC2`),i[2]),O.drawArrays(O.TRIANGLES,0,3)}function Y(e){L||(L=e,R=e);let t=1e3/Math.max(.5,g.speed);e-R>=t&&(K(),R=e),B=Math.min(1,(e-R)/t),J((e-L)/1e3),I=requestAnimationFrame(Y)}function X(){if(!I&&O){if(!E.value){for(let e=0;e<12;e++)K();B=1,J(g.seed*7.3);return}I=requestAnimationFrame(Y)}}let Z=null;function te(){let e=S.value;e&&(Z?.cancel(),e.style.opacity=`1`,!(!E.value||g.fadeIn<=0)&&(Z=e.animate([{opacity:0},{opacity:1}],{duration:g.fadeIn*1e3,easing:`cubic-bezier(.35,.08,.6,.94)`,fill:`both`})))}function ne(){let e=S.value;e&&(Z?.cancel(),Z=null,e.style.opacity=``)}function Q(){I&&=(cancelAnimationFrame(I),0)}function $(){document.hidden?Q():C.value&&X()}function re(){return w?!0:(w=G(),w)}function ie(){C.value?re()&&(X(),te()):(Q(),ne())}return e(ie),a(C,ie,{flush:`post`}),a([E,()=>g.palette,()=>g.intensity,()=>g.speed,()=>g.vignette,()=>g.centerAlpha,()=>g.fadeIn],()=>{Q(),C.value&&w&&X()}),typeof document<`u`&&document.addEventListener(`visibilitychange`,$),typeof window<`u`&&window.addEventListener(`resize`,q),o(()=>{Q(),window.removeEventListener(`resize`,q),document.removeEventListener(`visibilitychange`,$)}),(e,t)=>(i(),s(`canvas`,{ref_key:`host`,ref:S,class:`shader-field`,"aria-hidden":`true`},null,512))}}),[[`__scopeId`,`data-v-9373a958`]]),C={key:0,class:`rust-defs`,"aria-hidden":`true`,focusable:`false`},w=[`id`],T=[`baseFrequency`,`seed`],E=[`scale`],D=[`baseFrequency`,`seed`],O={in:`patchA`,result:`patchMask`},k=[`slope`,`intercept`],A=g(n({__name:`RustyText`,props:{delay:{default:30},duration:{default:60},amount:{default:.55},seed:{default:1},motion:{default:`auto`}},setup(e){let{$slidev:n,$nav:c,$clicksContext:l,$clicks:ee,$page:g,$renderContext:_,$frontmatter:v}=m(),y=e,b=Math.random().toString(36).slice(2,9),x=d(()=>`rust-${b}`),S=h(),A=u(typeof window<`u`&&!!window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches);typeof window<`u`&&window.matchMedia&&window.matchMedia(`(prefers-reduced-motion: reduce)`).addEventListener?.(`change`,e=>{A.value=e.matches});let j=d(()=>y.motion===`off`||y.amount<=0?!1:y.motion===`always`||!A.value),M=u(0),N=d(()=>{let e=Math.min(1,Math.max(0,M.value));return e*e*(3-2*e)}),P=d(()=>N.value*Math.min(1,Math.max(0,y.amount))),F=d(()=>(P.value*5.5).toFixed(2)),I=u(0),L=d(()=>(.022+.004*Math.sin(I.value*.05)).toFixed(4)),R=d(()=>(P.value*2).toFixed(3)),z=d(()=>(1-P.value*1.45).toFixed(3)),B=d(()=>(.035+.006*Math.cos(I.value*.037)).toFixed(4)),V=0,H=0,U=0;function W(e){if(H||=e,e-U>125){U=e;let t=(e-H)/1e3,n=t-y.delay;M.value=n<=0?0:Math.min(1,n/Math.max(.001,y.duration)),I.value=t}V=requestAnimationFrame(W)}function G(){!V&&j.value&&(H=0,U=0,M.value=0,V=requestAnimationFrame(W))}function K(){V&&=(cancelAnimationFrame(V),0),M.value=0,I.value=0}return a(S,e=>{e?G():K()},{immediate:!0}),a(j,e=>{e?S.value&&G():K()}),o(K),(n,a)=>(i(),s(`div`,{class:`rusty`,style:t(j.value&&P.value>0?{filter:`url(#${x.value})`}:void 0)},[j.value?(i(),s(`svg`,C,[p(`filter`,{id:x.value,x:`-15%`,y:`-15%`,width:`130%`,height:`130%`,"color-interpolation-filters":`sRGB`},[p(`feTurbulence`,{type:`fractalNoise`,baseFrequency:L.value,numOctaves:`2`,seed:e.seed,result:`edgeNoise`},null,8,T),p(`feDisplacementMap`,{in:`SourceGraphic`,in2:`edgeNoise`,scale:F.value,xChannelSelector:`R`,yChannelSelector:`G`,result:`crumbled`},null,8,E),p(`feTurbulence`,{type:`fractalNoise`,baseFrequency:B.value,numOctaves:`3`,seed:e.seed+4,result:`patch`},null,8,D),a[0]||=p(`feColorMatrix`,{in:`patch`,type:`luminanceToAlpha`,result:`patchA`},null,-1),p(`feComponentTransfer`,O,[p(`feFuncA`,{type:`linear`,slope:R.value,intercept:z.value},null,8,k)]),a[1]||=p(`feComposite`,{in:`crumbled`,in2:`patchMask`,operator:`in`},null,-1)],8,w)])):f(`v-if`,!0),r(n.$slots,`default`,{},void 0,!0)],4))}}),[[`__scopeId`,`data-v-bd03756e`]]);function j(e,t){let n=d(()=>e??{}),r=d(()=>t??{}),i=d(()=>n.value.shader===void 0?r.value.shader===void 0||r.value.shader!==!1:n.value.shader!==!1),a=(e,t)=>d(()=>n.value[e]??r.value[e]??t);return{enabled:i,palette:a(`shaderPalette`,`blue`),seed:d(()=>Number(n.value.shaderSeed??r.value.shaderSeed??1)),intensity:d(()=>Number(n.value.shaderIntensity??r.value.shaderIntensity??.62)),speed:d(()=>Number(n.value.shaderSpeed??r.value.shaderSpeed??.4)),motion:a(`shaderMotion`,`auto`),vignette:d(()=>Number(n.value.shaderVignette??r.value.shaderVignette??.2)),centerAlpha:d(()=>Number(n.value.shaderCenterAlpha??r.value.shaderCenterAlpha??.5)),fadeIn:d(()=>Number(n.value.shaderFadeIn??r.value.shaderFadeIn??7)),rust:d(()=>(n.value.shaderRust??r.value.shaderRust)!==!1),rustDelay:d(()=>Number(n.value.shaderRustDelay??r.value.shaderRustDelay??30)),rustDuration:d(()=>Number(n.value.shaderRustDuration??r.value.shaderRustDuration??60)),rustAmount:d(()=>Number(n.value.shaderRustAmount??r.value.shaderRustAmount??.55))}}var M={class:`slidev-layout section-break`},N={class:`section-body`},P=g(n({__name:`section-break`,setup(e){let{$frontmatter:t,$slidev:n}=m(),{enabled:a,palette:o,seed:u,intensity:d,speed:h,motion:g,vignette:_,centerAlpha:v,fadeIn:y,rust:b,rustDelay:x,rustDuration:C,rustAmount:w}=j(t,n?.configs);return(e,t)=>(i(),s(`div`,M,[l(a)?(i(),c(S,{key:0,palette:l(o),seed:l(u),intensity:l(d),speed:l(h),motion:l(g),vignette:l(_),"center-alpha":l(v),"fade-in":l(y)},null,8,[`palette`,`seed`,`intensity`,`speed`,`motion`,`vignette`,`center-alpha`,`fade-in`])):f(`v-if`,!0),p(`div`,N,[l(a)&&l(b)?(i(),c(A,{key:0,delay:l(x),duration:l(C),amount:l(w),seed:l(u),motion:l(g)},{default:ee(()=>[r(e.$slots,`default`,{},void 0,!0)]),_:3},8,[`delay`,`duration`,`amount`,`seed`,`motion`])):r(e.$slots,`default`,{},void 0,!0,1)])]))}}),[[`__scopeId`,`data-v-02493f96`]]);export{P as t};
import{B as e,E as t,I as n,Q as r,R as i,U as a,Y as o,_ as s,_t as c,b as l,bt as u,g as d,lt as f,v as p,y as m}from"./modules/shiki-DyKjBb-p.js";import{it as h,nt as g,yt as _}from"./index-lAfFp5ke.js";import"./client-h5QG1aku.js";var v=192,y=108,b=`
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`,x=`
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
`,S=`
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
`,C=_(t({__name:`ShaderField`,props:{palette:{default:`blue`},seed:{default:1},intensity:{default:.62},speed:{default:.4},density:{default:.28},resolution:{default:520},motion:{default:`auto`},vignette:{default:.2},centerAlpha:{default:.5},fadeIn:{default:7}},setup(t){let{$slidev:r,$nav:a,$clicksContext:s,$clicks:c,$page:u,$renderContext:p,$frontmatter:m}=h(),_=t,C=f(null),w=g(),T=!1,E=f(typeof window<`u`&&!!window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches);typeof window<`u`&&window.matchMedia&&window.matchMedia(`(prefers-reduced-motion: reduce)`).addEventListener?.(`change`,e=>{E.value=e.matches});let D=d(()=>_.motion===`off`?!1:_.motion===`always`||!E.value),O={blue:[[0,0,.863],[.16,.42,.95],[.45,.8,1]],ice:[[0,0,.663],[.24,.62,.98],[.56,.86,1]],mono:[[0,0,.863],[0,0,.863],[.38,.62,.98]]},k=null,A=null,j=null,M=null,N=null,P=null,F=null,I=!0,L=0,R=0,z=0,B=0,V=1;function H(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.warn(`[ShaderField] compile failed:`,e.getShaderInfoLog(r)),null)}function U(e,t){let n=H(e,e.VERTEX_SHADER,b),r=H(e,e.FRAGMENT_SHADER,t);if(!n||!r)return null;let i=e.createProgram();return e.attachShader(i,n),e.attachShader(i,r),e.linkProgram(i),e.getProgramParameter(i,e.LINK_STATUS)?i:(console.warn(`[ShaderField] link failed:`,e.getProgramInfoLog(i)),null)}function W(e){let t=new Uint8Array(82944),n=Math.imul(e||1,2654435761)>>>0,r=()=>(n^=n<<13,n>>>=0,n^=n>>17,n^=n<<5,n>>>=0,n/4294967295);for(let e=0;e<20736;e++){let n=r()<_.density?255:0;t[e*4]=n,t[e*4+1]=n,t[e*4+3]=255}return t}function G(e,t){let n=e.createTexture();e.bindTexture(e.TEXTURE_2D,n),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,v,y,0,e.RGBA,e.UNSIGNED_BYTE,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE);let r=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,r),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0);let i=e.checkFramebufferStatus(e.FRAMEBUFFER)===e.FRAMEBUFFER_COMPLETE;return e.bindFramebuffer(e.FRAMEBUFFER,null),i?{tex:n,fbo:r}:null}function K(){let e=C.value;if(!e||(k=e.getContext(`webgl`,{antialias:!1,alpha:!1,preserveDrawingBuffer:!0})||e.getContext(`experimental-webgl`,{antialias:!1,alpha:!1}),!k)||(A=U(k,x),j=U(k,S),!A||!j))return!1;let t=W(_.seed),n=G(k,t),r=G(k,t);if(!n||!r)return!1;M=n.tex,P=n.fbo,N=r.tex,F=r.fbo,I=!0,B=0;let i=k.createBuffer();k.bindBuffer(k.ARRAY_BUFFER,i),k.bufferData(k.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),k.STATIC_DRAW);for(let e of[A,j]){k.useProgram(e);let t=k.getAttribLocation(e,`aPos`);k.enableVertexAttribArray(t),k.vertexAttribPointer(t,2,k.FLOAT,!1,0,0)}return!0}function q(){if(!k||!A)return;let e=I?M:N,t=I?F:P;k.useProgram(A),k.bindFramebuffer(k.FRAMEBUFFER,t),k.viewport(0,0,v,y),k.activeTexture(k.TEXTURE1),k.bindTexture(k.TEXTURE_2D,null),k.activeTexture(k.TEXTURE0),k.bindTexture(k.TEXTURE_2D,e),k.uniform1i(k.getUniformLocation(A,`uState`),0),k.uniform2f(k.getUniformLocation(A,`uGrid`),v,y),k.uniform1f(k.getUniformLocation(A,`uGen`),B),k.uniform1f(k.getUniformLocation(A,`uBirth`),.0016),k.drawArrays(k.TRIANGLES,0,3),k.bindFramebuffer(k.FRAMEBUFFER,null),I=!I,B++}function J(){let e=C.value;if(!e)return;let t=Math.max(64,Math.round(_.resolution)),n=e.getBoundingClientRect(),r=Math.max(64,Math.round(t*(n.height||9)/(n.width||16)));(e.width!==t||e.height!==r)&&(e.width=t,e.height=r)}function Y(e){let t=C.value;if(!k||!j||!t)return;J(),k.useProgram(j),k.viewport(0,0,t.width,t.height);let n=I?M:N,r=I?N:M;k.activeTexture(k.TEXTURE0),k.bindTexture(k.TEXTURE_2D,n),k.uniform1i(k.getUniformLocation(j,`uCur`),0),k.activeTexture(k.TEXTURE1),k.bindTexture(k.TEXTURE_2D,r),k.uniform1i(k.getUniformLocation(j,`uPrev`),1);let i=O[_.palette]??O.blue;k.uniform2f(k.getUniformLocation(j,`uRes`),t.width,t.height),k.uniform2f(k.getUniformLocation(j,`uGrid`),v,y),k.uniform1f(k.getUniformLocation(j,`uMix`),V),k.uniform1f(k.getUniformLocation(j,`uTime`),e),k.uniform1f(k.getUniformLocation(j,`uSeed`),_.seed),k.uniform1f(k.getUniformLocation(j,`uIntensity`),_.intensity),k.uniform1f(k.getUniformLocation(j,`uVignette`),_.vignette),k.uniform1f(k.getUniformLocation(j,`uCenterAlpha`),_.centerAlpha),k.uniform3fv(k.getUniformLocation(j,`uC0`),i[0]),k.uniform3fv(k.getUniformLocation(j,`uC1`),i[1]),k.uniform3fv(k.getUniformLocation(j,`uC2`),i[2]),k.drawArrays(k.TRIANGLES,0,3)}function X(e){R||(R=e,z=e);let t=1e3/Math.max(.5,_.speed);e-z>=t&&(q(),z=e),V=Math.min(1,(e-z)/t),Y((e-R)/1e3),L=requestAnimationFrame(X)}function Z(){if(!L&&k){if(!D.value){for(let e=0;e<12;e++)q();V=1,Y(_.seed*7.3);return}L=requestAnimationFrame(X)}}let Q=null;function ee(){let e=C.value;e&&(Q?.cancel(),e.style.opacity=`1`,!(!D.value||_.fadeIn<=0)&&(Q=e.animate([{opacity:0},{opacity:1}],{duration:_.fadeIn*1e3,easing:`cubic-bezier(.35,.08,.6,.94)`,fill:`both`})))}function te(){let e=C.value;e&&(Q?.cancel(),Q=null,e.style.opacity=``)}function $(){L&&=(cancelAnimationFrame(L),0)}function ne(){document.hidden?$():w.value&&Z()}function re(){return T?!0:(T=K(),T)}function ie(){w.value?re()&&(Z(),ee()):($(),te())}return i(ie),o(w,ie,{flush:`post`}),o([D,()=>_.palette,()=>_.intensity,()=>_.speed,()=>_.vignette,()=>_.centerAlpha,()=>_.fadeIn],()=>{$(),w.value&&T&&Z()}),typeof document<`u`&&document.addEventListener(`visibilitychange`,ne),typeof window<`u`&&window.addEventListener(`resize`,J),n(()=>{$(),window.removeEventListener(`resize`,J),document.removeEventListener(`visibilitychange`,ne)}),(t,n)=>(e(),l(`canvas`,{ref_key:`host`,ref:C,class:`shader-field`,"aria-hidden":`true`},null,512))}}),[[`__scopeId`,`data-v-9373a958`]]),w={key:0,class:`rust-defs`,"aria-hidden":`true`,focusable:`false`},T=[`id`],E=[`baseFrequency`,`seed`],D=[`scale`],O=[`baseFrequency`,`seed`],k={in:`patchA`,result:`patchMask`},A=[`slope`,`intercept`],j=_(t({__name:`RustyText`,props:{delay:{default:30},duration:{default:60},amount:{default:.55},seed:{default:1},motion:{default:`auto`}},setup(t){let{$slidev:r,$nav:i,$clicksContext:c,$clicks:p,$page:_,$renderContext:v,$frontmatter:y}=h(),b=t,x=Math.random().toString(36).slice(2,9),S=d(()=>`rust-${x}`),C=g(),j=f(typeof window<`u`&&!!window.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches);typeof window<`u`&&window.matchMedia&&window.matchMedia(`(prefers-reduced-motion: reduce)`).addEventListener?.(`change`,e=>{j.value=e.matches});let M=d(()=>b.motion===`off`||b.amount<=0?!1:b.motion===`always`||!j.value),N=f(0),P=d(()=>{let e=Math.min(1,Math.max(0,N.value));return e*e*(3-2*e)}),F=d(()=>P.value*Math.min(1,Math.max(0,b.amount))),I=d(()=>(F.value*5.5).toFixed(2)),L=f(0),R=d(()=>(.022+.004*Math.sin(L.value*.05)).toFixed(4)),z=d(()=>(F.value*2).toFixed(3)),B=d(()=>(1-F.value*1.45).toFixed(3)),V=d(()=>(.035+.006*Math.cos(L.value*.037)).toFixed(4)),H=0,U=0,W=0;function G(e){if(U||=e,e-W>125){W=e;let t=(e-U)/1e3,n=t-b.delay;N.value=n<=0?0:Math.min(1,n/Math.max(.001,b.duration)),L.value=t}H=requestAnimationFrame(G)}function K(){!H&&M.value&&(U=0,W=0,N.value=0,H=requestAnimationFrame(G))}function q(){H&&=(cancelAnimationFrame(H),0),N.value=0,L.value=0}return o(C,e=>{e?K():q()},{immediate:!0}),o(M,e=>{e?C.value&&K():q()}),n(q),(n,r)=>(e(),l(`div`,{class:`rusty`,style:u(M.value&&F.value>0?{filter:`url(#${S.value})`}:void 0)},[M.value?(e(),l(`svg`,w,[s(`filter`,{id:S.value,x:`-15%`,y:`-15%`,width:`130%`,height:`130%`,"color-interpolation-filters":`sRGB`},[s(`feTurbulence`,{type:`fractalNoise`,baseFrequency:R.value,numOctaves:`2`,seed:t.seed,result:`edgeNoise`},null,8,E),s(`feDisplacementMap`,{in:`SourceGraphic`,in2:`edgeNoise`,scale:I.value,xChannelSelector:`R`,yChannelSelector:`G`,result:`crumbled`},null,8,D),s(`feTurbulence`,{type:`fractalNoise`,baseFrequency:V.value,numOctaves:`3`,seed:t.seed+4,result:`patch`},null,8,O),r[0]||=s(`feColorMatrix`,{in:`patch`,type:`luminanceToAlpha`,result:`patchA`},null,-1),s(`feComponentTransfer`,k,[s(`feFuncA`,{type:`linear`,slope:z.value,intercept:B.value},null,8,A)]),r[1]||=s(`feComposite`,{in:`crumbled`,in2:`patchMask`,operator:`in`},null,-1)],8,T)])):m(`v-if`,!0),a(n.$slots,`default`,{},void 0,!0)],4))}}),[[`__scopeId`,`data-v-bd03756e`]]);function M(e,t){let n=d(()=>e??{}),r=d(()=>t??{}),i=d(()=>n.value.shader===void 0?r.value.shader===void 0||r.value.shader!==!1:n.value.shader!==!1),a=(e,t)=>d(()=>n.value[e]??r.value[e]??t);return{enabled:i,palette:a(`shaderPalette`,`blue`),seed:d(()=>Number(n.value.shaderSeed??r.value.shaderSeed??1)),intensity:d(()=>Number(n.value.shaderIntensity??r.value.shaderIntensity??.62)),speed:d(()=>Number(n.value.shaderSpeed??r.value.shaderSpeed??.4)),motion:a(`shaderMotion`,`auto`),vignette:d(()=>Number(n.value.shaderVignette??r.value.shaderVignette??.2)),centerAlpha:d(()=>Number(n.value.shaderCenterAlpha??r.value.shaderCenterAlpha??.5)),fadeIn:d(()=>Number(n.value.shaderFadeIn??r.value.shaderFadeIn??7)),rust:d(()=>(n.value.shaderRust??r.value.shaderRust)!==!1),rustDelay:d(()=>Number(n.value.shaderRustDelay??r.value.shaderRustDelay??30)),rustDuration:d(()=>Number(n.value.shaderRustDuration??r.value.shaderRustDuration??60)),rustAmount:d(()=>Number(n.value.shaderRustAmount??r.value.shaderRustAmount??.55))}}var N={class:`slidev-layout section-break`},P={class:`section-body`},F=_(t({__name:`section-break`,setup(t){let{$frontmatter:n,$slidev:i}=h(),{enabled:o,palette:u,seed:d,intensity:f,speed:g,motion:_,vignette:v,centerAlpha:y,fadeIn:b,rust:x,rustDelay:S,rustDuration:w,rustAmount:T}=M(n,i?.configs);return(t,n)=>(e(),l(`div`,N,[c(o)?(e(),p(C,{key:0,palette:c(u),seed:c(d),intensity:c(f),speed:c(g),motion:c(_),vignette:c(v),"center-alpha":c(y),"fade-in":c(b)},null,8,[`palette`,`seed`,`intensity`,`speed`,`motion`,`vignette`,`center-alpha`,`fade-in`])):m(`v-if`,!0),s(`div`,P,[c(o)&&c(x)?(e(),p(j,{key:0,delay:c(S),duration:c(w),amount:c(T),seed:c(d),motion:c(_)},{default:r(()=>[a(t.$slots,`default`,{},void 0,!0)]),_:3},8,[`delay`,`duration`,`amount`,`seed`,`motion`])):a(t.$slots,`default`,{},void 0,!0,1)])]))}}),[[`__scopeId`,`data-v-02493f96`]]);export{F as t};
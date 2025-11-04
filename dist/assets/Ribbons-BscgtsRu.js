import{r as U,j as N}from"./react-vendor-BEd20k2d.js";import{R as X,T as Y,V as u,P as _,C as q}from"./ogl-CzX5Vxbp.js";import"./vendor-Cin9SxG_.js";import"./embla-CMPFBS9o.js";const K=({colors:p=["#ff9346","#7cff67","#ffee51","#5227FF"],baseSpring:g=.03,baseFriction:E=.9,baseThickness:w=30,offsetFactor:x=.05,maxAge:f=500,pointCount:R=50,speedMultiplier:T=.6,enableFade:F=!1,enableShaderEffect:P=!1,effectAmplitude:V=2,backgroundColor:r=[0,0,0,0]})=>{const L=U.useRef(null);return U.useEffect(()=>{const t=L.current;if(!t)return;const v=new X({dpr:window.devicePixelRatio||2,alpha:!0}),i=v.gl;Array.isArray(r)&&r.length===4?i.clearColor(r[0],r[1],r[2],r[3]):i.clearColor(0,0,0,0),i.canvas.style.position="absolute",i.canvas.style.top="0",i.canvas.style.left="0",i.canvas.style.width="100%",i.canvas.style.height="100%",t.appendChild(i.canvas);const S=new Y,h=[],j=`
      precision highp float;
      
      attribute vec3 position;
      attribute vec3 next;
      attribute vec3 prev;
      attribute vec2 uv;
      attribute float side;
      
      uniform vec2 uResolution;
      uniform float uDPR;
      uniform float uThickness;
      uniform float uTime;
      uniform float uEnableShaderEffect;
      uniform float uEffectAmplitude;
      
      varying vec2 vUV;
      
      vec4 getPosition() {
          vec4 current = vec4(position, 1.0);
          vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
          vec2 nextScreen = next.xy * aspect;
          vec2 prevScreen = prev.xy * aspect;
          vec2 tangent = normalize(nextScreen - prevScreen);
          vec2 normal = vec2(-tangent.y, tangent.x);
          normal /= aspect;
          normal *= mix(1.0, 0.1, pow(abs(uv.y - 0.5) * 2.0, 2.0));
          float dist = length(nextScreen - prevScreen);
          normal *= smoothstep(0.0, 0.02, dist);
          float pixelWidthRatio = 1.0 / (uResolution.y / uDPR);
          float pixelWidth = current.w * pixelWidthRatio;
          normal *= pixelWidth * uThickness;
          current.xy -= normal * side;
          if(uEnableShaderEffect > 0.5) {
            current.xy += normal * sin(uTime + current.x * 10.0) * uEffectAmplitude;
          }
          return current;
      }
      
      void main() {
          vUV = uv;
          gl_Position = getPosition();
      }
    `,A=`
      precision highp float;
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uEnableFade;
      varying vec2 vUV;
      void main() {
          float fadeFactor = 1.0;
          if(uEnableFade > 0.5) {
              fadeFactor = 1.0 - smoothstep(0.0, 1.0, vUV.y);
          }
          gl_FragColor = vec4(uColor, uOpacity * fadeFactor);
      }
    `;function d(){if(!t)return;const n=t.clientWidth,s=t.clientHeight;v.setSize(n,s),h.forEach(e=>e.polyline.resize())}window.addEventListener("resize",d);const D=(p.length-1)/2;p.forEach((n,s)=>{const e=g+(Math.random()-.5)*.05,o=E+(Math.random()-.5)*.05,c=w+(Math.random()-.5)*3,l=new u((s-D)*x+(Math.random()-.5)*.01,(Math.random()-.5)*.1,0),m={spring:e,friction:o,mouseVelocity:new u,mouseOffset:l,points:[],polyline:{}},H=R,y=[];for(let C=0;C<H;C++)y.push(new u);m.points=y,m.polyline=new _(i,{points:y,vertex:j,fragment:A,uniforms:{uColor:{value:new q(n)},uThickness:{value:c},uOpacity:{value:1},uTime:{value:0},uEnableShaderEffect:{value:P?1:0},uEffectAmplitude:{value:V},uEnableFade:{value:F?1:0}}}),m.polyline.mesh.setParent(S),h.push(m)}),d();const M=new u;function a(n){let s,e;if(!t)return;const o=t.getBoundingClientRect();"changedTouches"in n&&n.changedTouches.length?(s=n.changedTouches[0].clientX-o.left,e=n.changedTouches[0].clientY-o.top):n instanceof MouseEvent?(s=n.clientX-o.left,e=n.clientY-o.top):(s=0,e=0);const c=t.clientWidth,l=t.clientHeight;M.set(s/c*2-1,e/l*-2+1,0)}t.addEventListener("mousemove",a),t.addEventListener("touchstart",a),t.addEventListener("touchmove",a);const z=new u;let W,b=performance.now();function O(){W=requestAnimationFrame(O);const n=performance.now(),s=n-b;b=n,h.forEach(e=>{z.copy(M).add(e.mouseOffset).sub(e.points[0]).multiply(e.spring),e.mouseVelocity.add(z).multiply(e.friction),e.points[0].add(e.mouseVelocity);for(let o=1;o<e.points.length;o++)if(isFinite(f)&&f>0){const c=f/(e.points.length-1),l=Math.min(1,s*T/c);e.points[o].lerp(e.points[o-1],l)}else e.points[o].lerp(e.points[o-1],.9);e.polyline.mesh.program.uniforms.uTime&&(e.polyline.mesh.program.uniforms.uTime.value=n*.001),e.polyline.updateGeometry()}),v.render({scene:S})}return O(),()=>{window.removeEventListener("resize",d),t.removeEventListener("mousemove",a),t.removeEventListener("touchstart",a),t.removeEventListener("touchmove",a),cancelAnimationFrame(W),i.canvas&&i.canvas.parentNode===t&&t.removeChild(i.canvas)}},[p,g,E,w,x,f,R,T,F,P,V,r]),N.jsx("div",{ref:L,className:"relative w-full h-full"})};export{K as default};

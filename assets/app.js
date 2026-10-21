/* Rīgas SECAP vidusposma pārskats – vietnes skripts.
   Dati: assets/data.js (window.SECAP), ģenerēts ar build/build.py. */
(function(){
'use strict';
const D=window.SECAP;
const $=s=>document.querySelector(s);
const NS='http://www.w3.org/2000/svg';
const YEARS=D.years;
const IND={};D.indicators.forEach(i=>IND[i.code]=i);
const T=D.targets, M=D.measures;
const PAGE=document.body.dataset.page, SEC=document.body.dataset.sector||null;
const SN=D.sector_names;
const SECS=['pas','dz','en','tr'];
const SECPAGE={pas:'pasvaldiba.html',dz:'ekas.html',en:'energija.html',tr:'transports.html'};
const SCOL={pas:'var(--s-pas)',dz:'var(--s-dz)',en:'var(--s-en)',tr:'var(--s-tr)',kop:'var(--s-kop)'};
const TIME_PROG=(2025-2019)/(2030-2019), TOL=0.10;
const LOGO=`<svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="786.00 529.01 348.00 162.14" fill="currentColor" role="img" aria-label="Rīga"><path d="M 1014.402344 634.617188 L 1005.890625 619.957031 L 998.074219 619.957031 L 998.074219 634.617188 L 991.464844 634.617188 L 991.464844 594.378906 L 1007.558594 594.378906 C 1009.261719 594.34375 1010.953125 594.660156 1012.527344 595.316406 C 1014.097656 595.96875 1015.519531 596.941406 1016.695312 598.175781 C 1017.925781 599.351562 1018.902344 600.773438 1019.554688 602.34375 C 1020.207031 603.917969 1020.523438 605.609375 1020.488281 607.3125 C 1020.46875 609.832031 1019.695312 612.289062 1018.273438 614.367188 C 1016.851562 616.445312 1014.839844 618.050781 1012.5 618.980469 L 1021.640625 634.617188 Z M 998.078125 600.589844 L 998.078125 614.039062 L 1007.5625 614.039062 C 1008.421875 614.015625 1009.265625 613.820312 1010.046875 613.46875 C 1010.828125 613.117188 1011.535156 612.613281 1012.121094 611.988281 C 1012.707031 611.363281 1013.167969 610.628906 1013.46875 609.828125 C 1013.773438 609.023438 1013.914062 608.171875 1013.882812 607.3125 C 1013.914062 606.457031 1013.773438 605.601562 1013.46875 604.800781 C 1013.167969 603.996094 1012.710938 603.261719 1012.121094 602.636719 C 1011.535156 602.011719 1010.828125 601.507812 1010.046875 601.15625 C 1009.265625 600.804688 1008.421875 600.613281 1007.5625 600.589844 Z M 998.078125 600.589844 "/><path d="M 1027.550781 590.355469 L 1027.550781 585.242188 L 1043.644531 585.242188 L 1043.644531 590.355469 Z M 1032.265625 594.378906 L 1038.875 594.378906 L 1038.875 634.613281 L 1032.265625 634.613281 Z M 1032.265625 594.378906 "/><path d="M 1091.007812 613.808594 L 1091.007812 616.566406 C 1091.09375 619.082031 1090.648438 621.589844 1089.710938 623.925781 C 1088.769531 626.261719 1087.351562 628.375 1085.550781 630.128906 C 1081.929688 633.636719 1077.164062 635.363281 1071.296875 635.363281 C 1068.453125 635.449219 1065.625 634.960938 1062.976562 633.921875 C 1060.328125 632.886719 1057.921875 631.320312 1055.894531 629.324219 C 1053.929688 627.398438 1052.378906 625.085938 1051.339844 622.535156 C 1050.304688 619.984375 1049.800781 617.25 1049.859375 614.496094 C 1049.804688 611.753906 1050.3125 609.027344 1051.351562 606.488281 C 1052.386719 603.949219 1053.933594 601.648438 1055.894531 599.726562 C 1057.855469 597.734375 1060.199219 596.164062 1062.789062 595.117188 C 1065.382812 594.066406 1068.160156 593.5625 1070.953125 593.632812 C 1074.453125 593.5625 1077.90625 594.40625 1080.980469 596.082031 C 1084.054688 597.753906 1086.640625 600.199219 1088.480469 603.179688 L 1082.789062 606.453125 C 1081.5625 604.433594 1079.820312 602.777344 1077.738281 601.65625 C 1075.65625 600.535156 1073.316406 599.988281 1070.953125 600.074219 C 1069.027344 600.011719 1067.109375 600.34375 1065.320312 601.058594 C 1063.527344 601.769531 1061.90625 602.84375 1060.550781 604.210938 C 1059.207031 605.574219 1058.15625 607.191406 1057.457031 608.96875 C 1056.753906 610.746094 1056.417969 612.648438 1056.46875 614.558594 C 1056.414062 616.460938 1056.746094 618.355469 1057.449219 620.125 C 1058.148438 621.890625 1059.203125 623.5 1060.550781 624.847656 C 1061.984375 626.214844 1063.683594 627.28125 1065.539062 627.984375 C 1067.394531 628.683594 1069.371094 629.003906 1071.355469 628.929688 C 1078.480469 628.929688 1083.136719 625.308594 1084.34375 619.730469 L 1070.894531 619.730469 L 1070.894531 613.8125 Z M 1091.007812 613.808594 "/><path d="M 1126.875 634.613281 L 1124.058594 626.507812 L 1106.929688 626.507812 L 1104.113281 634.613281 L 1096.929688 634.613281 L 1111.527344 594.378906 L 1119.460938 594.378906 L 1134 634.613281 Z M 1109.117188 620.296875 L 1121.875 620.296875 L 1115.492188 602.132812 Z M 1109.117188 620.296875 "/><path d="M 875.855469 575.066406 L 874.5625 556.398438 L 893.234375 557.6875 L 893.234375 546.386719 L 874.5625 547.679688 L 875.855469 529.007812 L 864.554688 529.007812 L 865.84375 547.679688 L 847.175781 546.386719 L 847.175781 557.6875 L 865.84375 556.398438 L 864.554688 575.066406 Z M 870.203125 611.316406 L 810.734375 551.839844 L 804.359375 558.214844 L 810.960938 564.816406 L 798.210938 577.5625 L 805.121094 584.472656 L 798.746094 590.847656 L 792.375 584.472656 L 786 590.847656 L 798.746094 603.59375 L 811.496094 590.847656 L 816.800781 596.152344 L 804.054688 608.902344 L 816.800781 621.648438 L 823.175781 615.277344 L 816.800781 608.902344 L 823.175781 602.527344 L 830.082031 609.433594 L 842.828125 596.6875 L 863.832031 617.691406 L 842.960938 638.5625 L 842.929688 638.535156 C 840.253906 641.214844 832.5625 643.082031 824.226562 643.082031 C 815.890625 643.082031 808.207031 641.214844 805.523438 638.535156 L 799.175781 644.882812 C 801.851562 647.5625 803.726562 655.25 803.726562 663.585938 C 803.726562 671.921875 801.851562 679.609375 799.175781 682.292969 L 805.523438 688.640625 C 808.203125 685.960938 815.890625 684.089844 824.226562 684.089844 C 832.5625 684.089844 840.246094 685.960938 842.929688 688.640625 L 849.277344 682.292969 C 846.601562 679.613281 844.730469 671.925781 844.730469 663.585938 C 844.730469 655.25 846.601562 647.566406 849.277344 644.882812 L 849.25 644.851562 L 870.121094 623.980469 L 897.582031 651.445312 C 895.058594 652.167969 892.757812 653.519531 890.898438 655.375 C 889.039062 657.234375 887.683594 659.53125 886.960938 662.058594 C 884.222656 671.703125 889.335938 681.539062 898.84375 684.195312 C 903.050781 685.128906 907.453125 684.441406 911.175781 682.269531 C 911.992188 684.125 913.183594 685.796875 914.667969 687.175781 C 916.152344 688.558594 917.90625 689.621094 919.816406 690.300781 C 922.113281 690.957031 924.515625 691.152344 926.890625 690.875 C 929.261719 690.597656 931.554688 689.855469 933.636719 688.683594 C 935.21875 687.804688 936.660156 686.695312 937.917969 685.390625 C 939.21875 684.136719 940.332031 682.691406 941.210938 681.109375 C 942.378906 679.027344 943.125 676.734375 943.402344 674.363281 C 943.679688 671.988281 943.484375 669.585938 942.824219 667.289062 C 942.144531 665.378906 941.085938 663.625 939.703125 662.140625 C 938.324219 660.652344 936.652344 659.464844 934.796875 658.644531 C 936.96875 654.921875 937.65625 650.519531 936.722656 646.3125 C 934.070312 636.804688 924.230469 631.691406 914.585938 634.429688 C 912.054688 635.15625 909.753906 636.515625 907.894531 638.378906 C 906.035156 640.242188 904.683594 642.550781 903.96875 645.085938 L 876.492188 617.605469 L 897.425781 596.671875 L 922.097656 621.332031 L 934.839844 608.582031 L 924.113281 597.863281 L 917.972656 604.464844 L 911.597656 598.089844 L 918.175781 591.921875 L 910.179688 583.921875 L 916.550781 577.546875 L 924.546875 585.546875 L 930.722656 578.96875 L 937.09375 585.34375 L 930.492188 591.484375 L 941.210938 602.210938 L 953.957031 589.464844 L 929.300781 564.796875 L 935.878906 558.214844 L 929.605469 551.910156 Z M 835.75 663.582031 C 835.753906 667.914062 836.210938 672.230469 837.113281 676.464844 C 832.878906 675.5625 828.5625 675.105469 824.230469 675.101562 C 819.902344 675.105469 815.585938 675.5625 811.351562 676.464844 C 812.253906 672.230469 812.710938 667.914062 812.710938 663.582031 C 812.710938 659.253906 812.253906 654.933594 811.351562 650.699219 C 815.585938 651.605469 819.902344 652.058594 824.230469 652.0625 C 828.5625 652.058594 832.878906 651.605469 837.113281 650.699219 C 836.210938 654.933594 835.753906 659.253906 835.75 663.585938 Z M 836.453125 590.308594 L 830.082031 596.683594 L 823.707031 590.308594 L 830.082031 583.933594 Z M 817.335938 583.933594 L 810.960938 577.558594 L 817.335938 571.1875 L 823.707031 577.558594 Z M 910.441406 650.128906 C 910.792969 648.316406 911.679688 646.652344 912.984375 645.347656 C 914.289062 644.039062 915.953125 643.152344 917.761719 642.796875 C 919.894531 642.390625 922.105469 642.742188 924.011719 643.78125 C 925.914062 644.824219 927.398438 646.496094 928.210938 648.511719 C 928.992188 650.453125 929.078125 652.605469 928.460938 654.605469 C 927.636719 656.933594 926.578125 659.175781 925.300781 661.292969 L 925.574219 661.449219 C 927.613281 662.597656 929.578125 663.871094 931.457031 665.265625 C 933.050781 666.648438 934.121094 668.535156 934.488281 670.609375 C 934.75 672.148438 934.625 673.730469 934.125 675.207031 C 933.621094 676.683594 932.757812 678.015625 931.609375 679.074219 C 930.550781 680.21875 929.222656 681.085938 927.742188 681.589844 C 926.265625 682.089844 924.6875 682.214844 923.148438 681.953125 C 921.070312 681.582031 919.183594 680.515625 917.800781 678.921875 C 916.410156 677.042969 915.136719 675.078125 913.988281 673.039062 L 913.828125 672.765625 C 911.714844 674.042969 909.472656 675.101562 907.144531 675.921875 C 905.144531 676.542969 902.992188 676.453125 901.050781 675.675781 C 899.035156 674.863281 897.363281 673.378906 896.320312 671.472656 C 895.28125 669.566406 894.929688 667.359375 895.335938 665.226562 C 895.691406 663.414062 896.578125 661.75 897.886719 660.445312 C 899.191406 659.144531 900.855469 658.257812 902.667969 657.902344 C 904.070312 657.625 909.632812 657.488281 909.6875 657.484375 L 910.019531 657.476562 L 910.027344 657.148438 C 910.023438 657.101562 910.164062 651.535156 910.441406 650.136719 Z M 910.441406 650.128906 "/></svg>`;
const IND_MEAS={};M.forEach(m=>m.indicators.forEach(c=>(IND_MEAS[c]=IND_MEAS[c]||[]).push(m)));
const TXT=D.texts||{};

/* ---------------- formatēšana ---------------- */
const nfCache={};
function fmt(v,d){if(v==null||isNaN(v))return '–';if(!nfCache[d])nfCache[d]=new Intl.NumberFormat('lv-LV',{minimumFractionDigits:d,maximumFractionDigits:d});return nfCache[d].format(v).replace(/ | /g,' ').replace(/^-/,'−')}
function autoDec(v){const a=Math.abs(v);return a===0?0:a>=100?0:a>=10?1:a>=1?2:3}
function fa(v){return v==null?'–':fmt(v,autoDec(v))}
function sgn(v,d){if(v==null)return '–';const s=v>0.00001?'+':v<-0.00001?'−':'';return s+fmt(Math.abs(v),d)}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function lvText(s){return esc(s).replace(/(\d)\.(\d)(?!\.)/g,'$1,$2').replace(/(\d)%/g,'$1 %').replace(/-(\d)/g,'−$1').replace(/m2\b/g,'m²').replace(/m3\b/g,'m³').replace(/CO2/g,'CO₂')}
function unitLv(u){return (u||'').replace(/m2\b/g,'m²').replace(/m3\b/g,'m³').replace(/CO2/g,'CO₂')}
const URL_RE=/https?:\/\/[^\s<>"]+[^\s<>".,;:)]/g;
function shortUrl(u){try{const x=new URL(u);let p=(x.hostname.replace(/^www\./,'')+x.pathname).replace(/\/$/,'');return p.length>48?p.slice(0,46)+'…':p}catch(e){return u}}
function link(u,label){return `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(label||shortUrl(u))}</a>`}
/* teksts no pārskata: aizsargāt un pārvērst saites */
function rich(s){s=String(s||'');let out='',last=0;s.replace(URL_RE,(u,i)=>{out+=esc(s.slice(last,i))+link(u);last=i+u.length;return u});return out+esc(s.slice(last))}
const TODO_RE=/^(papildināt|…|\.\.\.|nepieciešama papildu informācija)\.?$/i;
const isTodo=s=>TODO_RE.test(String(s||'').trim());
function mailto(subject,context){const e=D.site.contact_email||'';const body=`${context}\n\nPapildinājums vai labojums:\n\n\nAvots / kontaktpersona:\n`;return `mailto:${e}?subject=${encodeURIComponent('SECAP vidusposms: '+subject)}&body=${encodeURIComponent(body)}`}
function todoBox(subject,context,text){return `<p class="todo">${esc(text||'Šeit trūkst informācijas.')} <a href="${mailto(subject,context)}">Papildināt →</a></p>`}
function prose(list,subject,context,cls){if(!list||!list.length)return '';return `<div class="prose${cls?' '+cls:''}">${list.map(p=>isTodo(p)?todoBox(subject,context):`<p>${rich(p)}</p>`).join('')}</div>`}
function invTxt(v){if(v==null)return null;return v>=1000?fmt(v/1000,v>=100000?0:1)+' milj. EUR':fmt(v,0)+' tūkst. EUR'}

/* ---------------- statusi ---------------- */
const ST={
 'Sasniegts':{cls:'st-done',ic:'✓',col:'var(--bar-done)',ord:0,txt:'#78E9B8'},
 'Atbilst trajektorijai':{cls:'st-on',ic:'↗',col:'var(--bar-on)',ord:1,txt:'#0D382C'},
 'Atpaliek no trajektorijas':{cls:'st-lag',ic:'!',col:'var(--bar-lag)',ord:2,txt:'#43010B'},
 'Nav progresa':{cls:'st-no',ic:'✕',col:'var(--bar-no)',ord:3,txt:'#BEAFEC'},
 'Nav datu':{cls:'st-nd',ic:'–',col:'var(--bar-nd)',ord:4,txt:'#2f3125'},
 'Netiek vērtēts':{cls:'st-nv',ic:'○',col:'var(--bar-nv)',ord:5,txt:'#E4E2D6'}};
const MST={
 'Īstenots':{cls:'st-done',ic:'✓',col:'var(--m-done)',ord:0},
 'Tiek īstenots':{cls:'st-on',ic:'↗',col:'var(--m-on)',ord:1},
 'Sagatavošanā':{cls:'st-prep',ic:'…',col:'var(--m-prep)',ord:2},
 'Daļēji īstenots':{cls:'st-lag',ic:'◐',col:'var(--m-part)',ord:3},
 'Nav uzsākts':{cls:'st-no',ic:'✕',col:'var(--m-no)',ord:4},
 'Nav informācijas':{cls:'st-nd',ic:'?',col:'var(--m-nd)',ord:5}};
function pill(s){const m=ST[s]||ST['Nav datu'];return `<span class="pill ${m.cls}"><span class="ic" aria-hidden="true">${m.ic}</span>${esc(s)}</span>`}
function mpill(s){const m=MST[s]||MST['Nav informācijas'];return `<span class="pill ${m.cls}"><span class="ic" aria-hidden="true">${m.ic}</span>${esc(s)}</span>`}
const MORDER=Object.keys(MST);
function countBy(list,f){const c={};list.forEach(x=>{const k=f(x);c[k]=(c[k]||0)+1});return c}

/* ---------------- tooltip un SVG ---------------- */
let tip;
function showTip(html,cx,cy){tip.innerHTML=html;tip.style.opacity=1;const r=tip.getBoundingClientRect();let x=cx+14,y=cy-r.height-12;if(x+r.width>innerWidth-8)x=cx-r.width-14;if(y<8)y=cy+16;tip.style.left=x+'px';tip.style.top=y+'px'}
function hideTip(){if(tip)tip.style.opacity=0}
function el(tag,attrs,parent){const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e}
function niceTicks(min,max,n){if(min===max){min-=1;max+=1}const span=max-min;const step0=span/n;const mag=Math.pow(10,Math.floor(Math.log10(step0)));const f=step0/mag;const step=(f<1.5?1:f<3?2:f<7?5:10)*mag;const lo=Math.floor(min/step)*step,hi=Math.ceil(max/step)*step;const t=[];for(let v=lo;v<=hi+step/2;v+=step)t.push(+v.toFixed(10));return t}
function live(node,fn){if(!node)return;let raf;const run=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{if(node.clientWidth>0)fn()})};run();new ResizeObserver(run).observe(node);return run}
function lineChart(node,o){
  node.innerHTML='';
  const W=node.clientWidth,H=node.clientHeight||240;
  const m={l:54,r:o.mr||20,t:16,b:28};
  const x0=o.x0,x1=o.x1;
  let ys=[];o.series.forEach(s=>s.pts.forEach(p=>p[1]!=null&&ys.push(p[1])));(o.extraY||[]).forEach(v=>ys.push(v));
  if(!ys.length)return;
  let yt=niceTicks(Math.min(...ys),Math.max(...ys),o.nt||4);
  const y0=yt[0],y1=yt[yt.length-1];const tstep=yt.length>1?yt[1]-yt[0]:1;const tdec=Math.max(0,-Math.floor(Math.log10(tstep)+1e-9));const yF=o.yFmt||(v=>fmt(v,tdec));
  m.l=Math.max(30,12+7*Math.max(...yt.map(v=>yF(v).length)));
  const X=v=>m.l+(v-x0)/(x1-x0)*(W-m.l-m.r), Y=v=>m.t+(1-(v-y0)/(y1-y0))*(H-m.t-m.b);
  const svg=el('svg',{width:W,height:H,viewBox:`0 0 ${W} ${H}`,role:'img','aria-label':o.aria||''},node);
  yt.forEach(v=>{el('line',{x1:m.l,x2:W-m.r,y1:Y(v),y2:Y(v),stroke:v===0&&y0<0?'var(--axis)':'var(--grid)','stroke-width':1},svg);const t=el('text',{x:m.l-8,y:Y(v)+4,'text-anchor':'end'},svg);t.textContent=yF(v)});
  let xt=o.xTicks;if(!xt){const pxPer=(W-m.l-m.r)/(x1-x0);const step=pxPer>=38?1:pxPer>=19?2:3;xt=[];for(let yr=x0;yr<=x1;yr+=step)xt.push(yr);if(xt[xt.length-1]!==x1){if(x1-xt[xt.length-1]<step)xt.pop();xt.push(x1)}}
  xt.forEach(yr=>{const t=el('text',{x:X(yr),y:H-8,'text-anchor':'middle'},svg);t.textContent=yr;if(yr===2025)t.setAttribute('style','fill:var(--ink);font-weight:600')});
  o.series.forEach(s=>{
    const pts=s.pts.filter(p=>p[1]!=null);if(!pts.length)return;
    if(pts.length>1){let segs=[],cur=[];s.pts.forEach(p=>{if(p[1]==null){if(cur.length)segs.push(cur);cur=[]}else cur.push(p)});if(cur.length)segs.push(cur);if(s.bridge)segs=[pts];
      segs.forEach(sg=>{if(sg.length<2)return;el('path',{d:'M'+sg.map(p=>X(p[0]).toFixed(1)+','+Y(p[1]).toFixed(1)).join('L'),fill:'none',stroke:s.color,'stroke-width':s.w||2,'stroke-linecap':'round','stroke-linejoin':'round','stroke-dasharray':s.dash||'none'},svg)})}
    if(s.dots!==false)pts.forEach(p=>{const hollow=s.hollow&&s.hollow.includes(p[0]);el('circle',{cx:X(p[0]),cy:Y(p[1]),r:s.r||4,fill:hollow?'var(--surface)':s.color,stroke:hollow?s.color:'var(--surface)','stroke-width':2},svg)});
  });
  (o.marks||[]).forEach(mk=>{const cx=X(mk.x),cy=Y(mk.y);
    if(mk.shape==='target')el('path',{d:`M${cx},${cy-6}L${cx+6},${cy}L${cx},${cy+6}L${cx-6},${cy}Z`,fill:'var(--ink)',stroke:'var(--surface)','stroke-width':2},svg);
    if(mk.label){const t=el('text',{x:cx+(mk.dx||0),y:cy+(mk.dy||-12),'text-anchor':mk.anchor||'middle',style:'fill:var(--ink-2);font-weight:600'},svg);t.textContent=mk.label}});
  const hx=o.hoverXs||[];if(!hx.length||!o.tip)return;
  const cross=el('line',{y1:m.t,y2:H-m.b,stroke:'var(--axis)','stroke-width':1,opacity:0},svg);
  const ov=el('rect',{x:m.l,y:0,width:Math.max(0,W-m.l-m.r),height:H,fill:'transparent'},svg);ov.style.cursor='crosshair';
  ov.addEventListener('pointermove',e=>{const r=svg.getBoundingClientRect();const px=e.clientX-r.left;let best=hx[0],bd=1e9;hx.forEach(v=>{const d=Math.abs(X(v)-px);if(d<bd){bd=d;best=v}});cross.setAttribute('x1',X(best));cross.setAttribute('x2',X(best));cross.setAttribute('opacity',1);showTip(o.tip(best),e.clientX,e.clientY)});
  ov.addEventListener('pointerleave',()=>{cross.setAttribute('opacity',0);hideTip()});
}

/* ---------------- rādītāju palīgfunkcijas ---------------- */
const lastIdx=v=>{for(let i=v.length-1;i>=0;i--)if(v[i]!=null)return i;return -1};
const firstIdx=v=>v.findIndex(x=>x!=null);
function withBreak(i){const p=[];YEARS.forEach((y,k)=>{if(i.breakBefore===y)p.push([y-.5,null]);p.push([y,i.values[k]])});return p}
function isPct(u){return /%/.test(u||'')}
function indDec(i){if(i.dec!=null)return i.dec;const v=i.values.filter(x=>x!=null);if(!v.length)return 0;if(v.every(x=>Math.abs(x-Math.round(x))<1e-9))return 0;return autoDec(Math.max(...v.map(Math.abs)))}
function fi(i,x){return x==null?'–':(i.unit==='% pret bāzi'?sgn(x,indDec(i)):fmt(x,indDec(i)))}
function chgTxt(i){const v=i.breakBefore?i.values.map((x,k)=>YEARS[k]<i.breakBefore?x:null):i.values,a=firstIdx(v),b=lastIdx(v);if(a<0)return 'nav datu';if(a===b)return 'tikai '+YEARS[a];
  if(isPct(i.unit))return `${YEARS[a]}→${YEARS[b]}: ${sgn(v[b]-v[a],1)} pp`;if(v[a]===0)return `${YEARS[a]}→${YEARS[b]}: ${sgn(v[b]-v[a],0)}`;return `${YEARS[a]}→${YEARS[b]}: ${sgn((v[b]/v[a]-1)*100,1)} %`}
function spark(v,brk){if(brk==null)brk=-1;const pts=v.map((x,i)=>[i,x]).filter(p=>p[1]!=null);if(pts.length<1)return '<svg width="100%" height="34" aria-hidden="true"></svg>';
  const ys=pts.map(p=>p[1]);let lo=Math.min(...ys),hi=Math.max(...ys);if(lo===hi){lo-=1;hi+=1}const X=i=>2+i/5*196,Y=y=>30-(y-lo)/(hi-lo)*26;
  const d='M'+pts.map(p=>X(p[0]).toFixed(1)+','+Y(p[1]).toFixed(1)).join('L');const dl=pts.map((p,k)=>((k===0||YEARS[p[0]]===brk)?'M':'L')+X(p[0]).toFixed(1)+','+Y(p[1]).toFixed(1)).join('');const l=pts[pts.length-1];
  return `<div style="position:relative"><svg viewBox="0 0 200 34" preserveAspectRatio="none" width="100%" height="34" aria-hidden="true"><path d="${d}L${X(l[0])},34L${X(pts[0][0])},34Z" fill="var(--line1)" opacity=".10"/><path d="${dl}" fill="none" stroke="var(--line1)" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg><span style="position:absolute;left:${X(l[0])/2}%;top:${Y(l[1])/34*100}%;width:8px;height:8px;border-radius:50%;background:var(--line1);box-shadow:0 0 0 2px var(--surface);transform:translate(-50%,-50%)"></span></div>`}
function lastTxt(i){const b=lastIdx(i.values);return b<0?'nav datu':`${fi(i,i.values[b])} ${esc(unitLv(i.unit))}${b<5?' ('+YEARS[b]+')':''}`}
function icardHtml(i,asLink){const b=lastIdx(i.values);const inner=`<span class="code">${i.aux?'palīgdati':i.code} · ${lvText(i.sub||'')}</span><span class="nm">${lvText(i.name)}</span>${spark(i.values,i.breakBefore)}<span><span class="lv">${b<0?'–':fi(i,i.values[b])}</span> <span class="u">${esc(unitLv(i.unit))}${b>=0&&b<5?' ('+YEARS[b]+')':''}</span></span><span class="chg">${chgTxt(i)}</span>`;
  return asLink?`<a class="icard" href="raditaji.html#${encodeURIComponent(i.code)}">${inner}</a>`:`<button type="button" class="icard" aria-pressed="false" data-code="${esc(i.code)}">${inner}</button>`}

/* ---------------- lapas karkass ---------------- */
const NAV=[['index.html','Sākums','home'],['pasvaldiba.html','Pašvaldība','pas'],['ekas.html','Daudzdzīvokļu ēkas','dz'],['energija.html','Enerģija','en'],['transports.html','Transports','tr'],null,['merki.html','Mērķi','targets'],['pasakumi.html','Pasākumi','measures'],['raditaji.html','Rādītāji','indicators'],['dati.html','Dati','data'],['par.html','Par pārskatu','about'],null,['en.html','English','en-summary']];
function shell(o){
  const cur=SEC||PAGE;const en=PAGE==='en-summary';
  const band=`<a class="skip" href="#main">${en?'Skip to content':'Pāriet uz saturu'}</a><div class="band"><div class="wrap">
    <div class="topbar"><a class="logo" href="index.html" aria-label="Rīga – sākumlapa">${LOGO}</a><span class="draft">${en?'Draft':esc(D.site.version_label)} · ${en?'data':'dati'} 2020–2025</span></div>
    <header class="top"><div class="eyebrow">${esc(o.eyebrow||(en?'Riga Sustainable Energy and Climate Action Plan 2022–2030':'Rīgas ilgtspējīgas enerģētikas un klimata rīcības plāns 2022–2030'))}</div><h1>${o.title}</h1>${o.lede?`<p class="lede">${o.lede}</p>`:''}${o.extra||''}</header></div></div>
    <nav class="site" aria-label="${en?'Main navigation':'Galvenā navigācija'}"><ul>${NAV.map(n=>n?`<li><a href="${n[0]}"${n[2]===cur?' aria-current="page"':''}>${n[1]}</a></li>`:'<li class="sep" aria-hidden="true"></li>').join('')}</ul></nav>`;
  document.getElementById('top').innerHTML=band;
  const ft=document.getElementById('foot');
  ft.className='site wrap';
  ft.innerHTML=en?`<div><p>Riga SECAP 2022–2030 · mid-term review · data 2020–2025 · draft (${esc(D.meta.built)}).</p><p>Prepared by the Riga Energy Agency (REA). Data and texts: <a href="${D.site.license_url}">${D.site.license}</a>.</p></div><span class="logo" role="img" aria-label="Rīga">${LOGO}</span>`
    :`<div><p>Rīgas SECAP 2022–2030 · vidusposma pārskats · dati 2020–2025 · ${esc(D.site.version_label.toLowerCase())} (${esc(D.meta.built)}).</p><p>Sagatavoja Rīgas valstspilsētas pašvaldības aģentūra “Rīgas enerģētikas aģentūra” (REA). Dati un teksti: <a href="${D.site.license_url}">${D.site.license}</a> · <a href="dati.html">Lejupielādēt datus</a> · <a href="par.html#pieklustamiba">Piekļūstamība</a></p></div><span class="logo" role="img" aria-label="Rīga">${LOGO}</span>`;
  tip=document.createElement('div');tip.id='tip';tip.setAttribute('role','tooltip');document.body.appendChild(tip);
}
function notice(){const t=(TXT.darba_versija||[]).join(' ');return `<div class="notice" role="note"><p><b>Darba versija.</b> ${esc(t.replace(/^Šī ir vidusposma pārskata darba versija\.\s*/,''))}</p><a class="btn" href="${mailto('vispārīgs papildinājums','Lapa: '+document.title)}">Sūtīt papildinājumu</a></div>`}
function horizon(){
  return `<div class="horizon" id="horizon" role="img" aria-label="Plāna laika posms no 2019. līdz 2030. gadam; pārskata gads 2025"></div>`}
function drawHorizon(){live($('#horizon'),()=>{
  const n=$('#horizon');n.innerHTML='';const W=n.clientWidth,H=58;const l=6,r=6;const X=y=>l+(y-2019)/11*(W-l-r);
  const svg=el('svg',{width:W,height:H,viewBox:`0 0 ${W} ${H}`,'aria-hidden':'true'},n);
  el('rect',{x:X(2019),y:22,width:X(2030)-X(2019),height:6,rx:3,fill:'var(--hdr-track)'},svg);
  el('rect',{x:X(2019),y:22,width:X(2025)-X(2019),height:6,rx:3,fill:'var(--hdr-2)'},svg);
  for(let y=2019;y<=2030;y++){const big=y===2019||y===2025||y===2030;el('line',{x1:X(y),x2:X(y),y1:big?14:31,y2:big?36:35,stroke:y<=2025?'var(--hdr-2)':'var(--hdr-track)','stroke-width':y===2025?2:1},svg)}
  const lab=(y,t1,anchor,bold)=>{const a=el('text',{x:X(y),y:10,'text-anchor':anchor,style:`font-family:var(--f-body);font-size:12px;fill:${bold?'#ffffff':'var(--hdr-2)'};font-weight:${bold?700:600}`},svg);a.textContent=t1;const b=el('text',{x:X(y),y:52,'text-anchor':anchor,style:'font-family:var(--f-body);font-size:12px;fill:#d5e5ff;opacity:.8'},svg);b.textContent=y};
  lab(2019,'Bāzes gads','start');lab(2025,'Pārskata gads','middle',true);lab(2030,'Mērķa gads','end')})}

/* ---------------- komponentes: CO2 ---------------- */
const tot=IND['5001'].values.map(v=>v/1000);
const BASE=1742,TGT=BASE*0.7;
function heroPanel(){return `<div class="panel"><div class="eyebrow">Rīgas kopējās CO₂ emisijas, 2025</div>
  <div class="hero-row"><div class="hero-num">${fmt(tot[5],0)}<small>kt CO₂</small></div>
  <div class="kv"><b>${sgn(IND['5003'].values[5],1)} %</b><span>pret 2019. gadu · mērķis −30 %</span></div>
  <div class="kv"><b>${sgn(IND['5002'].values[5],1)} %</b><span>pret 1990. gadu · mērķis −70 %</span></div></div>
  <div class="chart" id="heroChart" style="height:280px"></div>
  <div class="legend"><span><i class="ln" style="background:var(--line1)"></i>Faktiskās emisijas, kt CO₂</span><span><i class="dash"></i>Lineāra trajektorija līdz 2030. gada mērķim</span></div></div>`}
function drawHero(){const traj=y=>BASE+(TGT-BASE)*(y-2019)/11;
  live($('#heroChart'),()=>lineChart($('#heroChart'),{x0:2019,x1:2030,aria:'Rīgas kopējās CO2 emisijas 2019–2025 un trajektorija līdz 2030. gada mērķim',
    series:[{pts:[[2019,BASE],[2030,TGT]],color:'var(--ink-2)',dash:'5 5',w:1.5,dots:false},{pts:[[2019,BASE],...YEARS.map((y,i)=>[y,tot[i]])],color:'var(--line1)',hollow:[2019]}],
    extraY:[1200],marks:[{x:2030,y:TGT,shape:'target',label:'Mērķis '+fmt(TGT,0),anchor:'end',dx:-12,dy:4},{x:2019,y:BASE,label:'Bāze '+fmt(BASE,0),anchor:'start',dx:6,dy:-10}],
    yFmt:v=>fmt(v,0),hoverXs:[2019,...YEARS,2030],
    tip:y=>{const i=YEARS.indexOf(y);let h=`<b>${y}</b>`;if(y===2019)h+=`<div class="r"><span>Bāzes vērtība</span><b>${fmt(BASE,0)} kt</b></div>`;else if(i>=0){h+=`<div class="r"><span>Faktiski</span><b>${fmt(tot[i],0)} kt</b></div><div class="r"><span>Trajektorija</span><span>${fmt(traj(y),0)} kt</span></div><div class="r"><span>Pret 2019</span><span>${sgn(IND['5003'].values[i],1)} %</span></div>`}else h+=`<div class="r"><span>Mērķis (−30 %)</span><b>${fmt(TGT,0)} kt</b></div>`;return h}}))}
const COMP=[{code:'3012',label:'Centralizētā siltumapgāde',color:'var(--c1)'},{code:'3013',label:'Elektroenerģijas patēriņš',color:'var(--c2)'},{code:'3014',label:'Kurināmā patēriņš',color:'var(--c3)'},{code:'4011',label:'Transports',color:'var(--c4)'}];
COMP.forEach(c=>c.values=IND[c.code].values.map(v=>v/1000));
function co2Section(){const co2=T.filter(t=>t.table==='co2');
  return `<div class="panel"><h3>Emisiju struktūra, kt CO₂ gadā</h3><div class="chart" id="compChart" style="height:300px;margin-top:12px"></div>
  <div class="legend">${COMP.map(c=>`<span><i style="background:${c.color}"></i>${c.label}</span>`).join('')}</div>
  <details class="tbl"><summary>Rādīt tabulu</summary><div class="tscroll"><table class="data"><thead><tr><th>kt CO₂</th>${YEARS.map(y=>`<th>${y}</th>`).join('')}</tr></thead><tbody>${COMP.map(c=>`<tr><td>${c.label} <span class="code">${c.code}</span></td>${c.values.map(v=>`<td>${fmt(v,1)}</td>`).join('')}</tr>`).join('')}<tr><td><b>Kopā</b> <span class="code">5001</span></td>${tot.map(v=>`<td><b>${fmt(v,1)}</b></td>`).join('')}</tr></tbody></table></div></details></div>
  <div class="co2-grid">${co2.map(t=>`<div class="panel co2card"><h3>${lvText(t.goal)}</h3><div style="display:flex;justify-content:space-between;align-items:flex-end;gap:8px;flex-wrap:wrap"><div class="big">${sgn(t.v2025,1)} %</div>${pill(t.status)}</div><div class="sub">pret 2019. gadu · mērķis ${fmt(t.target,0)} % līdz 2030</div><div class="chart" id="co2c-${t.id}" style="height:150px"></div><div class="note">${lvText(t.comment)}</div></div>`).join('')}</div>`}
function drawCo2(){
  live($('#compChart'),()=>{const n=$('#compChart');n.innerHTML='';const W=n.clientWidth,H=n.clientHeight;const m={l:54,r:12,t:22,b:28};
    const yt=niceTicks(0,Math.max(...tot),4);const y1=yt[yt.length-1];const Y=v=>m.t+(1-v/y1)*(H-m.t-m.b);const band=(W-m.l-m.r)/YEARS.length;const bw=Math.min(24,band*.5);
    const svg=el('svg',{width:W,height:H,viewBox:`0 0 ${W} ${H}`,role:'img','aria-label':'CO2 emisiju struktūra 2020–2025 (dati tabulā zemāk)'},n);
    yt.forEach(v=>{el('line',{x1:m.l,x2:W-m.r,y1:Y(v),y2:Y(v),stroke:v===0?'var(--axis)':'var(--grid)'},svg);const t=el('text',{x:m.l-8,y:Y(v)+4,'text-anchor':'end'},svg);t.textContent=fmt(v,0)});
    YEARS.forEach((yr,i)=>{const cx=m.l+band*(i+.5);const g=el('g',{},svg);let acc=0;
      COMP.forEach((c,k)=>{const v=c.values[i];const yTop=Y(acc+v),yBot=Y(acc);const top=k===COMP.length-1;const h=Math.max(0,yBot-yTop-(k>0?2:0));const yb=yBot-(k>0?2:0);const x=cx-bw/2;
        if(top){const r=4;el('path',{d:`M${x},${yb}V${yb-h+r}Q${x},${yb-h} ${x+r},${yb-h}H${x+bw-r}Q${x+bw},${yb-h} ${x+bw},${yb-h+r}V${yb}Z`,fill:c.color},g)}else el('rect',{x,y:yb-h,width:bw,height:h,fill:c.color},g);acc+=v});
      const t=el('text',{x:cx,y:Y(tot[i])-7,'text-anchor':'middle',style:'fill:var(--ink-2);font-weight:600'},svg);t.textContent=fmt(tot[i],0);
      const xl=el('text',{x:cx,y:H-8,'text-anchor':'middle'},svg);xl.textContent=yr;
      const hit=el('rect',{x:cx-band/2,y:m.t,width:band,height:H-m.t-m.b,fill:'transparent'},svg);
      hit.addEventListener('pointermove',e=>showTip(`<b>${yr}</b>`+COMP.slice().reverse().map(c=>`<div class="r"><span><i style="background:${c.color}"></i>${c.label}</span><span>${fmt(c.values[i],0)}</span></div>`).join('')+`<div class="r"><span>Kopā, kt</span><b>${fmt(tot[i],0)}</b></div>`,e.clientX,e.clientY));
      hit.addEventListener('pointerleave',hideTip)})});
  T.filter(t=>t.table==='co2').forEach(t=>{const n=document.getElementById('co2c-'+t.id);const ind=IND[t.code];
    live(n,()=>lineChart(n,{x0:2019,x1:2030,xTicks:[2019,2025,2030],aria:t.goal,series:[{pts:[[2019,0],[2030,t.target]],color:'var(--ink-2)',dash:'4 4',w:1.5,dots:false},{pts:[[2019,0],...YEARS.map((y,i)=>[y,ind.values[i]])],color:'var(--line1)',r:3.5,hollow:[2019]}],
      marks:[{x:2030,y:t.target,shape:'target'}],extraY:[0],yFmt:v=>fmt(v,0)+' %',nt:3,hoverXs:YEARS,
      tip:y=>{const i=YEARS.indexOf(y);return `<b>${y}</b><div class="r"><span>Pret 2019</span><b>${sgn(ind.values[i],1)} %</b></div><div class="r"><span>Trajektorija</span><span>${sgn(t.target*(y-2019)/11,1)} %</span></div>`}}))})}

/* ---------------- komponentes: mērķi ---------------- */
const RS=[['kop','Rīgas kopējās emisijas'],['pas','Pašvaldības infrastruktūra'],['dz','Daudzdzīvokļu ēkas'],['en','Enerģijas ražošana'],['tr','Transports']];
const tcounts=countBy(T,t=>t.status);
const torder=Object.keys(tcounts).sort((a,b)=>ST[a].ord-ST[b].ord);
function statusPanel(){return `<div class="panel"><div class="eyebrow">Mērķu statuss 2025. gadā</div>
  <div class="stbar" role="img" aria-label="${esc(torder.map(s=>s+': '+tcounts[s]).join(', '))}">${torder.map(s=>`<div style="flex:${tcounts[s]};background:${ST[s].col}" title="${esc(s)}: ${tcounts[s]}"></div>`).join('')}</div>
  <ul class="stlist">${torder.map(s=>`<li><a href="merki.html#statuss=${encodeURIComponent(s)}">${pill(s)}<span class="cnt">${tcounts[s]}</span></a></li>`).join('')}</ul>
  <div class="timebox">${T.length} mērķi no SECAP 4.1. un 4.2. tabulas: kopējo emisiju mērķis un ${T.filter(t=>t.rsec!=='kop').length} sektoru mērķi. Laika progress 2025. gadā – <b>${fmt(TIME_PROG*100,1)} %</b> (bāzes gads 2019) vai <b>${fmt(50,1)} %</b> (bāzes gads 2020); mērķis atbilst trajektorijai, ja progress nav vairāk kā 10 procentpunktus zem laika progresa.</div></div>`}
function sectorMatrix(){return `<div class="panel" style="margin-top:20px"><div class="eyebrow">Mērķu statuss pa sektoriem</div><div class="secmx">${RS.map(([k,lab])=>{const rows=T.filter(t=>t.rsec===k);const c=countBy(rows,t=>t.status);const o=Object.keys(c).sort((a,b)=>ST[a].ord-ST[b].ord);
  return `<a href="merki.html#merki-${k}" aria-label="${esc(lab)}: ${esc(o.map(s=>s+' '+c[s]).join(', '))}"><span class="sn">${lab}</span><span class="sc">${rows.length}</span><span class="sb">${o.map(s=>`<div style="flex:${c[s]};background:${ST[s].col};color:${ST[s].txt}" title="${esc(s)}: ${c[s]}">${c[s]}</div>`).join('')}</span></a>`}).join('')}</div></div>`}
function valTxt(t,v){if(v==null)return '–';if(t.div)return fmt(v/t.div,t.dec)+' '+t.dunit;if(t.table==='co2')return sgn(v,1)+' %';return fmt(v,t.dec)+(t.unit==='%'?' %':' '+unitLv(t.unit))}
function progHtml(t){const m=ST[t.status];const tp=t.tp||TIME_PROG;const tick=`<div class="tick" style="left:calc(${tp*100}% - 1px)" title="Laika progress ${fmt(tp*100,1)} % (bāzes gads ${t.byc})"></div>`;
  if(t.status==='Sasniegts')return `<div class="prog"><div class="track"><div class="fill" style="width:100%;background:${m.col}"></div>${tick}</div><span class="pv">Sasniegts</span></div>`;
  if(t.progress==null)return `<div class="prog"><div class="track">${tick}</div><span class="pv">${t.status==='Netiek vērtēts'?'Netiek vērtēts':'Nav rādītāja'}</span></div>`;
  const p=Math.max(0,Math.min(1,t.progress));return `<div class="prog"><div class="track"><div class="fill" style="width:${p*100}%;background:${m.col}"></div>${tick}</div><span class="pv">Progress ${sgn(t.progress*100,0).replace(/^\+/,'')} %</span></div>`}
function targetRows(list,groups){
  let h=`<div class="thead" aria-hidden="true"><span>Mērķis</span><span>Bāze</span><span>Mērķis</span><span>2025. gadā</span><span>Progress</span><span>Statuss</span></div>`;
  (groups||RS).forEach(([sec,lab])=>{const rows=list.filter(t=>t.rsec===sec).sort((a,b)=>a.num-b.num);if(!rows.length)return;
    h+=`<div class="tgroup" id="grp-${sec}">${groups&&groups.length===1?'':`<h3><span>${lab}</span><span>${rows.length}</span></h3>`}`+rows.map(t=>`<details class="trow" id="t-${t.id}" data-id="${t.id}"><summary>
      <div class="goal"><span class="chev" aria-hidden="true">›</span>${t.num?`<span class="no">${t.num}.</span>`:''}${lvText(t.goal)}</div>
      <div class="cell"><span class="lab">Bāze</span><span>${lvText(t.bval)}</span><span class="small">${esc(t.byear)}</span></div>
      <div class="cell"><span class="lab">Mērķis</span><span>${lvText(t.tval)}</span><span class="small">${esc(t.tyear)}</span></div>
      <div class="cell"><span class="lab">2025</span><span><b>${valTxt(t,t.v2025)}</b></span></div>
      ${progHtml(t)}<div class="stc">${pill(t.status)}</div></summary>
      <div class="tdetail">${t.code?`<div><div class="chart" id="tc-${t.id}" style="height:220px"></div><div class="legend"><span><i class="ln" style="background:var(--line1)"></i>${esc(IND[t.code].name)}${t.table==='co2'?', % pret 2019':''}</span>${t.base!=null?'<span><i class="dash"></i>Trajektorija no bāzes līdz mērķim</span>':''}</div></div>`:'<div class="small">Rādītāja datu rindas nav.</div>'}
      <div class="cm"><p>${lvText(t.comment)}</p>${t.code?`<p><a href="raditaji.html#${encodeURIComponent(t.code)}">Skatīt rādītāju ${t.code==='LV-RESE'?'(palīgdati)':esc(t.code)} →</a></p>`:''}${t.rsec!=='kop'?`<p><a href="${SECPAGE[t.rsec]}#pasakumi">Sektora pasākumi →</a></p>`:''}</div></div></details>`).join('')+'</div>'});
  if(!list.length)h+='<div class="empty">Nav mērķu ar šiem filtriem.</div>';return h}
function drawTargetChart(t){const n=document.getElementById('tc-'+t.id);if(!n||n.dataset.live)return;n.dataset.live=1;const ind=IND[t.code];
  const ser=[];const hasTraj=t.base!=null&&t.target!=null;const ty=+t.tyear||2030;const by=t.byc||2019;
  if(hasTraj)ser.push({pts:[[by,t.base],[ty,t.target]],color:'var(--ink-2)',dash:'4 4',w:1.5,dots:false});
  let pts=YEARS.map((y,i)=>[y,ind.values[i]]);if(ind.breakBefore)pts=pts.filter(p=>p[0]>=ind.breakBefore);
  if(hasTraj){pts=pts.filter(p=>p[0]!==by);pts.unshift([by,t.base])}
  ser.push({pts,color:'var(--line1)',hollow:hasTraj?[by]:[],bridge:true});
  const u=t.table==='co2'?' %':(t.unit==='%'?' %':' '+unitLv(ind.unit));
  live(n,()=>lineChart(n,{x0:hasTraj?by:2020,x1:hasTraj?Math.max(ty,2025):2025,aria:t.goal,series:ser,marks:hasTraj?[{x:ty,y:t.target,shape:'target'}]:[],hoverXs:YEARS.filter((y,i)=>ind.values[i]!=null),
    tip:y=>{const i=YEARS.indexOf(y);let h=`<b>${y}</b><div class="r"><span>Vērtība</span><b>${fa(ind.values[i])}${esc(u)}</b></div>`;if(hasTraj&&y<=ty&&y>=by)h+=`<div class="r"><span>Trajektorija</span><span>${fa(t.base+(t.target-t.base)*(y-by)/(ty-by))}${esc(u)}</span></div>`;return h}}))}
function bindTargets(node){node.addEventListener('toggle',e=>{const d=e.target;if(d.classList&&d.classList.contains('trow')&&d.open){const t=T.find(x=>x.id==d.dataset.id);if(t&&t.code)drawTargetChart(t)}},true)}

/* ---------------- komponentes: pasākumi ---------------- */
function mStatusBar(list,h){const c=countBy(list,m=>m.status);const o=MORDER.filter(s=>c[s]);
  return `<div class="mbar" style="height:${h||14}px" role="img" aria-label="${esc(o.map(s=>s+': '+c[s]).join(', '))}">${o.map(s=>`<div style="flex:${c[s]};background:${MST[s].col}" title="${esc(s)}: ${c[s]}"></div>`).join('')}</div>`}
function impactGroups(list){const seen={},out=[];list.forEach(m=>{if(m.co2==null&&m.mwh==null&&m.aer==null)return;const key=m.shared||m.id;if(seen[key]){seen[key].members.push(m);return}
  const g={key,members:[m],co2:m.co2,mwh:m.mwh,aer:m.aer,sector:m.sector};seen[key]=g;out.push(g)});return out}
function impactBars(list){const gs=impactGroups(list).filter(g=>g.co2).sort((a,b)=>b.co2-a.co2);if(!gs.length)return '';const mx=gs[0].co2;
  return `<div class="hbars">${gs.map(g=>{const ids=g.members.map(m=>m.id);const lab=g.members.length>1?`<b>${esc(g.key)}</b>${esc(g.members.map(m=>m.title).join(' · '))}`:`<b>${esc(g.key)}</b>${esc(g.members[0].title)}`;
    return `<a class="hbar" href="${PAGE==='measures'||SEC?'':'pasakumi.html'}#${ids[0]}" title="${esc(g.members.map(m=>m.id+': '+m.status).join('; '))}"><span class="lb">${lab}${g.members.length>1?' <span class="small">(kopīgs plāna rādītājs)</span>':''}</span><span class="tr"><div style="width:${g.co2/mx*100}%;background:${SCOL[g.sector]}"></div></span><span class="vl">${fmt(g.co2,0)} t</span></a>`}).join('')}</div>`}
function mrow(m){
  const ctx=`Pasākums: ${m.id} – ${m.title}`;
  const imp=[];if(m.mwh!=null)imp.push(['Enerģijas ietaupījums',fmt(m.mwh,0)+' MWh/gadā']);if(m.aer!=null)imp.push(['Atjaunīgā enerģija',fmt(m.aer,0)+' MWh/gadā']);if(m.co2!=null)imp.push(['CO₂ samazinājums',fmt(m.co2,m.co2<100?1:0)+' t/gadā']);if(m.inv!=null)imp.push(['Indikatīvās investīcijas',invTxt(m.inv)]);if(m.term)imp.push(['Ieviešanas termiņš',esc(m.term)]);
  const direct=m.mwh!=null||m.aer!=null||m.co2!=null;
  const inds=m.indicators.filter(c=>IND[c]).map(c=>{const i=IND[c];return `<a class="ilink" href="raditaji.html#${encodeURIComponent(c)}"><span class="nm"><span class="code">${esc(c)}</span> ${lvText(i.name)}</span>${spark(i.values,i.breakBefore)}<span class="v">${lastTxt(i)} · ${chgTxt(i)}</span></a>`}).join('');
  const projs=m.projects.length?`<ul class="plist">${m.projects.map(p=>isTodo(p.name)&&!p.url?`<li>${todoBox(m.id+' ES projekti',ctx+'\nES sadarbības projekti','Projekti vēl nav norādīti.')}</li>`:`<li>${p.url?link(p.url,p.name||shortUrl(p.url)):esc(p.name)}</li>`).join('')}</ul>`:'<p class="small">Nav norādīti.</p>';
  return `<details class="mrow" id="${esc(m.id)}" data-id="${esc(m.id)}"><summary><span class="mid">${esc(m.id)}</span><span class="mt"><span class="chev" aria-hidden="true">›</span>${esc(m.title)}</span><span class="mst">${mpill(m.status)}</span><span class="mco2">${m.co2!=null?(m.shared?'≈ ':'')+fmt(m.co2,m.co2<100?1:0)+' t CO₂/gadā':'<span class="muted">bez tiešas ietekmes</span>'}</span></summary>
  <div class="mdetail"><div><h4>Plānā paredzēts</h4>${prose(m.plan,m.id,ctx)}<h4 style="margin-top:18px">Situācija 2026. gadā</h4>${m.done.length?prose(m.done,m.id,ctx):todoBox(m.id,ctx)}</div>
  <aside><div><h4>Statuss (darba versija)</h4><p>${mpill(m.status)}</p>${m.status_note?`<p class="small" style="margin-top:6px">${esc(m.status_note)}</p>`:''}</div>
  <div><h4>Plānotā ietekme 2030. gadā</h4>${imp.length?`<dl>${imp.map(([a,b])=>`<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl>`:''}${m.shared?`<p class="small" style="margin-top:6px">Plānā norādīts kopīgs rādītājs pasākumiem ${esc(m.shared)}.</p>`:''}${direct?'':'<p class="small" style="margin-top:6px">Tiešs enerģijas ietaupījums vai CO₂ samazinājums nav plānots (atbalsta pasākums).</p>'}</div>
  <div><h4>Saistītie rādītāji</h4>${inds?`<div style="display:grid;gap:6px">${inds}</div>`:'<p class="small">Nav piesaistīti.</p>'}</div>
  <div><h4>ES sadarbības projekti</h4>${projs}</div>
  <div><a class="btn" href="${mailto(m.id+' '+m.title,ctx)}">Papildināt informāciju</a></div></aside></div></details>`}
function bindMeasures(node){node.addEventListener('toggle',e=>{const d=e.target;if(d.classList&&d.classList.contains('mrow')&&d.open&&history.replaceState)history.replaceState(null,'','#'+d.id)},true)}
function openFromHash(){const id=decodeURIComponent(location.hash.slice(1));const d=id&&document.getElementById(id);if(d&&d.tagName==='DETAILS'){d.open=true;requestAnimationFrame(()=>d.scrollIntoView({block:'start'}))}}

/* ---------------- komponentes: sektori ---------------- */
function challengesTable(s){if(!s.challenges.length)return '';let g=null,rows='';
  s.challenges.forEach(c=>{if(c.group&&c.group!==g){g=c.group;rows+=`<tr class="grp"><td colspan="2">${esc(g)}</td></tr>`}
    rows+=`<tr><td>${rich(c.y2022)}</td><td>${!c.y2026?todoBox(s.id+' izaicinājums',`Sektors: ${s.name}\nIzaicinājums: ${c.y2022}`,'Komentārs nav sniegts.'):isTodo(c.y2026)?todoBox(s.id+' izaicinājums',`Sektors: ${s.name}\nIzaicinājums: ${c.y2022}`):rich(c.y2026)}</td></tr>`});
  return `<div class="tscroll"><table class="text"><thead><tr><th scope="col">Izaicinājums 2022. gadā (SECAP2030)</th><th scope="col">Situācija 2026. gadā</th></tr></thead><tbody>${rows}</tbody></table></div>`}

/* ================= LAPAS ================= */
const pages={};

pages.home=()=>{
  shell({title:'Vidusposma pārskats 2026',lede:'SECAP2030 enerģētikas un CO₂ emisiju mērķu izpilde, rādītāju dinamika un pasākumu īstenošana. Novērtējums sagatavots 2026. gadā, izmantojot datus par 2020.–2025. gadu.',extra:horizon()});
  const sec=SECS.map(k=>{const s=D.sectors[k];const ms=M.filter(m=>m.sector===k);const ts=T.filter(t=>t.rsec===k);const tc=countBy(ts,t=>t.status);const to=Object.keys(tc).sort((a,b)=>ST[a].ord-ST[b].ord);
    return `<div class="panel scard" style="--sc:${SCOL[k]}"><h3><a href="${SECPAGE[k]}" style="color:inherit;text-decoration:none">${esc(SN[k])}</a></h3>${prose(s.summary,k,'Sektors: '+SN[k])}
    <div class="mini"><span class="lab">${ts.length} mērķi</span><div class="mbar">${to.map(x=>`<div style="flex:${tc[x]};background:${ST[x].col}" title="${esc(x)}: ${tc[x]}"></div>`).join('')}</div></div>
    <div class="mini"><span class="lab">${ms.length} pasākumi</span>${mStatusBar(ms)}</div>
    <a class="more" href="${SECPAGE[k]}">Atvērt sadaļu →</a></div>`}).join('');
  const mc=countBy(M,m=>m.status);
  $('#main').innerHTML=notice()+`
  <section id="galvenais" aria-labelledby="h-kop"><h2 id="h-kop" class="sr">Galvenie rādītāji</h2><div class="grid-sum">${heroPanel()}${statusPanel()}</div>${sectorMatrix()}</section>
  <section id="kopsavilkums"><div class="sec-head"><h2>Kopsavilkums</h2></div>${prose(TXT.kopsavilkums,'kopsavilkums','Lapa: Sākums – galvenie secinājumi','two')}</section>
  <section id="sektori"><div class="sec-head"><h2>Sektori</h2><p class="lede">Pārskatā vērtēti četri SECAP2030 sektori. Katrā sadaļā – mērķi, rādītāji, pasākumi, izaicinājumi un nākamie soļi.</p></div><div class="grid-cards">${sec}</div></section>
  <section id="emisijas"><div class="sec-head"><h2>CO₂ emisijas</h2><p class="lede">Pilsētas kopējās emisijas veido centralizētās siltumapgādes, elektroenerģijas patēriņa, kurināmā patēriņa un transporta emisijas. Zemāk – SECAP 4.2. tabulas četri samazināšanas mērķi.</p></div>${co2Section()}</section>
  <section id="pasakumu-istenosana"><div class="sec-head"><h2>Pasākumu īstenošana</h2><p class="lede">SECAP2030 ietver ${M.length} pasākumus četros sektoros. ${esc((TXT.pasakumu_statusa_piezime||[]).join(' '))}</p></div>
    <div class="grid-2"><div class="panel"><div class="eyebrow">Visi pasākumi</div>${mStatusBar(M,30)}<ul class="stlist" style="margin-top:14px">${MORDER.filter(s=>mc[s]).map(s=>`<li><a href="pasakumi.html#statuss=${encodeURIComponent(s)}">${mpill(s)}<span class="cnt">${mc[s]}</span></a></li>`).join('')}</ul></div>
    <div class="panel"><div class="eyebrow">Pa sektoriem</div><div class="secmx">${SECS.map(k=>{const ms=M.filter(m=>m.sector===k);return `<a href="${SECPAGE[k]}#pasakumi"><span class="sn">${esc(SN[k])}</span><span class="sc">${ms.length}</span>${mStatusBar(ms,24).replace('class="mbar"','class="sb mbar"')}</a>`}).join('')}</div><p style="margin-top:16px"><a class="more" href="pasakumi.html">Visi pasākumi →</a></p></div></div></section>
  <section id="iesaisties"><div class="grid-2"><div class="panel"><h3>Aicinām papildināt</h3><div class="prose" style="margin-top:10px">${(TXT.aicinajums||[]).map(p=>`<p>${esc(p)}</p>`).join('')}</div><div class="actions"><a class="btn solid" href="${mailto('vispārīgs papildinājums','Lapa: Sākums')}">Sūtīt papildinājumu</a></div></div>
    <div class="panel"><h3>Pārskats un dati</h3><ul class="list" style="margin-top:10px"><li><a href="${esc(D.site.report_pdf)}">Vidusposma pārskats (PDF, darba versija)</a></li><li><a href="dati/Riga-SECAP-vidusposms-dati.xlsx">Visi dati vienā Excel datnē</a></li><li><a href="dati.html">Visas lejupielādes un licence</a></li><li><a href="en.html">Summary in English</a></li></ul></div></div></section>`;
  drawHorizon();drawHero();drawCo2();
};

pages.sector=()=>{
  const s=D.sectors[SEC];const ms=M.filter(m=>m.sector===SEC);const ts=T.filter(t=>t.rsec===SEC);
  const inds=D.indicators.filter(i=>i.rsec===SEC&&!i.aux);
  const sub=[['merki','Mērķi'],['raditaji','Rādītāji'],['pasakumi','Pasākumi'],['izaicinajumi','Izaicinājumi'],['nakamie-soli','Nākamie soļi']];
  shell({eyebrow:'SECAP2030 vidusposma pārskats · sektors',title:esc(SN[SEC]),lede:(s.summary||[]).map(rich).join(' '),extra:`<nav class="subnav" aria-label="Sadaļas lapā">${sub.map(([a,b])=>`<a href="#${a}">${b}</a>`).join('')}</nav>`});
  $('#main').innerHTML=notice()+
  (s.intro.length?`<section id="ievads"><div class="sec-head"><h2>Par sektoru</h2></div>${prose(s.intro,SEC,'Sektors: '+SN[SEC])}</section>`:'')+
  `<section id="merki"><div class="sec-head"><h2>Mērķu izpilde</h2><p class="lede">${ts.length} SECAP2030 mērķi. Atveriet rindu, lai redzētu rādītāja dinamiku un piezīmes.</p></div><div id="tlist">${targetRows(ts,[[SEC,SN[SEC]]])}</div>${s.targets_text.length?`<div style="margin-top:26px">${prose(s.targets_text,SEC+' mērķi','Sektors: '+SN[SEC]+' – mērķu komentārs')}</div>`:''}</section>
  <section id="raditaji"><div class="sec-head"><h2>Rādītāji</h2><p class="lede">${inds.length} monitoringa rādītāji, 2020–2025. Izvēlieties rādītāju, lai redzētu grafiku, aprakstu un datus.</p></div><div class="igrid open">${inds.map(i=>icardHtml(i,true)).join('')}</div>${s.ind_text.length?`<div style="margin-top:26px">${prose(s.ind_text,SEC+' rādītāji','Sektors: '+SN[SEC]+' – rādītāju komentārs')}</div>`:''}</section>
  <section id="pasakumi"><div class="sec-head"><h2>Pasākumi</h2><p class="lede">${ms.length} SECAP2030 pasākumi. ${esc((TXT.pasakumu_statusa_piezime||[]).join(' '))}</p></div>
    ${s.meas_intro.length?`<div style="margin-bottom:22px">${prose(s.meas_intro,SEC+' pasākumi','Sektors: '+SN[SEC])}</div>`:''}
    <div class="grid-2"><div class="panel"><div class="eyebrow">Pasākumu statuss</div>${mStatusBar(ms,30)}<ul class="stlist" style="margin-top:12px">${MORDER.filter(x=>ms.some(m=>m.status===x)).map(x=>`<li><a href="pasakumi.html#statuss=${encodeURIComponent(x)}&sektors=${SEC}">${mpill(x)}<span class="cnt">${ms.filter(m=>m.status===x).length}</span></a></li>`).join('')}</ul></div>
    <div class="panel"><div class="eyebrow">Plānotais CO₂ samazinājums 2030. gadā, t/gadā</div><div style="margin-top:12px">${impactBars(ms)||'<p class="small">Sektora pasākumiem plānā nav norādīts tiešs CO₂ samazinājums.</p>'}</div></div></div>
    <div class="mgroup" style="--sc:${SCOL[SEC]}" id="mlist">${ms.map(mrow).join('')}</div></section>
  <section id="izaicinajumi"><div class="sec-head"><h2>Galvenie izaicinājumi</h2><p class="lede">SECAP2030 (2022) identificētie izaicinājumi un situācija 2026. gadā.</p></div>${challengesTable(s)}</section>
  <section id="nakamie-soli"><div class="sec-head"><h2>Nākamie soļi</h2></div><ul class="list">${s.next.map(x=>`<li>${rich(x)}</li>`).join('')}</ul></section>`;
  bindTargets($('#tlist'));bindMeasures($('#mlist'));
  addEventListener('hashchange',openFromHash);
  openFromHash();
};

pages.targets=()=>{
  shell({title:'Mērķu izpilde',lede:'SECAP 4.1. un 4.2. tabulas 22 mērķi: kopējo emisiju mērķis un 21 sektoru mērķis. Josla rāda progresu no bāzes vērtības līdz mērķim; vertikālā atzīme – laika progress 2025. gadā.'});
  let st=null,rs=null;
  $('#main').innerHTML=notice()+`<section id="merki"><div class="grid-sum">${statusPanel()}<div class="panel"><div class="eyebrow">Kā vērtēts</div><div class="prose small" style="margin-top:10px">${prose(TXT.metode,'metode','Lapa: Mērķi – metode')}</div><p style="margin-top:12px"><a class="more" href="par.html#metode">Vairāk par metodi →</a></p></div></div>
  <div class="toolbar" style="margin-top:28px"><div class="chips" id="rsF" role="group" aria-label="Filtrēt pēc sektora"></div><div class="chips" id="stF" role="group" aria-label="Filtrēt pēc statusa"></div></div><div id="tlist"></div></section>`;
  function render(){
    $('#rsF').innerHTML=[[null,'Visi sektori'],...RS].map(([k,l])=>`<button type="button" class="chip" aria-pressed="${k===rs}" data-rs="${k||''}">${l}<span class="c">${k?T.filter(t=>t.rsec===k).length:T.length}</span></button>`).join('');
    $('#stF').innerHTML=[null,...torder].map(s=>`<button type="button" class="chip" aria-pressed="${s===st}" data-st="${s?esc(s):''}">${s?esc(s):'Visi statusi'}<span class="c">${s?tcounts[s]:T.length}</span></button>`).join('');
    $('#tlist').innerHTML=targetRows(T.filter(t=>(!st||t.status===st)&&(!rs||t.rsec===rs)))}
  $('#rsF').addEventListener('click',e=>{const b=e.target.closest('button');if(b){rs=b.dataset.rs||null;render()}});
  $('#stF').addEventListener('click',e=>{const b=e.target.closest('button');if(b){st=b.dataset.st||null;render()}});
  $('.stlist').addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;e.preventDefault();st=decodeURIComponent(a.getAttribute('href').split('statuss=')[1]);rs=null;render();$('#tlist').scrollIntoView({behavior:'smooth'})});
  bindTargets($('#tlist'));
  function fromHash(){const h=decodeURIComponent(location.hash.slice(1));let m=h.match(/^merki-(kop|pas|dz|en|tr)$/);if(m){rs=m[1];st=null}m=h.match(/^statuss=(.+)$/);if(m&&tcounts[m[1]]){st=m[1];rs=null}m=h.match(/^t-(\d+)$/);render();if(m){const d=document.getElementById(h);if(d){d.open=true;d.scrollIntoView({block:'center'})}}else if(rs||st)requestAnimationFrame(()=>$('#tlist').scrollIntoView())}
  addEventListener('hashchange',fromHash);fromHash();
};

pages.measures=()=>{
  shell({title:'Pasākumi',lede:`SECAP2030 ietver ${M.length} pasākumus. Katram pasākumam – plāns, situācija 2026. gadā, plānotā ietekme, saistītie rādītāji un ES sadarbības projekti.`});
  const mc=countBy(M,m=>m.status);let st=null,sf=null,q='';
  $('#main').innerHTML=notice()+`<section id="statuss"><div class="grid-2"><div class="panel"><div class="eyebrow">Pasākumu statuss (darba versija)</div>${mStatusBar(M,30)}
    <ul class="stlist" id="mst" style="margin-top:12px">${MORDER.filter(s=>mc[s]).map(s=>`<li><button type="button" data-st="${esc(s)}">${mpill(s)}<span class="cnt">${mc[s]}</span></button></li>`).join('')}</ul>
    <p class="small" style="margin-top:12px">${esc((TXT.pasakumu_statusa_piezime||[]).join(' '))}</p></div>
    <div class="panel"><div class="eyebrow">Statusu skaidrojums</div><dl class="kvlist" style="margin-top:12px">${D.statuses.map(s=>`<dt>${mpill(s.name)}</dt><dd style="font-weight:400">${esc(s.desc)}</dd>`).join('')}</dl></div></div></section>
  <section id="ietekme"><div class="sec-head"><h2>Plānotais CO₂ samazinājums</h2><p class="lede">SECAP2030 pasākumu tabulā plānotais CO₂ samazinājums 2030. gadā, t/gadā. Pasākumi ar kopīgu plāna rādītāju parādīti vienā rindā. Krāsa – sektors.</p></div>
    <div class="panel"><div class="legend" style="margin:0 0 14px">${SECS.map(k=>`<span><i style="background:${SCOL[k]}"></i>${esc(SN[k])}</span>`).join('')}</div>${impactBars(M)}<p class="small" style="margin-top:14px">Vērtības – no SECAP2030 pasākumu tabulas. Plāna tekstā norādītās sektoru kopsummas no tabulas summām nedaudz atšķiras, jo sākotnējie aprēķini nebija precīzi.</p></div></section>
  <section id="saraksts"><div class="sec-head"><h2>Visi pasākumi</h2></div>
    <div class="toolbar"><div class="chips" id="sf" role="group" aria-label="Filtrēt pēc sektora"></div><div class="row"><div class="chips" id="stf" role="group" aria-label="Filtrēt pēc statusa"></div><input class="search" id="q" type="search" placeholder="Meklēt pasākumu vai kodu" aria-label="Meklēt pasākumu"></div></div>
    <div id="mlist"></div></section>`;
  function render(){
    $('#sf').innerHTML=[[null,'Visi sektori'],...SECS.map(k=>[k,SN[k]])].map(([k,l])=>`<button type="button" class="chip" aria-pressed="${k===sf}" data-s="${k||''}">${esc(l)}<span class="c">${k?M.filter(m=>m.sector===k).length:M.length}</span></button>`).join('');
    $('#stf').innerHTML=[null,...MORDER.filter(s=>mc[s])].map(s=>`<button type="button" class="chip" aria-pressed="${s===st}" data-st="${s?esc(s):''}">${s?esc(s):'Visi statusi'}<span class="c">${s?mc[s]:M.length}</span></button>`).join('');
    const L=M.filter(m=>(!st||m.status===st)&&(!sf||m.sector===sf)&&(!q||(m.id+' '+m.title+' '+m.plan.join(' ')+' '+m.done.join(' ')).toLowerCase().includes(q)));
    $('#mlist').innerHTML=L.length?SECS.map(k=>{const r=L.filter(m=>m.sector===k);return r.length?`<div class="mgroup" style="--sc:${SCOL[k]}"><h3><span>${esc(SN[k])}</span><span>${r.length}</span></h3>${r.map(mrow).join('')}</div>`:''}).join(''):'<div class="empty">Neviens pasākums neatbilst filtriem.</div>'}
  $('#sf').addEventListener('click',e=>{const b=e.target.closest('button');if(b){sf=b.dataset.s||null;render()}});
  $('#stf').addEventListener('click',e=>{const b=e.target.closest('button');if(b){st=b.dataset.st||null;render()}});
  $('#mst').addEventListener('click',e=>{const b=e.target.closest('button');if(b){st=b.dataset.st;sf=null;render();$('#saraksts').scrollIntoView({behavior:'smooth'})}});
  $('#q').addEventListener('input',e=>{q=e.target.value.trim().toLowerCase();render()});
  bindMeasures($('#mlist'));
  function fromHash(){const h=decodeURIComponent(location.hash.slice(1));const p=new URLSearchParams(h.includes('=')?h:'');
    if(p.get('statuss')&&mc[p.get('statuss')])st=p.get('statuss');if(p.get('sektors')&&SN[p.get('sektors')])sf=p.get('sektors');
    render();if(h.includes('='))requestAnimationFrame(()=>$('#saraksts').scrollIntoView());else if(h&&M.some(m=>m.id===h)){st=null;sf=null;q='';render();openFromHash()}}
  addEventListener('hashchange',fromHash);fromHash();
  $('#ietekme').addEventListener('click',e=>{const a=e.target.closest('a.hbar');if(!a)return;e.preventDefault();const id=a.getAttribute('href').slice(1);st=null;sf=null;q='';$('#q').value='';render();history.replaceState(null,'','#'+id);openFromHash()});
};

pages.indicators=()=>{
  shell({title:'Rādītāji 2020–2025',lede:`${D.indicators.filter(i=>!i.aux).length} monitoringa rādītāji ar vērtībām pa gadiem, aprakstu un saistītajiem mērķiem un pasākumiem. Katra rādītāja datus var lejupielādēt.`});
  const SECT=[...new Set(D.indicators.map(i=>i.sector))];let secF=null,q='',sel='5001';
  $('#main').innerHTML=notice()+`<section id="raditaji"><div class="toolbar"><div class="row"><div class="chips" id="secF" role="group" aria-label="Filtrēt pēc sektora"></div><input class="search" id="q" type="search" placeholder="Meklēt rādītāju vai kodu" aria-label="Meklēt rādītāju"></div></div>
  <div class="xp"><div class="igrid" id="indGrid"></div><div class="panel idetail" id="indDetail" aria-live="polite"></div></div>
  <p class="small" style="margin-top:20px">Visi rādītāji vienā datnē: <a href="dati/riga-secap-raditaji-2020-2025.csv">CSV</a> · <a href="dati/Riga-SECAP-vidusposms-dati.xlsx">Excel</a>.</p></section>`;
  const list=()=>D.indicators.filter(i=>(!secF||i.sector===secF)&&(!q||(i.name+' '+i.code).toLowerCase().includes(q)));
  function renderF(){$('#secF').innerHTML=[null,...SECT].map(s=>`<button type="button" class="chip" aria-pressed="${s===secF}" data-s="${s?esc(s):''}">${s?esc(s):'Visi'}<span class="c">${D.indicators.filter(i=>!s||i.sector===s).length}</span></button>`).join('')}
  function renderGrid(){const L=list();$('#indGrid').innerHTML=L.length?L.map(i=>icardHtml(i,false)).join(''):'<div class="empty">Neviens rādītājs neatbilst meklējumam.</div>';$('#indGrid').querySelectorAll('.icard').forEach(c=>c.setAttribute('aria-pressed',c.dataset.code===sel))}
  function csv(i){const head=['kods','nosaukums','vienība',...YEARS];const row=[i.code,i.name,i.unit,...i.values.map(v=>v==null?'':v)];const q2=v=>/[",\n]/.test(String(v))?'"'+String(v).replace(/"/g,'""')+'"':v;return '﻿'+[head,row].map(r=>r.map(q2).join(',')).join('\r\n')+'\r\n'}
  function renderDetail(){const i=IND[sel];const n=$('#indDetail');if(!i){n.innerHTML='';return}
    const rel=T.filter(t=>t.code===i.code);const rm=IND_MEAS[i.code]||[];const fns=i.notes.map((x,k)=>x?`${YEARS[k]}: ${esc(x)}`:null).filter(Boolean);
    n.innerHTML=`<div class="eyebrow">${i.aux?'Palīgdati (nav Rīgas rādītājs)':esc(i.code)} · ${esc(i.sector)} / ${lvText(i.sub||'')}</div><h2 style="font-size:24px;margin-top:6px">${lvText(i.name)}</h2><div class="meta"><span>Vienība: ${esc(unitLv(i.unit))}</span><span>${chgTxt(i)}</span></div>
    ${i.desc?`<p class="desc">${lvText(i.desc)}</p>`:''}${i.link||i.units?`<p class="small" style="margin-top:6px">${i.link?'Avots: '+link(i.link):''}${i.link&&i.units?' · ':''}${i.units?'Iesaistītās struktūrvienības: '+esc(i.units):''}</p>`:''}
    ${i.values.some(v=>v!=null)?`<div class="chart" id="indChart" style="height:260px;margin-top:14px"></div>`:todoBox(i.code+' '+i.name,'Rādītājs: '+i.code+' – '+i.name,'Šim rādītājam vēl nav datu.')}
    <div class="tscroll"><table class="data"><caption class="sr">${esc(i.name)}, vērtības pa gadiem</caption><thead><tr><th scope="col">Vienība</th>${YEARS.map(y=>`<th scope="col">${y}</th>`).join('')}</tr></thead><tbody><tr><td>${esc(unitLv(i.unit))}</td>${i.values.map((v,k)=>`<td>${fi(i,v)}${i.notes[k]?'<sup>*</sup>':''}</td>`).join('')}</tr></tbody></table></div>
    ${fns.length?`<p class="fn">* ${fns.join('; ')}</p>`:''}
    ${rel.length?`<div class="rel"><span class="eyebrow">Saistītie SECAP mērķi</span>${rel.map(t=>`<a href="merki.html#t-${t.id}">${pill(t.status)} ${lvText(t.goal)}</a>`).join('')}</div>`:''}
    ${rm.length?`<div class="rel"><span class="eyebrow">Saistītie pasākumi</span>${rm.map(m=>`<a href="pasakumi.html#${m.id}">${mpill(m.status)} <b>${m.id}</b> ${esc(m.title)}</a>`).join('')}</div>`:''}
    <div class="actions"><button type="button" class="btn" id="dlInd">Lejupielādēt CSV</button><a class="btn" href="${mailto(i.code+' '+i.name,'Rādītājs: '+i.code+' – '+i.name)}">Papildināt</a></div>`;
    $('#dlInd').addEventListener('click',()=>{const b=new Blob([csv(i)],{type:'text/csv;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=`riga-secap-raditajs-${i.code}.csv`;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500)});
    const c=$('#indChart');if(c)live(c,()=>{if(!document.body.contains(c))return;lineChart(c,{x0:2020,x1:2025,aria:i.name,series:[{pts:withBreak(i),color:'var(--line1)'}],hoverXs:YEARS.filter((y,k)=>i.values[k]!=null),tip:y=>{const k=YEARS.indexOf(y);return `<b>${y}</b><div class="r"><span>${esc(unitLv(i.unit))}</span><b>${fi(i,i.values[k])}</b></div>`+(i.notes[k]?`<div>${esc(i.notes[k])}</div>`:'')}})})}
  function select(code,scroll){if(!IND[code])return;sel=code;if(secF&&IND[code].sector!==secF)secF=null;renderF();renderGrid();renderDetail();if(scroll&&innerWidth<900)$('#indDetail').scrollIntoView({behavior:'smooth',block:'start'})}
  $('#secF').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;secF=b.dataset.s||null;renderF();renderGrid();const L=list();if(L.length&&!L.some(i=>i.code===sel)){sel=L[0].code;renderGrid();renderDetail()}});
  $('#q').addEventListener('input',e=>{q=e.target.value.trim().toLowerCase();renderGrid()});
  $('#indGrid').addEventListener('click',e=>{const b=e.target.closest('.icard');if(!b)return;sel=b.dataset.code;history.replaceState&&history.replaceState(null,'','#'+encodeURIComponent(sel));$('#indGrid').querySelectorAll('.icard').forEach(c=>c.setAttribute('aria-pressed',c.dataset.code===sel));renderDetail();if(innerWidth<900)$('#indDetail').scrollIntoView({behavior:'smooth',block:'start'})});
  const h=decodeURIComponent(location.hash.slice(1));if(IND[h])sel=h;
  renderF();renderGrid();renderDetail();
  addEventListener('hashchange',()=>{const c=decodeURIComponent(location.hash.slice(1));if(IND[c])select(c,true)});
  if(IND[h])requestAnimationFrame(()=>{const b=$(`.icard[data-code="${CSS.escape(h)}"]`);if(b)b.scrollIntoView({block:'nearest'})});
};

pages.data=()=>{
  shell({title:'Dati un lejupielādes',lede:'Pārskata dati ir atvērti: tos var brīvi izmantot, norādot avotu.'});
  const F=D.meta.files||{};const sz=p=>F[p]?(F[p]>1048576?fmt(F[p]/1048576,1)+' MB':fmt(Math.max(1,Math.round(F[p]/1024)),0)+' KB'):'';
  const item=(p,fmtx,title,desc)=>`<div class="dl-item"><div><span class="fmt">${fmtx}${sz(p)?' · '+sz(p):''}</span><h3 style="margin:2px 0 4px"><a href="${esc(p)}" download>${title}</a></h3><p class="small">${desc}</p></div><a class="btn" href="${esc(p)}" download aria-label="Lejupielādēt: ${esc(title)}">Lejupielādēt</a></div>`;
  $('#main').innerHTML=notice()+`<section id="lejupielades"><div class="sec-head"><h2>Lejupielādes</h2></div><div class="panel dl-list">
    ${item(D.site.report_pdf,'PDF','Vidusposma pārskats (darba versija)','Pilns pārskata teksts ar tabulām. Darba versija – saturs vēl tiek papildināts.')}
    ${item('dati/Riga-SECAP-vidusposms-dati.xlsx','XLSX','Visi dati vienā Excel datnē','Lapas: Rādītāji (2020–2025), Mērķi (2025. gada novērtējums), Pasākumi (plāns, statuss, plānotā ietekme).')}
    ${item('dati/riga-secap-raditaji-2020-2025.csv','CSV',`Rādītāji 2020–2025 (${D.indicators.length})`,'Kods, nosaukums, sektors, vienība, vērtības pa gadiem, piezīmes, apraksts un avots.')}
    ${item('dati/riga-secap-merki-2025.csv','CSV',`Mērķu izpilde 2025 (${T.length})`,'Mērķa un bāzes vērtība, 2025. gada vērtība, progress, statuss un komentārs.')}
    ${item('dati/riga-secap-pasakumi.csv','CSV',`Pasākumi (${M.length})`,'Statuss (darba versija), plānotā ietekme, saistītie rādītāji, ES projekti, plāns un paveiktais.')}
  </div></section>
  <section id="formats"><div class="grid-2"><div class="panel"><h3>Par datu formātu</h3><ul class="list small" style="margin-top:10px"><li>CSV datnes: UTF-8 kodējums, komats kā atdalītājs, punkts kā decimālzīme. Ja Excel neattēlo kolonnas pareizi, izmantojiet XLSX datni.</li><li>Procentu rādītāji norādīti procentos (piem. 46,85 = 46,85 %). Rādītāji 5002–5008 – izmaiņa procentos pret bāzes gadu.</li><li>Tukša šūna – dati nav pieejami.</li><li>Pasākumu statuss ir darba versija. Plānotā ietekme – no SECAP2030 pasākumu tabulas; vairākiem pasākumiem plānā norādīts kopīgs rādītājs (kolonna “kopīgs plāna rādītājs ar”).</li></ul></div>
  <div class="panel"><h3>Licence un atsauce</h3><p style="margin-top:10px">Dati un teksti pieejami ar licenci <a href="${D.site.license_url}">${D.site.license}</a> – tos drīkst izmantot, pārveidot un izplatīt, norādot avotu.</p><p class="small" style="margin-top:10px"><b>Ieteicamā atsauce:</b> Rīgas enerģētikas aģentūra (2026). Rīgas SECAP 2022–2030 vidusposma pārskats: dati 2020–2025. Darba versija, ${esc(D.meta.built)}.</p></div></div></section>
  <section id="avoti"><div class="grid-2"><div class="panel"><h3>Avota datnes</h3><p class="small" style="margin-top:8px">No šīm datnēm tiek veidota visa vietne (sk. README repozitorijā).</p><ul class="list" style="margin-top:10px"><li><a href="avoti/Riga-SECAP-2025-Raditaji.xlsx" download>Rādītāju datne</a> ${sz('avoti/Riga-SECAP-2025-Raditaji.xlsx')?'· '+sz('avoti/Riga-SECAP-2025-Raditaji.xlsx'):''} – mērķi, rādītāju vērtības, apraksti</li><li><a href="avoti/Riga-SECAP-saturs.xlsx" download>Satura datne</a> ${sz('avoti/Riga-SECAP-saturs.xlsx')?'· '+sz('avoti/Riga-SECAP-saturs.xlsx'):''} – sektoru teksti, pasākumi, izaicinājumi, nākamie soļi</li></ul></div>
  <div class="panel"><h3>Versijas</h3><dl class="kvlist" style="margin-top:10px">${(D.site.changelog||[]).map(([d,t])=>`<dt>${esc(d)}</dt><dd style="font-weight:400">${esc(t)}</dd>`).join('')}</dl></div></div></section>`;
};

pages.about=()=>{
  shell({title:'Par pārskatu',lede:'Kāpēc un kā sagatavots SECAP2030 vidusposma pārskats, kā vērtēta mērķu izpilde un pasākumu īstenošana.'});
  const crit=[['Sasniegts','progress ≥ 100 %'],['Atbilst trajektorijai',`progress ≥ laika progress − pielaide (${fmt((TIME_PROG-TOL)*100,1)} % vai ${fmt(40,1)} %)`],['Atpaliek no trajektorijas','progress > 0, bet zem trajektorijas sliekšņa'],['Nav progresa','progress ≤ 0'],['Nav datu','mērķim nav rādītāja'],['Netiek vērtēts','gadu vērtības nav tieši salīdzināmas (sk. piezīmi)']];
  $('#main').innerHTML=notice()+`<section id="ievads"><div class="sec-head"><h2>Ievads</h2></div>${prose(TXT.ievads,'ievads','Lapa: Par pārskatu – ievads')}</section>
  <section id="metode"><div class="sec-head"><h2>Vērtēšanas metode</h2></div>${prose(TXT.metode,'metode','Lapa: Par pārskatu – metode')}
    <div class="grid-2" style="margin-top:22px"><div class="panel method"><h3 style="margin-bottom:12px">Mērķu novērtējums</h3><dl>${[['Bāzes gads','2019 (atsevišķos gadījumos 2020)'],['Pārskata gads','2025'],['Mērķa gads','2030'],['Laika progress (bāze 2019)',fmt(TIME_PROG*100,1)+' %'],['Laika progress (bāze 2020)',fmt(50,1)+' %'],['Pielaide trajektorijai','10 procentpunkti']].map(([a,b])=>`<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl><p class="small" style="margin-top:12px">Progress = (2025. g. vērtība − bāze) / (mērķis − bāze).</p><ul class="stlist" style="margin-top:12px;gap:8px">${crit.map(([s,d])=>`<li style="display:grid;gap:4px">${pill(s)}<span class="small">${d}</span></li>`).join('')}</ul></div>
    <div class="panel"><h3 style="margin-bottom:12px">Pasākumu statuss</h3><p class="small">${esc((TXT.pasakumu_statusa_piezime||[]).join(' '))}</p><dl class="kvlist" style="margin-top:12px">${D.statuses.map(s=>`<dt>${mpill(s.name)}</dt><dd style="font-weight:400">${esc(s.desc)}</dd>`).join('')}</dl></div></div></section>
  <section id="secinajumi"><div class="sec-head"><h2>Secinājumi</h2></div>${prose(TXT.secinajumi,'secinājumi','Lapa: Par pārskatu – secinājumi')}</section>
  <section id="iesaisties"><div class="sec-head"><h2>Kā papildināt</h2></div><div class="prose">${(TXT.aicinajums||[]).map(p=>`<p>${esc(p)}</p>`).join('')}</div><div class="actions"><a class="btn solid" href="${mailto('vispārīgs papildinājums','Lapa: Par pārskatu')}">Sūtīt papildinājumu</a></div></section>
  <section id="saisinajumi"><div class="sec-head"><h2>Saīsinājumi</h2></div><div class="abbr">${D.abbr.map(([a,b])=>`<div><b>${esc(a)}</b> – ${esc(b)}</div>`).join('')}</div></section>
  <section id="pieklustamiba"><div class="sec-head"><h2>Piekļūstamība</h2></div><div class="prose"><p>Vietne veidota, ievērojot WCAG 2.1 AA vadlīnijas: teksta un fona kontrasts, navigācija ar tastatūru, virsrakstu struktūra, grafiku teksta alternatīvas un datu tabulas. Vietne ir darba versijā; pilns piekļūstamības izvērtējums vēl nav veikts.</p><p>Ja konstatējat piekļūstamības problēmu, lūdzu, <a href="${mailto('piekļūstamība','Lapa: '+location.pathname)}">ziņojiet mums</a>.</p></div></section>
  <section id="licence"><div class="sec-head"><h2>Licence un tehniskā informācija</h2></div><div class="prose"><p>Dati un teksti: <a href="${D.site.license_url}">${D.site.license}</a>. Fonts Outfit: SIL Open Font License 1.1. Rīgas logotips izmantots saskaņā ar Rīgas zīmola vadlīnijām.</p><p>Vietne neizmanto sīkdatnes un ārējus pakalpojumus (fonti un dati glabājas vietnē).</p></div></section>`;
};

pages['en-summary']=()=>{
  document.documentElement.lang='en';
  shell({title:'Mid-term review 2026 – summary',lede:'Implementation of the Riga Sustainable Energy and Climate Action Plan 2022–2030 (SECAP2030): targets, indicators and measures, based on data for 2020–2025.'});
  const en=TXT.en_summary||[];
  $('#main').innerHTML=`<div class="notice" role="note" lang="en"><p><b>Draft.</b> The mid-term review is still being completed together with municipal departments. The detailed pages of this site are in Latvian.</p></div>
  <section id="summary"><div class="grid-sum"><div class="panel"><div class="eyebrow">Riga's total CO₂ emissions, 2025</div><div class="hero-row"><div class="hero-num">${Math.round(tot[5]).toLocaleString('en-GB')}<small>kt CO₂</small></div>
    <div class="kv"><b>${sgn(IND['5003'].values[5],1).replace(',','.')} %</b><span>vs 2019 · target −30 %</span></div><div class="kv"><b>${sgn(IND['5002'].values[5],1).replace(',','.')} %</b><span>vs 1990 · target −70 %</span></div></div>
    <ul class="list small" style="margin-top:14px">${[['Sasniegts','achieved'],['Atbilst trajektorijai','on track'],['Atpaliek no trajektorijas','behind the trajectory'],['Nav progresa','no progress'],['Nav datu','no data'],['Netiek vērtēts','not assessed']].filter(([k])=>tcounts[k]).map(([k,v])=>`<li><b>${tcounts[k]}</b> ${v}</li>`).join('')}</ul><p class="small" style="margin-top:8px">${T.length} targets: total emissions and ${T.length-1} sector targets.</p></div>
    <div class="panel"><div class="eyebrow">Downloads</div><ul class="list" style="margin-top:12px"><li><a href="${esc(D.site.report_pdf)}">Full review (PDF, Latvian, draft)</a></li><li><a href="dati/Riga-SECAP-vidusposms-dati.xlsx">All data (Excel)</a></li><li><a href="dati.html">Open data (CSV) and licence</a></li></ul><p class="small" style="margin-top:12px">Data and texts: <a href="${D.site.license_url.replace('deed.lv','')}">${D.site.license}</a>.</p></div></div></section>
  <section id="text" lang="en"><div class="sec-head"><h2>Summary</h2></div><div class="prose">${en.map(p=>{const m=p.match(/^(Municipal infrastructure|Multi-apartment buildings|Energy production|Transport)\.\s*/);return m?`<p><b>${m[1]}.</b> ${esc(p.slice(m[0].length))}</p>`:`<p>${esc(p)}</p>`}).join('')}</div></section>`;
};

/* ---------------- palaišana ---------------- */
const fn=SEC?pages.sector:pages[PAGE];
if(fn)fn();
})();

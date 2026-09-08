const API="https://earthquake.usgs.gov/fdsnws/event/1/query";
const status=document.querySelector("#status"),dashboard=document.querySelector("#dashboard");
const range=document.querySelector("#range"),mag=document.querySelector("#magnitude");
document.querySelector("#apply").onclick=load;

function setState(type,title,text,action=""){status.innerHTML=`<div class="${type}"><strong>${title}</strong><div>${text}</div>${action}</div>`}
function esc(v=""){return String(v).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}

async function load(){
 dashboard.hidden=true;
 setState("loading","Loading earthquake data…","Fetching the selected records from the USGS catalog.");
 const end=new Date(), start=new Date(end.getTime()-Number(range.value)*86400000);
 const params=new URLSearchParams({format:"geojson",starttime:start.toISOString(),endtime:end.toISOString(),minmagnitude:mag.value,limit:"20000",orderby:"time"});
 try{
   const response=await fetch(`${API}?${params}`);
   if(!response.ok)throw Error();
   const data=await response.json();
   render(data.features||[]);
 }catch{
   setState("error","We couldn't load the data.","The USGS earthquake source did not respond. Check your connection and try again.",`<button id="retry">Try again</button>`);
   document.querySelector("#retry").onclick=load;
 }
}

function render(features){
 status.innerHTML="";
 dashboard.hidden=false;
 const clean=features.filter(f=>Number.isFinite(f.properties.mag)&&f.geometry?.coordinates);
 const mags=clean.map(f=>f.properties.mag);
 document.querySelector("#total").textContent=clean.length.toLocaleString();
 document.querySelector("#largest").textContent=mags.length?`M${Math.max(...mags).toFixed(1)}`:"—";
 document.querySelector("#average").textContent=mags.length?(mags.reduce((a,b)=>a+b,0)/mags.length).toFixed(1):"—";
 drawMap(clean); drawBars(mags); drawTable(clean);
}

function drawMap(features){
 const map=document.querySelector("#map");
 map.innerHTML='<div class="world" aria-hidden="true"></div>';
 features.forEach(f=>{
   const [lon,lat]=f.geometry.coordinates, m=Math.max(.1,f.properties.mag||0);
   const x=((lon+180)/360)*100, y=((90-lat)/180)*100;
   const dot=document.createElement("button");
   dot.className="dot"; dot.style.left=x+"%"; dot.style.top=y+"%";
   const size=Math.min(34,Math.max(5,m*3));
   dot.style.width=size+"px";dot.style.height=size+"px";
   dot.setAttribute("aria-label",`Magnitude ${m.toFixed(1)}, ${f.properties.place||"unknown location"}`);
   dot.title=`M${m.toFixed(1)} — ${f.properties.place||"Unknown location"}`;
   dot.onclick=()=>alert(`Magnitude ${m.toFixed(1)}\n${f.properties.place||"Unknown location"}\n${new Date(f.properties.time).toUTCString()}`);
   map.appendChild(dot);
 });
}

function drawBars(mags){
 const bands=[["< 2.5",0,2.5],["2.5–3.9",2.5,4],["4.0–4.9",4,5],["5.0–5.9",5,6],["6.0+",6,Infinity]];
 const counts=bands.map(([_,min,max])=>mags.filter(m=>m>=min&&m<max).length), max=Math.max(1,...counts);
 document.querySelector("#bars").innerHTML=bands.map((b,i)=>`<div class="bar-row"><span>${b[0]}</span><div class="track"><div class="bar" style="width:${counts[i]/max*100}%"></div></div><strong>${counts[i]}</strong></div>`).join("");
}

function drawTable(features){
 const top=[...features].sort((a,b)=>b.properties.mag-a.properties.mag).slice(0,8);
 document.querySelector("#tableBody").innerHTML=top.map(f=>`<tr><td><strong>M${f.properties.mag.toFixed(1)}</strong></td><td>${esc(f.properties.place||"Unknown")}</td><td>${new Date(f.properties.time).toUTCString()}</td></tr>`).join("");
}

load();
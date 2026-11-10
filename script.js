(function(){
var root=document.documentElement;
try{var t=localStorage.getItem("theme");if(t)root.setAttribute("data-theme",t)}catch(e){}
document.getElementById("theme").onclick=function(){
  var dark=root.getAttribute("data-theme")?root.getAttribute("data-theme")==="dark":matchMedia("(prefers-color-scheme:dark)").matches;
  var n=dark?"light":"dark";root.setAttribute("data-theme",n);
  try{localStorage.setItem("theme",n)}catch(e){}
};
// typing
var words=["Page Administrator","Content Creator","Community Manager"],wi=0,ci=0,del=false,el=document.getElementById("type");
(function tick(){var w=words[wi];ci+=del?-1:1;el.textContent=w.slice(0,ci);
  var d=del?40:90;if(!del&&ci===w.length){del=true;d=1400}else if(del&&ci===0){del=false;wi=(wi+1)%words.length;d=300}
  setTimeout(tick,d)})();
// reveal + skill bars
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");
  e.target.querySelectorAll(".fil").forEach(function(f){f.style.width=f.dataset.w+"%"});io.unobserve(e.target)}})},{threshold:.15});
document.querySelectorAll(".rv").forEach(function(n){io.observe(n)});
// progress bar + active nav + parallax
var bar=document.getElementById("bar"),links=[].slice.call(document.querySelectorAll("nav a")),secs=links.map(function(a){return document.querySelector(a.getAttribute("href"))});
addEventListener("scroll",function(){
  var h=document.documentElement.scrollHeight-innerHeight;bar.style.width=(scrollY/h*100)+"%";
  var cur=0;secs.forEach(function(s,i){if(s.getBoundingClientRect().top<200)cur=i});
  links.forEach(function(a,i){a.classList.toggle("on",i===cur)});
  document.querySelector(".b1").style.marginTop=(scrollY*.15)+"px";
},{passive:true});
// chat
var chat=document.getElementById("chat"),msgs=document.getElementById("msgs");
function toggle(o){chat.classList.toggle("open",o)}
document.getElementById("chatBtn").onclick=function(){toggle(!chat.classList.contains("open"))};
document.getElementById("chatOpen2").onclick=document.getElementById("chatOpen3").onclick=function(){toggle(true)};
function add(c,t){var d=document.createElement("div");d.className="m "+c;d.textContent=t;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight}
// Paste your Formspree form ID here (e.g. "xyzabcde"). Get it free at formspree.io
var FORM_ID="YOUR_FORM_ID";
var EMAIL="phyowaiyanlinn607@gmail.com";
document.getElementById("cf").onsubmit=async function(e){
  e.preventDefault();
  var nm=document.getElementById("nm"),ct=document.getElementById("ct"),tx=document.getElementById("tx");
  var rec={name:nm.value.trim(),contact:ct.value.trim(),text:tx.value.trim()};
  var btn=e.target.querySelector("button[type=submit]");
  add("me",rec.text);tx.value="";btn.disabled=true;
  try{
    if(FORM_ID==="YOUR_FORM_ID")throw new Error("not configured");
    var r=await fetch("https://formspree.io/f/"+FORM_ID,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},
      body:JSON.stringify({name:rec.name,contact:rec.contact,message:rec.text,_replyto:rec.contact.indexOf("@")>0?rec.contact:undefined,_subject:"Portfolio message from "+rec.name})});
    if(!r.ok)throw new Error("failed");
    add("bot","Thanks "+rec.name+"! Your message was delivered. I\u2019ll reply to "+rec.contact+" soon.");
  }catch(err){
    add("bot","I couldn\u2019t deliver that here, sorry! Please email me directly:");
    var a=document.createElement("a");a.className="m bot";a.href="mailto:"+EMAIL+"?subject="+encodeURIComponent("Hello from "+rec.name)+"&body="+encodeURIComponent(rec.text+"\n\n"+rec.contact);a.textContent="\u2709\ufe0f Send by email";a.style.color="inherit";msgs.appendChild(a);
  }
  btn.disabled=false;
};
// owner-only Inbox shortcut: open your site once with #owner at the end of the URL
try{if(location.hash==="#owner")localStorage.setItem("owner","1")}catch(e){}
var isOwner=false;try{isOwner=localStorage.getItem("owner")==="1"}catch(e){}
if(isOwner){
  var ib=document.createElement("a");ib.id="inBtn";ib.textContent="\ud83d\udce5 Inbox";
  ib.href=FORM_ID==="YOUR_FORM_ID"?"https://formspree.io/forms":"https://formspree.io/forms/"+FORM_ID+"/submissions";
  ib.target="_blank";ib.rel="noopener";document.body.appendChild(ib);
}
})();

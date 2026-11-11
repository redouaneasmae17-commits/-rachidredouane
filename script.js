const DATA = [
 {id:"quran",name:"علوم القرآن والتفسير",icon:"۞",desc:"التفسير وعلوم القرآن والتجويد والقراءات",subs:[
  {name:"التفسير",children:Array.from({length:30},(_,i)=>({name:"تفسير الجزء "+["الأول","الثاني","الثالث","الرابع","الخامس","السادس","السابع","الثامن","التاسع","العاشر","الحادي عشر","الثاني عشر","الثالث عشر","الرابع عشر","الخامس عشر","السادس عشر","السابع عشر","الثامن عشر","التاسع عشر","العشرون","الحادي والعشرون","الثاني والعشرون","الثالث والعشرون","الرابع والعشرون","الخامس والعشرون","السادس والعشرون","السابع والعشرون","الثامن والعشرون","التاسع والعشرون","الثلاثون"][i]}))},
  {name:"علوم القرآن",children:[]},
  {name:"التجويد والقراءات",children:[]}]},
 {id:"hadith",name:"الحديث الشريف وعلومه",icon:"۞",desc:"مصطلح الحديث وفقه الحديث",subs:[
  {name:"مصطلح الحديث",children:["شرح البيقونية","شرح نخبة الفكر","شرح مقدمة ابن الصلاح","شرح ألفية العراقي","شرح ألفية السيوطي"].map(name=>({name}))},
  {name:"فقه الحديث",children:["شرح الأربعين النووية","شرح موطأ الإمام مالك","شرح عمدة الأحكام","شرح سبل السلام","شرح مختصر صحيح البخاري"].map(name=>({name}))}]},
 {id:"aqida",name:"العقيدة والتوحيد",icon:"✧",desc:"أصول الاعتقاد وشروح المتون",subs:[{name:"المتون والشروح",children:[{name:"شرح مقدمة ابن أبي زيد القيرواني"}]}]},
 {id:"arabic",name:"اللغة العربية وعلومها",icon:"۞",desc:"النحو والصرف والبلاغة وسائر الفنون",subs:[
  {name:"النحو",children:["شرح الآجرومية","شرح ألفية ابن مالك","شرح قطر الندى وبل الصدى"].map(name=>({name}))},
  {name:"الصرف",children:[{name:"شرح لامية الأفعال"}]},
  {name:"البلاغة",children:["شرح منظومة الاستعارات","شرح الجوهر المكنون"].map(name=>({name}))},
  {name:"الإملاء",children:[]},{name:"الأدب",children:[]},{name:"العروض",children:[]}]},
 {id:"fiqh",name:"الفقه وأصوله",icon:"⚖",desc:"الفقه المالكي وأصول الفقه",subs:[
  {name:"الفقه المالكي",children:["شرح مختصر الأخضري","شرح نظم ابن عاشر","شرح رسالة ابن أبي زيد القيرواني","شرح العشماوية","شرح مختصر خليل"].map(name=>({name}))},
  {name:"أصول الفقه",children:["شرح الورقات","شرح مراقي السعود","شرح مفتاح الأصول","شرح جمع الجوامع"].map(name=>({name}))}]},
 {id:"seerah",name:"السيرة النبوية",icon:"☾",desc:"السيرة والمغازي والشمائل",subs:[{name:"الدروس والمحاور",children:[]}]},
 {id:"library",name:"المكتبة العلمية",icon:"▤",desc:"كتب وبحوث وتفريغات علمية",subs:[{name:"الكتب والمراجع",children:[]},{name:"البحوث والرسائل",children:[]},{name:"الملفات العلمية",children:[]}]}
];
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let lessons=JSON.parse(localStorage.getItem("rr_lessons")||"[]"), currentSection=null, currentSub=null;
const save=()=>localStorage.setItem("rr_lessons",JSON.stringify(lessons));
const toast=t=>{let el=$("#toast");el.textContent=t;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2400)};
function renderSections(filter=""){let grid=$("#sectionGrid");let list=DATA.filter(s=>(s.name+" "+s.desc+" "+s.subs.map(x=>x.name+" "+x.children.map(c=>c.name).join(" ")).join(" ")).includes(filter));grid.innerHTML=list.map(s=>`<article class="section-card" data-id="${s.id}"><span class="card-arrow">←</span><div class="card-icon">${s.icon}</div><h3>${s.name}</h3><p>${s.desc}</p></article>`).join("")||'<div class="no-results">لا توجد نتائج مطابقة.</div>';$$(".section-card").forEach(c=>c.onclick=()=>openSection(c.dataset.id))}
function openSection(id){currentSection=DATA.find(s=>s.id===id);let subs=currentSection.subs;$("#detailContent").innerHTML=`<span class="section-kicker">الأقسام العلمية</span><h2>${currentSection.name}</h2><p>${currentSection.desc}</p><div>${subs.map((sub,i)=>`<div class="detail-sub" data-sub="${i}"><strong>${sub.name}</strong><small>${sub.children.length?sub.children.length+" فرعاً علمياً":"قسم لإضافة الدروس والمواد"}</small>${sub.children.length?`<div class="subchildren">${sub.children.map(ch=>`<div class="detail-sub" data-child="${i}|${sub.children.indexOf(ch)}"><strong>◈ ${ch.name}</strong><small>عرض الدروس والمواد العلمية</small></div>`).join("")}</div>`:""}</div>`).join("")}</div><div class="detail-lessons" id="detailLessons"></div>`;$$("[data-child]").forEach(el=>el.onclick=e=>{e.stopPropagation();let [si,ci]=el.dataset.child.split("|").map(Number);showLessons(currentSection.name,currentSection.subs[si].name,currentSection.subs[si].children[ci].name)});$$("[data-sub]").forEach(el=>el.onclick=()=>{let sub=currentSection.subs[+el.dataset.sub];showLessons(currentSection.name,sub.name,null)});showLessons(currentSection.name);showModal("detailModal")}
function showLessons(section,sub=null,child=null){let found=lessons.filter(l=>l.section===section&&(!sub||l.subsection===sub)&&(!child||l.child===child));let box=$("#detailLessons");if(!box)return;box.innerHTML=`<h3>${child||sub||"الدروس المنشورة"}</h3>`+(found.length?found.map(l=>`<div class="detail-lesson"><strong>${l.title}</strong><p>${l.description||""}</p><small>${l.type} · ${l.date}</small>${l.url?`<br><a href="${safeUrl(l.url)}" target="_blank" rel="noopener">فتح المادة ←</a>`:""}</div>`).join(""):'<p class="no-results">لا توجد دروس منشورة في هذا الموضع بعد.</p>')}
function safeUrl(u){try{let x=new URL(u);return ["http:","https:"].includes(x.protocol)?x.href:"#"}catch{return "#"}}
function showModal(id){$("#"+id).classList.add("show");$("#"+id).setAttribute("aria-hidden","false")}
function closeModal(id){$("#"+id).classList.remove("show");$("#"+id).setAttribute("aria-hidden","true")}
function fillSections(){let sel=$("#lessonSection");sel.innerHTML=DATA.map(s=>`<option value="${s.name}">${s.name}</option>`).join("");updateSubsections()}
function updateSubsections(){let s=DATA.find(x=>x.name===$("#lessonSection").value);$("#lessonSubsection").innerHTML=s.subs.map(x=>`<option value="${x.name}">${x.name}</option>`).join("")}
function renderLatest(){let recent=[...lessons].reverse().slice(0,6);$("#latestGrid").innerHTML=recent.map(l=>`<article class="lesson-card"><span class="lesson-tag">${l.section}</span><h3>${l.title}</h3><p>${l.description||"درس علمي منشور على موقع رشيد رضوان."}</p><div class="lesson-meta"><span>${l.type} · ${l.date}</span>${l.url?`<a href="${safeUrl(l.url)}" target="_blank" rel="noopener">فتح المادة ←</a>`:"<span>محتوى علمي</span>"}</div></article>`).join("");$("#emptyLessons").style.display=recent.length?"none":"block"}
function renderManage(){let box=$("#manageList");box.innerHTML=lessons.length?[...lessons].reverse().map(l=>`<div class="admin-list-item"><div><strong>${l.title}</strong><small>${l.section} / ${l.subsection} · ${l.date}</small></div><button class="delete-btn" data-delete="${l.id}">حذف</button></div>`).join(""):'<p class="no-results">لم تضف أي درس بعد.</p>';$$("[data-delete]").forEach(b=>b.onclick=()=>{if(confirm("هل تريد حذف هذا الدرس؟")){lessons=lessons.filter(l=>l.id!==b.dataset.delete);save();renderManage();renderLatest();toast("تم حذف الدرس")}})}
$("#sectionSearch").addEventListener("input",e=>renderSections(e.target.value.trim()));
$("#menuToggle").onclick=()=>$("#mainNav").classList.toggle("open");
$("#adminOpen").onclick=()=>{showModal("adminModal");renderManage()};
$$("[data-close]").forEach(b=>b.onclick=()=>closeModal(b.dataset.close));
$$(".modal-backdrop").forEach(b=>b.addEventListener("click",e=>{if(e.target===b)closeModal(b.id)}));
$$(".tab").forEach(b=>b.onclick=()=>{$$(".tab").forEach(x=>x.classList.toggle("active",x===b));$$(".tab-panel").forEach(x=>x.classList.toggle("active",x.id==="tab-"+b.dataset.tab));if(b.dataset.tab==="manage")renderManage()});
fillSections();$("#lessonSection").onchange=updateSubsections;
$("#lessonForm").onsubmit=e=>{e.preventDefault();let f=new FormData(e.target);let l={id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),title:f.get("title").trim(),section:f.get("section"),subsection:f.get("subsection"),description:f.get("description").trim(),type:f.get("type"),url:f.get("url").trim(),date:new Date().toLocaleDateString("ar-MA")};lessons.push(l);save();renderLatest();e.target.reset();updateSubsections();toast("تم حفظ الدرس بنجاح");};
$("#exportBtn").onclick=()=>{let blob=new Blob([JSON.stringify({site:"موقع رشيد رضوان",version:1,lessons},null,2)],{type:"application/json"});let a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="rashid-redouane-backup.json";a.click();URL.revokeObjectURL(a.href);toast("تم تجهيز النسخة الاحتياطية")};
$("#importBtn").onclick=()=>{$("#importFile").click()};
$("#importFile").onchange=async e=>{let file=e.target.files[0];if(!file)return;try{let data=JSON.parse(await file.text());if(!Array.isArray(data.lessons))throw Error();lessons=data.lessons;save();renderLatest();renderManage();toast("تم استيراد البيانات")}catch{toast("تعذر قراءة ملف النسخة الاحتياطية")}e.target.value=""};
$("#year").textContent=new Date().getFullYear();renderSections();renderLatest();

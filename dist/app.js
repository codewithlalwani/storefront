const phone = '919827248628';
const whatsapp = (message) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
const genericMessage = 'Hello Shankar Steel & Wooden Furniture! I would like to know more about your furniture, pricing and delivery options.';
const currency = value => new Intl.NumberFormat('en-IN', {style:'currency',currency:'INR',maximumFractionDigits:0}).format(value);
const icons = {
 'Sofas':'<path d="M7 13V8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v5M4 13h3v8h18v-8h3v11H4ZM7 24v3m18-3v3M7 18h18"/>',
 'Beds':'<path d="M3 25V10m26 15V15H3m0 6h26M6 15V9h9v6m2 0V9h9v6"/>',
 'Dining':'<path d="M3 12h26v4H3Zm4 4v12m18-12v12M11 12V5h10v7M2 22h5m18 0h5"/>',
 'Chairs':'<path d="M9 17V4h14v13M6 17h20v4H6Zm3 4-2 8m16-8 2 8M12 4v13m8-13v13"/>',
 'Storage':'<path d="M5 3h22v26H5Zm11 0v26M12 14v4m8-4v4M5 25h22"/>',
 'Steel':'<path d="M5 4h22v24H5ZM5 12h22M5 20h22M16 4v24m-5-17v-3m10 3v-3m-10 11v-3m10 3v-3"/>'
};
const categories = Object.keys(icons);
const products = [
 {id:'SFW-001',name:'The Haven Sofa',category:'Sofas',price:32900,material:'Upholstered fabric · Wooden frame',size:'213 × 86 × 84 cm',finish:'Warm ivory',image:'sofa.jpg',badge:'EVERYDAY COMFORT',description:'An inviting three-seater with a relaxed silhouette for quiet evenings and good company.'},
 {id:'SFW-002',name:'The Gather Dining Set',category:'Dining',price:38900,material:'Wood · 4-seater dining set',size:'120 × 80 × 75 cm (table)',finish:'Natural wood',image:'dining.jpg',badge:'GATHER AROUND',description:'A warm wooden table with four chairs, bringing everyone together for everyday meals.'},
 {id:'SFW-003',name:'The Retreat Bed',category:'Beds',price:28900,material:'Wooden frame · Queen size',size:'Fits a 152 × 198 cm mattress',finish:'Natural wood',image:'bed.jpg',badge:'REST BEAUTIFULLY',description:'A simple, grounded wooden bed design to create a calm and comfortable bedroom. Mattress not included.'},
 {id:'SFW-004',name:'The Muse Accent Chair',category:'Chairs',price:9900,material:'Upholstered seat · Wooden frame',size:'70 × 75 × 82 cm',finish:'Natural wood & cream',image:'chair.jpg',badge:'A QUIET CORNER',description:'A comfortable accent chair for your reading nook or living room, with a light and timeless profile.'},
 {id:'SFW-005',name:'The Everyday Sideboard',category:'Storage',price:21900,material:'Engineered wood · Closed storage',size:'120 × 40 × 80 cm',finish:'Wood finish',image:'storage.jpg',badge:'ROOM FOR MORE',description:'A practical sideboard concept for keeping everyday essentials close and your room neatly arranged.'},
 {id:'SFW-006',name:'The Essential Steel Cabinet',category:'Steel',price:14900,material:'Powder-coated steel · Storage',size:'90 × 45 × 180 cm',finish:'Charcoal',image:'steel.jpg',badge:'STRENGTH IN SIMPLICITY',description:'A clean steel storage cabinet concept for organising household or workspace essentials.'},
 {id:'SFW-007',name:'The Nest Coffee Table',category:'Dining',price:7900,material:'Wood · Living room table',size:'90 × 50 × 40 cm',finish:'Natural wood',image:'table.jpg',badge:'LIVING ROOM ESSENTIAL',description:'A compact coffee table concept with natural character, designed for everyday living.'},
 {id:'SFW-008',name:'The Lounge Sofa',category:'Sofas',price:42900,material:'Soft upholstery · Wooden frame',size:'240 × 90 × 85 cm',finish:'Neutral fabric',image:'sofa.jpg',badge:'SPACE TO UNWIND',description:'A generous sofa concept for stretching out, settling in and making yourself at home.'}
];
const icon = category => `<svg viewBox="0 0 32 32" aria-hidden="true">${icons[category]}</svg>`;
const chatIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11a9 9 0 0 1-13 8L3 21l2-5A9 9 0 1 1 21 11Z"/></svg>';
const enquiry = p => whatsapp(`Hello Shankar Steel & Wooden Furniture! I am interested in ${p.name} (${p.id}), listed at an illustrative price of ${currency(p.price)}. Please share actual product photos, final price, available materials and finishes, dimensions, warranty, and delivery details.`);
let selected = 'All furniture';
const productContainer = document.querySelector('#products');
function filterCategory(category){
 if(category !== 'All furniture' && !categories.includes(category)) return;
 selected=category;
 document.querySelectorAll('.filter').forEach(b=>{const isSelected=b.dataset.category===category;b.classList.toggle('selected',isSelected);b.setAttribute('aria-pressed',String(isSelected));});
 const visible=products.filter(p=>category==='All furniture'||p.category===category);
 document.querySelector('#count').textContent=`${visible.length} ${visible.length===1?'piece':'pieces'} to discover`;
 document.querySelector('#empty').hidden=visible.length>0;
 productContainer.innerHTML=visible.map(p=>`<article class="product"><button class="product-photo product-detail-trigger" data-product="${p.id}" aria-label="View ${p.name} details"><img src="assets/${p.image}" alt="Illustrative ${p.category.toLowerCase()} design for ${p.name}" loading="lazy"><span class="badge">${p.badge}</span><span class="photo-details" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></span></button><div class="product-content"><div class="product-category"><span>${p.category}</span><span>${p.id}</span></div><h3>${p.name}</h3><p class="material">${p.material}</p><div class="product-meta"><div class="price">${currency(p.price)}<small>Illustrative price</small></div></div><div class="product-actions"><button data-product="${p.id}" aria-label="View details for ${p.name}">View details</button><a class="enquire" href="${enquiry(p)}" target="_blank" rel="noopener noreferrer" aria-label="Enquire about ${p.name} on WhatsApp">${chatIcon} Enquire on WhatsApp</a></div></div></article>`).join('');
}
document.querySelector('#filters').innerHTML=['All furniture',...categories].map(c=>`<button class="filter" data-category="${c}" aria-pressed="false">${c}</button>`).join('');
document.querySelector('#categoryLinks').innerHTML=categories.map((c,i)=>{const pieces=products.filter(p=>p.category===c);return `<a class="category-link" href="#collection" data-category="${c}" aria-label="Explore ${c==='Steel'?'steel furniture':c.toLowerCase()}"><div class="category-image"><img src="assets/${pieces[0].image}" alt="${c==='Steel'?'Steel furniture':c} collection preview" loading="lazy"><span class="category-number">0${i+1}</span></div><div class="category-info"><strong>${c}</strong><small>${pieces.length} ${pieces.length===1?'piece':'pieces'}</small></div></a>`;}).join('');
document.querySelectorAll('[data-category]').forEach(b=>b.addEventListener('click',()=>filterCategory(b.dataset.category)));
filterCategory(selected);


const dialog=document.querySelector('#details');
productContainer.addEventListener('click',e=>{const button=e.target.closest('[data-product]');if(!button)return;const p=products.find(p=>p.id===button.dataset.product);if(!p)return;document.querySelector('#detailContent').innerHTML=`<div class="detail-layout"><div class="detail-photo"><img src="assets/${p.image}" alt="Illustrative ${p.name}"><span>Illustrative photography</span></div><div class="detail-copy"><span class="eyebrow">${p.category} / ${p.id}</span><h2 id="dialogTitle">${p.name}</h2><div class="price">${currency(p.price)}<small>Illustrative price</small></div><p id="dialogDescription">${p.description}</p><dl class="specifications"><div><dt>Materials</dt><dd>${p.material}</dd></div><div><dt>Dimensions</dt><dd>${p.size}</dd></div><div><dt>Finish</dt><dd>${p.finish}</dd></div></dl><small>Sample specifications. Ask us to confirm actual photos, sizes, final price, availability, delivery, assembly and warranty before ordering.</small><a class="button dark" href="${enquiry(p)}" target="_blank" rel="noopener noreferrer">${chatIcon} Enquire on WhatsApp</a></div></div>`;dialog.setAttribute('aria-labelledby','dialogTitle');dialog.setAttribute('aria-describedby','dialogDescription');dialog.showModal();dialog.scrollTop=0;document.body.classList.add('modal-open');});
document.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
dialog.addEventListener('click',e=>{if(e.target===dialog){const rect=dialog.getBoundingClientRect();if(e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom)dialog.close();}});
document.querySelectorAll('.wa').forEach(a=>{a.href=whatsapp(genericMessage);a.target='_blank';a.rel='noopener noreferrer';});
document.querySelector('#year').textContent=new Date().getFullYear();

const menuToggle=document.querySelector('.menu-toggle');
const mobileMenu=document.querySelector('#mobileMenu');
function closeMenu(){mobileMenu.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open navigation');}
menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';mobileMenu.hidden=!open;menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
mobileMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('click',event=>{if(!mobileMenu.hidden&&!event.target.closest('.site-header'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileMenu.hidden){closeMenu();menuToggle.focus();}});
const desktopSize=window.matchMedia('(min-width:1001px)');
desktopSize.addEventListener('change',event=>{if(event.matches)closeMenu();});
const header=document.querySelector('.site-header');
if('ResizeObserver' in window){
 const headerObserver=new ResizeObserver(()=>document.documentElement.style.setProperty('--header-height',`${header.offsetHeight}px`));
 headerObserver.observe(header);
}
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>30),{passive:true});
if('IntersectionObserver' in window){
 const navigationObserver=new IntersectionObserver(entries=>{const section=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(!section)return;document.querySelectorAll('[data-nav]').forEach(link=>{const active=link.dataset.nav===section.target.id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});},{rootMargin:'-100px 0px -55% 0px',threshold:0});
 document.querySelectorAll('#home, #categories, #collection, #our-story').forEach(section=>navigationObserver.observe(section));
}

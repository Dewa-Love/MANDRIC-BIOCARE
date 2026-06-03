// ===== LOGO (src already set in HTML — no override needed) =====

// ===== HAMBURGER =====
function toggleMenu(){
  var m=document.getElementById('mobileMenu');
  var h=document.getElementById('hamburger');
  if(m) m.classList.toggle('open');
  if(h) h.classList.toggle('open');
}

// ===== MODAL =====
function openModal(product){
  document.getElementById('enquiryForm').style.display='block';
  document.getElementById('successMsg').style.display='none';
  var badge=document.getElementById('modalBadge');
  if(product&&product!=='General Enquiry'&&product!=='Partnership Enquiry'){
    badge.innerHTML='<div class="modal-product-badge">&#128138; '+product+'</div>';
    document.getElementById('eq-msg').value='I would like to enquire about: '+product;
  } else {
    badge.innerHTML='';
    document.getElementById('eq-msg').value='';
  }
  document.getElementById('enquiryModal').classList.add('open');
  document.body.style.overflow='hidden';
}

function closeModal(){
  document.getElementById('enquiryModal').classList.remove('open');
  document.body.style.overflow='';
}

function submitEnquiry(){
  var name=document.getElementById('eq-name').value.trim();
  var phone=document.getElementById('eq-phone').value.trim();
  var type=document.getElementById('eq-type').value;
  if(!name){alert('Please enter your full name.');return;}
  if(!phone){alert('Please enter your phone number.');return;}
  if(!type){alert('Please select an enquiry type.');return;}
  document.getElementById('enquiryForm').style.display='none';
  document.getElementById('successMsg').style.display='block';
  setTimeout(function(){
    document.getElementById('eq-name').value='';
    document.getElementById('eq-phone').value='';
    document.getElementById('eq-email').value='';
    document.getElementById('eq-type').value='';
    document.getElementById('eq-msg').value='';
  },600);
}

// Safe modal overlay click-to-close (guard prevents crash if modal missing)
var _modal = document.getElementById('enquiryModal');
if(_modal){
  _modal.addEventListener('click',function(e){
    if(e.target===this) closeModal();
  });
}
document.addEventListener('keydown',function(e){
  if(e.key==='Escape' && document.getElementById('enquiryModal')) closeModal();
});

// ===== HERO SLIDER =====
(function(){
  var slides=document.querySelectorAll('.slide');
  var dots=document.querySelectorAll('.sdot');
  if(!slides.length) return;
  var cur=0;
  var total=slides.length;
  var timer;

  function goTo(n){
    slides[cur].classList.remove('active');
    if(dots[cur]) dots[cur].classList.remove('active');
    cur=(n+total)%total;
    slides[cur].classList.add('active');
    if(dots[cur]) dots[cur].classList.add('active');
  }

  function startAuto(){
    timer=setInterval(function(){ goTo(cur+1); },5000);
  }

  function stopAuto(){ clearInterval(timer); }

  startAuto();

  var slider=document.getElementById('heroSlider');
  if(slider){
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);
  }

  window.sliderMove=function(dir){ stopAuto(); goTo(cur+dir); startAuto(); };
  window.sliderGo=function(n){ stopAuto(); goTo(n); startAuto(); };
})();

// ===== SCROLL REVEAL (GitHub Pages safe) =====
(function(){
  var sel='.reveal,.reveal-left,.reveal-right,.reveal-scale';
  var els=document.querySelectorAll(sel);
  if(!els.length) return;

  function show(el){ el.classList.add('visible'); }

  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ show(e.target); io.unobserve(e.target); } });
    },{threshold:0.01,rootMargin:'0px 0px -10px 0px'});

    els.forEach(function(el){
      // If already in viewport right now — show immediately
      var r=el.getBoundingClientRect();
      if(r.top < window.innerHeight && r.bottom > 0){ show(el); }
      else { io.observe(el); }
    });
  } else {
    // No IntersectionObserver support — show everything
    els.forEach(show);
  }

  // Safety net: after 800ms force ALL remaining hidden reveals visible
  // (covers timing edge cases on GitHub Pages / slow connections)
  setTimeout(function(){
    document.querySelectorAll(sel).forEach(show);
  }, 800);
})();

// ===== PRODUCT DATA =====
var products={
  pharma:[
    {name:'Amoxicillin 500mg',comp:'Amoxicillin Trihydrate',cat:'Antibiotic',form:'Capsule',ico:'&#128138;'},
    {name:'Azithromycin 250mg',comp:'Azithromycin Dihydrate',cat:'Antibiotic',form:'Tablet',ico:'&#128138;'},
    {name:'Cefixime 200mg',comp:'Cefixime Trihydrate',cat:'Antibiotic',form:'Tablet',ico:'&#128138;'},
    {name:'Ciprofloxacin 500mg',comp:'Ciprofloxacin HCl',cat:'Antibiotic',form:'Tablet',ico:'&#128138;'},
    {name:'Doxycycline 100mg',comp:'Doxycycline Hyclate',cat:'Antibiotic',form:'Capsule',ico:'&#128138;'},
    {name:'Metronidazole 400mg',comp:'Metronidazole',cat:'Antibiotic',form:'Tablet',ico:'&#128138;'},
    {name:'Atorvastatin 10mg',comp:'Atorvastatin Calcium',cat:'Cardiac',form:'Tablet',ico:'&#10084;&#65039;'},
    {name:'Amlodipine 5mg',comp:'Amlodipine Besylate',cat:'Cardiac',form:'Tablet',ico:'&#10084;&#65039;'},
    {name:'Metoprolol 50mg',comp:'Metoprolol Succinate',cat:'Cardiac',form:'Tablet',ico:'&#10084;&#65039;'},
    {name:'Ramipril 5mg',comp:'Ramipril',cat:'Cardiac',form:'Tablet',ico:'&#10084;&#65039;'},
    {name:'Telmisartan 40mg',comp:'Telmisartan',cat:'Cardiac',form:'Tablet',ico:'&#10084;&#65039;'},
    {name:'Clopidogrel 75mg',comp:'Clopidogrel Bisulfate',cat:'Cardiac',form:'Tablet',ico:'&#10084;&#65039;'},
    {name:'Metformin 500mg',comp:'Metformin HCl',cat:'Cardiac',form:'Tablet',ico:'&#10084;&#65039;'},
    {name:'Glimepiride 2mg',comp:'Glimepiride',cat:'Cardiac',form:'Tablet',ico:'&#10084;&#65039;'},
    {name:'Folic Acid 5mg',comp:'Folic Acid',cat:'Gynaec',form:'Tablet',ico:'&#129328;'},
    {name:'Iron Sucrose Injection',comp:'Iron (III) Hydroxide Sucrose',cat:'Gynaec',form:'Injection',ico:'&#129328;'},
    {name:'Progesterone 200mg',comp:'Micronised Progesterone',cat:'Gynaec',form:'Capsule',ico:'&#129328;'},
    {name:'Clomiphene 50mg',comp:'Clomiphene Citrate',cat:'Gynaec',form:'Tablet',ico:'&#129328;'},
    {name:'Methyldopa 250mg',comp:'Methyldopa',cat:'Gynaec',form:'Tablet',ico:'&#129328;'},
    {name:'Paracetamol 250mg Syrup',comp:'Paracetamol',cat:'Paediatric',form:'Syrup',ico:'&#128118;'},
    {name:'Amoxicillin 125mg Syrup',comp:'Amoxicillin Trihydrate',cat:'Paediatric',form:'Syrup',ico:'&#128118;'},
    {name:'Cetirizine 5mg Syrup',comp:'Cetirizine HCl',cat:'Paediatric',form:'Syrup',ico:'&#128118;'},
    {name:'Zinc Sulphate Syrup',comp:'Zinc Sulphate Monohydrate',cat:'Paediatric',form:'Syrup',ico:'&#128118;'},
    {name:'Salbutamol Syrup',comp:'Salbutamol Sulphate',cat:'Paediatric',form:'Syrup',ico:'&#128118;'},
    {name:'ORS Powder',comp:'WHO Formula ORS',cat:'Paediatric',form:'Sachet',ico:'&#128118;'},
    {name:'Diclofenac 50mg',comp:'Diclofenac Sodium',cat:'Analgesic',form:'Tablet',ico:'&#128138;'},
    {name:'Ibuprofen 400mg',comp:'Ibuprofen',cat:'Analgesic',form:'Tablet',ico:'&#128138;'},
    {name:'Paracetamol 650mg',comp:'Paracetamol',cat:'Analgesic',form:'Tablet',ico:'&#128138;'},
    {name:'Tramadol 50mg',comp:'Tramadol HCl',cat:'Analgesic',form:'Capsule',ico:'&#128138;'},
    {name:'Ketorolac 10mg',comp:'Ketorolac Tromethamine',cat:'Analgesic',form:'Tablet',ico:'&#128138;'},
    {name:'Pantoprazole 40mg',comp:'Pantoprazole Sodium',cat:'Gastro',form:'Tablet',ico:'&#129531;'},
    {name:'Omeprazole 20mg',comp:'Omeprazole',cat:'Gastro',form:'Capsule',ico:'&#129531;'},
    {name:'Ondansetron 4mg',comp:'Ondansetron HCl',cat:'Gastro',form:'Tablet',ico:'&#129531;'},
    {name:'Domperidone 10mg',comp:'Domperidone Maleate',cat:'Gastro',form:'Tablet',ico:'&#129531;'},
    {name:'Rabeprazole 20mg',comp:'Rabeprazole Sodium',cat:'Gastro',form:'Tablet',ico:'&#129531;'},
    {name:'Gabapentin 300mg',comp:'Gabapentin',cat:'Neuro',form:'Capsule',ico:'&#129504;'},
    {name:'Pregabalin 75mg',comp:'Pregabalin',cat:'Neuro',form:'Capsule',ico:'&#129504;'},
    {name:'Clonazepam 0.5mg',comp:'Clonazepam',cat:'Neuro',form:'Tablet',ico:'&#129504;'},
    {name:'Levetiracetam 500mg',comp:'Levetiracetam',cat:'Neuro',form:'Tablet',ico:'&#129504;'},
    {name:'Betamethasone Cream',comp:'Betamethasone Valerate 0.1%',cat:'Derma',form:'Cream',ico:'&#129300;'},
    {name:'Ketoconazole Shampoo',comp:'Ketoconazole 2%',cat:'Derma',form:'Shampoo',ico:'&#129300;'},
    {name:'Calamine Lotion',comp:'Calamine + Zinc Oxide',cat:'Derma',form:'Lotion',ico:'&#129300;'},
    {name:'Mupirocin Ointment',comp:'Mupirocin 2%',cat:'Derma',form:'Ointment',ico:'&#129300;'},
    {name:'Diclofenac Gel 1%',comp:'Diclofenac Diethylamine',cat:'Ortho',form:'Gel',ico:'&#129460;'},
    {name:'Calcium + Vit D3',comp:'Calcium Carbonate + Vitamin D3',cat:'Ortho',form:'Tablet',ico:'&#129460;'},
    {name:'Glucosamine 500mg',comp:'Glucosamine Sulphate',cat:'Ortho',form:'Tablet',ico:'&#129460;'},
    {name:'Ofloxacin Ear Drops',comp:'Ofloxacin 0.3%',cat:'ENT',form:'Ear Drops',ico:'&#128066;'},
    {name:'Xylometazoline Nasal',comp:'Xylometazoline HCl 0.1%',cat:'ENT',form:'Nasal Drops',ico:'&#128066;'},
    {name:'Beclomethasone Nasal',comp:'Beclomethasone Dipropionate',cat:'ENT',form:'Nasal Spray',ico:'&#128066;'}
  ],
  ayurvedic:[
    {name:'Ashwagandha Churna',comp:'Withania somnifera root powder',cat:'Immunity',form:'Powder',ico:'&#127807;'},
    {name:'Triphala Churna',comp:'Amalaki, Bibhitaki, Haritaki',cat:'Digestive',form:'Powder',ico:'&#127807;'},
    {name:'Chyawanprash',comp:'Amalaki + 40 herbs blend',cat:'Immunity',form:'Jam',ico:'&#127803;'},
    {name:'Brahmi Capsules',comp:'Bacopa monnieri extract 300mg',cat:'Immunity',form:'Capsule',ico:'&#127807;'},
    {name:'Shatavari Granules',comp:'Asparagus racemosus extract',cat:'Womens Health',form:'Granules',ico:'&#127804;'},
    {name:'Hingwastak Churna',comp:'Asafoetida + 7 herbs',cat:'Digestive',form:'Powder',ico:'&#127807;'},
    {name:'Liver Care Tablet',comp:'Himsra + Kasani + Punarnava',cat:'Liver',form:'Tablet',ico:'&#127807;'},
    {name:'Neem Capsules',comp:'Azadirachta indica leaf 500mg',cat:'Skin',form:'Capsule',ico:'&#127807;'},
    {name:'Turmeric Capsules',comp:'Curcuma longa standardized 95%',cat:'Immunity',form:'Capsule',ico:'&#129000;'},
    {name:'Giloy Juice',comp:'Tinospora cordifolia stem',cat:'Immunity',form:'Juice',ico:'&#127807;'},
    {name:'Aloe Vera Juice',comp:'Aloe barbadensis leaf 99%',cat:'Digestive',form:'Juice',ico:'&#127807;'},
    {name:'Amla Juice',comp:'Phyllanthus emblica fresh juice',cat:'Immunity',form:'Juice',ico:'&#127807;'},
    {name:'Chandraprabha Vati',comp:'Multi-herb Ayurvedic formulation',cat:'Womens Health',form:'Tablet',ico:'&#127807;'},
    {name:'Mahanarayan Oil',comp:'Narayana + sesame oil base',cat:'Joints',form:'Oil',ico:'&#129405;'},
    {name:'Neem Tulsi Face Wash',comp:'Neem + Tulsi + Aloe extracts',cat:'Skin',form:'Face Wash',ico:'&#129340;'},
    {name:'Punarnavadi Mandur',comp:'Punarnava + iron complex',cat:'Liver',form:'Tablet',ico:'&#127807;'},
    {name:'Shilajit Capsules',comp:'Purified Shilajit 500mg',cat:'Immunity',form:'Capsule',ico:'&#11035;'},
    {name:'Kanchanar Guggulu',comp:'Kanchanar bark + Guggulu resin',cat:'Joints',form:'Tablet',ico:'&#127807;'}
  ],
  nutraceutical:[
    {name:'Vitamin C 500mg',comp:'Ascorbic Acid',cat:'Vitamins',form:'Tablet',ico:'&#127818;'},
    {name:'Vitamin D3 60000 IU',comp:'Cholecalciferol',cat:'Vitamins',form:'Sachet',ico:'&#9728;&#65039;'},
    {name:'Vitamin B12 1500mcg',comp:'Methylcobalamin',cat:'Vitamins',form:'Tablet',ico:'&#128138;'},
    {name:'Multivitamin + Minerals',comp:'12 Vitamins + 9 Minerals blend',cat:'Vitamins',form:'Tablet',ico:'&#127752;'},
    {name:'Biotin 10000mcg',comp:'D-Biotin',cat:'Vitamins',form:'Tablet',ico:'&#128138;'},
    {name:'Zinc 50mg',comp:'Zinc Sulphate Monohydrate',cat:'Minerals',form:'Tablet',ico:'&#128309;'},
    {name:'Magnesium 250mg',comp:'Magnesium Oxide',cat:'Minerals',form:'Tablet',ico:'&#9898;'},
    {name:'Iron + Folic Acid',comp:'Ferrous Sulphate + Folic Acid',cat:'Minerals',form:'Tablet',ico:'&#128308;'},
    {name:'Selenium 200mcg',comp:'Selenium Methionine',cat:'Minerals',form:'Tablet',ico:'&#128138;'},
    {name:'Calcium + Mag + D3',comp:'Triple Bone Support Complex',cat:'Bone Health',form:'Tablet',ico:'&#129460;'},
    {name:'Glucosamine + Chondroitin',comp:'Joint Support Complex',cat:'Bone Health',form:'Tablet',ico:'&#129460;'},
    {name:'Collagen Peptides',comp:'Hydrolysed Marine Collagen 10g',cat:'Bone Health',form:'Powder',ico:'&#10024;'},
    {name:'Whey Protein Powder',comp:'Whey Protein Concentrate 80%',cat:'Protein',form:'Powder',ico:'&#129371;'},
    {name:'Plant Protein Blend',comp:'Pea + Rice + Hemp protein',cat:'Protein',form:'Powder',ico:'&#127807;'},
    {name:'Omega-3 Fish Oil',comp:'EPA 180mg + DHA 120mg per cap',cat:'Immunity',form:'Softgel',ico:'&#128031;'},
    {name:'Probiotic + Prebiotic',comp:'10 Billion CFU multi-strain',cat:'Immunity',form:'Sachet',ico:'&#129440;'},
    {name:'Elderberry + Vit C + Zinc',comp:'Immunity Support Complex',cat:'Immunity',form:'Tablet',ico:'&#129359;'},
    {name:'Spirulina 500mg',comp:'Arthrospira platensis dried',cat:'Immunity',form:'Tablet',ico:'&#127796;'},
    {name:'CoQ10 100mg',comp:'Coenzyme Q10 (Ubiquinone)',cat:'Antioxidant',form:'Softgel',ico:'&#128155;'},
    {name:'Alpha Lipoic Acid 300mg',comp:'R-Alpha Lipoic Acid',cat:'Antioxidant',form:'Capsule',ico:'&#128998;'},
    {name:'Lycopene + Selenium',comp:'Lycopene 8% + Selenium 200mcg',cat:'Antioxidant',form:'Tablet',ico:'&#127813;'}
  ]
};

var activeCat={pharma:'All',ayurvedic:'All',nutraceutical:'All'};
var activeSearch={pharma:'',ayurvedic:'',nutraceutical:''};

function renderProducts(seg){
  var grid=document.getElementById(seg+'-grid');
  if(!grid) return;
  var empty=document.getElementById(seg+'-empty');
  var count=document.getElementById(seg+'-count');
  var cat=activeCat[seg];
  var term=activeSearch[seg].toLowerCase();
  var filtered=products[seg].filter(function(p){
    var mc=cat==='All'||p.cat===cat;
    var mt=!term||p.name.toLowerCase().includes(term)||p.comp.toLowerCase().includes(term)||p.cat.toLowerCase().includes(term)||p.form.toLowerCase().includes(term);
    return mc&&mt;
  });
  count.textContent='Showing '+filtered.length+' product'+(filtered.length!==1?'s':'');
  if(!filtered.length){grid.innerHTML='';empty.classList.remove('hidden');return;}
  empty.classList.add('hidden');
  grid.innerHTML=filtered.map(function(p){
    var name=p.name.replace(/'/g,'&#39;');
    return '<div class="prod-card">'
      +'<div class="prod-card-top">'+p.ico+'</div>'
      +'<div class="prod-body">'
      +'<div class="prod-name">'+p.name+'</div>'
      +'<div class="prod-comp">'+p.comp+'</div>'
      +'<div class="prod-tags"><span class="prod-tag">'+p.cat+'</span><span class="prod-tag green">'+p.form+'</span></div>'
      +'<button class="prod-enquire" onclick="openModal(\''+name+'\')">Enquire Now &#8594;</button>'
      +'</div></div>';
  }).join('');
}

function filterProducts(seg,val){
  activeSearch[seg]=val;
  renderProducts(seg);
}

function setCat(seg,cat,el){
  activeCat[seg]=cat;
  var tags=el.closest('.filter-group').querySelectorAll('.filter-tag');
  tags.forEach(function(t){t.classList.remove('active');});
  el.classList.add('active');
  renderProducts(seg);
}

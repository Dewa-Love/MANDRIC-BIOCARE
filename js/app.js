// ===== LOGO (src already set in HTML — no override needed) =====

// ===== HAMBURGER =====
function toggleMenu(){
  var m=document.getElementById('mobileMenu');
  var h=document.getElementById('hamburger');
  if(m) m.classList.toggle('open');
  if(h) h.classList.toggle('open');
}

// ===== MODAL =====
function generateDesc(product, comp, cat, form){
  var catDescMap = {
    'Antibiotic': 'A broad-spectrum antibiotic used to treat bacterial infections.',
    'Cardiac': 'A cardiovascular medicine used to support heart health and blood pressure management.',
    'Gynaecology': 'A speciality medicine formulated for women&#39;s health and hormonal balance.',
    'Neurology': 'A neurological medicine used to support brain and nervous system health.',
    'Gastro': 'A gastroenterological medicine for digestive health and stomach disorders.',
    'Diabetes': 'An antidiabetic medicine used to manage blood sugar levels effectively.',
    'Pain Relief': 'A pain reliever and anti-inflammatory medicine for joint, muscle and body pain.',
    'Bone Health': 'A bone health supplement providing essential calcium and vitamin support.',
    'Muscle Relaxant': 'A muscle relaxant that relieves spasm, stiffness and muscular pain.',
    'Supports': 'An orthopaedic support device that provides compression, stability and pain relief.',
    'Injection': 'A sterile injectable formulation for targeted and rapid therapeutic effect.',
    'Topical': 'A topical preparation applied directly to the skin for localized pain relief.',
    'Instruments': 'A precision-grade surgical instrument crafted from high-quality stainless steel.',
    'Disposables': 'A sterile single-use medical disposable ensuring safe clinical procedures.',
    'Sutures': 'A surgical suture material used for wound closure and tissue approximation.',
    'Wound Care': 'A wound care product designed to promote healing and prevent infection.',
    'OT Supplies': 'A sterile operating theatre supply essential for safe surgical procedures.',
    'Diagnostic': 'A diagnostic medical device used to monitor patient vitals accurately.',
    'Nutrition': 'A specialized nutritional supplement formulated for healthy growth and development.',
    'Vitamins': 'A vitamin supplement to support immunity, growth and overall health.',
    'Iron & Calcium': 'An iron and calcium supplement to prevent deficiency and support bone development.',
    'Immunity': 'An immunity booster supplement formulated to strengthen the body&#39;s natural defences.',
    'Cough & Cold': 'A paediatric medicine for relief from cough, cold, fever and allergic symptoms.',
    'Digestive': 'A digestive health medicine for relief from nausea, constipation and gut disorders.',
    'Antibiotic': 'A paediatric-grade antibiotic syrup for bacterial infections in children.',
    'Vitamins': 'A vitamin supplement in drops/syrup form for infants and growing children.',
    'Skin': 'A dermatological preparation formulated for skin health and topical treatment.',
    'Liver': 'A hepatoprotective formulation to support liver function and detoxification.',
    'Joints': 'A formulation for joint pain, inflammation and mobility support.',
  };
  var desc = catDescMap[cat] || ('A quality-assured ' + (form||'formulation').toLowerCase() + ' for ' + (cat||'therapeutic').toLowerCase() + ' use, manufactured under GMP-certified standards.');
  if(comp) desc += ' Active ingredient: ' + comp + '.';
  return desc;
}

function openModal(product, comp, cat, form, ico){
  var isProduct = product && product!=='General Enquiry' && product!=='Partnership Enquiry';
  var modal = document.getElementById('enquiryModal');
  var badge = document.getElementById('modalBadge');

  // Reset animation by removing and re-adding open class
  modal.classList.remove('open');
  void modal.offsetWidth;

  document.getElementById('enquiryForm').style.display='block';
  document.getElementById('successMsg').style.display='none';

  // Build modal header
  var modalEl = modal.querySelector('.modal');
  var headerEl = modalEl ? modalEl.querySelector('.modal-header') : null;
  var bodyEl = modalEl ? modalEl.querySelector('.modal-body') : null;

  if(isProduct && headerEl && bodyEl){
    var icoHtml = ico || '&#128138;';
    var waText = 'Hi, I would like to enquire about: ' + product + (comp ? ' (' + comp + ')' : '');
    var desc = generateDesc(product, comp, cat, form);

    // Populate header
    headerEl.querySelector('h2').textContent = 'Product Enquiry';
    headerEl.querySelector('.modal-sub').textContent = 'Get in touch with our team within 24 hours.';
    badge.innerHTML =
      '<div class="modal-prod-hero">'
      + '<div class="modal-prod-ico">' + icoHtml + '</div>'
      + '<div class="modal-prod-info">'
      + '<div class="modal-prod-name">' + product + '</div>'
      + (comp ? '<div class="modal-prod-comp">' + comp + '</div>' : '')
      + '<div class="modal-prod-meta">'
      + (cat ? '<span class="prod-tag">' + cat + '</span>' : '')
      + (form ? '<span class="prod-tag green">' + form + '</span>' : '')
      + '</div></div></div>'
      + '<div class="modal-prod-desc">'
      + '<div class="modal-prod-desc-label">&#128196; About this product</div>'
      + '<div class="modal-prod-desc-text">' + desc + '</div>'
      + '</div>'
      + '<div class="modal-prod-wa"><a href="https://wa.me/919919909009?text=' + encodeURIComponent(waText) + '" target="_blank" class="btn-wa-quick">&#128172; Quick WhatsApp Enquiry</a></div>';

    document.getElementById('eq-msg').value = waText;
  } else {
    badge.innerHTML='';
    document.getElementById('eq-msg').value='';
  }
  modal.classList.add('open');
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
  ],
  surgical:[
    {name:'Scalpel Handle No.3',comp:'Stainless Steel Reusable',cat:'Instruments',form:'Piece',ico:'&#129657;'},
    {name:'Scalpel Blade No.22',comp:'High-Carbon Steel Sterile',cat:'Instruments',form:'Box/100',ico:'&#129657;'},
    {name:'Artery Forceps Curved',comp:'Stainless Steel 16cm',cat:'Instruments',form:'Piece',ico:'&#129657;'},
    {name:'Tissue Dissecting Forceps',comp:'Stainless Steel Toothed 15cm',cat:'Instruments',form:'Piece',ico:'&#129657;'},
    {name:'Needle Holder',comp:'Mayo-Hegar Stainless 18cm',cat:'Instruments',form:'Piece',ico:'&#129657;'},
    {name:'Surgical Scissors',comp:'Mayo Straight Stainless 17cm',cat:'Instruments',form:'Piece',ico:'&#129657;'},
    {name:'Vicryl Suture 2-0',comp:'Polyglactin 910 Braided Absorbable',cat:'Sutures',form:'Box/12',ico:'&#129523;'},
    {name:'Chromic Catgut 1-0',comp:'Collagen Absorbable Suture',cat:'Sutures',form:'Box/12',ico:'&#129523;'},
    {name:'Silk Suture 2-0',comp:'Braided Non-Absorbable Black Silk',cat:'Sutures',form:'Box/12',ico:'&#129523;'},
    {name:'Prolene Suture 3-0',comp:'Polypropylene Monofilament',cat:'Sutures',form:'Box/12',ico:'&#129523;'},
    {name:'Nylon Suture 4-0',comp:'Monofilament Non-Absorbable',cat:'Sutures',form:'Box/12',ico:'&#129523;'},
    {name:'Sterile Gauze Swabs',comp:'Cotton Gauze 10x10cm 12-ply',cat:'Wound Care',form:'Pack/100',ico:'&#129657;'},
    {name:'Crepe Bandage 10cm',comp:'Elastic Cotton Crepe',cat:'Wound Care',form:'Roll',ico:'&#129657;'},
    {name:'Adhesive Wound Dressing',comp:'Waterproof Sterile 10x15cm',cat:'Wound Care',form:'Box/50',ico:'&#129657;'},
    {name:'Povidone Iodine Swabsticks',comp:'Povidone Iodine 10% USP',cat:'Wound Care',form:'Box/25',ico:'&#129657;'},
    {name:'Disposable Syringe 5ml',comp:'3-Part Luer Lock Sterile',cat:'Disposables',form:'Box/100',ico:'&#128203;'},
    {name:'Disposable Syringe 10ml',comp:'3-Part Luer Lock Sterile',cat:'Disposables',form:'Box/100',ico:'&#128203;'},
    {name:'IV Cannula 20G',comp:'Teflon Catheter with Wings',cat:'Disposables',form:'Box/50',ico:'&#128203;'},
    {name:'Surgical Gloves 7.0',comp:'Latex Sterile Powdered',cat:'Disposables',form:'Pair/Box',ico:'&#128203;'},
    {name:'Surgical Face Mask',comp:'3-Ply Tie-On Sterile',cat:'OT Supplies',form:'Box/50',ico:'&#128171;'},
    {name:'Surgical Drape Sheet',comp:'Sterile Non-Woven 150x200cm',cat:'OT Supplies',form:'Piece',ico:'&#128171;'},
    {name:'Foley Catheter 14Fr',comp:'2-Way Silicone Coated',cat:'OT Supplies',form:'Piece',ico:'&#128171;'},
    {name:'BP Apparatus Aneroid',comp:'Dial Type with Velcro Cuff',cat:'Diagnostic',form:'Set',ico:'&#129657;'},
    {name:'Pulse Oximeter',comp:'Fingertip SpO2 & PR Monitor',cat:'Diagnostic',form:'Piece',ico:'&#129657;'}
  ],
  paediatric:[
    {name:'Amoxicillin 125mg/5ml',comp:'Amoxicillin Trihydrate',cat:'Antibiotic',form:'Syrup',ico:'&#128138;'},
    {name:'Azithromycin 100mg/5ml',comp:'Azithromycin Dihydrate',cat:'Antibiotic',form:'Syrup',ico:'&#128138;'},
    {name:'Cefixime 50mg/5ml',comp:'Cefixime Trihydrate',cat:'Antibiotic',form:'Syrup',ico:'&#128138;'},
    {name:'Paracetamol 125mg/5ml',comp:'Paracetamol (Acetaminophen)',cat:'Cough & Cold',form:'Syrup',ico:'&#127909;'},
    {name:'Ibuprofen 100mg/5ml',comp:'Ibuprofen IP',cat:'Cough & Cold',form:'Syrup',ico:'&#127909;'},
    {name:'Cetirizine 5mg/5ml',comp:'Cetirizine Dihydrochloride',cat:'Cough & Cold',form:'Syrup',ico:'&#127909;'},
    {name:'Levosalbutamol + Ambroxol',comp:'Levosalbutamol 1mg + Ambroxol 15mg/5ml',cat:'Cough & Cold',form:'Syrup',ico:'&#127798;'},
    {name:'Chlorpheniramine Maleate',comp:'Chlorpheniramine Maleate 2mg/5ml',cat:'Cough & Cold',form:'Syrup',ico:'&#127798;'},
    {name:'Zinc Sulphate 20mg/5ml',comp:'Zinc Sulphate Monohydrate',cat:'Nutrition',form:'Syrup',ico:'&#11088;'},
    {name:'Ferrous Ascorbate + Folic Acid',comp:'Ferrous Ascorbate 30mg + Folic Acid 0.5mg',cat:'Iron & Calcium',form:'Syrup',ico:'&#129386;'},
    {name:'Calcium + Vitamin D3',comp:'Calcium Carbonate 250mg + Vit D3 400IU',cat:'Iron & Calcium',form:'Syrup',ico:'&#129386;'},
    {name:'Ferrous Sulfate Drops',comp:'Ferrous Sulphate 25mg/ml',cat:'Iron & Calcium',form:'Drops',ico:'&#129386;'},
    {name:'Multivitamin Drops',comp:'Vitamins A, C, D3, B-Complex',cat:'Vitamins',form:'Drops',ico:'&#127774;'},
    {name:'Vitamin D3 400IU Drops',comp:'Cholecalciferol 400IU/ml',cat:'Vitamins',form:'Drops',ico:'&#127774;'},
    {name:'Vitamin C 100mg',comp:'Ascorbic Acid',cat:'Vitamins',form:'Chewable Tablet',ico:'&#127774;'},
    {name:'Vitamin B12 + Folic Acid',comp:'Methylcobalamin 500mcg + Folic Acid 1.5mg',cat:'Vitamins',form:'Syrup',ico:'&#127774;'},
    {name:'Probiotic Drops',comp:'Lactobacillus reuteri 100M CFU/5drops',cat:'Digestive',form:'Drops',ico:'&#129514;'},
    {name:'Lactulose Solution',comp:'Lactulose 3.35g/5ml',cat:'Digestive',form:'Syrup',ico:'&#129514;'},
    {name:'Ondansetron 2mg/5ml',comp:'Ondansetron HCl',cat:'Digestive',form:'Syrup',ico:'&#129514;'},
    {name:'ORS + Zinc Sachets',comp:'WHO-ORS + Zinc Gluconate 20mg',cat:'Digestive',form:'Powder',ico:'&#129514;'},
    {name:'Protein Powder (Paediatric)',comp:'Whey Protein + Essential Amino Acids',cat:'Nutrition',form:'Powder',ico:'&#129371;'},
    {name:'PediaSure Growth Formula',comp:'High Protein + DHA + Vitamin Mix',cat:'Nutrition',form:'Powder',ico:'&#129371;'},
    {name:'Immunace Junior',comp:'Vitamin C + Zinc + Elderberry Extract',cat:'Immunity',form:'Syrup',ico:'&#128170;'},
    {name:'BCG Adjuvant Supplement',comp:'Beta-glucan + Vit C + Vit E',cat:'Immunity',form:'Drops',ico:'&#128170;'}
  ],
  ortho:[
    {name:'Diclofenac Sodium 50mg',comp:'Diclofenac Sodium IP',cat:'Pain Relief',form:'Tablet',ico:'&#129461;'},
    {name:'Etoricoxib 90mg',comp:'Etoricoxib',cat:'Pain Relief',form:'Tablet',ico:'&#129461;'},
    {name:'Aceclofenac 100mg + Paracetamol 325mg',comp:'Aceclofenac + Paracetamol',cat:'Pain Relief',form:'Tablet',ico:'&#129461;'},
    {name:'Ibuprofen 400mg + Paracetamol 325mg',comp:'Ibuprofen + Paracetamol',cat:'Pain Relief',form:'Tablet',ico:'&#129461;'},
    {name:'Tramadol 50mg',comp:'Tramadol HCl',cat:'Pain Relief',form:'Capsule',ico:'&#129461;'},
    {name:'Ketorolac 10mg',comp:'Ketorolac Tromethamine',cat:'Pain Relief',form:'Tablet',ico:'&#129461;'},
    {name:'Calcium + Vitamin D3 + Zinc',comp:'Calcium Carbonate 500mg + Vit D3 250IU + Zinc 7.5mg',cat:'Bone Health',form:'Tablet',ico:'&#129460;'},
    {name:'Calcitriol 0.25mcg',comp:'Calcitriol (Active Vit D3)',cat:'Bone Health',form:'Capsule',ico:'&#129460;'},
    {name:'Alendronate 70mg',comp:'Alendronate Sodium',cat:'Bone Health',form:'Tablet',ico:'&#129460;'},
    {name:'Strontium Ranelate 2g',comp:'Strontium Ranelate',cat:'Bone Health',form:'Sachet',ico:'&#129460;'},
    {name:'Glucosamine 500mg + Chondroitin 400mg',comp:'Glucosamine Sulphate + Chondroitin Sulphate',cat:'Bone Health',form:'Tablet',ico:'&#129460;'},
    {name:'Thiocolchicoside 4mg',comp:'Thiocolchicoside',cat:'Muscle Relaxant',form:'Tablet',ico:'&#128170;'},
    {name:'Cyclobenzaprine 5mg',comp:'Cyclobenzaprine HCl',cat:'Muscle Relaxant',form:'Tablet',ico:'&#128170;'},
    {name:'Baclofen 10mg',comp:'Baclofen IP',cat:'Muscle Relaxant',form:'Tablet',ico:'&#128170;'},
    {name:'Methocarbamol 500mg',comp:'Methocarbamol',cat:'Muscle Relaxant',form:'Tablet',ico:'&#128170;'},
    {name:'Knee Cap Support (M)',comp:'Elastic Neoprene Open Patella',cat:'Supports',form:'Piece',ico:'&#129464;'},
    {name:'Lumbar Sacral Belt',comp:'Contoured LS Belt with Stays',cat:'Supports',form:'Piece',ico:'&#129464;'},
    {name:'Cervical Collar Soft',comp:'Foam Cervical Collar Medium',cat:'Supports',form:'Piece',ico:'&#129464;'},
    {name:'Wrist Brace',comp:'Neoprene Thumb Spica Splint',cat:'Supports',form:'Piece',ico:'&#129464;'},
    {name:'Ankle Support',comp:'Elastic Lace-Up Ankle Brace',cat:'Supports',form:'Piece',ico:'&#129464;'},
    {name:'Methylprednisolone Inj 40mg',comp:'Methylprednisolone Acetate',cat:'Injection',form:'Vial',ico:'&#128137;'},
    {name:'Hyaluronic Acid Inj 20mg',comp:'Sodium Hyaluronate 1%',cat:'Injection',form:'Prefilled Syringe',ico:'&#128137;'},
    {name:'Diclofenac Gel 1%',comp:'Diclofenac Diethylamine 1.16%',cat:'Topical',form:'Tube/30g',ico:'&#129657;'},
    {name:'Ketoprofen Gel 2.5%',comp:'Ketoprofen',cat:'Topical',form:'Tube/50g',ico:'&#129657;'}
  ]
};

var activeCat={pharma:'All',ayurvedic:'All',nutraceutical:'All',paediatric:'All',surgical:'All',ortho:'All'};
var activeSearch={pharma:'',ayurvedic:'',nutraceutical:'',paediatric:'',surgical:'',ortho:''};
var _lastFiltered = [];

function renderProducts(seg){
  var grid=document.getElementById(seg+'-grid');
  if(!grid) return;
  var empty=document.getElementById(seg+'-empty');
  var count=document.getElementById(seg+'-count');
  var cat=activeCat[seg];
  var term=activeSearch[seg].toLowerCase();
  var filtered=(products[seg]||[]).filter(function(p){
    var mc=cat==='All'||p.cat===cat;
    var mt=!term||p.name.toLowerCase().includes(term)||p.comp.toLowerCase().includes(term)||p.cat.toLowerCase().includes(term)||p.form.toLowerCase().includes(term);
    return mc&&mt;
  });
  _lastFiltered=filtered;
  count.textContent='Showing '+filtered.length+' product'+(filtered.length!==1?'s':'');
  if(!filtered.length){grid.innerHTML='';empty.classList.remove('hidden');return;}
  empty.classList.add('hidden');
  grid.innerHTML=filtered.map(function(p,i){
    return '<div class="prod-card" onclick="openProductModal('+i+')" style="cursor:pointer;">'
      +'<div class="prod-card-top">'+p.ico+'</div>'
      +'<div class="prod-body">'
      +'<div class="prod-name">'+p.name+'</div>'
      +'<div class="prod-comp">'+p.comp+'</div>'
      +'<div class="prod-tags"><span class="prod-tag">'+p.cat+'</span><span class="prod-tag green">'+p.form+'</span></div>'
      +'<button class="prod-enquire">Enquire Now &#8594;</button>'
      +'</div></div>';
  }).join('');
}

function openProductModal(i){
  var p=_lastFiltered[i];
  if(!p) return;
  openModal(p.name, p.comp, p.cat, p.form, p.ico);
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

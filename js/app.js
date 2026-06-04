// ===== LOGO (src already set in HTML — no override needed) =====

// ===== HOMEPAGE VIDEO INTRO =====
(function () {
  var intro = document.getElementById('siteIntro');
  var video = document.getElementById('siteIntroVideo');
  if (!intro || !video) return;

  var finished = false;

  function finishIntro() {
    if (finished) return;
    finished = true;
    intro.classList.add('closing');
    document.body.classList.remove('intro-playing');
    setTimeout(function () {
      if (intro && intro.parentNode) intro.parentNode.removeChild(intro);
    }, 450);
  }

  video.addEventListener('ended', finishIntro);
  video.addEventListener('error', finishIntro);

  var autoplayPromise = video.play();
  if (autoplayPromise && typeof autoplayPromise.catch === 'function') {
    autoplayPromise.catch(finishIntro);
  }

  setTimeout(finishIntro, 15000);
})();

// ===== HAMBURGER =====
function toggleMenu() {
  var m = document.getElementById('mobileMenu');
  var h = document.getElementById('hamburger');
  if (m) m.classList.toggle('open');
  if (h) h.classList.toggle('open');
}

// ===== MOBILE FILTER SIDEBAR TOGGLE =====
function toggleFilterSidebar() {
  var sidebar = document.getElementById('filterSidebar');
  var btn = document.getElementById('filterToggleBtn');
  if (!sidebar || !btn) return;
  var isOpen = sidebar.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

// ===== MODAL =====
function generateDesc(product, comp, cat, form) {
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
  var desc = catDescMap[cat] || ('A quality-assured ' + (form || 'formulation').toLowerCase() + ' for ' + (cat || 'therapeutic').toLowerCase() + ' use, manufactured under GMP-certified standards.');
  if (comp) desc += ' Active ingredient: ' + comp + '.';
  return desc;
}

function getBenefitPoints(cat, form) {
  var benefitMap = {
    Digestive: [
      'Supports healthy digestive balance and gut comfort',
      'Helps customers discuss common stomach and bowel concerns',
      'Suitable for retail, wholesale and distribution enquiries'
    ],
    Antibiotic: [
      'Useful for bacterial infection management discussions',
      'Available in a formulation suited for clinical recommendation',
      'Supported by fast-response enquiry handling for partners'
    ],
    Nutrition: [
      'Supports daily nutritional needs and recovery planning',
      'Easy to present to families, clinics and stockists',
      'Works well for bulk and institutional enquiries'
    ],
    Analgesic: [
      'Designed for pain and fever relief conversations',
      'Convenient dosage format for everyday use cases',
      'Good fit for retailer and distributor follow-up'
    ],
    Gastro: [
      'Supports gastric comfort and acid-related concerns',
      'Helps position the product for prescription and trade leads',
      'Ideal for quick WhatsApp and form-based enquiries'
    ],
    Immunity: [
      'Supports general wellness and preventive care needs',
      'Helpful for seasonal and family-health discussions',
      'Simple to route to the right sales or support contact'
    ],
    Liver: [
      'Supports liver care and detoxification conversations',
      'Appropriate for clinical, retail and stockist queries',
      'Built for quick follow-up from the Mandric team'
    ],
    Skin: [
      'Helps position the product for topical care enquiries',
      'Easy to explain in both retail and practitioner settings',
      'Useful for bulk and distribution requests'
    ],
    Joints: [
      'Supports joint comfort and mobility discussions',
      'Practical for customer, doctor and wholesale enquiries',
      'Keeps the enquiry flow simple and fast'
    ]
  };

  var defaults = [
    'Quality-assured formulation with clear product details',
    'Fast response from our enquiry team',
    'Suitable for retail, wholesale and distribution follow-up'
  ];

  var key = cat && benefitMap[cat] ? cat : null;
  var points = key ? benefitMap[key].slice(0, 3) : defaults.slice(0, 3);

  if (form && points.length < 3) {
    points.push('Available in ' + form.toLowerCase() + ' format for easy discussion');
  }

  return points.slice(0, 3);
}

function buildProductBadgeHtml(product, comp, cat, form, ico, img, desc, waText) {
  var benefitPoints = getBenefitPoints(cat, form);
  var icoHtml = img
    ? '<img src="' + img + '" alt="' + product + '" style="width:200px;height:200px;max-width:200px;max-height:200px;object-fit:cover;display:block;">'
    : (ico || '&#128138;');

  return ''
    + '<div class="modal-prod-hero">'
    + '<div class="modal-prod-ico' + (img ? ' modal-prod-ico-photo' : '') + '" style="' + (img ? 'width:200px;height:200px;min-width:200px;min-height:200px;flex:0 0 200px;aspect-ratio:1/1;padding:0;' : '') + '">' + icoHtml + '</div>'
    + '<div class="modal-prod-info">'
    + '<div class="modal-prod-name">' + product + '</div>'
    + (comp ? '<div class="modal-prod-comp">' + comp + '</div>' : '')
    + '<div class="modal-prod-meta">'
    + (cat ? '<span class="prod-tag">' + cat + '</span>' : '')
    + (form ? '<span class="prod-tag green">' + form + '</span>' : '')
    + '</div>'
    + '</div>'
    + '</div>'
    + '<div class="modal-prod-benefits">'
    + benefitPoints.map(function (point) {
      return '<div class="modal-benefit"><i class="ti ti-circle-check" aria-hidden="true"></i><span>' + point + '</span></div>';
    }).join('')
    + '</div>'
    + '<div class="modal-prod-desc">'
    + '<div class="modal-prod-desc-label">&#128196; About this product</div>'
    + '<div class="modal-prod-desc-text">' + desc + '</div>'
    + '</div>'
    + '<div class="modal-prod-wa">'
    + '<a href="https://wa.me/919919909009?text=' + encodeURIComponent(waText) + '" target="_blank" class="btn-wa-quick">&#128172; Quick WhatsApp Enquiry</a>'
    + '</div>';
}

function openModal(product, comp, cat, form, ico, img) {
  var isProduct = product && product !== 'General Enquiry' && product !== 'Partnership Enquiry';
  var overlay = document.getElementById('enquiryModal');
  var badge = document.getElementById('modalBadge');

  // Reset animation
  overlay.classList.remove('open');
  void overlay.offsetWidth;

  document.getElementById('enquiryForm').style.display = 'block';
  document.getElementById('successMsg').style.display = 'none';

  if (isProduct) {
    var waText = 'Hi, I would like to enquire about: ' + product + (comp ? ' (' + comp + ')' : '');
    var desc = generateDesc(product, comp, cat, form);

    badge.innerHTML = buildProductBadgeHtml(product, comp, cat, form, ico, img, desc, waText);

    document.getElementById('eq-msg').value = waText;
  } else {
    badge.innerHTML = '';
    document.getElementById('eq-msg').value = '';
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('enquiryModal').classList.remove('open');
  document.body.style.overflow = '';
}

function submitEnquiry() {
  var name = document.getElementById('eq-name').value.trim();
  var phone = document.getElementById('eq-phone').value.trim();
  var type = document.getElementById('eq-type').value;
  if (!name) { alert('Please enter your full name.'); return; }
  if (!phone) { alert('Please enter your phone number.'); return; }
  if (!type) { alert('Please select an enquiry type.'); return; }
  document.getElementById('enquiryForm').style.display = 'none';
  document.getElementById('successMsg').style.display = 'block';
  setTimeout(function () {
    document.getElementById('eq-name').value = '';
    document.getElementById('eq-phone').value = '';
    document.getElementById('eq-email').value = '';
    document.getElementById('eq-type').value = '';
    document.getElementById('eq-msg').value = '';
  }, 600);
}

// Safe modal overlay click-to-close (guard prevents crash if modal missing)
var _modal = document.getElementById('enquiryModal');
if (_modal) {
  _modal.addEventListener('click', function (e) {
    if (e.target === this) closeModal();
  });
}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && document.getElementById('enquiryModal')) closeModal();
});

// ===== HERO SLIDER =====
(function () {
  var slides = document.querySelectorAll('.slide');
  var dots = document.querySelectorAll('.sdot');
  if (!slides.length) return;
  var cur = 0;
  var total = slides.length;
  var timer;

  function goTo(n) {
    slides[cur].classList.remove('active');
    if (dots[cur]) dots[cur].classList.remove('active');
    cur = (n + total) % total;
    slides[cur].classList.add('active');
    if (dots[cur]) dots[cur].classList.add('active');
  }

  function startAuto() {
    timer = setInterval(function () { goTo(cur + 1); }, 5000);
  }

  function stopAuto() { clearInterval(timer); }

  startAuto();

  var slider = document.getElementById('heroSlider');
  if (slider) {
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);
  }

  window.sliderMove = function (dir) { stopAuto(); goTo(cur + dir); startAuto(); };
  window.sliderGo = function (n) { stopAuto(); goTo(n); startAuto(); };
})();

// ===== SCROLL REVEAL (GitHub Pages safe) =====
(function () {
  var sel = '.reveal,.reveal-left,.reveal-right,.reveal-scale';
  var els = document.querySelectorAll(sel);
  if (!els.length) return;

  function show(el) { el.classList.add('visible'); }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.01, rootMargin: '0px 0px -10px 0px' });

    els.forEach(function (el) {
      // If already in viewport right now — show immediately
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) { show(el); }
      else { io.observe(el); }
    });
  } else {
    // No IntersectionObserver support — show everything
    els.forEach(show);
  }

  // Safety net: after 800ms force ALL remaining hidden reveals visible
  // (covers timing edge cases on GitHub Pages / slow connections)
  setTimeout(function () {
    document.querySelectorAll(sel).forEach(show);
  }, 800);
})();

// ===== PRODUCT DATA =====
var products = {
  pharma: [
    // ── MANDRIC BIOCARE PAEDIATRIC RANGE ──
    { name: 'Becodric', comp: 'Bacillus clausii Spores 2 Billion/5ml', cat: 'Digestive', form: 'Syrup', ico: '&#129514;', img: 'becodric.png' },
    { name: 'Calidric-P', comp: 'Calcium Carbonate + Paracetamol Suspension', cat: 'Calcium', form: 'Syrup', ico: '&#129386;', img: 'calidric-p.jpg' },
    { name: 'Ledric-M', comp: 'Levocetirizine 2.5mg + Montelukast 4mg/5ml', cat: 'Antiallergic', form: 'Syrup', ico: '&#127798;', img: 'ledric-m.jpg' },
    { name: 'Dricmol 250', comp: 'Paracetamol 250mg/5ml', cat: 'Analgesic', form: 'Syrup', ico: '&#127909;', img: 'dricmol-250.jpg' },
    { name: 'Dricmol MF', comp: 'Paracetamol 325mg + Mefenamic Acid 50mg/5ml', cat: 'Analgesic', form: 'Syrup', ico: '&#127909;', img: 'dricmol-mf.jpg' },
    { name: 'Ofdric-MS', comp: 'Ofloxacin 50mg + Metronidazole 120mg/5ml', cat: 'Antibiotic', form: 'Syrup', ico: '&#128138;', img: 'ofdric-ms.jpg' },
    { name: 'Racedric', comp: 'Racecadotril 15mg Granules', cat: 'Digestive', form: 'Sachet', ico: '&#129514;', img: 'racedric.jpg' },
    { name: 'Nutridric Syp', comp: 'Multivitamin + Multimineral + Lysine Syrup', cat: 'Nutrition', form: 'Syrup', ico: '&#11088;', img: 'nutridric-syp.jpg' },
    { name: 'Dricfer XP', comp: 'Ferrous Ascorbate 30mg + Folic Acid 0.5mg + Zinc', cat: 'Iron', form: 'Syrup', ico: '&#129386;', img: 'dricfer-xp.jpg' },
    { name: 'Dricped 50', comp: 'Ibuprofen 50mg/5ml Paediatric Suspension', cat: 'Analgesic', form: 'Syrup', ico: '&#128138;', img: 'dricped-50.jpg' },
    { name: 'Dricped 100', comp: 'Ibuprofen 100mg/5ml Paediatric Suspension', cat: 'Analgesic', form: 'Syrup', ico: '&#128138;', img: 'dricped-100.jpg' },
    { name: 'Clevdric Syp', comp: 'Levosalbutamol + Ambroxol + Guaifenesin Syrup', cat: 'Respiratory', form: 'Syrup', ico: '&#127798;', img: 'clevdric-syp.jpg' },
    { name: 'Ovodric', comp: 'Multivitamin + DHA + Amino Acid Nutritional Syrup', cat: 'Nutrition', form: 'Syrup', ico: '&#129371;', img: 'ovodric.jpg' },
    // ── MANDRIC BIOCARE GENERAL RANGE ──
    { name: 'Chymodric Forte', comp: 'Chymotrypsin 1,00,000 IU + Trypsin 48,000 IU', cat: 'Enzyme', form: 'Tablet', ico: '&#129657;', img: 'chymodric-forte.jpg' },
    { name: 'Nutridric Cap', comp: 'Multivitamin + Multimineral + Antioxidant', cat: 'Nutrition', form: 'Capsule', ico: '&#11088;', img: 'nutridric-cap.jpg' },
    { name: 'Nutridric SF', comp: 'Multivitamin + Multimineral Sugar-Free', cat: 'Nutrition', form: 'Syrup', ico: '&#11088;', img: 'nutridric-sf.jpg' },
    { name: 'Rabidric 40 DSR', comp: 'Rabeprazole 40mg + Domperidone 30mg SR', cat: 'Gastro', form: 'Capsule', ico: '&#129531;', img: 'rabidric-40-dsr.jpg' },
    { name: 'Clevodric 625', comp: 'Amoxicillin 500mg + Clavulanic Acid 125mg', cat: 'Antibiotic', form: 'Tablet', ico: '&#128138;', img: 'clevodric-625.jpg' },
    { name: 'Maxidric Cap', comp: 'Multivitamin + Ginseng + Antioxidant Complex', cat: 'Nutrition', form: 'Capsule', ico: '&#127752;', img: 'maxidric-cap.jpg' },
    { name: 'Cefodric Inj', comp: 'Cefoperazone 1g Sterile Injection', cat: 'Antibiotic', form: 'Vial', ico: '&#128137;', img: 'cefodric-inj.jpg' },
    { name: 'Cefodric SB', comp: 'Cefoperazone 1g + Sulbactam 500mg Injection', cat: 'Antibiotic', form: 'Vial', ico: '&#128137;', img: 'cefodric-sb.jpg' },
    { name: 'Pandric Inj', comp: 'Pantoprazole 40mg IV Injection', cat: 'Gastro', form: 'Vial', ico: '&#128137;', img: 'pandric-inj.jpg' },
    { name: 'Fybodric Tab', comp: 'Isabgol Husk + Lactulose + Senna', cat: 'Digestive', form: 'Tablet', ico: '&#129514;', img: 'fybodric-tab.jpg' },
    { name: 'Fybodric Powder', comp: 'Psyllium Husk 3.5g + Isabgol Powder', cat: 'Digestive', form: 'Powder', ico: '&#129514;', img: 'fybodric-powder.jpg' },
    { name: 'Hepadric', comp: 'Silymarin 140mg + Artichoke + Liver Tonic Extract', cat: 'Liver', form: 'Capsule', ico: '&#127807;', img: 'hepadric.jpg' },
    { name: 'Stomodric', comp: 'Pantoprazole 40mg + Levosulpiride 75mg', cat: 'Gastro', form: 'Capsule', ico: '&#129531;', img: 'stomodric.jpg' },
    { name: 'Nimodric SP', comp: 'Nimesulide 100mg + Serratiopeptidase 15mg', cat: 'Analgesic', form: 'Tablet', ico: '&#128138;', img: 'nimodric-sp.jpg' }
  ],

  ayurvedic: [
    { name: 'Ashwagandha Churna', comp: 'Withania somnifera root powder', cat: 'Immunity', form: 'Powder', ico: '&#127807;' },
    { name: 'Triphala Churna', comp: 'Amalaki, Bibhitaki, Haritaki', cat: 'Digestive', form: 'Powder', ico: '&#127807;' },
    { name: 'Chyawanprash', comp: 'Amalaki + 40 herbs blend', cat: 'Immunity', form: 'Jam', ico: '&#127803;' },
    { name: 'Brahmi Capsules', comp: 'Bacopa monnieri extract 300mg', cat: 'Immunity', form: 'Capsule', ico: '&#127807;' },
    { name: 'Shatavari Granules', comp: 'Asparagus racemosus extract', cat: 'Womens Health', form: 'Granules', ico: '&#127804;' },
    { name: 'Hingwastak Churna', comp: 'Asafoetida + 7 herbs', cat: 'Digestive', form: 'Powder', ico: '&#127807;' },
    { name: 'Liver Care Tablet', comp: 'Himsra + Kasani + Punarnava', cat: 'Liver', form: 'Tablet', ico: '&#127807;' },
    { name: 'Neem Capsules', comp: 'Azadirachta indica leaf 500mg', cat: 'Skin', form: 'Capsule', ico: '&#127807;' },
    { name: 'Turmeric Capsules', comp: 'Curcuma longa standardized 95%', cat: 'Immunity', form: 'Capsule', ico: '&#129000;' },
    { name: 'Giloy Juice', comp: 'Tinospora cordifolia stem', cat: 'Immunity', form: 'Juice', ico: '&#127807;' },
    { name: 'Aloe Vera Juice', comp: 'Aloe barbadensis leaf 99%', cat: 'Digestive', form: 'Juice', ico: '&#127807;' },
    { name: 'Amla Juice', comp: 'Phyllanthus emblica fresh juice', cat: 'Immunity', form: 'Juice', ico: '&#127807;' },
    { name: 'Chandraprabha Vati', comp: 'Multi-herb Ayurvedic formulation', cat: 'Womens Health', form: 'Tablet', ico: '&#127807;' },
    { name: 'Mahanarayan Oil', comp: 'Narayana + sesame oil base', cat: 'Joints', form: 'Oil', ico: '&#129405;' },
    { name: 'Neem Tulsi Face Wash', comp: 'Neem + Tulsi + Aloe extracts', cat: 'Skin', form: 'Face Wash', ico: '&#129340;' },
    { name: 'Punarnavadi Mandur', comp: 'Punarnava + iron complex', cat: 'Liver', form: 'Tablet', ico: '&#127807;' },
    { name: 'Shilajit Capsules', comp: 'Purified Shilajit 500mg', cat: 'Immunity', form: 'Capsule', ico: '&#11035;' },
    { name: 'Kanchanar Guggulu', comp: 'Kanchanar bark + Guggulu resin', cat: 'Joints', form: 'Tablet', ico: '&#127807;' }
  ],
  nutraceutical: [
    { name: 'Vitamin C 500mg', comp: 'Ascorbic Acid', cat: 'Vitamins', form: 'Tablet', ico: '&#127818;' },
    { name: 'Vitamin D3 60000 IU', comp: 'Cholecalciferol', cat: 'Vitamins', form: 'Sachet', ico: '&#9728;&#65039;' },
    { name: 'Vitamin B12 1500mcg', comp: 'Methylcobalamin', cat: 'Vitamins', form: 'Tablet', ico: '&#128138;' },
    { name: 'Multivitamin + Minerals', comp: '12 Vitamins + 9 Minerals blend', cat: 'Vitamins', form: 'Tablet', ico: '&#127752;' },
    { name: 'Biotin 10000mcg', comp: 'D-Biotin', cat: 'Vitamins', form: 'Tablet', ico: '&#128138;' },
    { name: 'Zinc 50mg', comp: 'Zinc Sulphate Monohydrate', cat: 'Minerals', form: 'Tablet', ico: '&#128309;' },
    { name: 'Magnesium 250mg', comp: 'Magnesium Oxide', cat: 'Minerals', form: 'Tablet', ico: '&#9898;' },
    { name: 'Iron + Folic Acid', comp: 'Ferrous Sulphate + Folic Acid', cat: 'Minerals', form: 'Tablet', ico: '&#128308;' },
    { name: 'Selenium 200mcg', comp: 'Selenium Methionine', cat: 'Minerals', form: 'Tablet', ico: '&#128138;' },
    { name: 'Calcium + Mag + D3', comp: 'Triple Bone Support Complex', cat: 'Bone Health', form: 'Tablet', ico: '&#129460;' },
    { name: 'Glucosamine + Chondroitin', comp: 'Joint Support Complex', cat: 'Bone Health', form: 'Tablet', ico: '&#129460;' },
    { name: 'Collagen Peptides', comp: 'Hydrolysed Marine Collagen 10g', cat: 'Bone Health', form: 'Powder', ico: '&#10024;' },
    { name: 'Whey Protein Powder', comp: 'Whey Protein Concentrate 80%', cat: 'Protein', form: 'Powder', ico: '&#129371;' },
    { name: 'Plant Protein Blend', comp: 'Pea + Rice + Hemp protein', cat: 'Protein', form: 'Powder', ico: '&#127807;' },
    { name: 'Omega-3 Fish Oil', comp: 'EPA 180mg + DHA 120mg per cap', cat: 'Immunity', form: 'Softgel', ico: '&#128031;' },
    { name: 'Probiotic + Prebiotic', comp: '10 Billion CFU multi-strain', cat: 'Immunity', form: 'Sachet', ico: '&#129440;' },
    { name: 'Elderberry + Vit C + Zinc', comp: 'Immunity Support Complex', cat: 'Immunity', form: 'Tablet', ico: '&#129359;' },
    { name: 'Spirulina 500mg', comp: 'Arthrospira platensis dried', cat: 'Immunity', form: 'Tablet', ico: '&#127796;' },
    { name: 'CoQ10 100mg', comp: 'Coenzyme Q10 (Ubiquinone)', cat: 'Antioxidant', form: 'Softgel', ico: '&#128155;' },
    { name: 'Alpha Lipoic Acid 300mg', comp: 'R-Alpha Lipoic Acid', cat: 'Antioxidant', form: 'Capsule', ico: '&#128998;' },
    { name: 'Lycopene + Selenium', comp: 'Lycopene 8% + Selenium 200mcg', cat: 'Antioxidant', form: 'Tablet', ico: '&#127813;' }
  ],
  surgical: [
    // ── MANDRIC BIOCARE BRANDED SURGICAL / PHARMA RANGE ──
    { name: 'Chymodric Forte', comp: 'Chymotrypsin 1,00,000 IU + Trypsin 48,000 IU', cat: 'Enzyme', form: 'Tablet', ico: '&#129657;', img: 'chymodric-forte.jpg' },
    { name: 'Nutridric Cap', comp: 'Multivitamin + Multimineral + Antioxidant', cat: 'Nutrition', form: 'Capsule', ico: '&#11088;', img: 'nutridric-cap.jpg' },
    { name: 'Nutridric Syp', comp: 'Multivitamin + Multimineral + Lysine Syrup', cat: 'Nutrition', form: 'Syrup', ico: '&#11088;', img: 'nutridric-syp.jpg' },
    { name: 'Nutridric SF', comp: 'Multivitamin + Multimineral Sugar-Free Syrup', cat: 'Nutrition', form: 'Syrup', ico: '&#11088;', img: 'nutridric-sf.jpg' },
    { name: 'Rabidric 40 DSR', comp: 'Rabeprazole 40mg + Domperidone 30mg SR', cat: 'Gastro', form: 'Capsule', ico: '&#129531;', img: 'rabidric-40-dsr.jpg' },
    { name: 'Clevodric 625', comp: 'Amoxicillin 500mg + Clavulanic Acid 125mg', cat: 'Antibiotic', form: 'Tablet', ico: '&#128138;', img: 'clevodric-625.jpg' },
    { name: 'Maxidric Cap', comp: 'Multivitamin + Ginseng + Antioxidant Complex', cat: 'Nutrition', form: 'Capsule', ico: '&#127752;', img: 'maxidric-cap.jpg' },
    { name: 'Cefodric Inj', comp: 'Cefoperazone 1g Sterile Injection', cat: 'Injection', form: 'Vial', ico: '&#128137;', img: 'cefodric-inj.jpg' },
    { name: 'Cefodric SB', comp: 'Cefoperazone 1g + Sulbactam 500mg Injection', cat: 'Injection', form: 'Vial', ico: '&#128137;', img: 'cefodric-sb.jpg' },
    { name: 'Pandric Inj', comp: 'Pantoprazole 40mg IV Injection', cat: 'Injection', form: 'Vial', ico: '&#128137;', img: 'pandric-inj.jpg' },
    { name: 'Fybodric Tab', comp: 'Isabgol Husk + Lactulose + Senna', cat: 'Digestive', form: 'Tablet', ico: '&#129514;', img: 'fybodric-tab.jpg' },
    { name: 'Fybodric Powder', comp: 'Psyllium Husk 3.5g + Isabgol Powder', cat: 'Digestive', form: 'Powder', ico: '&#129514;', img: 'fybodric-powder.jpg' },
    { name: 'Hepadric', comp: 'Silymarin 140mg + Artichoke + Liver Tonic Extract', cat: 'Liver', form: 'Capsule', ico: '&#127807;', img: 'hepadric.jpg' },
    { name: 'Stomodric', comp: 'Pantoprazole 40mg + Levosulpiride 75mg', cat: 'Gastro', form: 'Capsule', ico: '&#129531;', img: 'stomodric.jpg' },
    { name: 'Nimodric SP', comp: 'Nimesulide 100mg + Serratiopeptidase 15mg', cat: 'Anti-inflamatory', form: 'Tablet', ico: '&#128138;', img: 'nimodric-sp.jpg' }
  ],

  paediatric: [
    // ── MANDRIC BIOCARE BRANDED PAEDIATRIC RANGE ──
    { name: 'Bacodric', comp: 'Bacillus clausii Spores 2 Billion/5ml', cat: 'Digestive', form: 'Syrup', ico: '&#129514;', img: 'bacodric.jpg' },
    { name: 'Calidric-P', comp: 'Calcium Carbonate + Paracetamol Suspension', cat: 'Iron & Calcium', form: 'Syrup', ico: '&#129386;', img: 'calidric-p.jpg' },
    { name: 'Ledric-M', comp: 'Levocetirizine 2.5mg + Montelukast 4mg/5ml', cat: 'Cough & Cold', form: 'Syrup', ico: '&#127798;', img: 'ledric-m.jpg' },
    { name: 'Dricmol 250', comp: 'Paracetamol 250mg/5ml', cat: 'Cough & Cold', form: 'Syrup', ico: '&#127909;', img: 'dricmol-250.jpg' },
    { name: 'Dricmol MF', comp: 'Paracetamol 325mg + Mefenamic Acid 50mg/5ml', cat: 'Cough & Cold', form: 'Syrup', ico: '&#127909;', img: 'dricmol-mf.jpg' },
    { name: 'Ofdric-MS', comp: 'Ofloxacin 50mg + Metronidazole 120mg/5ml', cat: 'Antibiotic', form: 'Syrup', ico: '&#128138;', img: 'ofdric-ms.jpg' },
    { name: 'Racedric', comp: 'Racecadotril 15mg Granules', cat: 'Digestive', form: 'Sachet', ico: '&#129514;', img: 'racedric.jpg' },
    { name: 'Nutridric Syp', comp: 'Multivitamin + Multimineral + Lysine Syrup', cat: 'Nutrition', form: 'Syrup', ico: '&#11088;', img: 'nutridric-syp.jpg' },
    { name: 'Dricfer XP', comp: 'Ferrous Ascorbate 30mg + Folic Acid 0.5mg + Zinc', cat: 'Iron & Calcium', form: 'Syrup', ico: '&#129386;', img: 'dricfer-xp.jpg' },
    { name: 'Dricped 50', comp: 'Ibuprofen 50mg/5ml Paediatric Suspension', cat: 'Cough & Cold', form: 'Syrup', ico: '&#128138;', img: 'dricped-50.jpg' },
    { name: 'Dricped 100', comp: 'Ibuprofen 100mg/5ml Paediatric Suspension', cat: 'Cough & Cold', form: 'Syrup', ico: '&#128138;', img: 'dricped-100.jpg' },
    { name: 'Clevdric Syp', comp: 'Levosalbutamol + Ambroxol + Guaifenesin Syrup', cat: 'Cough & Cold', form: 'Syrup', ico: '&#127798;', img: 'clevdric-syp.jpg' },
    { name: 'Ovodric', comp: 'Multivitamin + DHA + Amino Acid Nutritional Syrup', cat: 'Nutrition', form: 'Syrup', ico: '&#129371;', img: 'ovodric.jpg' }
  ],
  ortho: [
    // ── MANDRIC BIOCARE BRANDED ORTHO RANGE ──
    { name: 'Chymodric Forte', comp: 'Chymotrypsin 1,00,000 IU + Trypsin 48,000 IU', cat: 'Enzyme', form: 'Tablet', ico: '&#129657;', img: 'chymodric-forte.jpg' },
    { name: 'Nutridric Cap', comp: 'Multivitamin + Multimineral + Antioxidant', cat: 'Nutrition', form: 'Capsule', ico: '&#11088;', img: 'nutridric-cap.jpg' },
    { name: 'Nutridric Syp', comp: 'Multivitamin + Multimineral + Lysine Syrup', cat: 'Nutrition', form: 'Syrup', ico: '&#11088;', img: 'nutridric-syp.jpg' },
    { name: 'Nutridric SF', comp: 'Multivitamin + Multimineral Sugar-Free', cat: 'Nutrition', form: 'Syrup', ico: '&#11088;', img: 'nutridric-sf.jpg' },
    { name: 'Rabidric 40 DSR', comp: 'Rabeprazole 40mg + Domperidone 30mg SR', cat: 'Gastro', form: 'Capsule', ico: '&#129531;', img: 'rabidric-40-dsr.jpg' },
    { name: 'Clevodric 625', comp: 'Amoxicillin 500mg + Clavulanic Acid 125mg', cat: 'Antibiotic', form: 'Tablet', ico: '&#128138;', img: 'clevodric-625.jpg' },
    { name: 'Maxidric Cap', comp: 'Multivitamin + Ginseng + Antioxidant Complex', cat: 'Nutrition', form: 'Capsule', ico: '&#127752;', img: 'maxidric-cap.jpg' },
    { name: 'Cefodric Inj', comp: 'Cefoperazone 1g Sterile Injection', cat: 'Injection', form: 'Vial', ico: '&#128137;', img: 'cefodric-inj.jpg' },
    { name: 'Cefodric SB', comp: 'Cefoperazone 1g + Sulbactam 500mg Injection', cat: 'Injection', form: 'Vial', ico: '&#128137;', img: 'cefodric-sb.jpg' },
    { name: 'Nimodric SP', comp: 'Nimesulide 100mg + Serratiopeptidase 15mg', cat: 'Anti-inflammatory', form: 'Tablet', ico: '&#128138;', img: 'nimodric-sp.jpg' },
    { name: 'Pandric Inj', comp: 'Pantoprazole 40mg IV Injection', cat: 'Injection', form: 'Vial', ico: '&#128137;', img: 'pandric-inj.jpg' }
  ]
};

var activeCat = { pharma: 'All', ayurvedic: 'All', nutraceutical: 'All', paediatric: 'All', surgical: 'All', ortho: 'All' };
var activeSearch = { pharma: '', ayurvedic: '', nutraceutical: '', paediatric: '', surgical: '', ortho: '' };
var _lastFiltered = [];

function renderProducts(seg) {
  var grid = document.getElementById(seg + '-grid');
  if (!grid) return;
  var empty = document.getElementById(seg + '-empty');
  var count = document.getElementById(seg + '-count');
  var cat = activeCat[seg];
  var term = activeSearch[seg].toLowerCase();
  var filtered = (products[seg] || []).filter(function (p) {
    var mc = cat === 'All' || p.cat === cat;
    var mt = !term || p.name.toLowerCase().includes(term) || p.comp.toLowerCase().includes(term) || p.cat.toLowerCase().includes(term) || p.form.toLowerCase().includes(term);
    return mc && mt;
  });
  _lastFiltered = filtered;
  count.textContent = 'Showing ' + filtered.length + ' product' + (filtered.length !== 1 ? 's' : '');
  if (!filtered.length) { grid.innerHTML = ''; empty.classList.remove('hidden'); return; }
  empty.classList.add('hidden');
  grid.innerHTML = filtered.map(function (p, i) {
    // Card top: real photo if img set, else emoji fallback
    var topHtml = p.img
      ? '<div class="prod-card-top prod-card-photo"><img src="' + p.img + '" alt="' + p.name + '" loading="lazy"></div>'
      : '<div class="prod-card-top">' + p.ico + '</div>';
    return '<div class="prod-card" onclick="openProductModal(' + i + ')" style="cursor:pointer;">'
      + topHtml
      + '<div class="prod-body">'
      + '<div class="prod-name">' + p.name + '</div>'
      + '<div class="prod-comp">' + p.comp + '</div>'
      + '<div class="prod-tags"><span class="prod-tag">' + p.cat + '</span><span class="prod-tag green">' + p.form + '</span></div>'
      + '<button class="prod-enquire">Enquire Now &#8594;</button>'
      + '</div></div>';
  }).join('');
}

function openProductModal(i) {
  var p = _lastFiltered[i];
  if (!p) return;
  openModal(p.name, p.comp, p.cat, p.form, p.ico, p.img);
}

function filterProducts(seg, val) {
  activeSearch[seg] = val;
  renderProducts(seg);
}

function setCat(seg, cat, el) {
  activeCat[seg] = cat;
  var tags = el.closest('.filter-group').querySelectorAll('.filter-tag');
  tags.forEach(function (t) { t.classList.remove('active'); });
  el.classList.add('active');
  renderProducts(seg);
}

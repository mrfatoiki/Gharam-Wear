const PRODUITS = [
  {
    id: 1, genre: "homme", categorie: "T-shirts",
    nom: "Polo en Maille",
    prix: 250, prixAncien: null,
    image: "1.jpeg",
    nouveau: true,
    description: "T-shirt en lin naturel, coupe droite décontractée. Respirant et durable, parfait pour l'été.",
    tailles: ["S","M","L","XL"]
  },
  {
    id: 2, genre: "homme", categorie: "Vestes",
    nom: "Blazer Gharam",
    prix: 500, prixAncien: 700,
    image: "veste.jpg",
    nouveau: false,
    description: "Le Blazer Gharam, une veste noire zippée au design minimaliste et urbain, alliant parfaitement élégance et décontraction.",
    tailles: ["S","M","L","XL"]
  },
  {
    id: 3, genre: "homme", categorie: "Pantalons",
    nom: "Pantalon Droit",
    prix: 300, prixAncien: null,
    image: "pantalon.jpg",
    nouveau: true,
    description: "Adoptez l'élégance intemporelle avec notre nouveau Pantalon Droit noir texturé, une pièce à la coupe classique parfaite pour structurer vos tenues avec un style chic et affirmé.",
    tailles: ["S","M","L","XL"]
  },
  {
    id: 4, genre: "homme", categorie: "T-shirts",
    nom: "T-shirt Gharam",
    prix: 200, prixAncien: 270,
    image: "t-shirt.jpg",
    nouveau: false,
    description: "Misez sur l'incontournable avec le T-shirt Gharam blanc, un basique finement texturé et épuré, idéal pour compléter vos tenues du quotidien en toute simplicité.",
    tailles: ["S","M","L","XL"]
  },
  {
    id: 5, genre: "homme", categorie: "Accessoires",
    nom: "Lunette Gharam",
    prix: 170, prixAncien: null,
    image: "lunette.jpg",
    nouveau: false,
    description: "Complétez votre look avec les Lunettes Gharam, un accessoire rétro-chic aux verres rectangulaires sans monture et détails dorés pour une allure résolument tendance.",
    tailles: ["Unique"]
  },
  {
    id: 6, genre: "homme", categorie: "Vestes",
    nom: "Veste en Velours Fourrée",
    prix: 600, prixAncien: 800,
    image: "vestee.jpg",
    nouveau: true,
    description: "Veste en Velours Fourrée. Pratique et stylée pour toutes les saisons.",
    tailles: ["S","M","L","XL"]
  },

  {
    id: 7, genre: "femme", categorie: "Robes",
    nom: "Robe Gharam",
    prix: 800, prixAncien: null,
    image: "robemuse.jpg",
    nouveau: true,
    description: "Robe midi en crêpe fluide. Décolleté V, manches papillon, silhouette poétique.",
    tailles: ["S","M","L","XL"]
  },
  {
    id: 8, genre: "femme", categorie: "Hauts",
    nom: "Chemise Corset",
    prix: 270, prixAncien: 350,
    image: "Blouse.jpg",
    nouveau: false,
    description: "Blouse en satin de viscose. Légère et lumineuse, drapé naturel.",
    tailles: ["S","M","L","XL"]
  },
  {
    id: 9, genre: "femme", categorie: "Pantalons",
    nom: "Pantalon Palazzo",
    prix: 300, prixAncien: null,
    image: "leg.jpg",
    nouveau: false,
    description: "Pantalon large en crêpe épais. Taille haute élastiquée, tombée parfaite.",
    tailles: ["S","M","L","XL"]
  },
  {
    id: 10, genre: "femme", categorie: "Robes",
    nom: "Robe Sirène",
    prix: 900, prixAncien: 1200,
    image: "robe.jpg",
    nouveau: true,
    description: "Robe longue velours bordeaux. Dos nu, fente côté, pour les soirées mémorables.",
    tailles: ["S","M","L","XL"]
  },
  {
    id: 11, genre: "femme", categorie: "Manteaux",
    nom: "Mini-Trench Ceinturé Noir",
    prix: 1200, prixAncien: null,
    image: "manteau.jpg",
    nouveau: false,
    description: "Grand manteau oversize en laine camel. Doublure soie, boutons dorés, coupe sculptée.",
    tailles: ["S","M","L","XL"]
  },
  {
    id: 12, genre: "femme", categorie: "Accessoires",
    nom: "Sac Cabas",
    prix: 500, prixAncien: 650,
    image: "sac.jpg",
    nouveau: true,
    description: "Sac en cuir végan structuré. Anse courte et longue bandoulière amovible.",
    tailles: ["Unique"]
  },
];

let panier = [];
let produitActuel = null;

/**
 * Affiche la section dont l'id est passé en paramètre
 * et masque toutes les autres. Met aussi à jour le menu.
 * @param {string} sectionId - L'id de la section cible
 */
function afficherSection(sectionId) {

  document.querySelectorAll('.page-section').forEach(sec => {
    sec.classList.remove('active');
  });

  const cible = document.getElementById(sectionId);
  if (cible) {
    cible.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelectorAll('[data-nav]').forEach(lien => {
    lien.classList.toggle('active', lien.dataset.nav === sectionId);
  });

  fermerMenuMobile();
}

document.querySelectorAll('[data-nav]').forEach(lien => {
  lien.addEventListener('click', (e) => {
    e.preventDefault();
    afficherSection(lien.dataset.nav);
  });
});


const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const ouvert = mobileMenu.classList.toggle('visible');
  hamburger.classList.toggle('ouvert', ouvert);
  hamburger.setAttribute('aria-expanded', ouvert);
});

function fermerMenuMobile() {
  mobileMenu.classList.remove('visible');
  hamburger.classList.remove('ouvert');
}

document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    fermerMenuMobile();
  }
});

const nouveautes = PRODUITS.filter(p => p.nouveau);
let indexCarrousel = 0;

function initialiserCarrousel() {
  const piste = document.getElementById('carrousel-piste');
  const dotsC = document.getElementById('dots-carrousel');
  if (!piste || !dotsC) return;

  /* Compter les cartes HTML existantes */
  const cartes = piste.querySelectorAll('.carte-nouveaute');
  dotsC.innerHTML = '';

  cartes.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => allerCarrousel(i));
    dotsC.appendChild(dot);
  });
}

/**
 * Déplace le carrousel vers l'index demandé
 * @param {number} index
 */
function allerCarrousel(index) {
  const piste     = document.getElementById('carrousel-piste');
  const cartes    = piste.querySelectorAll('.carte-nouveaute');
  const dots      = document.querySelectorAll('.dot');
  const visibles  = calculerCartesVisibles();

  const max = Math.max(0, cartes.length - visibles);
  indexCarrousel = Math.max(0, Math.min(index, max));

  if (cartes.length > 0) {
    const largeurCarte = cartes[0].offsetWidth + 24;
    piste.style.transform = `translateX(-${indexCarrousel * largeurCarte}px)`;
  }

  dots.forEach((d, i) => d.classList.toggle('active', i === indexCarrousel));
}

function calculerCartesVisibles() {
  const w = window.innerWidth;
  if (w < 480) return 1;
  if (w < 768) return 2;
  if (w < 1024) return 3;
  return 4;
}

document.getElementById('btn-prev')?.addEventListener('click', () => {
  allerCarrousel(indexCarrousel - 1);
});
document.getElementById('btn-next')?.addEventListener('click', () => {
  allerCarrousel(indexCarrousel + 1);
});

window.addEventListener('resize', () => allerCarrousel(indexCarrousel));

/**
 * Génère la grille de produits dans un conteneur
 * @param {string} conteneurId - Id de la div grille
 * @param {string} genre       - "homme" ou "femme"
 */
function genererGrille(conteneurId, genre) {
  const conteneur = document.getElementById(conteneurId);
  if (!conteneur) return;

  const produits = PRODUITS.filter(p => p.genre === genre);
  conteneur.innerHTML = '';

  produits.forEach(p => {
    const carte = document.createElement('div');
    carte.className = 'carte-produit';
    carte.dataset.categorie = p.categorie;
    carte.dataset.prix      = p.prix;

    const badgeHTML = p.nouveau ? '<span class="badge-nouveaute">Nouveau</span>' : '';
    const prixAncHTML = p.prixAncien ? `<span class="prix-ancien">${p.prixAncien} MAD</span>` : '';
    const imgContenu = (p.image && p.image !== "images/placeholder.jpg")
      ? `<img src="${p.image}" alt="${p.nom}" style="width:100%;height:100%;object-fit:cover;">`
      : `<div class="emoji-produit">${p.emoji}</div>`;

    carte.innerHTML = `
      <div class="img-produit">
        ${badgeHTML}
        ${imgContenu}
      </div>
      <div class="infos">
        <span class="categorie">${p.categorie}</span>
        <h4>${p.nom}</h4>
        <div class="prix-ligne">
          <span class="prix-actuel">${p.prix} MAD</span>
          ${prixAncHTML}
        </div>
        <button class="btn-voir">Voir détail</button>
      </div>
    `;
    carte.querySelector('.btn-voir').addEventListener('click', (e) => {
      e.stopPropagation();
      ouvrirDetail(p.id);
    });
    carte.addEventListener('click', () => ouvrirDetail(p.id));

    conteneur.appendChild(carte);
  });
}

/**
 * Applique les filtres (catégorie et tri) à la grille donnée
 * @param {string} genre - "homme" ou "femme"
 */
function appliquerFiltres(genre) {
  const grille      = document.getElementById(`grille-${genre}`);
  const btnsFiltres = document.querySelectorAll(`#boutique-${genre} .btn-filtre`);
  const selectTri   = document.getElementById(`tri-${genre}`);

  let categorieActive = 'Tous';
  btnsFiltres.forEach(btn => {
    if (btn.classList.contains('actif')) categorieActive = btn.dataset.cat;
  });

  const tri = selectTri ? selectTri.value : 'defaut';

  let cartes = Array.from(grille.querySelectorAll('.carte-produit'));

  cartes.forEach(carte => {
    const visible = categorieActive === 'Tous' || carte.dataset.categorie === categorieActive;
    carte.classList.toggle('cache', !visible);
  });

  const cartesVisibles = cartes.filter(c => !c.classList.contains('cache'));
  if (tri === 'prix-asc') {
    cartesVisibles.sort((a, b) => +a.dataset.prix - +b.dataset.prix);
  } else if (tri === 'prix-desc') {
    cartesVisibles.sort((a, b) => +b.dataset.prix - +a.dataset.prix);
  }
  cartesVisibles.forEach(c => grille.appendChild(c));
}
function initFiltres(genre) {
  const btns = document.querySelectorAll(`#boutique-${genre} .btn-filtre`);
  const selectTri = document.getElementById(`tri-${genre}`);

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('actif'));
      btn.classList.add('actif');
      appliquerFiltres(genre);
    });
  });

  selectTri?.addEventListener('change', () => appliquerFiltres(genre));
}

/**
 * Ouvre la page de détail pour un produit donné
 * @param {number} idProduit
 */
function ouvrirDetail(idProduit) {
  const p = PRODUITS.find(prod => prod.id === idProduit);
  if (!p) return;

  produitActuel = p;
  afficherSection('detail-produit');

  const imgEl = document.querySelector('#detail-produit-inner .detail-image img');
  if (imgEl) {
    imgEl.src = p.image || '';
    imgEl.alt = p.nom;
  }
  document.getElementById('detail-nom').textContent    = p.nom;
  document.getElementById('detail-prix').textContent   = `${p.prix} MAD`;
  document.getElementById('detail-desc').textContent   = p.description;
  document.getElementById('detail-cat').textContent    = p.categorie;
  document.getElementById('detail-genre-tag').textContent = p.genre === 'homme' ? 'Homme' : 'Femme';

  const genre = p.genre === 'homme' ? 'Boutique Homme' : 'Boutique Femme';
  document.getElementById('detail-breadcrumb').innerHTML =
    `<a href="#" data-nav="${p.genre==='homme'?'boutique-homme':'boutique-femme'}">${genre}</a> › ${p.nom}`;

  document.querySelectorAll('#detail-breadcrumb [data-nav]').forEach(lien => {
    lien.addEventListener('click', (e) => {
      e.preventDefault();
      afficherSection(lien.dataset.nav);
    });
  });

  const selTaille = document.getElementById('taille-select');
  selTaille.innerHTML = '<option value="">Choisir une taille</option>';
  p.tailles.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    selTaille.appendChild(opt);
  });
}

document.getElementById('btn-ajouter')?.addEventListener('click', () => {
  if (!produitActuel) return;

  const taille = document.getElementById('taille-select').value;
  if (!taille) {
    document.getElementById('taille-select').style.borderColor = 'var(--or)';
    afficherToast('Taille requise', 'Veuillez choisir une taille avant d\'ajouter.');
    return;
  }

  const existant = panier.find(a => a.produit.id === produitActuel.id && a.taille === taille);
  if (existant) {
    existant.qte++;
  } else {
    panier.push({ produit: produitActuel, taille, qte: 1 });
  }

  mettreAJourBadgePanier();
  afficherToast('Article ajouté !', `${produitActuel.nom} (${taille}) a été ajouté au panier.`);
});

function mettreAJourBadgePanier() {
  const badge = document.getElementById('panier-badge');
  const total = panier.reduce((acc, a) => acc + a.qte, 0);
  badge.textContent = total;
  badge.style.display = total > 0 ? 'flex' : 'none';
}

function rendrePanier() {
  const conteneur   = document.getElementById('contenu-panier');
  const vide        = document.getElementById('panier-vide');
  const tableau     = document.getElementById('tableau-panier');

  if (panier.length === 0) {
    vide.style.display    = 'block';
    tableau.style.display = 'none';
    document.getElementById('panier-total-bloc').style.display = 'none';
    return;
  }

  vide.style.display    = 'none';
  tableau.style.display = 'table';
  document.getElementById('panier-total-bloc').style.display = 'block';

  const corps = document.getElementById('corps-tableau-panier');
  corps.innerHTML = '';

  panier.forEach((article, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="article-panier-info">
          <div class="article-panier-emoji" style="overflow:hidden;">
            <img src="${article.produit.image}" alt="${article.produit.nom}"
                 style="width:100%;height:100%;object-fit:cover;border-radius:6px;">
          </div>
          <div>
            <div class="article-panier-nom">${article.produit.nom}</div>
            <div class="article-panier-taille">Taille : ${article.taille}</div>
          </div>
        </div>
      </td>
      <td>
        <input type="number" class="qte" value="${article.qte}" min="1" max="10"
               data-index="${index}">
      </td>
      <td>${article.produit.prix} MAD</td>
      <td>${(article.produit.prix * article.qte).toFixed(2)} MAD</td>
      <td><button class="btn-suppr" data-index="${index}" title="Supprimer">✕</button></td>
    `;
    corps.appendChild(tr);
  });

  corps.querySelectorAll('.qte').forEach(input => {
    input.addEventListener('input', (e) => {
      const i   = +e.target.dataset.index;
      const val = parseInt(e.target.value, 10);
      if (val > 0 && val <= 10) {
        panier[i].qte = val;
        mettreAJourBadgePanier();
        calculerTotal();
        const cellSousTotal = e.target.closest('tr').cells[3];
        cellSousTotal.textContent = (panier[i].produit.prix * val).toFixed(2) + ' MAD';
      }
    });
  });

  corps.querySelectorAll('.btn-suppr').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const i = +e.target.dataset.index;
      panier.splice(i, 1);
      mettreAJourBadgePanier();
      rendrePanier();
    });
  });

  calculerTotal();
}

function calculerTotal() {
  const sous_total = panier.reduce((acc, a) => acc + a.produit.prix * a.qte, 0);
  const livraison  = sous_total > 600 ? 0 : 55;
  const total      = sous_total + livraison;

  document.getElementById('sous-total').textContent   = sous_total.toFixed(2) + ' MAD';
  document.getElementById('livraison').textContent    = livraison === 0 ? 'Offerte' : livraison + ' MAD';
  document.getElementById('total-final').textContent  = total.toFixed(2) + ' MAD';
}

document.getElementById('panier-icone')?.addEventListener('click', () => {
  rendrePanier();
  afficherSection('panier');
});

let timerToast = null;

/**
 * Affiche une notification toast en bas à droite
 * @param {string} titre   - Titre du toast
 * @param {string} message - Message descriptif
 */
function afficherToast(titre, message) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-titre').textContent = titre;
  document.getElementById('toast-msg').textContent   = message;

  clearTimeout(timerToast);
  toast.classList.remove('visible');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add('visible');
      timerToast = setTimeout(() => toast.classList.remove('visible'), 3500);
    });
  });
}

document.getElementById('form-contact')?.addEventListener('submit', (e) => {
  e.preventDefault(); 

  let valide = true;

  document.querySelectorAll('.erreur-champ').forEach(err => err.classList.remove('visible'));
  document.querySelectorAll('.champ-invalide').forEach(c => c.classList.remove('champ-invalide'));

  const nom = document.getElementById('contact-nom');
  if (!nom.value.trim() || nom.value.trim().length < 2) {
    afficherErreur(nom, 'erreur-nom', 'Veuillez entrer votre nom (2 caractères minimum).');
    valide = false;
  }

  const email = document.getElementById('contact-email');
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(email.value.trim())) {
    afficherErreur(email, 'erreur-email', 'Adresse e-mail invalide. Format attendu : nom@domaine.com');
    valide = false;
  }

  const sujet = document.getElementById('contact-sujet');
  if (!sujet.value) {
    afficherErreur(sujet, 'erreur-sujet', 'Veuillez choisir un sujet.');
    valide = false;
  }

  const message = document.getElementById('contact-message');
  if (!message.value.trim() || message.value.trim().length < 10) {
    afficherErreur(message, 'erreur-message', 'Le message doit contenir au moins 10 caractères.');
    valide = false;
  }

  if (valide) {
    const succes = document.getElementById('succes-contact');
    succes.classList.add('visible');
    e.target.reset(); 
    afficherToast('Message envoyé !', 'Nous vous répondrons dans les 48h.');

    setTimeout(() => succes.classList.remove('visible'), 5000);
  }
});

/**
 * Affiche un message d'erreur sous un champ
 * @param {HTMLElement} champ  - L'élément input/textarea
 * @param {string}      errId  - L'id du span d'erreur
 * @param {string}      texte  - Le message d'erreur
 */
function afficherErreur(champ, errId, texte) {
  champ.classList.add('champ-invalide');
  const errSpan = document.getElementById(errId);
  if (errSpan) {
    errSpan.textContent = texte;
    errSpan.classList.add('visible');
  }
}
['contact-nom','contact-email','contact-sujet','contact-message'].forEach(id => {
  const el = document.getElementById(id);
  el?.addEventListener('input', () => {
    el.classList.remove('champ-invalide');
    const errId = 'erreur-' + id.replace('contact-','');
    document.getElementById(errId)?.classList.remove('visible');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  afficherSection('accueil');
  initFiltres('homme');
  initFiltres('femme');
  initialiserCarrousel();
  genererSoldes();
  initFAQ();
  console.log('✅ Gharam Wear — initialisé avec succès.');
});

function genererSoldes() {
  const grille = document.getElementById('grille-soldes');
  if (!grille) return;

  const promos = PRODUITS.filter(p => p.prixAncien !== null);
  grille.innerHTML = '';

  promos.forEach(p => {
    const pct = Math.round((1 - p.prix / p.prixAncien) * 100);
    const tagGenre = p.genre === 'homme' ? 'tag-h' : 'tag-f';
    const labelGenre = p.genre === 'homme' ? 'Homme' : 'Femme';

    const carte = document.createElement('div');
    carte.className = 'carte-produit';
    carte.dataset.categorie = p.categorie;
    carte.dataset.prix = p.prix;

    const imgSolde = (p.image && p.image !== "images/placeholder.jpg")
      ? `<img src="${p.image}" alt="${p.nom}" style="width:100%;height:100%;object-fit:cover;">`
      : `<div class="emoji-produit">${p.emoji}</div>`;

    carte.innerHTML = `
      <div class="img-produit">
        <span class="badge-nouveaute" style="background:#c0392b;">-${pct}%</span>
        ${imgSolde}
      </div>
      <div class="infos">
        <span class="categorie">
          ${p.categorie} · <span class="tag-genre ${tagGenre}" style="display:inline;padding:0;background:none;font-size:.68rem;">${labelGenre}</span>
        </span>
        <h4>${p.nom}</h4>
        <div class="prix-ligne">
          <span class="prix-actuel">${p.prix} MAD</span>
          <span class="prix-ancien">${p.prixAncien} MAD</span>
        </div>
        <button class="btn-voir">Voir détail</button>
      </div>
    `;

    carte.querySelector('.btn-voir').addEventListener('click', (e) => {
      e.stopPropagation();
      ouvrirDetail(p.id);
    });
    carte.addEventListener('click', () => ouvrirDetail(p.id));
    grille.appendChild(carte);
  });
}

function initFAQ() {
  const catBtns = document.querySelectorAll('.faq-cat');
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('actif'));
      btn.classList.add('actif');

      const cat = btn.dataset.cat;
      document.querySelectorAll('.faq-groupe').forEach(groupe => {
        groupe.style.display = groupe.dataset.cat === cat ? 'block' : 'none';
      });
    });
  });

  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const estOuvert = btn.getAttribute('aria-expanded') === 'true';
      const reponse   = btn.nextElementSibling;

      const groupe = btn.closest('.faq-groupe');
      groupe.querySelectorAll('.faq-question').forEach(q => {
        q.setAttribute('aria-expanded', 'false');
        q.nextElementSibling.classList.remove('ouverte');
      });

      if (!estOuvert) {
        btn.setAttribute('aria-expanded', 'true');
        reponse.classList.add('ouverte');
      }
    });
  });
}

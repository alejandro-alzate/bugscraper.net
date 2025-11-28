// Thanks to https://phrase.com/blog/posts/step-step-guide-javascript-localization/

const translations = {
    "en": {
        "language-name": "English",

        "button-steam-wishlist": "🐛 Wishlist on Steam", // "wishlist" is a verb here, not a noun, as in "please wishlist on Steam"
        "button-steam": "🐛 Steam", 
        "button-itchio": "🏪 itch.io",
        "button-discord": "🎮 Discord", 
        "button-twitter": "🐦 Twitter", 
        "button-bluesky": "🦋 Bluesky", 
        "button-instagram": "📷 Instagram",  
        "button-github": "😺 GitHub", 
        "button-press": "🗞️ Articles",
        "button-press-kit": "📰 Download the press kit",
        "button-email": "✉️ Email",
        "desc-1": "Welcome to the Bugscraper.",
        "desc-2": "<b>Bugscraper</b> is a <b>solo</b> or <b>co-op roguelike shooter</b>. As you climb toward your tyrannical boss's office, you'll battle floor after floor of enemies. Using a wide arsenal of weapons and upgrades, mow them down and aim for the top!",
        "desc-long-1": "🐜 Play as <b>Mio and his friends</b>, in <b>solo</b> or in <b>local co-op</b> with up to 4 players.",
        "desc-long-2": "🐛 Fight through a <b>hundred waves</b> packed with <b>furious enemies</b> and <b>tough bosses</b>.",
        "desc-long-3": "🐝 Gather <b>new weapons</b>, drink up on <b>helpful upgrades</b>, and get ready for battle on the next floor!",
        "desc-long-4": "🐞 <b>Reach the top</b> of the building and settle the score with your boss!",
        "screenshot-title": "Screenshots",
        
        "contact": "Contact:",
        "footer-source": "Source code for this website",
        "banner-author": "Banner art by:",

        "html-title-press": "Bugscraper · Press",
        "press-title": "Press",
        "press-article-list-title": "What people are saying about the game",
        "press-article-list-add-yours": "Want to add yours?",
        "press-article-list-add-yours-email": "Email me!",
    },
    "fr": {
        "language-name": "Français",

        "button-steam-wishlist": "🐛 Wishlistez sur Steam",
        "button-steam": "🐛 Steam",
        "button-itchio": "🏪 itch.io",
        "button-discord": "🎮 Discord", 
        "button-twitter": "🐦 Twitter", 
        "button-bluesky": "🦋 Bluesky", 
        "button-instagram": "📷 Instagram",
        "button-github": "😺 GitHub", 
        "button-press": "🗞️ Articles",
        "button-press-kit": "📰 Téléchargez le kit de presse",
        "button-email": "✉️ Email", 
        "desc-1": "Bienvenue dans le Bugscraper.",
        "desc-2": "<b>Bugscraper</b> est un <b>roguelike shooter solo ou coopératif</b>. En voie vers le bureau de votre patron tyrannique, vous ferez face à des vagues d'ennemis à chaque étage. À l'aide d'une multitude d'armes et une grande diversité d'améliorations, éliminez les et visez le sommet !",
        "desc-long-1": "🐜 Vous incarnerez <b>Mio et ses amis</b>, en <b>solo</b> ou en <b>multijoueur local coopératif</b> avec jusqu'à 4 joueurs.",
        "desc-long-2": "🐛 Faites face à une centaine de vagues <b>d'ennemis agressifs</b> et de <b>tenaces boss</b>.",
        "desc-long-3": "🐝 Récoltez diverses <b>armes</b>, rassasiez vous à l'aide <b>d'améliorations</b>, puis préparez-vous au combat pour l'étage suivant !",
        "desc-long-4": "🐞 <b>Atteignez le haut</b> du gratte-ciel et <b>réglez vos comptes</b> avec votre patron !",
        "screenshot-title": "Captures",
    
        "contact": "Contact :",
        "footer-source": "Code source de ce site web",
        "banner-author": "Illustration bannière par :",
        
        "press-title": "Presse",
        "press-article-list-title": "Ce que les gens disent sur le jeu",
        "press-article-list-add-yours": "Vous souhaitez ajouter votre article?",
        "press-article-list-add-yours-email": "Envoyez-moi un email!",
    },
}

const defaultLocale = "en";
let locale;

document.addEventListener("DOMContentLoaded", () => {
    let localeToSet = getDefaultLocale();
    
    // alert(localeToSet);
    setLocale(localeToSet);
    bindLocaleSwitcher(localeToSet);
});

function getDefaultLocale() {
    if (typeof(Storage) !== "undefined") {
        const savedLocale = localStorage.getItem("locale")
        if (savedLocale !== null && (savedLocale in translations)) {
            return savedLocale
        }
    }

    const userLanguage = (navigator.language || navigator.userLanguage).slice(0,2);
    if (userLanguage in translations) {
        return userLanguage;
    } 
    return defaultLocale;      
}

function setLocale(newLocale) {
    if (newLocale == locale)  {
        return;
    }
    if ((newLocale in translations) === false) {
        return;
    }
    locale = newLocale;
    translatePage();
    saveLocale();
}

function translatePage() {
    document
        .querySelectorAll("[data-i18n-key]")
        .forEach(translateElement);
}

function saveLocale() {
    // Check browser support
    if (typeof(Storage) !== "undefined") {
        // Store
        localStorage.setItem("locale", locale);
    } else {
        alert("Sorry, your browser does not support Web Storage...");
    }
}

function translateElement(element) {
    const key = element.getAttribute("data-i18n-key");
    const translation = translations[locale][key] ?? translations[defaultLocale][key];
    element.innerHTML = translation;
}

// Whenever the user selects a new locale, we
// load the locale's translations and update
// the page
function bindLocaleSwitcher(initialValue) {
    const switcher = document.querySelector("[data-i18n-switcher]");
    switcher.value = initialValue;
    switcher.onchange = (e) => {
        // Set the locale to the selected option[value]
        setLocale(e.target.value);
    };
}
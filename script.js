/* =========================================================
   YOUSSEF BAR PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initTheme();
    initLoader();
    initMobileMenu();
    initLanguageSwitcher();
    initHeader();
    initScrollProgress();
    initRevealAnimations();
    initProjectFilters();
    initBackToTop();
    initContactForm();
    initCurrentYear();
    initCursor();
    initMagneticButtons();
    initProjectTilt();
    initActiveNavigation();
    initSmoothAnchors();
    initServiceLinks();

});


function safeStorageGet(key) {
    try { return localStorage.getItem(key); } catch { return null; }
}

function safeStorageSet(key, value) {
    try { localStorage.setItem(key, value); } catch {}
}

/* =========================================================
   THEME SYSTEM
   DARK / LIGHT
========================================================= */

function initTheme() {

    const themeToggle =
        document.getElementById("themeToggle");

    const savedTheme =
        safeStorageGet("portfolioTheme");

    const systemPrefersLight =
        window.matchMedia &&
        window.matchMedia(
            "(prefers-color-scheme: light)"
        ).matches;

    let initialTheme =
        savedTheme === "light" ||
        savedTheme === "dark"
            ? savedTheme
            : systemPrefersLight
                ? "light"
                : "dark";


    function applyTheme(theme) {

        if (
            theme !== "light" &&
            theme !== "dark"
        ) {
            theme = "dark";
        }


        document.documentElement.dataset.theme =
            theme;


        document.documentElement.style.colorScheme = theme;

        const themeMeta = document.querySelector("meta[name=\"theme-color\"]");
        if (themeMeta) {
            themeMeta.setAttribute("content", theme === "light" ? "#f5f5f7" : "#070707");
        }

        safeStorageSet("portfolioTheme", theme);


        if (themeToggle) {

            const isLight =
                theme === "light";

            themeToggle.setAttribute(
                "aria-pressed",
                String(isLight)
            );

            themeToggle.setAttribute(
                "aria-label",
                isLight
                    ? "Switch to dark mode"
                    : "Switch to light mode"
            );

            themeToggle.setAttribute(
                "title",
                isLight
                    ? "Dark mode"
                    : "Light mode"
            );
        }
    }


    applyTheme(initialTheme);


    if (!themeToggle) return;


    themeToggle.addEventListener(
        "click",
        () => {

            const currentTheme =
                document.documentElement.dataset.theme;

            const nextTheme =
                currentTheme === "light"
                    ? "dark"
                    : "light";


            themeToggle.style.transform =
                "scale(0.92)";


            setTimeout(() => {

                themeToggle.style.transform = "";

            }, 180);


            applyTheme(nextTheme);

        }
    );

}


/* =========================================================
   LOADER
========================================================= */

function initLoader() {

    const loader =
        document.getElementById("loader");

    if (!loader) return;


    let hidden = false;

    const hideLoader = () => {
        if (hidden) return;
        hidden = true;
        setTimeout(() => loader.classList.add("hidden"), 500);
    };

    const fallback = setTimeout(hideLoader, 4000);


    if (
        document.readyState === "complete"
    ) {

        hideLoader();

    } else {

        window.addEventListener(
            "load",
            hideLoader,
            { once: true }
        );

    }

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const menuToggle =
        document.getElementById("menuToggle");

    const nav =
        document.getElementById("nav");


    if (!menuToggle || !nav) return;


    const navLinks =
        nav.querySelectorAll(
            ".nav-link"
        );


    function getCurrentLanguage() {

        return document.documentElement.lang === "ar"
            ? "ar"
            : "en";

    }


    function closeMenu() {

        menuToggle.classList.remove(
            "active"
        );

        nav.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "menu-open"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        menuToggle.setAttribute(
            "aria-label",
            getCurrentLanguage() === "ar"
                ? "فتح القائمة"
                : "Open menu"
        );

    }


    function openMenu() {

        menuToggle.classList.add(
            "active"
        );

        nav.classList.add(
            "active"
        );

        document.body.classList.add(
            "menu-open"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );


        menuToggle.setAttribute(
            "aria-label",
            getCurrentLanguage() === "ar"
                ? "إغلاق القائمة"
                : "Close menu"
        );

    }


    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-controls", "nav");


    menuToggle.addEventListener(
        "click",
        () => {

            if (
                nav.classList.contains(
                    "active"
                )
            ) {

                closeMenu();

            } else {

                openMenu();

            }

        }
    );


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeMenu();

            }

        }
    );


    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900
            ) {

                closeMenu();

            }

        }
    );


    document.addEventListener(
        "click",
        event => {

            if (
                nav.classList.contains(
                    "active"
                ) &&
                !nav.contains(
                    event.target
                ) &&
                !menuToggle.contains(
                    event.target
                )
            ) {

                closeMenu();

            }

        }
    );

}


/* =========================================================
   LANGUAGE DATABASE
========================================================= */

const PORTFOLIO_TRANSLATIONS = {

    "Home":
        "الرئيسية",

    "About":
        "من أنا",

    "Services":
        "الخدمات",

    "Projects":
        "المشاريع",

    "Contact":
        "تواصل معي",

    "Let's Talk":
        "لنتحدث",

    "Loading experience...":
        "جاري تحميل التجربة...",

    "Available for new projects":
        "متاح لمشاريع جديدة",

    "WEB DEVELOPER & DIGITAL CREATOR":
        "مطور ويب وصانع تجارب رقمية",

    "I build digital experiences that make businesses stand out.":
        "أبني تجارب رقمية تجعل أعمالك تتميز عن المنافسين.",

    "I'm Youssef Bar, a professional web developer focused on creating premium websites, web applications, dashboards and e-commerce experiences that combine beautiful design with powerful functionality.":
        "أنا يوسف بر، مطور ويب محترف متخصص في إنشاء مواقع ويب وتطبيقات ولوحات تحكم ومتاجر إلكترونية احترافية تجمع بين التصميم الجذاب والوظائف القوية.",

    "View My Work":
        "شاهد أعمالي",

    "Let's Work Together":
        "لنعمل معًا",

    "Happy Clients":
        "عملاء سعداء",

    "Years Experience":
        "سنوات خبرة",

    "Open to work":
        "متاح للعمل",

    "Scroll to explore":
        "مرر للاستكشاف",

    "WEB DEVELOPMENT":
        "تطوير الويب",

    "UI / UX":
        "تصميم UI / UX",

    "WEB APPS":
        "تطبيقات الويب",

    "E-COMMERCE":
        "التجارة الإلكترونية",

    "DASHBOARDS":
        "لوحات التحكم",

    "JAVASCRIPT":
        "جافاسكريبت",

    "ABOUT ME":
        "من أنا",

    "Turning ideas into digital reality.":
        "أحوّل الأفكار إلى واقع رقمي.",

    "I don't just write code. I create experiences.":
        "أنا لا أكتب الأكواد فقط، بل أصنع تجارب رقمية.",

    "I specialize in building modern, fast and responsive digital products. My approach combines clean development, thoughtful design and a deep understanding of what makes users interact, engage and convert.":
        "أتخصص في بناء منتجات رقمية حديثة وسريعة ومتجاوبة. ويجمع أسلوبي بين التطوير النظيف والتصميم المدروس والفهم العميق لما يجعل المستخدمين يتفاعلون ويندمجون ويتحولون إلى عملاء.",

    "Whether you need a business website, online store, dashboard or custom web application, I focus on delivering something that doesn't just look good — it performs.":
        "سواء كنت تحتاج إلى موقع تجاري أو متجر إلكتروني أو لوحة تحكم أو تطبيق ويب مخصص، فأنا أركز على تقديم شيء لا يبدو جيدًا فقط، بل يعمل بكفاءة أيضًا.",

    "Years":
        "سنوات",

    "Experience":
        "خبرة",

    "HTML5":
        "HTML5",

    "CSS3":
        "CSS3",

    "JavaScript":
        "JavaScript",

    "Responsive Design":
        "تصميم متجاوب",

    "UI / UX":
        "UI / UX",

    "Git":
        "Git",

    "WHAT I DO":
        "ماذا أقدم",

    "Services built around your goals.":
        "خدمات مصممة حول أهدافك.",

    "Web Development":
        "تطوير المواقع",

    "High-performance websites with clean code, modern architecture and pixel-perfect responsive layouts.":
        "مواقع عالية الأداء بأكواد نظيفة وبنية حديثة وتصميم متجاوب بدقة عالية على جميع الشاشات.",

    "E-Commerce":
        "التجارة الإلكترونية",

    "Modern online stores designed to build trust, improve user experience and increase conversions.":
        "متاجر إلكترونية حديثة مصممة لبناء الثقة وتحسين تجربة المستخدم وزيادة المبيعات.",

    "Web Applications":
        "تطبيقات الويب",

    "Interactive web applications with powerful functionality, smooth interactions and scalable interfaces.":
        "تطبيقات ويب تفاعلية بقدرات قوية وتفاعلات سلسة وواجهات قابلة للتوسع.",

    "Dashboards":
        "لوحات التحكم",

    "Professional dashboards that transform complex information into simple, intuitive experiences.":
        "لوحات تحكم احترافية تحول المعلومات المعقدة إلى تجارب بسيطة وسهلة الاستخدام.",

    "Explore service":
        "اكتشف الخدمة",

    "SELECTED WORK":
        "أعمال مختارة",

    "Projects that speak for themselves.":
        "مشاريع تتحدث عن نفسها.",

    "A selection of digital experiences I've designed and developed.":
        "مجموعة من التجارب الرقمية التي صممتها وطورتها.",

    "All":
        "الكل",

    "Websites":
        "مواقع",

    "Web Apps":
        "تطبيقات ويب",

    "View Live Project":
        "مشاهدة المشروع",

    "WEBSITE":
        "موقع إلكتروني",

    "WEB APP":
        "تطبيق ويب",

    "DASHBOARD":
        "لوحة تحكم",

    "Luxury Business Website":
        "موقع أعمال فاخر",

    "Premium Online Store":
        "متجر إلكتروني احترافي",

    "Modern Web Application":
        "تطبيق ويب حديث",

    "Analytics Dashboard":
        "لوحة تحليلات",

    "Creative Agency Website":
        "موقع وكالة إبداعية",

    "Fashion Store":
        "متجر أزياء",

    "One Dental Center":
        "مركز One Dental",

    "Smart Study Planner":
        "مخطط الدراسة الذكي",

    "Interactive Game":
        "لعبة تفاعلية",

    "Game 2":
        "اللعبة الثانية",

    "TORRETOIR.Finishing":
        "TORRETOIR.Finishing",

    "Personal Expense Manager":
        "مدير المصروفات الشخصية",

    "Minhag Academy Website":
        "موقع أكاديمية المنهاج",

    "Dragon4clothes":
        "Dragon4clothes",

    "Ask about project":
        "استفسر عن المشروع",

    "Dashboards":
        "لوحات التحكم",

    "Want to see more?":
        "هل تريد رؤية المزيد؟",

    "Let's build something great":
        "لنبنِ شيئًا رائعًا",

    "MY PROCESS":
        "طريقة عملي",

    "From idea to launch.":
        "من الفكرة إلى الإطلاق.",

    "Discover":
        "اكتشاف",

    "Understanding your business, goals, audience and vision.":
        "فهم نشاطك التجاري وأهدافك وجمهورك ورؤيتك.",

    "Design":
        "التصميم",

    "Creating a premium visual direction focused on your users.":
        "إنشاء هوية بصرية احترافية تركز على المستخدمين.",

    "Develop":
        "التطوير",

    "Turning the design into fast, responsive and clean code.":
        "تحويل التصميم إلى كود سريع ومتجاوب ونظيف.",

    "Launch":
        "الإطلاق",

    "Testing, optimizing and delivering a polished final product.":
        "اختبار وتحسين وتسليم منتج نهائي احترافي.",

    "HAVE A PROJECT IN MIND?":
        "لديك مشروع في ذهنك؟",

    "Let's create something exceptional.":
        "لنصنع شيئًا استثنائيًا.",

    "Tell me about your idea and let's turn it into a digital experience your customers will remember.":
        "أخبرني عن فكرتك ولنحوّلها إلى تجربة رقمية سيظل عملاؤك يتذكرونها.",

    "Start a Conversation":
        "ابدأ محادثة",

    "CONTACT":
        "تواصل معي",

    "Have an idea? Let's talk.":
        "لديك فكرة؟ لنتحدث.",

    "I'm always interested in hearing about ambitious projects and new opportunities.":
        "يسعدني دائمًا أن أسمع عن المشاريع الطموحة والفرص الجديدة.",

    "Email":
        "البريد الإلكتروني",

    "WhatsApp":
        "واتساب",

    "Let's chat":
        "لنتحدث",

    "LinkedIn":
        "لينكدإن",

    "Connect with me":
        "تواصل معي",

    "Your Name":
        "اسمك",

    "Email Address":
        "البريد الإلكتروني",

    "Project Type":
        "نوع المشروع",

    "Select a service":
        "اختر الخدمة",

    "Website":
        "موقع إلكتروني",

    "Web Application":
        "تطبيق ويب",

    "Dashboard":
        "لوحة تحكم",

    "Other":
        "أخرى",

    "Tell me about your project":
        "أخبرني عن مشروعك",

    "Send Message":
        "إرسال الرسالة",

    "Designed & developed with passion.":
        "تم التصميم والتطوير بشغف.",

    "All rights reserved.":
        "جميع الحقوق محفوظة.",

    "3+ Years Experience":
        "أكثر من 3 سنوات خبرة",

    "50+ Projects":
        "أكثر من 50 مشروعًا",

    "20+ Happy Clients":
        "أكثر من 20 عميلًا سعيدًا",

    "3+ Years Experience":
        "أكثر من 3 سنوات خبرة"

};


/* =========================================================
   LANGUAGE SYSTEM
========================================================= */

function initLanguageSwitcher() {
    const switcher = document.getElementById("languageSwitcher");
    const track = switcher?.querySelector(".language-switch-track");
    const options = switcher?.querySelectorAll(".language-option");

    if (!switcher || !track || !options?.length) return;

    /*
    =========================================================
    COMPLETE EN / AR TRANSLATION SYSTEM
    =========================================================
    */

    const htmlTranslations = [
        {
            selector: ".hero-content h1",
            en: 'I build <span class="gradient-text">digital experiences</span> that make businesses stand out.',
            ar: 'أبني <span class="gradient-text">تجارب رقمية</span> تجعل أعمالك تتميز عن المنافسين.'
        },

        {
            selector: ".hero-description",
            en: "I'm <strong>Youssef Bar</strong>, a professional web developer focused on creating premium websites, web applications, dashboards and e-commerce experiences that combine beautiful design with powerful functionality.",
            ar: "أنا <strong>يوسف بر</strong>، مطور ويب محترف متخصص في إنشاء مواقع ويب وتطبيقات ولوحات تحكم ومتاجر إلكترونية احترافية تجمع بين التصميم الجذاب والوظائف القوية."
        },

        {
            selector: ".about-section .section-heading h2",
            en: 'Turning ideas into <span class="gradient-text">digital reality.</span>',
            ar: 'أحوّل الأفكار إلى <span class="gradient-text">واقع رقمي.</span>'
        },

        {
            selector: ".about-content .large-text",
            en: "I don't just write code. <span>I create experiences.</span>",
            ar: "أنا لا أكتب الأكواد فقط. <span>بل أصنع تجارب رقمية.</span>"
        },

        {
            selector: ".services-section .section-heading h2",
            en: 'Services built around <span class="gradient-text">your goals.</span>',
            ar: 'خدمات مصممة حول <span class="gradient-text">أهدافك.</span>'
        },

        {
            selector: ".projects-section .section-heading h2",
            en: 'Projects that speak <span class="gradient-text">for themselves.</span>',
            ar: 'مشاريع تتحدث <span class="gradient-text">عن نفسها.</span>'
        },

        {
            selector: ".process-section .section-heading h2",
            en: 'From idea to <span class="gradient-text">launch.</span>',
            ar: 'من الفكرة إلى <span class="gradient-text">الإطلاق.</span>'
        },

        {
            selector: ".cta-card h2",
            en: "Let's create something <span>exceptional.</span>",
            ar: "لنصنع شيئًا <span>استثنائيًا.</span>"
        },

        {
            selector: ".contact-content h2",
            en: 'Have an idea? <span class="gradient-text">Let\'s talk.</span>',
            ar: 'لديك فكرة؟ <span class="gradient-text">لنتحدث.</span>'
        },

        {
            selector: ".footer .copyright",
            en: '© <span id="year"></span> Youssef Bar . All rights reserved.',
            ar: '© <span id="year"></span> Youssef Bar . جميع الحقوق محفوظة.'
        }
    ];


    /*
    =========================================================
    NORMAL TEXT TRANSLATIONS
    =========================================================
    */

    const translations = {

        "Home": "الرئيسية",
        "About": "من أنا",
        "Services": "الخدمات",
        "Projects": "المشاريع",
        "Contact": "تواصل معي",
        "Let's Talk": "لنتحدث",

        "Loading experience...":
            "جاري تحميل التجربة...",

        "Available for new projects":
            "متاح لمشاريع جديدة",

        "WEB DEVELOPER & DIGITAL CREATOR":
            "مطور ويب وصانع تجارب رقمية",

        "View My Work":
            "شاهد أعمالي",

        "Let's Work Together":
            "لنعمل معًا",

        "Projects":
            "المشاريع",

        "Happy Clients":
            "عملاء سعداء",

        "Years Experience":
            "سنوات خبرة",

        "Open to work":
            "متاح للعمل",

        "Scroll to explore":
            "مرر للاستكشاف",


        /* MARQUEE */

        "WEB DEVELOPMENT":
            "تطوير الويب",

        "UI / UX":
            "تصميم UI / UX",

        "WEB APPS":
            "تطبيقات الويب",

        "E-COMMERCE":
            "التجارة الإلكترونية",

        "DASHBOARDS":
            "لوحات التحكم",

        "JAVASCRIPT":
            "جافاسكريبت",


        /* ABOUT */

        "ABOUT ME":
            "من أنا",

        "I don't just write code.":
            "أنا لا أكتب الأكواد فقط.",

        "I create experiences.":
            "بل أصنع تجارب رقمية.",

        "I specialize in building modern, fast and responsive digital products. My approach combines clean development, thoughtful design and a deep understanding of what makes users interact, engage and convert.":
            "أتخصص في بناء منتجات رقمية حديثة وسريعة ومتجاوبة. ويجمع أسلوبي بين التطوير النظيف والتصميم المدروس والفهم العميق لما يجعل المستخدمين يتفاعلون ويندمجون ويتحولون إلى عملاء.",

        "Whether you need a business website, online store, dashboard or custom web application, I focus on delivering something that doesn't just look good — it performs.":
            "سواء كنت تحتاج إلى موقع تجاري أو متجر إلكتروني أو لوحة تحكم أو تطبيق ويب مخصص، فأنا أركز على تقديم شيء لا يبدو جيدًا فقط، بل يعمل بكفاءة أيضًا.",

        "Years":
            "سنوات",

        "Experience":
            "خبرة",

        "Responsive Design":
            "تصميم متجاوب",


        /* SERVICES */

        "WHAT I DO":
            "ماذا أقدم",

        "Web Development":
            "تطوير المواقع",

        "High-performance websites with clean code, modern architecture and pixel-perfect responsive layouts.":
            "مواقع عالية الأداء بأكواد نظيفة وبنية حديثة وتصميم متجاوب بدقة عالية على جميع الشاشات.",

        "Modern online stores designed to build trust, improve user experience and increase conversions.":
            "متاجر إلكترونية حديثة مصممة لبناء الثقة وتحسين تجربة المستخدم وزيادة المبيعات.",

        "Interactive web applications with powerful functionality, smooth interactions and scalable interfaces.":
            "تطبيقات ويب تفاعلية بقدرات قوية وتفاعلات سلسة وواجهات قابلة للتوسع.",

        "Professional dashboards that transform complex information into simple, intuitive experiences.":
            "لوحات تحكم احترافية تحول المعلومات المعقدة إلى تجارب بسيطة وسهلة الاستخدام.",

        "Explore service":
            "اكتشف الخدمة",


        /* PROJECTS */

        "SELECTED WORK":
            "أعمال مختارة",

        "A selection of digital experiences I've designed and developed.":
            "مجموعة من التجارب الرقمية التي صممتها وطورتها.",

        "All":
            "الكل",

        "Websites":
            "مواقع",

        "Web Apps":
            "تطبيقات ويب",

        "View Live Project":
            "مشاهدة المشروع",

        "Ask about project":
            "استفسر عن المشروع",

        "WEBSITE":
            "موقع إلكتروني",

        "WEB APP":
            "تطبيق ويب",

        "DASHBOARD":
            "لوحة تحكم",

        "E-COMMERCE":
            "متجر إلكتروني",

        "One Dental Center":
            "مركز One Dental",

        "Smart Study Planner":
            "مخطط الدراسة الذكي",

        "Interactive Game":
            "لعبة تفاعلية",

        "Game 2":
            "اللعبة الثانية",

        "Personal Expense Manager":
            "مدير المصروفات الشخصية",

        "Minhag Academy Website":
            "موقع أكاديمية المنهاج",

        "Dragon4clothes":
            "Dragon4clothes",

        "Want to see more?":
            "هل تريد رؤية المزيد؟",


        /* PROCESS */

        "MY PROCESS":
            "طريقة عملي",

        "Discover":
            "الاكتشاف",

        "Understanding your business, goals, audience and vision.":
            "فهم نشاطك التجاري وأهدافك وجمهورك ورؤيتك.",

        "Design":
            "التصميم",

        "Creating a premium visual direction focused on your users.":
            "إنشاء هوية بصرية احترافية تركز على المستخدمين.",

        "Develop":
            "التطوير",

        "Turning the design into fast, responsive and clean code.":
            "تحويل التصميم إلى كود سريع ومتجاوب ونظيف.",

        "Launch":
            "الإطلاق",

        "Testing, optimizing and delivering a polished final product.":
            "اختبار وتحسين وتسليم منتج نهائي احترافي.",


        /* CTA */

        "HAVE A PROJECT IN MIND?":
            "لديك مشروع في ذهنك؟",

        "Tell me about your idea and let's turn it into a digital experience your customers will remember.":
            "أخبرني عن فكرتك ولنحوّلها إلى تجربة رقمية سيظل عملاؤك يتذكرونها.",

        "Start a Conversation":
            "ابدأ محادثة",


        /* CONTACT */

        "CONTACT":
            "تواصل معي",

        "Have an idea?":
            "لديك فكرة؟",

        "Let's talk.":
            "لنتحدث.",

        "I'm always interested in hearing about ambitious projects and new opportunities.":
            "يسعدني دائمًا أن أسمع عن المشاريع الطموحة والفرص الجديدة.",

        "Email":
            "البريد الإلكتروني",

        "Let's chat":
            "لنتحدث",

        "Connect with me":
            "تواصل معي",

        "Your Name":
            "اسمك",

        "Email Address":
            "البريد الإلكتروني",

        "Project Type":
            "نوع المشروع",

        "Select a service":
            "اختر الخدمة",

        "Website":
            "موقع إلكتروني",

        "E-Commerce":
            "متجر إلكتروني",

        "Web Application":
            "تطبيق ويب",

        "Dashboard":
            "لوحة تحكم",

        "Other":
            "أخرى",

        "Tell me about your project":
            "أخبرني عن مشروعك",

        "Send Message":
            "إرسال الرسالة",


        /* FOOTER */

        "Designed & developed with passion.":
            "تم التصميم والتطوير بشغف.",

        "All rights reserved.":
            "جميع الحقوق محفوظة.",


        /* TAGS */

        "Charts":
            "رسوم بيانية",

        "UI":
            "واجهة المستخدم",

        "CSS":
            "CSS",

        "JS":
            "جافاسكريبت",

        "API":
            "واجهة API"
    };


    /*
    =========================================================
    ELEMENTS THAT MUST NOT BE TOUCHED
    =========================================================
    */

    const skipSelectors = [
        "#languageSwitcher",
        "#themeToggle",
        "script",
        "style",

        ".hero-content h1",
        ".hero-description",

        ".about-section .section-heading h2",
        ".about-content .large-text",

        ".services-section .section-heading h2",

        ".projects-section .section-heading h2",

        ".process-section .section-heading h2",

        ".cta-card h2",

        ".contact-content h2",

        ".footer .copyright"
    ];


    const normalize = value =>
        String(value || "")
            .replace(/\u00a0/g, " ")
            .replace(/\s+/g, " ")
            .trim();


    /*
    =========================================================
    COLLECT ALL TEXT NODES ONCE
    =========================================================
    */

    const textNodes = [];

    const walker =
        document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT
        );


    while (walker.nextNode()) {

        const node =
            walker.currentNode;

        const parent =
            node.parentElement;

        const original =
            normalize(node.textContent);


        if (!parent || !original)
            continue;


        if (
            skipSelectors.some(
                selector =>
                    parent.closest(selector)
            )
        ) {
            continue;
        }


        textNodes.push({
            node,
            original
        });

    }


    /*
    =========================================================
    INPUT PLACEHOLDERS
    =========================================================
    */

    const inputs =
        document.querySelectorAll(
            "input, textarea"
        );


    const originalPlaceholders =
        new Map();


    inputs.forEach(input => {

        originalPlaceholders.set(
            input,
            input.getAttribute(
                "placeholder"
            ) || ""
        );

    });


    const placeholderMap = {

        "John Doe":
            "اكتب اسمك",

        "john@example.com":
            "example@email.com",

        "Tell me about your idea...":
            "اكتب فكرتك أو تفاصيل مشروعك..."

    };


    /*
    =========================================================
    SPECIAL HTML
    =========================================================
    */

    function applySpecial(language) {

        htmlTranslations.forEach(item => {

            const element =
                document.querySelector(
                    item.selector
                );


            if (!element)
                return;


            element.innerHTML =
                language === "ar"
                    ? item.ar
                    : item.en;

        });


        const year =
            document.getElementById(
                "year"
            );


        if (year) {

            year.textContent =
                new Date().getFullYear();

        }

    }


    /*
    =========================================================
    NORMAL TEXT
    =========================================================
    */

    function applyText(language) {

        textNodes.forEach(
            ({ node, original }) => {

                if (!node.parentElement)
                    return;


                node.textContent =
                    language === "ar"
                        ? (
                            translations[original]
                            || original
                        )
                        : original;

            }
        );


        inputs.forEach(input => {

            const original =
                originalPlaceholders.get(
                    input
                ) || "";


            input.placeholder =
                language === "ar"
                    ? (
                        placeholderMap[
                            original
                        ] || original
                    )
                    : original;

        });

    }


    /*
    =========================================================
    SELECT OPTIONS
    =========================================================
    */

    function applySelectOptions(language) {

        const select =
            document.getElementById(
                "project"
            );


        if (!select)
            return;


        const optionTranslations = {

            "Select a service":
                "اختر الخدمة",

            "Website":
                "موقع إلكتروني",

            "E-Commerce":
                "متجر إلكتروني",

            "Web Application":
                "تطبيق ويب",

            "Dashboard":
                "لوحة تحكم",

            "Other":
                "أخرى"

        };


        select.querySelectorAll(
            "option"
        ).forEach(option => {

            if (
                !option.dataset.originalText
            ) {

                option.dataset.originalText =
                    normalize(
                        option.textContent
                    );

            }


            const original =
                option.dataset.originalText;


            option.textContent =
                language === "ar"
                    ? (
                        optionTranslations[
                            original
                        ] || original
                    )
                    : original;

        });

    }


    /*
    =========================================================
    APPLY LANGUAGE
    =========================================================
    */

    function applyLanguage(language) {

        if (
            language !== "ar" &&
            language !== "en"
        ) {

            language = "en";

        }


        document.documentElement.lang =
            language;


        document.documentElement.dir =
            language === "ar"
                ? "rtl"
                : "ltr";


        track.classList.remove(
            "language-en",
            "language-ar"
        );


        track.classList.add(
            `language-${language}`
        );


        options.forEach(option => {

            const active =
                option.dataset.language ===
                language;


            option.classList.toggle(
                "active",
                active
            );


            option.setAttribute(
                "aria-pressed",
                String(active)
            );

        });


        applySpecial(language);

        applyText(language);

        applySelectOptions(language);

/* =========================================================
   BRAND NAME — SAFE LANGUAGE SWITCH
========================================================= */

const brandName = document.querySelector(".logo-name");

if (brandName) {

    brandName.innerHTML =
        language === "ar"
            ? `
                <strong>يوسف</strong>
                <em>بر</em>
              `
            : `
                <strong>Youssef</strong>
                <em>Bar</em>
              `;
}

/* Replace Youssef Bar anywhere else in visible text */
document.body.querySelectorAll("*").forEach(element => {

    if (
        element.closest("#languageSwitcher") ||
        element.closest("script") ||
        element.closest("style")
    ) {
        return;
    }

    if (
        element.children.length === 0 &&
        element.textContent.includes("Youssef Bar")
    ) {
        element.textContent =
            language === "ar"
                ? element.textContent.replace(
                    /Youssef Bar/g,
                    "يوسف بر"
                )
                : element.textContent.replace(
                    /يوسف بر/g,
                    "Youssef Bar"
                );
    }

});


        safeStorageSet(
            "portfolioLanguage",
            language
        );


        document.title =
            language === "ar"
                ? "يوسف بار — مطور ويب"
                : "Youssef Bar — Web Developer";


        const menuToggle =
            document.getElementById(
                "menuToggle"
            );


        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-label",
                language === "ar"
                    ? "فتح القائمة"
                    : "Open menu"
            );

        }

    }


    /*
    =========================================================
    LANGUAGE BUTTONS
    =========================================================
    */

    options.forEach(option => {

        option.addEventListener(
            "click",
            () => {

                const language =
                    option.dataset.language;


                if (!language)
                    return;


                track.classList.add(
                    "language-switching"
                );


                setTimeout(() => {

                    track.classList.remove(
                        "language-switching"
                    );

                }, 300);


                applyLanguage(
                    language
                );

            }
        );

    });


    /*
    =========================================================
    INITIAL LANGUAGE
    =========================================================
    */

    const savedLanguage =
        safeStorageGet(
            "portfolioLanguage"
        );


    const browserLanguage =
        navigator.language
            ?.toLowerCase()
            .startsWith("ar")
            ? "ar"
            : "en";


    applyLanguage(
        savedLanguage === "ar" ||
        savedLanguage === "en"
            ? savedLanguage
            : browserLanguage
    );

}

/* =========================================================
   HEADER
========================================================= */

function initHeader() {

    const header =
        document.getElementById(
            "header"
        );


    if (!header) return;


    const updateHeader = () => {

        if (
            window.scrollY > 50
        ) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    };


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

function initScrollProgress() {

    const progress =
        document.getElementById(
            "scrollProgress"
        );


    if (!progress) return;


    const updateProgress = () => {

        const scrollTop =
            window.scrollY;


        const documentHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        const percentage =
            documentHeight > 0
                ? (
                    scrollTop /
                    documentHeight
                ) * 100
                : 0;


        progress.style.width =
            `${percentage}%`;

    };


    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );


    updateProgress();

}


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

function initRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!elements.length) return;


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            element => {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "visible"
                                );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   PROJECT FILTERS
========================================================= */

function initProjectFilters() {

    const buttons =
        document.querySelectorAll(
            ".filter-btn"
        );


    const projects =
        document.querySelectorAll(
            ".project-card"
        );


    if (
        !buttons.length ||
        !projects.length
    ) {
        return;
    }


    buttons.forEach(button => {
        button.setAttribute("aria-pressed", String(button.classList.contains("active")));

        button.addEventListener(
            "click",
            () => {

                const filter =
                    button.dataset.filter;


                buttons.forEach(btn => {
                    btn.classList.remove("active");
                    btn.setAttribute("aria-pressed", "false");
                });

                button.classList.add("active");
                button.setAttribute("aria-pressed", "true");


                projects.forEach(
                    project => {

                        const category =
                            project.dataset
                                .category;


                        if (
                            filter === "all" ||
                            category === filter
                        ) {

                            project.classList.remove(
                                "hidden"
                            );

                        } else {

                            project.classList.add(
                                "hidden"
                            );

                        }

                    }
                );

            }
        );

    });

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    const button =
        document.getElementById(
            "backTop"
        );


    if (!button) return;


    const updateButton = () => {

        if (
            window.scrollY > 600
        ) {

            button.classList.add(
                "show"
            );

        } else {

            button.classList.remove(
                "show"
            );

        }

    };


    window.addEventListener(
        "scroll",
        updateButton,
        { passive: true }
    );


    button.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
            });

        }
    );

}


/* =========================================================
   CONTACT FORM
========================================================= */

function initContactForm() {

    const form =
        document.getElementById(
            "contactForm"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "name"
                )?.value.trim();


            const email =
                document.getElementById(
                    "email"
                )?.value.trim();


            const project =
                document.getElementById(
                    "project"
                )?.value;


            const message =
                document.getElementById(
                    "message"
                )?.value.trim();


            const language =
                document.documentElement.lang === "ar"
                    ? "ar"
                    : "en";


            const status = document.getElementById("formStatus");

            if (!name || !email || !message) {
                const msg = language === "ar"
                    ? "من فضلك املأ جميع الحقول المطلوبة."
                    : "Please fill in all required fields.";
                if (status) status.textContent = msg;
                showNotification(msg);
                return;
            }

            if (!/^\S+@\S+\.\S+$/.test(email)) {
                const msg = language === "ar"
                    ? "من فضلك اكتب بريدًا إلكترونيًا صحيحًا."
                    : "Please enter a valid email address.";
                if (status) status.textContent = msg;
                showNotification(msg);
                return;
            }


            /* Real portfolio email */

            const recipient =
                "youssefbar000@gmail.com";


            const subject =
                encodeURIComponent(
                    language === "ar"
                        ? `استفسار مشروع جديد — ${project || "موقع إلكتروني"}`
                        : `New Project Inquiry — ${project || "Website"}`
                );


            const body =
                encodeURIComponent(
                    language === "ar"
                        ?
                        `الاسم: ${name}\n\n` +
                        `البريد الإلكتروني: ${email}\n\n` +
                        `نوع المشروع: ${project || "غير محدد"}\n\n` +
                        `الرسالة:\n${message}`
                        :
                        `Name: ${name}\n\n` +
                        `Email: ${email}\n\n` +
                        `Project Type: ${project || "Not specified"}\n\n` +
                        `Message:\n${message}`
                );


            if (status) {
                status.textContent = language === "ar"
                    ? "سيتم فتح تطبيق البريد لإرسال رسالتك."
                    : "Your email app will open to send your message.";
            }

            window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

            form.reset();

        }
    );

}


/* =========================================================
   NOTIFICATION
========================================================= */

function showNotification(message) {

    const existing =
        document.querySelector(
            ".notification"
        );


    if (existing) {
        existing.remove();
    }


    const notification =
        document.createElement(
            "div"
        );


    notification.className =
        "notification";


    notification.textContent =
        message;


    const isLight =
        document.documentElement.dataset.theme ===
        "light";


    Object.assign(
        notification.style,
        {
            position: "fixed",
            right: "20px",
            bottom: "20px",
            zIndex: "9999",
            padding: "14px 18px",
            border:
                isLight
                    ? "1px solid rgba(0,0,0,.12)"
                    : "1px solid rgba(255,255,255,.15)",
            borderRadius: "12px",
            background:
                isLight
                    ? "#fff"
                    : "#111",
            color:
                isLight
                    ? "#111"
                    : "#fff",
            fontSize: "12px",
            boxShadow:
                isLight
                    ? "0 20px 50px rgba(0,0,0,.12)"
                    : "0 20px 50px rgba(0,0,0,.4)",
            transform:
                "translateY(20px)",
            opacity: "0",
            transition:
                "all .35s ease"
        }
    );


    if (
        document.documentElement.dir ===
        "rtl"
    ) {

        notification.style.right =
            "auto";

        notification.style.left =
            "20px";

    }


    document.body.appendChild(
        notification
    );


    requestAnimationFrame(
        () => {

            notification.style.transform =
                "translateY(0)";

            notification.style.opacity =
                "1";

        }
    );


    setTimeout(
        () => {

            notification.style.opacity =
                "0";

            notification.style.transform =
                "translateY(20px)";


            setTimeout(
                () => {

                    notification.remove();

                },
                350
            );

        },
        3500
    );

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function initCurrentYear() {

    const year =
        document.getElementById(
            "year"
        );


    if (!year) return;


    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

function initCursor() {

    const dot =
        document.querySelector(
            ".cursor-dot"
        );


    const outline =
        document.querySelector(
            ".cursor-outline"
        );


    if (!dot || !outline) return;


    if (
        window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        return;
    }


    let mouseX = 0;
    let mouseY = 0;

    let outlineX = 0;
    let outlineY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;


            dot.style.left =
                `${mouseX}px`;

            dot.style.top =
                `${mouseY}px`;

        }
    );


    function animateCursor() {

        outlineX +=
            (
                mouseX -
                outlineX
            ) * 0.12;


        outlineY +=
            (
                mouseY -
                outlineY
            ) * 0.12;


        outline.style.left =
            `${outlineX}px`;

        outline.style.top =
            `${outlineY}px`;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    const interactive =
        document.querySelectorAll(
            "a, button, input, textarea, select, .project-card"
        );


    interactive.forEach(
        element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    outline.classList.add(
                        "hover"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    outline.classList.remove(
                        "hover"
                    );

                }
            );

        }
    );

}


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

function initMagneticButtons() {

    const buttons =
        document.querySelectorAll(
            ".magnetic"
        );


    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {
        return;
    }


    buttons.forEach(button => {

        button.addEventListener(
            "mousemove",
            event => {

                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                button.style.transform =
                    `translate(${x * 0.12}px, ${y * 0.12}px)`;

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   PROJECT 3D TILT
========================================================= */

function initProjectTilt() {

    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {
        return;
    }


    const cards =
        document.querySelectorAll(
            ".project-card"
        );


    cards.forEach(card => {

        const image =
            card.querySelector(
                ".project-image"
            );


        if (!image) return;


        image.addEventListener(
            "mousemove",
            event => {

                const rect =
                    image.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateY =
                    (
                        (x / rect.width) -
                        0.5
                    ) * 5;


                const rotateX =
                    (
                        (y / rect.height) -
                        0.5
                    ) * -5;


                image.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     scale(1.01)`;

            }
        );


        image.addEventListener(
            "mouseleave",
            () => {

                image.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const links =
        document.querySelectorAll(
            ".nav-link"
        );


    if (
        !sections.length ||
        !links.length
    ) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            links.forEach(
                                link => {

                                    link.classList.remove(
                                        "active"
                                    );


                                    const target =
                                        link.getAttribute(
                                            "href"
                                        );


                                    if (
                                        target ===
                                        `#${entry.target.id}`
                                    ) {

                                        link.classList.add(
                                            "active"
                                        );

                                    }

                                }
                            );

                        }

                    }
                );

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(
        section => {

            observer.observe(
                section
            );

        }
    );

}


/* =========================================================
   SMOOTH ANCHOR + SERVICE LINKS
========================================================= */

function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", event => {
            const targetId = anchor.getAttribute("href");
            if (!targetId || targetId === "#") return;
            const target = document.querySelector(targetId);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                block: "start"
            });
        });
    });
}

function initServiceLinks() {
    document.querySelectorAll(".service-link[data-service]").forEach(link => {
        link.addEventListener("click", () => {
            const service = link.dataset.service;
            const select = document.getElementById("project");
            if (select && service) {
                const option = [...select.options].find(opt => opt.value === service || opt.textContent.trim() === service);
                if (option) select.value = option.value;
            }
        });
    });
}


/* =========================================================
   HELPER
========================================================= */

function normalizeLanguageText(text) {

    return text
        .replace(/\u00a0/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}
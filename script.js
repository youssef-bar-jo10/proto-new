/* =========================================================
   CODEX PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();
    initMobileMenu();
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

});


/* =========================================================
   LOADER
========================================================= */

function initLoader() {

    const loader = document.getElementById("loader");

    if (!loader) return;

    const hideLoader = () => {

        setTimeout(() => {
            loader.classList.add("hidden");
        }, 700);

    };

    if (document.readyState === "complete") {
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
    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");

    if (!menuToggle || !nav) return;

    const navLinks = nav.querySelectorAll(".nav-link");

    function closeMenu() {
        menuToggle.classList.remove("active");
        nav.classList.remove("active");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
    }

    function openMenu() {
        menuToggle.classList.add("active");
        nav.classList.add("active");
        document.body.classList.add("menu-open");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close menu");
    }

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.addEventListener("click", () => {
        if (nav.classList.contains("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    navLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });

    document.addEventListener("click", event => {
        if (
            nav.classList.contains("active") &&
            !nav.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });
}

/* =========================================================
   HEADER
========================================================= */

function initHeader() {

    const header =
        document.getElementById("header");

    if (!header) return;


    const updateHeader = () => {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
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
            document.documentElement.scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0
                ? (scrollTop / documentHeight) * 100
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
        document.querySelectorAll(".reveal");

    if (!elements.length) return;


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(element => {
            element.classList.add("visible");
        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

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

        button.addEventListener(
            "click",
            () => {

                const filter =
                    button.dataset.filter;


                buttons.forEach(btn => {
                    btn.classList.remove(
                        "active"
                    );
                });


                button.classList.add(
                    "active"
                );


                projects.forEach(project => {

                    const category =
                        project.dataset.category;


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

                });

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

        if (window.scrollY > 600) {

            button.classList.add("show");

        } else {

            button.classList.remove("show");

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
                behavior: "smooth"
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


            if (
                !name ||
                !email ||
                !message
            ) {

                showNotification(
                    "Please fill in all required fields."
                );

                return;

            }


            /*
                IMPORTANT:

                This demo opens the visitor's
                default email client.

                Replace your@email.com
                with your real email.
            */

            const recipient =
                "your@email.com";


            const subject =
                encodeURIComponent(
                    `New Project Inquiry — ${project || "Website"}`
                );


            const body =
                encodeURIComponent(
                    `Name: ${name}\n\n` +
                    `Email: ${email}\n\n` +
                    `Project Type: ${project || "Not specified"}\n\n` +
                    `Message:\n${message}`
                );


            window.location.href =
                `mailto:${recipient}?subject=${subject}&body=${body}`;


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
        document.createElement("div");


    notification.className =
        "notification";


    notification.textContent =
        message;


    Object.assign(
        notification.style,
        {
            position: "fixed",
            right: "20px",
            bottom: "20px",
            zIndex: "9999",
            padding: "14px 18px",
            border: "1px solid rgba(255,255,255,.15)",
            borderRadius: "12px",
            background: "#111",
            color: "#fff",
            fontSize: "12px",
            boxShadow:
                "0 20px 50px rgba(0,0,0,.4)",
            transform:
                "translateY(20px)",
            opacity: "0",
            transition:
                "all .35s ease"
        }
    );


    document.body.appendChild(
        notification
    );


    requestAnimationFrame(() => {

        notification.style.transform =
            "translateY(0)";

        notification.style.opacity =
            "1";

    });


    setTimeout(() => {

        notification.style.opacity =
            "0";

        notification.style.transform =
            "translateY(20px)";


        setTimeout(() => {

            notification.remove();

        }, 350);

    }, 3500);

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function initCurrentYear() {

    const year =
        document.getElementById("year");

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
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
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

            mouseX = event.clientX;
            mouseY = event.clientY;

            dot.style.left =
                `${mouseX}px`;

            dot.style.top =
                `${mouseY}px`;

        }
    );


    function animateCursor() {

        outlineX +=
            (mouseX - outlineX) * 0.12;

        outlineY +=
            (mouseY - outlineY) * 0.12;


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


    interactive.forEach(element => {

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

    });

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
                    ((x / rect.width) - 0.5) * 5;


                const rotateX =
                    ((y / rect.height) - 0.5) * -5;


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

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        links.forEach(link => {

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

                        });

                    }

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(section => {

        observer.observe(section);

    });

}


initActiveNavigation();


/* =========================================================
   SMOOTH ANCHOR FALLBACK
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener(
        "click",
        event => {

            const targetId =
                anchor.getAttribute(
                    "href"
                );


            if (
                targetId === "#" ||
                !targetId
            ) {
                return;
            }


            const target =
                document.querySelector(
                    targetId
                );


            if (!target) return;


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});
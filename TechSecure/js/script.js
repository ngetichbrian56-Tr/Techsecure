(function () {
    "use strict";

    var header = document.getElementById("site-header");
    var menuButton = document.getElementById("menuButton");
    var navigation = document.getElementById("main-navigation");
    var backToTop = document.getElementById("backToTop");
    var yearElement = document.getElementById("year");

    /* ---------- Mobile menu ---------- */
    function toggleMenu(open) {
        if (!navigation || !menuButton) return;
        navigation.classList.toggle("mobile-open", open);
        document.body.classList.toggle("menu-active", open);
        menuButton.setAttribute("aria-expanded", String(open));
        menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    }

    if (menuButton && navigation) {
        menuButton.addEventListener("click", function (e) {
            e.stopPropagation();
            toggleMenu(!navigation.classList.contains("mobile-open"));
        });

        navigation.addEventListener("click", function (e) {
            if (e.target.closest("a")) toggleMenu(false);
        });

        document.addEventListener("click", function (e) {
            if (!navigation.contains(e.target) && !menuButton.contains(e.target)) {
                toggleMenu(false);
            }
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && navigation.classList.contains("mobile-open")) {
                toggleMenu(false);
                menuButton.focus();
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 900) toggleMenu(false);
        });
    }

    /* ---------- Header and back-to-top on scroll ---------- */
    function onScroll() {
        if (header) header.classList.toggle("scrolled", window.scrollY > 8);
        if (backToTop) backToTop.classList.toggle("show", window.scrollY > 700);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ---------- Highlight the current section in the nav (home page only) ---------- */
    var navLinks = Array.prototype.slice.call(
        document.querySelectorAll('#main-navigation a[href^="#"]')
    );

    if (navLinks.length && "IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                navLinks.forEach(function (link) {
                    link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
                });
            });
        }, { rootMargin: "-40% 0px -55% 0px" });

        navLinks.forEach(function (link) {
            var target = document.querySelector(link.getAttribute("href"));
            if (target) observer.observe(target);
        });
    }

    /* ---------- Current year ---------- */
    if (yearElement) yearElement.textContent = new Date().getFullYear();
})();
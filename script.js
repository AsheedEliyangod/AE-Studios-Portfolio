// ============================================================================
// AE STUDIOS — Portfolio Script
// ============================================================================

(function () {
    'use strict';

    // ========================================================================
    // DATA — real project and asset data only
    // ========================================================================

    var projects = [
        {
            id: 'glitch',
            title: 'Glitch',
            description: 'A third-person game project focused on exploration, atmosphere, and immersive environmental gameplay.',
            image: 'assets/Project/Glitch/Glitch.png',
            editorImage: 'assets/Project/Glitch/Glitch Editor.png',
            tags: ['Unity', 'C#', '3D'],
            categories: ['games', 'unity', '3d'],
            devFocus: [
                'Third-person character controller',
                'Environmental interaction systems',
                'Level design and world layout',
                'Gameplay programming in C#',
                'Cinematic camera and cutscene systems',
                'Atmospheric scene composition',
            ],
        },
        {
            id: 'mythora',
            title: 'Mythora Legends',
            description: 'A third-person fantasy adventure combining exploration, combat, and a stylized 3D world.',
            image: 'assets/Project/Mythora Legends/Mythora.png',
            editorImage: 'assets/Project/Mythora Legends/Mythora Editor.png',
            tags: ['Unity', 'C#', '3D'],
            categories: ['games', 'unity', '3d'],
            devFocus: [
                'Third-person character controller',
                'Combat system design',
                'Player health and damage systems',
                'Enemy behaviour and gameplay systems',
                'Interactive 3D environment',
                'Fantasy world and level design',
            ],
        },
    ];

    var assets = [
        {
            id: 'wooden-box',
            title: 'Wooden Box Props',
            description: 'High-quality 3D wooden box prop optimized for Unity game environments.',
            image: 'assets/Product/WoodenBox.png',
            tags: ['3D'],
            categories: ['3d-assets'],
            url: 'https://assetstore.unity.com/preview/403592/1463658?ampDeviceId=934b4659-6d05-4b2b-a571-7935edb1143f&ampSessionId=1788018349490&ampTimestamp=1788149355845',
        },
    ];

    // ========================================================================
    // HELPERS
    // ========================================================================

    function makeTag(text) {
        return '<span class="tag">' + text + '</span>';
    }

    function makeFocusItem(text) {
        return '<li>' + text + '</li>';
    }

    // ========================================================================
    // SCROLL REVEAL (IntersectionObserver)
    // ========================================================================

    var observer;

    function observe(el) {
        if (!observer) return;
        // If already in viewport, reveal immediately
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('visible');
        } else {
            observer.observe(el);
        }
    }

    function initObserver() {
        if (!('IntersectionObserver' in window)) {
            // Fallback: show everything
            document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
                el.classList.add('visible');
            });
            return;
        }

        observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.reveal, .reveal-stagger').forEach(observe);
    }

    function revealElement(el) {
        if (!el) return;
        el.classList.add('reveal');
        observe(el);
    }

    function revealStagger(el) {
        if (!el) return;
        el.classList.add('reveal-stagger');
        observe(el);
    }

    // ========================================================================
    // RENDER DETAILED PROJECT CARDS
    // ========================================================================

    function renderProjects() {
        var container = document.getElementById('detailedProjectsList');
        if (!container) return;

        container.innerHTML = '';

        projects.forEach(function (proj, idx) {
            var tagsHTML    = proj.tags.map(makeTag).join('');
            var focusHTML   = proj.devFocus.map(makeFocusItem).join('');

            var card = document.createElement('article');
            card.className = 'detail-card';
            card.id = 'proj-' + proj.id;
            card.setAttribute('data-categories', proj.categories.join(','));

            card.innerHTML =
                '<div class="detail-card-hero">' +
                    '<img' +
                    ' src="' + proj.image + '"' +
                    ' alt="' + proj.title + ' gameplay screenshot"' +
                    ' loading="' + (idx === 0 ? 'eager' : 'lazy') + '"' +
                    '>' +
                '</div>' +
                '<div class="detail-card-body">' +
                    '<div class="detail-card-tags">' + tagsHTML + '</div>' +
                    '<h3 class="detail-card-title">' + proj.title + '</h3>' +
                    '<p class="detail-card-desc">' + proj.description + '</p>' +
                    '<div class="detail-card-columns">' +
                        '<div class="detail-col">' +
                            '<p class="detail-col-title">Development Focus</p>' +
                            '<ul class="dev-focus-list">' + focusHTML + '</ul>' +
                        '</div>' +
                        '<div class="detail-col">' +
                            '<p class="detail-col-title">Behind the Scenes</p>' +
                            '<div class="editor-image-wrap">' +
                                '<img' +
                                ' src="' + proj.editorImage + '"' +
                                ' alt="' + proj.title + ' Unity Editor screenshot"' +
                                ' loading="lazy"' +
                                '>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>';

            container.appendChild(card);

            // Stagger reveal per card
            (function(c, delay) {
                c.style.transitionDelay = delay + 's';
                revealElement(c);
            })(card, idx * 0.1);
        });
    }

    // ========================================================================
    // PROJECT FILTERING
    // ========================================================================

    function filterProjects(value) {
        document.querySelectorAll('#detailedProjectsList .detail-card').forEach(function (card) {
            var cats = card.getAttribute('data-categories').split(',');
            if (value === 'all' || cats.indexOf(value) !== -1) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    function initProjectFilters() {
        var btns = document.querySelectorAll('#projectFilters .filter-btn');
        btns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                btns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                filterProjects(btn.getAttribute('data-filter'));
            });
        });
    }

    // ========================================================================
    // RENDER ASSET CARDS
    // ========================================================================

    function renderAssets() {
        var grid = document.getElementById('assetsGrid');
        if (!grid) return;

        grid.innerHTML = '';

        assets.forEach(function (asset) {
            var tagsHTML = asset.tags.map(makeTag).join('');

            var card = document.createElement('article');
            card.className = 'asset-card';
            card.setAttribute('data-categories', asset.categories.join(','));

            card.innerHTML =
                '<div class="asset-image">' +
                    '<img src="' + asset.image + '" alt="' + asset.title + '" loading="lazy">' +
                '</div>' +
                '<div class="asset-content">' +
                    '<div class="asset-tags">' + tagsHTML + '</div>' +
                    '<h3 class="asset-title">' + asset.title + '</h3>' +
                    '<p class="asset-desc">' + asset.description + '</p>' +
                    '<div class="asset-actions">' +
                        (asset.url
                            ? '<a href="' + asset.url + '" class="btn btn-ghost btn-sm" target="_blank" rel="noopener noreferrer">View on Asset Store</a>'
                            : '<button class="btn btn-ghost btn-sm" disabled style="opacity:0.45;cursor:not-allowed;">Asset Store Link Coming Soon</button>'
                        ) +
                    '</div>' +
                '</div>';

            grid.appendChild(card);
            revealElement(card);
        });
    }

    // ========================================================================
    // ASSET FILTERING
    // ========================================================================

    function filterAssets(value) {
        document.querySelectorAll('#assetsGrid .asset-card').forEach(function (card) {
            var cats = card.getAttribute('data-categories').split(',');
            if (value === 'all' || cats.indexOf(value) !== -1) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    function initAssetFilters() {
        var btns = document.querySelectorAll('#assetFilters .filter-btn');
        btns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                btns.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                filterAssets(btn.getAttribute('data-filter'));
            });
        });
    }

    // ========================================================================
    // NAVBAR — scroll class + active link
    // ========================================================================

    var navbar    = document.getElementById('navbar');
    var hamburger = document.getElementById('hamburger');
    var navMenu   = document.getElementById('navMenu');
    var navLinks  = document.querySelectorAll('.nav-link');

    function onScroll() {
        // Scrolled class
        if (navbar) {
            if (window.scrollY > 40) { navbar.classList.add('scrolled'); }
            else { navbar.classList.remove('scrolled'); }
        }

        // Active nav link
        var sections = document.querySelectorAll('section[id]');
        var current = '';
        sections.forEach(function (sec) {
            if (window.scrollY >= sec.offsetTop - 90) {
                current = sec.getAttribute('id');
            }
        });
        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Hamburger toggle
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            var open = hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', function (e) {
            if (navMenu && hamburger) {
                if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ========================================================================
    // SMOOTH SCROLL for all anchor links
    // ========================================================================

    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var id = this.getAttribute('href');
            if (id === '#') return;
            var target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ========================================================================
    // APPLY REVEAL TO STATIC HTML ELEMENTS
    // ========================================================================

    function applyStaticReveals() {
        // Featured cards
        document.querySelectorAll('.featured-card').forEach(function (el, i) {
            el.style.transitionDelay = (i * 0.12) + 's';
            revealElement(el);
        });

        // Skills grid (stagger children)
        var skillsGrid = document.querySelector('.skills-grid');
        if (skillsGrid) revealStagger(skillsGrid);

        // About intro and blocks
        document.querySelectorAll('.about-intro-block').forEach(revealElement);
        document.querySelectorAll('.about-block').forEach(function (el, i) {
            el.style.transitionDelay = (i * 0.08) + 's';
            revealElement(el);
        });

        // CTA inner
        var ctaInner = document.querySelector('.home-cta-inner');
        if (ctaInner) revealElement(ctaInner);

        // Coming soon
        var comingSoon = document.querySelector('.assets-coming-soon');
        if (comingSoon) revealElement(comingSoon);

        // Contact card
        var contactCard = document.querySelector('.contact-card');
        if (contactCard) revealElement(contactCard);
    }

    // ========================================================================
    // REDUCED MOTION
    // ========================================================================

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--t-fast', '0ms');
        document.documentElement.style.setProperty('--t-base', '0ms');
        document.documentElement.style.setProperty('--t-slow', '0ms');
    }

    // ========================================================================
    // INIT on DOMContentLoaded (don't wait for images to load)
    // ========================================================================

    function init() {
        // Render JS-driven content first
        renderProjects();
        renderAssets();

        // Set up filters
        initProjectFilters();
        initAssetFilters();

        // Init reveal observer (after elements exist in DOM)
        initObserver();

        // Apply reveal to static HTML elements
        applyStaticReveals();

        console.log('%cAE Studios portfolio loaded', 'color:#818cf8;font-weight:bold');
        console.log('Projects: ' + projects.length + '  |  Assets: ' + assets.length);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

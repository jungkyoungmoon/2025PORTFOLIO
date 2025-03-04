$(function () {
    gsap.registerPlugin(ScrollTrigger);

    // 페이지 로딩 & 인트로 애니메이션
    const changeWord = document.querySelector(".change-word");
    const pageLoad = document.querySelector(".page-load");

    gsap.set(".visual_text-row", { opacity: 0 });
    gsap.set(".visual_text-row > *", { x: -50, opacity: 0 });
    gsap.set(".visual__video", { x: -100, opacity: 0, scale: 0.95 });
    gsap.set(".visual__video video", { opacity: 0, display: "none" });

    setTimeout(() => {
        gsap.to(changeWord, { opacity: 0, duration: 0.5, onComplete: () => {
            changeWord.textContent = "publisher";
            gsap.to(changeWord, { opacity: 1, duration: 0.5 });
        }});
    }, 1000);

    setTimeout(() => {
        gsap.to(pageLoad, {
            opacity: 0,
            duration: 2,
            ease: "power4.inOut",
            onComplete: () => {
                pageLoad.style.display = "none";
                startIntroAnimation();
            }
        });
    }, 2000);

    function startIntroAnimation() {
        gsap.utils.toArray(".visual_text-row").forEach((row, rowIndex) => {
            gsap.to(row, { opacity: 1, duration: 0.3 });

            gsap.to(row.children, {
                x: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
            });

            row.querySelectorAll(".visual__video video").forEach((video, videoIndex) => {
                gsap.to(video, {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.4,
                    ease: "power3.out",
                    delay: rowIndex * 0.2 + videoIndex * 0.2,
                    onStart: () => video.style.display = "block"
                });
            });
        });
    }

    // 마우스 커서
    const cursor = document.querySelector('.cursor');
    const hoverTargets = document.querySelectorAll('.hover-target');
    const isTouchDevice = window.matchMedia('(max-width: 1024px)').matches;

    if (!isTouchDevice) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.top = `${e.clientY}px`;
            cursor.style.left = `${e.clientX}px`;
        });

        hoverTargets.forEach((target) => {
            target.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            target.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    } else {
        cursor.style.display = 'none';
    }

    // GNB 토글
    // gnb 
    $('#gnbToggle').click(() => {
        const body = $('body');
        const header = $('.header');
        const gnbWrapper = $('.gnb-wrapper');

        if (body.hasClass('dimmed')) {
            body.removeClass('dimmed').css({ top: '' });
            window.scrollTo(0, scrollPosition);
        } else {
            scrollPosition = window.scrollY;
            body.addClass('dimmed').css({ top: -scrollPosition + 'px' });
        }

        $('#gnbToggle').toggleClass('open close');
        header.toggleClass('open');
        gnbWrapper.toggleClass('open');
    });

    // 메뉴 링크 클릭 시 닫기
    $('.nav').click(() => {
        const body = $('body');
        const header = $('.header');
        const gnbWrapper = $('.gnb-wrapper');

        body.removeClass('dimmed').css({ top: '' });
        window.scrollTo(0, scrollPosition);

        $('#gnbToggle').toggleClass('open close');
        header.toggleClass('open');
        gnbWrapper.toggleClass('open');
    });

    window.history.scrollRestoration = 'manual';

    window.addEventListener('load', () => {
        const savedPosition = parseInt(localStorage.getItem('scrollPosition'), 10);
        if (!isNaN(savedPosition)) {
            setTimeout(() => {
                window.scrollTo(0, savedPosition);
            }, 100);
            localStorage.removeItem('scrollPosition');
        }
    });

    window.addEventListener('scroll', () => {
        localStorage.setItem('scrollPosition', window.scrollY);
    });

    // 인트로 애니메이션
    gsap.timeline({
        scrollTrigger: {
            trigger: '.sec-intro .intro_inner .visual__text-container',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.3,
        }
    });

    gsap.utils.toArray('.visual_text-row').forEach((row, index) => {
        gsap.fromTo(row, { xPercent: 0 }, {
            xPercent: index % 2 === 0 ? -100 : 100,
            scrollTrigger: {
                trigger: row,
                start: 'top',
                end: 'bottom',
                scrub: 1.3,
                toggleActions: 'play none none reverse',
            },
        });
    });

    // About 텍스트 애니메이션
    gsap.utils.toArray(".section_txt").forEach(target => {
        let lines = new SplitType(target, { type: "lines" }).lines;
        gsap.fromTo(lines, { yPercent: 30, autoAlpha: 0 }, {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "circ.out",
            stagger: 0.2,
            scrollTrigger: {
                trigger: target,
                start: "top 80%",
                end: "bottom 40%",
                toggleActions: "play reverse play reverse",
            }
        });
    });

    // Works 애니메이션
    gsap.from(".works_tit h3", {
        y: 50,
        autoAlpha: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".works_tit",
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
        }
    });

    gsap.utils.toArray(".project").forEach((project, index) => {
        gsap.from(project, {
            y: 120,
            autoAlpha: 0,
            scale: 0.9,
            duration: 1.5,
            ease: "back.out(1.7)",
            delay: index * 0.1,
            scrollTrigger: {
                trigger: project,
                start: "top 100%",
                end: "top 20%",
                toggleActions: "play none none none",
            },
            onUpdate: () => project.style.removeProperty("transform")
        });
    });

    // 텍스트 애니메이션
    function animateText() {
        gsap.fromTo(".title-area p span",
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                stagger: 0.3,
                scrollTrigger: {
                    trigger: ".title-area p span",
                    start: "top 80%",
                    toggleActions: "play reverse play reverse",
                }
            }
        );
    }
    animateText();

    // 무한 마퀴 애니메이션
    const banner = document.querySelector(".contact-banner");
    const items = Array.from(banner.children);
    items.forEach(item => banner.appendChild(item.cloneNode(true)));

    const marqueeAnimation = gsap.to(".contact-banner", {
        x: "-50%",
        duration: 15,
        ease: "linear",
        repeat: -1
    });

    document.querySelector(".contact-banner-wrap").addEventListener("mouseenter", () => marqueeAnimation.pause());
    document.querySelector(".contact-banner-wrap").addEventListener("mouseleave", () => marqueeAnimation.play());
});

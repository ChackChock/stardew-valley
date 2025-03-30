gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

document.addEventListener('mousemove', (e) => {
    const sensitivity = 0.4;
    const x = (e.clientX - window.innerWidth / 2) * sensitivity;
    const y = (e.clientY - window.innerHeight / 2) * sensitivity;

    gsap.to('.layers__container', {
        duration: 1.5,
        x: -x * 0.3,
        y: -y * 0.3,
        rotationY: x * 0.03,
        rotationX: y * 0.03,
        ease: 'power2.out'
    });

    gsap.to('.hero-overlay', {
        duration: 1.5,
        x: x * 0.6,
        y: y * 0.6,
        ease: 'power2.out'
    });
});

if ('ontouchstart' in window) {
    gsap.set('.layers__container', { rotationX: 0, rotationY: 0 });
}

if (ScrollTrigger.isTouch !== 1) {
    ScrollSmoother.create({
        wrapper: '.wrapper',
        content: '.content',
        smooth: 1.5,
        effects: true
    })

    gsap.fromTo('header', { opacity: 1 }, {
        opacity: 0,
        scrollTrigger: {
            trigger: 'main',
            start: 'top center',
            end: 'bottom center',
            scrub: true
        }
    })

    const sections = gsap.utils.toArray('section')

    sections.forEach(section => {
        gsap.fromTo(section,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                scrollTrigger: {
                    trigger: section,
                    start: 'top center+=100',
                    end: 'bottom center',
                    toggleActions: 'play none none reverse'
                }
            }
        )
    })

    gsap.to('header', {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
            trigger: 'header',
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    })
}
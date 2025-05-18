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

const initOptions = () => {
    const gallery = document.querySelector(".gallery")
    const galleryItems = document.querySelectorAll(".gallery-item")
    gallery.style.setProperty('--total-items', galleryItems.length)

    gallery.addEventListener("click", (e) => {
        const clicked = e.target.closest(".gallery-item")
        if (!clicked || clicked.classList.contains("active")) return

        galleryItems.forEach(item => {
            item.classList.remove("active")
        })

        clicked.classList.add("active")
    })
}

document.addEventListener("DOMContentLoaded", initOptions)


const themeToggle = document.querySelector(".theme-toggle")
const root = document.documentElement;

if (localStorage.getItem("theme") == "dark")
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
else
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'

themeToggle.addEventListener("click", () => {
    let rootStyles = getComputedStyle(document.documentElement);
    let isDark = localStorage.getItem("theme") == "dark"

    if (isDark) {
        localStorage.setItem("theme", "light")
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
        root.style.setProperty("--current-dark", rootStyles.getPropertyValue("--dark"))
        root.style.setProperty("--current-light", rootStyles.getPropertyValue("--light"))
    } else {
        localStorage.setItem("theme", "dark")
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
        root.style.setProperty("--current-dark", rootStyles.getPropertyValue("--light"))
        root.style.setProperty("--current-light", rootStyles.getPropertyValue("--dark"))
    }
    console.log(root.style.getPropertyValue("--current-dark"))
})





const initPlayer = () => {
    const audio = document.getElementById('audioPlayer')
    const playButton = document.querySelector(".play-btn")
    const vinyl = document.querySelector(".vinyl")
    const progress = document.querySelector('.progress')

    playButton.addEventListener("click", () => {
        if (audio.paused) {
            audio.play()
            playButton.innerHTML = '<i class="fas fa-pause"></i>'
            vinyl.style.animationPlayState = 'running'
        } else {
            audio.pause()
            playButton.innerHTML = '<i class="fas fa-play"></i>'
            vinyl.style.animationPlayState = 'paused'
        }
    })

    audio.addEventListener('timeupdate', () => {
        const progressPercent = (audio.currentTime / audio.duration) * 100
        progress.style.width = `${progressPercent}%`

        const minutes = Math.floor(audio.currentTime / 60)
        const seconds = Math.floor(audio.currentTime % 60)
        document.querySelector('.time').textContent =
            `${minutes}:${seconds.toString().padStart(2, '0')} / 
            ${Math.floor(audio.duration / 60)}:${Math.floor(audio.duration % 60).toString().padStart(2, '0')}`
    })

    document.querySelector('.progress-bar').addEventListener('click', (e) => {
        const rect = e.target.getBoundingClientRect()
        const pos = (e.clientX - rect.left) / rect.width
        audio.currentTime = pos * audio.duration
    })
}

document.addEventListener("DOMContentLoaded", initPlayer)

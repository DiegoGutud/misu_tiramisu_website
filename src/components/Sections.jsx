import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

// ─── LazyVideo ────────────────────────────────────────────────────────────────
// Defers src assignment and autoplay until the video enters the viewport.
// This prevents the browser from downloading heavy MP4 files on initial load.
const LazyVideo = ({ src, className, style, poster, ...props }) => {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loaded) {
          video.src = src;
          video.load();
          video.play().catch(() => {});
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [src, loaded]);

  return (
    <video
      ref={videoRef}
      className={className}
      style={style}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      {...props}
    />
  );
};




// ─── Data ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Nuestra Esencia', href: '#esencia' },
  { label: 'Sabores', href: '#sabores' },
  { label: 'El Proceso', href: '#proceso' },
  { label: 'Reseñas', href: '#resenas' },
];

const SABORES = [
  {
    tag: 'Más popular',
    name: 'El Clásico',
    desc: 'La receta original italiana. Cremoso mascarpone, bizcochos savoiardi, café intenso y delicado topping de cacao puro espolvoreado.',
    img: '/images/misu_catalog_1.jpeg',
  },
  {
    tag: '⭐ El favorito',
    name: 'Pistacchio',
    desc: 'Verde, cremoso y adictivo. Mascarpone con crema 100% pistacho, bizcochos savoiardi, café suave y topping de pistachos triturados.',
    img: '/images/misu_catalog_6.jpeg',
  },
  {
    tag: 'Irresistible',
    name: 'Dolce Lotus',
    desc: 'Crema de galleta Lotus caramelizada sobre nuestra base clásica. Dulce, con su toque especiado y una textura suave que la hace irresistible.',
    img: '/images/misu_catalog_3.jpeg',
  },
  {
    tag: 'Sorpresa',
    name: 'Limonello',
    desc: 'Mascarpone mezclado con lemon curd casero, con topping de galleta y ralladura de limón. El que más repiten los que no querían probarlo.',
    img: '/images/misu_catalog_5.jpeg',
  },
  {
    tag: 'Especial',
    name: 'Bianco Incanto',
    desc: 'Mascarpone suave con chocolate blanco, leche y topping de coco rallado, virutas de chocolate blanco y almendra crocante triturada.',
    img: '/images/misu_catalog_2.jpeg',
  },
  {
    tag: 'De temporada',
    name: 'Berry Amore',
    desc: 'Intenso sabor a frutos rojos con virutas de chocolate negro. Mascarpone y coulis casero de frutos rojos. Un contraste de color y sabor irresistible.',
    img: '/images/misu_catalog_4.jpeg',
  },
  {
    tag: 'Para todos',
    name: 'Sin Café',
    desc: 'Toda la cremosidad y el placer de Misú, sin cafeína. Ideal para niños y para quienes quieren disfrutar sin café, con su sabor suave y envolvente.',
    img: '/images/misu_product_7.jpg',
  },
];

const ROW1_REVIEWS = [
  { init: 'J', name: 'Jesus M.', text: 'El mejor y auténtico tiramisu de todo Madrid. Cremoso y lleno de sabor. Con una atención inmejorable.' },
  { init: 'D', name: 'Darxi D.', text: 'La textura y el sabor son increíbles. Los chicos son muy majos y nos han tratado muy bien.' },
  { init: 'D', name: 'David C.', text: 'Se nota que está hecho con mimo y con buen producto. Un acierto total tener un sitio así en el barrio.' },
  { init: 'S', name: 'Silvia N.', text: 'Las personas que atienden son encantadoras, te aconsejan muy bien y con mucha paciencia.' },
  { init: 'Z', name: 'Zergi G.', text: 'Sin duda los mejores tiramisús de Madrid ❤️' },
  { init: 'A', name: 'Ayleen J.', text: 'Cada bocado es un verdadero placer. La presentación es preciosa y el sabor, auténtico.' },
];

const ROW2_REVIEWS = [
  { init: 'M', name: 'Miriam', text: 'Increíble. De los mejores tiramisú que he probado en mi vida.' },
  { init: 'S', name: 'S. M.', text: 'Puedes ver cómo preparan los tiramisús de forma artesanal, uno a uno. Un detalle precioso.' },
  { init: 'Y', name: 'Yaima R.', text: 'El de pistacho y el de chocolate blanco son una delicia. El café también lo recomiendo.' },
  { init: 'M', name: 'Maite U.', text: 'Riquísimos, muy finos y nada empalagosos. Para repetir y probar todos los sabores.' },
  { init: 'M', name: 'Manuel M.', text: 'Se nota que lo hacen todo con cariño. Divino el café y su tiramisú. Recomendado 100%.' },
  { init: 'D', name: 'Davide D.', text: 'Tiramisú así, mejor no se puede. Ya estoy pensando en volver.' },
];

// Gallery images from v2 (only use images that exist)
const GALERIA_ITEMS = [
  { img: '/images/misu_product_7.jpg', alt: 'Tiramisú' },
  { video: '/images/misu_product_6.mp4', alt: 'Tiramisú video' },
  { img: '/images/misu_product_10.jpg', alt: 'Tiramisú' },
  { img: '/images/misu_product_4.jpg', alt: 'Tiramisú' },
  { video: '/images/misu_product_11.mp4', alt: 'Tiramisú video' },
  { img: '/images/misu_product_5.jpg', alt: 'Tiramisú' },
  { img: '/images/misu_product_3.jpg', alt: 'Tiramisú' },
  { img: '/images/misu_shop_4.jpg', alt: 'Local Misú' },
  { img: '/images/misu_product_8.jpg', alt: 'Tiramisú' },
  { video: '/images/misu_product_12.mp4', alt: 'Tiramisú video' },
  { img: '/images/misu_product_9.jpg', alt: 'Tiramisú' },
  { img: '/images/misu_product_22.jpg', alt: 'Tiramisú' },
];



// ─── Nav ──────────────────────────────────────────────────────────────────────

export const Nav = () => {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    gsap.from(navRef.current, { y: -90, opacity: 0, duration: 0.9, ease: 'back.out(1.5)', delay: 0.15 });
    const handle = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const navClasses = [];
  if (scrolled || menuOpen) navClasses.push('scrolled');
  if (menuOpen) navClasses.push('menu-open');

  return (
    <nav id="nav" ref={navRef} className={navClasses.join(' ')}>
      <a href="#" className="nav-logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        <img src="/images/misu_logo.png" alt="Misú" />
      </a>
      <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        {NAV_LINKS.map(link => (
          <li key={link.href}>
            <a href={link.href} onClick={e => handleNavClick(e, link.href)}>{link.label}</a>
          </li>
        ))}
      </ul>
      <a href="#locales" className="nav-pill" onClick={e => handleNavClick(e, '#locales')}>Encuéntranos</a>
    </nav>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const Hero = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('#heroPass', { opacity: 0 }, { opacity: 1, duration: 1.4 })
        .fromTo('#heroEye', { opacity: 0, y: 18, letterSpacing: '0.1em' }, { opacity: 1, y: 0, letterSpacing: '0.3em', duration: 0.9 }, 0.2)
        .fromTo('#heroTitle', { opacity: 0, scale: 0.9, filter: 'blur(10px)' }, { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2 }, 0.4)
        .fromTo('#heroTag', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9 }, 0.6)
        .fromTo('#heroActs > *', { opacity: 0, y: 18, filter: 'blur(4px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, stagger: 0.12 }, 0.8)
        .fromTo('#scrollCue', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.4);

      // Hero parallax & blur on scroll
      gsap.to('#heroContent', {
        yPercent: 40,
        opacity: 0,
        filter: 'blur(15px)',
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Video scale on scroll
      gsap.to('.hero-video', {
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero">
      <video className="hero-video" autoPlay muted loop playsInline poster="/images/misu_product_3.jpg">
        <source src="/images/misu_product_6.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay" />


      <div className="hero-content" id="heroParallax">
        <div id="heroContent">
          <span className="hero-eyebrow" id="heroEye">Madrid · L'autentico Tiramisú</span>
          <div className="hero-title-wrap" id="heroTitle">
            <img src="/images/misu_title.svg" alt="Misú" className="hero-svg-title" />
          </div>
          <p className="hero-tagline" id="heroTag">La felicidad <em>en un vasito</em></p>
          <div className="hero-actions" id="heroActs">
            <a href="#sabores" className="btn-hero-primary" onClick={e => { e.preventDefault(); document.querySelector('#sabores').scrollIntoView({ behavior: 'smooth' }); }}>Descubre los Sabores</a>
            <a href="#locales" className="btn-hero-ghost" onClick={e => { e.preventDefault(); document.querySelector('#locales').scrollIntoView({ behavior: 'smooth' }); }}>Encuéntranos</a>
          </div>
        </div>
      </div>

      <div className="hero-scroll-cue" id="scrollCue">
        <span>Scroll</span>
        <div className="scroll-bar" />
      </div>
    </section>
  );
};

// ─── EsenciaSection ───────────────────────────────────────────────────────────

export const EsenciaSection = () => {
  const sectionRef = useRef(null);
  const copyRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(copyRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' } });
      gsap.fromTo(visualRef.current,
        { opacity: 0, x: 60 },
        { opacity: 1, x: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' } });

      gsap.utils.toArray('.esencia-divider').forEach(el => {
        gsap.fromTo(el, { scaleX: 0, transformOrigin: 'left' },
          { scaleX: 1, duration: .8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 80%' } });
      });

      // Counters
      document.querySelectorAll('[data-target]').forEach(el => {
        const target = +el.getAttribute('data-target');
        const suffix = el.getAttribute('data-suffix') || '';
        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: el, start: 'top 82%', once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: target, duration: 1.6, ease: 'power2.out',
              onUpdate() {
                const isDecimal = !Number.isInteger(target);
                el.textContent = (isDecimal ? obj.val.toFixed(1) : Math.round(obj.val)) + suffix;
              },
              onComplete() { el.textContent = target + suffix; }
            });
          }
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="esencia" ref={sectionRef}>
      <div className="container">
        <div className="esencia-grid">
          <div className="esencia-copy" ref={copyRef}>
            <span className="label">Nuestra Esencia</span>
            <h2 className="title">Hecho con <em>mimo</em>,<br />sabor a Italia</h2>
            <div className="esencia-divider" />
            <p className="body-text">
              En Misú no fabricamos tiramisús, los <strong>creamos</strong>. Cada vasito se
              elabora a mano cada día, con receta italiana auténtica y los mejores
              ingredientes frescos.
            </p>
            <p className="body-text">
              Nuestras recetas respetan la tradición italiana y abrazan la creatividad: desde el clásico irresistible hasta sabores únicos que te sorprenderán en cada cucharada. Y si buscas opciones sin café, también las tenemos, perfectas para toda la familia.
            </p>
            <p className="body-text" style={{ marginTop: '.9rem' }}>
              Hoy contamos con nuestro local en Madrid y seguimos creciendo guiados por el mismo principio: <em>cada tiramisú debe ser perfecto</em>.
            </p>
            <div className="esencia-stats">
              <div>
                <div className="stat-val" data-target="6" data-suffix="">0</div>
                <div className="stat-lbl">Sabores únicos</div>
              </div>
              <div>
                <div className="stat-val" data-target="1" data-suffix="">0</div>
                <div className="stat-lbl">Local en Madrid</div>
              </div>
              <div>
                <div className="stat-val" data-target="4.8" data-suffix="">0</div>
                <div className="stat-lbl">Valoración en Google</div>
              </div>
            </div>
          </div>

          <div className="esencia-visual" ref={visualRef}>
            <div className="esencia-frame">
              <LazyVideo src="/images/misu_preparation_1.mp4" poster="/images/misu_product_9.jpg" />
            </div>
            <div className="esencia-tag">
              <div className="esencia-tag-inner">
                <span className="tag-num">100%</span>
                <span className="tag-txt">Artesanal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── SaboresSection ───────────────────────────────────────────────────────────

export const SaboresSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('#saboresHead',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        });

      gsap.fromTo('.swiper-sabores',
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="sabores" ref={sectionRef}>
      <div className="sabores-head container" id="saboresHead">
        <div>
          <span className="label light">La carta</span>
          <h2 className="title on-dark">Nuestros <em>Sabores</em></h2>
        </div>
        <p className="sabores-sub">
          Elaborados cada día con ingredientes de primera. Clásicos reinventados
          y sorpresas de temporada para que cada visita sea diferente.
        </p>
      </div>

      <Swiper
        className="swiper-sabores"
        modules={[Pagination]}
        pagination={{ clickable: true }}
        grabCursor={true}
        slidesPerView={1.3}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 2.2, spaceBetween: 22 },
          1024: { slidesPerView: 3.3, spaceBetween: 26 },
          1280: { slidesPerView: 4.1, spaceBetween: 26 },
        }}
      >
        {SABORES.map((s, i) => (
          <SwiperSlide key={i}>
            <div className="sabor-card">
              <div className="sabor-thumb">
                <img src={s.img} alt={s.name} loading="lazy" />
              </div>
              <div className="sabor-body">
                <span className="sabor-tag">{s.tag}</span>
                <h3 className="sabor-name">{s.name}</h3>
                <p className="sabor-desc">{s.desc}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

// ─── ProcesoSection (from v2, v1 typography) ──────────────────────────────────

export const ProcesoSection = () => {
  const sectionRef = useRef(null);
  const vidRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on video
      gsap.to(vidRef.current, {
        yPercent: 10, scale: 1.05,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, scrub: true, start: 'top bottom', end: 'bottom top' }
      });

      // Storytelling entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true
        }
      });

      tl.from('.proceso-copy .label', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' })
        .from('.proceso-copy h2.title', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .from('.proceso-divider', { scaleX: 0, transformOrigin: 'left', duration: 0.6, ease: 'power3.out' }, '-=0.5')
        .from('.proceso-body-text', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .fromTo('.proceso-step',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out'
          }, '-=0.4');

      gsap.fromTo('.proceso-vid-wrap',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true }
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="proceso" ref={sectionRef}>
      <div className="container">
        <div className="proceso-grid">
          <div className="proceso-vid-wrap" ref={vidRef}>
            <LazyVideo src="/images/misu_product_24.mp4" />
            <div className="proceso-vid-overlay" />
          </div>

          <div className="proceso-copy">
            <span className="label">El Proceso</span>
            <h2 className="title" style={{ color: 'var(--cream)' }}>
              Artesanal, <br /> <em style={{ color: 'var(--pink)' }}>de principio a fin</em>
            </h2>
            <div className="proceso-divider" />
            <p className="proceso-body-text">
              Puedes ver a través de nuestro escaparate cómo elaboramos cada tiramisú.
              Sin secretos ni procesos industriales — solo ingredientes de calidad y
              manos expertas que trabajan con amor cada día.
            </p>
            <div className="proceso-steps">
              <div className="proceso-step">
                <div className="step-n">01</div>
                <div className="step-info">
                  <h4>Ingredientes Frescos</h4>
                  <p>Seleccionamos el mejor mascarpone, huevos frescos y bizcochos cada mañana, sin comprometer la calidad.</p>
                </div>
              </div>
              <div className="proceso-step">
                <div className="step-n">02</div>
                <div className="step-info">
                  <h4>Elaboración Artesanal</h4>
                  <p>Cada tiramisú se monta a mano, capa a capa, según la receta tradicional italiana con nuestro toque único.</p>
                </div>
              </div>
              <div className="proceso-step">
                <div className="step-n">03</div>
                <div className="step-info">
                  <h4>Listo Para Ti</h4>
                  <p>Para disfrutar en nuestro acogedor local o llevarlo a casa. Tu tiramisú perfecto te espera hoy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── GaleriaSection (from v2, v1 palette) ─────────────────────────────────────

export const GaleriaSection = () => {
  const sectionRef = useRef(null);
  const stripRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.galeria-item', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        opacity: 0, y: 50, scale: 0.9, stagger: 0.07, duration: 0.6, ease: 'back.out(1.3)',
      });

      // Auto-scrolling strip animation
      const strip = stripRef.current;
      const totalWidth = strip.scrollWidth / 2;
      gsap.to(strip, {
        x: -totalWidth,
        duration: 48,
        ease: 'none',
        repeat: -1,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Duplicate items for seamless loop
  const allItems = [...GALERIA_ITEMS, ...GALERIA_ITEMS];

  return (
    <section id="galeria" ref={sectionRef}>
      <div className="galeria-head">
        <span className="label center" style={{ display: 'flex', justifyContent: 'center' }}>Galería</span>
        <h2 className="title centered">Cada cucharada,<br /><em>una obra de arte</em></h2>
      </div>
      <div style={{ overflow: 'hidden' }}>
        <div className="galeria-strip" ref={stripRef}>
          {allItems.map((item, i) => (
            <div className="galeria-item" key={i}>
              {item.video ? (
                <LazyVideo src={item.video} />
              ) : (
                <img src={item.img} alt={item.alt} loading="lazy" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="galeria-scroll-hint">← Misú en imágenes →</div>
    </section>
  );
};

// ─── ResenasSection ───────────────────────────────────────────────────────────

export const ResenasSection = () => {
  const mq1Ref = useRef(null);
  const mq2Ref = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);

  useEffect(() => {
    const setupMarquee = (track, goLeft) => {
      const half = track.scrollWidth / 2;
      const dur = window.innerWidth < 650 ? 55 : 42;
      gsap.fromTo(track,
        { x: goLeft ? 0 : -half },
        { x: goLeft ? -half : 0, duration: dur, ease: 'none', repeat: -1 }
      );
    };

    const rafId = requestAnimationFrame(() => {
      setupMarquee(mq1Ref.current, true);
      setupMarquee(mq2Ref.current, false);
    });

    gsap.fromTo('#resenasHead',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '#resenas', start: 'top 72%' }
      });

    const slowDown = () => gsap.globalTimeline.timeScale(0.1);
    const speedUp = () => gsap.globalTimeline.timeScale(1);
    const r1 = row1Ref.current; const r2 = row2Ref.current;
    r1.addEventListener('mouseenter', slowDown); r1.addEventListener('mouseleave', speedUp);
    r2.addEventListener('mouseenter', slowDown); r2.addEventListener('mouseleave', speedUp);

    return () => {
      cancelAnimationFrame(rafId);
      r1.removeEventListener('mouseenter', slowDown); r1.removeEventListener('mouseleave', speedUp);
      r2.removeEventListener('mouseenter', slowDown); r2.removeEventListener('mouseleave', speedUp);
    };
  }, []);

  const renderCards = (reviews) =>
    [...reviews, ...reviews].map((r, i) => (
      <div className="rev-card" key={i}>
        <div className="rev-stars">★★★★★</div>
        <p className="rev-quote">"{r.text}"</p>
        <div className="rev-author">
          <div className="rev-avatar">{r.init}</div>
          <div>
            <div className="rev-name">{r.name}</div>
            <div className="rev-src">Google Maps</div>
          </div>
        </div>
      </div>
    ));

  return (
    <section id="resenas">
      <div className="resenas-head container" id="resenasHead">
        <span className="label center" style={{ display: 'flex' }}>Lo que dicen</span>
        <h2 className="title centered"><em>Voces</em> de nuestros<br />clientes</h2>
        <div className="resenas-kpis">
          <div>
            <div className="kpi-val" data-target="65" data-suffix="">0</div>
            <div className="kpi-lbl">Reseñas en Google</div>
          </div>
          <div>
            <div className="kpi-val" data-target="100" data-suffix="%">0</div>
            <div className="kpi-lbl">Sonrisas aseguradas</div>
          </div>
          <div>
            <div className="kpi-val" data-target="4.8" data-suffix="★">0</div>
            <div className="kpi-lbl">Puntuación media</div>
          </div>
        </div>
      </div>

      <div className="marquee-outer" ref={row1Ref}>
        <div className="marquee-track" ref={mq1Ref}>{renderCards(ROW1_REVIEWS)}</div>
      </div>
      <div className="marquee-outer" style={{ marginTop: '1.4rem' }} ref={row2Ref}>
        <div className="marquee-track" ref={mq2Ref}>{renderCards(ROW2_REVIEWS)}</div>
      </div>
    </section>
  );
};

// ─── LocalesSection (Encuentranos) — content from v2 ─────────────────────────

export const LocalesSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('#localesHead',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' }
        });

      gsap.fromTo('.local-visual',
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.locales-split', start: 'top 70%' }
        });

      gsap.fromTo('.local-info-content',
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 1.1, ease: 'power3.out', delay: 0.2,
          scrollTrigger: { trigger: '.locales-split', start: 'top 70%' }
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="locales" ref={sectionRef}>
      <div className="container">
        <div className="locales-head" id="localesHead">
          <span className="label center" style={{ display: 'flex' }}>Encuéntranos</span>
          <h2 className="title centered on-dark">Visítanos y vive la<br /><em>experiencia Misú</em></h2>
        </div>

        <div className="locales-split">
          <div className="local-visual">
            <div className="local-image-wrap">
              <img src="/images/misu_shop_1.jpg" alt="Local Misú Arganzuela" loading="lazy" />
              <div className="local-image-overlay" />
            </div>
            <div className="local-tag-float">
              <span>Arganzuela</span>
            </div>
          </div>

          <div className="local-info-content">
            <div className="local-details">
              <span className="new-pill">
                <img src="/images/misu_location_icon.png" className="local-icon-sm" alt="" />
                Nuestra Casa
              </span>
              <h3 className="local-title-main">Misú Arganzuela</h3>
              <p className="local-description">
                Ubicados en el corazón de Arganzuela, nuestro local es el lugar donde
                la magia ocurre cada día. Ven a vernos preparar tu tiramisú al momento
                y disfruta del aroma a café recién hecho.
              </p>

              <div className="local-meta-grid">
                <div className="meta-item">
                  <span className="meta-label">Dirección</span>
                  <p className="meta-value">C. de Jaime el Conquistador 40<br />Barrio de Arganzuela , Madrid</p>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Horario</span>
                  <div className="local-horario-mini">
                    <div className="local-hor-row"><strong>Domingo - Jueves</strong><span>9:00 – 20:00</span></div>
                    <div className="local-hor-row"><strong>Viernes y Sábados</strong><span>9:00 – 20:30</span></div>
                  </div>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Contacto</span>
                  <p className="meta-value">660 261 301<br />@misu_tiramissu</p>
                </div>
              </div>

              <div className="local-actions-row">
                <a href="https://maps.app.goo.gl/escszBPHrm9KkWoC9" target="_blank" rel="noopener noreferrer" className="btn-local-primary">
                  Cómo llegar →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── PideSection ──────────────────────────────────────────────────────────────

export const PideSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.pide-inner > *',
        { opacity: 0, y: 44 },
        {
          opacity: 1, y: 0, duration: .85, stagger: .1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 64%' }
        });

      gsap.to('.visit-cta', {
        boxShadow: '0 0 50px rgba(251,207,206,.55)',
        duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1
      });

      gsap.to('.pide-ghost', {
        x: '-8%', ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, scrub: true, start: 'top bottom', end: 'bottom top' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="pide" ref={sectionRef}>
      <img src="/images/misu_title.svg" className="pide-ghost" aria-hidden="true" alt="" />
      <div className="pide-inner">
        <span className="label light center" style={{ display: 'flex', justifyContent: 'center' }}>Tu tiramisú</span>
        <h2 className="pide-title">La felicidad,<br />donde tú <em>quieras</em></h2>
        <p className="pide-sub">
          Pídelo a domicilio en minutos o visítanos en nuestro local.
          El vasito de la felicidad siempre está cerca.
        </p>

        <div className="delivery-row">
          <a href="https://glovoapp.com/en/es/madrid/stores/misu-lautentico-tiramisu-madrid" target="_blank" rel="noreferrer" className="del-btn">
            <img src="/images/misu_uber_glovo.png" className="del-img" alt="Glovo" loading="lazy" />
            <div>
              <div className="del-label-top">Pide en</div>
              <div className="del-label-main">Glovo</div>
            </div>
          </a>
          <a href="https://www.ubereats.com/es/store/misu-lautentico-tiramisu/p39BwT-1UiOLMnsBHYHrDg" target="_blank" rel="noreferrer" className="del-btn">
            <img src="/images/misu_uber_eats.png" className="del-img" alt="Uber Eats" loading="lazy" />
            <div>
              <div className="del-label-top">Pide en</div>
              <div className="del-label-main">Uber Eats</div>
            </div>
          </a>
        </div>

        <div className="or-divider">o visítanos</div>

        <a href="#locales" className="visit-cta" onClick={e => { e.preventDefault(); document.querySelector('#locales').scrollIntoView({ behavior: 'smooth' }); }}>
          Ver nuestro local
        </a>

        <div className="social-row">
          <a href="https://www.instagram.com/misu_tiramissu" target="_blank" rel="noreferrer" className="soc-btn" title="Instagram">
            <img src="/images/misu_instagram.png" className="del-img" alt="Instagram" loading="lazy" />
          </a>
          <a href="https://www.tiktok.com/@misu_tiramissu" target="_blank" rel="noreferrer" className="soc-btn" title="TikTok">
            <img src="/images/misu_tiktok.png" className="del-img" alt="TikTok" loading="lazy" />
          </a>
          <a href="https://api.whatsapp.com/send/?phone=34660261301&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer" className="soc-btn" title="WhatsApp">
            <img src="/images/misu_whatsapp.png" className="del-img" alt="WhatsApp" loading="lazy" />
          </a>
        </div>
      </div>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────

export const Footer = () => (
  <footer>
    <span className="foot-logo">
      <img src="/images/misu_title.svg" alt="Misú" />
    </span>
    <span>© 2026 Misú L'autentico Tiramisú · Madrid · Todos los derechos reservados</span>
  </footer>
);

// ─── Default export ───────────────────────────────────────────────
export default Hero;


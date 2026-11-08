'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// ---- Translations ----
const translations = {
  si: {
    welcome: 'සාදර ඇරයුමයි !',
    coupleName: 'තිලිණි සහ දිල්ෂාන්',
    bride: 'තිලිණි',
    groom: 'දිල්ෂාන්',
    brideParents: 'බටුගහගේ දෝන ඉන්දික පෙරේරා මහතාගේ සහ\nකමනි චම්පිකා වීරක්කොඩි මහත්මියගේ\nආදරණීය දියණිය',
    groomParents: 'එදිරිප්පුලිගේ සිසිර රත්ත මහතාගේ සහ\nතමරා දමයන්ති පරගහවත්ත මහත්මියගේ\nආදරණීය පුතු',
    occasion: 'චාරිත්‍රානුකූලව අතිනත ගැනීමේ ශුභ මොහොත නිමිත්තෙන්',
    openInvitation: 'ආරාධනාව විවෘත කරන්න',
    invite: 'ආරාධනා',
    year: '2027',
    month: 'ජනවාරි',
    day: '29',
    dayName: 'සිකුරාදා',
    time: 'පෙ.ව. 8.30 සිට ප.ව. 4.00 දක්වා',
    venue: 'Hotel Golden River - Holiday Resort',
    venueDesc: 'වෙන්නප්පුව හෝටල් පරිශ්‍රයේ දී පැවැත්වෙන මංගල උත්සවයට\nඅපි ඔබට ගෞරවයෙන් ආරාධනා කරන්නෙමු.',
    poruwDesc: '(පෝරුවේ චාරිත්‍ර පෙ.ව. 08.59ට)',
    countdownTitle: 'සුභ මොහොත එළඹෙන තුරු',
    days: 'දින',
    hours: 'පැය',
    minutes: 'මිනිත්තු',
    seconds: 'තත්පර',
    eventDetails: 'උත්සව විස්තර',
    mangala: 'මංගල උත්සවය',
    mangalaTime: 'පෙ.ව. 8.30 සිට ප.ව. 4.00 දක්වා',
    poruwa: 'පෝරුවේ චාරිත්‍ර',
    poruwaTime: 'පෙ.ව. 08.59',
    saveDate: 'දිනය සුරකින්න',
    saveDateDesc: 'ඔබගේ දින දර්ශනයට එක් කරගන්න',
    location: 'උත්සව ස්ථානය',
    locationTitle: 'LOCATION',
    venueLabel: 'VENUE',
    venueAddress: 'වෙන්නප්පුව - කිරිමැටියාන පාර, වෙන්නප්පුව',
    directions: 'සිතියමෙන් බලන්න',
    rsvp: 'පැමිණීම දන්වන්න',
    rsvpDesc: 'ඔබගේ පැමිණීම අපට මහත් සතුටකි. කරුණාකර කලින් දන්වන්න.',
    fullName: 'සම්පූර්ණ නම',
    namePlaceholder: 'ඔබගේ නම',
    phone: 'ජංගම දූරකතන අංකය',
    attending: 'සහභාගී වෙනවාද?',
    willAttend: 'සතුටින් සහභාගී වෙමි',
    wontAttend: 'සහභාගී විය නොහැක',
    guestCount: 'පැමිණෙන ගණන',
    submit: 'පිළිතුර යවන්න',
    saveTheDate: 'SAVE THE DATE',
    dateDisplay: '29 . 01 . 27',
    closingMsg: 'ආදරයෙන්, දෙදෙනාගේ ආරාධනාවයි',
    brideContact: 'තිලිණි • +94 71 846 5208',
    groomContact: 'දිල්ෂාන් • +94 76 738 4003',
    createdBy: 'Created with ❤ by Zentravo.LK',
  },
  en: {
    welcome: 'You are Invited!',
    coupleName: 'Thilini & Dilshan',
    bride: 'Thilini',
    groom: 'Dilshan',
    brideParents: "Mr. Batugahage Dhon Indika Perera\n& Mrs. Kamani Champika Weerakkodi's\nBeloved Daughter",
    groomParents: "Mr. Edirippulige Sisira Rathna\n& Mrs. Thamara Damayanthi Paragahawaththa's\nBeloved Son",
    occasion: 'On the auspicious occasion of their Holy Matrimony',
    openInvitation: 'Open Invitation',
    invite: 'Invite',
    year: '2027',
    month: 'january',
    day: '29',
    dayName: 'Friday',
    time: '8:30 AM to 4:00 PM',
    venue: 'Hotel Golden River - Holiday Resort',
    venueDesc: 'We warmly request your gracious presence at the wedding reception\nat the hotel premises in Wennappuwa.',
    poruwDesc: '(Poruwa ceremony at 08:59 AM)',
    countdownTitle: 'Counting Down to the Auspicious Moment',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    eventDetails: 'Event Details',
    mangala: 'Wedding Reception',
    mangalaTime: '08:30 AM to 4:00 PM',
    poruwa: 'Poruwa Ceremony',
    poruwaTime: '08:59 AM',
    saveDate: 'Save the Date',
    saveDateDesc: 'Add to your calendar',
    location: 'Event Location',
    locationTitle: 'LOCATION',
    venueLabel: 'VENUE',
    venueAddress: 'Wennappuwa-Kirimetiyana Road, Wennappuwa',
    directions: 'Get Directions',
    rsvp: 'RSVP',
    rsvpDesc: 'Your presence means the world to us.\nKindly let us know in advance.',
    fullName: 'Full Name',
    namePlaceholder: 'Your name',
    phone: 'Mobile Number',
    attending: 'Will you attend?',
    willAttend: 'Joyfully Attend',
    wontAttend: 'Unable to Attend',
    guestCount: 'Number of Guests',
    submit: 'Send Response',
    saveTheDate: 'SAVE THE DATE',
    dateDisplay: '29 . 01 . 27',
    closingMsg: 'With love, from the couple',
    brideContact: 'Thilini • +94 71 846 5208',
    groomContact: 'Dilshan • +94 76 738 4003',
    createdBy: 'Created with ❤ by Zentravo.LK',
  }
};

// ---- Lotus SVG Component ----
function LotusDivider({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 80" className={`w-40 mx-auto ${className}`} fill="none">
      <path d="M100 10 C95 5, 85 5, 82 12 C79 5, 70 3, 68 10 C65 3, 60 5, 60 12 C58 8, 55 8, 55 15 C50 10, 48 18, 52 22 C50 28, 55 32, 60 30 C65 38, 75 40, 80 38 C85 45, 95 45, 100 42 C105 45, 115 45, 120 38 C125 40, 135 38, 140 30 C145 32, 150 28, 148 22 C152 18, 150 10, 145 15 C145 8, 142 8, 140 12 C140 5, 135 3, 132 10 C130 3, 121 5, 118 12 C115 5, 105 5, 100 10Z" fill="url(#lotusGrad)" stroke="#B8860B" strokeWidth="0.5" />
      <path d="M100 42 C95 50, 88 55, 82 60 M100 42 C105 50, 112 55, 118 60" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M60 30 C40 35, 20 38, 5 45 M140 30 C160 35, 180 38, 195 45" stroke="#B8860B" strokeWidth="1" strokeLinecap="round" />
      <path d="M50 48 C45 48, 42 52, 44 56 C46 60, 52 60, 55 57 M150 48 C155 48, 158 52, 156 56 C154 60, 148 60, 145 57" stroke="#B8860B" strokeWidth="1" fill="none" />
      <circle cx="100" cy="20" r="3" fill="#D4A843" />
      <defs>
        <linearGradient id="lotusGrad" x1="60" y1="5" x2="140" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4A843" />
          <stop offset="50%" stopColor="#B8860B" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ---- Mandala Corner ----
function CornerDecor({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={`absolute w-24 h-24 opacity-15 ${className}`} fill="none">
      <circle cx="5" cy="5" r="4" fill="#B8860B" fillOpacity="0.6" />
      <path d="M5 5 L40 5 Q75 5 75 40 L75 75" stroke="#B8860B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M5 5 L5 40 Q5 75 40 75 L75 75" stroke="#B8860B" strokeWidth="1" fill="none" strokeLinecap="round" strokeDasharray="4 3" />
      <circle cx="75" cy="75" r="4" fill="#B8860B" fillOpacity="0.4" />
    </svg>
  );
}

// ---- Countdown Timer Hook ----
function useCountdown(targetTimestamp: number) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const diff = targetTimestamp - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetTimestamp]);

  return timeLeft;
}

// ---- Intersection Observer hook ----
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ---- Section Wrapper ----
function RevealSection({ children, id, className = '' }: { children: React.ReactNode, id?: string, className?: string }) {
  const ref = useReveal();
  return (
    <div ref={ref} id={id} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

// ============ MAIN PAGE ============
export default function InvitationPage() {
  const [lang, setLang] = useState<'si' | 'en'>('si');
  const [opened, setOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeNav, setActiveNav] = useState('home');
  const [rsvpData, setRsvpData] = useState({ name: '', countryCode: '+94', phone: '', attending: 'yes', guests: 1 });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const audio = new Audio('/music.mp3');
    audio.loop = true;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
    } else {
      audio.play().then(() => setMusicPlaying(true)).catch(() => {});
    }
  };

  const handleOpenInvitation = () => {
    setOpened(true);
    const audio = audioRef.current;
    if (audio) {
      audio.play().then(() => setMusicPlaying(true)).catch(() => {});
    }
  };

  const weddingTimestamp = new Date('2027-01-29T11:00:00+05:30').getTime();
  const countdown = useCountdown(weddingTimestamp);

  const isSinhala = lang === 'si';

  const handleRSVPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: rsvpData.name,
          phone: `${rsvpData.countryCode} ${rsvpData.phone}`.trim(),
          attending: rsvpData.attending || 'yes',
          guests: rsvpData.guests,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!opened) return;
    const ids = ['home', 'countdown', 'events', 'location', 'rsvp'];
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveNav(e.target.id === 'events' ? 'countdown' : e.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [opened]);

  const scrollToSection = (id: string) => {
    setActiveNav(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // ---- LANDING SCREEN ----
  if (!opened) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #F5EFE6 0%, #EDE4D5 100%)' }}>
        {/* Mandala BG */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[min(700px,95vw)] h-[min(700px,95vw)] shrink-0 aspect-square rounded-full opacity-25 animate-spin-slow" style={{ backgroundImage: "url('/mandala.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
        </div>
        {/* Corner decors */}
        <CornerDecor className="top-0 left-0" />
        <CornerDecor className="bottom-0 right-0 rotate-180" />
        <CornerDecor className="top-0 right-0 -scale-x-100" />
        <CornerDecor className="bottom-0 left-0 scale-y-[-1]" />

        {/* Small lotus tiles in background */}
        <div className="absolute top-10 left-10 text-5xl opacity-5 text-yellow-700">🪷</div>
        <div className="absolute top-20 right-20 text-4xl opacity-5 text-yellow-700">🪷</div>
        <div className="absolute bottom-20 left-20 text-3xl opacity-5 text-yellow-700">🪷</div>
        <div className="absolute bottom-10 right-10 text-4xl opacity-5 text-yellow-700">🪷</div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-md mx-auto">
          <div className="animate-float mb-4">
            <Image src="/lotus.jpg" alt="Lotus" width={120} height={80} className="mx-auto rounded-full object-cover" style={{ maxHeight: '80px', objectPosition: 'center top' }} />
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl mb-4 text-gold-gradient section-enter"
            style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-playfair)', lineHeight: 1.4 }}
          >
            {t.welcome}
          </h1>

          <p
            className="text-2xl md:text-3xl mb-10 section-enter delay-200"
            style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-playfair)', color: '#7B5E37' }}
          >
            {t.coupleName}
          </p>

          <button
            onClick={handleOpenInvitation}
            className="btn-gold section-enter delay-400"
            style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-playfair)', fontSize: '1.1rem' }}
          >
            {t.openInvitation}
          </button>
        </div>

        {/* Language toggle */}
        <div className="fixed top-4 right-4 z-50">
          <div className="lang-toggle">
            <button
              className={`lang-btn ${lang === 'si' ? 'active' : ''}`}
              onClick={() => setLang('si')}
              style={{ fontFamily: 'var(--font-sinhala)', fontSize: '0.9rem' }}
            >
              සිං
            </button>
            <button
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => setLang('en')}
              style={{ fontFamily: 'var(--font-cormorant)', fontSize: '0.9rem', letterSpacing: '0.05em' }}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---- MAIN INVITATION ----
  return (
    <div className="relative min-h-screen" style={{ background: 'linear-gradient(160deg, #F5EFE6 0%, #EDE4D5 50%, #F0E8D8 100%)' }}>
      {/* Fixed: Language toggle */}
      <div className="fixed top-4 right-4 z-50">
        <div className="lang-toggle">
          <button className={`lang-btn ${lang === 'si' ? 'active' : ''}`} onClick={() => setLang('si')} style={{ fontFamily: 'var(--font-sinhala)', fontSize: '0.9rem' }}>සිං</button>
          <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => setLang('en')} style={{ fontFamily: 'var(--font-cormorant)', fontSize: '0.9rem' }}>EN</button>
        </div>
      </div>

      {/* Fixed: Music button */}
      <button
        className="music-btn fixed right-4 z-50 animate-pulse-gold"
        style={{ bottom: '90px' }}
        onClick={toggleMusic}
        aria-label="Toggle music"
      >
        {musicPlaying ? (
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
        ) : (
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55A4 4 0 1014 17V7h4V3h-6z" /></svg>
        )}
      </button>

      {/* Fixed: Bottom nav */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="bottom-nav flex gap-1">
          {[
            { id: 'home', icon: <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg> },
            { id: 'countdown', icon: <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" /></svg> },
            { id: 'location', icon: <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" /></svg> },
            { id: 'rsvp', icon: <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg> },
          ].map(({ id, icon }) => (
            <button
              key={id}
              className={`nav-btn ${activeNav === id ? 'active' : ''}`}
              onClick={() => scrollToSection(id)}
              aria-label={id}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* ===== SECTION 1: HERO ===== */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-start pt-0 pb-20 px-4 overflow-hidden">
        {/* Mandala bg */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <Image src="/mandala.jpg" alt="Mandala" width={700} height={700} className="opacity-10 w-[min(700px,95vw)] h-[min(700px,95vw)] shrink-0 aspect-square object-cover rounded-full" />
        </div>

        {/* Corner decorations */}
        <CornerDecor className="top-0 left-0" />
        <CornerDecor className="top-0 right-0 -scale-x-100" />

        {/* Big half mandala pinned to the top, slowly rotating */}
        <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(560px,115vw)] h-[min(280px,57.5vw)] overflow-hidden pointer-events-none section-enter">
          <Image src="/mandala.jpg" alt="" width={700} height={700} priority className="w-full aspect-square -mt-[50%] object-cover rounded-full opacity-90 animate-spin-slow" />
        </div>

        {/* Lotus & small decorations scattered */}
        {['top-8 left-8', 'top-16 right-12', 'bottom-16 left-12', 'bottom-8 right-8'].map((pos, i) => (
          <div key={i} className={`absolute ${pos} text-4xl opacity-5 text-yellow-800`}>🪷</div>
        ))}

        {/* Content */}
        <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
          {/* spacer so content starts below the half mandala */}
          <div aria-hidden className="h-[min(270px,52vw)]" />

          <h1
            className="text-4xl sm:text-5xl md:text-6xl mt-2 mb-8 text-gold-gradient section-enter delay-100"
            style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-playfair)', lineHeight: 1.5 }}
          >
            {t.welcome}
          </h1>

          {/* Bride & Groom names */}
          <div className="grid grid-cols-2 gap-3 sm:gap-8 mb-8 section-enter delay-200 items-end">
            <div className="text-right flex flex-col justify-end">
              <p className="text-[11px] sm:text-[13px] md:text-sm leading-relaxed mb-2 whitespace-pre-line sm:whitespace-pre" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', color: '#7B5E37', lineHeight: 1.8 }}>
                {t.brideParents}
              </p>
              <h2 className="text-3xl md:text-4xl text-gold-gradient" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-playfair)', lineHeight: 1.5 }}>
                {t.bride}
              </h2>
            </div>
            <div className="text-left flex flex-col justify-end">
              <p className="text-[11px] sm:text-[13px] md:text-sm leading-relaxed mb-2 whitespace-pre-line sm:whitespace-pre" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', color: '#7B5E37', lineHeight: 1.8 }}>
                {t.groomParents}
              </p>
              <h2 className="text-3xl md:text-4xl text-gold-gradient" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-playfair)', lineHeight: 1.5 }}>
                {t.groom}
              </h2>
            </div>
          </div>

          {/* Couple illustration: blended into the page, full image (no crop / box) */}
          <div className="relative section-enter delay-300 mx-auto w-full max-w-[420px]">
            <div aria-hidden className="absolute inset-0 -z-10 scale-110" style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)' }} />
            <Image
              src="/couple.jpg"
              alt="Couple"
              width={896}
              height={1200}
              priority
              className="w-full h-auto"
              style={{
                mixBlendMode: 'multiply',
                WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 55%, transparent 100%)',
                maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, #000 55%, transparent 100%)',
              }}
            />
          </div>

          {/* Occasion text */}
          <p className="text-base mt-8 mb-6 section-enter delay-400" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', color: '#7B5E37', lineHeight: 1.9, fontSize: '1.05rem' }}>
            {t.occasion}
          </p>

          {/* Date display */}
          <div className="relative section-enter delay-400">
            <div className="gold-line w-32" />
            <div className="text-5xl sm:text-6xl font-bold my-3 text-gold-gradient" style={{ fontFamily: 'var(--font-playfair)', letterSpacing: '0.05em' }}>
              {t.year}
            </div>
            <div className="gold-line w-32" />
            <div className="flex items-center justify-center gap-4 mt-3 mb-2">
              <span className="text-base" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', color: '#7B5E37' }}>{t.month}</span>
              <span className="text-5xl sm:text-6xl font-bold text-gold-gradient" style={{ fontFamily: 'var(--font-playfair)' }}>{t.day}</span>
              <span className="text-base" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', color: '#7B5E37' }}>{t.dayName}</span>
            </div>
            <p className="text-sm mb-1" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', color: '#7B5E37', fontSize: '0.95rem' }}>{t.time}</p>
          </div>

          {/* Venue */}
          <div className="mt-8 section-enter delay-500">
            <h3 className="text-2xl font-semibold text-gold-gradient" style={{ fontFamily: 'var(--font-playfair)' }}>
              {t.venue}
            </h3>
            <p className="mt-3 text-sm leading-relaxed" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', color: '#7B5E37', lineHeight: 2, whiteSpace: 'pre-line' }}>
              {t.venueDesc}
            </p>
            <p className="mt-1 text-sm" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', color: '#B8860B', fontStyle: 'italic' }}>
              {t.poruwDesc}
            </p>
          </div>
        </div>
      </section>

      {/* ===== SECTION 2: COUNTDOWN ===== */}
      <section id="countdown" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('/mandala.jpg')", backgroundSize: '400px', backgroundRepeat: 'repeat', backgroundPosition: 'center' }} />

        <RevealSection className="max-w-2xl mx-auto text-center relative z-10">
          <p className="text-xs tracking-[0.3em] mb-3" style={{ color: '#B8860B', fontFamily: 'var(--font-cormorant)' }}>COUNTDOWN</p>
          <h2 className="text-3xl md:text-4xl mb-4 text-gold-gradient" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-playfair)', lineHeight: 1.5 }}>
            {t.countdownTitle}
          </h2>
          <LotusDivider className="mb-8" />

          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xl mx-auto">
            {[
              { value: countdown.days, label: t.days },
              { value: countdown.hours, label: t.hours },
              { value: countdown.minutes, label: t.minutes },
              { value: countdown.seconds, label: t.seconds },
            ].map(({ value, label }) => (
              <div key={label} className="countdown-card">
                <div className="text-3xl sm:text-5xl font-bold text-gold-gradient mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {String(value).padStart(2, '0')}
                </div>
                <div className="w-6 h-px bg-yellow-700 mx-auto mb-2 opacity-40" />
                <p className="text-sm" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', color: '#7B5E37' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', color: '#8B7355' }}>
            2027 {isSinhala ? 'ජනවාරි' : 'January'} 29 {isSinhala ? 'සිකුරාදා' : 'Friday'}
          </p>
        </RevealSection>
      </section>

      {/* ===== SECTION 3: EVENT DETAILS ===== */}
      <section id="events" className="py-20 px-4 relative">
        <RevealSection className="max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] mb-3" style={{ color: '#B8860B', fontFamily: 'var(--font-cormorant)' }}>EVENT DETAILS</p>
          <h2 className="text-3xl md:text-4xl mb-3 text-gold-gradient" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-playfair)', lineHeight: 1.5 }}>
            {t.eventDetails}
          </h2>
          <LotusDivider className="mb-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
            {/* Mangala Card */}
            <div className="event-card p-6">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #D4A843, #B8860B)' }}>
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.04 10 9c0 3.31-2.69 6-6 6h-1.77c-.28 0-.5.22-.5.5 0 .12.05.23.13.33.41.47.64 1.06.64 1.67 0 1.38-1.12 2.5-2.5 2.5zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8c.28 0 .5-.22.5-.5 0-.16-.08-.28-.14-.35-.41-.46-.63-1.05-.63-1.65 0-1.38 1.12-2.5 2.5-2.5H16c2.21 0 4-1.79 4-4 0-3.86-3.59-7-8-7z" /></svg>
              </div>
              <h3 className="text-lg mb-1 text-gold-gradient" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-playfair)', lineHeight: 1.6 }}>
                {t.mangala}
              </h3>
              <p className="text-sm mb-2" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', color: '#7B5E37', lineHeight: 1.8 }}>
                {t.mangalaTime}
              </p>
              <div className="w-8 h-px mx-auto mb-2" style={{ background: 'linear-gradient(to right, transparent, #B8860B, transparent)' }} />
              <p className="text-xs" style={{ fontFamily: 'var(--font-cormorant)', color: '#8B7355' }}>
                Hotel Golden River - Holiday Resort, Wennappuwa
              </p>
            </div>

            {/* Poruwa Card */}
            <div className="event-card p-6">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #D4A843, #B8860B)' }}>
                <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M3 9v11h7V9H3zm0-4v2h7V5H3zm11-2v16h7V3h-7zm-2 6H8v1h4v-1zm0-3H8v1h4V6zm0 6H8v1h4v-1z" /></svg>
              </div>
              <h3 className="text-lg mb-1 text-gold-gradient" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-playfair)', lineHeight: 1.6 }}>
                {t.poruwa}
              </h3>
              <p className="text-sm mb-2" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', color: '#7B5E37', lineHeight: 1.8 }}>
                {t.poruwaTime}
              </p>
              <div className="w-8 h-px mx-auto mb-2" style={{ background: 'linear-gradient(to right, transparent, #B8860B, transparent)' }} />
              <p className="text-xs" style={{ fontFamily: 'var(--font-cormorant)', color: '#8B7355' }}>
                Hotel Golden River - Holiday Resort, Wennappuwa
              </p>
            </div>
          </div>

          {/* Save the date button */}
          <button
            className="w-full max-w-md mx-auto flex items-center gap-4 px-6 py-4 rounded-2xl text-left transition-all hover:shadow-lg cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(184,134,11,0.2)', backdropFilter: 'blur(8px)' }}
            onClick={() => {
              const icsContent = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Invitation//Wedding//EN', 'BEGIN:VEVENT', 'UID:thilini-dilshan-20270129@invitation', 'DTSTAMP:20270114T000000Z', 'DTSTART:20270129T053000Z', 'DTEND:20270129T103000Z', 'SUMMARY:Thilini & Dilshan Wedding', 'LOCATION:Hotel Golden River - Holiday Resort\\, Wennappuwa', 'DESCRIPTION:Wedding of Thilini and Dilshan', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
              const blob = new Blob([icsContent], { type: 'text/calendar' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a'); a.href = url; a.download = 'wedding.ics'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
            }}
          >
            <div className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #D4A843, #B8860B)' }}>
              <svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" /></svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', color: '#5C3D1E', lineHeight: 1.8 }}>{t.saveDate}</p>
              <p className="text-xs" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', color: '#8B7355', lineHeight: 1.8 }}>{t.saveDateDesc}</p>
            </div>
            <svg width="20" height="20" fill="#B8860B" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg>
          </button>
        </RevealSection>
      </section>

      {/* ===== SECTION 4: LOCATION ===== */}
      <section id="location" className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('/mandala.jpg')", backgroundSize: '300px', backgroundRepeat: 'repeat' }} />

        <RevealSection className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] mb-3" style={{ color: '#B8860B', fontFamily: 'var(--font-cormorant)' }}>LOCATION</p>
            <h2 className="text-3xl md:text-4xl mb-3 text-gold-gradient" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-playfair)', lineHeight: 1.5 }}>
              {t.location}
            </h2>
            <LotusDivider />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Hotel card */}
            <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', border: '1px solid rgba(184,134,11,0.15)' }}>
              <div className="h-48 overflow-hidden">
                <Image src="/hotel.jpg" alt="Hotel Golden River - Holiday Resort" width={400} height={200} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 text-center">
                <p className="text-xs tracking-widest mb-1" style={{ color: '#B8860B', fontFamily: 'var(--font-cormorant)' }}>{t.venueLabel}</p>
                <h3 className="text-xl font-semibold text-gold-gradient mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Hotel Golden River - Holiday Resort
                </h3>
                <p className="text-sm" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', color: '#7B5E37', lineHeight: 1.8 }}>
                  {t.venueAddress}
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden bg-white/60" style={{ border: '1px solid rgba(184,134,11,0.15)' }}>
              <iframe
                src="https://maps.google.com/maps?q=Hotel+Golden+River+-+Holiday+Resort+Wennappuwa&output=embed"
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hotel Golden River - Holiday Resort Map"
              />
              <div className="p-4">
                <a
                  href="https://share.google/NOGdGnQxT7q8WJsWc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full flex items-center justify-center gap-2 text-sm py-3"
                >
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" /></svg>
                  {t.directions}
                </a>
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ===== SECTION 5: RSVP ===== */}
      <section id="rsvp" className="py-20 px-4 relative">
        <RevealSection className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <p className="text-xs tracking-[0.3em] mb-3" style={{ color: '#B8860B', fontFamily: 'var(--font-cormorant)' }}>RSVP</p>
            <h2 className="text-3xl md:text-4xl mb-3 text-gold-gradient" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-playfair)', lineHeight: 1.5 }}>
              {t.rsvp}
            </h2>
            <LotusDivider className="mb-4" />
            <p className="text-sm" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', color: '#7B5E37', whiteSpace: 'pre-line', lineHeight: 2 }}>
              {t.rsvpDesc}
            </p>
          </div>

          {submitted ? (
            <div className="rsvp-form p-8 sm:p-10 text-center">
              <div className="text-6xl mb-4">🌸</div>
              <h3 className="text-2xl text-gold-gradient mb-2" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-playfair)', lineHeight: 1.5 }}>
                {isSinhala ? 'ස්තූතියි!' : 'Thank You!'}
              </h3>
              <p className="text-sm" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', color: '#7B5E37', lineHeight: 2 }}>
                {isSinhala ? 'ඔබගේ පිළිතුර ලැබුනා!' : 'Your response has been received!'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleRSVPSubmit} className="rsvp-form p-6 sm:p-8">
              {/* Full Name */}
              <div className="mb-5">
                <label className="form-label" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', lineHeight: 1.8 }}>
                  {t.fullName}
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder={t.namePlaceholder}
                  value={rsvpData.name}
                  onChange={e => setRsvpData({ ...rsvpData, name: e.target.value })}
                  required
                  style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)' }}
                />
              </div>

              {/* Phone */}
              <div className="mb-5">
                <label className="form-label" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', lineHeight: 1.8 }}>
                  {t.phone}
                </label>
                <div className="flex gap-2">
                  <select
                    className="form-input w-28"
                    value={rsvpData.countryCode}
                    onChange={e => setRsvpData({ ...rsvpData, countryCode: e.target.value })}
                    style={{ fontFamily: 'var(--font-cormorant)' }}
                  >
                    <option value="+94">LK +94</option>
                    <option value="+1">US +1</option>
                    <option value="+44">UK +44</option>
                    <option value="+61">AU +61</option>
                  </select>
                  <input
                    type="tel"
                    className="form-input flex-1"
                    placeholder="77 XXX XXXX"
                    value={rsvpData.phone}
                    onChange={e => setRsvpData({ ...rsvpData, phone: e.target.value })}
                    style={{ fontFamily: 'var(--font-cormorant)' }}
                  />
                </div>
              </div>

              {/* Attending */}
              <div className="mb-5">
                <label className="form-label" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', lineHeight: 1.8 }}>
                  {t.attending}
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    className={`attend-btn ${rsvpData.attending === 'yes' ? 'selected' : ''}`}
                    onClick={() => setRsvpData({ ...rsvpData, attending: 'yes' })}
                    style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', lineHeight: 1.8 }}
                  >
                    {t.willAttend}
                  </button>
                  <button
                    type="button"
                    className={`attend-btn ${rsvpData.attending === 'no' ? 'selected' : ''}`}
                    onClick={() => setRsvpData({ ...rsvpData, attending: 'no' })}
                    style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', lineHeight: 1.8 }}
                  >
                    {t.wontAttend}
                  </button>
                </div>
              </div>

              {/* Guest count */}
              <div className="mb-8">
                <label className="form-label" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', lineHeight: 1.8 }}>
                  {t.guestCount}
                </label>
                <div className="flex items-center justify-center gap-6">
                  <button type="button" className="counter-btn" onClick={() => setRsvpData(d => ({ ...d, guests: Math.max(1, d.guests - 1) }))}>−</button>
                  <span className="text-2xl font-bold text-gold-gradient" style={{ fontFamily: 'var(--font-playfair)', minWidth: '2rem', textAlign: 'center' }}>
                    {rsvpData.guests}
                  </span>
                  <button type="button" className="counter-btn" onClick={() => setRsvpData(d => ({ ...d, guests: Math.min(10, d.guests + 1) }))}>+</button>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-60"
                style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', fontSize: '1rem' }}
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                {submitting ? (isSinhala ? 'යවමින් පවතී...' : 'Sending...') : t.submit}
              </button>
            </form>
          )}
        </RevealSection>
      </section>

      {/* ===== SECTION 6: FOOTER / SAVE THE DATE ===== */}
      <footer className="relative pt-20 pb-36 px-4 text-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #7B5E37 0%, #5C3D1E 100%)' }}>
        {/* Mandala background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <Image src="/mandala.jpg" alt="Mandala" width={500} height={500} className="w-[min(500px,95vw)] h-[min(500px,95vw)] shrink-0 aspect-square object-cover rounded-full animate-spin-slow" />
        </div>

        {/* Decorative dots */}
        {[...Array(6)].map((_, i) => (
          <div key={i} className="absolute w-1.5 h-1.5 rounded-full opacity-30"
            style={{ background: '#D4A843', left: `${10 + i * 15}%`, top: i % 2 === 0 ? '15%' : '75%' }} />
        ))}

        <RevealSection className="relative z-10">
          <p className="text-xs tracking-[0.4em] mb-6" style={{ color: 'rgba(212,168,67,0.8)', fontFamily: 'var(--font-cormorant)' }}>
            {t.saveTheDate}
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)', color: 'rgba(255,255,255,0.95)', letterSpacing: '0.05em' }}>
            {t.dateDisplay}
          </h2>
          <p className="text-base mb-8" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', color: 'rgba(255,255,255,0.75)', lineHeight: 2 }}>
            {t.closingMsg}
          </p>

          <LotusDivider className="mb-8" />

          <h3 className="text-3xl mb-8 text-gold-gradient" style={{ fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-playfair)', lineHeight: 1.5 }}>
            {t.bride} {isSinhala ? 'සහ' : '&'} {t.groom}
          </h3>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="tel:+94718950006"
              className="flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:bg-white/20"
              style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.9)', fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', lineHeight: 1.8 }}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
              {t.brideContact}
            </a>
            <a
              href="tel:+94718134962"
              className="flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:bg-white/20"
              style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.9)', fontFamily: isSinhala ? 'var(--font-sinhala)' : 'var(--font-cormorant)', lineHeight: 1.8 }}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
              {t.groomContact}
            </a>
          </div>

          <div className="mt-12 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-cormorant)', letterSpacing: '0.1em' }}>
              {t.createdBy}
            </p>
          </div>
        </RevealSection>
      </footer>
    </div>
  );
}

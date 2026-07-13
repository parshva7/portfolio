document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const links = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const sections = [...document.querySelectorAll('main section[id]')];

  const setHeader = () => header.classList.toggle('scrolled', window.scrollY > 12);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  links.forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  const portraitFlip = document.querySelector('.portrait-flip');
  const portraitName = portraitFlip?.querySelector('.portrait-initials');
  if (portraitName && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const name = 'Parshva';
    let index = 0;
    let deleting = false;
    const typeName = () => {
      portraitName.textContent = name.slice(0, index);
      if (!deleting && index < name.length) {
        index += 1;
        window.setTimeout(typeName, 180);
      } else if (!deleting) {
        deleting = true;
        window.setTimeout(typeName, 1500);
      } else if (index > 0) {
        index -= 1;
        window.setTimeout(typeName, 95);
      } else {
        deleting = false;
        window.setTimeout(typeName, 420);
      }
    };
    portraitName.textContent = '';
    typeName();
  }
  portraitFlip?.addEventListener('click', () => {
    if (portraitFlip.classList.contains('is-flipped')) {
      portraitFlip.classList.remove('is-flipped');
      portraitFlip.setAttribute('aria-pressed', 'false');
      portraitFlip.setAttribute('aria-label', "Show Parshva's photo");
      return;
    }

    portraitFlip.disabled = true;
    portraitFlip.classList.add('is-revealing');
    portraitFlip.setAttribute('aria-label', 'Revealing Parshva’s photo');
    window.setTimeout(() => {
      portraitFlip.classList.remove('is-revealing');
      portraitFlip.classList.add('is-flipped');
      portraitFlip.disabled = false;
      portraitFlip.setAttribute('aria-pressed', 'true');
      portraitFlip.setAttribute('aria-label', "Show Parshva's name");
    }, 850);
  });

  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  }), { threshold: .14 });
  document.querySelectorAll('.reveal').forEach(item => revealObserver.observe(item));

  const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  }), { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => navObserver.observe(section));

  const roles = ['AI engineering', 'full-stack development', 'thoughtful interfaces', 'scalable systems', 'useful products'];
  const roleText = document.getElementById('role-text');
  let roleIndex = 0;
  setInterval(() => { roleIndex = (roleIndex + 1) % roles.length; roleText.animate([{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(-5px)' }, { opacity: 0, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 420, easing: 'ease-out' }); roleText.textContent = roles[roleIndex]; }, 2800);

  const form = document.getElementById('contact-form');
  const recipientEmail = 'parshav687@gmail.com'; // Replace this with your email address.
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = `Portfolio enquiry from ${data.get('name')}`;
    const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\nMessage:\n${data.get('message')}`;
    window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    form.querySelector('.form-status').textContent = 'Your email app is opening…';
  });
});

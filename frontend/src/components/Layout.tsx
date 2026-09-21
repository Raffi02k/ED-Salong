import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { site, navigation } from "../content/siteContent";
import { PageMeta } from "./PageMeta";
function Brand() {
  const loc = useLocation();
  return (
    <Link
      to="/"
      className="brand"
      aria-label="ED Frisör, till startsidan"
      onClick={() => {
        if (loc.pathname === "/")
          window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <img
        className="brand-logo"
        src="/images/ed-frisor-logo-cropped.png"
        alt=""
      />
      <span className="brand-ed">
        ED<span className="brand-star">✦</span>
      </span>
      <span className="brand-right">
        <strong>FRISÖR</strong>
        <small>TROLLHÄTTAN</small>
      </span>
    </Link>
  );
}
export function Layout() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const menu = useRef<HTMLDialogElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
    if (loc.hash)
      requestAnimationFrame(() =>
        document.getElementById(loc.hash.slice(1))?.scrollIntoView(),
      );
    else window.scrollTo(0, 0);
  }, [loc.pathname, loc.hash]);
  useEffect(() => {
    if (open) {
      menu.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      menu.current?.close();
      document.body.style.overflow = "";
    }
  }, [open]);
  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    [],
  );
  return (
    <>
      <PageMeta />
      <a className="skip" href="#main">
        Hoppa till innehållet
      </a>
      <header className="header">
        <div className="header-inner wrap">
          <Brand />
          <nav className="desktop-nav" aria-label="Huvudmeny">
            {navigation.map(([url, label]) => (
              <NavLink key={url} to={url}>
                {label}
              </NavLink>
            ))}
          </nav>
          <Link className="button small header-book" to="/boka">
            Boka klippning <span>↗</span>
          </Link>
          <button
            ref={button}
            className="menu-button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            Meny ☰
          </button>
        </div>
      </header>
      <dialog
        ref={menu}
        id="mobile-menu"
        className="mobile-menu"
        onCancel={() => setOpen(false)}
        onClose={() => {
          setOpen(false);
          button.current?.focus();
        }}
      >
        <div className="mobile-top">
          <Brand />
          <button
            className="menu-button"
            onClick={() => setOpen(false)}
            aria-label="Stäng meny"
          >
            Stäng ×
          </button>
        </div>
        <nav aria-label="Mobilmeny">
          {navigation.map(([url, label]) => (
            <NavLink key={url} to={url} onClick={() => setOpen(false)}>
              {label} ↗
            </NavLink>
          ))}
          <Link to="/recensioner" onClick={() => setOpen(false)}>
            Omdömen ↗
          </Link>
          <Link to="/boka" onClick={() => setOpen(false)}>
            Boka klippning ↗
          </Link>
        </nav>
        <a href={site.phoneHref}>{site.phone}</a>
        <p>{site.address} · Trollhättan</p>
      </dialog>
      <main id="main" className="page-transition" key={loc.pathname}>
        <Outlet />
      </main>
      <footer className="footer">
        <div className="wrap footer-grid">
          <div>
            <Brand />
            <p>
              Hår. Skägg. Din stil.
              <br />
              På Österlånggatan i Trollhättan.
            </p>
            <a href={site.phoneHref} className="footer-phone">
              {site.phone}
            </a>
          </div>
          <div>
            <h3>Hitta rätt</h3>
            {navigation.map(([u, l]) => (
              <Link key={u} to={u}>
                {l}
              </Link>
            ))}
            <Link to="/recensioner">Omdömen</Link>
          </div>
          <div>
            <h3>Hitta hit</h3>
            <a href={site.directionsUrl} target="_blank" rel="noreferrer">
              {site.address}, {site.postcode} {site.city} ↗
            </a>
            <h3 className="mt">Öppettider</h3>
            {site.hours.map((h) => (
              <p key={h.label}>
                {h.label}: {h.value}
              </p>
            ))}
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>
            © {new Date().getFullYear()} ED Frisör · Presentationsdemo
          </span>
          <Link to="/integritet">Integritet & demoinformation</Link>
          <a
            className="credit"
            href="https://mediamagnet.se"
            target="_blank"
            rel="noreferrer"
          >
            Byggd av{" "}
            <img
              src="/images/mediamagnet_logo_with_text_vit.png"
              alt="MediaMagnet"
              width="120"
              height="28"
            />
          </a>
        </div>
      </footer>
      <div className="mobile-cta">
        <a href={site.phoneHref}>Ring salongen</a>
        <Link to="/boka">Boka klippning ↗</Link>
      </div>
    </>
  );
}

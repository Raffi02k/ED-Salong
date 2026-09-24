import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getMetadata } from "../content/seo";
import { site } from "../content/siteContent";
export function PageMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const m = getMetadata(pathname);
    document.title = m.title;
    for (const [key, val] of Object.entries({
      description: m.description,
      robots: m.noindex ? "noindex, nofollow" : "index, follow",
      "og:title": m.title,
      "og:description": m.description,
      "og:url": m.canonical,
      "og:image": site.url + "/og.jpg",
      "og:image:secure_url": site.url + "/og.jpg",
      "og:image:type": "image/jpeg",
      "og:image:width": "1024",
      "og:image:height": "494",
      "og:image:alt": `${site.name} - ${m.title}`,
      "twitter:title": m.title,
      "twitter:description": m.description,
      "twitter:image": site.url + "/og.jpg",
      "twitter:image:alt": `${site.name} - ${m.title}`,
    })) {
      const attr = key.startsWith("og:") ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.append(el);
      }
      el.setAttribute("content", val);
    }
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.append(link);
    }
    link.setAttribute("href", m.canonical);
  }, [pathname]);
  return null;
}

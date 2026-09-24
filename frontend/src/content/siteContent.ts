export const site = {
  name: "ED Frisör",
  city: "Trollhättan",
  address: "Österlånggatan 38",
  postcode: "461 31",
  phone: "073-423 62 22",
  phoneHref: "tel:+46734236222",
  url: (
    import.meta.env.VITE_SITE_URL ||
    "https://ed-salong.vercel.app"
  ).replace(/\/$/, ""),
  indexable: import.meta.env.VITE_INDEXABLE === "true",
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=ED+Fris%C3%B6r+%C3%96sterl%C3%A5nggatan+38+Trollh%C3%A4ttan",
  hours: [
    { label: "Måndag–fredag", value: "10.00–18.00" },
    { label: "Lördag", value: "Ring för aktuell tid" },
    { label: "Söndag", value: "Stängt" },
  ],
};
export const navigation = [
  ["/tjanster", "Tjänster"],
  ["/prislista", "Priser"],
  ["/galleri", "Galleri"],
  ["/om-oss", "Om oss"],
  ["/kontakt", "Kontakt"],
];

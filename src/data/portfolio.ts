import { Project } from '../types';

export const projects: Project[] = [
  {
    id: "villa-chukum",
    title: {
      es: "Villa Chukum",
      en: "Villa Chukum"
    },
    category: {
      es: "Residencial de Lujo",
      en: "Luxury Residential"
    },
    location: {
      es: "Selva Alta, Tulum, México",
      en: "High Jungle, Tulum, Mexico"
    },
    year: "2024",
    area: "650 m²",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    description: {
      es: "Un santuario brutalista esculpido entre el follaje de la selva maya. Muros monolíticos de concreto enriquecidos con Chukum ancestral y terrazas suspendidas para una ventilación pasiva absoluta.",
      en: "A brutalist sanctuary sculpted into the Mayan jungle foliage. Monolithic concrete walls enriched with ancestral Chukum and suspended terraces for absolute passive ventilation."
    },
    details: {
      es: [
        { label: "Estructura", value: "Concreto monolítico con Chukum natural" },
        { label: "Interiores", value: "Madera noble de Tzalam y Mármol Travertino" },
        { label: "Sustentabilidad", value: "Captación pluvial y climatización bioclimática" }
      ],
      en: [
        { label: "Structure", value: "Monolithic concrete with natural Chukum" },
        { label: "Interiors", value: "Tzalam hardwood and Travertine Marble" },
        { label: "Sustainability", value: "Rainwater harvesting and bioclimatic comfort" }
      ]
    },
    gallery: {
      facade: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      bathroom: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1200&q=80",
      bedroom: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
      pool: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80",
      living: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
    }
  },
  {
    id: "casa-coral",
    title: {
      es: "Casa Coral",
      en: "Coral House"
    },
    category: {
      es: "Residencial de Lujo",
      en: "Luxury Residential"
    },
    location: {
      es: "Zona Hotelera, Cancún, México",
      en: "Hotel Zone, Cancun, Mexico"
    },
    year: "2025",
    area: "920 m²",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
    description: {
      es: "Una joya escultórica frente al mar Caribe. Estructuras de alta ingeniería que desafían tormentas tropicales mediante grandes volados y muros de cristal templado low-E anti-huracán.",
      en: "A sculptural jewel facing the Caribbean Sea. High-engineering structures designed to withstand tropical storms through large cantilevers and low-E tempered hurricane-proof glass."
    },
    details: {
      es: [
        { label: "Estructura", value: "Cimentación profunda de pilotes antisísmicos" },
        { label: "Fachada", value: "Cristal templado low-E y aluminio estructural marino" },
        { label: "Sustentabilidad", value: "Paneles solares flotantes y domótica inteligente" }
      ],
      en: [
        { label: "Structure", value: "Deep anti-seismic piling foundations" },
        { label: "Facade", value: "Low-E tempered glass and marine structural aluminum" },
        { label: "Sustainability", value: "Floating solar panels and smart automation" }
      ]
    },
    gallery: {
      facade: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
      bathroom: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
      bedroom: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      pool: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
      living: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    }
  },
  {
    id: "casa-tzalam",
    title: {
      es: "Casa Tzalam",
      en: "Tzalam House"
    },
    category: {
      es: "Residencial de Lujo",
      en: "Luxury Residential"
    },
    location: {
      es: "Playacar, Playa del Carmen, México",
      en: "Playacar, Playa del Carmen, Mexico"
    },
    year: "2023",
    area: "780 m²",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
    description: {
      es: "Residencia orgánica que equilibra la monumentalidad del concreto aparente con la calidez del Tzalam noble certificado. Diseñada en torno a un patio central de agua.",
      en: "Organic residence balancing the monumentality of exposed concrete with the warmth of certified Tzalam hardwood. Designed around a central water courtyard."
    },
    details: {
      es: [
        { label: "Estructura", value: "Concreto aparente entablado texturizado" },
        { label: "Carpintería", value: "Madera de Tzalam y Parota maciza curada" },
        { label: "Sustentabilidad", value: "Reciclaje total de aguas grises y confort pasivo" }
      ],
      en: [
        { label: "Structure", value: "Textured board-formed exposed concrete" },
        { label: "Carpentry", value: "Cured solid Tzalam and Parota wood" },
        { label: "Sustainability", value: "Greywater recycling and passive comfort" }
      ]
    },
    gallery: {
      facade: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      bathroom: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
      bedroom: "https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&w=1200&q=80",
      pool: "https://images.unsplash.com/photo-1576014264696-6e474fe5e54c?auto=format&fit=crop&w=1200&q=80",
      living: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
    }
  }
];

// Mapped compatibility layout for Portfolio.tsx component consumption
export const portfolioItems = projects.map((p) => {
  return {
    id: p.id,
    category: "residential",
    image: p.image,
    titleEs: p.title.es,
    titleEn: p.title.en,
    descEs: p.description.es,
    descEn: p.description.en,
    locationEs: p.location.es,
    locationEn: p.location.en,
    area: p.area,
    materials: p.details.es.find(d => d.label === "Estructura" || d.label === "Carpintería")?.value || "Concreto y madera",
    type: p.category.es,
    specsEs: p.details.es.map(d => `${d.label}: ${d.value}`),
    specsEn: p.details.en.map(d => `${d.label}: ${d.value}`),
    gallery: [
      { name: "Fachada", url: p.gallery.facade },
      { name: "Baño", url: p.gallery.bathroom },
      { name: "Recámara", url: p.gallery.bedroom },
      { name: "Alberca", url: p.gallery.pool },
      { name: "Sala", url: p.gallery.living }
    ]
  };
});

import { Project } from '../types';

export const projects: Project[] = [
  {
    id: "villa-chukum",
    title: {
      es: "Villa Chukum",
      en: "Villa Chukum"
    },
    category: {
      es: "Residencial Boutique",
      en: "Boutique Residential"
    },
    location: {
      es: "Selva Alta, Tulum, México",
      en: "High Jungle, Tulum, Mexico"
    },
    year: "2024",
    area: "650 m²",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    description: {
      es: "Residencia boutique esculpida entre la selva de Tulum. Muros monolíticos de concreto aparente enriquecidos con acabado continuo de Chukum natural y terrazas orientadas para ventilación pasiva.",
      en: "Boutique residence sculpted into the Tulum jungle. Monolithic exposed concrete walls enriched with continuous natural Chukum plaster and terraces oriented for passive cross-ventilation."
    },
    details: {
      es: [
        { label: "Estructura", value: "Concreto aparente monolítico con acabado Chukum" },
        { label: "Materiales", value: "Madera noble de Tzalam certificada y piedra regional" },
        { label: "Criterio Bioclimático", value: "Captación pluvial y climatización pasiva" }
      ],
      en: [
        { label: "Structure", value: "Monolithic exposed concrete with Chukum finish" },
        { label: "Materials", value: "Certified Tzalam hardwood and regional stone" },
        { label: "Bioclimatic Standard", value: "Rainwater harvesting and passive climate control" }
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
      es: "Residencial Boutique",
      en: "Boutique Residential"
    },
    location: {
      es: "Zona Costera, Cancún, México",
      en: "Coastal Zone, Cancun, Mexico"
    },
    year: "2025",
    area: "920 m²",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80",
    description: {
      es: "Residencia marina frente al Caribe Mexicano. Alta ingeniería sismorresistente con cimentación profunda de pilotes sobre suelo kárstico y cancelería estructural anti-huracán.",
      en: "Oceanfront coastal residence in the Mexican Caribbean. Seismic engineering featuring deep piling foundations over karstic subsoil and hurricane-rated structural glazing."
    },
    details: {
      es: [
        { label: "Cimentación", value: "Pilotes profundos de concreto armado sismorresistente" },
        { label: "Fachada", value: "Cancelería marina y cristal templado low-E anti-huracán" },
        { label: "Eficiencia", value: "Energía solar integrada y domótica pasiva" }
      ],
      en: [
        { label: "Foundation", value: "Deep earthquake-resistant reinforced concrete piles" },
        { label: "Facade", value: "Marine-grade glazing and low-E hurricane-proof glass" },
        { label: "Efficiency", value: "Integrated solar energy and passive automation" }
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
      es: "Residencial Boutique",
      en: "Boutique Residential"
    },
    location: {
      es: "Playacar, Playa del Carmen, México",
      en: "Playacar, Playa del Carmen, Mexico"
    },
    year: "2023",
    area: "780 m²",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
    description: {
      es: "Proyecto residencial que equilibra volúmenes monolíticos de concreto aparente con la calidez de la madera de Tzalam y Parota certificada. Proyectada en torno a un patio de agua.",
      en: "Residential project balancing monolithic exposed concrete volumes with the warmth of certified local Tzalam and Parota hardwoods. Designed around a water courtyard."
    },
    details: {
      es: [
        { label: "Estructura", value: "Concreto aparente entablado texturizado artesanal" },
        { label: "Carpintería", value: "Madera de Tzalam y Parota maciza certificada" },
        { label: "Sustentabilidad", value: "Reutilización hídrica y ventilación bioclimática" }
      ],
      en: [
        { label: "Structure", value: "Artisanal board-formed exposed concrete" },
        { label: "Carpentry", value: "Certified solid Tzalam and Parota hardwood" },
        { label: "Sustainability", value: "Water reuse and passive bioclimatic ventilation" }
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

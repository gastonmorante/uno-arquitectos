export interface FAQItem {
  id: string;
  category: "general" | "services" | "finance";
  question: {
    es: string;
    en: string;
  };
  answer: {
    es: string;
    en: string;
  };
}

export const faqsData: FAQItem[] = [
  {
    id: "faq-1",
    category: "general",
    question: {
      es: "¿Qué hace exactamente UNO Arquitectos?",
      en: "What exactly does UNO Arquitectos do?"
    },
    answer: {
      es: "UNO Arquitectos es un estudio boutique de arquitectura, interiorismo y construcción con base en la Riviera Maya. Acompañamos proyectos residenciales, comerciales, turísticos y boutique desde la idea inicial hasta su ejecución, integrando diseño, planeación, presupuesto, coordinación y obra bajo una visión clara, humana y construible.",
      en: "UNO Arquitectos is a boutique architecture, interior design, and construction studio based in the Riviera Maya. We accompany residential, commercial, and boutique hospitality projects from initial concept through completion, integrating design, planning, budgeting, coordination, and building under a clear, human, and buildable vision."
    }
  },
  {
    id: "faq-2",
    category: "general",
    question: {
      es: "¿Qué tipo de proyectos realizan?",
      en: "What types of projects do you handle?"
    },
    answer: {
      es: "Trabajamos principalmente en proyectos residenciales, boutique hospitality, comerciales y usos mixtos. Podemos participar en obra nueva, remodelación, ampliación, interiorismo, ejecución comercial y acompañamiento integral de proyectos que requieren orden, criterio técnico y una buena experiencia de proceso.",
      en: "We work primarily on residential, boutique hospitality, commercial, and mixed-use projects. We participate in new builds, renovations, expansions, interior design, commercial execution, and comprehensive project direction requiring technical criteria and transparent process management."
    }
  },
  {
    id: "faq-3",
    category: "general",
    question: {
      es: "¿Trabajan solo en Riviera Maya?",
      en: "Do you work only in the Riviera Maya?"
    },
    answer: {
      es: "Nuestra base está en Playa del Carmen y la Riviera Maya, donde concentramos buena parte de nuestra operación. Sin embargo, también hemos participado en proyectos en otros contextos cuando el perfil del proyecto, el alcance y la estructura operativa lo hacen viable.",
      en: "Our main base is in Playa del Carmen and the Riviera Maya, where most of our operations are concentrated. However, we also take on projects in other locations when the scope, project profile, and operational structure align."
    }
  },
  {
    id: "faq-4",
    category: "general",
    question: {
      es: "¿Qué tipo de clientes suelen trabajar mejor con ustedes?",
      en: "What type of clients work best with you?"
    },
    answer: {
      es: "Trabajamos especialmente bien con clientes que valoran el diseño, la claridad, la buena comunicación y la ejecución profesional. Particularmente con inversionistas, empresarios, propietarios y clientes nacionales o extranjeros que no buscan improvisación, sino un equipo que piense, ordene y acompañe el proyecto con seriedad.",
      en: "We work best with clients who value design integrity, clarity, open communication, and professional execution. In particular, investors, entrepreneurs, and homeowners—both national and international—who seek structured direction rather than improvisation."
    }
  },
  {
    id: "faq-5",
    category: "general",
    question: {
      es: "¿Puedo contratar solo diseño o también construcción?",
      en: "Can I hire you for design only, or construction as well?"
    },
    answer: {
      es: "Ambas opciones son posibles. Podemos acompañarte solo en la etapa de diseño, en el desarrollo técnico del proyecto, en la supervisión, en la gestión integral o en la ejecución completa. Lo importante es definir desde el inicio qué necesitas, qué nivel de acompañamiento esperas y qué alcance tiene sentido para tu proyecto.",
      en: "Both options are available. We can guide you strictly through the design phase, technical executive development, site supervision, full management, or complete turnkey construction. The key is defining the scope and support level that makes sense for your project from day one."
    }
  },
  {
    id: "faq-6",
    category: "services",
    question: {
      es: "¿Qué significa que ofrezcan un servicio integral o llave en mano?",
      en: "What does offering a turnkey or comprehensive service mean?"
    },
    answer: {
      es: "Significa que podemos asumir la coordinación completa del proyecto, desde la definición inicial hasta la entrega final. Esto ayuda a reducir fricciones entre diseño, presupuesto, decisiones técnicas y ejecución en obra. Para el cliente, suele traducirse en más claridad, menos dispersión y una mejor capacidad de control a lo largo del proceso.",
      en: "It means we take full responsibility for coordinating the project from initial concept definition to final delivery. This eliminates friction between design, budgeting, technical decisions, and site execution, giving the client total control, clarity, and peace of mind."
    }
  },
  {
    id: "faq-7",
    category: "services",
    question: {
      es: "¿Cuál es la diferencia entre contratar diseño, proyecto ejecutivo, supervisión o llave en mano?",
      en: "What is the difference between hiring design, executive project, supervision, or turnkey service?"
    },
    answer: {
      es: "La diferencia está en el nivel de profundidad y responsabilidad que asumimos:\n• Diseño: Se enfoca en conceptualizar y dar forma al proyecto.\n• Proyecto ejecutivo: Aterriza técnicamente lo que se va a construir.\n• Supervisión: Cuida que la obra avance con orden, calidad y apego a lo acordado.\n• Llave en mano: Integra el proceso completo bajo una sola dirección.",
      en: "The difference lies in the level of scope and responsibility we assume:\n• Design: Conceptualization and architectural form.\n• Executive Project: Complete technical engineering and construction blueprints.\n• Supervision: Ensuring site progress adheres to quality, budget, and plans.\n• Turnkey: Integrating the entire lifecycle under single-point direction."
    }
  },
  {
    id: "faq-8",
    category: "services",
    question: {
      es: "¿Cómo es su proceso de trabajo?",
      en: "What is your work process like?"
    },
    answer: {
      es: "Trabajamos por etapas claras. Primero entendemos el proyecto, el contexto y tus objetivos. Después definimos alcances, propuesta y acuerdos. Luego desarrollamos diseño y documentación técnica según el caso. Si el proyecto avanza a ejecución, coordinamos la obra, supervisamos, damos seguimiento y gestionamos los ajustes necesarios hasta la entrega. Nos gusta que cada etapa tenga lógica, aprobación y trazabilidad.",
      en: "We operate in clear, structured phases. First, we understand your vision, site context, and goals. Next, we establish defined scopes, proposals, and agreements. Then we develop architectural design and technical engineering. During execution, we coordinate labor, supervise site progress, and manage adjustments through formal delivery."
    }
  },
  {
    id: "faq-9",
    category: "services",
    question: {
      es: "¿Qué pasa si durante el proceso quiero hacer cambios?",
      en: "What happens if I want to make changes during the process?"
    },
    answer: {
      es: "Los cambios son posibles, pero se manejan con orden. Todo ajuste relevante se revisa, se analiza técnicamente, se cotiza y se autoriza antes de ejecutarse. Esto protege al cliente y al proyecto, porque evita improvisaciones, malentendidos y desviaciones innecesarias en costo, tiempo o calidad.",
      en: "Changes are manageable, but handled with strict order. Every relevant adjustment is technically reviewed, cost-estimated, and formally authorized before execution. This protects your investment from cost overruns and delays."
    }
  },
  {
    id: "faq-10",
    category: "services",
    question: {
      es: "¿Cómo cuidan mi inversión?",
      en: "How do you protect my investment?"
    },
    answer: {
      es: "La cuidamos desde la claridad. Eso implica definir alcances con precisión, evitar ambigüedades, ordenar el proceso, anticipar riesgos y dar visibilidad sobre decisiones, costos y cambios. No prometemos que un proyecto nunca tendrá retos; prometemos enfrentarlos con criterio, comunicación y estructura.",
      en: "We safeguard your capital through clarity: defining exact scopes, removing ambiguities, anticipating site risks, and providing transparent visibility on costs and changes. We promise to handle every technical challenge with professional criteria and open communication."
    }
  },
  {
    id: "faq-11",
    category: "general",
    question: {
      es: "¿Cómo sé qué está pasando con mi proyecto si no vivo en la zona o no puedo estar presente?",
      en: "How do I track progress if I live abroad or cannot be on site?"
    },
    answer: {
      es: "Uno de nuestros diferenciales es justamente dar claridad y acompañamiento a clientes que necesitan control sin estar físicamente encima del proyecto. Trabajamos con comunicación continua, seguimiento puntual y una relación cercana que te permite tomar decisiones con mejor información, incluso a distancia.",
      en: "One of our core differentiators is providing remote control and peace of mind for clients living abroad. We maintain continuous communication, structured progress reports, and transparent documentation so you can make informed decisions from anywhere."
    }
  },
  {
    id: "faq-12",
    category: "general",
    question: {
      es: "¿Trabajan con clientes extranjeros o inversionistas?",
      en: "Do you work with foreign clients or investors?"
    },
    answer: {
      es: "Sí. Estamos acostumbrados a acompañar a clientes nacionales y extranjeros que buscan desarrollar, construir o transformar un espacio en Riviera Maya con mayor certidumbre. Entendemos que, en esos casos, la confianza, la comunicación y la transparencia no son extras: son parte central del servicio.",
      en: "Yes. We regularly guide international investors and expatriates looking to build or develop in the Riviera Maya. We understand that bilingual communication, legal certainty, and transparency are essential pillars of our service."
    }
  },
  {
    id: "faq-13",
    category: "general",
    question: {
      es: "¿Qué diferencia a UNO Arquitectos de otros despachos o constructoras?",
      en: "What differentiates UNO Arquitectos from other firms or builders?"
    },
    answer: {
      es: "No nos interesa vender solo planos ni solo metros cuadrados. Nuestro valor está en integrar diseño, criterio técnico, gestión y ejecución de manera coherente. Somos un estudio boutique con trato cercano, pero con procesos claros y visión profesional. Diseñamos lo que sí se puede construir, cuidamos el proceso y hablamos con honestidad.",
      en: "We are not interested in selling generic blueprints or simple square meters. Our value lies in seamlessly integrating design, structural engineering, management, and build execution. We are a boutique firm with personal contact, grounded criteria, and buildable design."
    }
  },
  {
    id: "faq-14",
    category: "finance",
    question: {
      es: "¿Su enfoque incluye sostenibilidad?",
      en: "Does your approach include sustainability?"
    },
    answer: {
      es: "Sí, pero desde un lugar serio, no decorativo. Nos interesa que los proyectos respondan al entorno, aprovechen mejor los recursos, incorporen criterios bioclimáticos cuando aplica y tomen decisiones más conscientes en términos humanos, ecológicos y económicos. Para nosotros, la sostenibilidad no es un eslogan: es parte del criterio de diseño y construcción.",
      en: "Yes, but from a functional standpoint, not decorative greenwashing. We ensure our builds respond to climate context, optimize resources, apply passive bioclimatic design, and respect the ecosystem. For us, sustainability is part of our design criteria."
    }
  },
  {
    id: "faq-15",
    category: "finance",
    question: {
      es: "¿Publican precios o paquetes fijos?",
      en: "Do you publish fixed prices or packages?"
    },
    answer: {
      es: "No trabajamos con precios universales ni con paquetes cerrados para todos los casos, porque cada proyecto cambia según su tamaño, complejidad, ubicación, nivel de definición, necesidades técnicas y grado de acompañamiento requerido. Preferimos cotizar con base en un entendimiento real del proyecto para darte una propuesta honesta.",
      en: "We do not publish fixed price packages or universal rates, because every custom project varies based on lot geology, scale, technical complexity, materials, and scope. We estimate costs based on real project engineering to deliver accurate proposals."
    }
  },
  {
    id: "faq-16",
    category: "finance",
    question: {
      es: "Entonces, ¿cómo se define el costo de sus servicios?",
      en: "So, how are service costs defined?"
    },
    answer: {
      es: "El costo depende de factores como el tipo de proyecto, el alcance solicitado, la etapa en la que nos integramos, el nivel de detalle requerido, la complejidad técnica y si se trata de diseño, proyecto ejecutivo, supervisión, gerencia, construcción o un servicio integral. En la práctica, no cobramos por venderte algo estándar, sino por acompañar de forma proporcional a lo que el proyecto realmente necesita.",
      en: "Costs are determined by scope, architectural phase, technical complexity, site conditions, and whether you require design, executive blueprints, site supervision, or complete turnkey construction. We tailor fees proportionally to actual project needs."
    }
  },
  {
    id: "faq-17",
    category: "finance",
    question: {
      es: "VALE LA PENA CONTRATAR UN ESTUDIO COMO UNO SI AÚN NO ESTOY LISTO PARA CONSTRUIR?",
      en: "Is it worth hiring a firm like UNO if I am not ready to build yet?"
    },
    answer: {
      es: "Sí, muchas veces ahí es donde más valor podemos aportar. Hay clientes que todavía no necesitan arrancar obra, pero sí ordenar ideas, evaluar viabilidad, aterrizar alcances, entender costos probables o tomar mejores decisiones antes de comprometer inversión. Un buen proyecto suele empezar mucho antes de la primera excavación.",
      en: "Yes, that is often where we provide the highest value. Evaluating site feasibility, defining realistic scopes, understanding probable budgets, and making informed decisions early prevents costly mistakes before excavation begins."
    }
  },
  {
    id: "faq-18",
    category: "finance",
    question: {
      es: "¿Pueden ayudarme a aterrizar una idea que todavía está verde?",
      en: "Can you help me flesh out an early-stage idea?"
    },
    answer: {
      es: "Sí. De hecho, una parte importante de nuestro trabajo consiste en traducir ideas, intuiciones o deseos en proyectos con lógica, estructura y posibilidades reales de ejecución. No necesitas llegar con todo resuelto; sí ayuda llegar con apertura para pensar el proyecto con más profundidad.",
      en: "Yes. Translating raw ideas, desires, or lot visions into structured, buildable projects with clear technical logic is a core part of our work."
    }
  },
  {
    id: "faq-19",
    category: "finance",
    question: {
      es: "¿Cómo sé si somos el equipo correcto para mi proyecto?",
      en: "How do I know if you are the right team for my project?"
    },
    answer: {
      es: "Probablemente sí somos una buena opción si buscas diseño con sentido, construcción con criterio, una relación profesional pero cercana y un proceso bien llevado. Probablemente no lo somos si solo buscas al proveedor más barato, decisiones improvisadas o un equipo que diga que sí a todo sin cuestionar.",
      en: "We are the right team if you seek architectural purpose, construction criteria, honest communication, and professional execution. We may not be the fit if you only seek the cheapest quote or unexamined improvisation."
    }
  },
  {
    id: "faq-20",
    category: "finance",
    question: {
      es: "¿Cuál es el siguiente paso si quiero explorar mi proyecto con ustedes?",
      en: "What is the next step to explore my project with you?"
    },
    answer: {
      es: "El siguiente paso es tener una primera conversación para entender tu proyecto, tu contexto y lo que realmente necesitas. A partir de ahí podemos orientarte sobre el tipo de servicio más conveniente, el nivel de acompañamiento adecuado y la mejor forma de estructurar el proceso.",
      en: "The next step is to schedule an initial technical conversation to understand your land, context, and requirements. From there, we guide you on the most suitable service scope and process structure."
    }
  }
];

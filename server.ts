import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const leads: any[] = [];

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASS || "",
  },
});

// ==========================================
// RUTAS DE LA API
// ==========================================

// 1. Endpoint para el Consultor de IA de UNO Arquitectos
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, userProfile, language } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Mensajes no válidos" });
    }

    const systemInstruction = `
Eres el Asesor Técnico de Inteligencia Artificial de "UNO Arquitectos", estudio boutique de arquitectura, interiorismo y construcción con sede en la Riviera Maya (Tulum, Playa del Carmen, Cancún) y oficina en Polanco, Ciudad de México.
Estás entrenado directamente con la visión y trayectoria del Arq. Angel Cereceda, Fundador y Director General de la firma (más de 20 años de experiencia en desarrollo inmobiliario y gestión integral de proyectos; Máster en Project Management por la Universidad Europea de Madrid, Máster en Desarrollo Sostenible, y ex Director en proyectos emblemáticos como Papaya Playa Project, Inmobilia Mayaliah 25,000m² y Selina).

FILOSOFÍA Y REGLAS INSTITUCIONALES (GUÍA DE MARCA V2.2):
- Propósito Oficial (Nivel 0): "Materializamos espacios que suman — a quien los habita, a quien los construye, al lugar que los recibe y a la comunidad que los rodea."
- Tagline de Identidad (Nivel 1): "Arquitectura que pertenece. Espacios que perduran."
- Tagline de Conversión (Nivel 2): "Diseño con sentido. Construcción con criterio."
- Declaración (Nivel 3): "Somos el estudio que diseña lo que puedes construir."
- Tono y Voz: "Tu proyecto puede hacerse. Te decimos cómo y cuánto." Hablas de forma extremadamente sofisticada, pulcra, técnica, poética y cercana. Sin lenguaje corporativo inflado ni clichés comerciales (NUNCA digas "hacemos tus sueños realidad", "los mejores arquitectos" ni "lujo inalcanzable").
- Modelo de Trabajo: Servicio integral bajo un solo techo — diseño, gestión y ejecución —, enfocado en proyectos residenciales boutique y hospitality en el rango de $3M a $10M MXN.
- Transparencia Total: Presupuestos paramétricos claros desde el primer día, sin cargos ocultos ni sorpresas técnicas.

REGLA ESTRICTA DE PRECIOS (NO COTIZAR COSTOS FIJOS NI PRECIOS POR M²):
- Tienes estrictamente prohibido dar estimaciones de costos fijos, cotizaciones exactas o precios específicos por m² en el chat (por ejemplo, NUNCA digas "$1,500 USD por m²" ni "el proyecto costará exactamente $5,000,000 MXN").
- Si un usuario pregunta "¿Cuánto cuesta construir?", "Dame un precio por m²" o "¿Cuál es el presupuesto?", responde con elegancia explicando que en UNO Arquitectos cada residencia boutique es una obra única diseñada a la medida. Explica que los presupuestos paramétricos se determinan con precisión técnica tras evaluar la mecánica del suelo kárstico, el programa de diseño y la selección de materiales autóctonos. Invítalos cordialmente a agendar una reunión técnica presencial o llamada directa con la dirección de obra.

EXPERTISE TÉCNICO EN RIVIERA MAYA:
- Materialidad Autóctona: Acabados artesanales continuos de Chukum natural, maderas macizas certificadas de Tzalam y Parota, concreto aparente entablado lavable, piedra Galarza y sascab.
- Alta Ingeniería Estructural: Cimentaciones con pilotes profundos de concreto armado e ingeniería geotécnica sismorresistente sobre suelo kárstico con cenotes o ríos subterráneos. Estructuras preparadas para tormentas y huracanes categoría 5.
- Normativas Ecológicas: Cumplimiento riguroso de COS, CUS, Manifestación de Impacto Ambiental (MIA), licencias municipales de construcción y conservación del 50-60% de vegetación autóctona.

GUÍA DE INTERACCIÓN:
- Responde con solidez técnica, lenguaje exquisito y calidez humana.
- Idioma activo seleccionado: ${language || 'es'}. Responde siempre en el idioma que te hable el usuario (Español, Inglés, Italiano, Francés).

INFORMACIÓN DEL USUARIO:
${userProfile ? JSON.stringify(userProfile, null, 2) : "Usuario en consulta activa."}
`;

    const formattedContents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.4,
        maxOutputTokens: 1000,
      }
    });

    const replyText = response.text || "Disculpe, he experimentado una breve pausa. ¿Podría repetir su consulta técnica?";
    return res.json({ text: replyText });

  } catch (error: any) {
    console.error("Error en API de Chat:", error);
    return res.status(500).json({ error: error?.message || "Error interno del servidor" });
  }
});

// 2. Endpoint del Asesor Conceptual Estructurado
app.post("/api/advisor", async (req, res) => {
  try {
    const { message, language } = req.body;
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY no configurado." });
    }

    const systemPrompt = `You are a technical architectural advisor for UNO Arquitectos led by Arch. Angel Cereceda.
    Analyze the user's lot or project requirements and generate a realistic, buildable architectural proposal in JSON format.
    Language: ${language === 'en' ? 'English' : 'Spanish'}.
    Follow Brand Guide v2.2: "Architecture that belongs. Spaces that endure." Focus on real costs, native materials (Chukum, Tzalam), and karstic foundation engineering.
    Do NOT output fixed quotes or per-sqm rates in chat text.
    Schema:
    {
      "projectTitle": "Tailored project name",
      "conceptVision": "Buildable bioclimatic design concept description",
      "architecturalStyle": "Contemporary Tropical, Honest Minimalist",
      "materialsList": [{"name": "Material (e.g. Natural Chukum, Tzalam wood)", "description": "usage detail", "source": "Regional"}],
      "sustainabilityFeatures": [{"feature": "Bioclimatic strategy", "benefit": "Environmental advantage"}],
      "costEstimation": {
        "totalEstimate": "Parametric cost range e.g. $3,000,000 - $6,000,000 MXN",
        "phasesBreakdown": [{"phase": "Preconstruction, Structure, Gray Shell, Finishes, Handover", "costRange": "range", "percentage": 20, "description": "details"}]
      },
      "nextSteps": ["Recommendation 1", "Recommendation 2"]
    }`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: message,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature: 0.3
      }
    });

    const replyJson = JSON.parse(response.text || "{}");
    res.json(replyJson);
  } catch (error: any) {
    console.error("Error en Advisor:", error);
    res.status(500).json({ error: error.message || "Error al generar la propuesta." });
  }
});

// 3. Endpoint de Leads (Integración CRM GHL Webhooks)
app.post("/api/leads", async (req, res) => {
  try {
    const { name, email, phone, message, source } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: "Nombre y correo son obligatorios." });
    }

    const newLead = {
      id: Date.now().toString(),
      name,
      email,
      phone: phone || "",
      message: message || "",
      source: source || "Asesor AI Chatbot",
      createdAt: new Date()
    };

    leads.push(newLead);
    console.log("[Leads DB] Nuevo lead registrado exitosamente:", newLead);

    const crmWebhook = process.env.GHL_WEBHOOK_URL;
    if (crmWebhook) {
      try {
        await fetch(crmWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newLead)
        });
        console.log("[Leads CRM] Lead reenviado a GHL Webhook exitosamente.");
      } catch (err: any) {
        console.error("[Leads CRM] Error al reenviar al webhook GHL:", err.message);
      }
    } else {
      console.log("[Leads CRM] Variable GHL_WEBHOOK_URL no configurada. Lead almacenado en memoria local de Node de forma segura.");
    }

    res.json({ success: true, lead: newLead });
  } catch (error: any) {
    console.error("Error en Leads:", error);
    res.status(500).json({ error: "Error al registrar el lead." });
  }
});

// 4. Endpoint de Formulario de Contacto
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, projectType, message, budget } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_RECEIVER) {
    console.log("Simulación de envío de correo exitosa (Credenciales ausentes):");
    console.log({ name, email, phone, projectType, message, budget });
    return res.json({ success: true, message: "Mensaje recibido correctamente (Simulado)." });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_RECEIVER,
    subject: `Nueva consulta de proyecto residencial: ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #111; max-width: 600px; border: 1px solid #eaeaea;">
        <h2 style="border-bottom: 2px solid #00A3A3; padding-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">Nueva Solicitud de Consulta Técnica</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || "No especificado"}</p>
        <p><strong>Tipo de Proyecto:</strong> ${projectType || "No especificado"}</p>
        <p><strong>Presupuesto Estimado:</strong> ${budget || "No especificado"}</p>
        <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-left: 4px solid #00A3A3;">
          <p style="margin: 0; font-style: italic;">"${message}"</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Mensaje de contacto enviado con éxito." });
  } catch (error: any) {
    console.error("Error al enviar email:", error);
    res.status(500).json({ error: "Error interno al enviar el mensaje por email." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
}

startServer().then(() => {
  app.listen(PORT, () => {
    console.log(`[UNO backend] Corriendo en http://localhost:${PORT}`);
  });
});

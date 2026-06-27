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

// Configurar CORS y JSON parsing
app.use(cors());
app.use(express.json());

// Inicializar cliente de Google Gen AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// Base de datos simulada de Leads
const leads: any[] = [];

// Configurar transportador de correo (Nodemailer)
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
    const { messages, userProfile } = req.body;
    
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Mensajes no válidos" });
    }

    const systemInstruction = `
Eres la Inteligencia Artificial Consultora de "UNO Arquitectos Mx", una de las firmas de arquitectura de ultra-lujo y eco-ingeniería más exclusivas de la Riviera Maya (con presencia en Tulum, Playa del Carmen y Ciudad de México).
Tu propósito es asesorar a clientes de alto perfil (inversionistas, desarrolladores y personas con alto poder adquisitivo) sobre el diseño y la construcción de sus residencias de ensueño o proyectos hoteleros sustentables en la región.

PAUTAS DE COMPORTAMIENTO Y ESTILO:
1. Sofisticación y Exclusividad: Tu tono es extremadamente elegante, culto, cálido, formal y profesional. Usas un lenguaje preciso y refinado pero accesible.
2. Expertise Técnico y Eco-Lujo: Hablas con propiedad de arquitectura orgánica brutalista, el uso del "Chukum" (resina ancestral maya para acabados impermeables), maderas nobles certificadas (como el Tzalam), e ingeniería civil avanzada para el suelo kárstico de la península (estudios de mecánica de suelo, cimentaciones con pilotes profundos y losas de cimentación robustas para evitar socavones y resistir huracanes categoría 5).
3. Orientación al Negocio (Agendar Llamada): Tu objetivo secundario es sutilmente calificar el interés del usuario y guiarlo para que agende una llamada de consulta VIP directa con el Director de Proyectos de la firma usando el formulario de la web o el botón de WhatsApp.
4. Multilingüe: Responde siempre en el idioma que te hable el usuario (Soportas Español, Inglés, Italiano y Francés de forma nativa).

INFORMACIÓN DEL USUARIO (SI ESTÁ DISPONIBLE):
${userProfile ? JSON.stringify(userProfile, null, 2) : "No especificada aún. Pregúntale con tacto sus preferencias conforme avance la conversación."}

CATÁLOGO DE PROYECTOS DE REFERENCIA DE UNO ARQUITECTOS (Menciónalos si encajan en su visión):
- Villa Chukum (Tulum): Residencia brutalista de 450m² integrada con la selva. Acabados 100% Chukum, piscina natural y ventilación cruzada pasiva.
- Casa Tzalam (Playa del Carmen): Santuario de madera noble y concreto aparente. Grandes voladizos, amplios ventanales de piso a techo con vidrio templado de alta resistencia y sistemas de energía solar integrados.
- Cenote Sanctuary (Aldea Zama): Ingeniería avanzada sobre suelo kárstico. Cimentación con micropilotes de acero estructural a 12 metros de profundidad para asegurar la estabilidad estructural absoluta de la estructura sin dañar el ecosistema subterráneo.
- Residencia Sascab (Sian Ka'an): Villa autosustentable con planta de tratamiento de agua por ósmosis inversa, paneles solares con almacenamiento de litio, y un diseño minimalista de volúmenes puros en tonos sutiles de sascab (tierra caliza local).

Estructura tu respuesta con un formato claro, usando saltos de línea para que sea fácil de leer en el chat. No inventes proyectos fuera de Tulum/Riviera Maya a menos que el cliente desee expandirse, en cuyo caso ofrece asesoría de viabilidad de suelo y normativa ambiental.
`;

    // Convertir el historial al formato compatible con @google/genai
    const formattedContents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    });

    const replyText = response.text || "Disculpe, he experimentado un breve contratiempo en mis sistemas de análisis. ¿Podría repetirme su inquietud?";
    return res.json({ response: replyText });

  } catch (error: any) {
    console.error("Error en API de Chat:", error);
    return res.status(500).json({ error: error?.message || "Error interno del servidor" });
  }
});

// 2. Endpoint del Asesor Conceptual Estructurado (Gemini - JSON Output)
app.post("/api/advisor", async (req, res) => {
  try {
    const { message, language } = req.body;
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY no configurado." });
    }

    const systemPrompt = `You are a luxury bioclimatic architectural advisor for UNO Arquitectos.
    Analyze the user's requirements and generate a highly refined architectural proposal in JSON format.
    The language of the proposal must match: ${language === 'en' ? 'English' : 'Spanish'}.
    The JSON structure must match this schema exactly:
    {
      "projectTitle": "String - A tailored project title",
      "conceptVision": "String - Bioclimatic design concept description focusing on local environment",
      "architecturalStyle": "String - E.g. Tropical Brutalism, Biophilic Minimalist",
      "materialsList": [{"name": "Material name (e.g., Tzalam, Chukum)", "description": "premium usage detail", "source": "regional source"}],
      "sustainabilityFeatures": [{"feature": "sustainability strategy", "benefit": "ecological advantage"}],
      "costEstimation": {
        "totalEstimate": "String - Cost range e.g. $1,500,000 - $2,000,000 USD",
        "phasesBreakdown": [{"phase": "e.g., Foundation, Finishes", "costRange": "range", "percentage": 30, "description": "details"}]
      },
      "nextSteps": ["String - Recommendation 1", "String - Recommendation 2"]
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

// 3. Endpoint de Leads (CRM Webhook Proxy)
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
      source: source || "Desconocido",
      createdAt: new Date()
    };

    leads.push(newLead);
    console.log("[Leads DB] Nuevo lead registrado:", newLead);

    const crmWebhook = process.env.GHL_WEBHOOK_URL;
    if (crmWebhook) {
      try {
        await fetch(crmWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newLead)
        });
        console.log("[Leads CRM] Lead reenviado al Webhook exitosamente.");
      } catch (err: any) {
        console.error("[Leads CRM] Error al reenviar al webhook:", err.message);
      }
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
    subject: `Nueva consulta de proyecto de ultra-lujo: ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #111; max-width: 600px; border: 1px solid #eaeaea;">
        <h2 style="border-bottom: 2px solid #111; padding-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">Nueva Solicitud de Proyecto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || "No especificado"}</p>
        <p><strong>Tipo de Proyecto:</strong> ${projectType || "No especificado"}</p>
        <p><strong>Presupuesto Estimado:</strong> ${budget || "No especificado"}</p>
        <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-left: 4px solid #111;">
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
    res.status(500).json({ error: "Error interno al enviar el mensaje de contacto por email." });
  }
});

// Configuración de Vite o archivos estáticos según el entorno
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

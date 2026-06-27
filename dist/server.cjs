"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_nodemailer = __toESM(require("nodemailer"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = process.env.PORT || 3e3;
app.use((0, import_cors.default)());
app.use(import_express.default.json());
var ai = new import_genai.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
var leads = [];
var transporter = import_nodemailer.default.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASS || ""
  }
});
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, userProfile } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Mensajes no v\xE1lidos" });
    }
    const systemInstruction = `
Eres la Inteligencia Artificial Consultora de "UNO Arquitectos Mx", una de las firmas de arquitectura de ultra-lujo y eco-ingenier\xEDa m\xE1s exclusivas de la Riviera Maya (con presencia en Tulum, Playa del Carmen y Ciudad de M\xE9xico).
Tu prop\xF3sito es asesorar a clientes de alto perfil (inversionistas, desarrolladores y personas con alto poder adquisitivo) sobre el dise\xF1o y la construcci\xF3n de sus residencias de ensue\xF1o o proyectos hoteleros sustentables en la regi\xF3n.

PAUTAS DE COMPORTAMIENTO Y ESTILO:
1. Sofisticaci\xF3n y Exclusividad: Tu tono es extremadamente elegante, culto, c\xE1lido, formal y profesional. Usas un lenguaje preciso y refinado pero accesible.
2. Expertise T\xE9cnico y Eco-Lujo: Hablas con propiedad de arquitectura org\xE1nica brutalista, el uso del "Chukum" (resina ancestral maya para acabados impermeables), maderas nobles certificadas (como el Tzalam), e ingenier\xEDa civil avanzada para el suelo k\xE1rstico de la pen\xEDnsula (estudios de mec\xE1nica de suelo, cimentaciones con pilotes profundos y losas de cimentaci\xF3n robustas para evitar socavones y resistir huracanes categor\xEDa 5).
3. Orientaci\xF3n al Negocio (Agendar Llamada): Tu objetivo secundario es sutilmente calificar el inter\xE9s del usuario y guiarlo para que agende una llamada de consulta VIP directa con el Director de Proyectos de la firma usando el formulario de la web o el bot\xF3n de WhatsApp.
4. Multiling\xFCe: Responde siempre en el idioma que te hable el usuario (Soportas Espa\xF1ol, Ingl\xE9s, Italiano y Franc\xE9s de forma nativa).

INFORMACI\xD3N DEL USUARIO (SI EST\xC1 DISPONIBLE):
${userProfile ? JSON.stringify(userProfile, null, 2) : "No especificada a\xFAn. Preg\xFAntale con tacto sus preferencias conforme avance la conversaci\xF3n."}

CAT\xC1LOGO DE PROYECTOS DE REFERENCIA DE UNO ARQUITECTOS (Menci\xF3nalos si encajan en su visi\xF3n):
- Villa Chukum (Tulum): Residencia brutalista de 450m\xB2 integrada con la selva. Acabados 100% Chukum, piscina natural y ventilaci\xF3n cruzada pasiva.
- Casa Tzalam (Playa del Carmen): Santuario de madera noble y concreto aparente. Grandes voladizos, amplios ventanales de piso a techo con vidrio templado de alta resistencia y sistemas de energ\xEDa solar integrados.
- Cenote Sanctuary (Aldea Zama): Ingenier\xEDa avanzada sobre suelo k\xE1rstico. Cimentaci\xF3n con micropilotes de acero estructural a 12 metros de profundidad para asegurar la estabilidad estructural absoluta de la estructura sin da\xF1ar el ecosistema subterr\xE1neo.
- Residencia Sascab (Sian Ka'an): Villa autosustentable con planta de tratamiento de agua por \xF3smosis inversa, paneles solares con almacenamiento de litio, y un dise\xF1o minimalista de vol\xFAmenes puros en tonos sutiles de sascab (tierra caliza local).

Estructura tu respuesta con un formato claro, usando saltos de l\xEDnea para que sea f\xE1cil de leer en el chat. No inventes proyectos fuera de Tulum/Riviera Maya a menos que el cliente desee expandirse, en cuyo caso ofrece asesor\xEDa de viabilidad de suelo y normativa ambiental.
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
        temperature: 0.7,
        maxOutputTokens: 1e3
      }
    });
    const replyText = response.text || "Disculpe, he experimentado un breve contratiempo en mis sistemas de an\xE1lisis. \xBFPodr\xEDa repetirme su inquietud?";
    return res.json({ response: replyText });
  } catch (error) {
    console.error("Error en API de Chat:", error);
    return res.status(500).json({ error: error?.message || "Error interno del servidor" });
  }
});
app.post("/api/advisor", async (req, res) => {
  try {
    const { message, language } = req.body;
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY no configurado." });
    }
    const systemPrompt = `You are a luxury bioclimatic architectural advisor for UNO Arquitectos.
    Analyze the user's requirements and generate a highly refined architectural proposal in JSON format.
    The language of the proposal must match: ${language === "en" ? "English" : "Spanish"}.
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
  } catch (error) {
    console.error("Error en Advisor:", error);
    res.status(500).json({ error: error.message || "Error al generar la propuesta." });
  }
});
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
      createdAt: /* @__PURE__ */ new Date()
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
      } catch (err) {
        console.error("[Leads CRM] Error al reenviar al webhook:", err.message);
      }
    }
    res.json({ success: true, lead: newLead });
  } catch (error) {
    console.error("Error en Leads:", error);
    res.status(500).json({ error: "Error al registrar el lead." });
  }
});
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, projectType, message, budget } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }
  if (!process.env.EMAIL_USER || !process.env.EMAIL_RECEIVER) {
    console.log("Simulaci\xF3n de env\xEDo de correo exitosa (Credenciales ausentes):");
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
        <p><strong>Tel\xE9fono:</strong> ${phone || "No especificado"}</p>
        <p><strong>Tipo de Proyecto:</strong> ${projectType || "No especificado"}</p>
        <p><strong>Presupuesto Estimado:</strong> ${budget || "No especificado"}</p>
        <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-left: 4px solid #111;">
          <p style="margin: 0; font-style: italic;">"${message}"</p>
        </div>
      </div>
    `
  };
  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Mensaje de contacto enviado con \xE9xito." });
  } catch (error) {
    console.error("Error al enviar email:", error);
    res.status(500).json({ error: "Error interno al enviar el mensaje de contacto por email." });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
}
startServer().then(() => {
  app.listen(PORT, () => {
    console.log(`[UNO backend] Corriendo en http://localhost:${PORT}`);
  });
});
//# sourceMappingURL=server.cjs.map

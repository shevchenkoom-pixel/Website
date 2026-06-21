const portfolioContext = `
Oleksii Shevchenko
Location: Kyiv, Ukraine
Email: alex.m.shevchenko@gmail.com
LinkedIn: https://www.linkedin.com/in/oleksii-shevchenko-53a66723b
Current headline: Lead Upwork Researcher

Core skills:
- Grinfi
- Instantly
- Pipedrive
- Upwork acquisition strategy
- Personalized bidding systems
- Cold email and LinkedIn outreach
- Lead research and segmentation
- Domain setup and email warm-up
- Pipeline reporting and analytics
- AI-assisted automation with Claude Code

Certifications:
- Certificate of Completion: AI Fluency Framework & Foundations
- AWS Partner: Sales Accreditation - Training Badge

Career:
GroupBWT, Lead Upwork Researcher, May 2025 - Present, Kyiv, Ukraine.
Responsible for client acquisition and growth on Upwork through strategic bidding, personalized outreach, profile setup and optimization, performance metrics, reporting, engagement strategy, win-rate improvements, automations and tools with Claude Code, and continuous research to refine Upwork processes.

Host Service, Lead Generation Specialist, March 2025 - Present, Kyiv, Ukraine.
Worked on SEO, SMM, purchasing and configuring domains, email warm-up, cold outreach strategy, personalized email and LinkedIn templates, hypothesis testing, lead generation, and campaign performance analytics.

9 Lives Metrics, Lead Generation Specialist, September 2024 - March 2026.
Worked on domain purchasing and configuration, email warm-up, industry and market research, cold outreach strategy, personalized email and LinkedIn templates, hypothesis testing, lead generation, and campaign metrics analysis.

Freelance, Lead Generation Specialist, July 2022 - December 2023, Kyiv, Ukraine.
Worked on lead generation, cold outreach strategy development, industry and market research, personalized email and LinkedIn outreach, and analytics for campaign tracking.

CIENCE, Core Data Researcher, 2020 - 2022.
Built a research foundation in B2B data, targeting, segmentation, and prospect intelligence.
`;

export async function POST(request) {
  if (!process.env.OPENROUTER_API_KEY) {
    return Response.json(
      { error: "OpenRouter API key is not configured on the server." },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => null);
  const messages = Array.isArray(body?.messages) ? body.messages : [];

  const safeMessages = messages
    .filter((message) => ["user", "assistant"].includes(message.role))
    .slice(-8)
    .map((message) => ({
      role: message.role,
      content: String(message.content || "").slice(0, 1200),
    }));

  if (!safeMessages.some((message) => message.role === "user")) {
    return Response.json({ error: "Please send a question." }, { status: 400 });
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "Oleksii Shevchenko Portfolio Assistant",
    },
    body: JSON.stringify({
      model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a concise AI assistant embedded in Oleksii Shevchenko's personal portfolio website. Answer only using the portfolio context. If a question asks for information not present in the context, say that the portfolio does not include that detail and suggest contacting Oleksii by email or LinkedIn. Keep answers professional, specific, and under 120 words.",
        },
        {
          role: "user",
          content: `Portfolio context:\n${portfolioContext}`,
        },
        ...safeMessages,
      ],
      temperature: 0.3,
      max_tokens: 350,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    return Response.json(
      {
        error:
          data?.error?.message ||
          "OpenRouter could not answer this request right now.",
      },
      { status: response.status },
    );
  }

  const answer = data?.choices?.[0]?.message?.content?.trim();

  if (!answer) {
    return Response.json(
      { error: "The assistant returned an empty answer." },
      { status: 502 },
    );
  }

  return Response.json({ answer });
}

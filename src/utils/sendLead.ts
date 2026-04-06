const LEADS_URL = "https://functions.poehali.dev/7bba2fb3-0000-4130-964b-1f300eb201bc";

export async function sendLead(data: Record<string, unknown>, retries = 3): Promise<void> {
  console.log("[sendLead] sending:", data.source, data);
  let lastError: unknown;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(LEADS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log("[sendLead] response:", res.status, "attempt:", attempt);
      if (res.ok) return;
      throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      console.error("[sendLead] error attempt", attempt, err);
      lastError = err;
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    }
  }
  throw lastError;
}
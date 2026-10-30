// ============================================================================
// Enquiry submission layer: the ONLY place that talks to a backend.
//
// Right now the site has no backend, so `endpoint` in src/site.config.mjs is
// empty and this returns { status: "not-configured" }. The form then tells the
// visitor honestly that their message was NOT sent.
//
// To go live, set `form.endpoint` in src/site.config.mjs to a PUBLIC URL that
// accepts a JSON POST (Formspree, Web3Forms, a serverless function, etc.).
// Never put an API key or secret in this file or the config: they are public.
//
// To adapt to a provider with a different payload format, edit buildRequest().
// ============================================================================

function buildRequest(payload, cfg) {
  return {
    method: cfg.method || "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  };
}

/**
 * @param {Record<string,string>} payload flat field map (already validated)
 * @param {{endpoint?:string, method?:string}} cfg public config
 * @returns {Promise<{status:"sent"|"not-configured"|"failed", detail?:string}>}
 */
export async function submitEnquiry(payload, cfg) {
  if (!cfg || !cfg.endpoint) return { status: "not-configured" };
  try {
    const res = await fetch(cfg.endpoint, buildRequest(payload, cfg));
    if (res.ok) return { status: "sent" };
    return { status: "failed", detail: `HTTP ${res.status}` };
  } catch (err) {
    return { status: "failed", detail: err && err.message ? err.message : "Network error" };
  }
}

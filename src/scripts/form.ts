// Prüfung im Browser; Ziel (Webhook oder Dienst) kommt in Phase 7. Bis dahin öffnet das Formular das E-Mail-Programm.
const form = document.querySelector<HTMLFormElement>('#anfrage');
if (form) {
  const msg = (name: string, text: string) => {
    const field = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;
    const out = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
    if (out) out.textContent = text;
    field?.setAttribute('aria-invalid', text ? 'true' : 'false');
    return !text;
  };
  form.noValidate = true;
  // Eine Meldung verschwindet, sobald das Feld wieder etwas enthält.
  form.addEventListener('input', (ev) => {
    const el = ev.target as HTMLInputElement;
    if (el.getAttribute('aria-invalid') === 'true' && el.value.trim()) msg(el.name, '');
  });
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const d = new FormData(form);
    const name = String(d.get('name') ?? '').trim();
    const mail = String(d.get('email') ?? '').trim();
    const text = String(d.get('vorhaben') ?? '').trim();
    if (String(d.get('website') ?? '')) return; // Honeypot
    const ok = [
      msg('name', name ? '' : 'Bitte geben Sie Ihren Namen an.'),
      msg('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail) ? '' : 'Bitte geben Sie eine gültige E-Mail-Adresse an, damit wir antworten können.'),
      msg('vorhaben', text ? '' : 'Bitte beschreiben Sie kurz Ihr Vorhaben.'),
    ].every(Boolean);
    if (!ok) { form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(); return; }
    const endpoint = form.dataset.endpoint;
    const done = () => { form.hidden = true; const ok = document.getElementById('anfrage-ok'); if (ok) { ok.hidden = false; ok.focus(); } };
    if (endpoint) {
      const fehler = document.getElementById('anfrage-fehler');
      if (fehler) fehler.hidden = true;
      if (button) button.disabled = true; // kein doppeltes Senden
      fetch(endpoint, { method: 'POST', body: d, headers: { Accept: 'application/json' } })
        .then((r) => { if (!r.ok) throw new Error(); done(); (window as any).rybbit?.event?.('anfrage_gesendet', { quelle: String(d.get('quelle') ?? '') }); })
        .catch(() => { if (fehler) fehler.hidden = false; })
        .finally(() => { if (button) button.disabled = false; });
    } else {
      const body = [`Name: ${name}`, `Firma: ${d.get('firma') ?? ''}`, `E-Mail: ${mail}`, `Gefunden über: ${d.get('quelle') ?? ''}`, '', text].join('\n');
      location.href = `mailto:kontakt@act-it.eu?subject=${encodeURIComponent('Anfrage über act-it.eu')}&body=${encodeURIComponent(body)}`;
      done();
    }
  });
}

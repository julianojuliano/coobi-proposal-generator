"use client";

import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

const translations = {
  en: {
    title: "coobi care",
    titleSuffix: "Pilot Proposal for",
    subtitle: (month: string) =>
      `Enhancing Aftercare Through Continuous Digital Monitoring | ${month} | Confidential`,
    conceptTitle: "Pilot Concept",
    concept: (clinic: string) =>
      `coobi care bridges the gap between structured treatment and independent living. Clients receive a Garmin smartwatch and companion app in the last 4 weeks of inpatient treatment, then continue using coobi for 12 months after discharge, alongside ${clinic} existing aftercare sessions. The platform passively monitors sleep, stress, activity, and heart-rate variability, giving aftercare specialists continuous visibility into client wellbeing between sessions. To get the most out of this, it helps to allocate some additional time for the aftercare specialist to review the dashboard and check in with clients proactively.`,
    howTitle: "How It Works",
    howPhaseCol: "Phase",
    howWhatCol: "What Happens",
    howPhases: [
      {
        phase: "Last 4 weeks\n(Inpatient)",
        desc: "Onboarding with smartwatch and app in a supported setting. coobi establishes a data baseline before discharge. Clients get familiar with the watch and app by patients with the help of instruction videos.",
      },
      {
        phase: "Months 1–13\n(Aftercare)",
        desc: "App access continuously: coping tools, recovery modules, crisis support, daily reflection(s) and continuous passive monitoring. Aftercare therapists use the coobi dashboard to identify problem areas and reach out proactively. Sessions (in-person or video call) are informed by real data rather than self-report alone.",
      },
    ],
    includedTitle: "What's Included",
    forClients: "For Patients",
    forClinic: "For Your Clinic",
    clientItems: [
      "coobi packages (incl. Garmin smartwatches & 12-month app access)",
      "Daily reflection, e-learning modules & coping tools",
      "Emergency contacts & peer community",
      "AI-driven real-time interventions",
      "Technical support",
    ],
    clinicItems: [
      "Therapist dashboard with access to patient data",
      "Kick-off workshop (incl. onboarding & staff training)",
      "Content adaptations (clinic contacts, smaller content changes)",
      "Integration workshop for full rollout after the pilot in the third month of the pilot",
      "Technical support",
    ],
    pilotTitle: "Pilot Terms",
    pilotDuration: (months: number, n: number) =>
      `${months} months across min. ${n} clinic${n !== 1 ? "s" : ""}`,
    pilotLicenses: (n: number) =>
      `${n} patients (12 months app access + Garmin smartwatches)`,
    pilotInvestment: (currency: string, price: string) =>
      `${currency}${price} (one-time) - includes everything above`,
    durationLabel: "Duration",
    licensesLabel: "Licenses",
    investmentLabel: "Investment",
    validUntilLabel: "Offer valid until",
    phasesTitle: "Pilot Phases",
    phasesWhenCol: "When",
    phasesWhatCol: "What Happens",
    phasesRows: (months: number, licenses: number) => [
      {
        when: "Week 1",
        what: "Pilot start & implementation: kick-off workshop, content adaptations, dashboard setup, and staff training.",
      },
      {
        when: `Months 1–${months}`,
        what: `Test coobi care with ${licenses} patients across clinics. Continuous monitoring, dashboard usage, and aftercare integration.`,
      },
      {
        when: `Beginning of Month ${Math.max(1, months - 1)}`,
        what: "Integration workshop: joint review of pilot outcomes and definition of requirements for a full rollout.",
      },
      {
        when: `Month ${Math.max(1, months - 1)} & ${months}`,
        what: "Implementation of additional features, integrations, or customisations as needed.",
      },
      {
        when: "After Pilot",
        what: "Transition to standard pricing for continued use.",
      },
    ],
    sidebarTitle: "Configuration",
    langLabel: "Language",
    clinicLabel: "Clinic / Group Name",
    clinicPlaceholder: "e.g. Rehab Clinic Groups",
    numClinicsLabel: "Number of Clinics",
    numLicensesLabel: "Number of Licenses",
    pilotDurationLabel: "Pilot Duration (months)",
    currencyLabel: "Currency",
    priceLabel: "Price",
    perPatientLabel: "Per patient license",
    validityDateLabel: "Offer Valid Until",
    summaryTitle: "Summary",
    exportBtn: "Export PDF",
    exportingBtn: "Exporting...",
  },
  de: {
    title: "coobi care",
    titleSuffix: "Pilotvorschlag für",
    subtitle: (month: string) =>
      `Nachsorge verbessern durch kontinuierliches digitales Monitoring | ${month} | Vertraulich`,
    conceptTitle: "Pilotkonzept",
    concept: (clinic: string) =>
      `coobi care schließt die Lücke zwischen strukturierter Behandlung und selbstständigem Leben. Klient:innen erhalten in den letzten 4 Wochen der stationären Behandlung eine Garmin-Smartwatch und die zugehörige App und nutzen coobi dann 12 Monate nach der Entlassung weiter — begleitend zu ${clinic} bestehenden Nachsorgesitzungen. Die Plattform überwacht passiv Schlaf, Stress, Aktivität und Herzratenvariabilität und gibt Nachsorge-Spezialist:innen kontinuierliche Einblicke in das Wohlbefinden der Klient:innen zwischen den Sitzungen. Um das Beste daraus zu machen, ist es hilfreich, den Nachsorge-Spezialist:innen etwas zusätzliche Zeit einzuräumen, um das Dashboard zu prüfen und proaktiv mit den Klient:innen in Kontakt zu treten.`,
    howTitle: "So funktioniert's",
    howPhaseCol: "Phase",
    howWhatCol: "Was passiert",
    howPhases: [
      {
        phase: "Letzte 4 Wochen\n(Stationär)",
        desc: "Onboarding mit Smartwatch und App in einem begleiteten Setting. coobi erstellt eine Daten-Baseline vor der Entlassung. Klient:innen machen sich mithilfe von Anleitungsvideos mit Uhr und App vertraut.",
      },
      {
        phase: "Monate 1–13\n(Nachsorge)",
        desc: "Kontinuierlicher App-Zugang: Bewältigungstools, Recovery-Module, Krisenunterstützung, tägliche Reflexion(en) und kontinuierliches passives Monitoring. Nachsorge-Therapeut:innen nutzen das coobi-Dashboard, um Problemfelder zu erkennen und proaktiv Kontakt aufzunehmen. Sitzungen (persönlich oder per Videoanruf) basieren auf echten Daten statt nur auf Selbstberichten.",
      },
    ],
    includedTitle: "Was ist enthalten",
    forClients: "Für Patient:innen",
    forClinic: "Für Ihre Klinik",
    clientItems: [
      "coobi-Pakete (inkl. Garmin-Smartwatches & 12 Monate App-Zugang)",
      "Tägliche Reflexion, E-Learning-Module & Bewältigungstools",
      "Notfallkontakte & Peer-Community",
      "KI-gestützte Echtzeit-Interventionen",
      "Technischer Support",
    ],
    clinicItems: [
      "Therapeuten-Dashboard mit Zugang zu Patientendaten",
      "Kick-off-Workshop (inkl. Onboarding & Mitarbeiterschulung)",
      "Inhaltsanpassungen (Klinikkontakte, kleinere Inhaltsänderungen)",
      "Integrations-Workshop für den vollständigen Rollout nach dem Piloten im dritten Monat des Piloten",
      "Technischer Support",
    ],
    pilotTitle: "Pilotbedingungen",
    pilotDuration: (months: number, n: number) =>
      `${months} Monate über mind. ${n} Klinik${n !== 1 ? "en" : ""}`,
    pilotLicenses: (n: number) =>
      `${n} Patient:innen (12 Monate App-Zugang + Garmin-Smartwatches)`,
    pilotInvestment: (currency: string, price: string) =>
      `${currency}${price} (einmalig) – beinhaltet alles oben Genannte`,
    durationLabel: "Dauer",
    licensesLabel: "Lizenzen",
    investmentLabel: "Investition",
    validUntilLabel: "Angebot gültig bis",
    phasesTitle: "Pilotphasen",
    phasesWhenCol: "Wann",
    phasesWhatCol: "Was passiert",
    phasesRows: (months: number, licenses: number) => [
      {
        when: "Woche 1",
        what: "Pilotstart & Umsetzung: Kick-off-Workshop, Inhaltsanpassungen, Dashboard-Einrichtung und Mitarbeiterschulung.",
      },
      {
        when: `Monate 1–${months}`,
        what: `coobi care mit ${licenses} Patient:innen über die Kliniken testen. Kontinuierliches Monitoring, Dashboard-Nutzung und Nachsorge-Integration.`,
      },
      {
        when: `Anfang Monat ${Math.max(1, months - 1)}`,
        what: "Integrations-Workshop: gemeinsame Auswertung der Pilotergebnisse und Definition der Anforderungen für einen vollständigen Rollout.",
      },
      {
        when: `Monat ${Math.max(1, months - 1)} & ${months}`,
        what: "Umsetzung zusätzlicher Funktionen, Integrationen oder Anpassungen nach Bedarf.",
      },
      {
        when: "Nach dem Piloten",
        what: "Übergang zu Standardpreisen bei Weiternutzung.",
      },
    ],
    sidebarTitle: "Konfiguration",
    langLabel: "Sprache",
    clinicLabel: "Klinik- / Gruppenname",
    clinicPlaceholder: "z.B. Rehaklinikverbund",
    numClinicsLabel: "Anzahl Kliniken",
    numLicensesLabel: "Anzahl Lizenzen",
    pilotDurationLabel: "Pilotdauer (Monate)",
    currencyLabel: "Währung",
    priceLabel: "Preis",
    perPatientLabel: "Pro Patientenlizenz",
    validityDateLabel: "Angebot gültig bis",
    summaryTitle: "Zusammenfassung",
    exportBtn: "PDF exportieren",
    exportingBtn: "Exportiert...",
  },
} as const;

const currencySymbols: Record<string, string> = {
  EUR: "\u20AC",
  GBP: "\u00A3",
  USD: "$",
  CHF: "CHF ",
  AUD: "A$",
  CAD: "C$",
  SEK: "SEK ",
  NOK: "NOK ",
  DKK: "DKK ",
  PLN: "PLN ",
};

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

function getCurrentMonth(lang: "en" | "de"): string {
  const now = new Date();
  return now.toLocaleDateString(lang === "de" ? "de-DE" : "en-US", {
    month: "long",
    year: "numeric",
  });
}

function getDefaultValidityDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().slice(0, 10);
}

function formatDate(isoDate: string, lang: "en" | "de"): string {
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString(lang === "de" ? "de-DE" : "en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function Home() {
  const [lang, setLang] = useState<"en" | "de">("en");
  const [clinicName, setClinicName] = useState("Rehab Clinic Groups");
  const [numClinics, setNumClinics] = useState(2);
  const [numLicenses, setNumLicenses] = useState(30);
  const [pilotMonths, setPilotMonths] = useState(4);
  const [currency, setCurrency] = useState("GBP");
  const [price, setPrice] = useState(20000);
  const [validUntil, setValidUntil] = useState(getDefaultValidityDate);
  const [exporting, setExporting] = useState(false);

  const proposalRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];
  const sym = currencySymbols[currency];
  const perPatient = numLicenses > 0 ? price / numLicenses : 0;
  const clinicPossessive = clinicName
    ? lang === "de"
      ? `${clinicName}s`
      : `${clinicName}'s`
    : lang === "de"
      ? "Ihren"
      : "your";

  const month = getCurrentMonth(lang);
  const phases = t.phasesRows(pilotMonths, numLicenses);

  useEffect(() => {
    document.title = clinicName
      ? `coobi care — Pilot Proposal for ${clinicName}`
      : "coobi care — Pilot Proposal";
  }, [clinicName]);

  async function exportPDF() {
    const el = proposalRef.current;
    if (!el || exporting) return;
    setExporting(true);

    try {
      // A4 in mm
      const A4_W = 210;
      const A4_H = 297;
      const scale = 2;

      const canvas = await html2canvas(el, {
        scale,
        useCORS: true,
        backgroundColor: "#ffffff",
        width: el.scrollWidth,
        height: el.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");
      const imgW = canvas.width;
      const imgH = canvas.height;

      // Fit content width to A4 width
      const pdfW = A4_W;
      const pdfH = (imgH * pdfW) / imgW;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      if (pdfH <= A4_H) {
        // Fits on one page
        pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
      } else {
        // Multi-page: slice the canvas into A4-height chunks
        const pageHeightPx = (A4_H / pdfW) * imgW;
        const totalPages = Math.ceil(imgH / pageHeightPx);

        for (let i = 0; i < totalPages; i++) {
          if (i > 0) pdf.addPage();

          const srcY = i * pageHeightPx;
          const srcH = Math.min(pageHeightPx, imgH - srcY);
          const destH = (srcH * pdfW) / imgW;

          // Create a canvas slice for this page
          const pageCanvas = document.createElement("canvas");
          pageCanvas.width = imgW;
          pageCanvas.height = srcH;
          const ctx = pageCanvas.getContext("2d")!;
          ctx.drawImage(canvas, 0, srcY, imgW, srcH, 0, 0, imgW, srcH);

          const pageData = pageCanvas.toDataURL("image/png");
          pdf.addImage(pageData, "PNG", 0, 0, pdfW, destH);
        }
      }

      const filename = clinicName
        ? `coobi care — Pilot Proposal for ${clinicName}.pdf`
        : "coobi care — Pilot Proposal.pdf";
      pdf.save(filename);
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Top bar */}
      <header
        className="flex items-center justify-between px-6 py-3"
        style={{ backgroundColor: "#1A5276" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-white text-xl font-bold tracking-tight">
            coobi
          </span>
          <span className="text-white/70 text-sm">
            Pilot Proposal Generator
          </span>
        </div>
        <button
          onClick={exportPDF}
          disabled={exporting}
          className="text-white/80 hover:text-white text-sm px-3 py-1.5 border border-white/30 rounded hover:bg-white/10 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-wait"
        >
          {exporting ? t.exportingBtn : t.exportBtn}
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto p-5">
          <h2 className="text-lg font-bold mb-5" style={{ color: "#2C3E50" }}>
            {t.sidebarTitle}
          </h2>

          {/* Language toggle */}
          <label className="block mb-4">
            <span className="text-sm font-medium" style={{ color: "#566573" }}>
              {t.langLabel}
            </span>
            <div className="flex mt-1.5 rounded overflow-hidden border border-gray-300">
              <button
                onClick={() => setLang("en")}
                className={`flex-1 py-2 text-sm font-medium transition-colors cursor-pointer ${lang === "en" ? "text-white" : "text-gray-600 hover:bg-gray-50"}`}
                style={lang === "en" ? { backgroundColor: "#1A5276" } : {}}
              >
                English
              </button>
              <button
                onClick={() => setLang("de")}
                className={`flex-1 py-2 text-sm font-medium transition-colors cursor-pointer ${lang === "de" ? "text-white" : "text-gray-600 hover:bg-gray-50"}`}
                style={lang === "de" ? { backgroundColor: "#1A5276" } : {}}
              >
                Deutsch
              </button>
            </div>
          </label>

          <label className="block mb-4">
            <span className="text-sm font-medium" style={{ color: "#566573" }}>
              {t.clinicLabel}
            </span>
            <input
              type="text"
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              placeholder={t.clinicPlaceholder}
              className="mt-1.5 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2"
              style={{ "--tw-ring-color": "#1A5276" } as React.CSSProperties}
            />
          </label>

          <label className="block mb-4">
            <span className="text-sm font-medium" style={{ color: "#566573" }}>
              {t.numClinicsLabel}
            </span>
            <input
              type="number"
              min={1}
              value={numClinics}
              onChange={(e) => setNumClinics(Math.max(1, +e.target.value))}
              className="mt-1.5 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2"
            />
          </label>

          <label className="block mb-4">
            <span className="text-sm font-medium" style={{ color: "#566573" }}>
              {t.numLicensesLabel}
            </span>
            <input
              type="number"
              min={1}
              value={numLicenses}
              onChange={(e) => setNumLicenses(Math.max(1, +e.target.value))}
              className="mt-1.5 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2"
            />
          </label>

          <label className="block mb-4">
            <span className="text-sm font-medium" style={{ color: "#566573" }}>
              {t.pilotDurationLabel}
            </span>
            <input
              type="number"
              min={1}
              max={24}
              value={pilotMonths}
              onChange={(e) =>
                setPilotMonths(Math.max(1, Math.min(24, +e.target.value)))
              }
              className="mt-1.5 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2"
            />
          </label>

          <label className="block mb-4">
            <span className="text-sm font-medium" style={{ color: "#566573" }}>
              {t.currencyLabel}
            </span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-1.5 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 bg-white cursor-pointer"
            >
              <option value="EUR">EUR (&euro;)</option>
              <option value="GBP">GBP (&pound;)</option>
              <option value="USD">USD ($)</option>
              <option value="CHF">CHF</option>
              <option value="AUD">AUD (A$)</option>
              <option value="CAD">CAD (C$)</option>
              <option value="SEK">SEK</option>
              <option value="NOK">NOK</option>
              <option value="DKK">DKK</option>
              <option value="PLN">PLN</option>
            </select>
          </label>

          <label className="block mb-1">
            <span className="text-sm font-medium" style={{ color: "#566573" }}>
              {t.priceLabel}
            </span>
            <input
              type="number"
              min={0}
              step={500}
              value={price}
              onChange={(e) => setPrice(Math.max(0, +e.target.value))}
              className="mt-1.5 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2"
            />
          </label>
          <p className="text-xs mb-5" style={{ color: "#566573" }}>
            {t.perPatientLabel}: {sym}
            {formatNumber(Math.round(perPatient * 100) / 100)}
          </p>

          <label className="block mb-5">
            <span className="text-sm font-medium" style={{ color: "#566573" }}>
              {t.validityDateLabel}
            </span>
            <input
              type="date"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              className="mt-1.5 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 cursor-pointer"
            />
          </label>

          {/* Summary card */}
          <div
            className="rounded-lg p-4 border"
            style={{ backgroundColor: "#D6EAF8", borderColor: "#1A5276" }}
          >
            <h3
              className="text-sm font-bold mb-3"
              style={{ color: "#1A5276" }}
            >
              {t.summaryTitle}
            </h3>
            <div
              className="space-y-1.5 text-xs"
              style={{ color: "#2C3E50" }}
            >
              <SummaryRow label={t.clinicLabel} value={clinicName || "—"} />
              <SummaryRow
                label={t.numClinicsLabel}
                value={String(numClinics)}
              />
              <SummaryRow
                label={t.numLicensesLabel}
                value={String(numLicenses)}
              />
              <SummaryRow
                label={t.pilotDurationLabel}
                value={`${pilotMonths}m`}
              />
              <SummaryRow
                label={t.priceLabel}
                value={`${sym}${formatNumber(price)}`}
              />
              <SummaryRow
                label={t.perPatientLabel}
                value={`${sym}${formatNumber(Math.round(perPatient * 100) / 100)}`}
              />
              <SummaryRow
                label={t.validityDateLabel}
                value={formatDate(validUntil, lang)}
              />
            </div>
          </div>
        </aside>

        {/* Preview */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-8">
          <div
            ref={proposalRef}
            className="mx-auto bg-white shadow-lg overflow-hidden"
            style={{ fontFamily: "Arial, Helvetica, sans-serif", width: 794, minHeight: 1123 }}
          >
            {/* Proposal header */}
            <div className="px-10 py-5" style={{ backgroundColor: "#1A5276" }}>
              <h1 className="text-xl font-bold text-white">
                <span className="font-bold">{t.title}</span>
                <span className="font-normal text-white/80">
                  {" "}- {t.titleSuffix} {clinicName || "..."}
                </span>
              </h1>
              <p className="text-xs mt-1.5" style={{ color: "#D6EAF8" }}>
                {t.subtitle(month)}
              </p>
            </div>

            <div className="px-10 py-6 space-y-4">
              {/* Pilot Concept */}
              <section>
                <SectionTitle>{t.conceptTitle}</SectionTitle>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#2C3E50" }}
                >
                  {t.concept(clinicPossessive)}
                </p>
              </section>

              {/* How It Works */}
              <section>
                <SectionTitle>{t.howTitle}</SectionTitle>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr>
                      <Th width="22%">{t.howPhaseCol}</Th>
                      <Th>{t.howWhatCol}</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.howPhases.map((p, i) => (
                      <tr key={i} className="border-b border-gray-200">
                        <LabelTd>{p.phase}</LabelTd>
                        <td
                          className="px-4 py-2"
                          style={{ color: "#2C3E50" }}
                        >
                          {p.desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              {/* What's Included */}
              <section>
                <SectionTitle>{t.includedTitle}</SectionTitle>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr>
                      <Th width="50%">{t.forClients}</Th>
                      <Th>{t.forClinic}</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.clientItems.map((item, i) => (
                      <tr key={i} className="border-b border-gray-200">
                        <td
                          className="px-4 py-2"
                          style={{ color: "#2C3E50" }}
                        >
                          <Bullet />
                          {item}
                        </td>
                        <td
                          className="px-4 py-2"
                          style={{ color: "#2C3E50" }}
                        >
                          <Bullet />
                          {t.clinicItems[i]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              {/* Pilot Terms */}
              <section>
                <SectionTitle>{t.pilotTitle}</SectionTitle>
                <table className="w-full text-xs border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <LabelTd width="22%">{t.durationLabel}</LabelTd>
                      <td
                        className="px-4 py-2"
                        style={{ color: "#2C3E50" }}
                      >
                        {t.pilotDuration(pilotMonths, numClinics)}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <LabelTd>{t.licensesLabel}</LabelTd>
                      <td
                        className="px-4 py-2"
                        style={{ color: "#2C3E50" }}
                      >
                        {t.pilotLicenses(numLicenses)}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <LabelTd>{t.investmentLabel}</LabelTd>
                      <td
                        className="px-4 py-2"
                        style={{ color: "#2C3E50" }}
                      >
                        {t.pilotInvestment(sym, formatNumber(price))}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <LabelTd>{t.validUntilLabel}</LabelTd>
                      <td
                        className="px-4 py-2"
                        style={{ color: "#2C3E50" }}
                      >
                        {formatDate(validUntil, lang)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* Pilot Phases */}
              <section>
                <SectionTitle>{t.phasesTitle}</SectionTitle>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr>
                      <Th width="22%">{t.phasesWhenCol}</Th>
                      <Th>{t.phasesWhatCol}</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {phases.map((p, i) => (
                      <tr key={i} className="border-b border-gray-200">
                        <LabelTd>{p.when}</LabelTd>
                        <td
                          className="px-4 py-2"
                          style={{ color: "#2C3E50" }}
                        >
                          {p.what}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              {/* Contact footer */}
              <footer
                className="pt-3 mt-2 text-xs flex flex-wrap items-center gap-x-1"
                style={{ color: "#566573", borderTop: "1px solid #D6EAF8" }}
              >
                <span
                  className="font-semibold"
                  style={{ color: "#2C3E50" }}
                >
                  Julian Kruse
                </span>
                <span>|</span>
                <span>Co-Founder, Stigma Health GmbH (coobi)</span>
                <span>|</span>
                <span>julian@coobi.health</span>
                <span>|</span>
                <span>Book a call</span>
                <span>|</span>
                <span>coobi.health</span>
              </footer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ── Shared small components ── */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-sm font-bold mb-2 pb-1 border-b"
      style={{ color: "#1A5276", borderColor: "#D6A84C" }}
    >
      {children}
    </h2>
  );
}

function Th({
  children,
  width,
}: {
  children: React.ReactNode;
  width?: string;
}) {
  return (
    <th
      className="text-left px-4 py-2 text-white font-semibold text-xs"
      style={{ backgroundColor: "#1A5276", width }}
    >
      {children}
    </th>
  );
}

function LabelTd({
  children,
  width,
}: {
  children: React.ReactNode;
  width?: string;
}) {
  return (
    <td
      className="px-4 py-2 font-medium text-xs whitespace-pre-line"
      style={{ backgroundColor: "#D6EAF8", color: "#1A5276", width }}
    >
      {children}
    </td>
  );
}

function Bullet() {
  return (
    <span
      className="inline-block w-1 h-1 rounded-full mr-1.5 align-middle"
      style={{ backgroundColor: "#1A5276" }}
    />
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span>{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

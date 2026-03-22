"use client";

import { useState } from "react";

const translations = {
  en: {
    title: "coobi care Pilot Proposal",
    subtitle: (month: string) =>
      `Enhancing Aftercare Through Continuous Digital Monitoring | ${month} | Confidential`,
    conceptTitle: "The Concept",
    concept: (clinic: string) =>
      `coobi care bridges the gap between structured treatment and independent living. Clients receive a Garmin smartwatch and companion app in the last 4 weeks of inpatient treatment, then continue using coobi for 12 months after discharge — alongside ${clinic} existing aftercare sessions. The platform passively monitors sleep, stress, activity, and heart-rate variability, giving aftercare specialists continuous visibility into client wellbeing between sessions. To get the most out of this, it helps to allocate some additional time for the aftercare specialist to review the dashboard and check in with clients proactively.`,
    howTitle: "How It Works",
    howPhases: [
      {
        phase: "Last 4 weeks (Inpatient)",
        desc: "Onboarding with smartwatch and app in a supported setting. Therapists establish a data baseline before discharge.",
      },
      {
        phase: "Months 1–12 (Aftercare)",
        desc: "Passive monitoring runs continuously. Aftercare therapist uses the coobi dashboard to identify concerns and reach out proactively. Sessions (in-person or video call) are informed by real data rather than self-report alone.",
      },
    ],
    includedTitle: "What's Included",
    forClients: "For Clients",
    forClinic: "For Your Clinic",
    clientItems: [
      "coobi packages (incl. Garmin smartwatches & 12-month app access)",
      "E-learning modules & coping tools",
      "Emergency contacts & peer community",
      "AI-driven real-time interventions",
    ],
    clinicItems: [
      "Therapist dashboard with alerts",
      "Onboarding & staff training",
      "Content adaptations (clinic contacts, smaller adaptations)",
      "Integration scoping for full rollout after the pilot",
    ],
    pilotTitle: "Pilot Terms",
    pilotDuration: (n: number) =>
      `3 months across ${n} clinic${n !== 1 ? "s" : ""}`,
    pilotLicenses: (n: number) =>
      `${n} patients (12 months app access + Garmin smartwatch each)`,
    pilotInvestment: (currency: string, price: string) =>
      `${currency}${price} (one-time) — includes everything above`,
    pilotAfter:
      "Transition to standard pricing for continued use. Additional features, integrations, or customisations may come at extra cost.",
    durationLabel: "Duration",
    licensesLabel: "Licenses",
    investmentLabel: "Investment",
    afterPilotLabel: "After Pilot",
    validUntilLabel: "Offer Valid Until",
    validityLabel: "Offer Validity",
    aboutTitle: "About coobi",
    about:
      "Berlin-based health-tech company (est. 2021). Live in 37+ centres in Germany. Preliminarily reimbursed by Germany's largest addiction therapy payer. Two clinical studies (300+ patients) underway. King's College London study in preparation. Medical device certified.",
    sidebarTitle: "Configuration",
    langLabel: "Language",
    clinicLabel: "Clinic Name",
    clinicPlaceholder: "e.g. Sunrise Clinic",
    numClinicsLabel: "Number of Clinics",
    numLicensesLabel: "Number of Licenses",
    currencyLabel: "Currency",
    priceLabel: "Price",
    perPatientLabel: "Per patient license",
    validityDateLabel: "Offer Valid Until",
    summaryTitle: "Summary",
  },
  de: {
    title: "coobi care Pilotvorschlag",
    subtitle: (month: string) =>
      `Nachsorge verbessern durch kontinuierliches digitales Monitoring | ${month} | Vertraulich`,
    conceptTitle: "Das Konzept",
    concept: (clinic: string) =>
      `coobi care schließt die Lücke zwischen strukturierter Behandlung und selbstständigem Leben. Klient:innen erhalten in den letzten 4 Wochen der stationären Behandlung eine Garmin-Smartwatch und die zugehörige App und nutzen coobi dann 12 Monate nach der Entlassung weiter — begleitend zu ${clinic} bestehenden Nachsorgesitzungen. Die Plattform überwacht passiv Schlaf, Stress, Aktivität und Herzratenvariabilität und gibt Nachsorge-Spezialist:innen kontinuierliche Einblicke in das Wohlbefinden der Klient:innen zwischen den Sitzungen. Um das Beste daraus zu machen, ist es hilfreich, den Nachsorge-Spezialist:innen etwas zusätzliche Zeit einzuräumen, um das Dashboard zu prüfen und proaktiv mit den Klient:innen in Kontakt zu treten.`,
    howTitle: "So funktioniert's",
    howPhases: [
      {
        phase: "Letzte 4 Wochen (Stationär)",
        desc: "Onboarding mit Smartwatch und App in einem begleiteten Setting. Therapeut:innen erstellen eine Daten-Baseline vor der Entlassung.",
      },
      {
        phase: "Monate 1–12 (Nachsorge)",
        desc: "Passives Monitoring läuft kontinuierlich. Nachsorge-Therapeut:innen nutzen das coobi-Dashboard, um Auffälligkeiten zu erkennen und proaktiv Kontakt aufzunehmen. Sitzungen (persönlich oder per Videoanruf) basieren auf echten Daten statt nur auf Selbstberichten.",
      },
    ],
    includedTitle: "Was ist enthalten",
    forClients: "Für Klient:innen",
    forClinic: "Für Ihre Klinik",
    clientItems: [
      "coobi-Pakete (inkl. Garmin-Smartwatches & 12 Monate App-Zugang)",
      "E-Learning-Module & Bewältigungstools",
      "Notfallkontakte & Peer-Community",
      "KI-gestützte Echtzeit-Interventionen",
    ],
    clinicItems: [
      "Therapeuten-Dashboard mit Warnungen",
      "Onboarding & Mitarbeiterschulung",
      "Inhaltsanpassungen (Klinikkontakte, kleinere Anpassungen)",
      "Integrations-Scoping für den vollständigen Rollout nach dem Piloten",
    ],
    pilotTitle: "Pilotbedingungen",
    pilotDuration: (n: number) =>
      `3 Monate über ${n} Klinik${n !== 1 ? "en" : ""}`,
    pilotLicenses: (n: number) =>
      `${n} Patient:innen (12 Monate App-Zugang + Garmin-Smartwatch pro Person)`,
    pilotInvestment: (currency: string, price: string) =>
      `${currency}${price} (einmalig) — beinhaltet alles oben Genannte`,
    pilotAfter:
      "Übergang zu Standardpreisen bei Weiternutzung. Zusätzliche Funktionen, Integrationen oder Anpassungen können mit Mehrkosten verbunden sein.",
    durationLabel: "Dauer",
    licensesLabel: "Lizenzen",
    investmentLabel: "Investition",
    afterPilotLabel: "Nach dem Piloten",
    validUntilLabel: "Angebot gültig bis",
    validityLabel: "Angebotsgültigkeit",
    aboutTitle: "Über coobi",
    about:
      "Berliner Health-Tech-Unternehmen (gegr. 2021). In über 37 Einrichtungen in Deutschland im Einsatz. Vorläufig erstattet durch Deutschlands größten Kostenträger in der Suchttherapie. Zwei klinische Studien (300+ Patient:innen) laufen. King's College London Studie in Vorbereitung. Medizinprodukt-zertifiziert.",
    sidebarTitle: "Konfiguration",
    langLabel: "Sprache",
    clinicLabel: "Klinikname",
    clinicPlaceholder: "z.B. Sonnenklinik",
    numClinicsLabel: "Anzahl Kliniken",
    numLicensesLabel: "Anzahl Lizenzen",
    currencyLabel: "Währung",
    priceLabel: "Preis",
    perPatientLabel: "Pro Patientenlizenz",
    validityDateLabel: "Angebot gültig bis",
    summaryTitle: "Zusammenfassung",
  },
} as const;

const currencySymbols: Record<string, string> = {
  EUR: "€",
  GBP: "£",
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
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Home() {
  const [lang, setLang] = useState<"en" | "de">("en");
  const [clinicName, setClinicName] = useState("");
  const [numClinics, setNumClinics] = useState(2);
  const [numLicenses, setNumLicenses] = useState(20);
  const [currency, setCurrency] = useState("EUR");
  const [price, setPrice] = useState(20000);
  const [validUntil, setValidUntil] = useState(getDefaultValidityDate);

  const t = translations[lang];
  const sym = currencySymbols[currency];
  const perPatient = numLicenses > 0 ? price / numLicenses : 0;
  const clinicPossessive =
    clinicName
      ? lang === "de"
        ? `${clinicName}s`
        : `${clinicName}'s`
      : lang === "de"
        ? "Ihren"
        : "your";

  const month = getCurrentMonth(lang);

  return (
    <div className="flex flex-col h-screen print:block print:h-auto">
      {/* Top bar */}
      <header
        className="no-print flex items-center justify-between px-6 py-3"
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
          onClick={() => window.print()}
          className="text-white/80 hover:text-white text-sm px-3 py-1.5 border border-white/30 rounded hover:bg-white/10 transition-colors cursor-pointer"
        >
          {lang === "de" ? "PDF exportieren" : "Export PDF"}
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden print:block print:overflow-visible">
        {/* Sidebar */}
        <aside className="no-print w-80 flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto p-5">
          <h2
            className="text-lg font-bold mb-5"
            style={{ color: "#2C3E50" }}
          >
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
                className={`flex-1 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  lang === "en"
                    ? "text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                style={lang === "en" ? { backgroundColor: "#1A5276" } : {}}
              >
                English
              </button>
              <button
                onClick={() => setLang("de")}
                className={`flex-1 py-2 text-sm font-medium transition-colors cursor-pointer ${
                  lang === "de"
                    ? "text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                style={lang === "de" ? { backgroundColor: "#1A5276" } : {}}
              >
                Deutsch
              </button>
            </div>
          </label>

          {/* Clinic name */}
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
              style={
                { "--tw-ring-color": "#1A5276" } as React.CSSProperties
              }
            />
          </label>

          {/* Number of clinics */}
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

          {/* Number of licenses */}
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

          {/* Currency */}
          <label className="block mb-4">
            <span className="text-sm font-medium" style={{ color: "#566573" }}>
              {t.currencyLabel}
            </span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-1.5 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 bg-white cursor-pointer"
            >
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
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

          {/* Price */}
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

          {/* Offer validity date */}
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
            style={{
              backgroundColor: "#D6EAF8",
              borderColor: "#1A5276",
            }}
          >
            <h3
              className="text-sm font-bold mb-3"
              style={{ color: "#1A5276" }}
            >
              {t.summaryTitle}
            </h3>
            <div className="space-y-1.5 text-xs" style={{ color: "#2C3E50" }}>
              <div className="flex justify-between">
                <span>{t.clinicLabel}:</span>
                <span className="font-medium">
                  {clinicName || "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t.numClinicsLabel}:</span>
                <span className="font-medium">{numClinics}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.numLicensesLabel}:</span>
                <span className="font-medium">{numLicenses}</span>
              </div>
              <div className="flex justify-between">
                <span>{t.priceLabel}:</span>
                <span className="font-medium">
                  {sym}
                  {formatNumber(price)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t.perPatientLabel}:</span>
                <span className="font-medium">
                  {sym}
                  {formatNumber(Math.round(perPatient * 100) / 100)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>{t.validityDateLabel}:</span>
                <span className="font-medium">
                  {formatDate(validUntil, lang)}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Preview */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-8 print-full">
          <div
            className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            {/* Proposal header */}
            <div
              className="px-10 py-8"
              style={{ backgroundColor: "#1A5276" }}
            >
              <h1 className="text-2xl font-bold text-white">
                {t.title}
                {clinicName ? ` — ${clinicName}` : ""}
              </h1>
              <p className="text-sm mt-2" style={{ color: "#D6EAF8" }}>
                {t.subtitle(month)}
              </p>
            </div>

            <div className="px-10 py-8 space-y-8">
              {/* The Concept */}
              <section>
                <SectionTitle>{t.conceptTitle}</SectionTitle>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#2C3E50" }}
                >
                  {t.concept(clinicPossessive)}
                </p>
              </section>

              {/* How It Works */}
              <section>
                <SectionTitle>{t.howTitle}</SectionTitle>
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <th
                        className="text-left px-4 py-2.5 text-white font-semibold"
                        style={{ backgroundColor: "#1A5276", width: "30%" }}
                      >
                        {lang === "de" ? "Phase" : "Phase"}
                      </th>
                      <th
                        className="text-left px-4 py-2.5 text-white font-semibold"
                        style={{ backgroundColor: "#1A5276" }}
                      >
                        {lang === "de" ? "Beschreibung" : "Description"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.howPhases.map((p, i) => (
                      <tr key={i} className="border-b border-gray-200">
                        <td
                          className="px-4 py-3 font-medium"
                          style={{
                            backgroundColor: "#D6EAF8",
                            color: "#1A5276",
                          }}
                        >
                          {p.phase}
                        </td>
                        <td
                          className="px-4 py-3"
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
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <th
                        className="text-left px-4 py-2.5 text-white font-semibold"
                        style={{ backgroundColor: "#1A5276", width: "50%" }}
                      >
                        {t.forClients}
                      </th>
                      <th
                        className="text-left px-4 py-2.5 text-white font-semibold"
                        style={{ backgroundColor: "#1A5276" }}
                      >
                        {t.forClinic}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.clientItems.map((item, i) => (
                      <tr key={i} className="border-b border-gray-200">
                        <td className="px-4 py-2.5" style={{ color: "#2C3E50" }}>
                          <span
                            className="inline-block w-1.5 h-1.5 rounded-full mr-2"
                            style={{ backgroundColor: "#1A5276" }}
                          />
                          {item}
                        </td>
                        <td className="px-4 py-2.5" style={{ color: "#2C3E50" }}>
                          <span
                            className="inline-block w-1.5 h-1.5 rounded-full mr-2"
                            style={{ backgroundColor: "#1A5276" }}
                          />
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
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <th
                        className="text-left px-4 py-2.5 text-white font-semibold"
                        style={{ backgroundColor: "#1A5276", width: "25%" }}
                      >
                        &nbsp;
                      </th>
                      <th
                        className="text-left px-4 py-2.5 text-white font-semibold"
                        style={{ backgroundColor: "#1A5276" }}
                      >
                        &nbsp;
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td
                        className="px-4 py-3 font-medium"
                        style={{
                          backgroundColor: "#D6EAF8",
                          color: "#1A5276",
                        }}
                      >
                        {t.durationLabel}
                      </td>
                      <td className="px-4 py-3" style={{ color: "#2C3E50" }}>
                        {t.pilotDuration(numClinics)}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td
                        className="px-4 py-3 font-medium"
                        style={{
                          backgroundColor: "#D6EAF8",
                          color: "#1A5276",
                        }}
                      >
                        {t.licensesLabel}
                      </td>
                      <td className="px-4 py-3" style={{ color: "#2C3E50" }}>
                        {t.pilotLicenses(numLicenses)}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td
                        className="px-4 py-3 font-medium"
                        style={{
                          backgroundColor: "#D6EAF8",
                          color: "#1A5276",
                        }}
                      >
                        {t.investmentLabel}
                      </td>
                      <td className="px-4 py-3" style={{ color: "#2C3E50" }}>
                        {t.pilotInvestment(sym, formatNumber(price))}
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td
                        className="px-4 py-3 font-medium"
                        style={{
                          backgroundColor: "#D6EAF8",
                          color: "#1A5276",
                        }}
                      >
                        {t.afterPilotLabel}
                      </td>
                      <td className="px-4 py-3" style={{ color: "#2C3E50" }}>
                        {t.pilotAfter}
                      </td>
                    </tr>
                    <tr>
                      <td
                        className="px-4 py-3 font-medium"
                        style={{
                          backgroundColor: "#D6EAF8",
                          color: "#1A5276",
                        }}
                      >
                        {t.validUntilLabel}
                      </td>
                      <td className="px-4 py-3 font-medium" style={{ color: "#2C3E50" }}>
                        {formatDate(validUntil, lang)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* About coobi */}
              <section>
                <SectionTitle>{t.aboutTitle}</SectionTitle>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#2C3E50" }}
                >
                  {t.about}
                </p>
              </section>

              {/* Contact footer */}
              <footer
                className="rounded-lg px-6 py-4 text-sm flex flex-wrap items-center gap-x-4 gap-y-1"
                style={{ backgroundColor: "#D6EAF8", color: "#1A5276" }}
              >
                <span className="font-semibold">Julian Kruse</span>
                <span>Co-Founder, coobi GmbH</span>
                <span>julian@coobi.health</span>
                <a
                  href="https://cal.com/julian-kruse/demo"
                  className="underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a call
                </a>
                <a
                  href="https://www.coobi.health"
                  className="underline hover:no-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.coobi.health
                </a>
              </footer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-base font-bold mb-3 pb-1.5 border-b-2"
      style={{ color: "#1A5276", borderColor: "#1A5276" }}
    >
      {children}
    </h2>
  );
}

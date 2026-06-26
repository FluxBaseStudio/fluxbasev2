import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Regulamin",
  description: "Regulamin strony internetowej FluxBase.",
};

export default function Page() {
  return (
    <main className="legal-page-shell">
      <section className="legal-page">
        <span className="section-eyebrow">Dokumenty FluxBase</span>
        <h1>Regulamin</h1>
        <div className="legal-card liquid-panel">
          <h2>1. Dane właściciela strony</h2>
          <p>
            Strona internetowa działa pod marką FluxBase. Właściciel: FluxBase Julian Rutkowski, działalność nierejestrowana, adres: PCK 1C, 95-200 Pabianice, Polska. Kontakt: office@fluxbase.pl, tel. +48 694 873 748.
          </p>

          <h2>2. Charakter strony</h2>
          <p>
            Strona prezentuje ofertę usług związanych z projektowaniem i wdrażaniem stron internetowych, landing page, portfolio, systemów webowych, integracji, automatyzacji oraz rozwiązań cyfrowych.
          </p>

          <h2>3. Kontakt i zapytania</h2>
          <p>
            Wysłanie formularza kontaktowego lub wiadomości e-mail nie oznacza zawarcia umowy. Jest to zaproszenie do kontaktu i ustalenia szczegółów potencjalnej współpracy.
          </p>

          <h2>4. Zawarcie współpracy</h2>
          <p>
            Zakres prac, cena, termin realizacji, forma płatności i sposób przekazania materiałów są ustalane indywidualnie z klientem. Płatności mogą być obsługiwane przez Stripe albo wysyłane klientowi indywidualnie w formie linku płatności.
          </p>

          <h2>5. Faktury i rozliczenia</h2>
          <p>
            Dokumenty rozliczeniowe mogą być wystawiane lub wysyłane z wykorzystaniem Stripe albo innych uzgodnionych narzędzi. Klient powinien przekazać poprawne dane potrzebne do rozliczenia.
          </p>

          <h2>6. Materiały klienta</h2>
          <p>
            Klient odpowiada za legalność i prawidłowość materiałów przekazanych do projektu, w szczególności tekstów, zdjęć, znaków towarowych, danych firmowych, grafik i innych treści.
          </p>

          <h2>7. Portfolio</h2>
          <p>
            FluxBase może prezentować wybrane realizacje w portfolio, chyba że z klientem ustalono inaczej. Portfolio może być technicznie zarządzane przez Stripe poprzez nazwę projektu, opis, zdjęcie i link demo.
          </p>

          <h2>8. Prawa autorskie</h2>
          <p>
            Elementy strony, teksty, układy, kod, animacje i materiały przygotowane przez FluxBase podlegają ochronie prawnej. Szczegółowe zasady przeniesienia praw lub udzielenia licencji powinny być określone w indywidualnych ustaleniach z klientem.
          </p>

          <h2>9. Dostępność strony</h2>
          <p>
            FluxBase dokłada starań, aby strona działała poprawnie, ale nie gwarantuje nieprzerwanej dostępności serwisu. Przerwy mogą wynikać z prac technicznych, aktualizacji, awarii hostingu, problemów po stronie dostawców lub czynników niezależnych.
          </p>

          <h2>10. Odpowiedzialność</h2>
          <p>
            Informacje na stronie mają charakter informacyjny. Szczegółowe warunki realizacji usług są ustalane indywidualnie przed rozpoczęciem prac.
          </p>

          <h2>11. Dokumenty prawne</h2>
          <p>
            Korzystanie ze strony wiąże się również z dokumentami: Polityka prywatności, RODO oraz Polityka plików cookies.
          </p>
        </div>
        <Link href="/" className="back-home">← Powrót do strony głównej</Link>
      </section>
    </main>
  );
}

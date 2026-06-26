import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "RODO",
  description: "Klauzula informacyjna RODO FluxBase Julian Rutkowski.",
};

export default function Page() {
  return (
    <main className="legal-page-shell">
      <section className="legal-page">
        <span className="section-eyebrow">Dokumenty FluxBase</span>
        <h1>RODO</h1>
        <div className="legal-card liquid-panel">
          <h2>1. Klauzula informacyjna</h2>
          <p>
            Administratorem danych osobowych jest FluxBase Julian Rutkowski, działalność nierejestrowana, PCK 1C, 95-200 Pabianice, Polska. Kontakt w sprawie danych: office@fluxbase.pl.
          </p>

          <h2>2. Dane zbierane bezpośrednio od użytkownika</h2>
          <p>
            Dane są zbierane głównie wtedy, gdy użytkownik wysyła formularz kontaktowy, zapisuje się do newslettera, prowadzi korespondencję, zamawia usługę, korzysta z płatności Stripe lub przekazuje dane potrzebne do faktury albo rozliczenia.
          </p>

          <h2>3. Cele przetwarzania</h2>
          <ul>
            <li>odpowiedź na zapytanie i prowadzenie korespondencji,</li>
            <li>przygotowanie oferty i ustalenie zakresu projektu,</li>
            <li>realizacja usługi i obsługa klienta,</li>
            <li>obsługa płatności, faktur i dokumentów rozliczeniowych,</li>
            <li>wysyłka newslettera po wyrażeniu zgody,</li>
            <li>analityka strony i działania marketingowe po wyrażeniu zgody,</li>
            <li>zabezpieczenie roszczeń i ochrona praw administratora.</li>
          </ul>

          <h2>4. Podstawy prawne</h2>
          <p>
            Dane są przetwarzane na podstawie art. 6 ust. 1 lit. a, b, c oraz f RODO, zależnie od celu: zgody, działań przed zawarciem umowy, realizacji umowy, obowiązku prawnego albo prawnie uzasadnionego interesu administratora.
          </p>

          <h2>5. Odbiorcy danych</h2>
          <p>
            Odbiorcami danych mogą być dostawcy usług technicznych i narzędzi wykorzystywanych przez stronę: Netlify, Vercel, Google Workspace / Gmail SMTP, Stripe, Google Analytics, Google Search Console oraz dostawcy usług IT i poczty elektronicznej.
          </p>

          <h2>6. Okres przechowywania</h2>
          <p>
            Dane z zapytań kontaktowych są przechowywane przez czas potrzebny do obsługi rozmowy, a następnie maksymalnie przez 12 miesięcy. Dane związane z umowami, płatnościami i fakturami są przechowywane przez okres wymagany przepisami prawa. Dane newsletterowe są przechowywane do czasu cofnięcia zgody.
          </p>

          <h2>7. Prawa użytkownika</h2>
          <ul>
            <li>prawo dostępu do danych,</li>
            <li>prawo sprostowania danych,</li>
            <li>prawo usunięcia danych,</li>
            <li>prawo ograniczenia przetwarzania,</li>
            <li>prawo przenoszenia danych,</li>
            <li>prawo sprzeciwu,</li>
            <li>prawo cofnięcia zgody.</li>
          </ul>

          <h2>8. Kontakt</h2>
          <p>
            W celu realizacji swoich praw można skontaktować się mailowo: office@fluxbase.pl.
          </p>
        </div>
        <Link href="/" className="back-home">← Powrót do strony głównej</Link>
      </section>
    </main>
  );
}

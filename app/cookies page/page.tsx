import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Polityka plików cookies",
  description: "Polityka plików cookies i localStorage FluxBase.",
};

export default function Page() {
  return (
    <main className="legal-page-shell">
      <section className="legal-page">
        <span className="section-eyebrow">Dokumenty FluxBase</span>
        <h1>Polityka plików cookies</h1>
        <div className="legal-card liquid-panel">
          <h2>1. Czym są cookies i localStorage?</h2>
          <p>
            Cookies to małe pliki zapisywane w przeglądarce użytkownika. LocalStorage to pamięć przeglądarki, która może zapisywać ustawienia strony, np. wybór trybu jasnego lub ciemnego oraz decyzję dotyczącą zgody cookies.
          </p>

          <h2>2. Jakich technologii używa FluxBase?</h2>
          <ul>
            <li>cookies i localStorage niezbędne do prawidłowego działania strony,</li>
            <li>localStorage do zapamiętania trybu jasnego lub ciemnego,</li>
            <li>localStorage do zapamiętania decyzji w pop-upie cookies,</li>
            <li>cookies analityczne, np. Google Analytics, jeżeli użytkownik wyrazi zgodę,</li>
            <li>cookies marketingowe, jeżeli zostaną wdrożone i użytkownik wyrazi zgodę.</li>
          </ul>

          <h2>3. Kategorie cookies</h2>
          <p>
            Niezbędne cookies i dane techniczne są używane, aby strona działała poprawnie. Analityczne cookies pomagają mierzyć ruch, źródła wejść i sposób korzystania ze strony. Marketingowe cookies mogą pomagać w mierzeniu skuteczności reklam i działań promocyjnych.
          </p>

          <h2>4. Zgoda użytkownika</h2>
          <p>
            Cookies analityczne i marketingowe są używane po wyrażeniu zgody. Użytkownik może zaakceptować wszystkie pliki, wybrać tylko niezbędne albo odrzucić dodatkowe kategorie. Brak zgody nie blokuje dostępu do strony.
          </p>

          <h2>5. Zmiana lub cofnięcie zgody</h2>
          <p>
            Zgodę można zmienić przez usunięcie danych strony w ustawieniach przeglądarki. Po usunięciu danych pop-up cookies pojawi się ponownie. Można również zablokować cookies w ustawieniach przeglądarki.
          </p>

          <h2>6. Narzędzia zewnętrzne</h2>
          <p>
            Strona może korzystać z Google Analytics, Google Search Console, Stripe, Netlify, Vercel oraz Google Workspace / Gmail SMTP. Każdy z tych dostawców może stosować własne technologie techniczne zgodnie ze swoimi zasadami prywatności.
          </p>

          <h2>7. Kontakt</h2>
          <p>
            W sprawach dotyczących cookies można skontaktować się pod adresem office@fluxbase.pl.
          </p>
        </div>
        <Link href="/" className="back-home">← Powrót do strony głównej</Link>
      </section>
    </main>
  );
}

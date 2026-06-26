import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Polityka prywatności FluxBase Julian Rutkowski.",
};

export default function Page() {
  return (
    <main className="legal-page-shell">
      <section className="legal-page">
        <span className="section-eyebrow">Dokumenty FluxBase</span>
        <h1>Polityka prywatności</h1>
        <div className="legal-card liquid-panel">
          <h2>1. Administrator danych</h2>
          <p>
            Administratorem danych osobowych jest FluxBase Julian Rutkowski, działalność nierejestrowana, adres: PCK 1C, 95-200 Pabianice, Polska. Kontakt: office@fluxbase.pl, tel. +48 694 873 748.
          </p>

          <h2>2. Zakres przetwarzanych danych</h2>
          <p>
            W zależności od sposobu korzystania ze strony możemy przetwarzać: imię i nazwisko lub nazwę firmy, adres e-mail, numer telefonu, treść wiadomości, dane potrzebne do przygotowania oferty, dane rozliczeniowe, dane dotyczące płatności, adres IP, identyfikatory cookies, dane analityczne oraz informacje o aktywności na stronie.
          </p>

          <h2>3. Cele i podstawy przetwarzania</h2>
          <ul>
            <li>obsługa formularza kontaktowego i korespondencji: art. 6 ust. 1 lit. f RODO, czyli prawnie uzasadniony interes polegający na kontakcie z osobą zainteresowaną ofertą;</li>
            <li>przygotowanie wyceny lub podjęcie działań przed zawarciem umowy: art. 6 ust. 1 lit. b RODO;</li>
            <li>realizacja usługi, rozliczenia, płatności i obsługa faktur: art. 6 ust. 1 lit. b oraz lit. c RODO;</li>
            <li>newsletter i komunikacja marketingowa: art. 6 ust. 1 lit. a RODO, czyli zgoda osoby zapisującej się;</li>
            <li>analityka i marketing internetowy, w tym Google Analytics: art. 6 ust. 1 lit. a RODO po wyrażeniu zgody na cookies analityczne lub marketingowe;</li>
            <li>zabezpieczenie roszczeń i ochrona praw administratora: art. 6 ust. 1 lit. f RODO.</li>
          </ul>

          <h2>4. Formularz kontaktowy</h2>
          <p>
            Podanie danych w formularzu jest dobrowolne, ale brak adresu e-mail lub treści wiadomości może uniemożliwić odpowiedź. Formularz wysyłany jest z wykorzystaniem poczty Gmail SMTP / Google Workspace.
          </p>

          <h2>5. Newsletter</h2>
          <p>
            Newsletter oznacza dobrowolną listę e-mailową, na którą użytkownik może się zapisać, aby otrzymywać informacje od FluxBase, np. aktualności, oferty, materiały edukacyjne lub informacje o usługach. Zapis wymaga zgody, a zgodę można wycofać w dowolnym momencie, kontaktując się pod adresem office@fluxbase.pl lub korzystając z linku rezygnacji, jeżeli zostanie dodany do wiadomości.
          </p>

          <h2>6. Płatności i Stripe</h2>
          <p>
            Stripe może być wykorzystywany do prezentacji portfolio, obsługi płatności oraz wystawiania lub przesyłania dokumentów rozliczeniowych. W przypadku płatności dane mogą być przekazywane do Stripe w zakresie potrzebnym do obsługi transakcji, bezpieczeństwa płatności i rozliczeń.
          </p>

          <h2>7. Narzędzia techniczne i odbiorcy danych</h2>
          <p>
            Dane mogą być przetwarzane z wykorzystaniem narzędzi takich jak Netlify, Vercel, Google Workspace / Gmail SMTP, Stripe, Google Analytics, Google Search Console oraz dostawcy usług IT, hostingu i poczty elektronicznej. Dane są udostępniane tylko w zakresie niezbędnym do działania strony, kontaktu, analityki, płatności lub rozliczeń.
          </p>

          <h2>8. Przekazywanie danych poza Europejski Obszar Gospodarczy</h2>
          <p>
            Niektórzy dostawcy usług, w szczególności Google, Stripe, Netlify lub Vercel, mogą przetwarzać dane poza Europejskim Obszarem Gospodarczym. W takim przypadku stosowane są odpowiednie mechanizmy ochrony danych przewidziane przez RODO, np. standardowe klauzule umowne lub inne legalne podstawy transferu.
          </p>

          <h2>9. Okres przechowywania danych</h2>
          <ul>
            <li>dane z formularza kontaktowego: przez czas obsługi zapytania, a następnie maksymalnie przez 12 miesięcy, chyba że dalsze przechowywanie jest potrzebne do obrony roszczeń;</li>
            <li>dane dotyczące umów, płatności i rozliczeń: przez okres wymagany przepisami podatkowymi i rachunkowymi;</li>
            <li>dane newsletterowe: do czasu wycofania zgody lub zakończenia prowadzenia newslettera;</li>
            <li>dane cookies i localStorage: zgodnie z ustawieniami przeglądarki, do czasu usunięcia przez użytkownika lub zmiany zgody;</li>
            <li>dane analityczne: przez okres wynikający z ustawień narzędzi analitycznych.</li>
          </ul>

          <h2>10. Prawa osoby, której dane dotyczą</h2>
          <p>
            Osobie, której dane dotyczą, przysługuje prawo dostępu do danych, sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia danych, sprzeciwu wobec przetwarzania oraz cofnięcia zgody, jeżeli dane są przetwarzane na podstawie zgody.
          </p>

          <h2>11. Skarga do organu nadzorczego</h2>
          <p>
            Użytkownik ma prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych, jeżeli uzna, że przetwarzanie danych narusza przepisy RODO.
          </p>

          <h2>12. Brak kont użytkowników</h2>
          <p>
            Strona nie umożliwia zakładania kont użytkowników.
          </p>

          <h2>13. Zmiany polityki</h2>
          <p>
            Polityka prywatności może zostać zaktualizowana, jeżeli zmieni się zakres działania strony, narzędzia techniczne, sposób kontaktu, płatności lub przepisy prawa.
          </p>
        </div>
        <Link href="/" className="back-home">← Powrót do strony głównej</Link>
      </section>
    </main>
  );
}

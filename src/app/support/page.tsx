import { HelpCircle, Mail, Phone, MessageCircle, ChevronDown } from "lucide-react";

const faqItems = [
  { q: "Hvordan opretter jeg en annonce?", a: "Klik på 'Sælg din bil' i menuen. Følg trinnene for at angive bilens oplysninger, uploade billeder og vælge annoncepakke." },
  { q: "Hvad koster det at annoncere?", a: "En basis-annonce er gratis. Plus koster 149 kr. og Premium koster 349 kr. med øget synlighed." },
  { q: "Hvordan kontakter jeg en sælger?", a: "Du kan sende en besked, ringe eller skrive en email direkte fra annoncesiden." },
  { q: "Kan jeg redigere min annonce?", a: "Ja, log ind og gå til 'Mine annoncer'. Klik på 'Rediger' ud for den annonce du vil ændre." },
  { q: "Hvor længe er min annonce aktiv?", a: "En basis-annonce er aktiv i 30 dage. Premium-annoncer er aktive i 60 dage. Du kan forny din annonce når den udløber." },
  { q: "Hvordan sletter jeg min annonce?", a: "Gå til 'Mine annoncer' og klik 'Slet'. Du kan også markere bilen som solgt." },
  { q: "Er det sikkert at handle på BilMatch?", a: "Vi anbefaler at mødes personligt ved handel, og aldrig overføre penge før du har set bilen. Læs vores sikkerhedsguide for mere info." },
  { q: "Hvordan rapporterer jeg en mistænkelig annonce?", a: "Klik på flag-ikonet på annoncesiden for at rapportere den til vores team." },
];

export default function SupportPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Kundeservice</h1>
        <p className="text-gray-500">Har du brug for hjælp? Find svar nedenfor eller kontakt os</p>
      </div>

      {/* Contact options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
          <Mail className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">Email</h3>
          <p className="text-sm text-gray-500 mt-1">support@bilmatch.dk</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
          <Phone className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">Telefon</h3>
          <p className="text-sm text-gray-500 mt-1">+45 70 20 30 40</p>
          <p className="text-xs text-gray-400">Man-Fre 09-17</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 text-center">
          <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900">Live chat</h3>
          <p className="text-sm text-gray-500 mt-1">Tilgængelig i åbningstiden</p>
        </div>
      </div>

      {/* FAQ */}
      <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <HelpCircle className="w-5 h-5 text-primary" />
        Ofte stillede spørgsmål
      </h2>
      <div className="space-y-2">
        {faqItems.map((item, i) => (
          <details key={i} className="group bg-white rounded-lg border border-gray-200">
            <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-medium text-gray-900 hover:bg-gray-50">
              {item.q}
              <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-4 pb-4">
              <p className="text-sm text-gray-600">{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

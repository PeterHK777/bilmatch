export const SITE_NAME = "BilMatch";
export const SITE_DESCRIPTION = "Danmarks største markedsplads for biler";

export const REGIONS = [
  "København",
  "Nordsjælland",
  "Syd- og Vestsjælland",
  "Bornholm",
  "Lolland-Falster",
  "Fyn",
  "Syd- og Sønderjylland",
  "Vestjylland",
  "Østjylland",
  "Nordjylland",
] as const;

export const FUEL_TYPE_LABELS: Record<string, string> = {
  BENZIN: "Benzin",
  DIESEL: "Diesel",
  EL: "El",
  HYBRID: "Hybrid",
  PLUGIN_HYBRID: "Plug-in hybrid",
  BRINT: "Brint",
};

export const BODY_TYPE_LABELS: Record<string, string> = {
  SEDAN: "Sedan",
  STATIONCAR: "Stationcar",
  SUV: "SUV",
  COUPE: "Coupé",
  CABRIOLET: "Cabriolet",
  MPV: "MPV",
  MIKRO: "Mikro",
  HATCHBACK: "Hatchback",
  CUV: "CUV",
};

export const TRANSMISSION_LABELS: Record<string, string> = {
  MANUAL: "Manuel",
  AUTOMATIC: "Automatisk",
};

export const CATEGORY_LABELS: Record<string, string> = {
  PERSONBIL: "Personbil",
  VAREBIL_INKL_MOMS: "Varebil inkl. moms",
  VAREBIL_EKSKL_MOMS: "Varebil ekskl. moms",
  AUTOCAMPER: "Autocamper",
  BUS: "Bus",
  LASTBIL: "Lastbil",
};

export const PACKAGE_TIER_LABELS: Record<string, string> = {
  BASIS: "Basis",
  PLUS: "Plus",
  PREMIUM: "Premium",
};

export const CAR_MAKES: Record<string, string[]> = {
  Audi: ["A1", "A3", "A4", "A5", "A6", "A7", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "e-tron", "e-tron GT", "RS3", "RS4", "RS5", "RS6", "TT"],
  BMW: ["1-serie", "2-serie", "3-serie", "4-serie", "5-serie", "6-serie", "7-serie", "8-serie", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "Z4", "i3", "i4", "iX", "iX3"],
  "Mercedes-Benz": ["A-Klasse", "B-Klasse", "C-Klasse", "E-Klasse", "S-Klasse", "CLA", "CLS", "GLA", "GLB", "GLC", "GLE", "GLS", "EQA", "EQB", "EQC", "EQE", "EQS"],
  Volkswagen: ["Golf", "Polo", "Passat", "Arteon", "Touran", "Tiguan", "T-Roc", "T-Cross", "Up!", "ID.3", "ID.4", "ID.5", "ID.Buzz", "Caddy", "Transporter", "Multivan"],
  Toyota: ["Yaris", "Corolla", "Camry", "RAV4", "C-HR", "Highlander", "Land Cruiser", "Aygo X", "Proace", "bZ4X", "Supra", "GR86"],
  Peugeot: ["208", "308", "408", "508", "2008", "3008", "5008", "e-208", "e-308", "e-2008", "Rifter", "Partner"],
  Citroën: ["C3", "C4", "C5 X", "C3 Aircross", "C5 Aircross", "Berlingo", "ë-C4", "ë-Berlingo"],
  Renault: ["Clio", "Captur", "Mégane", "Kadjar", "Arkana", "Scenic", "Kangoo", "Zoe", "Megane E-Tech", "Austral"],
  Ford: ["Fiesta", "Focus", "Mondeo", "Puma", "Kuga", "Explorer", "Mustang", "Mustang Mach-E", "Transit", "Transit Connect", "Ranger"],
  Opel: ["Corsa", "Astra", "Insignia", "Mokka", "Crossland", "Grandland", "Combo", "Vivaro"],
  Hyundai: ["i10", "i20", "i30", "Tucson", "Kona", "Santa Fe", "IONIQ 5", "IONIQ 6", "Bayon"],
  Kia: ["Picanto", "Rio", "Ceed", "Sportage", "Sorento", "Niro", "EV6", "EV9", "Stonic", "XCeed"],
  Volvo: ["S60", "S90", "V60", "V90", "XC40", "XC60", "XC90", "C40", "EX30", "EX90"],
  Skoda: ["Fabia", "Octavia", "Superb", "Kamiq", "Karoq", "Kodiaq", "Enyaq", "Scala"],
  Seat: ["Ibiza", "Leon", "Arona", "Ateca", "Tarraco"],
  Cupra: ["Born", "Formentor", "Leon", "Ateca", "Tavascan"],
  Tesla: ["Model 3", "Model Y", "Model S", "Model X"],
  Fiat: ["500", "500e", "500X", "Panda", "Tipo", "Ducato"],
  Mazda: ["2", "3", "6", "CX-3", "CX-30", "CX-5", "CX-60", "MX-5", "MX-30"],
  Nissan: ["Micra", "Juke", "Qashqai", "X-Trail", "Leaf", "Ariya", "Navara"],
  Honda: ["Jazz", "Civic", "HR-V", "CR-V", "ZR-V", "e:Ny1", "Honda e"],
  Suzuki: ["Swift", "Ignis", "Vitara", "S-Cross", "Jimny", "Across"],
  Mitsubishi: ["Space Star", "ASX", "Eclipse Cross", "Outlander"],
  Dacia: ["Sandero", "Duster", "Jogger", "Spring"],
  "Land Rover": ["Defender", "Discovery", "Discovery Sport", "Range Rover", "Range Rover Sport", "Range Rover Velar", "Range Rover Evoque"],
  Jaguar: ["XE", "XF", "F-Pace", "E-Pace", "I-Pace", "F-Type"],
  Porsche: ["911", "718 Cayman", "718 Boxster", "Cayenne", "Macan", "Taycan", "Panamera"],
  Mini: ["Cooper", "Countryman", "Clubman", "Electric"],
  "Alfa Romeo": ["Giulia", "Stelvio", "Tonale"],
  DS: ["DS 3", "DS 4", "DS 7", "DS 9"],
  MG: ["ZS", "HS", "MG4", "MG5", "Marvel R"],
  BYD: ["Atto 3", "Han", "Tang", "Dolphin", "Seal"],
  Polestar: ["Polestar 2", "Polestar 3", "Polestar 4"],
  Lexus: ["UX", "NX", "RX", "ES", "LS", "LC", "RZ"],
  Subaru: ["Impreza", "XV", "Outback", "Forester", "Solterra", "BRZ"],
  Jeep: ["Renegade", "Compass", "Cherokee", "Grand Cherokee", "Wrangler", "Avenger"],
};

export const POPULAR_MAKES = ["Audi", "BMW", "Mercedes-Benz", "Volkswagen", "Toyota", "Peugeot", "Volvo", "Tesla", "Kia", "Hyundai", "Ford", "Skoda"];

export const EQUIPMENT_LIST = [
  { name: "ABS", category: "Sikkerhed" },
  { name: "ESP", category: "Sikkerhed" },
  { name: "Adaptive fartpilot", category: "Sikkerhed" },
  { name: "Bakkamera", category: "Sikkerhed" },
  { name: "Parkeringssensor for", category: "Sikkerhed" },
  { name: "Parkeringssensor bag", category: "Sikkerhed" },
  { name: "Vognbaneskift-assistent", category: "Sikkerhed" },
  { name: "Nødbremsesystem", category: "Sikkerhed" },
  { name: "Blindvinkel-assistent", category: "Sikkerhed" },
  { name: "Isofix", category: "Sikkerhed" },
  { name: "Sædevarme", category: "Komfort" },
  { name: "Sædevarme bag", category: "Komfort" },
  { name: "Aircondition", category: "Komfort" },
  { name: "Klimaautomatik", category: "Komfort" },
  { name: "Automatisk klimaanlæg (2-zone)", category: "Komfort" },
  { name: "Elektrisk sæde", category: "Komfort" },
  { name: "Elektrisk bakluge", category: "Komfort" },
  { name: "Keyless start", category: "Komfort" },
  { name: "Keyless entry", category: "Komfort" },
  { name: "Ratvarme", category: "Komfort" },
  { name: "Panoramatag", category: "Komfort" },
  { name: "Soltag", category: "Komfort" },
  { name: "Elektriske ruder (4)", category: "Komfort" },
  { name: "Elektriske sidespejle", category: "Komfort" },
  { name: "LED-forlygter", category: "Exteriør" },
  { name: "LED-baglygter", category: "Exteriør" },
  { name: "Xenon-forlygter", category: "Exteriør" },
  { name: "Automatisk fjernlys", category: "Exteriør" },
  { name: "Tågelygter", category: "Exteriør" },
  { name: "Metallic lak", category: "Exteriør" },
  { name: "Alufælge", category: "Exteriør" },
  { name: "Alufælge 17\"", category: "Exteriør" },
  { name: "Alufælge 18\"", category: "Exteriør" },
  { name: "Alufælge 19\"", category: "Exteriør" },
  { name: "Tagræling", category: "Exteriør" },
  { name: "Navigationssystem", category: "Infotainment" },
  { name: "Apple CarPlay", category: "Infotainment" },
  { name: "Android Auto", category: "Infotainment" },
  { name: "Bluetooth", category: "Infotainment" },
  { name: "DAB-radio", category: "Infotainment" },
  { name: "Trådløs opladning", category: "Infotainment" },
  { name: "Head-up display", category: "Infotainment" },
  { name: "Bose lydanlæg", category: "Infotainment" },
  { name: "Harman Kardon lydanlæg", category: "Infotainment" },
  { name: "Bang & Olufsen lydanlæg", category: "Infotainment" },
  { name: "Touchskærm", category: "Infotainment" },
  { name: "Digital cockpit", category: "Infotainment" },
  { name: "Trækkrog", category: "Andet" },
  { name: "Anhængertræk (aftageligt)", category: "Andet" },
  { name: "Læderindtræk", category: "Andet" },
  { name: "Sportssæder", category: "Andet" },
  { name: "Multifunktionsrat", category: "Andet" },
];

export const COLORS = [
  "Sort", "Hvid", "Sølv", "Grå", "Blå", "Rød", "Grøn", "Brun", "Beige", "Gul", "Orange", "Bordeaux", "Antracit",
];

export const LISTINGS_PER_PAGE = 30;

import Link from "next/link";
import { Calendar, ArrowRight, User } from "lucide-react";

const blogPosts = [
  {
    id: "1",
    title: "Elbiler i 2026: Komplet guide til køb af elbil",
    excerpt: "Alt du skal vide om at købe elbil i Danmark. Vi gennemgår rækkevidde, ladeinfrastruktur, økonomi og de bedste modeller på markedet.",
    author: "Redaktionen",
    date: "2026-04-08",
    category: "Guide",
    image: "https://placehold.co/800x400/0054a6/ffffff?text=Elbiler+2026",
  },
  {
    id: "2",
    title: "Sådan forbereder du din bil til salg",
    excerpt: "5 enkle trin til at maksimere salgsprisen på din brugte bil. Fra klargøring og rengøring til den perfekte annonce.",
    author: "Redaktionen",
    date: "2026-04-05",
    category: "Salgsguide",
    image: "https://placehold.co/800x400/28a745/ffffff?text=Sælg+din+bil",
  },
  {
    id: "3",
    title: "Top 10: Bedste familiebiler 2026",
    excerpt: "Vi har testet og sammenlignet de mest populære familiebiler. Se hvilken bil der passer bedst til din familie.",
    author: "Redaktionen",
    date: "2026-04-01",
    category: "Test",
    image: "https://placehold.co/800x400/333333/ffffff?text=Familiebiler",
  },
  {
    id: "4",
    title: "Hvornår er det bedst at købe brugt bil?",
    excerpt: "Priserne på brugte biler svinger over året. Vi analyserer de bedste tidspunkter at slå til.",
    author: "Redaktionen",
    date: "2026-03-28",
    category: "Analyse",
    image: "https://placehold.co/800x400/f59e0b/ffffff?text=Købstidspunkt",
  },
  {
    id: "5",
    title: "Guide: Tjek af brugt bil inden køb",
    excerpt: "En grundig gennemgang af hvad du skal kigge efter, når du skal købe brugt bil. Undgå dyre overraskelser.",
    author: "Redaktionen",
    date: "2026-03-22",
    category: "Købsguide",
    image: "https://placehold.co/800x400/ef4444/ffffff?text=Bilkøb+Guide",
  },
  {
    id: "6",
    title: "Hybridbiler: Fordele og ulemper",
    excerpt: "Er en hybridbil det rigtige valg for dig? Vi vejer fordele og ulemper op mod hinanden.",
    author: "Redaktionen",
    date: "2026-03-18",
    category: "Guide",
    image: "https://placehold.co/800x400/8b5cf6/ffffff?text=Hybridbiler",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog</h1>
        <p className="text-gray-500">Nyheder, guides og tips om biler og bilkøb</p>
      </div>

      {/* Featured post */}
      <div className="mb-10">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 h-64 md:h-auto bg-gray-100">
            <img src={blogPosts[0].image} alt={blogPosts[0].title} className="w-full h-full object-cover" />
          </div>
          <div className="md:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
            <span className="text-xs font-medium text-primary bg-primary-light px-2 py-1 rounded w-fit">{blogPosts[0].category}</span>
            <h2 className="text-2xl font-bold text-gray-900 mt-3">{blogPosts[0].title}</h2>
            <p className="text-gray-600 mt-2">{blogPosts[0].excerpt}</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
              <span className="flex items-center gap-1"><User className="w-4 h-4" />{blogPosts[0].author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(blogPosts[0].date).toLocaleDateString("da-DK")}</span>
            </div>
            <Link href="#" className="inline-flex items-center gap-1 text-primary font-medium hover:underline mt-4">
              Læs mere <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.slice(1).map((post) => (
          <article key={post.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="h-48 bg-gray-100">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4">
              <span className="text-xs font-medium text-primary bg-primary-light px-2 py-0.5 rounded">{post.category}</span>
              <h3 className="font-semibold text-gray-900 mt-2 group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                <span>{post.author}</span>
                <span>{new Date(post.date).toLocaleDateString("da-DK")}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

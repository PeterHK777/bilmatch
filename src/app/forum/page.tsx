import Link from "next/link";
import { MessageSquare, Users, Clock, Pin } from "lucide-react";

const categories = [
  { id: "1", name: "Køb/salg-rådgivning", slug: "koeb-salg", posts: 234, description: "Få råd og hjælp til køb og salg af biler" },
  { id: "2", name: "Mærke-specifikke", slug: "maerker", posts: 567, description: "Diskussioner om specifikke bilmærker" },
  { id: "3", name: "Teknik & vedligeholdelse", slug: "teknik", posts: 345, description: "Teknisk hjælp, reparation og vedligeholdelse" },
  { id: "4", name: "Elbiler & grøn transport", slug: "elbiler", posts: 189, description: "Alt om elbiler, opladning og bæredygtig transport" },
  { id: "5", name: "Off-topic", slug: "off-topic", posts: 123, description: "Alt andet end biler" },
];

const recentPosts = [
  { id: "1", title: "Erfaringer med Kia EV6 efter 2 år?", author: "MikkelR", replies: 23, views: 456, category: "Elbiler & grøn transport", time: "2 timer siden", pinned: true },
  { id: "2", title: "BMW 320d - hvad skal man være opmærksom på?", author: "LarsN", replies: 15, views: 234, category: "Mærke-specifikke", time: "3 timer siden", pinned: false },
  { id: "3", title: "Bedste familiebil til 250.000 kr?", author: "MetteH", replies: 31, views: 678, category: "Køb/salg-rådgivning", time: "5 timer siden", pinned: false },
  { id: "4", title: "DIY: Skift bremseklodser selv", author: "TechTom", replies: 8, views: 156, category: "Teknik & vedligeholdelse", time: "1 dag siden", pinned: false },
  { id: "5", title: "Tesla Model Y vs. VW ID.4 - sammenligning", author: "ElBilFansen", replies: 45, views: 890, category: "Elbiler & grøn transport", time: "1 dag siden", pinned: false },
  { id: "6", title: "Gode råd til førstegangs-bilkøber", author: "SofieK", replies: 19, views: 345, category: "Køb/salg-rådgivning", time: "2 dage siden", pinned: false },
];

export default function ForumPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Forum</h1>
          <p className="text-gray-500 mt-1">Diskutér biler, køb og salg med andre bilentusiaster</p>
        </div>
        <button className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors text-sm">
          Nyt indlæg
        </button>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow">
            <h3 className="font-semibold text-gray-900">{cat.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{cat.description}</p>
            <p className="text-xs text-gray-400 mt-2">{cat.posts} indlæg</p>
          </div>
        ))}
      </div>

      {/* Recent posts */}
      <h2 className="text-xl font-bold text-gray-900 mb-4">Seneste indlæg</h2>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {recentPosts.map((post, i) => (
          <div
            key={post.id}
            className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
              i < recentPosts.length - 1 ? "border-b border-gray-100" : ""
            }`}
          >
            <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {post.pinned && <Pin className="w-3.5 h-3.5 text-warning shrink-0" />}
                <h3 className="font-medium text-gray-900 truncate">{post.title}</h3>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-0.5 text-xs text-gray-500">
                <span>{post.author}</span>
                <span className="text-primary">{post.category}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.time}</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs text-gray-400 shrink-0">
              <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" />{post.replies}</span>
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{post.views}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

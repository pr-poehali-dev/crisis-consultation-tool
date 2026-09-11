import { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import MessengerButton from "@/components/MessengerButton";
import { BLOG_POSTS } from "@/data/blogPosts";

export default function BlogList() {
  useEffect(() => {
    document.title = "Блог о ресторанном бизнесе — статьи для рестораторов | Руслан Фатуллаев";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Статьи о ресторанном бизнесе: фудкост, маржинальность, открытие кафе и ресторанов, работа с персоналом, меню-инжиниринг и антикризисное управление."
      );
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#1A120B] text-white">
      <nav className="sticky top-0 z-50 bg-[#1A120B]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2 text-white font-oswald font-bold uppercase tracking-wide text-sm">
            <Icon name="ChevronLeft" size={18} className="text-[#FF7A1A]" />
            На главную
          </Link>
          <Link
            to="/#consultation"
            className="neon-btn text-white font-bold text-xs px-4 py-2 rounded-lg whitespace-nowrap"
          >
            Записаться на консультацию
          </Link>
        </div>
      </nav>

      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[rgba(255,122,26,0.1)] border border-[rgba(255,122,26,0.3)] rounded-full px-4 py-2 mb-6">
              <Icon name="BookOpen" size={16} className="text-[#FF7A1A]" />
              <span className="text-[#FF7A1A] text-sm font-medium uppercase tracking-wider">Блог</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-oswald font-bold text-white mb-4 uppercase">
              О ресторанном <span className="neon-text">бизнесе без воды</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Финансы, кухня, персонал, маркетинг и открытие заведений — разбираю то, с чем реально сталкиваются рестораторы каждый день.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-[rgba(255,122,26,0.4)] transition-all duration-200 group flex flex-col"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A1A]">{post.category}</span>
                    <span className="text-gray-600 text-xs">·</span>
                    <span className="text-gray-500 text-xs">{post.readTime}</span>
                  </div>
                  <h2 className="text-white font-oswald font-bold text-lg leading-tight uppercase group-hover:text-[#FFA64D] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#FF7A1A] mt-2">
                    Читать статью
                    <Icon name="ArrowRight" size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <footer className="py-10 px-4 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="text-gray-600 text-sm">© 2026 Руслан Фатуллаев · Консультант для рестораторов</div>
            <Link to="/" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">На главную</Link>
          </div>
        </div>
      </footer>

      <MessengerButton />
    </div>
  );
}

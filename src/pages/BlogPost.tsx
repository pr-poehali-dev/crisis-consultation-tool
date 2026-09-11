import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import MessengerButton from "@/components/MessengerButton";
import { BLOG_POSTS } from "@/data/blogPosts";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post) return;
    document.title = `${post.metaTitle} | Руслан Фатуллаев`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", post.metaDescription);
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#1A120B] text-white">
      <nav className="sticky top-0 z-50 bg-[#1A120B]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 flex items-center justify-between h-14">
          <Link to="/blog" className="flex items-center gap-2 text-white font-oswald font-bold uppercase tracking-wide text-sm">
            <Icon name="ChevronLeft" size={18} className="text-[#FF7A1A]" />
            Все статьи
          </Link>
          <Link
            to="/#consultation"
            className="neon-btn text-white font-bold text-xs px-4 py-2 rounded-lg whitespace-nowrap"
          >
            Записаться
          </Link>
        </div>
      </nav>

      <article className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full" style={{ background: "#FF7A1A", color: "#fff" }}>
              {post.category}
            </span>
            <span className="text-gray-500 text-xs">{post.readTime} чтения</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-oswald font-bold text-white mb-6 uppercase leading-tight">
            {post.title}
          </h1>

          <div className="rounded-2xl overflow-hidden mb-8 aspect-video">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex flex-col gap-4">
            {post.content.map((para, i) => {
              const parts = para.split(/\*\*(.*?)\*\*/g);
              return (
                <p key={i} className="text-gray-300 text-base leading-relaxed">
                  {parts.map((part, j) =>
                    j % 2 === 1 ? (
                      <strong key={j} className="text-white">{part}</strong>
                    ) : (
                      part
                    )
                  )}
                </p>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl p-6 md:p-8 border-2 border-[rgba(255,122,26,0.3)]" style={{ background: "rgba(255,122,26,0.06)" }}>
            <h3 className="text-xl font-oswald font-bold text-white mb-2 uppercase">
              Хотите разобрать эту тему на примере вашего заведения?
            </h3>
            <p className="text-gray-400 text-sm mb-5">
              Пройдите бесплатный аудит или запишитесь на личную консультацию — разберём вашу ситуацию и дам конкретный план действий.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/#audit"
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all"
              >
                <Icon name="Search" size={18} className="text-[#FF7A1A]" />
                Пройти бесплатный аудит
              </Link>
              <Link
                to="/#consultation"
                className="neon-btn flex items-center justify-center gap-2 text-white font-bold text-sm px-6 py-3 rounded-xl"
              >
                <Icon name="Calendar" size={18} />
                Записаться на консультацию
              </Link>
            </div>
          </div>

          {otherPosts.length > 0 && (
            <div className="mt-14">
              <h3 className="text-xl font-oswald font-bold text-white mb-5 uppercase">Читайте также</h3>
              <div className="flex flex-col gap-3">
                {otherPosts.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="flex gap-4 rounded-xl overflow-hidden group transition-all duration-200 hover:scale-[1.01]"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,122,26,0.2)" }}
                  >
                    <img src={p.image} alt={p.title} className="w-20 h-20 object-cover flex-shrink-0" />
                    <div className="flex flex-col justify-center py-2 pr-4 gap-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#FF7A1A]">{p.category}</span>
                      <p className="text-white text-sm font-semibold leading-tight line-clamp-2 group-hover:text-[#FFA64D] transition-colors">
                        {p.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <footer className="py-10 px-4 border-t border-white/5">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-gray-600 text-sm">© 2026 Руслан Фатуллаев · Консультант для рестораторов</div>
          <Link to="/" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">На главную</Link>
        </div>
      </footer>

      <MessengerButton />
    </div>
  );
}

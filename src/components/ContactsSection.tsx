const ContactsSection = () => {
  return (
    <section className="py-16 px-4 border-t border-white/5" id="contacts">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-3">Связаться со мной</h2>
        <p className="text-gray-400 mb-10">Напишите в удобный мессенджер — отвечу лично</p>

        {/* Telegram */}
        <a
          href="https://t.me/Roko_Tiis"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 mb-4 group"
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#229ED9" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-white font-semibold text-lg group-hover:text-primary transition-colors">Telegram</div>
            <div className="text-gray-400 text-sm">@Roko_Tiis</div>
          </div>
          <div className="ml-auto text-gray-600 group-hover:text-primary transition-colors text-xl">→</div>
        </a>

        {/* WhatsApp & Max */}
        <a
          href="https://wa.me/79773908720"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 mb-4 group"
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#25D366" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
          </div>
          <div className="text-left">
            <div className="text-white font-semibold text-lg group-hover:text-primary transition-colors">WhatsApp</div>
            <div className="text-gray-400 text-sm">+7 977 390-87-20</div>
          </div>
          <div className="ml-auto text-gray-600 group-hover:text-primary transition-colors text-xl">→</div>
        </a>

        {/* Max (VK) */}
        <a
          href="https://max.ru/Roko_Tiis"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 group"
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#0077FF" }}>
            <svg width="26" height="26" viewBox="0 0 48 48" fill="white">
              <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm9.5 27h-2.9s-.9 0-1.4-.9c-.4-.7-1.8-2.6-2.4-3.4-.3-.4-.6-.5-.8-.5s-.4.1-.4.6v3.2c0 .7-.3 1-.9 1h-2c-3.4 0-7-2-9.6-5.8-3.9-5.5-5-9.6-5-10.4 0-.5.2-.9.7-.9h2.9c.5 0 .7.3.9.8.9 3 2.5 5.7 3.2 5.7.2 0 .4-.1.4-.7v-3.5c-.1-1.3-.7-1.4-.7-1.9 0-.3.2-.5.6-.5h4.5c.4 0 .6.2.6.7v4.7c0 .4.2.5.3.5.2 0 .4-.1.8-.5 1.2-1.4 2.1-3.5 2.1-3.5.1-.3.4-.6.9-.6h2.9c.9 0 1.1.4.9 1-.4 1.8-2.8 4.9-2.8 4.9-.2.3-.3.5 0 .9.2.3 1 1 1.5 1.6.9 1 1.6 1.8 1.8 2.4.2.5-.1 1-.6 1z"/>
            </svg>
          </div>
          <div className="text-left">
            <div className="text-white font-semibold text-lg group-hover:text-primary transition-colors">Max</div>
            <div className="text-gray-400 text-sm">+7 977 390-87-20</div>
          </div>
          <div className="ml-auto text-gray-600 group-hover:text-primary transition-colors text-xl">→</div>
        </a>
      </div>
    </section>
  );
};

export default ContactsSection;

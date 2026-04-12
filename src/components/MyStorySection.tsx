const MyStorySection = () => {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-5xl mx-auto">

        {/* Заголовок */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 uppercase tracking-wide">
          Путь, который стоил 16 лет
        </h2>
        <p className="text-amber-400 text-center text-sm tracking-widest uppercase mb-16">
          Моя история
        </p>

        {/* Фото + первый блок текста */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <img
              src="https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/d9d0632e-15ec-443f-a0c0-e1540a417aeb.jpg"
              alt="Руслан Фатуллаев за барной стойкой"
              className="rounded-2xl w-full object-cover max-h-[600px]"
            />
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-xl">
              <p className="text-amber-400 text-xs tracking-widest uppercase font-medium">Шеф-бармен · Управляющий · Антикризисный эксперт</p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-white text-lg md:text-xl leading-relaxed font-light">
              Я не читал учебников по ресторанному бизнесу. <span className="text-amber-400 font-medium">Я жил в нём.</span>
            </p>
            <p className="text-white/80 text-base leading-relaxed">
              Всё началось за барной стойкой — молодой, амбициозный, с желанием понять как устроена эта индустрия изнутри. Я не просто смешивал коктейли — я наблюдал, анализировал, задавал неудобные вопросы: почему одни заведения забиты гостями, а другие пустуют при том же меню и том же районе?
            </p>
            <p className="text-white/80 text-base leading-relaxed">
              Через полтора года я стал старшим барменом. Потом — бар-менеджером. Потом — управляющим. Каждая ступень открывала новую картину: персонал, который не продаёт; меню, которое съедает маржу; владельцы, которые работают на заведение, а не заведение на них.
            </p>
          </div>
        </div>

        {/* Второй блок — кризис и итог */}
        <div className="border-l-2 border-amber-400 pl-8 mb-16">
          <p className="text-white/80 text-base leading-relaxed mb-6">
            Я прошёл через убыточные проекты, через кризисы, через ситуации когда казалось проще закрыться. Но именно там — в точке максимального давления — рождались решения, которые работают.
          </p>
          <p className="text-white/80 text-base leading-relaxed">
            Сегодня за моими плечами <span className="text-white font-semibold">16 лет</span>, <span className="text-white font-semibold">50+ заведений</span>, <span className="text-white font-semibold">100+ аудитов</span> и ни одного случая, когда я не нашёл точки роста.
          </p>
        </div>

        {/* Финальная цитата */}
        <div className="text-center bg-white/5 rounded-2xl px-8 py-10 border border-white/10">
          <p className="text-white text-xl md:text-2xl font-light leading-relaxed italic">
            «Антикризисный управленец — это не тот, кто говорит что делать.<br className="hidden md:block" />
            Это тот, кто уже был там, где вы сейчас.»
          </p>
          <p className="text-amber-400 text-sm tracking-widest uppercase mt-6">— Руслан Фатуллаев</p>
        </div>

      </div>
    </section>
  );
};

export default MyStorySection;

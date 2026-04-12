const MyStorySection = () => {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16 uppercase tracking-wide">
          Моя история
        </h2>

        {/* Блок 1 — вступление */}
        <div className="mb-16">
          <p className="text-white text-lg md:text-xl text-center leading-relaxed uppercase font-medium">
            Привет, друзья! Меня зовут Руслан, и я хочу поделиться с вами своей историей в ресторанном бизнесе.
          </p>
        </div>

        {/* Блок 2 — начало пути */}
        <div className="mb-16">
          <p className="text-white/90 text-base md:text-lg leading-relaxed text-center uppercase">
            Мой путь в ресторанный бизнес начался с простого проекта, где я работал официантом. За полгода я осознал, что меня больше влечёт к барной индустрии и созданию вкусных коктейлей. Так я стал барменом, и на протяжении полутора лет успешно погружался в тонкости этой увлекательной сферы. Экспериментируя с различными ингредиентами и техниками приготовления, я развивал свои навыки и обогащал знания, что вскоре позволило выйти на руководящий уровень.
          </p>
          <p className="text-amber-400 text-center mt-6 text-sm tracking-widest uppercase">
            ROKO.TIIS
          </p>
        </div>

        {/* Блок 3 — фото + текст */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 items-center">
          <img
            src="https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/e4fc20a2-b5b9-4026-b861-805c48504a6a.jpg"
            alt="Руслан за барной стойкой"
            className="rounded-xl w-full object-cover max-h-[500px]"
          />
          <div className="space-y-6">
            <p className="text-white/90 text-base md:text-lg leading-relaxed uppercase">
              Ступив на путь старшего бармена, я почувствовал, что готов к новым вызовам и стремлюсь к развитию. Работая в разных проектах, я не только освоил роль бар-менеджера, но и взял на себя обязанности управляющего и шеф-бармена. Всё это время я параллельно разрабатывал оригинальные ресторанные и барные меню для других проектов, наполняя их новыми идеями и вкусами.
            </p>
            <p className="text-white/90 text-base md:text-lg leading-relaxed uppercase">
              С момента первого шага в ресторанный бизнес я точно понял, что — это моё призвание. За барной стойкой я не только создаю восхитительные коктейли, но и вдохновляю других на этот творческий процесс. Моя цель — не просто удивлять гостей, но и дарить им незабываемые эмоции через вкусы и ароматы.
            </p>
          </div>
        </div>

        {/* Блок 4 — текст + фото */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-white/90 text-base md:text-lg leading-relaxed uppercase">
              Каждый коктейль для меня — это не просто напиток, а уникальная история, которую я рассказываю. Я верю, что каждый бармен может стать художником, а бар — это холст, на котором мы можем творить. Я погружаюсь в изучение новых трендов, открываю для себя необычные сочетания и всегда рад делиться своими находками с коллегами и гостями. Создавая нечто новое, я надеюсь, что каждый гость найдёт что-то, что сделает его вечер особенным. Ведь именно эти мгновения и вдохновение, полученное от них, делают нашу работу такой удивительной и важной.
            </p>
          </div>
          <img
            src="https://cdn.poehali.dev/projects/d03b4405-25a0-4b97-9b8f-79e914b22255/bucket/42c90da4-5fb0-476e-8c10-b82ad3978c1b.jpg"
            alt="Руслан Фатуллаев — Шеф-бармен"
            className="rounded-xl w-full object-cover max-h-[500px]"
          />
        </div>
      </div>
    </section>
  );
};

export default MyStorySection;

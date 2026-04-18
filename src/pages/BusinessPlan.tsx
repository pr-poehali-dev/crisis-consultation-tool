import { useRef } from "react";

const BusinessPlan = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@400;600;700&family=Montserrat:wght@400;500;600;700&display=swap');

        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .print-page { box-shadow: none !important; margin: 0 !important; padding: 20px !important; }
          .page-break { page-break-before: always; }
        }

        body { background: #1a1208; }
      `}</style>

      <div className="no-print fixed top-6 right-6 z-50">
        <button
          onClick={handlePrint}
          style={{
            background: "linear-gradient(135deg, #FFB800, #FF6B00)",
            color: "#1a1208",
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700,
            fontSize: "15px",
            padding: "14px 32px",
            borderRadius: "50px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(255,184,0,0.4)",
            letterSpacing: "0.5px",
          }}
        >
          📄 Скачать PDF
        </button>
      </div>

      <div
        style={{
          background: "#1a1208",
          minHeight: "100vh",
          padding: "40px 20px",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        <div
          ref={contentRef}
          className="print-page"
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            background: "#fff8ee",
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: "0 20px 80px rgba(0,0,0,0.5)",
          }}
        >
          {/* ОБЛОЖКА */}
          <div
            style={{
              background: "linear-gradient(160deg, #1a1208 0%, #3d2a00 60%, #1a1208 100%)",
              padding: "80px 60px 60px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
              background: "radial-gradient(ellipse at 50% 30%, rgba(255,184,0,0.15) 0%, transparent 70%)",
            }} />
            <div style={{ fontSize: "80px", marginBottom: "16px" }}>🍯</div>
            <h1 style={{
              fontFamily: "Cormorant, serif",
              fontSize: "72px",
              fontWeight: 700,
              color: "#FFB800",
              margin: "0 0 8px",
              letterSpacing: "4px",
              lineHeight: 1,
            }}>
              ВИННИ
            </h1>
            <p style={{
              color: "#c9a45a",
              fontSize: "16px",
              letterSpacing: "6px",
              textTransform: "uppercase",
              marginBottom: "40px",
              fontWeight: 500,
            }}>
              Авторская кофейня нового поколения
            </p>
            <div style={{
              display: "inline-block",
              background: "rgba(255,184,0,0.15)",
              border: "1px solid rgba(255,184,0,0.3)",
              borderRadius: "50px",
              padding: "10px 28px",
              color: "#FFB800",
              fontSize: "14px",
              letterSpacing: "2px",
              fontWeight: 600,
            }}>
              БИЗНЕС-ПЛАН ДЛЯ ИНВЕСТОРА
            </div>
            <div style={{ marginTop: "40px", display: "flex", justifyContent: "center", gap: "40px" }}>
              {[
                { label: "Площадь", value: "174 м²" },
                { label: "Локация", value: "Фрунзенская" },
                { label: "Инвестиции", value: "17,5 млн ₽" },
              ].map((item) => (
                <div key={item.label} style={{ textAlign: "center" }}>
                  <div style={{ color: "#FFB800", fontSize: "22px", fontWeight: 700 }}>{item.value}</div>
                  <div style={{ color: "#c9a45a", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", marginTop: "4px" }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: "60px" }}>

            {/* РЕЗЮМЕ */}
            <Section title="01. РЕЗЮМЕ ПРОЕКТА" accent="#FFB800">
              <p style={pStyle}>
                Винни — премиальная авторская кофейня нового поколения в Хамовниках. Не сетевой формат, не копия Starbucks —
                <strong> явление, которого в России ещё не было.</strong>
              </p>
              <p style={pStyle}>
                Три этажа атмосферы в одном зале, кофе на живом мёде с собственной пасеки, живой маскот и первая в стране
                кофейная биржа с ценами в реальном времени.
              </p>
              <div style={{
                background: "linear-gradient(135deg, #1a1208, #3d2a00)",
                borderRadius: "16px",
                padding: "24px 32px",
                marginTop: "24px",
                borderLeft: "4px solid #FFB800",
              }}>
                <p style={{ color: "#FFB800", fontWeight: 700, fontSize: "18px", margin: "0 0 8px" }}>
                  Локация — золотая середина Москвы
                </p>
                <p style={{ color: "#c9a45a", margin: 0, fontSize: "14px", lineHeight: 1.7 }}>
                  Шаговая доступность от м. Фрунзенская • Парк Хамовники рядом •
                  Платёжеспособная аудитория • Нулевая конкуренция в формате
                </p>
              </div>
            </Section>

            {/* УТП */}
            <Section title="02. УНИКАЛЬНОЕ ПРЕДЛОЖЕНИЕ (Этого нет нигде в России)" accent="#FFB800">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
                {[
                  {
                    emoji: "🏠",
                    title: "Берлога-трансформер",
                    sub: "Первая в России",
                    desc: "174 м² меняют формат 3 раза в день: тихое утро → рабочий день → вечерний бар. Один адрес — три заведения.",
                  },
                  {
                    emoji: "🍯",
                    title: "Мёд Винни",
                    sub: "Единственное в России",
                    desc: "Партнёрская пасека в Подмосковье. Все сиропы и десерты на живом крафтовом мёде. Продаётся в фирменных банках.",
                  },
                  {
                    emoji: "🐻",
                    title: "Живая Берлога",
                    sub: "Маскот как часть заведения",
                    desc: "Фотозона, аниматор по выходным, детский угол. Семьи из парка Хамовники приходят целенаправленно.",
                  },
                  {
                    emoji: "📈",
                    title: "Кофейная биржа",
                    sub: "Первая в России",
                    desc: "Живое табло: цена меняется каждые 30 минут по спросу. Вирусный механик, инфоповод для СМИ.",
                  },
                ].map((card) => (
                  <div key={card.title} style={{
                    background: "#fff",
                    border: "1px solid #f0e0c0",
                    borderRadius: "16px",
                    padding: "24px",
                  }}>
                    <div style={{ fontSize: "32px", marginBottom: "8px" }}>{card.emoji}</div>
                    <div style={{ fontWeight: 700, fontSize: "16px", color: "#1a1208", marginBottom: "4px" }}>{card.title}</div>
                    <div style={{ color: "#FF6B00", fontSize: "11px", fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "10px" }}>{card.sub}</div>
                    <div style={{ color: "#5a4020", fontSize: "13px", lineHeight: 1.6 }}>{card.desc}</div>
                  </div>
                ))}
              </div>

              {/* Расписание трансформера */}
              <h3 style={{ color: "#1a1208", fontWeight: 700, fontSize: "16px", marginBottom: "12px" }}>Расписание берлоги</h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#1a1208" }}>
                    {["Время", "Режим", "Аудитория"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", color: "#FFB800", fontSize: "12px", letterSpacing: "1px", textAlign: "left" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["07:00–12:00", "Утро в берлоге — тихий зал, газеты, медленный кофе", "Офисные, ранние птицы"],
                    ["12:00–18:00", "Рабочая берлога — коворкинг, розетки, бизнес-ланч", "Фрилансеры, офис рядом"],
                    ["18:00–23:00", "Вечер в берлоге — кофейный бар, коктейли, джаз", "Молодёжь, пары, тусовка"],
                  ].map(([time, mode, aud], i) => (
                    <tr key={time} style={{ background: i % 2 === 0 ? "#fff8ee" : "#fff" }}>
                      <td style={{ padding: "12px 16px", fontWeight: 700, color: "#FF6B00", fontSize: "14px", whiteSpace: "nowrap" }}>{time}</td>
                      <td style={{ padding: "12px 16px", color: "#1a1208", fontSize: "13px" }}>{mode}</td>
                      <td style={{ padding: "12px 16px", color: "#5a4020", fontSize: "13px" }}>{aud}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>

            {/* АУДИТОРИЯ */}
            <Section title="03. ЦЕЛЕВАЯ АУДИТОРИЯ" accent="#FFB800">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
                {[
                  { emoji: "🎓", seg: "Молодёжь 18–30", share: "35%", check: "650 ₽" },
                  { emoji: "💼", seg: "Взрослые 30–45", share: "30%", check: "850 ₽" },
                  { emoji: "👨‍👩‍👧", seg: "Семьи с детьми", share: "20%", check: "1 100 ₽" },
                  { emoji: "🏢", seg: "Офисные работники", share: "15%", check: "750 ₽" },
                ].map((item) => (
                  <div key={item.seg} style={{
                    background: "#fff",
                    border: "1px solid #f0e0c0",
                    borderRadius: "16px",
                    padding: "20px",
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>{item.emoji}</div>
                    <div style={{ fontWeight: 700, fontSize: "13px", color: "#1a1208", marginBottom: "8px", lineHeight: 1.3 }}>{item.seg}</div>
                    <div style={{ color: "#FFB800", fontSize: "22px", fontWeight: 700 }}>{item.share}</div>
                    <div style={{ color: "#5a4020", fontSize: "12px", marginTop: "4px" }}>чек {item.check}</div>
                  </div>
                ))}
              </div>
            </Section>

            {/* ПРОДУКТЫ */}
            <Section title="04. ПРОДУКТОВАЯ ЛИНЕЙКА" accent="#FFB800">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                  { brand: "Vinni.Brew", desc: "Авторский эспрессо, альтернатива, кофе на мёде" },
                  { brand: "Vinni.Sweet", desc: "Десерты и выпечка на крафтовом мёде, собственное производство" },
                  { brand: "Vinni.Honey", desc: "Фирменный мёд в банках с маскотом — розница" },
                  { brand: "Vinni.Bar", desc: "Вечерние кофейные коктейли: алко и безалко" },
                  { brand: "Vinni.Event", desc: "Аренда пространства, мастер-классы, каппинги, корпоративы" },
                  { brand: "Vinni.Box", desc: "Корпоративные подарочные наборы (кофе + мёд + мерч)" },
                ].map((item) => (
                  <div key={item.brand} style={{
                    background: "#fff",
                    border: "1px solid #f0e0c0",
                    borderRadius: "12px",
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}>
                    <div style={{
                      background: "linear-gradient(135deg, #FFB800, #FF6B00)",
                      borderRadius: "8px",
                      padding: "6px 12px",
                      color: "#1a1208",
                      fontSize: "12px",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}>{item.brand}</div>
                    <div style={{ color: "#5a4020", fontSize: "13px" }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </Section>

            {/* БЮДЖЕТ */}
            <Section title="05. ИНВЕСТИЦИОННЫЙ БЮДЖЕТ — 17 500 000 ₽" accent="#FFB800">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#1a1208" }}>
                    {["Статья расходов", "Сумма"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", color: "#FFB800", fontSize: "12px", letterSpacing: "1px", textAlign: "left" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Ремонт и авторский дизайн-проект (174 м²)", "4 500 000 ₽"],
                    ["Профессиональное кофейное оборудование", "2 800 000 ₽"],
                    ["Мебель и предметы интерьера", "1 200 000 ₽"],
                    ["Кухонное оборудование", "800 000 ₽"],
                    ["IT: кофейная биржа, POS-система, табло", "600 000 ₽"],
                    ["Брендинг, маскот, вывеска, меню", "500 000 ₽"],
                    ["Фотозона и инсталляция «Берлога»", "400 000 ₽"],
                    ["Первоначальная закупка сырья", "300 000 ₽"],
                    ["Юридические расходы, депозит аренды", "2 000 000 ₽"],
                    ["Операционный резерв (3 мес.)", "3 000 000 ₽"],
                    ["Резерв непредвиденных расходов", "1 400 000 ₽"],
                  ].map(([stat, sum], i) => (
                    <tr key={stat} style={{ background: i % 2 === 0 ? "#fff8ee" : "#fff" }}>
                      <td style={{ padding: "11px 16px", color: "#1a1208", fontSize: "13px" }}>{stat}</td>
                      <td style={{ padding: "11px 16px", color: "#FF6B00", fontSize: "13px", fontWeight: 700, whiteSpace: "nowrap" }}>{sum}</td>
                    </tr>
                  ))}
                  <tr style={{ background: "#1a1208" }}>
                    <td style={{ padding: "14px 16px", color: "#FFB800", fontWeight: 700, fontSize: "15px" }}>ИТОГО</td>
                    <td style={{ padding: "14px 16px", color: "#FFB800", fontWeight: 700, fontSize: "15px" }}>17 500 000 ₽</td>
                  </tr>
                </tbody>
              </table>
            </Section>

            {/* ФИНАНСОВАЯ МОДЕЛЬ */}
            <Section title="06. ФИНАНСОВАЯ МОДЕЛЬ" accent="#FFB800">
              <h3 style={{ color: "#1a1208", fontWeight: 700, fontSize: "15px", marginBottom: "12px" }}>Выручка (базовый сценарий)</h3>
              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
                <thead>
                  <tr style={{ background: "#1a1208" }}>
                    {["Канал", "Гостей/день", "Средний чек", "Выручка/мес"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", color: "#FFB800", fontSize: "12px", letterSpacing: "1px", textAlign: "left" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Кофе и напитки", "180", "550 ₽", "2 970 000 ₽"],
                    ["Еда и десерты", "90", "350 ₽", "945 000 ₽"],
                    ["Вечерний бар", "50", "800 ₽", "1 200 000 ₽"],
                    ["Мёд, мерч, боксы", "—", "—", "300 000 ₽"],
                    ["Events и аренда", "—", "—", "200 000 ₽"],
                  ].map(([ch, tr, ck, rev], i) => (
                    <tr key={ch} style={{ background: i % 2 === 0 ? "#fff8ee" : "#fff" }}>
                      <td style={{ padding: "11px 16px", color: "#1a1208", fontSize: "13px" }}>{ch}</td>
                      <td style={{ padding: "11px 16px", color: "#5a4020", fontSize: "13px" }}>{tr}</td>
                      <td style={{ padding: "11px 16px", color: "#5a4020", fontSize: "13px" }}>{ck}</td>
                      <td style={{ padding: "11px 16px", color: "#FF6B00", fontSize: "13px", fontWeight: 700 }}>{rev}</td>
                    </tr>
                  ))}
                  <tr style={{ background: "#1a1208" }}>
                    <td colSpan={3} style={{ padding: "14px 16px", color: "#FFB800", fontWeight: 700, fontSize: "15px" }}>ИТОГО В МЕСЯЦ</td>
                    <td style={{ padding: "14px 16px", color: "#FFB800", fontWeight: 700, fontSize: "15px" }}>5 615 000 ₽</td>
                  </tr>
                </tbody>
              </table>

              <h3 style={{ color: "#1a1208", fontWeight: 700, fontSize: "15px", marginBottom: "12px" }}>Динамика по кварталам</h3>
              <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
                <thead>
                  <tr style={{ background: "#1a1208" }}>
                    {["Период", "Выручка/мес", "Расходы/мес", "Прибыль/мес"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", color: "#FFB800", fontSize: "12px", letterSpacing: "1px", textAlign: "left" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Мес. 1–2 (запуск)", "1 500 000 ₽", "2 500 000 ₽", "−1 000 000 ₽", false],
                    ["Мес. 3–4 (разгон)", "2 800 000 ₽", "2 500 000 ₽", "+300 000 ₽", true],
                    ["Мес. 5–6 (рост)", "3 800 000 ₽", "2 500 000 ₽", "+1 300 000 ₽", true],
                    ["Мес. 7–12 (зрелость)", "5 000 000–5 600 000 ₽", "2 500 000 ₽", "+2 500 000–3 100 000 ₽", true],
                  ].map(([per, rev, exp, profit, isPos], i) => (
                    <tr key={String(per)} style={{ background: i % 2 === 0 ? "#fff8ee" : "#fff" }}>
                      <td style={{ padding: "11px 16px", color: "#1a1208", fontSize: "13px", fontWeight: 600 }}>{per}</td>
                      <td style={{ padding: "11px 16px", color: "#5a4020", fontSize: "13px" }}>{rev}</td>
                      <td style={{ padding: "11px 16px", color: "#5a4020", fontSize: "13px" }}>{exp}</td>
                      <td style={{ padding: "11px 16px", fontSize: "13px", fontWeight: 700, color: isPos ? "#2d8a4e" : "#cc3333" }}>{profit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                {[
                  { label: "Точка безубыточности", value: "2,5 млн ₽/мес", sub: "3–4 месяц работы" },
                  { label: "Выручка год 1", value: "48–54 млн ₽", sub: "базовый сценарий" },
                  { label: "Окупаемость", value: "18–24 мес.", sub: "при базовом сценарии" },
                ].map((item) => (
                  <div key={item.label} style={{
                    background: "linear-gradient(135deg, #1a1208, #3d2a00)",
                    borderRadius: "16px",
                    padding: "20px",
                    textAlign: "center",
                    border: "1px solid rgba(255,184,0,0.3)",
                  }}>
                    <div style={{ color: "#c9a45a", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>{item.label}</div>
                    <div style={{ color: "#FFB800", fontSize: "22px", fontWeight: 700 }}>{item.value}</div>
                    <div style={{ color: "#c9a45a", fontSize: "11px", marginTop: "4px" }}>{item.sub}</div>
                  </div>
                ))}
              </div>
            </Section>

            {/* КОМАНДА */}
            <Section title="07. КОМАНДА" accent="#FFB800">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#1a1208" }}>
                    {["Роль", "Кол-во", "Зарплата/мес"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", color: "#FFB800", fontSize: "12px", letterSpacing: "1px", textAlign: "left" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Шеф-бариста / Управляющий", "1", "120 000 ₽"],
                    ["Бариста", "2", "80 000 ₽ × 2"],
                    ["Кассир / Администратор зала", "1", "65 000 ₽"],
                    ["Кондитер / Кухня", "1", "85 000 ₽"],
                  ].map(([role, cnt, sal], i) => (
                    <tr key={String(role)} style={{ background: i % 2 === 0 ? "#fff8ee" : "#fff" }}>
                      <td style={{ padding: "11px 16px", color: "#1a1208", fontSize: "13px" }}>{role}</td>
                      <td style={{ padding: "11px 16px", color: "#5a4020", fontSize: "13px" }}>{cnt}</td>
                      <td style={{ padding: "11px 16px", color: "#FF6B00", fontSize: "13px", fontWeight: 700 }}>{sal}</td>
                    </tr>
                  ))}
                  <tr style={{ background: "#1a1208" }}>
                    <td style={{ padding: "14px 16px", color: "#FFB800", fontWeight: 700 }}>Итого ФОТ</td>
                    <td style={{ padding: "14px 16px", color: "#FFB800", fontWeight: 700 }}>5 человек</td>
                    <td style={{ padding: "14px 16px", color: "#FFB800", fontWeight: 700 }}>430 000 ₽/мес</td>
                  </tr>
                </tbody>
              </table>
            </Section>

            {/* ДОРОЖНАЯ КАРТА */}
            <Section title="08. ДОРОЖНАЯ КАРТА" accent="#FFB800">
              <div style={{ position: "relative" }}>
                {[
                  { phase: "Мес. 1–2", title: "Подготовка", desc: "Подписание аренды, дизайн-проект, закупка оборудования" },
                  { phase: "Мес. 2–4", title: "Строительство", desc: "Ремонт, монтаж оборудования, брендинг, найм команды" },
                  { phase: "Мес. 4", title: "Предзапуск", desc: "Закрытые мероприятия, пресса, блогеры, анонсы" },
                  { phase: "Мес. 5", title: "Открытие", desc: "Публичное открытие, акции первого месяца" },
                  { phase: "Мес. 8–12", title: "Масштабирование", desc: "Event-программа, корпоративные контракты, Vinni.Box" },
                  { phase: "Год 2", title: "Вторая точка", desc: "Открытие второй «Берлоги» на прибыль с первой" },
                ].map((item, i) => (
                  <div key={item.phase} style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "16px",
                    alignItems: "flex-start",
                  }}>
                    <div style={{
                      background: i === 5 ? "linear-gradient(135deg, #FFB800, #FF6B00)" : "#1a1208",
                      border: i === 5 ? "none" : "2px solid #FFB800",
                      borderRadius: "50px",
                      padding: "6px 16px",
                      color: i === 5 ? "#1a1208" : "#FFB800",
                      fontSize: "12px",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      minWidth: "90px",
                      textAlign: "center",
                    }}>{item.phase}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#1a1208", fontSize: "14px" }}>{item.title}</div>
                      <div style={{ color: "#5a4020", fontSize: "13px", marginTop: "2px" }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* РИСКИ */}
            <Section title="09. РИСКИ И МИТИГАЦИЯ" accent="#FFB800">
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#1a1208" }}>
                    {["Риск", "Вероятность", "Решение"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", color: "#FFB800", fontSize: "12px", letterSpacing: "1px", textAlign: "left" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Медленный старт трафика", "Средняя", "Предзапускная кампания: закрытые вечеринки, блогеры, PR за 2 мес. до открытия"],
                    ["Высокая аренда в минус", "Средняя", "Операционный резерв на 3 мес. покрывает убытки периода разгона"],
                    ["Конкуренты копируют концепцию", "Низкая", "Маскот, пасека и биржа — комплексная экосистема, не копируется быстро"],
                    ["Текучка персонала", "Средняя", "Выше рынка ставки + % от выручки для управляющего"],
                    ["Сезонность (лето — спад)", "Средняя", "Летняя терраса у парка + летнее меню на холодном мёде"],
                  ].map(([risk, prob, sol], i) => (
                    <tr key={String(risk)} style={{ background: i % 2 === 0 ? "#fff8ee" : "#fff" }}>
                      <td style={{ padding: "11px 16px", color: "#1a1208", fontSize: "13px", fontWeight: 600 }}>{risk}</td>
                      <td style={{ padding: "11px 16px", fontSize: "12px", fontWeight: 700, color: prob === "Низкая" ? "#2d8a4e" : "#cc8800", whiteSpace: "nowrap" }}>{prob}</td>
                      <td style={{ padding: "11px 16px", color: "#5a4020", fontSize: "13px" }}>{sol}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>

            {/* ПРЕДЛОЖЕНИЕ ИНВЕСТОРУ */}
            <Section title="10. ПРЕДЛОЖЕНИЕ ИНВЕСТОРУ" accent="#FFB800">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "32px" }}>
                {[
                  { label: "Сумма инвестиций", value: "15–20 млн ₽" },
                  { label: "Горизонт возврата", value: "18–24 месяца" },
                  { label: "Формат участия", value: "Партнёр / Займ с %" },
                  { label: "Потенциал", value: "Сеть к 3-му году" },
                ].map((item) => (
                  <div key={item.label} style={{
                    background: "#fff",
                    border: "2px solid #f0e0c0",
                    borderRadius: "16px",
                    padding: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <span style={{ color: "#5a4020", fontSize: "14px" }}>{item.label}</span>
                    <span style={{ color: "#1a1208", fontWeight: 700, fontSize: "15px" }}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* ФИНАЛЬНЫЙ СЛОГАН */}
              <div style={{
                background: "linear-gradient(160deg, #1a1208 0%, #3d2a00 100%)",
                borderRadius: "20px",
                padding: "48px 40px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}>
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                  background: "radial-gradient(ellipse at 50% 0%, rgba(255,184,0,0.12) 0%, transparent 70%)",
                }} />
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🍯</div>
                <h2 style={{
                  fontFamily: "Cormorant, serif",
                  fontSize: "32px",
                  color: "#FFB800",
                  fontWeight: 700,
                  margin: "0 0 16px",
                  lineHeight: 1.3,
                }}>
                  Винни — это не кофейня.
                </h2>
                <p style={{ color: "#c9a45a", fontSize: "16px", lineHeight: 1.8, margin: "0 0 24px", maxWidth: "500px", marginLeft: "auto", marginRight: "auto" }}>
                  Это <strong style={{ color: "#FFB800" }}>медиа-пространство с кофе внутри</strong>.
                  Четыре уникальных механики. Ни одной — у конкурентов в России.
                  Хамовники + Фрунзенская = идеальная стартовая локация.
                </p>
                <div style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #FFB800, #FF6B00)",
                  borderRadius: "50px",
                  padding: "14px 36px",
                  color: "#1a1208",
                  fontSize: "16px",
                  fontWeight: 700,
                  letterSpacing: "1px",
                }}>
                  Заходи первым — пока место свободно
                </div>
              </div>
            </Section>

            {/* КОНТАКТ */}
            <div style={{
              textAlign: "center",
              padding: "32px 0 8px",
              borderTop: "1px solid #f0e0c0",
              marginTop: "40px",
            }}>
              <p style={{ color: "#5a4020", fontSize: "13px", margin: "0 0 8px" }}>Контакт для переговоров</p>
              <p style={{ color: "#1a1208", fontWeight: 700, fontSize: "15px", margin: 0 }}>
                [Имя] &nbsp;|&nbsp; [Телефон] &nbsp;|&nbsp; [Email]
              </p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

const Section = ({ title, children, accent }: { title: string; children: React.ReactNode; accent: string }) => (
  <div style={{ marginBottom: "48px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
      <div style={{ width: "4px", height: "28px", background: `linear-gradient(180deg, ${accent}, #FF6B00)`, borderRadius: "2px" }} />
      <h2 style={{
        fontFamily: "Montserrat, sans-serif",
        fontSize: "16px",
        fontWeight: 700,
        color: "#1a1208",
        margin: 0,
        letterSpacing: "1px",
        textTransform: "uppercase",
      }}>{title}</h2>
    </div>
    {children}
  </div>
);

const pStyle: React.CSSProperties = {
  color: "#3a2810",
  fontSize: "14px",
  lineHeight: 1.8,
  marginBottom: "12px",
};

export default BusinessPlan;

import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useNavigate } from "react-router-dom";

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Политика конфиденциальности</h1>
        <p className="text-muted-foreground text-sm mb-8">Последнее обновление: 5 апреля 2025 г.</p>

        <div className="space-y-6 text-muted-foreground leading-relaxed">

          <section className="p-5 rounded-xl border border-white/10 bg-white/5">
            <h2 className="text-lg font-semibold text-foreground mb-3">Оператор персональных данных</h2>
            <div className="space-y-1 text-sm">
              <p><span className="text-foreground font-medium">ФИО:</span> Фатуллаев Руслан Вафадарович</p>
              <p><span className="text-foreground font-medium">Статус:</span> Самозанятый</p>
              <p><span className="text-foreground font-medium">ИНН:</span> 644307628958</p>
              <p><span className="text-foreground font-medium">Сайт:</span> fatullaevrus.ru</p>
              <p><span className="text-foreground font-medium">Telegram:</span> @Roko_Tiis</p>
              <p><span className="text-foreground font-medium">WhatsApp:</span> +7 977 390-87-20</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных
              пользователей сайта. Оператором персональных данных является самозанятый Фатуллаев Руслан Вафадарович (ИНН 644307628958).
              Используя сайт, вы соглашаетесь с условиями данной Политики.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Какие данные мы собираем</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Имя и контактные данные (при заполнении форм на сайте)</li>
              <li>Номер телефона и адрес электронной почты</li>
              <li>Данные об использовании сайта (cookies, IP-адрес, тип браузера)</li>
              <li>Информация о запросах и предпочтениях пользователя</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Цели обработки данных</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Обработка заявок и предоставление консультационных услуг</li>
              <li>Связь с пользователями по вопросам заказанных услуг</li>
              <li>Улучшение качества обслуживания и работы сайта</li>
              <li>Аналитика посещаемости сайта</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Правовое основание обработки</h2>
            <p>
              Обработка персональных данных осуществляется на основании согласия субъекта персональных данных
              (ст. 6 Федерального закона № 152-ФЗ «О персональных данных»). Заполняя любую форму на сайте,
              вы даёте согласие на обработку указанных данных.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Файлы cookie</h2>
            <p>
              Сайт использует файлы cookie для корректной работы, сохранения пользовательских настроек
              и сбора аналитических данных. Вы можете отключить cookie в настройках браузера,
              однако это может повлиять на функциональность сайта.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Защита данных</h2>
            <p>
              Принимаются необходимые организационные и технические меры для защиты персональных данных
              от несанкционированного доступа, изменения, раскрытия или уничтожения.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Передача данных третьим лицам</h2>
            <p>
              Персональные данные не передаются третьим лицам, за исключением случаев, предусмотренных
              законодательством Российской Федерации.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">8. Права пользователя</h2>
            <p>
              Вы имеете право запросить информацию о хранимых персональных данных, потребовать их
              исправления или удаления, обратившись через Telegram @Roko_Tiis или WhatsApp +7 977 390-87-20.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">9. Изменения политики</h2>
            <p>
              Оставляем за собой право вносить изменения в настоящую Политику конфиденциальности.
              Актуальная версия всегда доступна на данной странице.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

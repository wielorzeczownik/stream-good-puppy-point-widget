<h1 align="center">Good Puppy Point Widget</h1>

<p align="center">
  <a href="https://github.com/wielorzeczownik/stream-good-puppy-point-widget/actions/workflows/release.yml"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/actions/workflow/status/wielorzeczownik/stream-good-puppy-point-widget/release.yml?branch=main&style=flat-square&labelColor=2d333b&color=3fb950"/><source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/actions/workflow/status/wielorzeczownik/stream-good-puppy-point-widget/release.yml?branch=main&style=flat-square&color=2ea043"/><img src="https://img.shields.io/github/actions/workflow/status/wielorzeczownik/stream-good-puppy-point-widget/release.yml?branch=main&style=flat-square&labelColor=2d333b&color=3fb950" alt="Build"/></picture></a> <a href="https://github.com/wielorzeczownik/stream-good-puppy-point-widget/releases/latest"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/v/release/wielorzeczownik/stream-good-puppy-point-widget?style=flat-square&labelColor=2d333b&color=3fb950"/><source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/v/release/wielorzeczownik/stream-good-puppy-point-widget?style=flat-square&color=2ea043"/><img src="https://img.shields.io/github/v/release/wielorzeczownik/stream-good-puppy-point-widget?style=flat-square&labelColor=2d333b&color=3fb950" alt="Najnowsze wydanie"/></picture></a> <a href="https://github.com/wielorzeczownik/stream-good-puppy-point-widget/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/License-MIT-3fb950?style=flat-square&labelColor=2d333b"/><source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/License-MIT-2ea043?style=flat-square"/><img src="https://img.shields.io/badge/License-MIT-3fb950?style=flat-square&labelColor=2d333b" alt="Licencja: MIT"/></picture></a>
  <br/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
  <a href="https://github.com/sigma-cw/widget-io"><img src="https://img.shields.io/badge/widget.io-compatible-3fb950?style=flat-square&labelColor=2d333b" alt="widget.io compatible"/></a>
  <img src="https://img.shields.io/badge/StreamElements-FEB800?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDJMMiA3bDEwIDUgMTAtNXoiLz48L3N2Zz4=&logoColor=white" alt="StreamElements"/>
  <img src="https://img.shields.io/badge/Twitch-9146FF?style=flat-square&logo=twitch&logoColor=white" alt="Twitch"/>
  <img src="https://img.shields.io/badge/YouTube-FF0000?style=flat-square&logo=youtube&logoColor=white" alt="YouTube"/>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/wielorzeczownik/stream-good-puppy-point-widget/main/assets/demo.webp" alt="Demo Good Puppy Point: gwiazda +1, gwiazda +5 z komendy na czacie i gwiazda -1 Bad Puppy z sumą" width="360"/>
</p>

<p align="center">🇬🇧 <a href="README.md">English</a> | 🇵🇱 Polski</p>

Trend "+1 Good Puppy point" [z X](https://x.com/flowerbunnn/status/2125455794908934586) na Twoim streamie. Kiedy czat uzna, że należy się punkt, ktoś wpisuje `!goodpuppy`, odbiera nagrodę za punkty kanału albo daje cheera, a na ekranie wyskakuje duża gwiazda z napisem "+1 Good Puppy point". Pod nią widać Twoją sumę, która liczy się dalej z każdym streamem.

Działa ze StreamElements na Twitchu i YouTube.

## Instalacja

Pobierz zip pod swoje narzędzie z [Releases](https://github.com/wielorzeczownik/stream-good-puppy-point-widget/releases/latest):

| Plik                                                                                                                                                      | Do czego                                           |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| [good-puppy-point-widgetio.zip](https://github.com/wielorzeczownik/stream-good-puppy-point-widget/releases/latest/download/good-puppy-point-widgetio.zip) | [widget.io](https://github.com/sigma-cw/widget-io) |
| [good-puppy-point.zip](https://github.com/wielorzeczownik/stream-good-puppy-point-widget/releases/latest/download/good-puppy-point.zip)                   | własny widget StreamElements, wklejany ręcznie     |

W widget.io kliknij **Import** i wybierz zip.

W StreamElements rozpakuj zip, wejdź w **My Overlays**, **New Overlay**, **Add Widget**, **Custom Widget** i kliknij **Open Editor**. Wklej pliki do zakładek (`HTML.html`, `CSS.css`, `SCRIPT.js`, `FIELDS.json`), kliknij **Done** i zapisz.

Przyciski **Test animation** i **Test minus animation** w edytorze pokażą animację bez pisania na czacie.

## Wyzwalacze

| Wyzwalacz                       | Domyślnie                        | Platforma       |
| ------------------------------- | -------------------------------- | --------------- |
| `!goodpuppy`                    | wł., tylko nadawca i moderatorzy | Twitch, YouTube |
| Nagroda za punkty kanału        | wł., `Good Puppy point`          | Twitch          |
| Cheer od 100 Bitsów, +1 za Bits | wył.                             | Twitch          |
| `!goodpuppies` (pokazuje sumę)  | wł., tylko nadawca i moderatorzy | Twitch, YouTube |
| `!badpuppy` (na minus)          | wył.                             | Twitch, YouTube |
| Nagroda na minus                | wył., `Bad Puppy point`          | Twitch          |

Punkty zawsze idą do sumy streama. Liczba po komendzie daje więcej: `!goodpuppy 5`. Liczba jest ograniczona polem **Most points one command can give** (domyślnie 10), a komenda na minus ma własny limit. Większa liczba nie jest odrzucana, po prostu daje tyle, ile wynosi limit.

Żeby nikt nie spamował, każda osoba musi odczekać **10 s** między komendami (wspólny czas dla wszystkich komend widgetu). Zmienisz to w **Cooldown per person**, `0` wyłącza. Nagrody i Bitsy nie mają cooldownu, bo kosztują.

`!goodpuppies` pokazuje na chwilę sam napis z sumą, bez gwiazdy i bez doliczania. Widget nie umie pisać na czacie, więc suma pojawia się na overlayu.

Pola komend i nagród przyjmują listę po przecinku, więc `goodpuppy, gp` to dwie komendy. Nagroda może mieć własną liczbę punktów: `Good Puppy point, Super piesek=5`. Nagrody z listy na minus odejmują. Nazwy nagród muszą się zgadzać co do znaku z tymi na Twitchu.

Punkty na minus mają własny napis i kolory, więc niegrzeczny piesek wygląda inaczej niż grzeczny.

## Napis

Napis na gwieździe i napis z sumą przyjmują:

| Znacznik   | Zamienia się na            |
| ---------- | -------------------------- |
| `{amount}` | ile punktów dano tym razem |
| `{total}`  | sumę po tym wywołaniu      |
| `{user}`   | kto dał punkt              |
| `\n`       | nową linię                 |

Czcionka może być dowolna z Google Fonts.

> [!TIP]
> Chcesz własną gwiazdę? Wgraj obrazek w **Custom star image**. Jeśli małe gwiazdki do niego nie pasują, wyłącz je w **Show the small stars**.

## Ustawienia

Wszystko ustawiasz w polach widgetu w edytorze StreamElements. **Reset total** zeruje sumę.

<details>
<summary>Wszystkie pola</summary>

| Pole                                       | Domyślnie                      | Znaczenie                                                                    |
| ------------------------------------------ | ------------------------------ | ---------------------------------------------------------------------------- |
| **Points per trigger**                     | `1`                            | ile doliczyć przy każdym wywołaniu                                           |
| **Enable chat command**                    | wł.                            |                                                                              |
| **Chat command names**                     | `goodpuppy`                    | bez `!`, po przecinku                                                        |
| **Who can use the command**                | moderatorzy                    | nadawca i moderatorzy albo wszyscy. Dotyczy też komendy na minus             |
| **Most points one command can give**       | `10`                           | limit liczby wpisanej po komendzie                                           |
| **Cooldown per person for chat commands**  | `10` s                         | na osobę, wspólny dla wszystkich komend, `0` = wył.                          |
| **Enable command that shows the total**    | wł.                            | `!goodpuppies`, uprawnienia jak przy głównej komendzie                       |
| **Show total command names**               | `goodpuppies`                  | po przecinku                                                                 |
| **Enable Channel Points**                  | wł.                            | tylko Twitch                                                                 |
| **Channel Points reward names**            | `Good Puppy point`             | dokładne nazwy z Twitcha, po przecinku, `Nazwa=5` dla własnej liczby punktów |
| **Enable Bits**                            | wył.                           | tylko Twitch                                                                 |
| **Minimum Bits in one cheer**              | `100`                          | cheer daje punkt za każdy Bits, 500 Bitsów to +500                           |
| **Enable minus command**                   | wył.                           |                                                                              |
| **Minus command names**                    | `badpuppy`                     | po przecinku                                                                 |
| **Most points one minus command can take** | `10`                           | limit liczby wpisanej po komendzie na minus                                  |
| **Enable minus Channel Points**            | wył.                           |                                                                              |
| **Minus reward names**                     | `Bad Puppy point`              | ten sam format co nagrody                                                    |
| **Minus star text**                        | `-{amount}\nBad Puppy\npoint`  |                                                                              |
| **Minus star color**                       | `#F8C8C8`                      |                                                                              |
| **Minus text color**                       | jak tekst                      |                                                                              |
| **Minus star image**                       | jak zwykła gwiazda             | zastępuje dużą gwiazdę przy punktach na minus                                |
| **Show the small stars on minus points**   | wł.                            | wyłącz, żeby przy minusie została tylko duża gwiazda                         |
| **Minus sound**                            | jak zwykły dźwięk              | mp3 albo ogg                                                                 |
| **Star text**                              | `+{amount}\nGood Puppy\npoint` |                                                                              |
| **Font**                                   | Short Stack                    | dowolna z Google Fonts                                                       |
| **Star text size**                         | `44` px                        |                                                                              |
| **Text color**                             | `#111111`                      |                                                                              |
| **Show total under the star**              | wł.                            |                                                                              |
| **Total text**                             | `{total} Good Puppy points`    |                                                                              |
| **Total font size**                        | `26` px                        | osobno od napisu na gwieździe                                                |
| **Total text color**                       | jak tekst                      |                                                                              |
| **Total background**                       | Sticker                        | `Sticker` (wycięta naklejka), `Outline` (obwódka liter) albo `None`          |
| **Sticker / outline color**                | kolor gwiazdy                  |                                                                              |
| **Widget size**                            | `420` px                       | szerokość gwiazdy                                                            |
| **Star color**                             | `#C8E2F8`                      |                                                                              |
| **Small stars color**                      | jak gwiazda                    |                                                                              |
| **Wobble and squash the drawn star**       | wł.                            | galaretowate wejście i falujące krawędzie. Wgrany obrazek się nie odkształca |
| **Custom star image**                      | _(puste)_                      | zastępuje dużą gwiazdę                                                       |
| **Show the small stars**                   | wł.                            |                                                                              |
| **Time on screen**                         | `3` s                          |                                                                              |
| **Sound**                                  | wbudowany pop                  | mp3 albo ogg                                                                 |
| **Sound volume**                           | `80` %                         |                                                                              |

</details>

## Budowanie

```bash
git clone https://github.com/wielorzeczownik/stream-good-puppy-point-widget.git
cd stream-good-puppy-point-widget
npm install
npm run build
```

`npm run dev` otwiera podgląd z panelem do odpalania animacji i sprawdzania napisów oraz kolorów.

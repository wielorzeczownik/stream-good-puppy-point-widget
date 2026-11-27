<h1 align="center">Good Puppy Point Widget</h1>

<p align="center">
  <a href="https://github.com/wielorzeczownik/stream-good-puppy-point-widget/actions/workflows/release.yml"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/actions/workflow/status/wielorzeczownik/stream-good-puppy-point-widget/release.yml?branch=main&style=flat-square&labelColor=2d333b&color=3fb950"/><source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/actions/workflow/status/wielorzeczownik/stream-good-puppy-point-widget/release.yml?branch=main&style=flat-square&color=2ea043"/><img src="https://img.shields.io/github/actions/workflow/status/wielorzeczownik/stream-good-puppy-point-widget/release.yml?branch=main&style=flat-square&labelColor=2d333b&color=3fb950" alt="Build"/></picture></a> <a href="https://github.com/wielorzeczownik/stream-good-puppy-point-widget/releases/latest"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/v/release/wielorzeczownik/stream-good-puppy-point-widget?style=flat-square&labelColor=2d333b&color=3fb950"/><source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/v/release/wielorzeczownik/stream-good-puppy-point-widget?style=flat-square&color=2ea043"/><img src="https://img.shields.io/github/v/release/wielorzeczownik/stream-good-puppy-point-widget?style=flat-square&labelColor=2d333b&color=3fb950" alt="Latest Release"/></picture></a> <a href="https://github.com/wielorzeczownik/stream-good-puppy-point-widget/blob/main/LICENSE"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/License-MIT-3fb950?style=flat-square&labelColor=2d333b"/><source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/badge/License-MIT-2ea043?style=flat-square"/><img src="https://img.shields.io/badge/License-MIT-3fb950?style=flat-square&labelColor=2d333b" alt="License: MIT"/></picture></a>
  <br/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
  <a href="https://github.com/sigma-cw/widget-io"><img src="https://img.shields.io/badge/widget.io-compatible-3fb950?style=flat-square&labelColor=2d333b" alt="widget.io compatible"/></a>
  <img src="https://img.shields.io/badge/StreamElements-FEB800?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEyIDJMMiA3bDEwIDUgMTAtNXoiLz48L3N2Zz4=&logoColor=white" alt="StreamElements"/>
  <img src="https://img.shields.io/badge/Twitch-9146FF?style=flat-square&logo=twitch&logoColor=white" alt="Twitch"/>
  <img src="https://img.shields.io/badge/YouTube-FF0000?style=flat-square&logo=youtube&logoColor=white" alt="YouTube"/>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/wielorzeczownik/stream-good-puppy-point-widget/main/assets/demo.webp" alt="Good Puppy Point demo: a +1 star, a +5 star from a chat command and a -1 Bad Puppy star with the running total" width="360"/>
</p>

<p align="center">🇬🇧 English | 🇵🇱 <a href="README.pl.md">Polski</a></p>

The "+1 Good Puppy point" [trend from X](https://x.com/flowerbunnn/status/2125455794908934586) on your stream. When chat thinks you've been a good puppy, someone types `!goodpuppy`, redeems a Channel Points reward or cheers, and a big star with "+1 Good Puppy point" pops up on screen. Your total shows under it and keeps counting from stream to stream.

Works with StreamElements on Twitch and YouTube.

## Installation

Download the zip for where you're putting it from [Releases](https://github.com/wielorzeczownik/stream-good-puppy-point-widget/releases/latest):

| File                                                                                                                                                      | For                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| [good-puppy-point-widgetio.zip](https://github.com/wielorzeczownik/stream-good-puppy-point-widget/releases/latest/download/good-puppy-point-widgetio.zip) | [widget.io](https://github.com/sigma-cw/widget-io) |
| [good-puppy-point.zip](https://github.com/wielorzeczownik/stream-good-puppy-point-widget/releases/latest/download/good-puppy-point.zip)                   | a StreamElements custom widget, pasted in by hand  |

For widget.io, click **Import** and pick the zip.

For StreamElements, extract the zip, then go to **My Overlays**, **New Overlay**, **Add Widget**, **Custom Widget** and click **Open Editor**. Paste each file into its tab (`HTML.html`, `CSS.css`, `SCRIPT.js`, `FIELDS.json`), click **Done** and save.

Hit **Test animation** or **Test minus animation** in the editor to see it without going to chat.

## Triggers

| Trigger                          | Default                       | Platform        |
| -------------------------------- | ----------------------------- | --------------- |
| `!goodpuppy`                     | on, broadcaster and mods only | Twitch, YouTube |
| Channel Points reward            | on, `Good Puppy point`        | Twitch          |
| Cheer of 100+ Bits, +1 per Bit   | off                           | Twitch          |
| `!goodpuppies` (shows the total) | on, broadcaster and mods only | Twitch, YouTube |
| `!badpuppy` (minus)              | off                           | Twitch, YouTube |
| Minus Channel Points             | off, `Bad Puppy point`        | Twitch          |

Points always go to the stream's total. Add a number to give more: `!goodpuppy 5`. The number is capped at **Most points one command can give** (10 by default), and the minus command has its own cap. A bigger number isn't refused, it just gives the cap.

To stop spam, each person has to wait **10 s** between chat commands (all of the widget's commands share it). Change it in **Cooldown per person**, `0` turns it off. Rewards and Bits have no cooldown, since they cost something.

`!goodpuppies` shows the total line on screen for a moment, without the star and without adding anything. A widget can't write in chat, so the total shows up on the overlay.

Command and reward fields take a comma-separated list, so `goodpuppy, gp` sets up two commands. A reward can have its own points: `Good Puppy point, Super puppy=5`. Rewards in the minus list take points away. Reward names have to match the ones on Twitch exactly.

Minus points have their own star text and colours, so a bad puppy looks different from a good one.

## Text

The star text and the total text take these placeholders:

| Placeholder | Becomes                      |
| ----------- | ---------------------------- |
| `{amount}`  | points given this time       |
| `{total}`   | the total after this trigger |
| `{user}`    | who gave the point           |
| `\n`        | a new line                   |

The font can be anything from Google Fonts.

> [!TIP]
> Want your own star? Upload an image in **Custom star image**. If the small stars clash with it, turn them off with **Show the small stars**.

## Configuration

Everything is set in the widget's fields in the StreamElements editor. **Reset total** sets the total back to zero.

<details>
<summary>All fields</summary>

| Field                                      | Default                        | Meaning                                                               |
| ------------------------------------------ | ------------------------------ | --------------------------------------------------------------------- |
| **Points per trigger**                     | `1`                            | added to the total on every trigger                                   |
| **Enable chat command**                    | on                             |                                                                       |
| **Chat command names**                     | `goodpuppy`                    | without the `!`, comma-separated                                      |
| **Who can use the command**                | moderators                     | broadcaster and moderators, or everyone. Applies to the minus one too |
| **Most points one command can give**       | `10`                           | caps the number typed after the command                               |
| **Cooldown per person for chat commands**  | `10` s                         | per person, shared by all commands, `0` = off                         |
| **Enable command that shows the total**    | on                             | `!goodpuppies`, same permissions as the main command                  |
| **Show total command names**               | `goodpuppies`                  | comma-separated                                                       |
| **Enable Channel Points**                  | on                             | Twitch only                                                           |
| **Channel Points reward names**            | `Good Puppy point`             | exact Twitch names, comma-separated, `Name=5` for its own points      |
| **Enable Bits**                            | off                            | Twitch only                                                           |
| **Minimum Bits in one cheer**              | `100`                          | a cheer gives one point per Bit, 500 Bits is +500                     |
| **Enable minus command**                   | off                            |                                                                       |
| **Minus command names**                    | `badpuppy`                     | comma-separated                                                       |
| **Most points one minus command can take** | `10`                           | caps the number typed after the minus command                         |
| **Enable minus Channel Points**            | off                            |                                                                       |
| **Minus reward names**                     | `Bad Puppy point`              | same format as the reward names                                       |
| **Minus star text**                        | `-{amount}\nBad Puppy\npoint`  |                                                                       |
| **Minus star color**                       | `#F8C8C8`                      |                                                                       |
| **Minus text color**                       | same as text                   |                                                                       |
| **Minus star image**                       | same as the normal star        | replaces the big star on minus points                                 |
| **Show the small stars on minus points**   | on                             | turn off to keep only the big star on minus                           |
| **Minus sound**                            | same as the normal sound       | mp3 or ogg                                                            |
| **Star text**                              | `+{amount}\nGood Puppy\npoint` |                                                                       |
| **Font**                                   | Short Stack                    | any Google Font                                                       |
| **Star text size**                         | `44` px                        |                                                                       |
| **Text color**                             | `#111111`                      |                                                                       |
| **Show total under the star**              | on                             |                                                                       |
| **Total text**                             | `{total} Good Puppy points`    |                                                                       |
| **Total font size**                        | `26` px                        | separate from the star text                                           |
| **Total text color**                       | same as text                   |                                                                       |
| **Total background**                       | Sticker                        | `Sticker` (a cut-out label), `Outline` around the letters, or `None`  |
| **Sticker / outline color**                | star color                     |                                                                       |
| **Widget size**                            | `420` px                       | width of the star                                                     |
| **Star color**                             | `#C8E2F8`                      |                                                                       |
| **Small stars color**                      | same as star                   |                                                                       |
| **Wobble and squash the drawn star**       | on                             | jelly entry and wobbly edges. A custom image is never distorted       |
| **Custom star image**                      | _(empty)_                      | replaces the big star                                                 |
| **Show the small stars**                   | on                             |                                                                       |
| **Time on screen**                         | `3` s                          |                                                                       |
| **Sound**                                  | built-in pop                   | mp3 or ogg                                                            |
| **Sound volume**                           | `80` %                         |                                                                       |

</details>

## Building from source

```bash
git clone https://github.com/wielorzeczownik/stream-good-puppy-point-widget.git
cd stream-good-puppy-point-widget
npm install
npm run build
```

`npm run dev` opens a local preview with a panel for firing the animation and trying out text and colours.

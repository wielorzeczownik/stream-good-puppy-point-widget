# Security

Thanks for taking the time to look. Please report vulnerabilities privately through [GitHub Security Advisories](https://github.com/wielorzeczownik/stream-good-puppy-point-widget/security/advisories/new) instead of a public issue, so there's a chance to fix them first. You'll be credited in the release notes unless you'd rather not be. Only the latest release gets fixes.

## In scope

The widget reacts to chat and Twitch events, so anyone in chat can send it input. The scope is:

- the chat commands and their permission check (who may give or take points)
- Channel Points and Bits handling
- names from chat and Twitch events that end up on screen through `{user}`, and the number typed after a command
- the running total kept in StreamElements storage

Problems in StreamElements itself or in upstream packages (`@tixyel/streamelements`, `motion`) belong to those projects. If a vulnerable version is pinned here, please still let us know so it can be bumped.

## Running it safely

- Keep the commands on **Broadcaster and moderators** unless you trust your whole chat, since anyone allowed to run them can change the total.
- Upload custom images and sounds through the StreamElements library instead of linking files from other sites.
- The widget loads its font from Google Fonts and its helper library from jsDelivr, so those services see the overlay's requests.

---
title: "Tools I'd like to build"
date: 2020-11-14
layout: article.njk
---

Unsctructured collection of ideas that I might spend some time on building.

## Mind your time

Browser extension that focuses on digital well-being by monitoring where do you spend your time online. Main aim is to be mindful about time spent on social media which is one of the most risk factors for growing up teenagers as presented in [one episode](https://podcasts.google.com/feed/aHR0cHM6Ly9mZWVkcy5zaW1wbGVjYXN0LmNvbS9yWjBjWWsxMg/episode/YzZlY2VmMDQtOTVkYS00ZmY2LWFmYTQtNDgyNDQ0YWIwZTJh?sa=X&ved=0CAUQkfYCahcKEwjw9PeaqYLtAhUAAAAAHQAAAAAQAQ) of Your Undivided Attention podcast.

- chrome extension
- goes from green happy smiley face :) to a red sad smiley face :( based on where the digital time is spent
- define "healthy" boundaries based on some research
- maybe after some time spent (30 mins, hour, ...) show a warning message (displaying it should be configurable)
- time should be measured only when the tab is focused by leveraging [Page visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) or by using hooks that chrome extensions API offers
- the extension counts time only when the window is active (therefore the way to workaround it is to 'focus' another window) - that's fine cause interacting with a site requires switching focus back to that window
- let's try to use the [<code>meter</code>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meter) element when visualizing results

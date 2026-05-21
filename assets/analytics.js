(() => {
  const appStoreHost = "apps.apple.com";
  const utmKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "ref",
    "source"
  ];

  function readParams() {
    const params = new URLSearchParams(window.location.search);
    return utmKeys.reduce((next, key) => {
      const value = params.get(key);
      if (value) {
        next[key] = value.slice(0, 120);
      }
      return next;
    }, {});
  }

  function readStored(key) {
    try {
      return JSON.parse(window.localStorage.getItem(key) || "{}");
    } catch (_error) {
      return {};
    }
  }

  function writeStored(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (_error) {
      // Analytics must never block the site.
    }
  }

  function saveAttribution() {
    const params = readParams();
    if (!Object.keys(params).length) {
      return;
    }

    const payload = {
      ...params,
      landing_path: window.location.pathname,
      captured_at: new Date().toISOString()
    };

    if (!Object.keys(readStored("iku_first_touch")).length) {
      writeStored("iku_first_touch", payload);
    }
    writeStored("iku_latest_touch", payload);
  }

  function compactText(text) {
    return text.replace(/\s+/g, " ").trim().slice(0, 80);
  }

  function referrerHost() {
    if (!document.referrer) {
      return "";
    }

    try {
      return new URL(document.referrer).hostname;
    } catch (_error) {
      return "";
    }
  }

  function sectionFor(element) {
    const section = element.closest("section, article, header, footer");
    if (!section) {
      return "";
    }

    const heading = section.querySelector("h1, h2, .eyebrow");
    return heading ? compactText(heading.textContent || "") : section.className.toString();
  }

  function cleanProps(props) {
    return Object.fromEntries(
      Object.entries(props).filter(([, value]) => value !== "" && value !== undefined && value !== null)
    );
  }

  function eventProps(extra = {}) {
    const latestTouch = readStored("iku_latest_touch");
    return cleanProps({
      path: window.location.pathname,
      title: document.title,
      referrer_host: referrerHost(),
      utm_source: latestTouch.utm_source,
      utm_medium: latestTouch.utm_medium,
      utm_campaign: latestTouch.utm_campaign,
      utm_term: latestTouch.utm_term,
      utm_content: latestTouch.utm_content,
      ...extra
    });
  }

  function track(name, props = {}) {
    const payload = eventProps(props);

    if (typeof window.plausible === "function") {
      window.plausible(name, { props: payload });
    }

    if (typeof window.gtag === "function") {
      window.gtag("event", name.toLowerCase().replace(/[^a-z0-9]+/g, "_"), payload);
    }

    if (window.umami && typeof window.umami.track === "function") {
      window.umami.track(name, payload);
    }
  }

  function handleClick(event) {
    if (!(event.target instanceof Element)) {
      return;
    }

    const link = event.target.closest("a[href]");
    if (!link) {
      return;
    }

    let url;
    try {
      url = new URL(link.href);
    } catch (_error) {
      return;
    }

    if (url.hostname !== appStoreHost) {
      return;
    }

    track("App Store Click", {
      link_text: compactText(link.textContent || ""),
      link_path: url.pathname,
      placement: sectionFor(link)
    });
  }

  saveAttribution();
  document.addEventListener("click", handleClick, { capture: true });
  window.IkuAnalytics = { track };
})();

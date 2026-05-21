# Iku? Official Site

Official static site for Iku?.

## Pages

- `/` landing page
- `/privacy/` privacy policy
- `/terms/` terms
- `/support/` support
- `/drink/` search landing page for drinking-party hesitation
- `/date/` search landing page for date hesitation
- `/work/` search landing page for work-social obligation hesitation
- `/overbooked/` search landing page for overbooked users
- `/decline/` search landing page for invitation refusal anxiety

## Deployment

This repository is intended for GitHub Pages with the custom domain `ikuapp.jp`.

GitHub Pages is configured for `ikuapp.jp` and `www.ikuapp.jp` with HTTPS enforcement.

Before App Store submission, confirm that `support@ikuapp.jp` can receive mail.

## Analytics

All pages include the Plausible Analytics script for `ikuapp.jp` and the local `/assets/analytics.js` helper.

Tracked basics:

- Pageviews through Plausible
- App Store link clicks as the custom event `App Store Click`
- UTM parameters stored in localStorage for click attribution

To view data, add `ikuapp.jp` as a site in Plausible and create a custom-event goal named `App Store Click`.

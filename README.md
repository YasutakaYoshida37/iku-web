# Iku? Official Site

Official static site for Iku?.

## Pages

- `/` landing page
- `/privacy/` privacy policy
- `/terms/` terms
- `/support/` support
- `/noteclear/` landing page for NoteClear
- `/noteclear/privacy/` privacy policy for NoteClear
- `/noteclear/support/` support for NoteClear
- `/drink/` search landing page for drinking-party hesitation
- `/date/` search landing page for date hesitation
- `/work/` search landing page for work-social obligation hesitation
- `/friend/` search landing page for friend invitation hesitation
- `/family/` search landing page for family-plan hesitation
- `/matching/` search landing page for matching-app invitation hesitation
- `/tired/` search landing page for tired-but-unsure invitations
- `/money/` search landing page for budget-related invitation hesitation
- `/weekend/` search landing page for weekend-plan hesitation
- `/after-work/` search landing page for after-work plan hesitation
- `/overbooked/` search landing page for overbooked users
- `/solo-time/` search landing page for wanting time alone
- `/fomo/` search landing page for fear-of-missing-out hesitation
- `/relationship/` search landing page for relationship-pressure hesitation
- `/decline/` search landing page for invitation refusal anxiety

The extra search landing pages can be regenerated with `node scripts/generate-extra-guides.mjs`.

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

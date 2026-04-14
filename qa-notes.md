# Visual QA Notes

## Initial preview observations

The rebuilt site is loading correctly with the intended **Midnight Broadcast Editorial** direction already visible. The hero section reads strongly, the dark cinematic palette is working, the new navigation labels are present, and the newly added **Portfolio**, **About Me**, and **Enquire Now** sections are rendering in sequence.

## Specific findings

| Area | Observation | Action |
| --- | --- | --- |
| Hero | The headline, CTA hierarchy, and premium dark mood are visually strong. | Keep as primary design anchor. |
| Navigation | Desktop navigation shows the required section labels and appears aligned with the new structure. | Confirm click behavior and section offsets. |
| Added sections | Services, Portfolio, About Me, and Enquire Now all appear in the extracted page content. | Keep structure intact and verify form behavior. |
| Typography | The serif-display plus sans pairing is rendering and gives the page a more premium editorial tone. | Keep chosen type system. |
| Form | Inputs, select, textarea, and submit button are visible in preview. | Test validation and submission states interactively. |

## Follow-up focus

Next, validate section scrolling, mobile menu behavior, and enquiry form validation states in the running preview.

## Interactive validation check

Submitting the enquiry form empty correctly surfaces inline validation messages for all required fields, and the summary state message appears below the textarea. This confirms the current client-side validation flow is active and visible.

| Interaction | Result |
| --- | --- |
| Empty form submit | Inline error messages displayed for name, business name, email, phone, service, and message |
| Status feedback | Error summary appears in the form container |
| Layout resilience | Form remained readable and visually consistent after validation state changes |

## Navigation behavior check

The sticky header remains usable after section jumps. Clicking **Portfolio** from the top navigation moved the viewport to the portfolio section, and using the logo control successfully returned the page to the hero area.

| Interaction | Result |
| --- | --- |
| Desktop nav to Portfolio | Section jump worked and landed at the portfolio content area |
| Logo button back to top | Returned the viewport to the hero section |
| Sticky header | Stayed visible and usable during navigation changes |

## Instagram access findings

Reviewing the provided Instagram profile directly leads to a login wall, but publicly indexed individual post pages are still reachable enough to confirm that the account and posts exist. The post page reviewed exposes the owner handle, the post date, engagement snippets, and a stable public post URL, but Instagram overlays a sign-up prompt and does not make bulk profile extraction reliable without authentication.

| Check | Finding |
| --- | --- |
| Profile URL | Redirects to a login-oriented experience rather than a clean public profile view |
| Individual post URL | Publicly reachable and suitable as a stable reference for embedding or linking |
| Bulk discovery | Unreliable without login; better to work from explicit post or reel URLs |

## Instagram embed method confirmed

A direct Instagram embed URL is publicly accessible for the provided content using the `/embed` pattern. This makes it feasible to present the selected posts and reels inside the portfolio section without requiring a logged-in profile view.

| Source URL type | Embed pattern |
| --- | --- |
| Post | `https://www.instagram.com/p/{shortcode}/embed` |
| Reel | `https://www.instagram.com/reel/{shortcode}/embed` |

This will be implemented as a styled grid of embedded cards with external-view fallbacks so the portfolio remains useful even if Instagram changes loading behavior.

## Instagram portfolio QA

The updated site now renders the Instagram-based portfolio section successfully inside the live preview. The navigation jump to the Portfolio section still works, and the section displays a styled introduction panel alongside four live embeds.

| Check | Result |
| --- | --- |
| Build and type check | Passed after portfolio changes |
| Portfolio navigation jump | Working |
| Public embed rendering | Working for the supplied post and reel URLs |
| In-card fallback links | Present as `Open on Instagram` links |

The embeds inherit Instagram's own framing and controls, so their internal presentation remains platform-controlled even though the surrounding website styling is fully customized.

export type CaseStudy = {
  id: string
  title: string
  kind: 'feature' | 'architecture' | 'diagnosis'
  when: string
  summary: string
  points: string[]
  // the reveal — how the problem was reasoned about, not just what shipped
  reveal: {
    label: string
    body: string
  }
  footnote?: string
}

// Sourced from the engineering record. Every claim here traces to that
// document — no invented metrics.
export const caseStudies: CaseStudy[] = [
  {
    id: 'agentic-ai',
    title: 'Agentic AI authoring surface',
    kind: 'feature',
    when: 'Mar — Jun 2025',
    summary:
      'Built the front end for Aera’s agentic AI platform from the first screen onward — the authoring surface where users compose agents, agent teams, and agent functions.',
    points: [
      'TypeaheadTextEditor — a from-scratch rich editor accepting HTML elements, with bidirectional HTML↔text conversion so agent prompts round-trip losslessly, plus line-break support and dropdown width handling.',
      'Revision history panel for embedded agents and agent functions.',
      'Embedded agent screen and flow, including name-required save gating and edge-case handling when saving agent teams.',
      'Input/Output grid integration, editable label component, and remote-function detail mapping.',
    ],
    reveal: {
      label: 'Why round-tripping mattered',
      body: 'A prompt editor that accepts rich content has two representations — what the user sees and what the model receives. If the conversion is lossy in either direction, prompts silently change when reopened for editing. Making the transform bidirectional and lossless meant the stored prompt and the rendered prompt could never drift apart.',
    },
  },
  {
    id: 'standard-custom',
    title: 'Standard / Custom configuration mode for Action Item categories',
    kind: 'feature',
    when: 'Jul 2026',
    summary:
      'A dual-mode configuration system for Cognitive Workbench category schemas — the largest single feature in the record, delivered across six pull requests. Categories can be configured in a Standard mode (four locked, platform-owned interactions) or a Custom mode (a freely authored set), with a shared pool of user interactions rendering correctly in both.',
    points: [
      'Classified interactions by type rather than by id, so a user-authored row named "Accept" is not silently absorbed into the platform’s standard accept interaction — it stays a distinct row and is flagged on mode switch.',
      'Per-mode completeness rules: Custom needs any interaction, Standard still requires a wired View Details.',
      'Same-name conflict validation that blocks Save with an inline warning rather than failing at the API boundary.',
      'Invariant enforcement — a sub-category always keeps exactly one default interaction, and only the default is pinned to the context menu.',
      'Per-sub-category persistence, so interactions authored under one sub-category no longer bleed into its siblings.',
    ],
    reveal: {
      label: 'Why this shape',
      body: 'The naive approach — keying interactions by id — collapses under a user who names their own row after a standard one. Classifying by type made the two pools genuinely independent, which is what let a single shared pool render safely in both modes instead of duplicating state per mode.',
    },
    footnote: '344 insertions across 8 files · new categoryUtils helpers with unit coverage',
  },
  {
    id: 'axios-fleet',
    title: 'Coordinated axios upgrade across the micro-frontend fleet',
    kind: 'architecture',
    when: 'Apr — May 2026',
    summary:
      'Drove a security-motivated axios upgrade simultaneously through ui3, discovery, discovery-v2, aera-dashboard-toolkit, aera-developer, aera-react-library, aera-skill-ui-builder, ai-agents-fe and aera-dataworkbench-ui — each starting from a different baseline version, and each pinned to Node 14 with an npm 6-era lockfile.',
    points: [
      'Regenerated every package-lock.json under Node 14 to preserve lockfileVersion 1, rather than letting a modern npm silently rewrite the lockfile format.',
      'Wrote a custom transformRequest function — later extracted into a shared axios-interceptors utility — because the newer axios changed JSON content-type handling and broke request bodies across apps.',
      'Version pinning and a coordinated revert when 0.31.0 proved unstable in one app, then a clean re-land at 0.31.1.',
    ],
    reveal: {
      label: 'Why it was hard',
      body: 'These apps share data at runtime through ComponentLoader, so a version skew between two bundles surfaces as a runtime failure, not a build error. The upgrade had to land near-simultaneously and be revertible as a unit.',
    },
  },
  {
    id: 'arl-tokens',
    title: 'Design-token theme migration for legacy Discovery',
    kind: 'architecture',
    when: 'May — Jun 2026',
    summary:
      'Migrated the legacy Discovery v1 stylesheet layer onto aera-react-library theme tokens — 56 files, 444 insertions — replacing hardcoded colour with tokens so the legacy app themes consistently with the rest of the platform.',
    points: [
      'Rewrote the color-mixins.scss layer (252 lines changed) as the single translation point between legacy shades and ARL tokens.',
      'Introduced _legacy-shades.scss as an explicit compatibility surface rather than leaving stragglers hardcoded.',
      'Adopted renamed ARL --legacy-* tokens when hex-suffix names became qualitative slugs.',
      'Built local-ARL dev tooling so token changes could be verified against a local library build instead of a published bundle.',
    ],
    reveal: {
      label: 'Why a single translation point',
      body: 'Migrating 56 files by rewriting each colour individually leaves no way to verify completeness. Routing every legacy shade through one mixin layer meant the migration had a single place to audit — and the stragglers that could not be mapped became an explicit compatibility surface rather than invisible debt.',
    },
  },
  {
    id: 'route-gating',
    title: 'Route-level feature gating for trial projects',
    kind: 'diagnosis',
    when: 'Aug 2026',
    summary:
      'Self-registered trial users could bypass feature hiding entirely by typing a route hash directly — #dashboards, #metadata, #reports and #monitors all rendered the full page, letting a trial user create custom metadata without the required permissions.',
    points: [
      'Added Aera.util.FeatureAccess as a single source of truth: a feature is unavailable when its registry flag is explicitly false, or when the project is a trial one — internal Aera users stay exempt, matching existing openAdmin behaviour.',
      'Gated the dispatch listener in FullApplication and obx/Application — the one place every route handler is invoked — so Router, Dashboard, Discovery, list pages and individual object routes are all covered by one gate.',
      'Derived the URL lookup from the route table so there is no second flag map to drift.',
      'Pointed the legacy Ext MenuModel at the same helper so menu and router agree.',
    ],
    reveal: {
      label: 'Diagnosis',
      body: 'The menu hid these features using per-feature backend registry flags, but no route ever consulted them — so the hashes stayed reachable. Rather than patch each route, the fix adds one gate at the single dispatch point, keyed off a shared policy object. Documented explicitly that this is the front-end half only: blocking a route does not stop direct API calls, tracked separately.',
    },
  },
  {
    id: 'popup-flag',
    title: 'A sized View Details reverted to full screen on reload',
    kind: 'diagnosis',
    when: 'Jul 2026',
    summary:
      'Unticking "Full size" and entering explicit width/height didn’t stick — the inbox opened the process full screen, and the modal showed "Full size" selected again on reload.',
    points: [
      'One backend column, consoleaction.POPUP_FLAG, backs both popupFlag and fullSizeFlag, and the save wrote that column from popupFlag alone.',
      'The guided form never set popupFlag — it only echoed the hydrated value — so the payload went out self-contradictory: fullSizeFlag: false beside a stale popupFlag.',
      'The width and height had been saving correctly all along; they were simply hidden because the UI reads fullSize.',
    ],
    reveal: {
      label: 'Why the fix is what it is',
      body: 'Derived popupFlag from fullSize so the pair always travels as exact inverses. Polarity was verified against a live GET rather than against the legacy grid’s labelling — the legacy ManageCategory ContextMenu grid encodes the opposite (its popupFlag column is headed "Full Size"), which is simply mislabelled. Left that untouched and documented it, rather than propagating the error.',
    },
    footnote: 'First popupFlag test coverage added, including the stale-flag regression',
  },
  {
    id: 'otp-shift',
    title: 'Backspacing a middle OTP box shifted every later digit left',
    kind: 'diagnosis',
    when: 'Jul 2026',
    summary:
      'Clearing a middle box turned 123456 into 12456, which then rendered as 1,2,4,5,_ — every later digit slid one box left, and the emptied box could not be refilled.',
    points: [
      'updateDigit stripped every space before storing, so the stored value could only ever represent a left-packed prefix — an interior hole was unrepresentable.',
      'The padEnd() on render then redistributed the shortened string across the boxes.',
    ],
    reveal: {
      label: 'The second-order bug the fix exposed',
      body: 'Carrying interior holes as spaces and trimming only trailing blanks fixes the shift — but a hole leaves the value 6 characters long ("12 456"), so the parent’s otp.length === OTP_LENGTH gates would have auto-submitted a code containing a space. Replaced all three gates with an exported isOtpComplete() owned by the component that owns the format, so completeness cannot drift from the encoding.',
    },
  },
]

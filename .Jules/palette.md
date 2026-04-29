## 2026-04-29 - [Form Accessibility Improvements]
**Learning:** Found that the contact form was missing explicit associations between labels and inputs, as well as visual required indicators and ARIA attributes. This is a common pattern in this codebase that can be improved for screen readers and better UX.
**Action:** Always ensure labels use 'htmlFor' to link with input 'id', and provide both visual and screen-reader indicators (aria-required) for mandatory fields.

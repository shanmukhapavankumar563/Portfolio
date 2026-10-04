# Shanmukha Pavan Kumar ? Portfolio

Responsive static portfolio built with HTML, CSS, and JavaScript.

## Project screenshots

The Projects section uses screenshots from the four projects, stored in `assets/images/`. Each image area uses a consistent 16:9 aspect ratio and displays a fallback message if its image is missing.

## Local preview

Open `index.html` in a browser, or run a local static server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Contact form

The form opens a prefilled message in the visitor?s email application using the email address in the portfolio. It does not send or store messages through a website backend.

## Deploy to Render

This repository includes a `render.yaml` Blueprint for the static portfolio. In Render, choose **New ? Blueprint**, connect this GitHub repository, and select the `main` branch. Render will build and publish the site, then automatically deploy future pushes to `main`.

# Gabriele Paganelli — Personal Website

Personal portfolio site built with plain HTML, CSS, and JavaScript. No build step required — push and deploy.

## Structure

```
/
├── index.html                    # Main single-page site
├── projects/
│   ├── energy-market.html        # Italian Energy Market Analysis
│   ├── icecube.html              # IceCube Neutrino Clustering
│   ├── mice-lfp.html             # Mice LFP: GRU-Transformer
│   ├── simpsons-family-guy.html  # Simpsons vs Family Guy
│   └── pantheon.html             # Bachelor's Thesis: The Web of Fame
├── css/style.css
├── js/main.js
└── assets/
    ├── images/                   # Add your project images here
    └── pdfs/                     # Add your PDF files here
```

## Deploying on GitHub Pages

1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **main branch / root**
4. Your site will be live at `https://<username>.github.io/<repo-name>/`

## Adding your content

### Text placeholders
Search for `<!-- [BLANK_` or `<!-- [INSERT_` comments in the HTML files to find every placeholder.

### Images
Drop your image files into `assets/images/` and replace the `<div class="visual-placeholder">` blocks with:
```html
<img src="../assets/images/your-image.png" alt="Description" style="width:100%;border-radius:12px;">
```
(Use `assets/images/` — without `../` — from `index.html`)

### PDFs
Drop your PDF files into `assets/pdfs/` and replace `href="#"` on the link buttons with:
```html
href="../assets/pdfs/your-file.pdf"
```
(Use `assets/pdfs/` — without `../` — from `index.html`)

### GitHub repository links
Replace `href="#"` on GitHub buttons with the real repository URLs.

### Goodreads link
In `index.html`, find `<!-- [GOODREADS_PROFILE_URL] -->` and replace `href="#"` with your Goodreads profile URL.

### Books & Podcasts
In `index.html`, find `<!-- [BLANK_BOOKS_LIST] -->` and `<!-- [BLANK_PODCASTS_LIST] -->` and replace the placeholder list items.

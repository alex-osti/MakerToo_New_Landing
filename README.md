# MakerToo Landing Page

A modern, responsive, accessible landing page for MakerToo, an AI automation agency.

## Features

- Bold, unique design with fluorescent purple, dark shades, and green accents
- Fully responsive layout
- Accessibility compliant (WCAG 2.1 AA)
- Smooth animations and interactive elements
- Optimized for fast load times
- Clean, modular HTML, CSS, and JS
- Professional, persuasive copywriting
- Easy integration into WordPress

## Integration Instructions for WordPress

### Method 1: Embed as a Custom Page Template

1. **Create a new page template** in your WordPress theme directory (e.g., `page-makertoo.php`).
2. Copy the content of `index.html` **inside** the WordPress template, replacing the default loop.
3. Enqueue `style.css` and `script.js` via `functions.php`:

```
function makertoo_assets() {
  if (is_page_template('page-makertoo.php')) {
    wp_enqueue_style('makertoo-style', get_template_directory_uri() . '/style.css');
    wp_enqueue_script('makertoo-script', get_template_directory_uri() . '/script.js', array(), null, true);
  }
}
add_action('wp_enqueue_scripts', 'makertoo_assets');
```

4. Create a new page in WordPress and assign it the "MakerToo" template.

### Method 2: Use a Page Builder (Elementor, WPBakery, etc.)

- Add HTML blocks and paste the relevant sections.
- Add custom CSS and JS via the builder's interface or theme customizer.

### Method 3: Embed via Shortcode or Custom Block

- Register a shortcode or custom Gutenberg block that outputs the HTML.
- Enqueue CSS/JS conditionally.

## Accessibility Notes

- All interactive elements are keyboard accessible.
- Sufficient color contrast is maintained.
- Semantic HTML and ARIA labels improve screen reader support.
- Animations are subtle and do not hinder usability.

## Customization Tips

- Replace icons with SVGs or images as needed.
- Update copywriting to match your brand voice.
- Optimize images and assets before deployment.

---

&copy; 2024 MakerToo. All rights reserved.

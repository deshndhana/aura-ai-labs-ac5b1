# Lumière Beauty Salon — Website Package
## Complete 7-Page Professional Beauty Salon Website

---

## 📁 FILE STRUCTURE

```
salon/
├── index.html        ← Home page
├── about.html        ← About Us page
├── services.html     ← Services page
├── gallery.html      ← Gallery page (with filter buttons)
├── booking.html      ← Booking / Appointment page
├── pricing.html      ← Pricing page (with tabs)
├── contact.html      ← Contact page
├── style.css         ← All styles (one file)
├── script.js         ← All JavaScript (one file)
└── images/           ← CREATE THIS FOLDER for your photos
    ├── hero.jpg
    ├── about-salon.jpg
    ├── gallery-1.jpg  (through gallery-12.jpg)
    ├── team-1.jpg     (through team-3.jpg)
    └── logo.png       (optional)
```

---

## ✏️ HOW TO CUSTOMIZE

### 1. BUSINESS NAME
Search for `<!-- CHANGE BUSINESS NAME HERE -->` in ALL HTML files.
Replace every instance of **"Lumière"** and **"Beauty Salon"** with your own name.

Also update the `<title>` tag at the top of each HTML file.

---

### 2. LOGO
Search for `<!-- REPLACE LOGO IMAGE HERE -->` in the nav section.
Replace the text logo with:
```html
<img src="images/logo.png" alt="Your Salon Name" style="height:50px;">
```

---

### 3. IMAGES
All image locations are marked with `<!-- REPLACE IMAGE HERE -->`.

Create an `images/` folder next to your HTML files and add:
- `hero.jpg` — Large hero/banner background (min 1920×1080)
- `about-salon.jpg` — Photo of your salon interior
- `gallery-1.jpg` through `gallery-12.jpg` — Portfolio photos
- `team-1.jpg`, `team-2.jpg`, `team-3.jpg` — Team member photos

To add images, replace placeholder divs like:
```html
<!-- REPLACE IMAGE HERE: <img src="images/gallery-1.jpg" alt="Balayage Hair"> -->
```
With actual `<img>` tags.

For the hero background, uncomment this in `style.css`:
```css
/* background-image: url('images/hero.jpg'); */
```

---

### 4. PHONE NUMBER
Search for `<!-- CHANGE PHONE NUMBER HERE -->` in all files.
Replace `+1 (555) 123-4567` and `tel:+15551234567` with your number.

---

### 5. EMAIL ADDRESS
Search for `<!-- CHANGE EMAIL ADDRESS HERE -->` in all files.
Replace `hello@lumieresalon.com` with your email.

---

### 6. ADDRESS
Search for `<!-- CHANGE ADDRESS HERE -->` in all files.
Replace `123 Elegance Avenue, Beverly Hills, CA 90210` with your address.

---

### 7. SOCIAL MEDIA LINKS
Search for `<!-- CHANGE SOCIAL MEDIA LINKS HERE -->` in all files.
Replace the `YOUR_INSTAGRAM`, `YOUR_FACEBOOK` etc. with your handles.

For SVG/icon social links, you can swap the emoji icons for proper SVG icons from sites like Simple Icons (simpleicons.org).

---

### 8. GOOGLE MAPS
In `contact.html`, find `<!-- REPLACE GOOGLE MAPS EMBED HERE -->`.
1. Go to Google Maps
2. Search for your salon location
3. Click Share → Embed a map → Copy HTML
4. Paste the `<iframe>` in place of the existing one

---

### 9. TEAM MEMBERS
In `about.html`, find `<!-- CHANGE TEAM MEMBER NAME HERE -->`.
Update names, roles, and descriptions for each team member.
Replace emoji with actual `<img>` tags for photos.

---

### 10. SERVICES & PRICES
In `services.html` and `pricing.html`, update:
- Service names and descriptions
- All prices (search "From $")
- Add/remove service categories as needed

---

### 11. BOOKING SERVICES DROPDOWN
In `booking.html`, update the `<select id="service">` with your actual service list.

---

### 12. COLORS
In `style.css`, find the `:root` block at the top and change:
```css
--color-gold: #c9a96e;       ← Main accent color
--color-pink: #f2d4d0;       ← Light accent
--color-dark: #1a1a1a;       ← Dark background
```

---

## 🚀 GOING LIVE

1. Upload all files to your web hosting (cPanel, Netlify, Squarespace, etc.)
2. Make sure all files are in the SAME folder
3. The site should work immediately

### For form submission to actually send emails:
The forms currently show a success message but don't send emails. To make them functional, you'll need one of:
- **Formspree** (free): Add `action="https://formspree.io/f/YOUR_ID"` to the `<form>` tag
- **EmailJS**: Free email service for static sites
- **Back-end server**: PHP, Node.js, etc.

---

## ✅ FEATURES INCLUDED

- ✅ 7 complete pages
- ✅ Responsive (mobile + tablet + desktop)
- ✅ Animated loading screen
- ✅ Smooth scroll reveal animations
- ✅ Gallery with filter buttons + lightbox
- ✅ Pricing tabs
- ✅ Booking form with validation
- ✅ Contact form with validation
- ✅ Google Maps embed section
- ✅ Back to top button
- ✅ Sticky navigation
- ✅ Mobile hamburger menu
- ✅ Animated marquee strip
- ✅ Counter animations (About page)
- ✅ Membership pricing cards
- ✅ Full à la carte price tables

---

*Made with ❤ for beauty lovers*

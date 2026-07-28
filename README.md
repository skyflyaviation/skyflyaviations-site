# SkyFly Aviations — AeroLifeLine

[![Website](https://img.shields.io/badge/Website-skyflyaviations.in-blue)](https://skyflyaviations.in)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-SkyFly_Aviations-0077B5)](https://www.linkedin.com/company/skyfly-aviations/)
[![Status](https://img.shields.io/badge/Status-Development-yellow)]()
[![License](https://img.shields.io/badge/License-Proprietary-red)]()

---

## 🚀 Project Overview

**SkyFly Aviations** is an Indian **HealthTech startup** building **AeroLifeLine** — an AI-powered emergency response platform that connects patients, hospitals, ambulance providers, drivers, and administrators in real-time.

Our long-term vision extends to future air ambulance integration, creating a comprehensive emergency medical mobility ecosystem.

---

## 🏥 About AeroLifeLine

AeroLifeLine is our flagship product — a complete emergency response coordination platform featuring:

| Feature | Description |
|---------|-------------|
| **One Tap SOS** | Patients trigger emergency alerts instantly |
| **Automatic GPS** | Precise location capture and sharing |
| **Hospital Dashboard** | Real-time emergency monitoring |
| **Driver App** | Turn-by-turn navigation for emergency vehicles |
| **Admin Dashboard** | Fleet and operations management |
| **AI Dispatch** | Intelligent ambulance assignment |
| **Live Tracking** | Real-time ambulance location |
| **Notifications** | Automated emergency alerts |

---

## 🛠 Technology Stack

| Technology | Purpose |
|------------|---------|
| **HTML5** | Structure & content |
| **CSS3** | Styling & responsive design |
| **JavaScript** | Frontend interactivity |
| **Bootstrap 5** | Responsive framework |
| **Font Awesome 6** | Icon library |
| **AOS** | Scroll animations |
| **Resend** | Email delivery for contact form |
| **Vercel** | Hosting & serverless functions |

---

## 📂 Project Structure

```
skyfly-aviations-website/
├── index.html              # Main website
├── privacy.html            # Privacy Policy
├── terms.html              # Terms of Service
├── site.webmanifest        # PWA manifest
├── vercel.json             # Vercel configuration
├── README.md               # This file
├── api/
│   ├── contact.js          # Contact form serverless function
│   └── package.json        # API dependencies
└── assets/
    ├── css/
    │   └── style.css       # Custom styles
    ├── js/
    │   └── script.js       # Frontend JavaScript
    └── images/
        ├── logo.png
        ├── aerolifeline-logo.png
        ├── favicon.png
        └── ...
```

---

## 🚀 Deployment

The website is deployed on **Vercel** with the following configuration:

- **Static site** with serverless API functions
- **API routes** under `/api/*` for contact form processing
- **Custom domain**: `skyflyaviations.in`
- **Environment variables** required:
  - `RESEND_API_KEY` — Resend API key for email delivery

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables
vercel env add RESEND_API_KEY
```

---

## 📬 Contact

| Method | Details |
|--------|---------|
| **Email** | [info@skyflyaviations.in](mailto:info@skyflyaviations.in) |
| **Website** | [https://skyflyaviations.in](https://skyflyaviations.in) |
| **LinkedIn** | [SkyFly Aviations](https://www.linkedin.com/company/skyfly-aviations/) |
| **Location** | Hyderabad, India |

---

## 📄 License

All rights reserved. This project and its contents are proprietary to SkyFly Aviations.

&copy; 2026 SkyFly Aviations. All Rights Reserved.

---

*Building the Future of Emergency Medical Mobility*
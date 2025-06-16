# 📋 Stock Pathshala – Frontend Clone

A clean, minimal, and responsive frontend clone of the Stock Pathshala app built using **React 19**, **Vite**, and **Tailwind CSS v4**.

---

## 🚀 Features

### 🔐 Login & OTP Verification

- Mobile number-based login flow
- OTP verification with:
  - Auto-focus across input fields
  - Input validation (only digits)
  - Auto-submit on 4th digit entry
  - "Resend OTP" functionality
- SweetAlert2 integration for success & error toasts

### 📚 Live Class Listing Page

- Fetches live class data using Axios
- Displays:
  - Teacher's name & profile image
  - Class title, language, level, and short description
- Includes a shimmer loader (skeleton UI) while fetching

### 💡 UI/UX Highlights

- Fully responsive on desktop, tablet, and mobile
- Built with Tailwind CSS (no UI libraries)
- Sticky footer-style nav for small screens
- Brushstroke visual effects on subheadings
- Simple, intuitive layout with accessibility in mind

---

## ⚙️ Build Setup

- **Framework:** React 19
- **Bundler:** Vite
- **Styling:** Tailwind CSS v4
- **API Handling:** Axios
- **Toasts:** SweetAlert2

### 🧪 Run Locally

```bash
yarn install
yarn dev
```

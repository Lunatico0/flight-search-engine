# ✈️ Flight Search Engine

A modern, responsive flight search engine built as a technical assessment.
The goal of this project is to demonstrate **frontend architecture, state management, UX decisions, and data visualization**, rather than to replicate an existing product like Google Flights.

The application allows users to search flights, apply multiple filters simultaneously, visualize price trends in real time, and share searches via URL.

---

## 🚀 Live Features

### 🔎 Search
- Search flights by **origin**, **destination**, and **date**
- Search state is persisted in the URL (deep-linkable)

### 🎛️ Advanced Filtering
- Filter simultaneously by:
  - Number of stops
  - Airline(s)
  - Price range
- Filters update:
  - Flight list
  - Price chart
  in real time

### 📈 Price Visualization
- Dynamic price chart showing **average price per airline**
- Updates instantly as filters change

### 🔗 URL Persistence
- Search and filters are synced with the URL
- Copy/paste a URL and the app restores:
  - Search inputs
  - Filters
  - Results

### 📱 Responsive UI
- Fully usable on mobile and desktop
- Adaptive layout with skeleton loading states

### ♿ Accessibility
- Semantic HTML (`fieldset`, `legend`, labels)
- ARIA attributes for filters and sliders
- Keyboard-friendly interactions

---

## 🧠 Architecture Overview

### High-level flow

```
SearchForm
   ↓
useFlights (API state, lifecycle)
   ↓
Normalized flight data
   ↓
useFilteredFlights (derived state)
   ↓
UI (filters, list, chart)
```

---

## 🧩 Key Design Decisions

### 1. App Router + Client Components
- Built using **Next.js App Router**
- Client components are used where interaction and state are required
- API communication is isolated in server routes

### 2. Clear Separation of Concerns
- **`useFlights`**
  - Handles fetching, loading/error states
  - Manages request cancellation and stale responses
- **`useFilteredFlights`**
  - Pure client-side derived state
  - Syncs filters with URL
  - Resets intelligently when dataset changes

### 3. URL as Source of Truth (Initial State)
- Search and filters are restored from query params on first load
- After hydration, local state takes over
- This enables:
  - Shareable links
  - Predictable UX
  - Easier debugging

### 4. No Overfetching
- Filters are applied client-side
- API is called **only** on search changes
- Charts and lists react instantly without refetching

---

## 🛠️ Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **React**
- **Tailwind CSS**
- **Recharts** (data visualization)
- **Amadeus Self-Service API (Test Environment)**

---

## 🔐 Backend & API

- Uses a **Next.js API route** (`/api/flights/search`)
- API key is kept server-side
- Responses are:
  - Normalized
  - Simplified
  - Safe for frontend consumption

---

## 🧪 Loading & UX States

- Skeletons for:
  - Filters
  - Flight list
  - Price chart
- Explicit states:
  - Idle (first load)
  - Loading
  - Success
  - Empty results
  - Error

This avoids layout shifts and improves perceived performance.

---

## 🧑‍💻 Getting Started Locally

### 1. Clone the repository

```bash
git clone https://github.com/Lunatico0/flight-search-engine.git
cd flight-search-engine
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment variables

Create a `.env.local` file with your Amadeus credentials:

```env
AMADEUS_API_KEY=your_key_here
AMADEUS_API_SECRET=your_secret_here
```

> Uses Amadeus **Test Environment**

### 4. Run the development server

```bash
npm run dev
```

Open:
👉 `http://localhost:3000`

---

## 📦 Project Structure (Simplified)

```
src/
├─ app/
│  ├─ globals.css
│  ├─ page.tsx
│  ├─ layout.tsx
│  └─ api/flights/search/route.ts
├─ components/
│  ├─ SearchForm
│  ├─ Filters
│  ├─ FlightList
│  └─ PriceChart
├─ hooks/
│  ├─ useFlights
│  └─ useFilteredFlights
├─ lib/
│  ├─ amadeus
│  ├─ normalizeFlights
│  └─ priceChart
└─ types/
   ├─ filters.ts
   ├─ flight.ts
   ├─ index.ts
   └─ range.ts
```

---

## 🎯 What This Project Demonstrates

- Production-grade React patterns
- State synchronization with URL
- Complex derived state without external libraries
- Thoughtful UX and accessibility
- Clean separation between data, logic, and UI
- Real-world async lifecycle handling

---

## 📌 Notes

This project was built as a **technical assessment**, with emphasis on:
- Code clarity
- Architectural decisions
- User experience
- Maintainability

It is not intended to be a full commercial flight booking product.

---

## 👤 Author

**Patricio Ángel Pittana**
Full Stack Developer
📍 Paraná, Entre Ríos, Argentina

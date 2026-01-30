# ✈️ Flight Search Engine

A modern, responsive flight search engine built as a **technical assessment**.

This project focuses on **frontend architecture, state management, UX decisions, and data visualization**, rather than replicating a full commercial product like Google Flights.

The application allows users to search flights, apply multiple filters and sorting strategies, visualize price trends in real time, inspect flight details, and share searches via URL.

---

## 🚀 Live Features

### 🔎 Flight Search
- Search flights by **origin (IATA)**, **destination (IATA)**, and **date**
- Input normalization:
  - Trims whitespace
  - Uppercases airport codes
  - Validates IATA format (`AAA`)
- Search state is **persisted in the URL** (deep-linkable)

---

### 🎛️ Advanced Filtering
- Filter simultaneously by:
  - Number of stops
  - Airline(s)
  - Price range
- Filters update:
  - Flight list
  - Price chart
  **in real time**
- Filters reset automatically on new searches to avoid stale state
- Manual **“Clear filters”** action available

---

### 🔃 Sorting
Flights can be sorted by:
- Price (low → high / high → low)
- Duration (shortest / longest)
- Departure time (earliest / latest)
- Airline name (A–Z / Z–A)

Sorting is applied **client-side**, without refetching.

---

### 📈 Price Visualization
- Dynamic price chart showing **average price per airline**
- Updates instantly as filters or sorting change
- No additional API calls required

---

### 🧾 Flight Details
- Each flight card is fully clickable
- Opens a **details modal** with:
  - Airline
  - Schedule
  - Stops
  - Duration
  - Price
- Modal behavior:
  - Click outside to close
  - ESC key to close
  - Client-only rendering to avoid SSR issues

---

### 🔗 URL Persistence
- Search and filters are synced with the URL
- Copy/paste a URL and the app restores:
  - Search inputs
  - Filters
  - Sorting
  - Results

---

### 📱 Responsive UI
- Fully usable on mobile and desktop
- Adaptive layout
- Skeleton loading states prevent layout shifts

---

### ♿ Accessibility
- Semantic HTML (`fieldset`, `legend`, labels)
- Keyboard-accessible cards and controls
- Focus states and ARIA-friendly patterns

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
- Client components used only where interaction/state is required
- Server logic isolated in API routes

---

### 2. Clear Separation of Concerns
- **`useFlights`**
  - Handles fetching, loading/error states
  - Manages request cancellation
  - Prevents stale responses
- **`useFilteredFlights`**
  - Pure client-side derived state
  - Handles filters, sorting, and resets
  - No side effects or network calls

---

### 3. URL as Initial Source of Truth
- On first load, search state is hydrated from URL
- After hydration, local state takes over
- Enables:
  - Shareable links
  - Predictable UX
  - Easy debugging

---

### 4. Defensive Backend Design
- API validates:
  - Required parameters
  - IATA format
- Input normalization (`trim`, `uppercase`)
- Graceful handling of:
  - Empty API responses
  - External API failures
- Frontend never crashes on malformed data

---

### 5. No Overfetching
- Filters and sorting are applied **client-side**
- API is called **only** when the search changes
- Chart and list update instantly

---

## 🛠️ Tech Stack

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Recharts** (data visualization)
- **Amadeus Self-Service API (Test Environment)**

---

## 🔐 Backend & API

- Uses a **Next.js API route** (`/api/flights/search`)
- API credentials are kept server-side
- Responses are:
  - Normalized
  - Simplified
  - Safe for frontend consumption

---

## 🧪 Loading & UX States

Explicit UI states:
- Idle (first load)
- Loading
- Success
- Empty results
- Error

Skeletons are used for:
- Filters
- Flight list
- Price chart

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
│  ├─ page.tsx
│  ├─ layout.tsx
│  ├─ HomeClient.tsx
│  ├─ HomeClientWrapper.tsx
│  └─ api/flights/search/route.ts
├─ components/
│  ├─ SearchForm
│  ├─ Filters
│  ├─ SortSelect
│  ├─ FlightList
│  ├─ FlightDetailsModal
│  └─ PriceChart
├─ hooks/
│  ├─ useFlights
│  └─ useFilteredFlights
├─ lib/
│  ├─ amadeus
│  ├─ normalizeFlights
│  ├─ formatters
│  └─ priceChart
└─ types/
   ├─ flight.ts
   ├─ filters.ts
   └─ range.ts
```

---

## 🎯 What This Project Demonstrates

- Production-grade React patterns
- URL-synchronized state
- Complex derived state without external state libraries
- Thoughtful UX and accessibility
- Defensive backend integration
- Clean separation between data, logic, and UI

---

## 📌 Notes

This project was built as a **technical assessment**, with emphasis on:
- Code clarity
- Architectural decisions
- Maintainability
- User experience
- Real-world edge cases

It is **not** intended to be a full commercial flight booking product.

---

## 👤 Author

**Patricio Ángel Pittana**
Full Stack Developer
📍 Paraná, Entre Ríos, Argentina

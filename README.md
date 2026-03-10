# 🍃 Sanjeevani — Smart Community Health Surveillance

Sanjeevani is an AI-powered, multi-tenant dashboard system designed to track, manage, and prevent water-borne disease outbreaks (like Cholera and Typhoid) across communities. It connects Citizens, ASHA Workers (Accredited Social Health Activists), and Hospitals into a single, cohesive health surveillance network.

## 🚀 Key Features

### 1. Unified Dashboards
- **Citizen Dashboard**: Empowers individuals to check local water safety (TDS, pH, Turbidity), report symptoms, view localized risk maps, and receive early warning alerts.
- **ASHA Worker Dashboard**: Provides field workers with tools to track active cases, log community health surveys, monitor outbreak hotspots, and broadcast health advisories.
- **Hospital Dashboard**: Enables medical facilities to track incoming cases, manage patient records via CSV upload + AI autofill, and monitor ward/ICU capacities in real-time.

### 2. AI Chatbot Integration (Gemini 2.5 Flash)
Role-specific AI assistants are embedded across all three dashboards, context-aware of the user's role:
- **Citizen AI**: Offers symptom checking, water purification tips, and nearest PHC routing.
- **ASHA AI**: Assists with outbreak response protocols, translating medical guidelines into community action items.
- **Hospital AI**: Provides quick access to clinical protocols (WHO/ICMR guidelines), case summaries, and resource management advice.

### 3. CSV Upload & AI Autofill
Hospital staff can drastically reduce data entry time by uploading bulk patient records (CSV). The system uses the Google Gemini API to instantly extract and autofill complex patient onboarding forms.

### 4. Real-time GIS Mapping
Integration of risk zones with geographical data allows authorities to pinpoint exact contamination sources and deploy Rapid Response Teams (RRT) effectively.

## 🛠️ Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion (Animations)
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **AI Integration**: Google Gemini 2.5 Flash API

## 🚦 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Yashhzzz/sanjeevani.git
   cd sanjeevani
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Environment Variables:
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *(Note: For demonstration purposes, the API key may be temporarily hardcoded, but it should be moved to `.env` for production).*

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:8080`

## 🏗️ Project Structure
```text
src/
├── components/
│   ├── dashboard/
│   │   ├── asha/        # ASHA Worker Dashboard components
│   │   ├── citizen/     # Citizen Dashboard components
│   │   └── hospital/    # Hospital Dashboard components
│   └── layout/          # Shared layout components (Sidebar, Topbar)
├── data/                # Mock data (hospitalData.ts, etc.)
├── pages/               # Main route pages (Login, Dashboard routing)
└── ...
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.

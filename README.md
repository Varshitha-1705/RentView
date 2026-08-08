# 🏠 RentView — Smart Rental Discovery Platform

> A building-level rental discovery platform that connects tenants with available homes through a single QR code, provides detailed property information, enables visit requests, and offers a property-specific AI assistant powered by RAG.

---

## Table of Contents

1. [Problem Statement](#problem-statement)
2. [Our Solution](#our-solution)
3. [System Architecture](#system-architecture)
4. [Tenant Flow — How It Works](#tenant-flow--how-it-works)
5. [AI / RAG Architecture](#ai--rag-architecture)
6. [Tech Stack](#tech-stack)
7. [Project Structure](#project-structure)
8. [Features](#features)
9. [API Reference](#api-reference)
10. [Getting Started](#getting-started)
11. [Environment Variables](#environment-variables)
12. [Screenshots & UI Flow](#screenshots--ui-flow)
13. [Future Enhancements](#future-enhancements)
14. [Development Roadmap](#development-roadmap)
15. [Team](#team)

---

## Problem Statement

Finding a suitable rental property can be unnecessarily difficult for tenants and property owners.

Traditional rental discovery often involves:

- **Too many irrelevant listings** — Tenants have to search through large numbers of properties.
- **Outdated availability** — Occupied properties may still appear as available.
- **Limited property information** — Important details such as parking, furnishing, deposit, and pet policies may not be easily accessible.
- **Repeated enquiries** — Property owners receive the same basic questions from multiple prospective tenants.
- **No building-level discovery** — A tenant visiting a particular building has no simple way to know which homes are currently available.
- **Generic assistance** — Existing chatbots are not aware of the specific property a tenant is interested in.
- **Manual visit coordination** — Tenants often have to contact property owners separately to schedule visits.

> **Result:** Tenants spend more time searching and gathering information, while property owners spend more time answering repetitive questions and managing enquiries.

---

## Our Solution

**RentView** is a building-level rental discovery platform designed around a simple concept:

> **One Building → One QR Code → Available Homes → Property Details → AI Assistance → Visit Request**

A property owner places a single RentView QR code at a building.

When a tenant scans the QR code, they are taken directly to the building's RentView landing page.

```text
                       🏢 VNS RESIDENCY
                              │
                         ONE QR CODE
                              │
                              ▼
                 ┌────────────────────────┐
                 │   RENTVIEW LANDING     │
                 │        PAGE            │
                 └────────────┬───────────┘
                              │
                              ▼
                    AVAILABLE HOMES ONLY
                              │
                 ┌────────────┼────────────┐
                 ▼            ▼            ▼
             House 101    House 102    House 103
                 │
                 ▼
          PROPERTY DETAILS
                 │
        ┌────────┼─────────┐
        ▼        ▼         ▼
      Photos   Video   Property Info
                          │
                          ▼
                 🤖 PROPERTY AI
                          │
              ┌───────────┼───────────┐
              ▼           ▼           ▼
           Parking?    Deposit?    Furnished?
                          │
                          ▼
                  REQUEST A VISIT
```

The platform is initially designed for a **single building**, with the architecture allowing future expansion to multiple buildings and property owners.

---

## System Architecture

```text
                         ┌──────────────────────────────┐
                         │           TENANT             │
                         │                              │
                         │       Scan QR Code           │
                         └──────────────┬───────────────┘
                                        │
                                        ▼
              ┌────────────────────────────────────────────┐
              │             FRONTEND — REACT               │
              │                                            │
              │  React + TypeScript + Vite                 │
              │  Tailwind CSS + React Router               │
              │  Axios + Motion + Lucide React             │
              │                                            │
              │  ┌─────────────┐    ┌───────────────────┐  │
              │  │ Home Page   │    │ Property Details  │  │
              │  └─────────────┘    └───────────────────┘  │
              │                                            │
              │  ┌─────────────┐    ┌───────────────────┐  │
              │  │ Visit Form  │    │ AI Chat Interface  │  │
              │  └─────────────┘    └───────────────────┘  │
              └──────────────────────┬─────────────────────┘
                                     │
                                  HTTP/REST
                                     │
                                     ▼
              ┌────────────────────────────────────────────┐
              │          BACKEND — NODE + EXPRESS          │
              │                                            │
              │  Property APIs                             │
              │  Availability Management                   │
              │  Tenant Enquiries                          │
              │  Visit Requests                            │
              │  Owner Operations                          │
              │  AI Service Communication                   │
              └───────────────┬──────────────┬─────────────┘
                              │              │
                              ▼              ▼
                    ┌───────────────┐   ┌──────────────────┐
                    │   MongoDB     │   │  FastAPI AI      │
                    │               │   │  Microservice    │
                    │ Properties    │   │                  │
                    │ Enquiries     │   │ RAG Pipeline     │
                    │ Owners        │   │ Embeddings       │
                    │ Visit Requests│   │ Vector Database  │
                    └───────────────┘   │ LLM              │
                                        └──────────────────┘
```

### Architecture Philosophy

RentView separates responsibilities into three major layers:

```text
React + TypeScript
       │
       │ User Interface
       ▼
Node.js + Express
       │
       │ Business Logic / REST API
       ▼
MongoDB

       +

FastAPI
       │
       │ AI / RAG Processing
       ▼
Embeddings + Vector DB + LLM
```

The **Node.js + Express backend** acts as the primary application backend.

The **FastAPI service** is dedicated to AI and RAG functionality.

---

## Tenant Flow — How It Works

### Step 1: Scan Building QR Code

The property owner places one RentView QR code at the building.

```text
                📱 Tenant
                   │
                   ▼
             Scan QR Code
                   │
                   ▼
            RentView URL
                   │
                   ▼
           Building Landing Page
```

---

### Step 2: View Available Homes

The landing page displays only homes whose status is:

```text
available
```

Example:

```text
ABC RESIDENCY

Available Homes

┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│   HOUSE 101    │  │   HOUSE 102    │  │   HOUSE 103    │
│                │  │                │  │                │
│     2 BHK      │  │     1 BHK      │  │     2 BHK      │
│                │  │                │  │                │
│    ₹20,000     │  │    ₹15,000     │  │    ₹22,000     │
│                │  │                │  │                │
│ View Details → │  │ View Details → │  │ View Details → │
└────────────────┘  └────────────────┘  └────────────────┘
```

Occupied homes are not displayed.

```text
House 101 → available → ✅ Visible
House 102 → occupied  → ❌ Hidden
House 103 → available → ✅ Visible
```

---

### Step 3: Open Property Details

When the tenant selects a property, RentView displays detailed information.

For example:

```text
HOUSE 101

2 BHK Apartment
VNS Residency
Bangalore, Karnataka

₹20,000 / month

Security Deposit: ₹80,000

Floor: 3
Furnishing: Semi-Furnished
Parking: Available
Availability: Available
```

The page also contains:

- Property photos
- Walkthrough video
- Monthly rent
- Security deposit
- Configuration
- Floor
- Furnishing
- Parking
- Amenities
- Pet policy
- Availability

---

### Step 4: Ask Property-Specific AI

The tenant can interact with the AI assistant directly from the property page.

Example:

```text
Tenant:
Is parking available?

AI:
Yes, House 101 has parking available.
```

Other possible questions:

```text
Is the house furnished?

What is the security deposit?

Are pets allowed?

What amenities are available?

What floor is the house on?

Can I visit tomorrow?
```

The AI is designed to answer questions using the context of the **selected property**.

---

### Step 5: Request a Visit

A tenant interested in the property can submit a visit request.

```text
House:

[ House 101 ▼ ]

Name:

[________________________]

Phone:

[________________________]

Preferred Visit Date:

[________________________]

Message:

[________________________]


          [ Request Visit ]
```

The request is sent to the backend and stored in MongoDB.

The property owner can later view and manage the enquiry from the owner dashboard.

---

## AI / RAG Architecture

RentView uses **Retrieval-Augmented Generation (RAG)** to provide property-specific AI assistance.

The most important design principle is:

> **The AI should answer questions using information related to the selected house rather than providing generic rental information.**

### AI Request Flow

```text
                     Tenant
                       │
                       │
              "Is parking available?"
                       │
                       ▼
              React Chat Interface
                       │
                       ▼
                 Express Backend
                       │
                       ▼
                FastAPI Service
                       │
                       ▼
                Property ID
                 "house-101"
                       │
                       ▼
             Retrieve Property Data
                       │
              ┌────────┼────────┐
              ▼        ▼        ▼
            Rent    Parking   Deposit
              │        │        │
              └────────┼────────┘
                       ▼
                 Create Context
                       │
                       ▼
                  Embeddings
                       │
                       ▼
                Vector Database
                       │
                       ▼
                      LLM
                       │
                       ▼
             Property-specific Answer
                       │
                       ▼
                 React Chat UI
```

### Example

Suppose the database contains:

```text
House 101
├── rent: ₹20,000
├── deposit: ₹80,000
├── furnishing: Semi-Furnished
├── parking: Available
├── pets: Allowed
└── amenities:
      ├── Lift
      ├── Security
      ├── Power Backup
      └── Water Supply
```

Tenant asks:

```text
Is parking available?
```

The RAG pipeline retrieves the relevant property context and generates an answer based on House 101.

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| **React.js** | Frontend UI development |
| **TypeScript** | Type-safe frontend development |
| **Vite** | Development server and build tool |
| **Tailwind CSS** | Utility-first styling |
| **React Router** | Client-side routing |
| **Axios** | REST API communication |
| **Motion** | UI animations and transitions |
| **Lucide React** | Icon library |

### Backend

| Technology | Purpose |
|---|---|
| **Node.js** | Backend runtime |
| **Express.js** | REST API framework |
| **Mongoose** | MongoDB ODM |
| **Axios** | Communication with AI service |

### Database

| Technology | Purpose |
|---|---|
| **MongoDB** | Primary application database |
| **MongoDB Atlas** | Cloud database deployment |
| **Mongoose** | Schema modelling and validation |

### AI / RAG

| Technology | Purpose |
|---|---|
| **Python** | AI service runtime |
| **FastAPI** | AI microservice |
| **LangChain** | RAG pipeline orchestration |
| **Embeddings** | Semantic representation |
| **Vector Database** | Context retrieval |
| **LLM** | Natural language generation |

### Development

| Technology | Purpose |
|---|---|
| **Git** | Version control |
| **GitHub** | Source code management |
| **VS Code** | Development environment |
| **Postman** | REST API testing |
| **Docker** | Containerization |

---

## Project Structure

```text
RentView/
│
├── README.md
│
├── frontend/
│   │
│   ├── public/
│   │   └── properties/
│   │       └── house-101/
│   │           ├── main.jpg
│   │           ├── living-room.jpg
│   │           ├── bedroom.jpg
│   │           ├── kitchen.jpg
│   │           └── walkthrough.mp4
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   └── Navbar.tsx
│   │   │   │
│   │   │   ├── property/
│   │   │   │   ├── PropertyCard.tsx
│   │   │   │   ├── PropertyGallery.tsx
│   │   │   │   ├── PropertyInfo.tsx
│   │   │   │   └── PropertyAmenities.tsx
│   │   │   │
│   │   │   ├── chat/
│   │   │   │   └── PropertyChat.tsx
│   │   │   │
│   │   │   └── ui/
│   │   │       ├── Button.tsx
│   │   │       ├── GlassCard.tsx
│   │   │       └── Badge.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── PropertyDetails.tsx
│   │   │   └── NotFound.tsx
│   │   │
│   │   ├── data/
│   │   │   └── properties.ts
│   │   │
│   │   ├── services/
│   │   │   └── api.ts
│   │   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── propertyController.js
│   │   │   └── enquiryController.js
│   │   │
│   │   ├── models/
│   │   │   ├── Property.js
│   │   │   └── Enquiry.js
│   │   │
│   │   ├── routes/
│   │   │   ├── propertyRoutes.js
│   │   │   └── enquiryRoutes.js
│   │   │
│   │   └── middleware/
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── ai-models/
    │
    ├── app/
    │   └── main.py
    │
    ├── rag/
    │   ├── retriever.py
    │   └── pipeline.py
    │
    ├── embeddings/
    │
    ├── requirements.txt
    └── .env
```

---

## Features

### 🏠 Tenant Features

- **Building-level rental discovery**
- **Single QR code entry point**
- **Available properties only**
- **Property cards**
- **Property detail pages**
- **Property photo gallery**
- **Walkthrough video**
- **Monthly rent information**
- **Security deposit information**
- **BHK configuration**
- **Floor information**
- **Furnishing status**
- **Parking availability**
- **Amenities**
- **Pet policy**
- **Availability status**
- **Property-specific AI assistant**
- **Visit request form**
- **Tenant enquiry submission**
- **Responsive UI**

### 🤖 AI Features

- Property-specific AI assistant
- Retrieval-Augmented Generation
- Property context retrieval
- Semantic search using embeddings
- Vector database integration
- Natural language question answering
- House-specific responses

### 👨‍💼 Owner Features

Planned owner functionality includes:

- Owner authentication
- Owner dashboard
- Property management
- Add property
- Edit property
- Delete property
- Upload photos
- Upload walkthrough videos
- Change property availability
- Mark property as occupied
- View tenant enquiries
- Manage visit requests

---

## Availability Model

RentView uses a simple property availability model:

```text
                     PROPERTY
                        │
              ┌─────────┴─────────┐
              │                   │
          AVAILABLE            OCCUPIED
              │                   │
              ▼                   ▼
       Tenant-facing page     Hidden from
            visible          tenant page
```

Example:

```text
House 101 → available → ✅ Displayed
House 102 → occupied  → ❌ Hidden
House 103 → available → ✅ Displayed
```

When the owner changes:

```text
House 101
AVAILABLE
    │
    ▼
OCCUPIED
```

the property is automatically removed from the tenant-facing available homes list.

---

## API Reference

### Property APIs

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/properties` | Public | Get all properties |
| `GET` | `/api/properties/available` | Public | Get available properties |
| `GET` | `/api/properties/:id` | Public | Get property details |
| `POST` | `/api/properties` | Owner | Create property |
| `PUT` | `/api/properties/:id` | Owner | Update property |
| `DELETE` | `/api/properties/:id` | Owner | Delete property |

### Tenant Enquiry APIs

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/enquiries` | Public | Submit tenant enquiry |
| `GET` | `/api/enquiries` | Owner | Get all enquiries |
| `GET` | `/api/enquiries/:id` | Owner | Get enquiry details |
| `PUT` | `/api/enquiries/:id` | Owner | Update enquiry status |

### AI APIs

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/ai/chat` | Ask property-specific AI |
| `GET` | `/api/ai/health` | Check AI service health |

> API endpoints may evolve as the backend implementation develops.

---

## Getting Started

### Prerequisites

Install the following:

- **Node.js 18+**
- **npm**
- **MongoDB / MongoDB Atlas**
- **Python 3.10+**
- **Git**
- **VS Code**

---

### 1. Clone the Repository

```bash
git clone <repository-url>
cd RentView
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

### 3. Backend Setup

Open a new terminal:

```bash
cd backend
npm install
npm run dev
```

Backend:

```text
http://localhost:5000
```

---

### 4. AI Service Setup

Open another terminal:

```bash
cd ai-models
python -m venv venv
```

Activate the virtual environment.

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start FastAPI:

```bash
uvicorn app.main:app --reload --port 8000
```

AI Service:

```text
http://localhost:8000
```

---

## Environment Variables

### Backend

Create:

```text
backend/.env
```

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
AI_SERVICE_URL=http://localhost:8000
```

### Frontend

Create:

```text
frontend/.env
```

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### AI Service

Create:

```text
ai-models/.env
```

```env
LLM_API_KEY=your_llm_api_key
```

> **Never commit `.env` files, database credentials, API keys, or secrets to GitHub.**

---

## Screenshots & UI Flow

### 🏠 Building Landing Page

The RentView landing page introduces the building and displays currently available homes.

```text
┌─────────────────────────────────────────────────────────┐
│ RENTVIEW                          Home   About   Contact │
├─────────────────────────────────────────────────────────┤
│                                                         │
│                  ABC RESIDENCY                           │
│                                                         │
│          Find your next home, simply.                   │
│                                                         │
│       Discover available homes in this building.        │
│                                                         │
│                    ↓                                    │
│              Explore Available Homes                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

### 🏡 Available Homes

```text
VNS RESIDENCY

Available Homes

┌──────────────────┐
│                  │
│    HOUSE 101     │
│                  │
│      2 BHK       │
│                  │
│   ₹20,000/month  │
│                  │
│  Semi-Furnished  │
│  Parking ✓       │
│                  │
│  View Details →  │
└──────────────────┘
```

---

### 🏠 Property Details

```text
HOUSE 101

┌──────────────────────────────────────┐
│                                      │
│          PROPERTY IMAGE              │
│                                      │
└──────────────────────────────────────┘

2 BHK Apartment
VNS Residency

₹20,000 / month

Security Deposit
₹80,000

──────────────────────────────────────

PROPERTY INFORMATION

Floor             3
Furnishing        Semi-Furnished
Parking           Available
Availability      Available

──────────────────────────────────────

AMENITIES

✓ Lift
✓ Security
✓ Power Backup
✓ Water Supply

──────────────────────────────────────

[ 🤖 Ask AI ]      [ 📅 Request Visit ]
```

---

### 🤖 Property AI Assistant

```text
┌───────────────────────────────────────┐
│  🤖 House 101 AI Assistant            │
├───────────────────────────────────────┤
│                                       │
│  AI: Hi! Ask me anything about       │
│      House 101.                       │
│                                       │
│  You: Is parking available?           │
│                                       │
│  AI: Yes, parking is available       │
│      for House 101.                   │
│                                       │
│  ┌─────────────────────────────────┐  │
│  │ Ask about this property...      │  │
│  └─────────────────────────────────┘  │
│                              [ Send ] │
└───────────────────────────────────────┘
```

---

### 📝 Visit Request

```text
REQUEST A VISIT

House

[ House 101 ▼ ]

Name

[____________________________]

Phone

[____________________________]

Preferred Visit Date

[____________________________]

Message

[____________________________]

        [ Request Visit ]
```

---

## Public User Flow

```text
                    QR CODE
                       │
                       ▼
              BUILDING LANDING PAGE
                       │
                       ▼
               AVAILABLE HOMES
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
       House 101    House 102    House 103
          │
          ▼
    PROPERTY DETAILS
          │
     ┌────┼──────────┐
     ▼    ▼          ▼
  Photos Video    Property Info
                   │
          ┌────────┴────────┐
          ▼                 ▼
       ASK AI          REQUEST VISIT
          │                 │
          ▼                 ▼
      RAG SERVICE       EXPRESS API
```

---

## Owner Flow

```text
                  OWNER
                    │
                    ▼
              OWNER LOGIN
                    │
                    ▼
             OWNER DASHBOARD
                    │
        ┌───────────┼────────────┐
        ▼           ▼            ▼
    Properties   Enquiries    Visits
        │
        ▼
 ┌──────┼───────────────┐
 ▼      ▼               ▼
Add    Edit        Availability
Property Property     Status
                         │
                ┌────────┴────────┐
                ▼                 ▼
            Available          Occupied
                │                 │
                ▼                 ▼
            Visible             Hidden
            to tenant           from tenant
```

---

## AI Interaction Flow

```text
Tenant asks:

"Is House 101 furnished?"
             │
             ▼
       React Chat UI
             │
             ▼
       Express Backend
             │
             ▼
       FastAPI Service
             │
             ▼
       Property ID = 101
             │
             ▼
      Retrieve Context
             │
             ▼
      Embeddings / Vector DB
             │
             ▼
             LLM
             │
             ▼
       "House 101 is
        semi-furnished."
```

---

## Future Enhancements

### Owner Platform

- Owner authentication
- Role-based access control
- Owner dashboard
- Property CRUD operations
- Property image upload
- Walkthrough video upload
- Availability management
- Tenant enquiry management
- Visit scheduling

### AI Enhancements

- Property-specific RAG knowledge bases
- Natural language property search
- AI-powered property recommendations
- Conversation history
- Multilingual property assistant
- Voice-based property assistant
- AI-assisted enquiry summarization

### Platform Enhancements

- Multiple building support
- Multiple owner support
- QR code generation
- Cloud media storage
- Email notifications
- WhatsApp notifications
- Tenant authentication
- Saved properties
- Property comparison
- Analytics dashboard
- Visit reminders
- Production monitoring

---

## Development Roadmap

The project is intentionally developed incrementally.

### Phase 1 — Frontend

```text
React + TypeScript
        │
        ▼
Global UI / Theme
        │
        ▼
Navbar
        │
        ▼
Building Landing Page
        │
        ▼
Property Cards
        │
        ▼
Property Details
        │
        ├── Gallery
        ├── Video
        ├── Property Information
        └── Amenities
        │
        ▼
Property AI Chat UI
        │
        ▼
Visit Request UI
        │
        ▼
Responsive Design
        │
        ▼
Frontend Complete
```

### Phase 2 — Backend

```text
Node.js
    │
    ▼
Express
    │
    ▼
MongoDB + Mongoose
    │
    ├── Property Model
    ├── Enquiry Model
    └── Visit Request Model
    │
    ▼
REST APIs
```

### Phase 3 — Frontend + Backend Integration

```text
React
  │
  │ Axios
  ▼
Express API
  │
  ▼
MongoDB
```

Replace:

```text
Static / Mock Data
       ↓
MongoDB Data
```

### Phase 4 — AI / RAG

```text
React Chat
     │
     ▼
Express
     │
     ▼
FastAPI
     │
     ▼
LangChain
     │
     ▼
Embeddings
     │
     ▼
Vector Database
     │
     ▼
LLM
```

### Phase 5 — Owner Dashboard

```text
Owner Authentication
        │
        ▼
Owner Dashboard
        │
        ├── Properties
        ├── Add Property
        ├── Edit Property
        ├── Availability
        └── Tenant Enquiries
```

### Phase 6 — Deployment

```text
Frontend
    │
    ▼
Cloud Deployment

Backend
    │
    ▼
Cloud Deployment

MongoDB
    │
    ▼
MongoDB Atlas

AI Service
    │
    ▼
Cloud Deployment
```

---

## Project Status

```text
Frontend             🔄 In Development
Backend              ⏳ Planned
MongoDB Integration  ⏳ Planned
AI / RAG             ⏳ Planned
Owner Dashboard      ⏳ Planned
Deployment           ⏳ Planned
```

---

## Team

**RentView**

A full-stack software engineering project demonstrating:

- Modern React development
- TypeScript-based frontend architecture
- Responsive UI/UX
- REST API development
- MongoDB data modelling
- Full-stack application integration
- AI / RAG integration
- Microservice architecture
- Cloud deployment

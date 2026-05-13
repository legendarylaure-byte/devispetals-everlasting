# Devis Petals: World-Class Implementation Plan

## Goal Description
Build a "World Elite" ecommerce platform for **Devis Petals Pvt. Ltd.**, a Kathmandu-based company specializing in handmade everlasting flowers. The platform will be a fusion of high-end aesthetics, 3D motion design, and cutting-edge AI. It aims to not only sell products but to act as a self-growing business entity with an "AI CEO" at its core.

## World-Class Architecture
We will follow a **Modern Headless Architecture**:
*   **Frontend**: Next.js 14+ (App Router) for blazing fast performance, SSR/ISR for SEO, and Edge Runtime for global low latency.
*   **Styling**: Vanilla CSS with CSS Modules and Framer Motion for premium animations.
*   **3D Engine**: React Three Fiber (Three.js) for interactive floral showcases.
*   **Backend-as-a-Service**: Firebase (Firestore, Auth, Functions, Storage).
*   **Validation & Security**: Zod for schema validation and strict input sanitization.
*   **State Management**: React Context / Zustand for lightweight, high-performance state.
*   **AI Engine**: Google Gemini 1.5 Pro/Flash integrated via Firebase Cloud Functions.

## Security & Reliability (Priority Zero)
> [!IMPORTANT]
> The following security measures are baked into the core architecture:
> 1. **Rate Limiting**: Implementation of a 5-attempt limit per 15 minutes on authentication routes to prevent brute-force attacks.
> 2. **Secret Management**: ZERO hardcoded keys. All sensitive data (Firebase config, Gemini API keys, WhatsApp tokens) will be stored in `.env` files and Firebase Secrets Manager.
> 3. **Input Sanitization**: Every user input (chat, order forms, admin updates) will be sanitized and validated using **Zod** to reject malformed or oversized payloads.
> 4. **Git Safety**: A strict `.gitignore` will be maintained to ensure no secrets ever reach GitHub.
> 5. **Security Audit**: A full audit will be conducted before deployment, including scanning for vulnerabilities and ensuring global privacy standards (GDPR/CCPA compliance where applicable).

## Proposed Changes

## User Review Required
> [!IMPORTANT]
> **AI Lead Generation & WhatsApp Crawling**: Crawling external websites for leads requires careful handling of robots.txt and privacy laws. We will focus on ethical lead discovery (e.g., public business directories) and use a professional WhatsApp API (like Twilio) to ensure your number doesn't get banned.
> 
> **3D Assets**: For the "World Best" 3D concept, do you have 3D models (.glb/.gltf) of your flowers? If not, we will start with high-quality 2D renders and procedural 3D elements.

## Proposed Architecture

### 1. Visual Identity & UX ("Petal Symphony")
*   **Company Logo**: We will use the provided "Devi's Petals" line-art logo as the centerpiece of the brand.
    *   **Header**: High-resolution transparent logo with "Devi's Petals" script.
    *   **Favicon**: The minimalist flower oval.
    *   **AI Bot Avatar**: An animated, glowing version of the flower logo.
    *   **Email Branding**: The logo will be featured in the poetic order confirmations.
*   **Color Palette**: 
    *   `#fffefe` (Pure Pearl White) - Primary Background
    *   `#e3b0b8` (Petal Blush) - Primary Brand Color / Accents
    *   `#0a0a0a` (Shining Metal Black) - Typography and Premium Elements
*   **Atmosphere**: Joyful, light-vibe, airy.
*   **Motion**: Framer Motion for scroll-linked animations. A floating 3D "Hero Flower" using Three.js that blooms/rotates as the user interacts.

### 2. Frontend (The Customer Experience)
*   **Framework**: Next.js (for SEO and high performance on Vercel).
*   **AI Chat & Order Bot**: A floating "Petal Guide" bubble.
    *   **Chatbot**: Powered by Gemini 1.5 Flash for fast, poetic, and professional replies.
    *   **Order Bot**: A conversational checkout process. Instead of a boring form, the bot asks "Who are these flowers for?" and "What message should we include?" to place the order.
*   **Poetic Emails**: Integration with **Resend** or **Nodemailer**. The AI will generate a unique poem for every order confirmation, sent with animated flower icons.

### 3. Admin Panel (The "Business Brain")
*   **Dashboard**: A clean, minimalist interface for non-technical users.
*   **AI CEO Dashboard**: 
    *   **Data Analysis**: Visualizes sales trends using animated charts (Recharts).
    *   **Growth Suggestions**: A "Small Brain" widget that says things like: *"Mother's Day is coming in 3 weeks. Based on Kathmandu's search trends, I suggest launching a 'Red Rose Everlasting' bundle. Shall I draft the WhatsApp campaign?"*
*   **Lead Gen Section**: A list of potential corporate clients (hotels, event planners in Nepal) found by the AI.

### 4. Backend & AI Agents (The Engine)
*   **Firebase**:
    *   **Authentication**: Google Sign-In for both customers and admin.
    *   **Firestore**: Real-time database for products, orders, and leads.
    *   **Cloud Functions**: To handle the heavy lifting (sending WhatsApp, processing AI logic).
*   **AI Lead Agent**: A scheduled function that searches for local businesses in Nepal that might need everlasting floral decor and adds them to the Admin leads table.
*   **WhatsApp Integration**: Using **Twilio WhatsApp API**. The AI drafts a poetic invitation, and with one click from the Admin, it sends the message.

## Documentation Strategy
*   **Living Document**: This plan and the `task.md` will be kept in the `/docs` folder of the project directory.
*   **Continuous Updates**: As we build, every major architectural decision and security patch will be documented here.
*   **Knowledge Transfer**: The "AI CEO" logic will be documented so you can understand exactly how it suggests business growth.

## Verification Plan

### Automated Tests
- Test Firebase security rules to ensure customer data is global-standard private.
- Test Gemini API response times for the Chatbot.
- Validate the "Order Bot" conversational flow.
- **Security Tests**: Scripted attempts to bypass rate limits and submit malformed payloads.

### Manual Verification
- **Visual Audit**: Verify the 3D animations run smoothly at 60fps on mobile and desktop.
- **WhatsApp Flow**: Test the "Yes/No" reply logic on a demo WhatsApp number.
- **Email Aesthetic**: Verify that the order confirmation emails look premium and the poetry is meaningful.

## Implementation Phases

1.  **Phase 1: Foundation & Security**: Setup Next.js, Firebase, Environment variables, and Rate Limiting.
2.  **Phase 2: The Floral Boutique**: Build the 3D Hero and Product Gallery.
3.  **Phase 3: The AI Guardian**: Integrate Gemini for Chat and Order bots with full sanitization.
4.  **Phase 4: The CEO Brain**: Build the Admin Panel and Analytics.
5.  **Phase 5: Outreach & Audit**: Implement Lead Gen, WhatsApp automation, and run the final Security Audit.

# Azure Beauty Reveal 🎭✨

Azure Beauty Reveal is a cutting-edge AI-powered platform that revolutionizes how people approach cosmetic surgery decisions. By leveraging Microsoft Azure's Custom Vision AI technology, our application provides sophisticated facial analysis and personalized recommendations, helping users make informed decisions about cosmetic procedures.

## Key Features 🌟

- **AI-Powered Analysis**: Advanced facial recognition and scoring system trained on thousands of images
- **Real-time Processing**: Instant feedback using Azure's high-performance computing infrastructure
- **Personalized Recommendations**: Tailored suggestions based on individual facial features
- **Interactive Interface**: Smooth, user-friendly experience with real-time visual feedback
- **Privacy-First**: Secure processing of sensitive facial data using Azure's enterprise-grade security

## Technical Stack 🛠️

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Python Flask API, TensorFlow Lite
- **AI/ML**: Azure Custom Vision AI, Custom-trained TensorFlow models
- **Infrastructure**: Docker containers, Azure Cloud Services
- **API**: RESTful architecture with Next.js API routes
- **Development**: Docker Compose for local development

## Getting Started 🚀

- Create the inference app image

```bash
docker build -t azure .
```

- Run the image in a Docker container

```bash
docker run -p 8080:80 azure
```

- Install project dependencies

```bash
npm i
```

- Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

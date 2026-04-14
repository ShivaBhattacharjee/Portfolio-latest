export const navLinks = [
  {
    path: "/",
    name: "About",
  },
  {
    path: "/projects",
    name: "Projects",
  },
  {
    path: "/experience",
    name: "Experience",
  },
  {
    path: "/hackathons",
    name: "Hacks",
  },
];

export const notableAchievements = [
  {
    title: "Smart India Hackathon",
    body: [
      { text: "Made it to " },
      { text: "SIH 2023", bold: true },
      { text: " in my very first semester of college. Didn't really know what I was doing but figured it out." },
    ],
  },
  {
    title: "Hackathons",
    body: [
      { text: "Won " },
      { text: "5 hackathons", bold: true, href: "/hackathons" },
      { text: ", mostly building AI stuff. " },
      { text: "WasteEasy", bold: true },
      {
        text: " was probably the one I'm proudest of, a full waste-management app that uses AI-assisted waste classification, nearby disposal discovery, and a rewards loop where users earn coupons for responsible dumping. Took home ",
      },
      { text: "Rs. 30,000", bold: true },
      { text: " from ADTU and got called out as a unique tech startup at an " },
      { text: "IIM Shillong", bold: true },
      { text: " entrepreneurship event." },
    ],
    link: "https://github.com/ShivaBhattacharjee/WasteEasy",
    linkLabel: "WasteEasy on GitHub",
  },
  {
    title: "Rise In bounty",
    body: [
      { text: "Got a bounty from " },
      { text: "Rise In", bold: true },
      { text: " for a project that lets people lend money on " },
      { text: "Ethereum", bold: true },
      { text: " and build an actual " },
      { text: "credit score on-chain", bold: true },
      {
        text: ". Built flows for issuing loans, tracking active borrows, repayments, and defaulter marking with transparent contract-backed state. No banks, just smart contracts.",
      },
    ],
    link: "https://github.com/ShivaBhattacharjee/lending-blockchain",
    linkLabel: "lending-blockchain on GitHub",
  },
  {
    title: "In the news",
    body: [
      { text: "Got featured in a " },
      { text: "national newspaper", bold: true },
      { text: " for building a " },
      { text: "fine-tuned LLM on the Assamese language", bold: true },
      { text: ", one of the first of its kind for a low-resource Indian language." },
    ],
  },
  {
    title: "Side project at scale",
    body: [
      { text: "Built " },
      { text: "AnimeTrix", bold: true },
      { text: ", an anime streaming site, hit around " },
      { text: "15,000 users", bold: true },
      { text: " and was handling " },
      { text: "100 concurrent viewers", bold: true },
      { text: " at peak using web scraping and some creative infra decisions. Had to take it down after a DMCA. The repo still has " },
      { text: "~190 stars", bold: true },
      { text: "." },
    ],
    link: "https://github.com/ShivaBhattacharjee/AnimeTrix-next",
    linkLabel: "AnimeTrix on GitHub",
  },
];

export const intros = [
  "Software Engineer",
  "Graphic Designer",
  "Web Developer",
  "Problem Solver",
  "Creative Thinker",
  "Coffee Addict",
  "Tech Geek",
];

export const experiences = [
  {
    role: "Software Developer Intern",
    year: "Feb 2024 - Sept 2024",
    company: "GITCS.",
    type: "Internship",
    location: "Guwahati, On-Site",
    logo: "/Company/gitcs.png",
    responsibility:
      "Develop websites and systems to be used by its clients and maintain current existing websites and systems.",
    techstacks: ["ReactJS", "NextJS", "Frame Motion", "ThreeJS"],
  },
  {
    role: "Software Engineer",
    year: "Oct 2024 - Jan 2025",
    company: "TTIPL",
    type: "Full-Time",
    location: "India, On-Site",
    logo: "/Company/ttipl.png",
    responsibility:
      "Built internal ERP modules for billing, vendor, and project tracking used by construction operations. Developed semantic project document search using RAG pipelines with OpenAI embeddings and vector databases for construction drawings, BOQs, and reports. Optimized API performance and database queries improving internal tool response times and reliability.",
    techstacks: [
      "ReactJS",
      "NextJS",
      "Tailwindcss",
      "Prisma",
      "Supabase",
      "OpenAI",
      "Vector DB",
      "RAG",
    ],
  },
  {
    role: "Member of Technical Staff",
    year: "Jan 2025 - July 2025",
    company: "Navdyut AI",
    type: "Full-Time",
    location: "India, On-Site",
    logo: "/Company/Navdyut.png",
    responsibility:
      "Built an Assamese chatbot on a 22B Mistral model with RAG pipelines for translation and government applications. Scaled the system to 500+ users and contributed to deployments for public sector use. Project work was featured in regional newspapers.",
    techstacks: [
      "Mistral",
      "RAG",
      "Langchain",
      "LlamaIndex",
      "Pinecone",
      "NextJS",
      "Tailwindcss",
      "Supabase",
    ],
  },
  {
    role: "Applied AI & Full Stack Engineer",
    year: "July 2025 - Present",
    company: "Bez",
    type: "Full-Time",
    location: "New York, Remote",
    logo: "/Company/Astra.png",
    logoPadding: false,
    invertLogo: true,
    responsibility:
      "Reduced jewelry design turnaround from days to minutes by building AI agent workflows using the Vercel AI SDK with observability via Langfuse. Built an interactive jewelry design canvas using React + XYFlow enabling credit-gated editing and real-time agent-driven design iteration. Developed a Redis queue pipeline generating 70+ jewelry design variations in 5 minutes per batch. Built a custom memory system with rolling context per user to retain design preferences and reduce duplicate generations. Improved reliability and performance across microservices deployed with Docker, Firebase, and GCP.",
    techstacks: [
      "Vercel AI SDK",
      "React",
      "XYFlow",
      "Redis",
      "Firebase",
      "GCP",
      "Docker",
      "Langfuse",
      "NextJS",
    ],
  },
];

export const projects = [
  {
    title: "KeyZen",
    category: "Side Project · Web App",
    description:
      "A typing speed test built around the Keychron keyboard aesthetic with audio feedback on every keystroke. Tracks WPM, accuracy, and stats with a clean, minimal UI.",
    techstacks: ["Next.js", "TypeScript", "Motion", "Recharts", "shadcn/ui"],
    status: "active",
    link: "https://keyzen.theshiva.xyz/",
    preview: "/projects/keyzen-light.png",
    previewDark: "/projects/keyzen.png",
  },
  {
    title: "taptickit",
    category: "Open Source · npm",
    description:
      "Haptic feedback for the mobile web with zero dependencies. React, Vue, Svelte, and vanilla APIs with presets like success, warning, selection, and impact-style taps via the Vibration API.",
    techstacks: ["TypeScript", "React", "Vue", "Svelte"],
    status: "active",
    link: "https://www.npmjs.com/package/taptickit",
    illustration: "taptickit",
  },
  {
    title: "Image Sonification",
    category: "Research Project",
    description: "Converts images to audio and vice versa by mapping pixel colour and position to audio frequencies.",
    techstacks: ["React", "TypeScript"],
    status: "active",
    link: "https://sonification.shiva.codes",
    preview: "/sonification-light.png",
    previewDark: "/sonification.png",
  },
];

export const hackathons = [
  {
    title: "WasteEasy",
    event: "Envision Hackathon",
    year: "2023",
    placement: "1st Place",
    college: "Assam Down Town University",
    description:
      "Built WasteEasy, a waste-management platform focused on correct segregation and easier disposal. Added AI-powered waste classification, location-aware discovery of nearby disposal points via maps, and a coupon-based incentive loop to reward responsible dumping behavior. The project won 1st place at Envision Hackathon and was later recognised as a unique tech startup at an IIM Shillong entrepreneurship event.",
    techstacks: ["React Native", "Node.js", "MongoDB", "Google Maps API"],
    link: "https://github.com/ShivaBhattacharjee/WasteEasy",
  },
  {
    title: "Smart Parking for Guwahati",
    event: "Technophilia 2023",
    year: "2023",
    placement: "1st Place",
    college: "Assam Royal Global University",
    description:
      "Built a Google Maps-style smart parking platform for Guwahati where users can discover nearby parking spots, calculate the shortest route to available locations, and make faster parking decisions in busy areas. Added community-driven features like ratings, written reviews, on-ground image uploads, and complaint reporting to flag incorrect info or local issues. The crowdsourced data model kept listings fresh and practical, helping the project win 1st prize at Technophilia.",
    techstacks: ["React", "Node.js", "MongoDB", "Google Maps API"],
  },
  {
    title: "MediTrack Attendance",
    event: "Hack GCU",
    year: "2024",
    placement: "2nd Place",
    college: "Girijananda Chowdhury University",
    description:
      "Built a medical attendance system in a 20-hour sprint to digitize attendance for healthcare staff and trainees. Implemented rapid check-in flows, role-based records, and basic reporting to reduce manual entry and improve shift-level visibility. The speed of execution and practical utility secured 2nd prize at Hack GCU.",
    techstacks: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    title: "Campus Safety App",
    event: "Code War 5.0 Hackathon",
    year: "2024",
    placement: "2nd Place",
    college: "Assam Engineering College",
    description:
      "Secured 2nd position at Code War 5.0 by building a campus safety app that enabled incident reporting, location-aware alerts, and faster coordination during emergencies. Built with Next.js 14, Google Maps API, serverless functions, and Socket.IO for real-time updates and communication.",
    techstacks: ["Next.js 14", "Google Maps API", "Serverless Functions", "Socket.IO"],
  },
  {
    title: "Real-time Space Data Terminal",
    event: "Frint Hackathon",
    year: "2025",
    placement: "3rd Place",
    college: "Assam Down Town University",
    description:
      "Won 3rd position by building a live space intelligence dashboard that combined Mars weather updates, an ISS live tracker, near-Earth asteroid monitoring, and NASA's Astronomy Picture of the Day in one terminal-style interface. Built with Next.js, Three.js, and NASA Open APIs with real-time data refresh and interactive visual rendering.",
    techstacks: ["Next.js", "Three.js", "NASA Open APIs"],
  },
  {
    title: "Smart India Hackathon",
    event: "SIH 2023",
    year: "2023",
    placement: "Qualifier",
    college: " Visvesvaraya Technological University ",
    description:
      "Qualified for SIH 2023 in my very first semester of college. Figured it out on the fly and made it through the national rounds.",
    techstacks: ["React", "Node.js", "Express", "MongoDB"],
  },
  {
    title: "Lending on Blockchain",
    event: "Rise In Bounty",
    year: "2023",
    placement: "Bounty Winner",
    college: "Assam Royal Global University",
    description:
      "Built a decentralised loan management app on Ethereum where users can issue loans, receive loans, repay dues, and flag defaults, all with transparent on-chain records. The protocol was designed around trust-minimised lending and on-chain credit history creation without traditional intermediaries, which earned a Rise In bounty.",
    techstacks: ["Solidity", "Ethereum", "React", "Hardhat", "Web3.js"],
    link: "https://github.com/ShivaBhattacharjee/lending-blockchain",
  },
];

export const research = [
  {
    title: "PolySpeech-HS: Multilingual Non-Autoregressive Text-to-Speech Synthesis with Hidden-State Adapters",
    category: "Speech Synthesis & Multilingual AI",
    description: "A non-autoregressive text-to-speech (TTS) multilingual synthesis framework designed to address the linguistic diversity and real-time deployment challenges of Indian languages. By deploying a unified encoder-decoder architecture paired with lightweight hidden-state adapters, PolySpeech-HS enables efficient cross-lingual generalization while preserving language-specific prosodic nuances. Achieved state-of-the-art performance with MOS of 4.30, MCD of 4.7 dB, and RTF of 0.13 across six Indian languages.",
    techstacks: ["TTS", "Non-Autoregressive", "Hidden-State Adapters", "Multilingual AI", "Indian Languages", "AMO-HSA"],
    status: "under-review",
    link: "#",
    journal: "IEEE Transactions on Audio, Speech and Language Processing",
    year: "2025",
    collaboration: "Vellore Institute of Technology"
  },
  {
    title: "A Novel Data-Centric Transformer Fine-Tuning: A Modular Framework for Rapid Domain Adaptation and Deployment",
    category: "Large Language Models & Domain Adaptation",
    description: "A data-centric, hardware-light workflow for fine-tuning transformers that sidesteps costly LLM APIs. Automatically scrapes high-signal web content and converts it into Q&A pairs to fine-tune a GPT-2-Medium model (355M parameters) in ~7 minutes on a single RTX-3060. Achieves 67.3% accuracy (+34% over base model) with 1.4s median latency and zero inference cost.",
    techstacks: ["GPT-2", "LoRA", "8-bit Adam", "Domain Adaptation", "Next.js", "Q&A Generation", "Fine-tuning"],
    status: "under-review",
    link: "#",
    journal: "IEEE Transactions on Computational Social Systems",
    year: "2025",
    collaboration: "Vellore Institute of Technology"
  },
  {
    title: "Fine-Tuning Mistral 22B: The First Large Language Model for Assamese Language Tasks",
    category: "Low-Resource Language Processing",
    description: "The first fine-tuned Large Language Model specifically engineered for Assamese, a low-resource Indo-Aryan language spoken by approximately 15 million individuals. Introduces AssamText-750K dataset and custom Unicode mapping system exclusively for Assamese. This pioneering work becomes the first and only Assamese LLM backed by language-specific Unicode infrastructure, achieving 20% average improvement across text generation fluency, sentiment analysis accuracy, and Assamese-to-English translation quality.",
    techstacks: ["Mistral 22B", "LoRA", "Unicode Mapping", "Assamese NLP", "Low-Resource Languages", "AssamText-750K"],
    status: "under-review",
    link: "#",
    journal: "IEEE Transactions on Neural Networks and Learning Systems",
    year: "2025",
    collaboration: "Vellore Institute of Technology"
  }
];

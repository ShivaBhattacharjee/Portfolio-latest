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
    path: "/research",
    name: "Research",
  },
];

export const notableAchievements = [
  {
    title: "Smart India Hackathon",
    body: "Made it to SIH 2023 in my very first semester of college. Didn't really know what I was doing but figured it out.",
  },
  {
    title: "Hackathons",
    body: "Won 5 hackathons, mostly building AI stuff. WasteEasy was probably the one I'm proudest of, it rewards people for dumping waste responsibly. Took home Rs. 30,000 from ADTU and got called out as a unique tech startup at an IIM Shillong entrepreneurship event.",
    link: "https://github.com/ShivaBhattacharjee/WasteEasy",
    linkLabel: "WasteEasy on GitHub",
  },
  {
    title: "Rise In bounty",
    body: "Got a bounty from Rise In for a project that lets people lend money on Ethereum and build an actual credit score on-chain. No banks, just smart contracts.",
    link: "https://github.com/ShivaBhattacharjee/lending-blockchain",
    linkLabel: "lending-blockchain on GitHub",
  },
  {
    title: "In the news",
    body: "Got featured in a national newspaper for building a fine-tuned LLM on the Assamese language, one of the first of its kind for a low-resource Indian language.",
  },
  {
    title: "Side project at scale",
    body: "Built AnimeTrix, an anime streaming site, hit around 1,500 users and was handling 100 concurrent viewers at peak using web scraping and some creative infra decisions. Had to take it down after a DMCA. The repo still has ~190 stars.",
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
    location: "Remote",
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
    title: "Image Sonification",
    category: "Research Project",
    description: "Converts images to audio and vice versa by mapping pixel colour and position to audio frequencies.",
    techstacks: ["React", "TypeScript"],
    status: "active",
    link: "https://sonification.shiva.codes",
    preview: "/Sonification.png",
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

export interface Education {
  degree: string;
  institution: string;
  university: string;
  year: number;
  location: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  startYear: number;
  endYear: number | null;
  highlights: string[];
}

export interface Skill {
  name: string;
  level: 'expert' | 'advanced' | 'proficient' | 'intermediate';
  years?: number;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

export const personalInfo = {
  name: 'John Doe',
  title: 'Senior AI/ML Architect & Principal AI Scientist',
  email: 'john.doe@example.com',
  github: 'https://github.com/johndoe-ai',
  linkedin: 'https://linkedin.com/in/johndoe',
  location: 'Hyderabad, India',
  bio: `Visionary AI/ML Architect with 25+ years designing production-scale intelligent systems.
I specialize in LLM orchestration, agentic workflow architectures, and distributed ML infrastructure.
Deep open-source contributor to LangChain, LlamaIndex, and Hugging Face Transformers.`,
  longBio: `With over 25 years at the bleeding edge of artificial intelligence and machine learning,
I've had the privilege of witnessing — and shaping — the evolution from early statistical models
to today's remarkable large language model ecosystems.

My journey began at IIT Hyderabad, where I developed a deep fascination with the mathematics
of uncertainty. From my first role at TCS building data pipelines, through leading AI labs at
Infosys, to architecting enterprise LLM platforms at TechVision AI, I've always been driven by
one question: how do we make machines genuinely useful?

Today, I focus on agentic AI systems — orchestrating multiple AI agents to tackle complex,
multi-step real-world problems. I've contributed thousands of lines to open-source projects
that power AI applications worldwide, and I mentor the next generation of ML engineers.`,
  profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
};

export const stats: Stat[] = [
  { label: 'Years Experience', value: '25', suffix: '+' },
  { label: 'Projects Shipped', value: '80', suffix: '+' },
  { label: 'Open Source PRs', value: '150', suffix: '+' },
  { label: 'Patents Filed', value: '3' },
];

export const education: Education[] = [
  {
    degree: 'M.Tech in Information Technology',
    institution: 'IIT Hyderabad',
    university: 'IIT Hyderabad',
    year: 2001,
    location: 'Hyderabad, India',
  },
  {
    degree: 'M.Sc in Electronics',
    institution: 'School of Physics, University of Hyderabad',
    university: 'University of Hyderabad',
    year: 1999,
    location: 'Hyderabad, India',
  },
  {
    degree: 'B.Sc in Mathematics, Physics & Chemistry',
    institution: 'Osmania University College of Science',
    university: 'Osmania University',
    year: 1996,
    location: 'Hyderabad, India',
  },
  {
    degree: 'Intermediate (MPC)',
    institution: 'Narayana Junior College',
    university: 'Board of Intermediate Education, Telangana',
    year: 1993,
    location: 'Hyderabad, India',
  },
  {
    degree: 'SSC (Class X)',
    institution: 'Kendriya Vidyalaya No. 1',
    university: 'CBSE',
    year: 1991,
    location: 'Hyderabad, India',
  },
];

export const experience: Experience[] = [
  {
    title: 'Senior AI/ML Architect & Principal AI Scientist',
    company: 'TechVision AI',
    location: 'Hyderabad, India',
    period: '2018 – Present',
    startYear: 2018,
    endYear: null,
    highlights: [
      'Architected multi-agent LLM platform processing 50M+ requests/day for Fortune 500 clients',
      'Pioneered agentic workflow systems using LangChain & CrewAI, cutting pipeline work by 70%',
      'Open-source contributor to LangChain, LlamaIndex, CrewAI — 150+ merged PRs',
      'Built proprietary RAG infrastructure serving 200+ enterprise clients',
      'Led 25-person cross-functional team of ML engineers, data scientists & MLOps specialists',
      'Filed 3 patents in AI-assisted document understanding and multi-modal reasoning',
    ],
  },
  {
    title: 'Lead AI Engineer & ML Architect',
    company: 'Infosys AI Lab',
    location: 'Bangalore, India',
    period: '2012 – 2018',
    startYear: 2012,
    endYear: 2018,
    highlights: [
      'Led NLP fraud detection system for top-5 Indian bank, saving ₹120 crore annually',
      'Architected scalable ML inference platform (Kubernetes + TF Serving), 1000+ model deployments',
      'Introduced BERT/GPT-2 to production 18 months before industry mainstream',
      'Mentored 40+ engineers; built internal AI upskilling curriculum across 3 global centers',
      'Designed AutoML platform reducing model development time from weeks to days',
    ],
  },
  {
    title: 'Senior Machine Learning Engineer',
    company: 'Wipro Technologies',
    location: 'Hyderabad, India',
    period: '2007 – 2012',
    startYear: 2007,
    endYear: 2012,
    highlights: [
      'Built recommendation engines for 100M+ user e-commerce platform; +34% click-through rate',
      'Deployed distributed deep learning training pipelines on GPU clusters',
      'Developed computer vision quality inspection for automotive manufacturing clients',
      'Migrated Hadoop MapReduce → Apache Spark, achieving 6× throughput improvement',
    ],
  },
  {
    title: 'Machine Learning Engineer',
    company: 'Satyam Computer Services',
    location: 'Hyderabad, India',
    period: '2004 – 2007',
    startYear: 2004,
    endYear: 2007,
    highlights: [
      'Developed statistical NLP models for document classification and information extraction',
      'Built predictive analytics for supply chain optimization across 12 manufacturing clients',
      'Created unsupervised anomaly detection systems for network security',
      'Co-authored 4 internal papers on applied Bayesian inference in industrial settings',
    ],
  },
  {
    title: 'Software Engineer (ML Track)',
    company: 'Tata Consultancy Services',
    location: 'Hyderabad, India',
    period: '2001 – 2004',
    startYear: 2001,
    endYear: 2004,
    highlights: [
      'Built data preprocessing pipelines and feature engineering frameworks in Python',
      'Developed probabilistic models for customer churn prediction in telecom',
      'Contributed to research on support vector machines and kernel methods',
      'Participated in TCS flagship AI research program on statistical learning theory',
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    category: 'Languages',
    icon: '⌨️',
    skills: [
      { name: 'Python', level: 'expert', years: 20 },
      { name: 'JavaScript', level: 'advanced', years: 12 },
      { name: 'Node.js', level: 'advanced', years: 10 },
      { name: 'SQL', level: 'advanced', years: 18 },
      { name: 'Bash', level: 'proficient', years: 15 },
      { name: 'Go', level: 'intermediate', years: 4 },
      { name: 'R', level: 'proficient', years: 8 },
    ],
  },
  {
    category: 'AI / ML Frameworks',
    icon: '🧠',
    skills: [
      { name: 'PyTorch', level: 'expert', years: 7 },
      { name: 'TensorFlow', level: 'expert', years: 9 },
      { name: 'LangChain', level: 'expert', years: 3 },
      { name: 'LlamaIndex', level: 'expert', years: 2 },
      { name: 'Hugging Face', level: 'expert', years: 5 },
      { name: 'CrewAI', level: 'advanced', years: 2 },
      { name: 'FastAPI', level: 'expert', years: 4 },
      { name: 'scikit-learn', level: 'expert', years: 12 },
      { name: 'XGBoost', level: 'advanced', years: 7 },
    ],
  },
  {
    category: 'Cloud & Infrastructure',
    icon: '☁️',
    skills: [
      { name: 'AWS', level: 'expert', years: 10 },
      { name: 'GCP', level: 'advanced', years: 7 },
      { name: 'Kubernetes', level: 'advanced', years: 8 },
      { name: 'Docker', level: 'expert', years: 10 },
      { name: 'Terraform', level: 'proficient', years: 5 },
      { name: 'Apache Kafka', level: 'advanced', years: 6 },
    ],
  },
  {
    category: 'MLOps & Tools',
    icon: '🔧',
    skills: [
      { name: 'MLflow', level: 'expert', years: 5 },
      { name: 'Apache Airflow', level: 'advanced', years: 7 },
      { name: 'Prometheus', level: 'proficient', years: 5 },
      { name: 'Grafana', level: 'proficient', years: 5 },
      { name: 'Weights & Biases', level: 'advanced', years: 3 },
      { name: 'DVC', level: 'proficient', years: 3 },
    ],
  },
  {
    category: 'Specialized AI',
    icon: '🤖',
    skills: [
      { name: 'LLM Orchestration', level: 'expert' },
      { name: 'RAG Architecture', level: 'expert' },
      { name: 'Agentic AI Systems', level: 'expert' },
      { name: 'Prompt Engineering', level: 'expert' },
      { name: 'RLHF / Fine-tuning', level: 'advanced' },
      { name: 'Multi-modal AI', level: 'advanced' },
      { name: 'Computer Vision', level: 'advanced' },
      { name: 'NLP', level: 'expert' },
    ],
  },
];

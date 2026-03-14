export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  githubUrl: string;
  articleSlug: string;
  image: string;
  tags: string[];
  stars: string;
  featured: boolean;
  category: string;
  myContributions: string[];
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'langchain',
    title: 'LangChain',
    shortDescription: 'Framework for building LLM-powered applications with chains, agents, and memory.',
    description:
      'LangChain is the foundational framework for building context-aware reasoning applications powered by language models. It provides a modular architecture for chains, agents, retrieval systems, and memory — enabling developers to connect LLMs to real-world data sources and tools.',
    githubUrl: 'https://github.com/langchain-ai/langchain',
    articleSlug: 'langchain-agentic-architectures',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop',
    tags: ['Python', 'LLM', 'Agents', 'RAG', 'Memory'],
    stars: '96k+',
    featured: true,
    category: 'LLM Framework',
    myContributions: [
      'Designed and merged the streaming callback handler architecture',
      'Contributed multi-step agent executor optimizations reducing latency by 40%',
      'Added structured output parsing for enterprise document workflows',
      'Reviewed and merged 30+ community PRs on retrieval chain improvements',
    ],
  },
  {
    id: '2',
    slug: 'llamaindex',
    title: 'LlamaIndex',
    shortDescription: 'Data framework for LLM applications — indexing, retrieval, and query over your data.',
    description:
      'LlamaIndex (formerly GPT Index) is a data framework for building LLM applications over custom data. It provides advanced data ingestion connectors, indexing strategies, and retrieval algorithms that enable production-grade RAG systems with superior context quality.',
    githubUrl: 'https://github.com/run-llama/llama_index',
    articleSlug: 'llamaindex-enterprise-rag',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop',
    tags: ['Python', 'RAG', 'Indexing', 'Vector DB', 'LLM'],
    stars: '37k+',
    featured: true,
    category: 'RAG Framework',
    myContributions: [
      'Built the hierarchical document chunking strategy that became the default',
      'Optimized hybrid search combining BM25 + vector retrieval',
      'Contributed the recursive retriever pattern for complex query decomposition',
      'Authored documentation for the enterprise deployment guide',
    ],
  },
  {
    id: '3',
    slug: 'crewai',
    title: 'CrewAI',
    shortDescription: 'Multi-agent orchestration framework for role-based collaborative AI workflows.',
    description:
      'CrewAI enables multiple AI agents to work together as a crew, each with specialized roles, goals, and tools. It models collaborative intelligence — agents plan, delegate, and synthesize results to tackle complex multi-step tasks that exceed single-agent capabilities.',
    githubUrl: 'https://github.com/crewAIInc/crewAI',
    articleSlug: 'crewai-multi-agent-orchestration',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&h=450&fit=crop',
    tags: ['Python', 'Multi-Agent', 'Orchestration', 'LLM', 'Workflow'],
    stars: '25k+',
    featured: true,
    category: 'Agent Framework',
    myContributions: [
      'Designed the hierarchical crew process with dynamic task delegation',
      'Built enterprise-grade error recovery and agent retry mechanisms',
      'Contributed the tool-calling abstraction layer for LLM-agnostic agent tools',
      'Implemented asynchronous crew execution for parallel agent workflows',
    ],
  },
  {
    id: '4',
    slug: 'transformers',
    title: 'Hugging Face Transformers',
    shortDescription: 'The go-to library for state-of-the-art NLP, vision, and multimodal models.',
    description:
      'Hugging Face Transformers provides thousands of pre-trained models for NLP, computer vision, audio, and multimodal tasks. It democratizes access to state-of-the-art architectures like BERT, GPT, T5, LLaMA, and Mistral — enabling research and production deployment with a unified API.',
    githubUrl: 'https://github.com/huggingface/transformers',
    articleSlug: 'transformers-fine-tuning-at-scale',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=450&fit=crop',
    tags: ['Python', 'PyTorch', 'NLP', 'Fine-tuning', 'LoRA'],
    stars: '138k+',
    featured: false,
    category: 'ML Library',
    myContributions: [
      'Contributed LoRA fine-tuning helpers for efficient model adaptation',
      'Optimized tokenizer batching for high-throughput production inference',
      'Added enterprise deployment patterns to the documentation',
      'Fixed critical memory leak in gradient checkpointing for long sequences',
    ],
  },
  {
    id: '5',
    slug: 'autogpt',
    title: 'AutoGPT',
    shortDescription: 'Autonomous AI agent platform for self-directed multi-step task completion.',
    description:
      'AutoGPT is one of the earliest autonomous AI agent frameworks, enabling GPT models to self-direct complex tasks by breaking goals into sub-tasks, using tools, browsing the web, writing and executing code, and storing information in long-term memory — with minimal human oversight.',
    githubUrl: 'https://github.com/Significant-Gravitas/AutoGPT',
    articleSlug: 'autogpt-autonomous-task-agents',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop',
    tags: ['Python', 'Autonomous', 'Agent', 'GPT-4', 'Tools'],
    stars: '171k+',
    featured: false,
    category: 'Autonomous Agent',
    myContributions: [
      'Designed the plugin architecture for extensible tool integration',
      'Built robust task planning with goal decomposition and sub-goal tracking',
      'Contributed memory management with semantic deduplication',
      'Improved stability of long-running autonomous execution loops',
    ],
  },
  {
    id: '6',
    slug: 'fastapi',
    title: 'FastAPI',
    shortDescription: 'High-performance Python web framework ideal for ML model serving APIs.',
    description:
      'FastAPI is a modern, fast Python web framework built on Pydantic and Starlette. Its automatic OpenAPI documentation, async support, and type-safety make it the industry standard for serving ML models, building inference APIs, and creating real-time AI application backends.',
    githubUrl: 'https://github.com/tiangolo/fastapi',
    articleSlug: 'fastapi-ml-inference-apis',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop',
    tags: ['Python', 'API', 'Async', 'Pydantic', 'OpenAPI'],
    stars: '79k+',
    featured: false,
    category: 'API Framework',
    myContributions: [
      'Contributed background task patterns for async ML inference workflows',
      'Built streaming response utilities for LLM token streaming endpoints',
      'Added middleware examples for ML model request validation',
      'Authored the ML deployment guide in the official documentation',
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

/* js/data.js */

const SKILLS_DATA = {
  programming: {
    title: 'Programming Languages',
    icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`,
    skills: ['C/C++', 'Python', 'JavaScript', 'SQL']
  },
  mldl: {
    title: 'Machine & Deep Learning',
    icon: `<svg viewBox="0 0 24 24"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44a.99.99 0 0 1-.94 0l-7.9-4.44A1.01 1.01 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.3-.17.64-.17.94 0l7.9 4.44c.32.17.53.5.53.88v9zM12 4.15L5.04 8.06 12 11.96l6.96-3.9L12 4.15z"/></svg>`,
    skills: ['Machine Learning', 'Deep Learning', 'CNN', 'RNN', 'LSTM', 'Transformers', 'GANs']
  },
  libraries: {
    title: 'Libraries & Frameworks',
    icon: `<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>`,
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'scikit-learn', 'TensorFlow', 'PyTorch', 'Hugging Face']
  },
  tools: {
    title: 'Tools & DevOps',
    icon: `<svg viewBox="0 0 24 24"><path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.3C.5 6.7.9 9.8 2.9 11.8c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.6z"/></svg>`,
    skills: ['Flask', 'Streamlit', 'React', 'FastAPI', 'MLflow', 'Docker', 'Airflow', 'DVC', 'Git', 'GitHub', 'MySQL']
  }
};

const EXPERIENCE_DATA = [
  {
    date: '2025 - Present',
    title: 'Technical Leadership & Project Lead',
    subtitle: 'IIIT Bhopal Academic Initiatives',
    body: 'Led teams in designing, training, and integrating machine learning capabilities into student projects. Oversaw the architectural design of full-stack services and coordinated code reviews and scrum practices.'
  },
  {
    date: '2024 - 2025',
    title: 'Mentorship & Deployment Pipelines',
    subtitle: 'Open Source & Collaborative Projects',
    body: 'Mentored junior developers on software development life cycle processes, focusing on Python optimization, clean coding practices, and creating robust deployment pipelines with Git, Docker, and GitHub Actions.'
  },
  {
    date: '2023 - 2024',
    title: 'Sports Leadership & Extracurriculars',
    subtitle: 'IIIT Bhopal Sports Club',
    body: 'Selected for National Sports Organisation (NSO) Table Tennis team. Runner-up in the annual college cricket championship, demonstrating team leadership, coordination, and resilience under pressure.'
  }
];

const EDUCATION_DATA = {
  institute: 'IIIT Bhopal',
  degree: 'B.Tech in Electronics & Communication Engineering',
  duration: '2023 - 2027',
  cgpa: '7.41 / 10',
  courses: [
    'Data Structures & Algorithms',
    'Object-Oriented Programming',
    'Database Management Systems',
    'Applied Mathematics',
    'Signals & Systems',
    'Embedded Systems'
  ]
};

const ACHIEVEMENTS_DATA = [
  'Secured 95+ percentile in JEE Mains, placing in the top tier of nation-wide engineering aspirants.',
  'Solved over 200+ complex data structures and algorithm questions across LeetCode and CodeChef.',
  'Selected as a core organizing member for IIIT Bhopal technical events and workshops.',
  'Pioneered internal project tracking schemas for Machine Learning projects in student groups.'
];

// Unified structured project metadata schema. Keys match repository names exactly.
const PROJECTS_METADATA = {
  '-Portfolio_optimizer': {
    title: 'Portfolio Optimizer',
    description: 'An MLOps pipeline for financial portfolio allocation. Automates data ingestion, model validation, hyperparameter tuning, and CI/CD validation gates to maximize Sharpe ratios.',
    githubUrl: 'https://github.com/NITESH100LANKI/-Portfolio_optimizer',
    demoUrl: 'https://nitesh100lanki-portfoli-optimizer-appmain-aavzpx.streamlit.app/',
    featured: true,
    deployed: true,
    technologies: ['Python', 'MLflow', 'DVC', 'Docker', 'Airflow', 'Streamlit', 'scikit-learn'],
    category: 'mlops',
    keyResults: [
      'Automated dynamic asset model selection, increasing prediction accuracy by 15%',
      'Integrated DVC (Data Version Control) for tabular datasets and MLflow for hyperparameter tracking',
      'Configured CI/CD test coverage workflows with GitHub Actions and containerized deployments via Docker'
    ],
    icon: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>`,
    imageUrl: null
  },
  'customer-segmentation': {
    title: 'Consumer Segmentation System',
    description: 'An unsupervised machine learning pipeline clustering customer transactional behavior. Uses PCA and K-Means to identify distinct demographic profiles for targeted business marketing.',
    githubUrl: 'https://github.com/NITESH100LANKI/customer-segmentation',
    demoUrl: 'https://customer-segmentation-5mnczx3gdfyphfpzjwef5f.streamlit.app/',
    featured: true,
    deployed: true,
    technologies: ['Python', 'Streamlit', 'scikit-learn', 'PCA', 'K-Means', 'Pandas', 'Seaborn'],
    category: 'ai-ml',
    keyResults: [
      'Discovered 5 distinct client personas that improved marketing targeting efficiency by 20%',
      'Designed dynamic customer segmentation visuals and clusters mapped in a 3D interface',
      'Built a dashboard with Streamlit, enabling marketers to search segments and simulate marketing responses'
    ],
    icon: `<svg viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
    imageUrl: null
  },
  'Student-Health-Risk-Predictor': {
    title: 'Student Health Risk Predictor',
    description: 'A deep neural network diagnostics platform classifying medical risk metrics in students. Includes a secure patient dashboard for physical reports analysis and warnings.',
    githubUrl: 'https://github.com/NITESH100LANKI/Student-Health-Risk-Predictor',
    demoUrl: 'https://solankihealthriskpredictor.streamlit.app/',
    featured: true,
    deployed: true,
    technologies: ['React', 'Flask', 'TensorFlow', 'MySQL', 'Docker', 'JWT', 'Python'],
    category: 'full-stack',
    keyResults: [
      'Trained a custom classifier delivering 94% diagnostic accuracy on multidimensional parameters',
      'Developed a React front-end and a Flask back-end with JWT authorization tokens for strict medical privacy',
      'Implemented real-time reporting panels charting patient risk history and custom warnings'
    ],
    icon: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>`,
    imageUrl: null
  },
  'VoiceAgent-AI-Customer-Support': {
    title: 'VoiceAgent AI Customer Support',
    description: 'A low-latency conversational AI voice assistant powered by LLMs. Integrates speech recognition (STT) and voice synthesis (TTS) with autonomous search and calendar tool execution.',
    githubUrl: 'https://github.com/NITESH100LANKI/VoiceAgent-AI-Customer-Support',
    demoUrl: 'https://voiceagent-ai-customer-support-ype6epj6fplgrbvhyxbewd.streamlit.app/',
    featured: true,
    deployed: true,
    technologies: ['Python', 'FastAPI', 'LangChain', 'PyTorch', 'Hugging Face', 'Whisper STT', 'OpenAI API'],
    category: 'ai-ml',
    keyResults: [
      'Optimized audio streaming pipelines, achieving latency response rates under 800ms',
      'Implemented LangChain tool-calling agents allowing robust external calendar and calculator actions',
      'Developed responsive visual soundwave tracking UI elements for real-time speech feedback'
    ],
    icon: `<svg viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.42 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>`,
    imageUrl: null
  },
  'autostreamaiagent-': {
    title: 'Autostream AI Agent',
    description: 'An autonomous agent pipeline designed to automate video content streaming. Generates dynamic commentary, parses chat feeds, and manages live broadcast sessions using LLMs.',
    githubUrl: 'https://github.com/NITESH100LANKI/autostreamaiagent-',
    demoUrl: 'https://nitesh100lanki-autostreamaiagent--app-uhq6cg.streamlit.app/',
    featured: false,
    deployed: true,
    technologies: ['Python', 'Streamlit', 'LangChain', 'OpenAI API', 'ffmpeg'],
    category: 'ai-ml',
    keyResults: [
      'Engineered self-correcting video ingestion scripts optimizing stream bitrate parameters',
      'Configured LangChain autonomous scheduler parsing social live chats for interactive AI chat feedback'
    ],
    icon: `<svg viewBox="0 0 24 24"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 14H3V5h18v12zm-10-7l4 3-4 3v-6z"/></svg>`,
    imageUrl: null
  },
  'binance-futures-trading-bot': {
    title: 'Binance Futures Trading Bot',
    description: 'An algorithmic trading engine executing contracts on Binance Futures. Features real-time technical analysis (RSI, MACD), risk controls, and automated order placements.',
    githubUrl: 'https://github.com/NITESH100LANKI/binance-futures-trading-bot',
    demoUrl: 'https://nitesh100lanki-binance-futures-trading-bot-dashboard-7vywip.streamlit.app/',
    featured: false,
    deployed: true,
    technologies: ['Python', 'Streamlit', 'Binance API', 'pandas', 'TA-Lib'],
    category: 'ai-ml',
    keyResults: [
      'Designed multi-threaded risk calculator parsing margin sizes and automating stop-loss orders',
      'Built Streamlit trading panel plotting profit/loss curves and active leveraged positions'
    ],
    icon: `<svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/></svg>`,
    imageUrl: null
  },
  'task-4': {
    title: 'Predictive Modeling App (Task 4)',
    description: 'A predictive modeling application evaluating performance metrics. Implements linear models and charts variance changes dynamically across input dataset parameters.',
    githubUrl: 'https://github.com/NITESH100LANKI/task-4',
    demoUrl: 'https://task-4-dgvjtepgs3pynex7tfm9rn.streamlit.app/',
    featured: false,
    deployed: true,
    technologies: ['Python', 'Streamlit', 'scikit-learn', 'pandas', 'matplotlib'],
    category: 'ai-ml',
    keyResults: [
      'Constructed analytical regression charts mapping model errors across variable iterations',
      'Configured Streamlit data loader supporting immediate CSV uploads and feature updates'
    ],
    icon: `<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>`,
    imageUrl: null
  },
  'automated-outreach-pipeline': {
    title: 'Automated Outreach Pipeline',
    description: 'An automated outreach system supporting bulk email campaigns, queue scheduling, transactional mail logs, template formatting, and campaign analytics dashboards.',
    githubUrl: 'https://github.com/NITESH100LANKI/automated-outreach-pipeline',
    demoUrl: null,
    featured: false,
    deployed: false,
    technologies: ['TypeScript', 'Node.js', 'FastAPI', 'Redis', 'PostgreSQL'],
    category: 'full-stack',
    keyResults: [],
    icon: `<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    imageUrl: null
  },
  'eternal-attires': {
    title: 'Eternal Attires E-Commerce',
    description: 'A stylish e-commerce shopping platform for custom clothing. Features product collection filters, responsive item grids, customer cart storage, and mock checkout gateways.',
    githubUrl: 'https://github.com/NITESH100LANKI/eternal-attires',
    demoUrl: null,
    featured: false,
    deployed: false,
    technologies: ['JavaScript', 'HTML', 'CSS', 'Node.js', 'Express'],
    category: 'full-stack',
    keyResults: [],
    icon: `<svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>`,
    imageUrl: null
  },
  'Wedding_Decor': {
    title: 'Wedding Decor Planner',
    description: 'An interactive planning catalog and portfolio visualizer for wedding event decorators, enabling users to explore package structures, decorative options, and submit bookings.',
    githubUrl: 'https://github.com/NITESH100LANKI/Wedding_Decor',
    demoUrl: null,
    featured: false,
    deployed: false,
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'full-stack',
    keyResults: [],
    icon: `<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`,
    imageUrl: null
  }
};

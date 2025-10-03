
export const projects = [
    {
        slug: 'syncgalaxy',
        title: 'SyncGalaxy',
        tagline: 'A global creator & startup growth hub designed for mass collaboration.',
        imageUrl: '/images/sg.jpg',
        tags: ['Web Platform', 'Community', 'Development'],
        liveUrl: 'https://syncgalaxy.io/',
        
        heroTagline: 'Engineering a Decentralized Ecosystem for Global Creators',
        overview: {
            client: 'DevilsLab (Internal Flagship)',
            services: 'Full-Stack Development, UI/UX Design, Community Strategy',
            timeline: '8 Months',
            techStack: ['Next.js', 'Node.js', 'GSAP']
        },
        challenge: "The creator economy is fragmented, making it difficult for creators, developers, and startups to find, trust, and collaborate with each other, especially across borders.",
        solution: "We designed and built SyncGalaxy, a web platform that integrates a verified talent marketplace with a project collaboration hub to foster trust and incentivize community participation.",
        results: [
            "Successfully launched a scalable platform ready for user onboarding.",
            "Established a foundational model for rewarding community contributions in a Web3 ecosystem."
        ],
        quote: {
            text: "SyncGalaxy is the culmination of our vision to build interconnected digital realities.",
            author: "DevilsLab Founders"
        }
    },
    {
        slug: 'legal-lens-ai',
        title: 'Legal Lens AI',
        tagline: 'An AI-powered tool for intelligent legal document analysis and risk detection.',
        imageUrl: null,
        tags: ['AI', 'SaaS', 'Legal Tech'],
        liveUrl: null,

        heroTagline: 'Revolutionizing Legal Document Review with Artificial Intelligence',
        overview: {
            client: 'Corporate Law Firms',
            services: 'AI Model Development, UI/UX Design, SaaS Platform',
            timeline: '6 Months',
            techStack: ['Python', 'TensorFlow', 'React', 'AWS']
        },
        challenge: "Legal professionals spend countless hours manually reviewing complex contracts and documents, a process that is slow, expensive, and prone to human error.",
        solution: "We developed Legal Lens AI, a secure SaaS platform that uses Natural Language Processing (NLP) to scan, analyze, and summarize legal documents in seconds. The tool identifies key clauses, potential risks, and inconsistencies, presenting them in an easy-to-understand dashboard.",
        results: [
            "Reduced document review time by an average of 85% for our pilot clients.",
            "Improved accuracy in risk detection by 40% compared to manual review."
        ],
        quote: {
            text: "Legal Lens AI has become an indispensable tool for our team, allowing us to focus on high-value legal strategy instead of tedious paperwork.",
            author: "Partner at a Pilot Law Firm"
        }
    },
    {
        slug: 'data-whisperer',
        title: 'Data Whisperer',
        tagline: 'An AI analytics platform that turns business data into prioritized actions.',
        imageUrl: null,
        tags: ['AI', 'SaaS', 'Analytics'],
        liveUrl: null,
    
        heroTagline: 'From Insight to Action: AI-Powered Decision Intelligence',
        overview: {
            client: 'SMEs & Startups',
            services: 'AI Development, SaaS Platform, Data Analytics',
            timeline: '12 Months (MVP)',
            techStack: ['React', 'Python', 'XGBoost', 'Snowflake']
        },
        challenge: "Businesses are drowning in data but starving for clear next steps. Traditional BI tools show what happened but fail to answer 'What should we do now?', leaving non-technical teams with dashboards instead of outcomes.",
        solution: "Data Whisperer is an AI-native analytics platform that ingests data from multiple sources, uses NLP for plain-English queries, and provides prioritized, actionable recommendations. Its autopilot rules can even execute decisions, transforming analytics from a passive tool into an active growth engine.",
        results: [
            "Designed a 'Time to First Insight' of under 10 minutes from signup.",
            "Architected a prescriptive engine to rank recommendations by predicted business impact.",
            "Created a simulation module for what-if analysis on key business drivers."
        ],
        quote: {
            text: "Data Whisperer was conceived to close the gap between seeing a problem in the data and actually fixing it.",
            author: "Founder / CEO"
        }
    },
    {
        slug: 'marketsage-ai',
        title: 'MarketSage AI',
        tagline: 'An intelligent stock consultant agent providing actionable, personalized investment advice in plain English.',
        imageUrl: null,
        tags: ['AI', 'FinTech', 'SaaS', 'Investment'],
        liveUrl: null,

        heroTagline: 'Democratizing Stock Investing with AI-Powered Guidance',
        overview: {
            client: 'Retail Investors',
            services: 'AI Agent Development, API Integration, Simulation & Training',
            timeline: '9 Months (Concept to MVP)',
            techStack: ['Python', 'Pathway', 'Vector Search', 'React']
        },
        challenge: "Beginner and small investors are often overwhelmed by complex stock market data and lack access to affordable, personalized advice. Traditional platforms offer tools but little guidance, leading to high-risk decisions.",
        solution: "We are building MarketSage AI, an intelligent agent that provides clear buy/sell/hold suggestions by analyzing a user's portfolio against live stock data and market news sentiment. It includes a 30-minute simulated trading chat to educate users on strategies and risk management without risking real capital.",
        results: [
            "Developed a personalized recommendation engine based on user portfolio and risk tolerance.",
            "Integrated live stock data feeds and a vector search-driven news sentiment analysis pipeline.",
            "Designed an interactive, chat-based simulation for safe, hands-on user education."
        ],
        quote: {
            text: "MarketSage AI is designed to be a mentor, not just a tool. It empowers new investors with the knowledge and confidence to navigate the market wisely.",
            author: "Lead AI Developer, DevilsLab"
        }
    },
    {
        slug: 'sentiment-analysis-twitter-rnn',
        title: 'Sentiment Analysis on Twitter Data Using RNNs',
        tagline: 'An NLP project to automatically determine sentiment from tweets using Recurrent Neural Networks.',
        imageUrl: null,
        tags: ['NLP', 'AI', 'RNNs', 'Sentiment Analysis'],
        liveUrl: null,

        heroTagline: 'Uncovering Public Opinion with Deep Learning on Twitter Data',
        overview: {
            client: 'Internal Research & Development',
            services: 'NLP, Model Development, Data Analysis',
            timeline: '3 Months',
            techStack: ['Python', 'TensorFlow/Keras', 'LSTMs', 'Word2Vec']
        },
        challenge: "Twitter data is noisy, full of slang, and context-dependent, making it difficult for traditional models to accurately gauge public sentiment. Businesses and researchers need a reliable way to understand public mood in real-time.",
        solution: "We developed a sentiment analysis model using Recurrent Neural Networks (RNNs), specifically LSTMs, to process the sequential nature of language. The model was trained on a large dataset of labeled tweets to classify new, unseen tweets as positive, negative, or neutral, even when dealing with informal language.",
        results: [
            "Achieved a 74% accuracy in sentiment classification on a noisy airline passenger dataset, outperforming simpler models.",
            "Demonstrated the model's ability to handle context and long-term dependencies in text, crucial for understanding nuanced opinions.",
            "Built a framework for real-time sentiment tracking that can flag major events or shifts in public opinion based on tweet analysis."
        ],
        quote: {
            text: "This project proved that even with the noise of social media, RNNs can provide a clear and actionable signal of public sentiment at scale.",
            author: "Lead AI Researcher, DevilsLab"
        }
    }
];

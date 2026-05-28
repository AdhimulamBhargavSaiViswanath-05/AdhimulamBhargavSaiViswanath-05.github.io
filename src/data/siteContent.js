const assetModules = import.meta.glob('../../assets/*.{png,jpg,jpeg,svg,pdf}', {
  eager: true,
  import: 'default',
});

const asset = (name) => {
  const exactMatch = Object.entries(assetModules).find(([path]) => path.endsWith(`/${name}`));

  if (exactMatch) {
    return exactMatch[1];
  }

  const dotIndex = name.lastIndexOf('.');
  const stem = dotIndex === -1 ? name : name.slice(0, dotIndex);
  const extension = dotIndex === -1 ? '' : name.slice(dotIndex);

  const fallbackMatch = Object.entries(assetModules)
    .filter(([path]) => {
      const fileName = path.split('/').pop() || '';
      return fileName.startsWith(`${stem}-`) && fileName.endsWith(extension);
    })
    .sort((left, right) => (left[0].length - right[0].length))[0];

  if (fallbackMatch) {
    return fallbackMatch[1];
  }

  return `/assets/${name}`;
};

export const site = {
  name: 'Adhimulam Bhargav Sai Viswanath',
  initials: 'ABSV',
  tagline: 'Artificial Intelligence and Machine Learning student in Computer Science and Engineering, building useful systems with strong product polish.',
  role: 'Artificial Intelligence • Machine Learning • NLP • Cloud • UI Systems',
  resume: asset('resume.pdf'),
  profile: asset('profile.jpg'),
  email: 'bhargavsaiadhimulam12@gmail.com',
  phone: '+91 70138 33594',
  location: 'Tenali, Andhra Pradesh',
  links: {
    github: 'https://github.com/AdhimulamBhargavSaiViswanath-05',
    linkedin: 'https://www.linkedin.com/in/AdhimulamBhargavSaiViswanath',
    mailto: 'mailto:bhargavsaiadhimulam12@gmail.com',
    phone: 'tel:+91 70138 33594',
    maps: 'https://www.google.com/maps/place/Tenali'
  }
};

export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Proof', href: '#proof' },
  { label: 'Contact', href: '#contact' }
];

export const heroStats = [
  { value: '95%', label: 'OCR transliteration accuracy' },
  { value: '0.3s', label: 'timetable generation time' },
  { value: '0.96', label: 'bus prediction R² score' },
  { value: 'Top 7', label: 'SIH national WR placement' }
];

export const aboutPoints = [
  'Building AI and ML systems with an emphasis on clarity, speed, and practical outcomes.',
  'Hands-on experience across OCR pipelines, NLP preprocessing, optimization, and regression modeling.',
  'Comfortable shipping polished static experiences, supporting cloud deployment, and iterating on UI/UX details.'
];

export const skillGroups = [
  {
    id: 'aiml',
    label: 'AI / ML',
    description: 'Modeling, preprocessing, evaluation, and optimization.',
    progress: 88,
    items: ['Python', 'Scikit-learn', 'PyTorch', 'NLP', 'OCR', 'EDA', 'Regression', 'Optimization']
  },
  {
    id: 'dev',
    label: 'Languages / Dev',
    description: 'Implementation, scripting, and web foundations.',
    progress: 84,
    items: ['Java', 'Python', 'C', 'SQL', 'HTML', 'CSS', 'JavaScript', 'Git', 'GitHub']
  },
  {
    id: 'cloud',
    label: 'Cloud / DevOps',
    description: 'Deployment, Linux workflows, and basic infra fluency.',
    progress: 76,
    items: ['AWS', 'Linux', 'NGINX', 'GitHub Pages', 'RHCSA', 'Cloud Foundations']
  },
  {
    id: 'cs',
    label: 'Computer Science',
    description: 'Foundations that support reliable problem solving.',
    progress: 82,
    items: ['DSA', 'DBMS', 'Operating Systems', 'Computer Networks', 'OOP']
  }
];

export const projects = [
  {
    featured: true,
    title: 'LipiSathi: Offline Transliteration',
    summary: 'Offline multilingual transliteration for street signs using OCR, image processing, and deep learning pipelines.',
    impact: '~95% transliteration accuracy',
    role: 'Team Lead',
    image: asset('LipiSathi_Logo.png'),
    category: 'OCR • DL • NLP',
    links: [
      { label: 'GitHub', href: 'https://github.com/SIH-2025-Word-Weavers' }
    ],
    stack: ['OCR', 'Image Processing', 'NLP', 'Deep Learning', 'Multilingual']
  },
  {
    title: 'Automated AI Timetable Generation',
    summary: 'Constraint satisfaction timetable generator for academic scheduling with fast conflict-free output.',
    impact: '0.3–0.4s generation',
    role: 'Apps Developer',
    image: asset('NLP_Logo.png'),
    category: 'CSP • AI • Optimization',
    links: [
      { label: 'GitHub', href: 'https://github.com/AdhimulamBhargavSaiViswanath-05/TimeTableGeneration' },
      { label: 'Live Demo', href: 'https://tt.aihub-vvitu.social/' }
    ],
    stack: ['Constraint Satisfaction', 'Automation', 'AI', 'Scheduling']
  },
  {
    title: 'Custom NLP Stemming Engine',
    summary: 'Rule-based stemming engine using ordered linguistic transformations for preprocessing workflows.',
    impact: '~95% stemming accuracy',
    role: 'NLP Builder',
    image: asset('NLP_Logo.png'),
    category: 'NLP • Python • Preprocessing',
    links: [
      { label: 'GitHub', href: 'https://github.com/AdhimulamBhargavSaiViswanath-05/Custom_NLP_Stemming_Engine' }
    ],
    stack: ['NLP', 'Python', 'Tokenization', 'Stemming']
  },
  {
    title: 'Bus Service Prediction System',
    summary: 'Regression-driven bus demand and ticket pricing prediction using Random Forest and feature analysis.',
    impact: 'R² 0.96 model score',
    role: 'ML Developer',
    image: asset('Bus_Price_Prediction.png'),
    category: 'ML • Random Forest • Regression',
    links: [
      { label: 'GitHub', href: 'https://github.com/AdhimulamBhargavSaiViswanath-05/bus-traffic-price-prediction' }
    ],
    stack: ['Regression', 'Random Forest', 'Data Analysis', 'Prediction']
  },
  {
    title: 'Amazon Product Trend Analysis',
    summary: 'Scraped and analyzed marketplace data to identify pricing, reviews, and rating correlations.',
    impact: 'Trend and correlation insights',
    role: 'Data Analyst',
    image: asset('dataanalysisworkshop.png'),
    category: 'Web Scraping • EDA • Visualization',
    links: [
      { label: 'GitHub', href: 'https://github.com/AdhimulamBhargavSaiViswanath-05/AmazonWebScrapping' }
    ],
    stack: ['Web Scraping', 'EDA', 'Visualization', 'Analytics']
  }
];

export const experience = [
  {
    title: 'AWS Cloud Computing & DevOps Intern',
    org: 'APSSDC x AWS Academy',
    period: 'May 2026 - Present',
    logo: asset('awsnaipunyamapssdc.png'),
    details: [
      'Working on AWS Cloud Computing, Linux, and DevOps fundamentals through hands-on infrastructure tasks.',
      'Gaining practical exposure to EC2, SSH, NGINX configuration, and static deployment workflows.'
    ],
    links: [{ label: 'GitHub Journey', href: 'https://github.com/AdhimulamBhargavSaiViswanath-05/aws-devops-learning-journey' }]
  },
  {
    title: 'Apps Developer & Frontend Designer (UI/UX)',
    org: 'AI-HUB@VVIT',
    period: 'Jan 2025 - Present',
    logo: asset('aihublogo.png'),
    details: [
      'Founding member contributing to the growth of the AI-HUB platform from GitHub Pages to a custom-domain ecosystem.',
      'Developed and deployed the timetable generation system while contributing to UI/UX improvements.',
      'Collaborating with students, alumni, and peers across hackathons and continuous platform development.'
    ],
    links: [
      { label: 'Website', href: 'https://aihub-vvitu.social/' },
      { label: 'GitHub', href: 'https://aihub-vvit.github.io' }
    ]
  }
];

export const education = [
  {
    title: 'B.Tech - CSE (AI & ML)',
    org: 'Vasireddy Venkatadri Institute of Technology (VVIT)',
    period: '2023 - 2027',
    location: 'Namburu',
    result: 'CGPA: 8.36/10.0 (up to III-I)',
    logo: asset('VVIT_Logo.png')
  },
  {
    title: 'Intermediate - MPC',
    org: 'Sri Chaitanya Junior College (SCJC)',
    period: '2021 - 2023',
    location: 'Tenali',
    result: 'Marks: 939 / 1000',
    logo: asset('srichaitanya_clg_Logo.jpg')
  },
  {
    title: 'SSC (10th Class)',
    org: 'Viveka High School (VHS)',
    period: '2020 - 2021',
    location: 'Tenali',
    result: 'Marks: 600 / 600',
    logo: asset('Vivek_School_Logo.png')
  }
];

export const certifications = [
  {
    title: 'Remote Sensing & GIS - IIRS (ISRO) Summer School',
    issuer: 'IIRS / ISRO',
    period: '2021',
    note: 'Score: 131/140',
    logo: asset('isro_iirs_logo.png')
  },
  {
    title: 'Deep Learning Fundamentals',
    issuer: 'WorldQuant University',
    period: '2026',
    note: 'Applied neural network foundations',
    logo: asset('WorldQuantDL.png')
  },
  {
    title: 'AWS Academy Cloud Foundations',
    issuer: 'AWS Academy',
    period: '2026',
    note: 'Cloud and deployment fundamentals',
    logo: asset('aws.png')
  },
  {
    title: 'Generative AI',
    issuer: 'Google Cloud Skills Boost',
    period: '2024',
    note: 'L4G learning path',
    logo: asset('GoogleCloudSkillsProfile.png')
  },
  {
    title: 'Google Cloud Public Profile',
    issuer: 'Google Cloud',
    period: 'Live profile',
    note: 'Badges and public achievements',
    logo: asset('google_cloud_logo.jpeg'),
    href: 'https://www.skills.google/public_profiles/2cbd3849-023a-4f89-8be1-3de92341f097'
  },
  {
    title: 'Credly Badge Profile',
    issuer: 'Credly',
    period: 'Live profile',
    note: 'Credential showcase and badge history',
    logo: asset('Credly.png'),
    href: 'https://www.credly.com/users/bhargav-sai-viswanath-adhimulam/'
  }
];

export const achievements = [
  {
    title: 'Smart India Hackathon',
    summary: 'National WR 6, top 7 nationally; internal top 50/256+ in 2025.',
    image: asset('sih_logo.png')
  },
  {
    title: 'Hologram Project',
    summary: 'First Prize at the VVIT Science Exhibition in 2023.',
    image: asset('hologram_project.png')
  }
];

export const responsibility = {
  title: 'Class Representative (CR)',
  org: 'Dept. of CSM, VVIT',
  period: '2023 - Present',
  summary: 'Primary point of contact between faculty and students, supporting communication and coordination.',
  logo: asset('VVIT_SAC_Logo.jpg')
};

export const workshops = [
  {
    title: 'RHCSA Workshop',
    summary: 'Phase 1 and Phase 2 - VVIT x Red Hat (2025)',
    image: asset('rhcsa_logo.jpg')
  },
  {
    title: 'Data Analysis Using Python',
    summary: 'APSSDC, VVIT Google CodeLab (2024)',
    image: asset('dataanalysisworkshop.png')
  }
];

export const profiles = [
  {
    name: 'CodeChef',
    handle: 'vvit23bq1a4201',
    href: 'https://www.codechef.com/users/vvit23bq1a4201',
    logo: asset('codechef.png')
  },
  {
    name: 'HackerRank',
    handle: 'bhargavsai_2005',
    href: 'https://www.hackerrank.com/profile/bhargavsai_2005',
    logo: asset('hackerrank.png')
  },
  {
    name: 'Codeforces',
    handle: 'bhargavsai_2005',
    href: 'https://codeforces.com/profile/bhargavsai_2005',
    logo: asset('CodeForce.png')
  },
  {
    name: 'Smart Interviews',
    handle: 'bhargavsai_2005',
    href: 'https://hive.smartinterviews.in/profile/bhargavsai_2005',
    logo: asset('smartInterviews.png')
  }
];

export const mentorNotes = [
  {
    quote: 'If you do not like something, change it. If you cannot change it, change the way you think about it.',
    author: 'Adhimulam Bhargav Sai Viswanath',
    context: 'Self-reflection'
  },
  {
    quote: 'How much you need something, and how much interest or desire you have for it determines whether you will do it or not.',
    author: 'Dr. T. Kameswararao',
    context: 'Professor • B.Tech Counselor'
  },
  {
    quote: 'The journey from 0 to 1 takes the most time. Once 1 begins, growth becomes unstoppable.',
    author: 'K. Sai Ram',
    context: 'Professional mentor'
  },
  {
    quote: 'Build with purpose, learn with curiosity, and contribute with consistency. Recognition follows meaningful work.',
    author: 'Dr. M. Pardha Saradhi',
    context: 'Professor • Career Guide'
  }
];
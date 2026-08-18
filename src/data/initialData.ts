import {
  Campaign,
  Project,
  MaliRegion,
  ImpactStats,
  TransparencyReport,
  Story,
  NewsItem,
  GalleryItem,
  Partner,
  OrganizationSettings,
  DonationTransaction,
} from '../types/foundation';

// Strict instruction: Start with 0+ baseline stats that are fully editable via Admin Dashboard
export const initialImpactStats: ImpactStats = {
  beneficiariesCount: 0,
  projectsCount: 0,
  countriesCount: 3, // Mali, Burkina Faso, Niger
  volunteersCount: 0,
  waterWellsCount: 0,
  schoolsSupported: 0,
  healthClinicsSupported: 0,
  mealsDistributed: 0,
};

export const initialMaliRegions: MaliRegion[] = [
  {
    id: 'bamako',
    name: {
      ar: 'باماكو (العاصمة)',
      fr: 'Bamako (District Capitale)',
      en: 'Bamako (Capital District)',
    },
    description: {
      ar: 'مركز التنسيق والإدارة والخدمات الطبية المتقدمة والتعليم العالي في مالي على ضفاف نهر النيجر.',
      fr: 'Centre névralgique, administratif et universitaire au bord du fleuve Niger.',
      en: 'Administrative, academic and strategic hub on the banks of the Niger River.',
    },
    historicalContext: {
      ar: 'مدينة التلاقي الثقافي والنشاط التجاري الإقليمي لغرب إفريقيا.',
      fr: 'Carrefour d’échanges séculaires et pôle de développement régional.',
      en: 'Historic junction of commerce and West African cultural confluence.',
    },
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80',
    activeInitiativesCount: 4,
    coordinates: [12.6392, -8.0029],
  },
  {
    id: 'timbuktu',
    name: {
      ar: 'تمبكتو (مدينة الـ 333 ولياً)',
      fr: 'Tombouctou (La Mystique)',
      en: 'Timbuktu (City of 333 Saints)',
    },
    description: {
      ar: 'حاضرة العلم والمخطوطات التاريخية التي تحتاج لحماية تراثها ودعم مدارسها وتأمين المياه لريفها.',
      fr: 'Cité légendaire du savoir, berceau de manuscrits précieux et de résilience face au désert.',
      en: 'Legendary city of scholarship, historic manuscripts, and desert resilience.',
    },
    historicalContext: {
      ar: 'منارة إشعاع فكري في عصر إمبراطوريات مالي والصنغاي وجامعة سانكوري العريقة.',
      fr: 'Centre intellectuel majeur de l’Empire Songhaï et de la prestigieuse université Sankoré.',
      en: 'Major intellectual center of the Songhai Empire and ancient Sankore University.',
    },
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1000&q=80',
    activeInitiativesCount: 3,
    coordinates: [16.7666, -3.0026],
  },
  {
    id: 'gao',
    name: {
      ar: 'غاو (عاصمة إمبراطورية الصنغاي التاريخية)',
      fr: 'Gao (Cité historique des Askia)',
      en: 'Gao (Cradle of Askia Heritage)',
    },
    description: {
      ar: 'موطن الملك اسكيا العظيم ومركز حضاري عريق، تشهد أولوية كبرى لمشاريع محطات المياه النظيفة ودعم المدارس والمراكز الصحية.',
      fr: 'Berceau historique d’Askia le Grand, zone prioritaire en santé, éducation et accès à l’eau potable.',
      en: 'Historic heartland of King Askia the Great, priority area for solar water stations, schooling, and clinics.',
    },
    historicalContext: {
      ar: 'العاصمة التاريخية للإمبراطورية الصنغاوية ومركز الإدارة والعدالة في القرن الخامس عشر.',
      fr: 'Ancienne capitale de l’Empire Songhaï et haut lieu de justice et de commerce transsaharien.',
      en: 'Imperial capital of the Songhai Empire and 15th-century hub of justice and knowledge.',
    },
    image: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&w=1000&q=80',
    activeInitiativesCount: 5,
    coordinates: [16.2717, -0.0447],
  },
  {
    id: 'mopti',
    name: {
      ar: 'موبتي (فينيسيا مالي والتقاء الأنهار)',
      fr: 'Mopti (La Venise Malienne)',
      en: 'Mopti (The Venice of Mali)',
    },
    description: {
      ar: 'منطقة التقاء نهري النيجر وباني، نقطة محورية لبرامج الإغاثة الطارئة ودعم المجتمعات النازحة والزراعية.',
      fr: 'Carrefour fluvial stratégique au confluent du Niger et du Bani, foyer d’initiatives agricoles et d’urgence.',
      en: 'Strategic river confluence hub for emergency relief, displaced families, and artisanal fisheries.',
    },
    historicalContext: {
      ar: 'ميناء تجاري نابض وجسر ربط بين شمال وجنوب مالي وموئل للتعايش بين القوميات.',
      fr: 'Port fluvial animé et symbole de coexistence harmonieuse entre communautés sahéliennes.',
      en: 'Vibrant river port and historic bridge between Northern and Southern Mali.',
    },
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
    activeInitiativesCount: 4,
    coordinates: [14.4958, -4.1848],
  },
  {
    id: 'segou',
    name: {
      ar: 'سيغو (عاصمة مملكة بامبارا التاريخية)',
      fr: 'Ségou (Cité des Balanzans)',
      en: 'Ségou (Kingdom of Balanzan)',
    },
    description: {
      ar: 'قلب الزراعة المروية والصناعات الحرفية، تستهدف المؤسسة فيها دعم المدارس والتدريب المهني للمرأة والشباب.',
      fr: 'Bassin agricole et artisanal majeur, priorité à l’autonomisation féminine et l’éducation de base.',
      en: 'Major agricultural heartland, focus on vocational empowerment for women and community schools.',
    },
    historicalContext: {
      ar: 'عاصمة مملكة بامبارا التاريخية ومركز الفنون الفخارية والنسيج التقليدي (البوغولان).',
      fr: 'Capitale du Royaume Bambara et pôle réputé pour son artisanat textile Bogolan.',
      en: 'Historic Bambara kingdom capital, famous for Bogolan traditional mud-cloth artistry.',
    },
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1000&q=80',
    activeInitiativesCount: 3,
    coordinates: [13.4317, -6.2157],
  },
  {
    id: 'sikasso',
    name: {
      ar: 'سيكاسو (سلة غذاء مالي والجنوب الأخضر)',
      fr: 'Sikasso (Le Grenier Agricole)',
      en: 'Sikasso (Agricultural Granary)',
    },
    description: {
      ar: 'أكثر مناطق مالي وفرة زراعية، تركز البرامج على التغذية المدرسية ومراكز الرعاية الأولية في القرى النائية.',
      fr: 'Zone agricole fertile, focus sur la cantine scolaire et les dispensaires ruraux maternels.',
      en: 'Fertile southern region, prioritized for school nutrition programs and rural maternity clinics.',
    },
    historicalContext: {
      ar: 'عاصمة مملكة كندوجو وحصنها المنيع (تاتا سيكاسو) المقاوم للاستعمار.',
      fr: 'Haut lieu de résistance historique du Kénédougou et du célèbre Tata de Sikasso.',
      en: 'Historic citadel of the Kenedougou kingdom and the renowned Tata of Sikasso.',
    },
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80',
    activeInitiativesCount: 3,
    coordinates: [11.3176, -5.6665],
  },
  {
    id: 'kayes',
    name: {
      ar: 'كايس (مدينة الذهب والسكك الحديدية)',
      fr: 'Kayes (La Première Région)',
      en: 'Kayes (City of Rails & Gold)',
    },
    description: {
      ar: 'المنطقة الأولى في غرب مالي، ذات مناخ حار تتطلب مشاريع متقدمة لحفر الآبار العميقة بالطاقة الشمسية.',
      fr: 'Porte occidentale du Mali, région très aride nécessitant des forages solaires de grande profondeur.',
      en: 'Western gateway characterized by extreme heat, requiring deep solar-powered borehole networks.',
    },
    historicalContext: {
      ar: 'محطة رئيسية على خط سكة حديد داكار-النيجر ومركز شلالات فلو التاريخية.',
      fr: 'Nœud ferroviaire historique de la ligne Dakar-Niger et site des chutes de Félou.',
      en: 'Key historical terminal of the Dakar-Niger railway and site of Felou waterfalls.',
    },
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80',
    activeInitiativesCount: 2,
    coordinates: [14.4469, -11.4445],
  },
  {
    id: 'kidal',
    name: {
      ar: 'كيدال (قلب الصحراء الكبرى والشعب الطارقي)',
      fr: 'Kidal (L’Adrar des Ifoghas)',
      en: 'Kidal (The Saharan Heartland)',
    },
    description: {
      ar: 'منطقة صخرية صحراوية قاسية، نركز فيها على نقاط السقيا للمجتمعات الرعوية والقوافل الطبية الإنسانية المتنقلة.',
      fr: 'Zone désertique des Ifoghas, interventions d’urgence pour l’hydraulique pastorale et soins mobiles.',
      en: 'Remote desert highlands, targeted with pastoralist water points and mobile medical aid convoys.',
    },
    historicalContext: {
      ar: 'مهد الثقافة الطارقية وموسيقى الصحراء ورمز التعايش مع الطبيعة الصعبة.',
      fr: 'Berceau de la culture touarègue, des traditions poétiques et de la résilience saharienne.',
      en: 'Cradle of Tuareg culture, desert traditions, and enduring resilience.',
    },
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
    activeInitiativesCount: 2,
    coordinates: [18.4411, 1.4078],
  },
];

export const initialCampaigns: Campaign[] = [];

export const initialProjects: Project[] = [
  {
    id: 'proj-solar-well-timbuktu',
    title: {
      ar: 'مشروع مجمع سقيا اسكيا الشمسي في تمبكتو',
      fr: 'Station d’Adduction d’Eau Solaire de Tombouctou',
      en: 'Askia Solar Water Complex in Timbuktu',
    },
    description: {
      ar: 'حفر بئر ارتوازية بعمق 120 متراً مزودة بـ 24 لوحاً شمسياً وخزان سعة 30 متراً مكعباً وشبكة توزيع تخدم 3 قرى متجاورة.',
      fr: 'Forage profond de 120m avec 24 panneaux solaires, château d’eau de 30m³ et réseau de bornes fontaines pour 3 villages.',
      en: 'Deep 120m borehole powered by 24 solar panels with a 30m³ water tower and community distribution pipelines.',
    },
    sector: 'water',
    country: 'mali',
    locationName: 'تمبكتو - قرية كوريومي',
    status: 'in_progress',
    progressPercentage: 65,
    beneficiariesTarget: 4200,
    budgetUsd: 18500,
    spentUsd: 12000,
    startDate: '2026-01-15',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80',
    keyOutcomes: {
      ar: ['تأمين 20,000 لتر مياه نقية يومياً', 'تقليص مسافة جلب الماء من 6 كم إلى نقطة القرية', 'إنشاء حوض لسقيا الماشية ومزرعة نموذجية'],
      fr: ['20 000 litres d’eau potable par jour', 'Suppression de la corvée d’eau pour les femmes', 'Abreuvoir pour bétail et jardin maraîcher'],
      en: ['20,000 liters of pure water daily', 'Eliminated 6km water trek for women & children', 'Integrated livestock drinking trough'],
    },
  },
  {
    id: 'proj-school-gao',
    title: {
      ar: 'مشروع مدرسة الملك اسكيا النموذجية في غاو',
      fr: 'Complexe Scolaire Modèle Roi Askia à Gao',
      en: 'King Askia Model School Complex in Gao',
    },
    description: {
      ar: 'بناء 6 فصول دراسية نموذجية مقاومة للحرارة، مع مكتبة، مرافق صحية منفصلة، ومنظومة إنارة شمسية.',
      fr: 'Construction de 6 salles de classe bioclimatiques avec bibliothèque, blocs sanitaires et énergie solaire.',
      en: 'Construction of 6 bioclimatic classrooms, a library, sanitary blocks, and autonomous solar electricity.',
    },
    sector: 'education',
    country: 'mali',
    locationName: 'غاو - حي سوسو كويكوي',
    status: 'in_progress',
    progressPercentage: 40,
    beneficiariesTarget: 360,
    budgetUsd: 28000,
    spentUsd: 11200,
    startDate: '2026-02-01',
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1000&q=80',
    keyOutcomes: {
      ar: ['استيعاب 360 طالباً وطالبة', 'توفير وجبة فطور مدرسية يومية', 'تدريب 10 معلمين محليين'],
      fr: ['Scolarisation de 360 enfants', 'Repas chaud quotidien à la cantine', 'Formation de 10 enseignants locaux'],
      en: ['Enrolling 360 primary students', 'Daily school lunch program', 'Capacity building for 10 local teachers'],
    },
  },
  {
    id: 'proj-maternal-clinic-burkina',
    title: {
      ar: 'مشروع مركز الرعاية الصحية والأمومة في دوري',
      fr: 'Centre de Santé Maternelle Intégré à Dori',
      en: 'Integrated Maternal Health Clinic in Dori',
    },
    description: {
      ar: 'تأهيل وتجهيز جناح الولادة ورعاية الأطفال حديثي الولادة وتوفير الأدوية الأساسية مجاناً للأمهات المعوزات.',
      fr: 'Réhabilitation du bloc obstétrical et fourniture gratuite de soins d’urgence pour les parturientes.',
      en: 'Upgrading maternity and pediatric wards with essential neonatal diagnostic and delivery equipment.',
    },
    sector: 'health',
    country: 'burkina',
    locationName: 'دوري - إقليم الساحل',
    status: 'planned',
    progressPercentage: 15,
    beneficiariesTarget: 5000,
    budgetUsd: 22000,
    spentUsd: 3300,
    startDate: '2026-03-15',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80',
    keyOutcomes: {
      ar: ['خفض وفيات الأمهات والمواليد في 8 قرى', 'تقديم 1,200 استشارة طبية شهرية', 'توزيع مكملات غذائية للأطفال'],
      fr: ['Réduction de la mortalité maternelle', '1 200 consultations gratuites par mois', 'Distribution de suppléments nutritionnels'],
      en: ['Lowering neonatal mortality in 8 villages', '1,200 monthly free clinical consultations', 'Nutritional therapy packages'],
    },
  },
  {
    id: 'proj-water-niger-tillaberi',
    title: {
      ar: 'مشروع شبكة مياه الشرب النظيفة في تيلابيري',
      fr: 'Réseau d’Eau Potable Communautaire à Tillabéri',
      en: 'Community Clean Water Network in Tillabéri',
    },
    description: {
      ar: 'إنشاء شبكة أنابيب بطول 3.5 كم و4 نقاط توزيع عامة لتوفير مياه عذبة للمجتمعات الرعوية والزراعية.',
      fr: 'Extension de réseau d’adduction d’eau sur 3,5 km avec 4 bornes fontaines publiques.',
      en: '3.5 km pipeline network extension with 4 public water kiosks serving agropastoral communities.',
    },
    sector: 'water',
    country: 'niger',
    locationName: 'تيلابيري - قرية فيلنجي',
    status: 'completed',
    progressPercentage: 100,
    beneficiariesTarget: 3800,
    budgetUsd: 16000,
    spentUsd: 15900,
    startDate: '2025-08-10',
    completionDate: '2025-12-20',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1000&q=80',
    keyOutcomes: {
      ar: ['المشروع مكتمل ويعمل بكفاءة 100%', 'تراجع الأمراض المنقولة بالمياه بنسبة 80%', 'إدارة تشغيلية عبر لجنة محلية منتخبة'],
      fr: ['Projet 100% opérationnel', 'Chute de 80% des maladies hydriques', 'Gestion locale par comité villageois'],
      en: ['100% completed and fully active', '80% reduction in waterborne infections', 'Managed by local elected village committee'],
    },
  },
];

export const initialTransparencyReport: TransparencyReport = {
  year: 2025,
  totalDonationsReceivedUsd: 145000,
  totalDonationsSpentUsd: 138200,
  adminOverheadPercentage: 6.8, // Low overhead
  programExpenditurePercentage: 93.2,
  expenditureBySector: [
    { sector: 'water', percentage: 38, amountUsd: 52516 },
    { sector: 'education', percentage: 26, amountUsd: 35932 },
    { sector: 'health', percentage: 20, amountUsd: 27640 },
    { sector: 'relief', percentage: 16, amountUsd: 22112 },
  ],
  auditorName: 'Sahel Audit & Consulting / Cabinet International Agréé',
  auditStatus: 'certified',
};

export const initialStories: Story[] = [
  {
    id: 'story-fatima-gao',
    title: {
      ar: 'فاطمة تعود لمقاعد الدراسة في ريف غاو',
      fr: 'Fatima retrouve le chemin de l’école près de Gao',
      en: 'Fatima Returns to Her Classroom in Rural Gao',
    },
    excerpt: {
      ar: 'بعد أن كانت تقضي 4 ساعات يومياً في جلب الماء، تغيرت حياة الطفلة فاطمة (11 عاماً) بعد افتتاح بئر اسكيا الشمسي.',
      fr: 'Libérée de la corvée d’eau quotidienne, la jeune Fatima (11 ans) peut désormais poursuivre son rêve de devenir institutrice.',
      en: 'Relieved from a 4-hour daily water trek, 11-year-old Fatima can now focus on her studies and dream of becoming a teacher.',
    },
    content: {
      ar: 'كانت فاطمة تستيقظ قبل شروق الشمس مع والدتها للمشي لمسافات طويلة بحثاً عن الماء. بفضل حفر البئر الشمسي داخل القرية، استطاعت العودة لمدرستها بانتظام وحققت المركز الأول في صفها.',
      fr: 'Chaque matin avant l’aube, Fatima accompagnait sa mère à travers les sentiers arides. L’installation du forage solaire au cœur de son village a transformé son quotidien, lui permettant de réintégrer les bancs scolaires avec brio.',
      en: 'Before the solar borehole installation, Fatima spent her mornings walking desert trails with water buckets. Today, water flows steps from her home, and she is at the top of her primary school class.',
    },
    author: 'فريق التوثيق الميداني - مكتب غاو',
    location: 'غاو، مالي',
    date: '2026-02-18',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80',
    sector: 'water',
  },
  {
    id: 'story-ousmane-mopti',
    title: {
      ar: 'إعادة فتح مدرسة دجيناكا بعد ترميمها',
      fr: 'La renaissance de l’école de Djenaka à Mopti',
      en: 'Reopening of Djenaka Community School in Mopti',
    },
    excerpt: {
      ar: 'مائتا طفل يعودون لفصولهم الآمنة بعد اكتمال مشروع ترميم وتأثيث مدرستهم الريفية.',
      fr: 'Deux cents élèves réintègrent des salles sécurisées et équipées de panneaux solaires et de mobilier neuf.',
      en: 'Two hundred students celebrate entering bright, secure classrooms equipped with desks and solar lighting.',
    },
    content: {
      ar: 'كانت الفصول المتهالكة تمنع الأطفال من الدراسة في موسم الأمطار والحر الشديد. اليوم أصبحت المدرسة بيئة تعليمية متكاملة تمنح الأمل لجيل المستقبل.',
      fr: 'Les intempéries rendaient l’apprentissage impossible plusieurs mois par an. La rénovation complète offre désormais un cadre propice et sécurisé.',
      en: 'Weather extremes used to shut down classes. The full rehabilitation now provides a stable learning sanctuary all year round.',
    },
    author: 'قسم البرامج التعليمية',
    location: 'موبتي، مالي',
    date: '2026-01-28',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1000&q=80',
    sector: 'education',
  },
];

export const initialNews: NewsItem[] = [
  {
    id: 'news-launch-2026',
    title: {
      ar: 'مؤسسة الملك اسكيا الخيرية تطلق خطتها الاستراتيجية لدعم الساحل',
      fr: 'La Fondation Royale Askia dévoile son plan stratégique pour le Sahel',
      en: 'Askia Royal Charity Foundation Unveils Sahel Strategic Roadmap',
    },
    summary: {
      ar: 'إطلاق حزمة مبادرات مستدامة في مجالات المياه والتعليم والرعاية الصحية في مالي وبوركينا فاسو والنيجر.',
      fr: 'Lancement d’un portefeuille d’initiatives prioritaires en eau, éducation et santé.',
      en: 'Unveiling high-impact sustainable initiatives in clean water, education, and healthcare.',
    },
    content: {
      ar: 'أعلنت إدارة مؤسسة الملك اسكيا الخيرية عن بدء تنفيذ خطتها التنموية الشاملة التي تستهدف الوصول إلى أكثر من 50,000 مستفيد خلال العام الجاري عبر شراكات محلية ودولية موثوقة.',
      fr: 'La direction annonce le déploiement opérationnel de ses programmes visant 50 000 bénéficiaires avec un haut niveau de transparence et d’impact mesurable.',
      en: 'The executive board announced the deployment of integrated development programs targeting over 50,000 beneficiaries with radical transparency.',
    },
    publishedAt: '2026-02-15',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
    category: 'إعلان رسمي',
    country: 'mali',
    featured: true,
  },
  {
    id: 'news-water-initiative-gao',
    title: {
      ar: 'بدء الأعمال الميدانية لـ 5 آبار ارتوازية بالطاقة الشمسية في إقليم غاو',
      fr: 'Démarrage des forages solaires dans la région de Gao',
      en: 'Field Operations Begin for 5 Solar Boreholes in Gao Region',
    },
    summary: {
      ar: 'فرق العمل تبدأ الدراسات الهيدرولوجية وعمليات الحفر لتأمين مياه الشرب للقرى المستهدفة.',
      fr: 'Les équipes techniques entament les études hydrogéologiques et les forages de précision.',
      en: 'Technical teams initiate geophysical surveys and drilling across priority rural settlements.',
    },
    content: {
      ar: 'وصلت الآليات وفرق الحفر الميدانية إلى المواقع المحددة بالتنسيق مع اللجان الأهلية والسلطات المحلية لضمان استدامة المشاريع.',
      fr: 'Arrivée des équipements et mobilisation des comités villageois pour une gestion durable des points d’eau.',
      en: 'Heavy drilling machinery and field engineers arrived on site in close coordination with community leaders.',
    },
    publishedAt: '2026-02-02',
    image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=1000&q=80',
    category: 'مشاريع ميدانية',
    country: 'mali',
    featured: false,
  },
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: {
      ar: 'مياه نظيفة تنبض بالحياة في قرية كوريومي',
      fr: 'Inauguration du point d’eau à Korioumé',
      en: 'Pure Water Flowing in Korioumé Village',
    },
    type: 'image',
    url: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=400&q=80',
    sector: 'water',
    country: 'mali',
    location: 'تمبكتو',
  },
  {
    id: 'gal-2',
    title: {
      ar: 'أطفال في الفصل الدراسي الجديد بمدينة غاو',
      fr: 'Élèves dans leur nouvelle classe à Gao',
      en: 'Children Learning in New Classrooms in Gao',
    },
    type: 'image',
    url: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=400&q=80',
    sector: 'education',
    country: 'mali',
    location: 'غاو',
  },
  {
    id: 'gal-3',
    title: {
      ar: 'قافلة الرعاية الصحية والأدوية الأساسية في دوري',
      fr: 'Caravane médicale et soins à Dori',
      en: 'Mobile Healthcare Clinic in Dori',
    },
    type: 'image',
    url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80',
    sector: 'health',
    country: 'burkina',
    location: 'دوري',
  },
  {
    id: 'gal-4',
    title: {
      ar: 'توزيع الطرود الإغاثية للأسر في تيلابيري',
      fr: 'Distribution de vivres d’urgence à Tillabéri',
      en: 'Emergency Food Aid Distribution in Tillabéri',
    },
    type: 'image',
    url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=400&q=80',
    sector: 'relief',
    country: 'niger',
    location: 'تيلابيري',
  },
];

export const initialPartners: Partner[] = [
  {
    id: 'partner-sahel-dev',
    name: 'Sahel Sustainable Development Initiative',
    category: 'international_ngo',
    logoPlaceholderText: 'SSDI',
    country: 'Mali / Regional',
  },
  {
    id: 'partner-water-africa',
    name: 'Clean Water Alliance West Africa',
    category: 'international_ngo',
    logoPlaceholderText: 'CWA',
    country: 'West Africa',
  },
  {
    id: 'partner-education-trust',
    name: 'Sahelian Youth Education Foundation',
    category: 'corporate',
    logoPlaceholderText: 'SYEF',
    country: 'Burkina Faso',
  },
  {
    id: 'partner-health-convoys',
    name: 'Pan-African Health Relief Mission',
    category: 'un_agency',
    logoPlaceholderText: 'PAHRM',
    country: 'Niger',
  },
];

export const initialSettings: OrganizationSettings = {
  nameAr: 'مؤسسة الملك اسكيا الخيرية',
  nameFr: 'FONDATION ROYALE ASKIA',
  nameEn: 'ASKIA ROYAL CHARITY FOUNDATION',
  taglineAr: 'معاً نصنع أثراً... ونبني مستقبلاً أفضل',
  taglineFr: 'Ensemble, créons un impact durable et bâtissons un avenir meilleur',
  taglineEn: 'Together, we create lasting impact and build a brighter future',
  email: 'contact@askiafoundation.org',
  phone: '00249919980435',
  whatsapp: '00249919980435',
  addressBamako: 'باماكو، حي ACI 2000، جمهورية مالي',
  addressNiamey: 'نيامي، حي بلاتو، جمهورية النيجر',
  addressOuagadougou: 'واغادوغو، حي واغا 2000، بوركينا فاسو',
  facebookUrl: 'https://facebook.com/askiafoundation',
  instagramUrl: 'https://instagram.com/askiafoundation',
  youtubeUrl: 'https://youtube.com/askiafoundation',
  twitterUrl: 'https://x.com/askiafoundation',
  currencyRates: {
    USD: 1.0,
    EUR: 0.92,
    XOF: 605.0,
  },
  paymentGateways: {
    stripeEnabled: true,
    paypalEnabled: true,
    flutterwaveEnabled: true,
    paystackEnabled: true,
    orangeMoneyEnabled: true,
    waveEnabled: true,
    mockEnabled: true,
  },
};

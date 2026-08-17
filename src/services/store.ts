import {
  ImpactStats,
  Campaign,
  Project,
  MaliRegion,
  TransparencyReport,
  Story,
  NewsItem,
  GalleryItem,
  VolunteerApplication,
  Partner,
  OrganizationSettings,
  DonationTransaction,
  ProjectStatus,
} from '../types/foundation';

import {
  initialImpactStats,
  initialCampaigns,
  initialProjects,
  initialMaliRegions,
  initialTransparencyReport,
  initialStories,
  initialNews,
  initialGallery,
  initialPartners,
  initialSettings,
} from '../data/initialData';

class Store {
  private get<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(`askia_${key}`);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(`askia_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error('Storage write error:', e);
    }
  }

  // Impact Statistics
  getStats(): ImpactStats {
    return this.get<ImpactStats>('impact_stats', initialImpactStats);
  }

  getImpactStats(): ImpactStats {
    return this.getStats();
  }

  updateStats(stats: ImpactStats): void {
    this.set<ImpactStats>('impact_stats', stats);
  }

  updateImpactStats(stats: ImpactStats): void {
    this.updateStats(stats);
  }

  // Campaigns
  getCampaigns(): Campaign[] {
    return this.get<Campaign[]>('campaigns', initialCampaigns);
  }

  addCampaign(campaign: Campaign): void {
    const list = this.getCampaigns();
    list.unshift(campaign);
    this.set<Campaign[]>('campaigns', list);
  }

  saveCampaign(campaign: Campaign): void {
    const list = this.getCampaigns();
    const idx = list.findIndex((c) => c.id === campaign.id);
    if (idx >= 0) {
      list[idx] = campaign;
    } else {
      list.unshift(campaign);
    }
    this.set<Campaign[]>('campaigns', list);
  }

  deleteCampaign(id: string): void {
    const list = this.getCampaigns().filter((c) => c.id !== id);
    this.set<Campaign[]>('campaigns', list);
  }

  // Projects
  getProjects(): Project[] {
    return this.get<Project[]>('projects', initialProjects);
  }

  saveProject(project: Project): void {
    const list = this.getProjects();
    const idx = list.findIndex((p) => p.id === project.id);
    if (idx >= 0) {
      list[idx] = project;
    } else {
      list.unshift(project);
    }
    this.set<Project[]>('projects', list);
  }

  updateProjectStatus(id: string, status: ProjectStatus): void {
    const list = this.getProjects();
    const target = list.find((p) => p.id === id);
    if (target) {
      target.status = status;
      this.set<Project[]>('projects', list);
    }
  }

  deleteProject(id: string): void {
    const list = this.getProjects().filter((p) => p.id !== id);
    this.set<Project[]>('projects', list);
  }

  // Mali Regions
  getMaliRegions(): MaliRegion[] {
    return this.get<MaliRegion[]>('mali_regions', initialMaliRegions);
  }

  // Donations & Transactions
  getDonations(): DonationTransaction[] {
    return this.get<DonationTransaction[]>('donations', [
      {
        id: 'don-demo-1',
        receiptNumber: 'ASK-2026-DON-10024',
        transactionId: 'TX-ASKIA-992182',
        amount: 100,
        currency: 'USD',
        amountUsdEquivalent: 100,
        donorName: 'فاعل خير',
        donorEmail: 'donor@askiafoundation.org',
        donorCountry: 'UAE',
        isAnonymous: true,
        paymentMethod: 'card',
        createdAt: '2026-02-17T10:30:00.000Z',
      },
    ]);
  }

  addDonation(donation: DonationTransaction): void {
    const list = this.getDonations();
    list.unshift(donation);
    this.set<DonationTransaction[]>('donations', list);

    // If attached to a campaign, update campaign raised amount
    if (donation.campaignId) {
      const campaigns = this.getCampaigns();
      const targetCamp = campaigns.find((c) => c.id === donation.campaignId);
      if (targetCamp) {
        targetCamp.raisedAmount += donation.amount;
        targetCamp.donorsCount += 1;
        this.saveCampaign(targetCamp);
      }
    }
  }

  // Volunteer Applications
  getVolunteers(): VolunteerApplication[] {
    return this.get<VolunteerApplication[]>('volunteers', [
      {
        id: 'vol-1',
        fullName: 'إبراهيم ديالو',
        email: 'ibrahim.diallo@example.com',
        phone: '+223 76 12 34 56',
        country: 'مالي',
        city: 'باماكو',
        specialty: 'engineering',
        skills: 'هندسة هيدرولوجية وطاقة شمسية',
        motivation: 'أرغب في المساهمة بخبرتي في الإشراف على حفر الآبار وفحص جودة المياه في القرى.',
        createdAt: '2026-02-16T14:20:00.000Z',
        submittedAt: '2026-02-16T14:20:00.000Z',
        status: 'reviewed',
      },
    ]);
  }

  getVolunteerApplications(): VolunteerApplication[] {
    return this.getVolunteers();
  }

  submitVolunteerApplication(app: VolunteerApplication): void {
    this.addVolunteer(app);
  }

  addVolunteer(app: VolunteerApplication): void {
    const list = this.getVolunteers();
    list.unshift(app);
    this.set<VolunteerApplication[]>('volunteers', list);
  }

  updateVolunteerStatus(id: string, status: VolunteerApplication['status']): void {
    const list = this.getVolunteers();
    const target = list.find((v) => v.id === id);
    if (target) {
      target.status = status;
      this.set<VolunteerApplication[]>('volunteers', list);
    }
  }

  // News
  getNews(): NewsItem[] {
    return this.get<NewsItem[]>('news', initialNews);
  }

  saveNews(item: NewsItem): void {
    const list = this.getNews();
    const idx = list.findIndex((n) => n.id === item.id);
    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.unshift(item);
    }
    this.set<NewsItem[]>('news', list);
  }

  deleteNews(id: string): void {
    const list = this.getNews().filter((n) => n.id !== id);
    this.set<NewsItem[]>('news', list);
  }

  // Gallery
  getGallery(): GalleryItem[] {
    return this.get<GalleryItem[]>('gallery', initialGallery);
  }

  // Transparency
  getTransparencyReports(): TransparencyReport[] {
    return this.get<TransparencyReport[]>('transparency_reports', [
      {
        id: 'rep-2025',
        year: 2025,
        title: {
          ar: 'التقرير المالي والرقابي السنوي 2025',
          fr: 'Rapport Financier Annuel & Audit 2025',
          en: 'Annual Financial & Audit Report 2025',
        },
        auditor: 'PwC / KPMG Sahel Regional Auditor',
        fileUrl: '#',
      },
      {
        id: 'rep-2024',
        year: 2024,
        title: {
          ar: 'تقرير الأثر والحوكمة المؤسسية 2024',
          fr: "Rapport d'Impact et Gouvernance 2024",
          en: 'Impact & Governance Report 2024',
        },
        auditor: 'Deloitte West Africa',
        fileUrl: '#',
      },
      {
        id: 'rep-2023',
        year: 2023,
        title: {
          ar: 'تقرير الإنجازات الإنسانية والتدقيق 2023',
          fr: "Rapport des Réalisations Humanitaires 2023",
          en: 'Humanitarian Achievements & Audit 2023',
        },
        auditor: 'Sahel Audit Cabinet',
        fileUrl: '#',
      },
    ]);
  }

  getTransparencyReport(): TransparencyReport {
    const reps = this.getTransparencyReports();
    return reps[0] || initialTransparencyReport;
  }

  // Reset to default seed
  resetAll(): void {
    localStorage.removeItem('askia_impact_stats');
    localStorage.removeItem('askia_campaigns');
    localStorage.removeItem('askia_projects');
    localStorage.removeItem('askia_mali_regions');
    localStorage.removeItem('askia_donations');
    localStorage.removeItem('askia_volunteers');
    localStorage.removeItem('askia_news');
    localStorage.removeItem('askia_transparency_reports');
  }
}

export const store = new Store();

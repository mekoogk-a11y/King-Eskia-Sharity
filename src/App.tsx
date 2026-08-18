import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { ImpactStatsSection } from './components/sections/ImpactStatsSection';
import { WhereWeWorkMap } from './components/sections/WhereWeWorkMap';
import { HeartOfMaliSection } from './components/sections/HeartOfMaliSection';
import { WhyWeWorkSection } from './components/sections/WhyWeWorkSection';
import { HumanitarianNeedsSection } from './components/sections/HumanitarianNeedsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { TransparencySection } from './components/sections/TransparencySection';
import { NewsSection } from './components/sections/NewsSection';
import { AboutPage } from './components/pages/AboutPage';
import { VolunteerPage } from './components/pages/VolunteerPage';
import { PartnerContactPage } from './components/pages/PartnerContactPage';
import { DonationModal } from './components/modals/DonationModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { store } from './services/store';
import { ImpactStats, Campaign, Project, MaliRegion, TransparencyReport, NewsArticle, CountryCode } from './types/foundation';

function MainApp() {
  const { t, isRTL } = useLanguage();

  // Navigation state
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [selectedCountryFilter, setSelectedCountryFilter] = useState<CountryCode | undefined>(undefined);

  // Modal states
  const [isDonationModalOpen, setIsDonationModalOpen] = useState<boolean>(false);
  const [donationCampaignId, setDonationCampaignId] = useState<string | undefined>(undefined);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Data state loaded from store
  const [stats, setStats] = useState<ImpactStats>(store.getStats());
  const [campaigns, setCampaigns] = useState<Campaign[]>(store.getCampaigns());
  const [projects, setProjects] = useState<Project[]>(store.getProjects());
  const [regions, setRegions] = useState<MaliRegion[]>(store.getMaliRegions());
  const [reports, setReports] = useState<TransparencyReport[]>(store.getTransparencyReports());
  const [news, setNews] = useState<NewsArticle[]>(store.getNews());

  // Reload data helper
  const reloadData = () => {
    setStats(store.getStats());
    setCampaigns(store.getCampaigns());
    setProjects(store.getProjects());
    setRegions(store.getMaliRegions());
    setReports(store.getTransparencyReports());
    setNews(store.getNews());
  };

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDonate = (campaignIdOrCause?: string) => {
    setDonationCampaignId(campaignIdOrCause);
    setIsDonationModalOpen(true);
  };

  const handleNavigateToProjects = (country?: CountryCode) => {
    setSelectedCountryFilter(country);
    setCurrentSection('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDonationSuccess = (amount: number, campaignId?: string) => {
    // Record into store
    store.addDonation({
      id: `don_${Date.now()}`,
      amount,
      currency: 'USD',
      campaignId,
      donorName: 'متبرع كريم',
      donorEmail: 'donor@askiafoundation.org',
      isAnonymous: true,
      transactionId: `ASKIA-TX-${Date.now().toString(36).toUpperCase()}`,
      receiptNumber: `REC-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      paymentMethod: 'card',
    });
    reloadData();
  };

  return (
    <div className="min-h-screen bg-black text-stone-100 flex flex-col font-sans selection:bg-emerald-600 selection:text-white">
      {/* Top Main Navigation */}
      <Navbar
        activeSection={currentSection}
        onNavigate={handleNavigate}
        onOpenDonate={() => handleOpenDonate()}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentSection === 'home' && (
          <>
            <Hero
              onNavigate={handleNavigate}
              onOpenDonate={() => handleOpenDonate()}
            />
            <ImpactStatsSection stats={stats} />
            <HumanitarianNeedsSection onOpenDonate={handleOpenDonate} />
            <WhereWeWorkMap
              onNavigateToProjects={handleNavigateToProjects}
            />
            <HeartOfMaliSection
              regions={regions}
              onOpenDonate={() => handleOpenDonate()}
            />
            <WhyWeWorkSection />
            <ProjectsSection
              projects={projects}
              initialCountryFilter={selectedCountryFilter}
              onOpenDonate={handleOpenDonate}
            />
            <TransparencySection reports={reports} />
            <NewsSection news={news} />
          </>
        )}

        {currentSection === 'about' && <AboutPage />}

        {currentSection === 'where-we-work' && (
          <div className="py-8 bg-stone-950">
            <WhereWeWorkMap onNavigateToProjects={handleNavigateToProjects} />
            <ProjectsSection
              projects={projects}
              initialCountryFilter={selectedCountryFilter}
              onOpenDonate={handleOpenDonate}
            />
          </div>
        )}

        {currentSection === 'heart-of-mali' && (
          <div className="py-8 bg-stone-950">
            <HeartOfMaliSection
              regions={regions}
              onOpenDonate={() => handleOpenDonate()}
            />
          </div>
        )}

        {currentSection === 'campaigns' && (
          <div className="py-8 bg-stone-950">
            <ProjectsSection
              projects={projects}
              initialCountryFilter={selectedCountryFilter}
              onOpenDonate={handleOpenDonate}
            />
          </div>
        )}

        {currentSection === 'projects' && (
          <div className="py-8 bg-stone-950">
            <ProjectsSection
              projects={projects}
              initialCountryFilter={selectedCountryFilter}
              onOpenDonate={handleOpenDonate}
            />
          </div>
        )}

        {currentSection === 'impact' && (
          <div className="py-8 bg-stone-950 space-y-12">
            <ImpactStatsSection stats={stats} />
            <TransparencySection reports={reports} />
          </div>
        )}

        {currentSection === 'news' && (
          <div className="py-8 bg-stone-950">
            <NewsSection news={news} />
          </div>
        )}

        {currentSection === 'volunteer' && <VolunteerPage />}

        {currentSection === 'partners' && <PartnerContactPage />}
        {currentSection === 'contact' && <PartnerContactPage />}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenDonate={() => handleOpenDonate()}
      />

      {/* Global Donation Modal */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => setIsDonationModalOpen(false)}
        campaigns={campaigns}
        defaultCampaignId={donationCampaignId}
        onDonationSuccess={handleDonationSuccess}
      />

      {/* Admin Management Dashboard */}
      {isAdminOpen && (
        <AdminDashboard
          onClose={() => setIsAdminOpen(false)}
          onDataUpdated={reloadData}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}

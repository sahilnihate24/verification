/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState } from 'react';
import { Navbar } from './components/Navbar';
import { VerificationHero } from './components/VerificationHero';
import { ProcessSection } from './components/ProcessSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

type SectionId = 'verification' | 'process' | 'about' | 'contact';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('verification');
  const verificationInputRef = useRef<HTMLInputElement | null>(null);

  const handleNavigate = (section: SectionId) => {
    setActiveSection(section);
    const target = document.getElementById(section);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleVerifyClick = () => {
    setActiveSection('verification');
    const target = document.getElementById('verification');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => {
      verificationInputRef.current?.focus();
    }, 150);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onVerifyClick={handleVerifyClick}
      />

      <main className="flex-1">
        <VerificationHero inputRef={verificationInputRef} />
        <ProcessSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

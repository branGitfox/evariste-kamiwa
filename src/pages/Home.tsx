import React from 'react'
import { HeroSection } from '@/components/home/HeroSection'
import { TrustSection } from '@/components/home/TrustSection'
import { StorytellingSection } from '@/components/home/StorytellingSection'
import { HomeProductsSection } from '@/components/home/HomeProductsSection'
import { HomeServicesSection } from '@/components/home/HomeServicesSection'
import { HomeFAQSection } from '@/components/home/HomeFAQSection'
import { HomeCTASection } from '@/components/home/HomeCTASection'

export const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <TrustSection />
      <StorytellingSection />
      <HomeProductsSection />
      <HomeServicesSection />
      <HomeFAQSection />
      <HomeCTASection />
    </div>
  )
}

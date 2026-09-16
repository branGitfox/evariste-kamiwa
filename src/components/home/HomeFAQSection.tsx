import React from 'react'
import { Container } from '@/components/layout/Container'
import { Accordion } from '@/components/ui/Accordion'
import { getFAQ } from '@/data/faq'

export const HomeFAQSection: React.FC = () => {
  const faqItems = getFAQ()

  return (
    <section className="py-20 relative">
      <Container size="md">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
            Foire aux questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
            Questions fréquentes
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Tout ce que vous devez savoir avant de commander un iPhone ou d’expédier un colis.
          </p>
        </div>

        <Accordion items={faqItems} allowMultiple={false} />
      </Container>
    </section>
  )
}

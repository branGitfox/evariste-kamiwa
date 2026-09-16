import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, MessageCircle, ArrowRight, Plane, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/layout/Container'
import { openWhatsApp } from '@/lib/whatsapp'
import hero from '@/assets/hero-iphone.jpg'

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Pill tag */}
            {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-neutral-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>Neutra Mobile — Par Evariste Kamiwa</span>
            </div> */}

            {/* Main Headline */}
            <h1 className="hero-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Votre iPhone authentique. <br />
              <span className="hero-gradient-text">
                Livré en toute confiance.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed">
              Vente d'iPhones rigoureusement inspectés et service de transport express et sécurisé de colis entre <strong>Madagascar</strong>, <strong>l'Île Maurice</strong> et <strong>Dubaï</strong>.
            </p>

            {/* Highlights bullet points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>iPhones débloqués tous opérateurs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>État batterie & pièces testés</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Acheminement direct sécurisé</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Contact direct sans intermédiaire</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <Link to="/iphone">
                <Button size="lg" className="w-full sm:w-auto" icon={<ArrowRight className="w-4 h-4" />}>
                  Voir les iPhones
                </Button>
              </Link>
              <Button
                variant="whatsapp"
                size="lg"
                className="w-full sm:w-auto"
                icon={<MessageCircle className="w-5 h-5 fill-black" />}
                onClick={() => openWhatsApp('Bonjour Evariste, je souhaite des renseignements sur vos iPhones ou services.')}
              >
                Discuter sur WhatsApp
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual with Apple-style rounded phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative glow frame */}
              <div className="relative rounded-[2.5rem] p-3 bg-gradient-to-b from-blue-500/20 via-white/10 to-transparent border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.5)] backdrop-blur-xl group">
                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={hero}
                    alt="Apple iPhone Neutra Mobile"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

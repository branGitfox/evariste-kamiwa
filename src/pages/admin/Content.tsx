import React, { useState } from 'react'
import { FileText, Save, Plus, Trash2, HelpCircle } from 'lucide-react'
import { getFAQ, saveFAQ } from '@/data/faq'
import type { FAQItem } from '@/types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { useToast } from '@/components/ui/Toast'

export const Content: React.FC = () => {
  const { toast } = useToast()
  const [faqList, setFaqList] = useState<FAQItem[]>(() => getFAQ())

  const handleUpdateFAQ = (index: number, key: 'question' | 'answer', val: string) => {
    setFaqList((prev) => {
      const next = [...prev]
      const current = next[index]
      if (current) {
        next[index] = { ...current, [key]: val }
      }
      return next
    })
  }

  const handleAddFAQ = () => {
    setFaqList((prev) => [
      ...prev,
      {
        id: `faq-${Date.now()}`,
        question: 'Nouvelle question ?',
        answer: 'Réponse détaillée...',
      },
    ])
  }

  const handleRemoveFAQ = (index: number) => {
    setFaqList((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSaveAll = () => {
    saveFAQ(faqList)
    toast({
      title: 'Contenus sauvegardés',
      description: 'La liste des FAQ a été mise à jour avec succès.',
      type: 'success',
    })
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Gestion des Contenus (CMS)</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Modifiez directement les questions fréquentes et les textes clés du site.
          </p>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon={<Save className="w-4 h-4" />}
          onClick={handleSaveAll}
        >
          Enregistrer les modifications
        </Button>
      </div>

      {/* FAQ Management */}
      <div className="bg-[#111113] border border-white/8 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-400" />
            <h2 className="text-base font-bold text-white">Foire Aux Questions (FAQ)</h2>
          </div>
          <Button variant="outline" size="sm" icon={<Plus className="w-3.5 h-3.5" />} onClick={handleAddFAQ}>
            Ajouter une question
          </Button>
        </div>

        <div className="space-y-4">
          {faqList.map((item, idx) => (
            <div key={item.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold text-neutral-400">Question #{idx + 1}</span>
                <button
                  onClick={() => handleRemoveFAQ(idx)}
                  className="text-red-400 hover:text-red-300 p-1 rounded"
                  title="Supprimer la question"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <Input
                label="Question"
                value={item.question}
                onChange={(e) => handleUpdateFAQ(idx, 'question', e.target.value)}
              />
              <Textarea
                label="Réponse"
                value={item.answer}
                onChange={(e) => handleUpdateFAQ(idx, 'answer', e.target.value)}
                rows={2}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

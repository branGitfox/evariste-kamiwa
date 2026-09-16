import React, { useState, useMemo } from 'react'
import { BarChart3, TrendingUp, Users, MessageCircle, MousePointerClick } from 'lucide-react'
import { getAnalyticsSummary } from '@/lib/analytics'
import { Badge } from '@/components/ui/Badge'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts'

export const Analytics: React.FC = () => {
  const [range, setRange] = useState<'7d' | '30d'>('7d')
  const summary = useMemo(() => getAnalyticsSummary(), [])

  const chartData = useMemo(() => {
    if (range === '7d') {
      return [
        { jour: 'Lun', visites: 24, clicsWA: 4, demandes: 2 },
        { jour: 'Mar', visites: 35, clicsWA: 6, demandes: 3 },
        { jour: 'Mer', visites: 42, clicsWA: 8, demandes: 5 },
        { jour: 'Jeu', visites: 38, clicsWA: 7, demandes: 4 },
        { jour: 'Ven', visites: 55, clicsWA: 12, demandes: 8 },
        { jour: 'Sam', visites: 68, clicsWA: 15, demandes: 10 },
        { jour: 'Dim', visites: 47, clicsWA: 9, demandes: 6 },
      ]
    }
    return [
      { jour: 'Sem 1', visites: 180, clicsWA: 38, demandes: 22 },
      { jour: 'Sem 2', visites: 220, clicsWA: 45, demandes: 28 },
      { jour: 'Sem 3', visites: 290, clicsWA: 62, demandes: 41 },
      { jour: 'Sem 4', visites: 340, clicsWA: 75, demandes: 50 },
    ]
  }, [range])

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Statistiques & Conversion</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Mesurez l'engagement des visiteurs et l'efficacité des boutons de commande WhatsApp.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#111113] p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setRange('7d')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              range === '7d' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            7 derniers jours
          </button>
          <button
            onClick={() => setRange('30d')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              range === '30d' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            30 derniers jours
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-[#111113] border border-white/8 rounded-2xl p-5 space-y-2">
          <span className="text-xs text-neutral-400">Total Visiteurs Uniques</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">412</span>
            <span className="text-xs text-emerald-400 font-medium">+14% ce mois</span>
          </div>
        </div>

        <div className="bg-[#111113] border border-white/8 rounded-2xl p-5 space-y-2">
          <span className="text-xs text-neutral-400">Taux de Clic WhatsApp</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-[#25D366]">18.4%</span>
            <Badge variant="success" size="sm">Excellente conversion</Badge>
          </div>
        </div>

        <div className="bg-[#111113] border border-white/8 rounded-2xl p-5 space-y-2">
          <span className="text-xs text-neutral-400">Demandes de devis Colis</span>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-blue-400">28</span>
            <span className="text-xs text-neutral-400">Axes Maurice & Dubaï</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-[#111113] border border-white/8 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold text-white">Performances de conversion</h3>
          <Badge variant="default" size="sm">Données combinées</Badge>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="jour" stroke="#52525b" fontSize={11} />
              <YAxis stroke="#52525b" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  borderColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <Legend />
              <Bar dataKey="visites" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Visites" />
              <Bar dataKey="clicsWA" fill="#22c55e" radius={[4, 4, 0, 0]} name="Clics WhatsApp" />
              <Bar dataKey="demandes" fill="#a855f7" radius={[4, 4, 0, 0]} name="Demandes formulaires" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

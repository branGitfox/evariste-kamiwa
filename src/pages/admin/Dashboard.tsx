import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Smartphone,
  CheckCircle2,
  Eye,
  MessageCircle,
  Plus,
  ArrowRight,
  TrendingUp,
} from 'lucide-react'
import { getProducts } from '@/data/products'
import { getAnalyticsSummary } from '@/lib/analytics'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'

export const Dashboard: React.FC = () => {
  const products = useMemo(() => getProducts(), [])
  const analytics = useMemo(() => getAnalyticsSummary(), [])

  const availableCount = products.filter((p) => p.status === 'available').length

  // Generate chart data for last 7 days
  const chartData = useMemo(() => {
    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
    return days.map((day, i) => ({
      name: day,
      vues: 12 + i * 4 + (i % 2 === 0 ? 5 : -2),
      whatsapp: 2 + Math.floor(i * 1.2),
    }))
  }, [])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Tableau de Bord</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Aperçu de l'activité, du stock d'iPhones et des contacts WhatsApp.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/admin/products/new">
            <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
              Ajouter un iPhone
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#111113] border border-white/8 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400">Total iPhones</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">{products.length}</span>
            <Badge variant="info" size="sm">En catalogue</Badge>
          </div>
        </div>

        <div className="bg-[#111113] border border-white/8 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400">Disponibles de suite</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">{availableCount}</span>
            <Badge variant="success" size="sm">En stock</Badge>
          </div>
        </div>

        <div className="bg-[#111113] border border-white/8 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400">Vues de Pages</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">{analytics.pageViews || 248}</span>
            <span className="text-[11px] text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +18%
            </span>
          </div>
        </div>

        <div className="bg-[#111113] border border-white/8 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-400">Clics WhatsApp</span>
            <div className="w-8 h-8 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-black text-white">{analytics.whatsAppClicks || 34}</span>
            <Badge variant="success" size="sm">Leads directs</Badge>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-[#111113] border border-white/8 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-white">Activité Récente (7 derniers jours)</h3>
            <p className="text-xs text-neutral-400">Vues du site vs. demandes de contact WhatsApp</p>
          </div>
          <Badge variant="default" size="sm">Données simulées</Badge>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="vuesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="whatsappGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#52525b" fontSize={11} />
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
              <Area type="monotone" dataKey="vues" stroke="#3b82f6" fillOpacity={1} fill="url(#vuesGradient)" name="Vues" />
              <Area type="monotone" dataKey="whatsapp" stroke="#22c55e" fillOpacity={1} fill="url(#whatsappGradient)" name="WhatsApp" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent iPhones Table Snippet */}
      <div className="bg-[#111113] border border-white/8 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white">Derniers iPhones Enregistrés</h3>
          <Link to="/admin/products" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
            <span>Voir tout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-white/5">
          {products.slice(0, 4).map((p) => (
            <div key={p.id} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5 text-neutral-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{p.name}</p>
                  <p className="text-xs text-neutral-400">{p.model} • {p.storage} • {p.color}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="text-xs font-bold text-white font-mono">
                  {p.price.toLocaleString('fr-FR')} {p.currency}
                </span>
                <Badge variant={p.status === 'available' ? 'success' : 'default'} size="sm">
                  {p.status}
                </Badge>
                <Link
                  to={`/admin/products/${p.id}/edit`}
                  className="text-xs text-neutral-400 hover:text-white p-1 rounded hover:bg-white/5"
                >
                  Modifier
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ShieldAlert, Lock, ArrowLeft } from 'lucide-react'
import { login } from '@/lib/auth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('admin@evariste.com')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const success = login(email, password)
      if (success) {
        navigate('/admin')
      } else {
        setError('Identifiants invalides. Utilisez les identifiants de démonstration indiqués ci-dessous.')
      }
      setLoading(false)
    }, 400)
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        {/* Back link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au site public
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[#111113] border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white p-1.5 border border-white/20 flex items-center justify-center mx-auto mb-4 shadow-lg overflow-hidden">
              <img src="/logo.png" alt="Neutra Mobile" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Neutra Mobile</h1>
            <p className="text-xs text-neutral-400 mt-1">
              Espace Administration & Gestion
            </p>
          </div>

          {/* DEMO Notice */}
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6 text-xs text-amber-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Version de Démonstration</span>
            </div>
            <p className="text-[11px] text-amber-300/80">
              Identifiants pré-remplis pour tester le back-office :
              <br />
              <strong className="text-white">Email :</strong> admin@evariste.com
              <br />
              <strong className="text-white">Mot de passe :</strong> admin123
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center mt-2"
              loading={loading}
            >
              Se connecter à l'espace gestion
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

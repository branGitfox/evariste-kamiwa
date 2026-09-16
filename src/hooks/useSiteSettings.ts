import { useState, useEffect, useCallback } from 'react'
import { getSettings, saveSettings } from '@/data/siteConfig'
import type { SiteSettings } from '@/types'

export function useSiteSettings() {
  const [settings, setSettingsState] = useState<SiteSettings>(() => getSettings())

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'ek_site_settings') {
        setSettingsState(getSettings())
      }
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const updateSettings = useCallback((newSettings: Partial<SiteSettings>) => {
    saveSettings(newSettings)
    const updated = getSettings()
    setSettingsState(updated)
    return updated
  }, [])

  return { settings, updateSettings }
}

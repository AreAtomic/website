'use client'

import { useState, useTransition } from 'react'
import { sendEmail } from '@/app/actions/sendEmail'

export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await sendEmail(formData)
      if (result.success) {
        setSent(true)
      } else {
        setError(result.error)
      }
    })
  }

  if (sent) {
    return (
      <div className="bg-white/[0.08] border border-white/20 rounded-2xl px-8 py-10 text-center">
        <div className="w-14 h-14 bg-brand-orange/20 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12l5 5L19 7"
              stroke="#FF6B35"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold mb-2">Message envoyé !</h3>
        <p className="text-white/60 text-[15px]">Je vous réponds sous 24h. À très vite.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-white/70">Votre nom</label>
          <input
            className="form-dark-input"
            name="nom"
            placeholder="Jean Dupont"
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[13px] font-medium text-white/70">Email</label>
          <input
            className="form-dark-input"
            name="email"
            type="email"
            placeholder="jean@startup.fr"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-white/70">Catégorie de prestation</label>
        <select
          className="form-dark-input cursor-pointer"
          name="categorie"
          defaultValue=""
          required
        >
          <option value="" disabled>
            Sélectionnez...
          </option>
          <option value="Cadrage produit / architecture">Cadrage produit / architecture</option>
          <option value="Développement fullstack">Développement fullstack</option>
          <option value="Intégration IA">Intégration IA</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-white/70">Description projet</label>
        <textarea
          className="form-dark-input resize-y min-h-[120px]"
          name="description"
          placeholder="En quelques mots, votre idée, vos contraintes, vos délais..."
          required
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="self-start bg-brand-orange hover:bg-brand-orange-dark text-white px-7 py-3.5 rounded-[10px] font-bold text-[15px] transition-all hover:-translate-y-0.5 shadow-[0_4px_16px_rgba(255,107,53,0.4)] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
      >
        {isPending ? 'Envoi en cours…' : 'Envoyer le message →'}
      </button>
    </form>
  )
}

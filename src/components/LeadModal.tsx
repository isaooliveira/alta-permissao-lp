import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useLot } from '@/hooks/useLot'
import { useEventStatus } from '@/hooks/useEventStatus'
import { saveLead } from '@/lib/supabase'
import { Button } from './Button'

interface LeadModalProps {
  open: boolean
  onClose: () => void
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 11)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  return value
}

interface FormState {
  name: string
  phone: string
  email: string
}

interface Errors {
  name?: string
  phone?: string
  email?: string
}

export function LeadModal({ open, onClose }: LeadModalProps) {
  const { currentLot } = useLot()
  const { eventPast } = useEventStatus()
  const [form, setForm] = useState<FormState>({ name: '', phone: '', email: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)

  function validate(): boolean {
    const e: Errors = {}
    if (!form.name.trim() || form.name.trim().length < 3) e.name = 'Informe seu nome completo'
    const digits = form.phone.replace(/\D/g, '')
    if (digits.length < 10) e.phone = 'Telefone inválido'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'E-mail inválido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      await saveLead({
        name: form.name.trim(),
        phone: form.phone.replace(/\D/g, ''),
        email: form.email.trim().toLowerCase(),
        lot: currentLot.number,
      })
    } catch (err) {
      console.error('[LeadModal] falha ao salvar lead:', err)
    } finally {
      setLoading(false)
      window.location.href = currentLot.hotmartUrl
    }
  }

  function handlePhone(v: string) {
    setForm((f) => ({ ...f, phone: formatPhone(v) }))
    if (errors.phone) setErrors((e) => ({ ...e, phone: undefined }))
  }

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-dark/80 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4 bg-dark border border-cream/10 p-8"
              >
                <Dialog.Close className="absolute top-4 right-4 text-cream-muted hover:text-cream transition-colors">
                  <X size={20} />
                </Dialog.Close>

                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-red mb-2">
                    {eventPast ? currentLot.priceFormatted : `${currentLot.label} · ${currentLot.priceFormatted}`}
                  </p>
                  <Dialog.Title className="text-white font-semibold text-2xl leading-tight">
                    Antes de ir para o checkout
                  </Dialog.Title>
                  <Dialog.Description className="text-cream-muted text-sm mt-1">
                    Preencha seus dados para garantir sua vaga.
                  </Dialog.Description>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <Field
                    label="Nome completo"
                    type="text"
                    placeholder="Seu nome"
                    value={form.name}
                    onChange={(v) => {
                      setForm((f) => ({ ...f, name: v }))
                      if (errors.name) setErrors((e) => ({ ...e, name: undefined }))
                    }}
                    error={errors.name}
                  />
                  <Field
                    label="Telefone / WhatsApp"
                    type="tel"
                    placeholder="(11) 9 9999-9999"
                    value={form.phone}
                    onChange={handlePhone}
                    error={errors.phone}
                  />
                  <Field
                    label="E-mail"
                    type="email"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={(v) => {
                      setForm((f) => ({ ...f, email: v }))
                      if (errors.email) setErrors((e) => ({ ...e, email: undefined }))
                    }}
                    error={errors.email}
                  />

                  <Button type="submit" size="lg" loading={loading} showTicket className="w-full mt-2 whitespace-nowrap">
                    Quero garantir meu ingresso
                  </Button>

                  <p className="text-cream-muted text-xs text-center">
                    Seus dados estão seguros. Você será redirecionada para o checkout.
                  </p>
                </form>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

function Field({
  label,
  error,
  onChange,
  ...props
}: {
  label: string
  error?: string
  onChange: (v: string) => void
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-cream text-sm font-semibold uppercase tracking-wide">
        {label}
      </label>
      <input
        {...props}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-dark border px-4 py-3 text-cream placeholder:text-cream/30 font-medium outline-none transition-colors focus:border-cream ${
          error ? 'border-red' : 'border-cream/20'
        }`}
      />
      {error && <p className="text-red text-xs">{error}</p>}
    </div>
  )
}

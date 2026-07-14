'use client'

import { useState, useRef } from 'react'
import { X, CheckCircle, User, Mail, Phone } from 'lucide-react'

interface RegisterButtonProps {
  eventTitle: string
}

export function RegisterButton({ eventTitle }: RegisterButtonProps) {
  const [open,      setOpen]      = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => { setOpen(true); setSubmitted(false) }}
        className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all"
        style={{
          background: 'linear-gradient(135deg, rgba(34,211,238,0.75) 0%, rgba(14,165,233,0.75) 100%)',
          border:     '1px solid rgba(34,211,238,0.36)',
          boxShadow:  '0 0 14px rgba(34,211,238,0.18)',
        }}
      >
        Register Now — It's Free
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(3px)' }}
          onClick={() => setOpen(false)}
        >
          {/* Modal panel — clear glass, not opaque */}
          <div
            className="relative w-full max-w-md rounded-2xl p-7 space-y-6"
            style={{
              background:
                'radial-gradient(ellipse 80% 45% at 50% 0%, rgba(255,255,255,0.06) 0%, transparent 65%), rgba(12,20,38,0.72)',
              backdropFilter:      'blur(8px)',
              WebkitBackdropFilter:'blur(8px)',
              border:     '1px solid rgba(255,255,255,0.14)',
              boxShadow:  '0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}
              aria-label="Close"
            >
              <X size={15} />
            </button>

            {submitted ? (
              <div className="text-center py-4 space-y-4">
                <CheckCircle size={44} className="text-cyan-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">You're Registered!</h3>
                <p className="text-gray-300 text-sm">
                  Thanks for signing up for <span className="text-cyan-300 font-medium">{eventTitle}</span>.
                  We'll send confirmation details to your email soon.
                </p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.75) 0%, rgba(14,165,233,0.75) 100%)', border: '1px solid rgba(34,211,238,0.32)' }}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-white">Register for Event</h3>
                  <p className="text-sm text-gray-400 line-clamp-1">{eventTitle}</p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { id: 'name',  label: 'Full Name',          type: 'text',  placeholder: 'Your name',       icon: <User  size={14} className="text-white/30" /> },
                    { id: 'email', label: 'Email Address',       type: 'email', placeholder: 'you@uni.edu',     icon: <Mail  size={14} className="text-white/30" /> },
                    { id: 'phone', label: 'Phone (optional)',    type: 'tel',   placeholder: '+1 555 000 1234', icon: <Phone size={14} className="text-white/30" /> },
                  ].map(f => (
                    <div key={f.id} className="space-y-1.5">
                      <label htmlFor={f.id} className="text-xs font-medium text-gray-300">{f.label}</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">{f.icon}</span>
                        <input
                          id={f.id} name={f.id} type={f.type} placeholder={f.placeholder}
                          required={f.id !== 'phone'}
                          className="glass-input w-full pl-9 pr-3 py-2.5 rounded-xl text-sm"
                        />
                      </div>
                    </div>
                  ))}

                  <div className="flex items-start gap-2 pt-0.5">
                    <input type="checkbox" id="consent" required className="mt-1 w-3.5 h-3.5 cursor-pointer accent-cyan-400" />
                    <label htmlFor="consent" className="text-xs text-gray-400">
                      I agree to receive event updates from InnovatorsHub. No spam, ever.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl font-semibold text-white text-sm disabled:opacity-55 transition-all"
                    style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.75) 0%, rgba(14,165,233,0.75) 100%)', border: '1px solid rgba(34,211,238,0.36)', boxShadow: '0 0 14px rgba(34,211,238,0.16)' }}
                  >
                    {loading ? 'Submitting…' : 'Confirm Registration'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

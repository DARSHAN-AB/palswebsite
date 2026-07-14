'use client'

import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { GlassCard }    from '@/components/ui/glass-card'
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react'
import { useState }     from 'react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

        <ScrollReveal className="max-w-2xl space-y-4">
          <h1 className="text-5xl sm:text-6xl font-bold text-white">Get in Touch</h1>
          <p className="text-lg text-gray-300">
            Interested in joining, partnering, or just saying hello? We'd love to hear from you.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-8">

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: <Mail   size={17} className="text-cyan-400" />, label: 'Email',    value: 'club@university.edu',             href: 'mailto:club@university.edu' },
              { icon: <Phone  size={17} className="text-cyan-400" />, label: 'Phone',    value: '+1 (555) 000-1234',               href: 'tel:+15550001234' },
              { icon: <MapPin size={17} className="text-cyan-400" />, label: 'Location', value: 'Eng. Building, Room 204\nState University', href: null },
            ].map((c, i) => (
              <ScrollReveal key={c.label} delay={i * 0.08}>
                <GlassCard>
                  <div className="glass-card rounded-xl p-4 flex gap-4 items-start">
                    <div className="w-9 h-9 glass-card rounded-lg flex items-center justify-center flex-shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="text-white text-sm font-medium hover:text-cyan-300 transition-colors whitespace-pre-line">{c.value}</a>
                      ) : (
                        <p className="text-white text-sm font-medium whitespace-pre-line">{c.value}</p>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={0.24}>
              <GlassCard>
                <div className="glass-card rounded-xl p-5 space-y-3">
                  <p className="text-white font-semibold text-sm">Meeting Hours</p>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li className="flex justify-between"><span>Wednesday</span><span className="text-cyan-300">6:00 – 8:00 PM</span></li>
                    <li className="flex justify-between"><span>Saturday</span><span className="text-cyan-300">11:00 AM – 1:00 PM</span></li>
                    <li className="text-xs text-gray-500 pt-1">Engineering Building, Room 204</li>
                  </ul>
                </div>
              </GlassCard>
            </ScrollReveal>
          </div>

          {/* Form */}
          <ScrollReveal delay={0.1} className="lg:col-span-3">
            <GlassCard className="h-full">
              <div className="glass-card rounded-2xl p-8 h-full">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center h-full py-12 space-y-4 text-center">
                    <CheckCircle size={52} className="text-cyan-400" />
                    <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                    <p className="text-gray-300 max-w-sm text-sm">Thanks for reaching out. We'll get back to you within 24–48 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-xl font-bold text-white mb-2">Send Us a Message</h2>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { id: 'fname', label: 'First Name', type: 'text',  placeholder: 'First' },
                        { id: 'lname', label: 'Last Name',  type: 'text',  placeholder: 'Last'  },
                      ].map(f => (
                        <div key={f.id} className="space-y-1.5">
                          <label htmlFor={f.id} className="text-xs font-medium text-gray-300">{f.label}</label>
                          <input id={f.id} name={f.id} type={f.type} placeholder={f.placeholder} required
                            className="glass-input w-full px-3 py-2.5 rounded-xl text-sm" />
                        </div>
                      ))}
                    </div>

                    {[
                      { id: 'email',   label: 'Email',   type: 'email', placeholder: 'you@university.edu' },
                      { id: 'subject', label: 'Subject', type: 'text',  placeholder: 'What is this about?' },
                    ].map(f => (
                      <div key={f.id} className="space-y-1.5">
                        <label htmlFor={f.id} className="text-xs font-medium text-gray-300">{f.label}</label>
                        <input id={f.id} name={f.id} type={f.type} placeholder={f.placeholder} required
                          className="glass-input w-full px-3 py-2.5 rounded-xl text-sm" />
                      </div>
                    ))}

                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-xs font-medium text-gray-300">Message</label>
                      <textarea id="message" name="message" rows={5} placeholder="Tell us why you're reaching out…" required
                        className="glass-input w-full px-3 py-2.5 rounded-xl text-sm resize-none" />
                    </div>

                    <button type="submit" disabled={loading}
                      className="w-full py-3 rounded-xl font-semibold text-white text-sm disabled:opacity-55 flex items-center justify-center gap-2 transition-all"
                      style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.78) 0%, rgba(14,165,233,0.78) 100%)', border: '1px solid rgba(34,211,238,0.36)', boxShadow: '0 0 14px rgba(34,211,238,0.18)' }}>
                      {loading ? 'Sending…' : <><Send size={14} /> Send Message</>}
                    </button>
                  </form>
                )}
              </div>
            </GlassCard>
          </ScrollReveal>

        </div>
      </div>
    </main>
  )
}

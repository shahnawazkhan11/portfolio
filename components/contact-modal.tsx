'use client'

import { X } from 'lucide-react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { SiLeetcode } from 'react-icons/si'
import { useState } from 'react'

export const contactLinks = [
  {
    icon: FaEnvelope,
    label: 'Gmail',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=shahnawaz04khan@gmail.com',
    color: 'text-red-500'
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    href: 'https://github.com/shahnawazkhan11',
    color: 'text-white'
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/mohammad-shahnawaz-khan/',
    color: 'text-blue-500'
  },
  {
    icon: SiLeetcode,
    label: 'LeetCode',
    href: 'https://leetcode.com/u/shahnawazkhan11/',
    color: 'text-yellow-500'
  },
]

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="cursor-pointer rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
      >
        Contact
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="glass relative rounded-2xl border border-white/10 p-8 max-w-sm w-full mx-4">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="size-5" />
            </button>

            <h2 className="text-2xl font-semibold text-foreground mb-6">
              Let&apos;s Connect
            </h2>

            <div className="space-y-3">
              {contactLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors group"
                  >
                    <Icon className={`size-5 ${link.color}`} />
                    <span className="text-foreground group-hover:text-neon-cyan transition-colors">
                      {link.label}
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function ContactModalControlled({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="glass relative rounded-2xl border border-white/10 p-8 max-w-sm w-full mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="size-5" />
        </button>

        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Let&apos;s Connect
        </h2>

        <div className="space-y-3">
          {contactLinks.map((link) => {
            const Icon = link.icon
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                onClick={onClose}
                className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors group"
              >
                <Icon className={`size-5 ${link.color}`} />
                <span className="text-foreground group-hover:text-neon-cyan transition-colors">
                  {link.label}
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
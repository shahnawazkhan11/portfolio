"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Eraser, Trash2, Pencil } from "lucide-react"

const COLORS = ["#22d3ee", "#a855f7", "#34d399", "#f59e0b", "#f43f5e"]

export function DoodleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const drawing = useRef(false)
  const [color, setColor] = useState(COLORS[0])
  const [erasing, setErasing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      const prev = ctxRef.current?.getImageData
        ? canvas.toDataURL()
        : null
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      ctx.scale(dpr, dpr)
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.lineWidth = 3
      ctxRef.current = ctx
      if (prev) {
        const img = new Image()
        img.onload = () =>
          ctx.drawImage(img, 0, 0, rect.width, rect.height)
        img.src = prev
      }
    }
    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  function pos(e: React.PointerEvent) {
    const rect = canvasRef.current!.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  function start(e: React.PointerEvent) {
    const ctx = ctxRef.current
    if (!ctx) return
    drawing.current = true
    setHasDrawn(true)
    const { x, y } = pos(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  function move(e: React.PointerEvent) {
    if (!drawing.current) return
    const ctx = ctxRef.current
    if (!ctx) return
    const { x, y } = pos(e)
    ctx.globalCompositeOperation = erasing ? "destination-out" : "source-over"
    ctx.strokeStyle = color
    ctx.lineWidth = erasing ? 18 : 3
    ctx.shadowBlur = erasing ? 0 : 8
    ctx.shadowColor = color
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  function end() {
    drawing.current = false
  }

  function clear() {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
  }

  return (
    <div className="glass flex flex-col overflow-hidden rounded-2xl border border-white/10" suppressHydrationWarning>
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-3 py-2.5" suppressHydrationWarning>
        <button
          type="button"
          onClick={() => setErasing(false)}
          aria-label="Pen"
          className={`rounded-md p-1.5 transition-colors ${!erasing ? "bg-neon-cyan/15 text-neon-cyan" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Pencil className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => setErasing(true)}
          aria-label="Eraser"
          className={`rounded-md p-1.5 transition-colors ${erasing ? "bg-neon-cyan/15 text-neon-cyan" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Eraser className="size-4" />
        </button>
        <span className="mx-1 h-5 w-px bg-white/10" />
        <div className="flex items-center gap-1.5">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              aria-label={`Color ${c}`}
              onClick={() => {
                setColor(c)
                setErasing(false)
              }}
              className={`size-5 rounded-full ring-1 ring-white/20 transition-transform hover:scale-110 ${color === c && !erasing ? "ring-2 ring-white" : ""}`}
              style={{ background: c }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={clear}
          aria-label="Clear canvas"
          className="ml-auto rounded-md p-1.5 text-muted-foreground transition-colors hover:text-destructive"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
          className="h-72 w-full touch-none lg:h-[26rem]"
        />
        {!hasDrawn && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground/60">
              {"// draw something cool"}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

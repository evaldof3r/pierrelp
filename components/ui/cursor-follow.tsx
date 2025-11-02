"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

export function useCursorPosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return position
}


interface CursorFollowProps {
  children: React.ReactNode
  className?: string
}

const CIRCLE_SIZE = 16

const CursorFollow: React.FC<CursorFollowProps> = ({
  children,
  className = "",
}) => {
  const { x: mouseX, y: mouseY } = useCursorPosition()
  const [cursorText, setCursorText] = useState<string | null>(null)
  const [pendingText, setPendingText] = useState<string | null>(null)
  const [textWidth, setTextWidth] = useState<number>(0)
  const measureRef = useRef<HTMLSpanElement>(null)

  // Motion values for smooth follow
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 350, damping: 40 })
  const springY = useSpring(y, { stiffness: 350, damping: 40 })

  // Calculate bubble width and height
  const bubbleWidth = cursorText ? Math.max(textWidth + 32, 40) : CIRCLE_SIZE
  const bubbleHeight = cursorText ? 40 : CIRCLE_SIZE

  // Update target position on mouse move
  useEffect(() => {
    x.set(mouseX - bubbleWidth / 2)
    y.set(mouseY - bubbleHeight / 2)
  }, [mouseX, mouseY, bubbleWidth, bubbleHeight, x, y])

  // Pre-measure text width before showing bubble
  useEffect(() => {
    if (pendingText && measureRef.current) {
      const width = measureRef.current.offsetWidth
      setTextWidth(width)
      setCursorText(pendingText)
      setPendingText(null)
    }
    if (!pendingText && !cursorText) {
      setTextWidth(0)
    }
  }, [pendingText, cursorText])

  // Handlers for child hover
  const handleMouseOver = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    // Look for data-cursor-text in the target or its closest ancestor
    const elementWithText = target.closest("[data-cursor-text]") as HTMLElement | null
    const text = elementWithText?.getAttribute("data-cursor-text")
    if (text) {
      setPendingText(text)
    }
  }
  const handleMouseOut = (e: React.MouseEvent) => {
    // Only clear if we're leaving the element with data-cursor-text
    const target = e.target as HTMLElement
    const relatedTarget = e.relatedTarget as HTMLElement | null
    const currentElement = target.closest("[data-cursor-text]")
    const nextElement = relatedTarget?.closest("[data-cursor-text]")
    
    // If we're leaving an element with data-cursor-text and not entering another one
    if (currentElement && currentElement !== nextElement) {
      setCursorText(null)
      setPendingText(null)
    }
  }

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{ cursor: "none" }}
    >
      {children}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: { duration: 0.32, ease: "easeInOut" },
        }}
        exit={{ opacity: 0, scale: 0.7 }}
        className="pointer-events-none fixed z-50"
        style={{ left: 0, top: 0, x: springX, y: springY }}
      >
        <motion.div
          layout
          transition={{ duration: 0.32, ease: "easeInOut" }}
          animate={
            cursorText
              ? {
                  width: bubbleWidth,
                  height: 40,
                  borderRadius: 20,
                  background: "var(--color-accent-green-primary)",
                  color: "var(--color-neutral-foreground-inverted)",
                  paddingLeft: 16,
                  paddingRight: 16,
                  minWidth: 40,
                  minHeight: 32,
                  scale: 1.1,
                }
              : {
                  width: CIRCLE_SIZE,
                  height: CIRCLE_SIZE,
                  borderRadius: 999,
                  background: "var(--color-accent-green-primary)",
                  color: "var(--color-neutral-foreground-inverted)",
                  paddingLeft: 0,
                  paddingRight: 0,
                  minWidth: CIRCLE_SIZE,
                  minHeight: CIRCLE_SIZE,
                  scale: 1,
                }
          }
          className="flex items-center justify-center text-xs font-medium"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.28, delay: 0.1, ease: "easeInOut" }}
              style={{
                whiteSpace: "nowrap",
                width: "100%",
                textAlign: "center",
                color: "var(--color-neutral-foreground-inverted)",
              }}
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
        {/* Hidden span for pre-measuring text width */}
        {(pendingText || cursorText) && (
          <span
            ref={measureRef}
            style={{
              position: "absolute",
              visibility: "hidden",
              pointerEvents: "none",
              whiteSpace: "nowrap",
              fontSize: "0.75rem",
              fontWeight: 500,
              paddingLeft: 16,
              paddingRight: 16,
              fontFamily: "inherit",
            }}
          >
            {pendingText || cursorText}
          </span>
        )}
      </motion.div>
    </div>
  )
}

export default CursorFollow

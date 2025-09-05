import React, { useRef, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const IntroAnimation = ({ onComplete }) => {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const [isVisible, setIsVisible] = useState(true)

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Small delay before calling onComplete to ensure smooth transition
        setTimeout(() => {
          setIsVisible(false)
          onComplete()
        }, 100)
      }
    })

    // Initial state - hidden and slightly scaled down
    gsap.set(textRef.current, {
      opacity: 0,
      scale: 0.8,
      y: 20
    })

    // Fade in container
    tl.to(containerRef.current, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    })

    // Animate text in with elegant scale and fade
    tl.to(textRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, 0.2)

    // Hold for a moment
    tl.to({}, { duration: 0.7 })

    // Parallax-style exit - text moves up and fades while scaling slightly
    tl.to(textRef.current, {
      opacity: 0,
      y: -30,
      scale: 1.1,
      duration: 0.6,
      ease: "power2.in"
    })

    // Fade out container
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "power2.in"
    }, "-=0.2")

  }, [onComplete])

  if (!isVisible) return null

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black opacity-0"
      style={{
        background: 'linear-gradient(135deg, #0a0f1c 0%, #000000 50%, #1a1f2e 100%)'
      }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(211, 253, 80, 0.1) 1px, transparent 1px)',
            backgroundSize: 'clamp(20px, 5vw, 30px) clamp(20px, 5vw, 30px)'
          }}
        />
      </div>

      {/* Main text */}
      <div 
        ref={textRef}
        className="relative z-10 text-center px-4"
      >
        <h1 
          className="font-[font2] text-white select-none"
          style={{
            fontSize: 'clamp(3rem, 12vw, 8rem)',
            lineHeight: '1.1',
            letterSpacing: '0.02em',
            textShadow: '0 0 30px rgba(211, 253, 80, 0.3), 0 0 60px rgba(211, 253, 80, 0.1)',
            filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.8))'
          }}
        >
          AMOURA
        </h1>
        
        {/* Subtle accent line */}
        <div 
          className="mx-auto mt-4 sm:mt-6 lg:mt-8 rounded-full"
          style={{
            width: 'clamp(60px, 20vw, 120px)',
            height: 'clamp(1px, 0.3vw, 2px)',
            background: 'linear-gradient(90deg, transparent, rgba(211, 253, 80, 0.6), transparent)',
            boxShadow: '0 0 10px rgba(211, 253, 80, 0.4)'
          }}
        />
      </div>

      {/* Subtle vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.3) 100%)'
        }}
      />
    </div>
  )
}

export default IntroAnimation
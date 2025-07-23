"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

interface CarouselImage {
  id: string
  src: string
  alt: string
}

interface AdvancedCircularCarouselProps {
  images: CarouselImage[]
  autoPlayInterval?: number
}

export function AdvancedCircularCarousel({ images, autoPlayInterval = 3000 }: AdvancedCircularCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [rotationDirection, setRotationDirection] = useState<"left" | "right">("right")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [previousIndex, setPreviousIndex] = useState(0)
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const [initialRotationComplete, setInitialRotationComplete] = useState(false)
  const [rotationCount, setRotationCount] = useState(0)

  // Get the indices for all 5 visible images in circular layout
  const getVisibleIndices = useCallback(() => {
    const total = images.length
    const rearLeft = (currentIndex - 2 + total) % total
    const left = (currentIndex - 1 + total) % total
    const center = currentIndex
    const right = (currentIndex + 1) % total
    const rearRight = (currentIndex + 2) % total

    return { rearLeft, left, center, right, rearRight }
  }, [currentIndex, images.length])

  // Fast rotate function for initial load
  const fastRotateRight = useCallback(() => {
    setRotationDirection("right")
    setCurrentIndex((prev) => {
      const nextIndex = (prev + 1) % images.length
      setRotationCount((count) => count + 1)
      return nextIndex
    })
  }, [images.length])

  // Normal rotate functions
  const rotateRight = useCallback(() => {
    setPreviousIndex(currentIndex)
    setIsTransitioning(true)
    setRotationDirection("right")
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setTimeout(() => setIsTransitioning(false), 1000)
  }, [images.length, currentIndex])

  const rotateLeft = useCallback(() => {
    setPreviousIndex(currentIndex)
    setIsTransitioning(true)
    setRotationDirection("left")
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setTimeout(() => setIsTransitioning(false), 1000)
  }, [images.length, currentIndex])

  // Initial fast rotation effect
  useEffect(() => {
    if (isInitialLoad && images.length > 1) {
      const fastRotationInterval = setInterval(() => {
        fastRotateRight()
      }, 300) // Fast card-like rotation

      return () => clearInterval(fastRotationInterval)
    }
  }, [isInitialLoad, images.length, fastRotateRight])

  // Check if we've completed one full rotation
  useEffect(() => {
    if (isInitialLoad && rotationCount >= images.length) {
      setCurrentIndex(0) // Go to first image
      setIsInitialLoad(false)
      setTimeout(() => {
        setInitialRotationComplete(true)
      }, 500)
    }
  }, [rotationCount, images.length, isInitialLoad])

  // Normal auto-play functionality
  useEffect(() => {
    if (!isInitialLoad && initialRotationComplete && !isHovered && images.length > 1) {
      const interval = setInterval(rotateRight, autoPlayInterval)
      return () => clearInterval(interval)
    }
  }, [isInitialLoad, initialRotationComplete, isHovered, rotateRight, autoPlayInterval, images.length])

  if (images.length === 0) return null

  const { rearLeft, left, center, right, rearRight } = getVisibleIndices()

  // Helper function to get center image fade effects (only for normal rotation)
  const getCenterImageEffect = (imageIndex: number, position: string) => {
    if (isInitialLoad || !isTransitioning) return "opacity-100"

    // Current center image leaving
    if (imageIndex === previousIndex && position === "center") {
      return rotationDirection === "right"
        ? "opacity-0 transform translate-x-16 scale-95"
        : "opacity-0 transform -translate-x-16 scale-95"
    }

    // New image becoming center
    if (imageIndex === currentIndex && position === "center") {
      return "opacity-100 transform translate-x-0 scale-100"
    }

    // Images transitioning to center from sides
    if (imageIndex === currentIndex && position !== "center") {
      return rotationDirection === "right"
        ? "opacity-80 transform translate-x-4"
        : "opacity-80 transform -translate-x-4"
    }

    return "opacity-100"
  }

  // Get transition duration and style based on loading state
  const getTransitionClass = () => {
    return isInitialLoad
      ? "transition-all duration-200 ease-linear" // Fast, linear for card effect
      : "transition-all duration-1000 ease-in-out" // Smooth for normal rotation
  }

  return (
    <div
      className="relative w-full max-w-6xl mx-auto py-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-96 md:h-[28rem] flex items-center justify-center">
        {/* Rear Left Image */}
        <div
          className={`absolute ${getTransitionClass()} cursor-pointer`}
          style={{
            transform: "translateX(-320px) translateY(20px) scale(0.6) rotateY(-45deg)",
            zIndex: 1,
          }}
          onClick={!isInitialLoad ? rotateLeft : undefined}
        >
          <div className="relative w-40 h-40 md:w-52 md:h-52">
            <Image
              src={images[rearLeft]?.src || "/placeholder.svg"}
              alt={images[rearLeft]?.alt || "Product"}
              fill
              className={`object-cover rounded-2xl shadow-lg ${getTransitionClass()} blur-sm ${
                isInitialLoad ? "opacity-70" : "opacity-40"
              } hover:opacity-70`}
              sizes="(max-width: 768px) 160px, 208px"
            />
          </div>
        </div>

        {/* Left Image */}
        <div
          className={`absolute ${getTransitionClass()} cursor-pointer hover:scale-105`}
          style={{
            transform: "translateX(-180px) translateY(10px) scale(0.8) rotateY(-25deg)",
            zIndex: 2,
          }}
          onClick={!isInitialLoad ? rotateLeft : undefined}
        >
          <div className="relative w-48 h-48 md:w-64 md:h-64">
            <Image
              src={images[left]?.src || "/placeholder.svg"}
              alt={images[left]?.alt || "Product"}
              fill
              className={`object-cover rounded-2xl shadow-xl ${getTransitionClass()} blur-[1px] ${
                isInitialLoad ? "opacity-85" : getCenterImageEffect(left, "left")
              } hover:opacity-90`}
              sizes="(max-width: 768px) 192px, 256px"
            />
          </div>
        </div>

        {/* Center Image */}
        <div
          className={`relative ${getTransitionClass()}`}
          style={{
            transform: "translateX(0) translateY(0) scale(1)",
            zIndex: 3,
          }}
        >
          <div className="relative w-56 h-56 md:w-80 md:h-80">
            <Image
              src={images[center]?.src || "/placeholder.svg"}
              alt={images[center]?.alt || "Product"}
              fill
              className={`object-cover rounded-3xl shadow-2xl ${getTransitionClass()} ${
                isInitialLoad ? "opacity-100" : getCenterImageEffect(center, "center")
              }`}
              sizes="(max-width: 768px) 224px, 320px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-3xl" />

            {/* Fade overlays only for normal rotation */}
            {!isInitialLoad && isTransitioning && center === previousIndex && (
              <div
                className={`absolute inset-0 bg-gradient-to-r ${
                  rotationDirection === "right" ? "from-transparent to-white/80" : "from-white/80 to-transparent"
                } rounded-3xl transition-all duration-1000 ease-in-out`}
              />
            )}
          </div>
        </div>

        {/* Right Image */}
        <div
          className={`absolute ${getTransitionClass()} cursor-pointer hover:scale-105`}
          style={{
            transform: "translateX(180px) translateY(10px) scale(0.8) rotateY(25deg)",
            zIndex: 2,
          }}
          onClick={!isInitialLoad ? rotateRight : undefined}
        >
          <div className="relative w-48 h-48 md:w-64 md:h-64">
            <Image
              src={images[right]?.src || "/placeholder.svg"}
              alt={images[right]?.alt || "Product"}
              fill
              className={`object-cover rounded-2xl shadow-xl ${getTransitionClass()} blur-[1px] ${
                isInitialLoad ? "opacity-85" : getCenterImageEffect(right, "right")
              } hover:opacity-90`}
              sizes="(max-width: 768px) 192px, 256px"
            />
          </div>
        </div>

        {/* Rear Right Image */}
        <div
          className={`absolute ${getTransitionClass()} cursor-pointer`}
          style={{
            transform: "translateX(320px) translateY(20px) scale(0.6) rotateY(45deg)",
            zIndex: 1,
          }}
          onClick={!isInitialLoad ? rotateRight : undefined}
        >
          <div className="relative w-40 h-40 md:w-52 md:h-52">
            <Image
              src={images[rearRight]?.src || "/placeholder.svg"}
              alt={images[rearRight]?.alt || "Product"}
              fill
              className={`object-cover rounded-2xl shadow-lg ${getTransitionClass()} blur-sm ${
                isInitialLoad ? "opacity-70" : "opacity-40"
              } hover:opacity-70`}
              sizes="(max-width: 768px) 160px, 208px"
            />
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-8 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={!isInitialLoad ? () => setCurrentIndex(index) : undefined}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-slate-800 w-8" : "bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Hints - only show after initial load */}
      {!isInitialLoad && (
        <>
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <div className="text-slate-400 text-sm opacity-0 hover:opacity-100 transition-opacity duration-300 -rotate-90 whitespace-nowrap">
              Click to rotate
            </div>
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <div className="text-slate-400 text-sm opacity-0 hover:opacity-100 transition-opacity duration-300 rotate-90 whitespace-nowrap">
              Click to rotate
            </div>
          </div>
        </>
      )}

      {/* 3D Perspective Helper */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-slate-200/30 to-transparent rounded-full blur-sm" />
    </div>
  )
}

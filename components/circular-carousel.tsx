"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

interface CarouselImage {
  id: string
  src: string
  alt: string
}

interface CircularCarouselProps {
  images: CarouselImage[]
  autoPlayInterval?: number
}

export function CircularCarousel({ images, autoPlayInterval = 1000 }: CircularCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Get the indices for left, center, and right images
  const getVisibleIndices = useCallback(() => {
    const total = images.length
    const leftIndex = (currentIndex - 1 + total) % total
    const centerIndex = currentIndex
    const rightIndex = (currentIndex + 1) % total

    return { leftIndex, centerIndex, rightIndex }
  }, [currentIndex, images.length])

  // Rotate to the next image (clockwise)
  const rotateRight = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  // Rotate to the previous image (counter-clockwise)
  const rotateLeft = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Auto-play functionality
  useEffect(() => {
    if (!isHovered && images.length > 1) {
      const interval = setInterval(rotateRight, autoPlayInterval)
      return () => clearInterval(interval)
    }
  }, [isHovered, rotateRight, autoPlayInterval, images.length])

  if (images.length === 0) return null

  const { leftIndex, centerIndex, rightIndex } = getVisibleIndices()

  return (
    <div
      className="relative w-full max-w-4xl mx-auto py-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center gap-4 md:gap-8">
        {/* Left Image */}
        <div
          className="relative cursor-pointer transition-all duration-500 ease-in-out transform hover:scale-85"
          onClick={rotateLeft}
        >
          <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56">
            <Image
              src={images[leftIndex]?.src || "/placeholder.svg"}
              alt={images[leftIndex]?.alt || "Product"}
              fill
              className="object-cover rounded-2xl transition-all duration-500 ease-in-out scale-80 blur-md opacity-50 hover:opacity-70"
              sizes="(max-width: 768px) 128px, (max-width: 1024px) 192px, 224px"
            />
          </div>
        </div>

        {/* Center Image */}
        <div className="relative z-10 transition-all duration-500 ease-in-out">
          <div className="relative w-48 h-48 md:w-72 md:h-72 lg:w-80 lg:h-80 shadow-2xl">
            <Image
              src={images[centerIndex]?.src || "/placeholder.svg"}
              alt={images[centerIndex]?.alt || "Product"}
              fill
              className="object-cover rounded-3xl transition-all duration-500 ease-in-out scale-100"
              sizes="(max-width: 768px) 192px, (max-width: 1024px) 288px, 320px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-3xl" />
          </div>
        </div>

        {/* Right Image */}
        <div
          className="relative cursor-pointer transition-all duration-500 ease-in-out transform hover:scale-85"
          onClick={rotateRight}
        >
          <div className="relative w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56">
            <Image
              src={images[rightIndex]?.src || "/placeholder.svg"}
              alt={images[rightIndex]?.alt || "Product"}
              fill
              className="object-cover rounded-2xl transition-all duration-500 ease-in-out scale-80 blur-md opacity-50 hover:opacity-70"
              sizes="(max-width: 768px) 128px, (max-width: 1024px) 192px, 224px"
            />
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-slate-800 w-8" : "bg-slate-300 hover:bg-slate-400"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Hints */}
      <div className="absolute inset-y-0 left-0 flex items-center">
        <div className="text-slate-400 text-sm opacity-0 hover:opacity-100 transition-opacity duration-300 -rotate-90 whitespace-nowrap">
          Click to rotate
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <div className="text-slate-400 text-sm opacity-0 hover:opacity-100 transition-opacity duration-300 rotate-90 whitespace-nowrap">
          Click to rotate
        </div>
      </div>
    </div>
  )
}

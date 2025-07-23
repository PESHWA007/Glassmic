"use client"

import { useState, useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Star, ArrowRight, Instagram, Twitter, Facebook, Mail } from "lucide-react"
import { AdvancedCircularCarousel } from "@/components/advanced-circular-carousel"

// 3D Glass Ornament Component with Rotating Light
function GlassOrnament() {
  const lightRef = useRef()

  useFrame((state) => {
    if (lightRef.current) {
      const time = state.clock.getElapsedTime()
      const radius = 3
      lightRef.current.position.x = Math.cos(time * 0.5) * radius
      lightRef.current.position.z = Math.sin(time * 0.5) * radius
      lightRef.current.position.y = 2
      lightRef.current.lookAt(0, 0, 0)
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial
          color="#f8fafc"
          metalness={0.1}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.3]} />
        <meshPhysicalMaterial color="#d4af37" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Rotating Directional Light */}
      <directionalLight ref={lightRef} intensity={1.5} color="#ffffff" castShadow />

      {/* Light helper visualization */}
      <mesh ref={lightRef}>
        <sphereGeometry args={[0.1]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </Float>
  )
}

// Scroll Animation Hook
function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return scrollY
}

// Intersection Observer Hook
function useInView(threshold = 0.1) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, isInView] as const
}

export default function GlassmicLanding() {
  const scrollY = useScrollAnimation()
  const [heroRef, heroInView] = useInView()
  const [carouselRef, carouselInView] = useInView()
  const [productsRef, productsInView] = useInView()
  const [storyRef, storyInView] = useInView()
  const [testimonialsRef, testimonialsInView] = useInView()
  const [ctaRef, ctaInView] = useInView()

  // Scroll to carousel function
  const scrollToCarousel = () => {
    carouselRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const products = [
    {
      category: "Decor",
      image: "/images/golden-curved-candle-holders.png",
      description:
        "Elegant glass sculptures and ornamental pieces that transform any space into a gallery of light and reflection.",
    },
    {
      category: "Furniture",
      image: "/images/multi-tier-glass-serving-stand.png",
      description:
        "Sophisticated glass furniture pieces that blend functionality with artistic expression for modern living.",
    },
    {
      category: "Gifting",
      image: "/images/skull-glass-vases.png",
      description: "Thoughtfully crafted glass gifts that capture precious moments and create lasting memories.",
    },
  ]

  const carouselImages = [
    { id: "1", src: "/images/artistic-glass-shot-holders.png", alt: "Artistic Glass Shot Holders" },
    { id: "2", src: "/images/glass-bowls-metal-stands.png", alt: "Glass Bowls with Metal Stands" },
    { id: "3", src: "/images/fleur-de-lis-glass-bowls.png", alt: "Fleur-de-lis Glass Bowls" },
    { id: "4", src: "/images/amber-storage-containers.png", alt: "Amber Storage Containers" },
    { id: "5", src: "/images/tea-light-holders-wave-stand.png", alt: "Tea Light Holders on Wave Stand" },
    { id: "6", src: "/images/golden-textured-candle-holders.png", alt: "Golden Textured Candle Holders" },
    { id: "7", src: "/images/multi-tier-glass-serving-stand.png", alt: "Multi-tier Glass Serving Stand" },
    { id: "8", src: "/images/blue-storage-jars.png", alt: "Blue Glass Storage Jars" },
    { id: "9", src: "/images/golden-curved-candle-holders.png", alt: "Golden Curved Candle Holders" },
    { id: "10", src: "/images/skull-glass-vases.png", alt: "Skull Glass Vases" },
    { id: "11", src: "/images/artistic-glass-shot-holders.png", alt: "Premium Shot Glass Collection" },
    { id: "12", src: "/images/glass-bowls-metal-stands.png", alt: "Decorative Bowl Collection" },
    { id: "13", src: "/images/fleur-de-lis-glass-bowls.png", alt: "Ornate Glass Bowl Set" },
    { id: "14", src: "/images/amber-storage-containers.png", alt: "Luxury Storage Collection" },
    { id: "15", src: "/images/tea-light-holders-wave-stand.png", alt: "Ambient Lighting Collection" },
    { id: "16", src: "/images/golden-textured-candle-holders.png", alt: "Textured Candle Collection" },
    { id: "17", src: "/images/multi-tier-glass-serving-stand.png", alt: "Elegant Serving Collection" },
    { id: "18", src: "/images/blue-storage-jars.png", alt: "Colored Glass Storage" },
  ]

  const testimonials = [
    {
      name: "Nishant Pawar",
      role: "Interior Designer",
      content: "Glassmic pieces have become the centerpiece of every project. The quality and artistry are unmatched.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Ayush Tiwari",
      role: "Art Collector",
      content: "Each piece tells a story through light and form. Truly exceptional craftsmanship.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Harshwardhan Mehrotra",
      role: "Homeowner",
      content: "The perfect blend of elegance and functionality. These pieces have transformed our home.",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-100/50 to-blue-50/30"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />

        <div className="absolute inset-0 w-full h-full">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <GlassOrnament />
            <Environment preset="studio" />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>

        <div
          className={`relative z-10 text-center transition-all duration-1000 ${
            heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-7xl md:text-9xl font-serif text-slate-800 mb-4 tracking-tight">Glassmic</h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 font-light">Where Glass Becomes Art</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={scrollToCarousel}
              className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
            >
              Explore Collection
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 bg-transparent"
            >
              Customize Yours
            </Button>
          </div>
        </div>
      </section>

      {/* Advanced 3D Circular Carousel - Featured Creations */}
      <section ref={carouselRef} className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${
              carouselInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mb-4">Featured Creations</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Experience our stunning collection in an immersive 3D carousel. Each piece tells a unique story of light,
              form, and artistic excellence.
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${
              carouselInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <AdvancedCircularCarousel images={carouselImages} />
          </div>

          <div
            className={`text-center mt-12 transition-all duration-1000 delay-500 ${
              carouselInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-sm text-slate-500 mb-4">
              Hover to pause • Click sides to navigate • Auto-rotates every 2 seconds
            </p>
            <Button
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 bg-transparent"
            >
              View Full Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* Product Highlights - Our Collections */}
      <section ref={productsRef} className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 delay-200 ${
              productsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mb-4">Our Collections</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Discover our curated selection of premium glass artistry, designed to elevate every space and occasion.
            </p>
          </div>

          <div className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory">
            {products.map((product, index) => (
              <Card
                key={product.category}
                className={`min-w-[350px] md:min-w-[400px] bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 snap-start group ${
                  productsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100 + 400}ms` }}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.category}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-serif text-slate-800 mb-3">{product.category}</h3>
                    <p className="text-slate-600 leading-relaxed">{product.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Story Section */}
      <section ref={storyRef} className="py-20 px-4 md:px-8 bg-gradient-to-r from-slate-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              className={`transition-all duration-1000 ${
                storyInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            >
              <div className="relative">
                <img
                  src="/images/glass-bowls-metal-stands.png"
                  alt="Artisan crafting glass"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-300 ${
                storyInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg p-8">
                <h2 className="text-4xl font-serif text-slate-800 mb-6">Crafted with Passion</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Every Glassmic piece begins with a vision—a moment where light, form, and artistry converge. Our
                  master craftsmen blend traditional techniques with contemporary design, creating pieces that don't
                  just occupy space, but transform it.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  From the first breath of molten glass to the final polish, each creation carries the soul of its maker
                  and the promise of bringing beauty into your world.
                </p>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105">
                  Learn Our Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Product Preview */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-slate-800 mb-6">Experience in 3D</h2>
          <p className="text-lg text-slate-600 mb-12">
            Interact with our pieces in stunning detail. Drag to rotate, scroll to zoom.
          </p>

          <Card className="bg-gradient-to-br from-slate-100 to-blue-50/50 border-0 shadow-xl p-8 rounded-3xl">
            <div className="h-96 bg-white/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-slate-200/50 relative overflow-hidden">
              <img
                src="/images/golden-textured-candle-holders.png"
                alt="3D Product Preview"
                className="w-64 h-64 object-cover rounded-xl opacity-30"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 bg-slate-400 rounded-full animate-pulse" />
                  </div>
                  <p className="text-slate-500 font-medium">3D Model Viewer</p>
                  <p className="text-sm text-slate-400 mt-2">Drag to interact • Scroll to zoom</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="py-20 px-4 md:px-8 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              testimonialsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl font-serif text-slate-800 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-slate-600">
              Discover why discerning customers choose Glassmic for their most important spaces.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.name}
                className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 ${
                  testimonialsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 200 + 200}ms` }}
              >
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold text-slate-800">{testimonial.name}</p>
                      <p className="text-sm text-slate-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section ref={ctaRef} className="py-20 px-4 md:px-8 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${
              ctaInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-5xl font-serif text-slate-800 mb-6">Ready to elevate your space?</h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Transform your environment with pieces that capture light, reflect beauty, and inspire wonder.
            </p>
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white px-12 py-4 rounded-full text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-2xl font-serif mb-4">Glassmic</h3>
              <p className="text-slate-400 leading-relaxed">Where glass becomes art, and art becomes life.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Collections</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Decor
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Furniture
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Gifting
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Custom Orders
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Artisans
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Stay Connected</h4>
              <p className="text-slate-400 mb-4">Subscribe to our newsletter for exclusive pieces and stories.</p>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Your email"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                />
                <Button className="bg-amber-600 hover:bg-amber-700">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-4">
                <Instagram className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
                <Facebook className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">© 2024 Glassmic. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-slate-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

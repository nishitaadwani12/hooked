import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Featured from './components/Featured'
import Catalog from './components/Catalog'
import About from './components/About'
import HowToOrder from './components/HowToOrder'
import Reviews from './components/Reviews'
import OrderForm from './components/OrderForm'
import Footer from './components/Footer'
import { useReducedMotion } from './hooks/useReducedMotion'

export default function App() {
  const [selected, setSelected] = useState(null)
  const reduced = useReducedMotion()

  // Choosing a product anywhere prefills the order form and scrolls to it.
  const handleOrder = (product) => {
    setSelected(product)
    document.getElementById('order')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <div className="relative min-h-screen">
      <div className="grain-overlay" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Featured onOrder={handleOrder} />
        <Catalog onOrder={handleOrder} />
        <About />
        <HowToOrder />
        <Reviews />
        <OrderForm selected={selected} />
      </main>
      <Footer />
    </div>
  )
}

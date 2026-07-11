import { StrictMode, Suspense, lazy, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const ServicesIndex = lazy(() => import('./pages/ServicesIndex.jsx'))
const ServicePage = lazy(() => import('./pages/ServicePage.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Areas = lazy(() => import('./pages/Areas.jsx'))
const Gallery = lazy(() => import('./pages/Gallery.jsx'))
const Reviews = lazy(() => import('./pages/Reviews.jsx'))
const Faqs = lazy(() => import('./pages/Faqs.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Legal = lazy(() => import('./pages/Legal.jsx'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

const Loading = () => (
  <div className="min-h-screen grid place-items-center bg-background">
    <div className="h-10 w-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" aria-label="Loading" />
  </div>
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/services" element={<ServicesIndex />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/areas" element={<Areas />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Legal kind="privacy" />} />
          <Route path="/terms" element={<Legal kind="terms" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
)

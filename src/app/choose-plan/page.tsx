'use client'

import { useEffect } from 'react'

/**
 * Choose Plan redirect page that immediately redirects users to the external application.
 * This handles direct navigation to /choose-plan by redirecting to the external system
 * where the actual plan selection and registration functionality is hosted.
 */
export default function ChoosePlanRedirect() {
  useEffect(() => {
    // Redirect immediately when component mounts
    window.location.replace('https://www.icetracer.com/choose-plan')
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#245789] mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Redirecting to Plan Selection...</h2>
        <p className="text-gray-600">
          If you're not redirected automatically, 
          <a 
            href="https://www.icetracer.com/choose-plan" 
            className="text-[#245789] hover:text-[#CA0015] underline ml-1"
          >
            click here
          </a>
        </p>
      </div>
    </div>
  )
}

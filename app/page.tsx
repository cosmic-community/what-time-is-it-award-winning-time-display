import { getAllDesignData } from '@/lib/cosmic'
import TimeDisplay from '@/components/TimeDisplay'
import Footer from '@/components/Footer'

export default async function HomePage() {
  try {
    // Fetch all design data from Cosmic (server-side)
    const designData = await getAllDesignData();
    
    // Check if we have the required content
    if (!designData.themes.length || !designData.displays.length || 
        !designData.layouts.length || !designData.effects.length) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">⏰ What Time Is It?</h1>
            <p className="text-gray-600 mb-8">Setting up your award-winning time display...</p>
            <p className="text-sm text-gray-500">Please ensure your Cosmic bucket has design content.</p>
          </div>
        </div>
      );
    }

    // Pass all design data to client component for random generation
    return (
      <div className="relative">
        <TimeDisplay designData={designData} />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error loading page:', error);
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-800 mb-4">⏰ What Time Is It?</h1>
          <p className="text-red-600 mb-4">Unable to load time display</p>
          <p className="text-sm text-red-500">Please check your Cosmic configuration.</p>
        </div>
      </div>
    );
  }
}
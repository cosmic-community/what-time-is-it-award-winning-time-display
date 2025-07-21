import { getAllDesignData } from '@/lib/cosmic'
import TimeDisplay from '@/components/TimeDisplay'
import Footer from '@/components/Footer'

export default async function HomePage() {
  try {
    // Fetch all design data from Cosmic
    const designData = await getAllDesignData();
    
    // Check if we have data for all required types
    const hasRequiredData = designData.themes.length > 0 && 
                           designData.displays.length > 0 && 
                           designData.layouts.length > 0 && 
                           designData.effects.length > 0;

    if (!hasRequiredData) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">⏰ What Time Is It?</h1>
            <p className="text-gray-600 mb-8">Setting up your award-winning time display...</p>
            <p className="text-sm text-gray-500">Please ensure your Cosmic bucket has design content.</p>
            <div className="mt-4 text-xs text-gray-400">
              <div>Themes: {designData.themes.length}</div>
              <div>Displays: {designData.displays.length}</div>
              <div>Layouts: {designData.layouts.length}</div>
              <div>Effects: {designData.effects.length}</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="relative">
        <TimeDisplay 
          themes={designData.themes}
          displays={designData.displays}
          layouts={designData.layouts}
          effects={designData.effects}
        />
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
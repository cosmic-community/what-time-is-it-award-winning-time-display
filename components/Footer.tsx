export default function Footer() {
  return (
    <footer className="fixed bottom-4 left-4 z-10">
      <div className="bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2">
        <p className="text-white/70 text-sm font-mono">
          Powered by{' '}
          <a 
            href="https://www.cosmicjs.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/90 hover:text-white transition-colors"
          >
            Cosmic
          </a>
        </p>
      </div>
    </footer>
  );
}
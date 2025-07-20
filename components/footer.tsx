export function Footer() {
  return (
    <footer className="bg-black text-white py-8 mt-auto">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">TEXT-ESCAPE</h3>
          <p className="text-gray-400 text-sm">
            텍스트 기반 방탈출 게임의 세계에 오신 것을 환영합니다
          </p>
        </div>
        
        <div className="border-t border-gray-800 pt-4">
          <p className="text-gray-300">
            Contact: <a 
              href="mailto:textescape42@gmail.com" 
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              textescape42@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
} 
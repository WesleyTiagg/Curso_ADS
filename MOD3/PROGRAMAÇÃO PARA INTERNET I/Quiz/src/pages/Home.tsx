// src/pages/Home.tsx

import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-quiz-dark flex flex-col items-center justify-center p-6 text-center">

      <div className="mb-10">
        <h1 className="text-quiz-yellow text-7xl font-black italic">
          QUIZ
        </h1>
      </div>

      <p className="text-white text-lg max-w-sm mb-10">
        Teste seus conhecimentos com perguntas dinâmicas!
      </p>

      <div className="flex flex-col gap-4 w-full max-w-xs">

        <button
          onClick={() => navigate('/quiz')}
          className="bg-quiz-yellow text-black py-4 rounded-full text-xl font-bold hover:scale-105 transition-all"
        >
          Começar
        </button>

        <button
          onClick={() => navigate('/admin')}
          className="bg-quiz-purple text-white py-4 rounded-full text-xl font-bold hover:scale-105 transition-all"
        >
          Criar Perguntas
        </button>

      </div>
    </div>
  )
}
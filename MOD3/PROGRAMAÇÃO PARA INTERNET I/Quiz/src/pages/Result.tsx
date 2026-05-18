// src/pages/Result.tsx

import { Navigate, useLocation, useNavigate } from 'react-router-dom'

export default function Result() {

  const location = useLocation()
  const navigate = useNavigate()

  if (!location.state) {
    return <Navigate to="/" />
  }

  const { acertos, erros, total } = location.state

  const porcentagem = Math.round((acertos / total) * 100)

  let mensagem = ''

  if (porcentagem >= 80) {
    mensagem = 'Excelente desempenho!'
  } else if (porcentagem >= 50) {
    mensagem = 'Bom trabalho! Continue praticando!'
  } else {
    mensagem = 'Não desista! Você consegue melhorar!'
  }

  return (
    <div className="min-h-screen bg-quiz-dark flex items-center justify-center p-6">

      <div className="bg-quiz-purple p-8 rounded-quiz w-full max-w-md text-center shadow-xl">

        <h1 className="text-quiz-yellow text-5xl font-black mb-8">
          Resultado
        </h1>

        <div className="space-y-4 text-white text-xl">

          <p>
            Acertos: <strong>{acertos}</strong>
          </p>

          <p>
            Erros: <strong>{erros}</strong>
          </p>

          <p>
            Aproveitamento: <strong>{porcentagem}%</strong>
          </p>

        </div>

        <p className="text-quiz-yellow text-xl font-bold mt-8">
          {mensagem}
        </p>

        <button
          onClick={() => navigate('/')}
          className="mt-8 w-full bg-quiz-yellow text-black py-4 rounded-full font-bold hover:scale-105 transition-all"
        >
          Voltar ao início
        </button>

      </div>
    </div>
  )
}
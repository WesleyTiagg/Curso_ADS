// src/pages/Quiz.tsx

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Question } from '../types/Question'

export default function Quiz() {

  const [quizData, setQuizData] = useState<Question[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [score, setScore] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    const savedQuestions = localStorage.getItem('@quiz_questions')

    if (savedQuestions) {
      setQuizData(JSON.parse(savedQuestions))
    }
  }, [])

  if (quizData.length === 0) {
    return (
      <div className="min-h-screen bg-quiz-dark flex items-center justify-center p-6">
        <div className="text-center">

          <h1 className="text-quiz-yellow text-3xl font-black mb-4">
            Nenhuma pergunta cadastrada
          </h1>

          <p className="text-white">
            Vá para a tela de administração e crie perguntas.
          </p>

        </div>
      </div>
    )
  }

  const currentQuiz = quizData[currentStep]

  const handleAnswer = (option: string) => {

    let newScore = score

    if (option === currentQuiz.answer) {
      newScore = score + 1
      setScore(newScore)
    }

    const nextStep = currentStep + 1

    if (nextStep < quizData.length) {

      setCurrentStep(nextStep)

    } else {

      navigate('/resultado', {
        state: {
          acertos: newScore,
          erros: quizData.length - newScore,
          total: quizData.length
        }
      })
    }
  }

  return (
    <div className="min-h-screen bg-quiz-dark flex flex-col items-center p-6 pt-12">

      <h1 className="text-quiz-yellow text-3xl font-black italic mb-8">
        QUIZ
      </h1>

      <div className="w-full max-w-md">

        <div className="mb-6">

          <div className="w-full bg-gray-300 rounded-full h-3">

            <div
              className="bg-quiz-yellow h-3 rounded-full transition-all"
              style={{
                width: `${((currentStep + 1) / quizData.length) * 100}%`
              }}
            />

          </div>

        </div>

        <div className="bg-white p-8 rounded-t-quiz shadow-xl">

          <h2 className="text-black text-xl font-bold">
            {currentQuiz.question}
          </h2>

        </div>

        <div className="bg-quiz-purple p-6 rounded-b-quiz space-y-4">

          {currentQuiz.options.map((option, index) => (

            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="w-full bg-white text-black py-4 px-6 rounded-full font-bold hover:bg-quiz-yellow transition-all active:scale-95"
            >
              {option}
            </button>

          ))}

        </div>

        <p className="text-white text-center mt-6">
          Pergunta {currentStep + 1} de {quizData.length}
        </p>

      </div>
    </div>
  )
}
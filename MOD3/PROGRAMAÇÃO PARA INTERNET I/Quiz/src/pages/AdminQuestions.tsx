// src/pages/AdminQuestions.tsx

import { useEffect, useState } from 'react'
import { Question } from '../types/Question'

export default function AdminQuestions() {

  const [questions, setQuestions] = useState<Question[]>([])
  const [newQuestion, setNewQuestion] = useState('')
  const [options, setOptions] = useState(['', '', '', ''])
  const [correctAnswer, setCorrectAnswer] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('@quiz_questions')

    if (saved) {
      setQuestions(JSON.parse(saved))
    }
  }, [])

  const handleOptionChange = (value: string, index: number) => {
    const updatedOptions = [...options]
    updatedOptions[index] = value
    setOptions(updatedOptions)
  }

  const handleSave = () => {

    if (
      !newQuestion ||
      options.some(option => option.trim() === '') ||
      !correctAnswer
    ) {
      alert('Preencha todos os campos')
      return
    }

    const questionData: Question = {
      id: Date.now(),
      question: newQuestion,
      options,
      answer: correctAnswer
    }

    const updatedQuestions = [...questions, questionData]

    setQuestions(updatedQuestions)

    localStorage.setItem(
      '@quiz_questions',
      JSON.stringify(updatedQuestions)
    )

    setNewQuestion('')
    setOptions(['', '', '', ''])
    setCorrectAnswer('')

    alert('Pergunta salva com sucesso!')
  }

  return (
    <div className="min-h-screen bg-quiz-dark p-6 flex justify-center">

      <div className="w-full max-w-xl">

        <h1 className="text-quiz-yellow text-4xl font-black mb-8 text-center">
          Criar Perguntas
        </h1>

        <div className="bg-quiz-purple p-8 rounded-quiz space-y-4 shadow-xl">

          <input
            type="text"
            placeholder="Digite a pergunta"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="w-full p-4 rounded-xl text-black"
          />

          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Opção ${index + 1}`}
              value={option}
              onChange={(e) =>
                handleOptionChange(e.target.value, index)
              }
              className="w-full p-4 rounded-xl text-black"
            />
          ))}

          <select
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="w-full p-4 rounded-xl text-black"
          >
            <option value="">
              Selecione a resposta correta
            </option>

            {options.map((option, index) => (
              <option
                key={index}
                value={option}
              >
                {option || `Opção ${index + 1}`}
              </option>
            ))}
          </select>

          <button
            onClick={handleSave}
            className="w-full bg-quiz-yellow text-black py-4 rounded-full font-bold text-lg hover:scale-105 transition-all"
          >
            Salvar Pergunta
          </button>

        </div>

      </div>
    </div>
  )
}
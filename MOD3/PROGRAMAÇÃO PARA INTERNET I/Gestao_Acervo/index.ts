//Atividade Prática: Gestão de Acervo Digital com TypeScript
//Aluno: Wesley Tiago Medeiros Lustosa
//Disciplina: Programação para Internet I
//Prof: Jeferson do Nascimento Soares

type ID = number | string

// Interface principal
interface Livro {
  id: ID
  titulo: string
  autor: string
  anoPublicacao: number
  disponivel: boolean
  tags: string[]
}

// Mock de dados
const acervo: Livro[] = [
  {
    id: 1,
    titulo: "Biblioteca da Meia Noite",
    autor: "Matt Haig",
    anoPublicacao: 2025,
    disponivel: true,
    tags: ["Romance", "Mistério"]
  },
  {
    id: "2A",
    titulo: "O Hobbit",
    autor: "J.R.R. Tolkien",
    anoPublicacao: 1937,
    disponivel: false,
    tags: ["Ficção", "Fantasia"]
  }
]

function buscarPorId(id: ID) {
  return acervo.find(livro => livro.id === id)
}

function atualizarLivro(id: ID, dados: Partial<Livro>): Livro | undefined {
  const livro = buscarPorId(id)

  if (!livro) return undefined

  Object.assign(livro, dados)

  return livro
}

type LivroResumo = Omit<Livro, "id" | "disponivel">

type Categoria = "Romance" | "Ficção" | "Design"

const livrosCategoria: Record<Categoria, LivroResumo[]> = {
  "Romance": [],
  "Ficção": [],
  "Design": []
}

function orgaCategoria() {
  acervo.forEach(livro => {
    const resumo: LivroResumo = {
      titulo: livro.titulo,
      autor: livro.autor,
      anoPublicacao: livro.anoPublicacao,
      tags: livro.tags
    }

    livro.tags.forEach(tag => {
      if (tag in livrosCategoria) {
        livrosCategoria[tag as Categoria].push(resumo)
      }
    })
  })
}

// 1. Busca livro
let livro = buscarPorId(1)

// 2. Atualizar disponibilidade
if (livro) {
  atualizarLivro(livro.id, { disponivel: false })
}

// 3. Gerar resumo
let resumo: LivroResumo = {
  titulo: livro!.titulo,
  autor: livro!.autor,
  anoPublicacao: livro!.anoPublicacao,
  tags: livro!.tags
}

// 4. Organizar por categoria
orgaCategoria()

console.log(resumo)
console.log(livrosCategoria)
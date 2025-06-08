import { useState } from 'react'
import ProductList from './components/ProductList'

function ProductForm({ onSuccess, onClose }: { onSuccess: () => void; onClose: () => void }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          price: parseFloat(price),
          stockQuantity: parseInt(quantity, 10),
          description,
        }),
      })
      if (!response.ok) throw new Error('Erro ao cadastrar produto')
      setName('')
      setPrice('')
      setQuantity('')
      setDescription('')
      onSuccess()
      onClose()
    } catch {
      setError('Erro ao cadastrar produto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">Produto</label>
        <input
          className="border border-gray-300 rounded px-2 py-1 w-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Preço</label>
        <input
          className="border border-gray-300 rounded px-2 py-1 w-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="number"
          step="0.01"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Quantidade</label>
        <input
          className="border border-gray-300 rounded px-2 py-1 w-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="number"
          min="0"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Descrição</label>
        <textarea
          className="border border-gray-300 rounded px-2 py-1 w-full bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={2}
        />
      </div>
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          onClick={onClose}
        >
          Fechar
        </button>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          disabled={loading}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </div>
      {error && <span className="text-red-500">{error}</span>}
    </form>
  )
}

export default function App() {
  const [showModal, setShowModal] = useState(false)
  const [refresh, setRefresh] = useState(0)

  return (
    <div className="flex h-screen w-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col h-full z-10">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <span className="text-2xl font-extrabold text-indigo-600 tracking-tight">Stockya</span>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="block py-2 px-4 rounded-md text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 font-medium transition-all"
              >
                Estoque
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-10">
        <h1 className="text-3xl font-bold mb-6 text-indigo-900">Produtos em Estoque</h1>

        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          {/* Botão de cadastrar produto */}
          <div className="flex justify-end mb-4">
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-indigo-700 transition"
              onClick={() => setShowModal(true)}
            >
              Cadastrar Produto
            </button>
          </div>

          <ProductList key={refresh} />

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative z-50">
                <h2 className="text-xl font-bold mb-4">Cadastrar Produto</h2>
                <ProductForm
                  onSuccess={() => setRefresh(r => r + 1)}
                  onClose={() => setShowModal(false)}
                />
              </div>
              {/* Clique fora do modal fecha */}
              <div
                className="fixed inset-0"
                onClick={() => setShowModal(false)}
                style={{ zIndex: 40 }}
              />
            </div>
          )}
        </div>

        <p className="mt-10 text-center text-gray-400 text-sm italic">
          Stockya está em desenvolvimento.
        </p>
      </main>
    </div>
  )
}

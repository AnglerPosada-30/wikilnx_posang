import { useState } from 'react'
import { Book, Shield, Terminal, Key, Package, Globe, Bot } from 'lucide-react'

function App() {
  // Estado para controlar qué sección se está viendo
  const [seccionActiva, setSeccionActiva] = useState('inicio')

  // Nuestro menú de navegación
  const menu = [
    { id: 'inicio', titulo: 'Inicio', icono: <Book size={20} /> },
    { id: 'licencias', titulo: 'Licencias', icono: <Shield size={20} /> },
    { id: 'instalacion', titulo: 'Instalación', icono: <Terminal size={20} /> },
    { id: 'permisos', titulo: 'Permisos', icono: <Key size={20} /> },
    { id: 'paquetes', titulo: 'Gestor de Paquetes', icono: <Package size={20} /> },
    { id: 'nginx', titulo: 'Nginx y Despliegue', icono: <Globe size={20} /> },
    { id: 'prompts', titulo: 'Bitácora IA', icono: <Bot size={20} /> },
  ]

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Barra Lateral (Sidebar) */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-10">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-blue-400">Wiki Linux Server</h1>
          <p className="text-slate-400 text-sm mt-1">Sistemas Operativos (TI3V35)</p>
          <p className="text-slate-500 text-xs mt-1">Cód: wikilnx_posang</p>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => setSeccionActiva(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                seccionActiva === item.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icono}
              <span className="font-medium">{item.titulo}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Área de Contenido Principal */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-10">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 min-h-[80vh]">
            <h2 className="text-3xl font-bold text-slate-800 mb-6 border-b pb-4">
              {menu.find(m => m.id === seccionActiva)?.titulo}
            </h2>
            
            <div className="text-slate-600">
              <p>El componente para la sección <strong>{seccionActiva}</strong> se renderizará aquí.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
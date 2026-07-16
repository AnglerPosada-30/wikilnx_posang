import { useState } from 'react'
import { Book, Shield, Terminal, Key, Package, Globe, Bot, Menu, X } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

import inicioMd from './docs_posang/01_inicio_posang.md?raw'
import licenciasMd from './docs_posang/02_licencias_posang.md?raw'
import instalacionMd from './docs_posang/03_instalacion_posang.md?raw'
import permisosMd from './docs_posang/04_permisos_posang.md?raw'
import paquetesMd from './docs_posang/05_paquetes_posang.md?raw'
import nginxMd from './docs_posang/06_nginx_posang.md?raw'
import promptsMd from './docs_posang/07_prompts_posang.md?raw'
import desafioMd from './docs_posang/08_desafio_posang.md?raw'

function App() {
  const [seccionActiva, setSeccionActiva] = useState('inicio')
  // Nuevo estado para controlar abrir/cerrar el menú
  const [menuAbierto, setMenuAbierto] = useState(true)

  const menu = [
    { id: 'inicio', titulo: 'Inicio y Visión', icono: <Book size={20} />, contenido: inicioMd },
    { id: 'licencias', titulo: 'Licencias', icono: <Shield size={20} />, contenido: licenciasMd },
    { id: 'instalacion', titulo: 'Instalación', icono: <Terminal size={20} />, contenido: instalacionMd },
    { id: 'permisos', titulo: 'Permisos', icono: <Key size={20} />, contenido: permisosMd },
    { id: 'paquetes', titulo: 'Gestor de Paquetes', icono: <Package size={20} />, contenido: paquetesMd },
    { id: 'nginx', titulo: 'Nginx y Despliegue', icono: <Globe size={20} />, contenido: nginxMd },
    { id: 'prompts', titulo: 'Bitácora IA', icono: <Bot size={20} />, contenido: promptsMd },
    { id: 'desafio', titulo: 'Desafío Extra', icono: <Globe size={20} />, contenido: desafioMd },
  ]

  const seccionActual = menu.find(m => m.id === seccionActiva)

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      
      {/* --- MENÚ LATERAL (SIDEBAR) --- */}
      {/* Usamos w-0 y overflow-hidden para ocultarlo suavemente cuando menuAbierto es falso */}
      <aside className={`bg-slate-900 text-white shadow-2xl z-20 transition-all duration-300 ease-in-out flex-shrink-0 ${menuAbierto ? 'w-72' : 'w-0'} overflow-hidden`}>
        {/* Contenedor interno fijo de 72 para que el texto no se aplaste al cerrar */}
        <div className="w-72 h-full flex flex-col">
          <div className="p-6 border-b border-slate-800">
            <h1 className="text-2xl font-bold text-blue-400">Wiki Linux</h1>
            <p className="text-slate-400 text-sm mt-1">Sistemas Operativos (TI3V35)</p>
            <div className="mt-4 inline-block bg-slate-800 px-3 py-1 rounded text-xs text-blue-300 font-mono">
              ID: wikilnx_posang
            </div>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
            {menu.map((item) => (
              <button
                key={item.id}
                onClick={() => setSeccionActiva(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                  seccionActiva === item.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                {item.icono}
                <span className="font-medium">{item.titulo}</span>
              </button>
            ))}
          </nav>

          {/* --- BOTÓN DE GITHUB (SVG Nativo) --- */}
          <div className="p-4 border-t border-slate-800">
            <a 
              href="https://github.com/AnglerPosada-30/wikilnx_posang" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-4 py-3 rounded-lg transition-all duration-200 border border-slate-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
              <span className="font-medium text-sm">Ver Repositorio</span>
            </a>
          </div>
        </div>
      </aside>

      {/* --- PANEL PRINCIPAL --- */}
      <main className="flex-1 flex flex-col h-screen min-w-0 bg-slate-50">
        
        {/* Barra superior con el botón hamburguesa */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center shadow-sm z-10">
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-100"
            title={menuAbierto ? "Ocultar menú" : "Mostrar menú"}
          >
            {menuAbierto ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Título de la sección actual (visible principalmente cuando el menú está cerrado) */}
          <span className="ml-4 font-semibold text-slate-700">
            {seccionActual?.titulo}
          </span>
        </header>

        {/* Visor Markdown */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-12">
          <div className="max-w-4xl mx-auto bg-white p-8 lg:p-10 rounded-2xl shadow-sm border border-slate-200 min-h-[85vh]">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-4xl font-extrabold mt-2 mb-6 text-slate-800 border-b pb-4" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-10 mb-4 text-blue-700" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-6 mb-3 text-slate-700" {...props} />,
                p: ({node, ...props}) => <p className="mb-5 text-slate-600 leading-relaxed" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-5 text-slate-600 space-y-2" {...props} />,
                li: ({node, ...props}) => <li className="pl-1" {...props} />,
                strong: ({node, ...props}) => <strong className="font-semibold text-slate-800" {...props} />,
                img: ({node, ...props}) => <img className="rounded-xl shadow-md my-8 mx-auto border border-slate-200" alt={props.alt} {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-blue-500 pl-4 py-1 italic text-slate-500 my-6 bg-blue-50/50 rounded-r-lg" {...props} />,
                code: ({node, inline, ...props}) =>
                  inline
                    ? <code className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded-md text-sm font-mono border border-slate-200" {...props} />
                    : <div className="rounded-xl overflow-hidden my-6 border border-slate-800 shadow-lg"><div className="bg-slate-800 text-slate-400 px-4 py-2 text-xs border-b border-slate-700 flex justify-between"><span>Terminal / Código</span></div><code className="block bg-slate-900 text-green-400 p-5 overflow-x-auto text-sm font-mono leading-relaxed" {...props} /></div>
              }}
            >
              {seccionActual.contenido}
            </ReactMarkdown>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
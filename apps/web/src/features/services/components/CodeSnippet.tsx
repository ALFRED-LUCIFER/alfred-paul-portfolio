import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check } from 'lucide-react'

const SNIPPET = `// AI-Powered RAG Chatbot — Qwen + LangChain
from langchain.chains import RetrievalQA
from langchain_community.llms import Ollama

def create_rag_pipeline(vectorstore):
    llm = Ollama(model="qwen2.5", temperature=0.1)
    return RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=vectorstore.as_retriever(
            search_kwargs={"k": 5}
        ),
    )

# 40% productivity boost via AI-assisted dev
# 60% faster release cycles with DevOps pipelines`

const drakeTheme = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: 'rgba(13, 17, 23, 0.8)',
    borderRadius: '0',
    margin: 0,
    padding: '1.25rem',
    fontSize: '0.78rem',
    lineHeight: '1.6',
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: 'none',
  },
  keyword: { color: '#28e98c' },
  'class-name': { color: '#79c0ff' },
  function: { color: '#d2a8ff' },
  string: { color: '#a5d6ff' },
  comment: { color: '#8b949e', fontStyle: 'italic' },
  number: { color: '#f78166' },
}

export function CodeSnippet() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(SNIPPET)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl overflow-hidden border border-primary/20 shadow-lg"
      style={{ boxShadow: '0 0 30px rgba(40, 233, 140, 0.08)' }}>
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-primary/20">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="text-xs text-muted-foreground font-mono ml-2">rag_pipeline.py</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
        >
          {copied ? <Check size={12} className="text-primary" /> : <Copy size={12} />}
          {copied ? 'copied!' : 'copy'}
        </button>
      </div>
      <SyntaxHighlighter language="python" style={drakeTheme} wrapLines>
        {SNIPPET}
      </SyntaxHighlighter>
    </div>
  )
}

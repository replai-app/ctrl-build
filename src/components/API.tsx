'use client';

import { useState, useEffect, useRef } from 'react';
import { Copy, Check, CaretDown } from 'phosphor-react';

export default function API() {
  const [activeTab, setActiveTab] = useState('curl');
  const [copied, setCopied] = useState<string | null>(null);
  const [terminalStep, setTerminalStep] = useState(0);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showLatencyMetrics, setShowLatencyMetrics] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const terminalSteps = [
    { text: '$ curl -X POST https://api.ctrl-build.com/v1/refine \\', delay: 0 },
    { text: '  -H "Authorization: Bearer YOUR_API_KEY" \\', delay: 1000 },
    { text: '  -H "Content-Type: application/json" \\', delay: 2000 },
    { text: '  -d \'{"text": "Your text here", "tone": "academic"}\'', delay: 3000 },
    { text: '', delay: 4000 },
    { text: '...', delay: 4500 },
    { text: '', delay: 5000 },
    { text: '{', delay: 5500 },
    { text: '  "status": "success",', delay: 6000 },
    { text: '  "variance_score": 0.98', delay: 6500 },
    { text: '}', delay: 7000 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTerminalStep((prev) => {
        if (prev >= terminalSteps.length - 1) {
          return 0;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalStep]);

  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const codeExamples = {
    curl: `curl -X POST https://api.ctrl-build.com/v1/refine \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Your text here", "tone": "academic"}'`,
    python: `import requests

url = "https://api.ctrl-build.com/v1/refine"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}
data = {
    "text": "Your text here",
    "tone": "academic"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`,
    nodejs: `const fetch = require('node-fetch');

const url = 'https://api.ctrl-build.com/v1/refine';
const options = {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: 'Your text here',
    tone: 'academic'
  })
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json));`,
    go: `package main

import (
    "bytes"
    "encoding/json"
    "net/http"
)

func main() {
    url := "https://api.ctrl-build.com/v1/refine"
    data := map[string]string{
        "text": "Your text here",
        "tone": "academic",
    }
    jsonData, _ := json.Marshal(data)
    
    req, _ := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
    req.Header.Set("Authorization", "Bearer YOUR_API_KEY")
    req.Header.Set("Content-Type", "application/json")
    
    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
}`,
  };

  const endpoints = [
    {
      id: 'refine',
      method: 'POST',
      path: '/v1/refine',
      title: '/REFINE',
      description: 'The core engine. Accepts raw string, returns humanized output.',
      param: 'tone=[academic, executive, casual]',
    },
    {
      id: 'detect',
      method: 'POST',
      path: '/v1/detect',
      title: '/DETECT',
      description: 'Pre-flight check. Scans text against GPTZero and Turnitin vectors to predict detection probability.',
      param: null,
    },
    {
      id: 'batch',
      method: 'POST',
      path: '/v1/batch',
      title: '/BATCH',
      description: 'High-volume processing. Upload CSV, receive callback via Webhook upon completion.',
      param: null,
    },
    {
      id: 'usage',
      method: 'GET',
      path: '/v1/usage',
      title: '/USAGE',
      description: 'Real-time token monitoring and cost analysis.',
      param: null,
    },
  ];

  const displayedTerminalText = terminalSteps
    .slice(0, terminalStep + 1)
    .map((step) => step.text)
    .join('\n');

  return (
    <div className="flex min-h-screen bg-[#1A1A1A] text-white">
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 z-50 border-b border-solid border-white/10 bg-[#1A1A1A] lg:hidden">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="flex w-full items-center justify-between p-4 font-['SpaceMono'] text-xs uppercase text-white"
          >
            <span>JUMP TO</span>
            <CaretDown size={16} className={showMobileMenu ? 'rotate-180' : ''} />
          </button>
          {showMobileMenu && (
            <nav className="border-t border-solid border-white/10 p-4">
              <a
                href="#hero"
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 font-['SpaceMono'] text-xs uppercase text-white/70 transition-colors hover:text-[#0047FF]"
              >
                OVERVIEW
              </a>
              <a
                href="#endpoints"
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 font-['SpaceMono'] text-xs uppercase text-white/70 transition-colors hover:text-[#0047FF]"
              >
                ENDPOINTS
              </a>
              <a
                href="#integration"
                onClick={() => setShowMobileMenu(false)}
                className="block py-2 font-['SpaceMono'] text-xs uppercase text-white/70 transition-colors hover:text-[#0047FF]"
              >
                INTEGRATION
              </a>
            </nav>
          )}
        </div>
      )}

      <aside className="hidden w-[25%] border-r border-solid border-white/10 bg-[#1A1A1A] lg:block">
        <div className="sticky top-0 flex h-screen flex-col p-8">
          <div className="mb-8">
            <h2 className="mb-4 font-['PPEditorialNew'] text-2xl font-extralight text-white">
              API
            </h2>
            <nav className="space-y-2">
              <a
                href="#hero"
                className="block font-['SpaceMono'] text-xs uppercase text-white/70 transition-colors hover:text-[#0047FF]"
              >
                OVERVIEW
              </a>
              <a
                href="#endpoints"
                className="block font-['SpaceMono'] text-xs uppercase text-white/70 transition-colors hover:text-[#0047FF]"
              >
                ENDPOINTS
              </a>
              <a
                href="#integration"
                className="block font-['SpaceMono'] text-xs uppercase text-white/70 transition-colors hover:text-[#0047FF]"
              >
                INTEGRATION
              </a>
            </nav>
          </div>

          <div className="mt-auto border-t border-solid border-white/10 pt-8">
            <div
              className="mb-2 cursor-pointer"
              onMouseEnter={() => setShowLatencyMetrics(true)}
              onMouseLeave={() => setShowLatencyMetrics(false)}
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                <p className="font-['SpaceMono'] text-xs uppercase text-white/70">
                  SYSTEM STATUS: OPERATIONAL (99.99%)
                </p>
              </div>
              {showLatencyMetrics && (
                <div className="mt-4 border border-solid border-white/20 bg-[#0A0A0A] p-4">
                  <p className="mb-3 font-['SpaceMono'] text-xs uppercase text-white/50">
                    LATENCY METRICS (24H)
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-['SpaceMono'] text-xs text-white/70">AVG</span>
                      <span className="font-['SpaceMono'] text-xs text-[#0047FF]">142ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-['SpaceMono'] text-xs text-white/70">P95</span>
                      <span className="font-['SpaceMono'] text-xs text-[#0047FF]">298ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-['SpaceMono'] text-xs text-white/70">P99</span>
                      <span className="font-['SpaceMono'] text-xs text-[#0047FF]">412ms</span>
                    </div>
                    <div className="mt-3 h-16 border border-solid border-white/10 bg-[#1A1A1A] p-2">
                      <div className="flex h-full items-end gap-1">
                        {[65, 72, 58, 81, 69, 74, 88, 76, 82, 71, 79, 85].map((height, i) => (
                          <div
                            key={i}
                            className="flex-1 bg-[#0047FF]"
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 overflow-y-auto pt-16 lg:pt-0">
        <div className="mx-auto max-w-4xl px-6 py-12 md:px-12 lg:px-16">
          <section id="hero" className="mb-24">
            <h1 className="mb-4 font-['PPEditorialNew'] text-5xl font-extralight leading-tight text-white md:text-6xl">
              Direct Neural Access.
            </h1>
            <p className="mb-12 font-['SpaceMono'] text-sm text-white/70">
              Integrate the cadence engine directly into your CMS, app, or workflow. &lt; 500ms latency.
            </p>

            {isMobile ? (
              <div className="border border-solid border-white/20 bg-[#0A0A0A] p-6">
                <div className="mb-4 flex items-center justify-between border-b border-solid border-white/10 pb-2">
                  <span className="font-['SpaceMono'] text-xs uppercase text-white/50">
                    bash — 80x24
                  </span>
                </div>
                <div className="font-['SpaceMono'] text-sm leading-relaxed text-white">
                  <pre className="whitespace-pre-wrap text-xs">
{`{
  "status": "success",
  "variance_score": 0.98,
  "refined_text": "Your refined output..."
}`}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="relative border border-solid border-white/20 bg-[#0A0A0A] p-6">
                <div className="mb-4 flex items-center justify-between border-b border-solid border-white/10 pb-2">
                  <span className="font-['SpaceMono'] text-xs uppercase text-white/50">
                    bash — 80x24
                  </span>
                  <button
                    onClick={() => handleCopy(codeExamples.curl, 'terminal')}
                    className="flex items-center gap-2 font-['SpaceMono'] text-xs uppercase text-white/70 transition-colors hover:text-[#0047FF]"
                  >
                    {copied === 'terminal' ? (
                      <>
                        <Check size={16} />
                        COPIED
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        COPY
                      </>
                    )}
                  </button>
                </div>
                <div
                  ref={terminalRef}
                  className="max-h-64 overflow-y-auto font-['SpaceMono'] text-sm leading-relaxed text-white"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  <pre className="whitespace-pre-wrap">{displayedTerminalText}</pre>
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            )}
          </section>

          <section id="endpoints" className="mb-24">
            <h2 className="mb-8 font-['PPEditorialNew'] text-3xl font-extralight text-white">
              Endpoints
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {endpoints.map((endpoint) => (
                <div
                  key={endpoint.id}
                  className="group border border-solid border-white bg-transparent p-6 transition-all hover:border-[#0047FF]"
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-['SpaceMono'] text-xs uppercase text-[#0047FF]">
                      {endpoint.method}
                    </span>
                    <span className="font-['SpaceMono'] text-sm text-white">
                      {endpoint.path}
                    </span>
                  </div>
                  <h3 className="mb-2 font-['SpaceMono'] text-lg font-bold uppercase text-white">
                    {endpoint.title}
                  </h3>
                  <p className="mb-3 font-['SpaceMono'] text-xs text-white/70">
                    {endpoint.description}
                  </p>
                  {endpoint.param && (
                    <p className="font-['SpaceMono'] text-xs text-white/50">
                      Param: {endpoint.param}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section id="integration" className="mb-24">
            <h2 className="mb-8 font-['PPEditorialNew'] text-3xl font-extralight text-white">
              Integration
            </h2>

            <div className="mb-4 flex gap-2 border-b border-solid border-white/10">
              {['curl', 'python', 'nodejs', 'go'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-['SpaceMono'] text-xs uppercase transition-colors ${
                    activeTab === tab
                      ? 'border-b-2 border-solid border-[#0047FF] text-[#0047FF]'
                      : 'text-white/50 hover:text-white/70'
                  }`}
                >
                  {tab === 'nodejs' ? 'NODE.JS' : tab.toUpperCase()}
                </button>
              ))}
            </div>

            {isMobile ? (
              <>
                <button
                  onClick={() => setShowCodeModal(true)}
                  className="w-full border border-solid border-white/20 bg-transparent p-4 font-['SpaceMono'] text-xs uppercase text-white transition-colors hover:bg-white/10"
                >
                  [ VIEW CODE SNIPPET ]
                </button>
                {showCodeModal && (
                  <div className="fixed inset-0 z-50 bg-[#1A1A1A] p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-['SpaceMono'] text-xs uppercase text-white/50">
                        {activeTab === 'nodejs' ? 'NODE.JS' : activeTab.toUpperCase()}
                      </span>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleCopy(codeExamples[activeTab as keyof typeof codeExamples], activeTab)}
                          className="flex items-center gap-2 font-['SpaceMono'] text-xs uppercase text-white/70 transition-colors hover:text-[#0047FF]"
                        >
                          {copied === activeTab ? (
                            <>
                              <Check size={16} />
                              COPIED
                            </>
                          ) : (
                            <>
                              <Copy size={16} />
                              COPY
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => setShowCodeModal(false)}
                          className="font-['SpaceMono'] text-xs uppercase text-white/70 transition-colors hover:text-white"
                        >
                          CLOSE
                        </button>
                      </div>
                    </div>
                    <div className="overflow-x-auto border border-solid border-white/20 bg-[#0A0A0A] p-6">
                      <pre>
                        <code
                          className="font-['SpaceMono'] text-xs leading-relaxed text-white"
                          style={{ fontFamily: 'JetBrains Mono, monospace' }}
                        >
                          {codeExamples[activeTab as keyof typeof codeExamples]
                            .split('\n')
                            .map((line, i) => {
                              const isString = /["'`]/.test(line);
                              const isFunction = /(def |function |func |const |let |var )/.test(line);
                              const isComment = line.trim().startsWith('#') || line.trim().startsWith('//');
                              
                              let className = 'text-white';
                              if (isComment) className = 'text-white/50';
                              else if (isFunction) className = 'text-[#0047FF]';
                              else if (isString) className = 'text-white';
                              
                              return (
                                <span key={i} className={className}>
                                  {line}
                                  {i < codeExamples[activeTab as keyof typeof codeExamples].split('\n').length - 1 && '\n'}
                                </span>
                              );
                            })}
                        </code>
                      </pre>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="relative border border-solid border-white/20 bg-[#0A0A0A]">
                <div className="flex items-center justify-between border-b border-solid border-white/10 p-4">
                  <span className="font-['SpaceMono'] text-xs uppercase text-white/50">
                    {activeTab === 'nodejs' ? 'NODE.JS' : activeTab.toUpperCase()}
                  </span>
                  <button
                    onClick={() => handleCopy(codeExamples[activeTab as keyof typeof codeExamples], activeTab)}
                    className="flex items-center gap-2 font-['SpaceMono'] text-xs uppercase text-white/70 transition-colors hover:text-[#0047FF]"
                  >
                    {copied === activeTab ? (
                      <>
                        <Check size={16} />
                        COPIED
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        COPY
                      </>
                    )}
                  </button>
                </div>
                <pre className="overflow-x-auto p-6">
                  <code
                    className="font-['SpaceMono'] text-sm leading-relaxed text-white"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {codeExamples[activeTab as keyof typeof codeExamples]
                      .split('\n')
                      .map((line, i) => {
                        const isString = /["'`]/.test(line);
                        const isFunction = /(def |function |func |const |let |var )/.test(line);
                        const isComment = line.trim().startsWith('#') || line.trim().startsWith('//');
                        
                        let className = 'text-white';
                        if (isComment) className = 'text-white/50';
                        else if (isFunction) className = 'text-[#0047FF]';
                        else if (isString) className = 'text-white';
                        
                        return (
                          <span key={i} className={className}>
                            {line}
                            {i < codeExamples[activeTab as keyof typeof codeExamples].split('\n').length - 1 && '\n'}
                          </span>
                        );
                      })}
                  </code>
                </pre>
              </div>
            )}
          </section>

        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-solid border-white/10 bg-[#1A1A1A] p-4 text-center lg:hidden">
        <a
          href="/profile"
          className="inline-block w-full border border-solid border-white/20 bg-transparent px-6 py-3 font-['SpaceMono'] text-sm font-bold uppercase text-white transition-colors hover:bg-[#0047FF] hover:border-[#0047FF]"
        >
          GET API KEYS
        </a>
      </div>
    </div>
  );
}

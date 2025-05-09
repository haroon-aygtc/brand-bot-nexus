import React, { useEffect, useState } from 'react';

interface ApiEndpoint {
  name: string;
  method: string;
  url: string;
  description?: string;
  params?: { name: string; type: string; required: boolean; description?: string }[];
  headers?: { name: string; value: string }[];
  exampleRequest?: any;
  exampleResponse?: any;
}

const methodColors: Record<string, string> = {
  GET: 'bg-green-500',
  POST: 'bg-blue-500',
  PUT: 'bg-yellow-500',
  DELETE: 'bg-red-500',
  PATCH: 'bg-purple-500',
};

const ApiTester: React.FC = () => {
  const [apiRegistry, setApiRegistry] = useState<ApiEndpoint[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [search, setSearch] = useState('');
  const [params, setParams] = useState<Record<string, string>>({});
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<string>('');
  const [responseStatus, setResponseStatus] = useState<string>('');
  const [responseTime, setResponseTime] = useState<number>(0);
  const [tab, setTab] = useState<'params' | 'headers' | 'body' | 'response'>('params');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/registry')
      .then(r => r.json())
      .then(setApiRegistry)
      .catch(() => setApiRegistry([]));
  }, []);

  useEffect(() => {
    if (apiRegistry.length > 0) {
      setSelectedIdx(0);
      setParams({});
      setHeaders(
        apiRegistry[0].headers?.reduce((acc, h) => ({ ...acc, [h.name]: h.value }), {}) || {}
      );
      setBody(
        apiRegistry[0].exampleRequest ? JSON.stringify(apiRegistry[0].exampleRequest, null, 2) : ''
      );
      setResponse('');
      setResponseStatus('');
      setResponseTime(0);
    }
  }, [apiRegistry]);

  const selected = apiRegistry[selectedIdx];

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    setParams({});
    setHeaders(
      apiRegistry[idx].headers?.reduce((acc, h) => ({ ...acc, [h.name]: h.value }), {}) || {}
    );
    setBody(
      apiRegistry[idx].exampleRequest ? JSON.stringify(apiRegistry[idx].exampleRequest, null, 2) : ''
    );
    setResponse('');
    setResponseStatus('');
    setResponseTime(0);
  };

  const handleSend = async () => {
    if (!selected) return;
    setLoading(true);
    setResponse('Loading...');
    setResponseStatus('');
    setResponseTime(0);
    let url = selected.url;
    if (selected.method === 'GET' && Object.keys(params).length > 0) {
      const usp = new URLSearchParams(params);
      url += (url.includes('?') ? '&' : '?') + usp.toString();
    }
    const fetchHeaders = { ...headers };
    let fetchBody = undefined;
    if (selected.method !== 'GET' && body) {
      try {
        fetchBody = JSON.stringify(JSON.parse(body));
      } catch {
        setResponse('Invalid JSON in request body');
        setLoading(false);
        return;
      }
    }
    const start = Date.now();
    try {
      const res = await fetch(url, {
        method: selected.method,
        headers: fetchHeaders,
        body: fetchBody,
        credentials: 'include',
      });
      const end = Date.now();
      setResponseTime(end - start);
      setResponseStatus(`${res.status} ${res.statusText}`);
      const text = await res.text();
      try {
        setResponse(JSON.stringify(JSON.parse(text), null, 2));
      } catch {
        setResponse(text);
      }
    } catch (e: any) {
      setResponse('Request failed: ' + e.message);
      setResponseStatus('ERROR');
    }
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-[#181c24] text-[#e5e7eb]">
      {/* Sidebar */}
      <aside className="w-72 bg-[#20232b] p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-6">API Endpoints</h2>
        <input
          className="mb-4 rounded bg-[#181c24] border border-[#2c3142] px-3 py-2 text-sm"
          placeholder="Search endpoints..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="flex-1 overflow-y-auto">
          {apiRegistry
            .filter(ep =>
              ep.url.toLowerCase().includes(search.toLowerCase()) ||
              ep.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((ep, idx) => (
              <button
                key={ep.url + ep.method}
                className={`w-full flex items-center px-3 py-2 rounded mb-2 text-left transition ${
                  selectedIdx === idx ? 'bg-[#23283a] text-white' : 'hover:bg-[#23283a]'
                }`}
                onClick={() => handleSelect(idx)}
              >
                <span className={`method-badge ${methodColors[ep.method] || 'bg-gray-500'} mr-2`}>{ep.method}</span>
                <span className="truncate">{ep.url}</span>
              </button>
            ))}
        </div>
      </aside>
      {/* Main Panel */}
      <main className="flex-1 p-10">
        <div className="bg-[#23283a] rounded-lg p-8 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <span className={`method-badge ${methodColors[selected?.method] || 'bg-gray-500'}`}>{selected?.method}</span>
            <input
              className="flex-1 rounded bg-[#181c24] border border-[#2c3142] px-3 py-2 text-sm"
              value={selected?.url || ''}
              readOnly
            />
            <button
              className="btn btn-primary px-6 py-2 font-semibold"
              onClick={handleSend}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
          <div className="flex gap-6 mb-6 border-b border-[#2c3142] pb-2">
            <button className={`tab-btn ${tab === 'params' ? 'active' : ''}`} onClick={() => setTab('params')}>Params</button>
            <button className={`tab-btn ${tab === 'headers' ? 'active' : ''}`} onClick={() => setTab('headers')}>Headers</button>
            <button className={`tab-btn ${tab === 'body' ? 'active' : ''}`} onClick={() => setTab('body')}>Body</button>
            <button className={`tab-btn ${tab === 'response' ? 'active' : ''}`} onClick={() => setTab('response')}>Response</button>
          </div>
          {/* Params Tab */}
          {tab === 'params' && (
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Query Parameters</h4>
              {selected?.params?.length ? (
                selected.params.map(param => (
                  <div key={param.name} className="flex items-center mb-2">
                    <span className="w-40 text-sm text-[#b3b8c5]">{param.name}{param.required ? ' *' : ''}</span>
                    <input
                      className="flex-1 rounded bg-[#181c24] border border-[#2c3142] px-3 py-2 text-sm"
                      placeholder={param.description || ''}
                      value={params[param.name] || ''}
                      onChange={e => setParams(p => ({ ...p, [param.name]: e.target.value }))}
                    />
                  </div>
                ))
              ) : (
                <div className="text-[#b3b8c5] text-sm">No query parameters</div>
              )}
            </div>
          )}
          {/* Headers Tab */}
          {tab === 'headers' && (
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Headers</h4>
              {selected?.headers?.length ? (
                selected.headers.map(header => (
                  <div key={header.name} className="flex items-center mb-2">
                    <span className="w-40 text-sm text-[#b3b8c5]">{header.name}</span>
                    <input
                      className="flex-1 rounded bg-[#181c24] border border-[#2c3142] px-3 py-2 text-sm"
                      value={headers[header.name] || ''}
                      onChange={e => setHeaders(h => ({ ...h, [header.name]: e.target.value }))}
                    />
                  </div>
                ))
              ) : (
                <div className="text-[#b3b8c5] text-sm">No headers</div>
              )}
            </div>
          )}
          {/* Body Tab */}
          {tab === 'body' && (
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Request Body</h4>
              <textarea
                className="w-full rounded bg-[#181c24] border border-[#2c3142] px-3 py-2 text-sm font-mono"
                rows={8}
                value={body}
                onChange={e => setBody(e.target.value)}
                placeholder="Enter request body (JSON)"
              />
            </div>
          )}
          {/* Response Tab */}
          {tab === 'response' && (
            <div className="mb-6">
              <h4 className="font-semibold mb-2">Response</h4>
              <div className="bg-[#181c24] rounded p-4 relative">
                <button
                  className="absolute top-2 right-2 text-[#4f8cff] hover:text-white"
                  onClick={() => {
                    navigator.clipboard.writeText(response);
                  }}
                >
                  <i className="bi bi-clipboard"></i>
                </button>
                <pre className="whitespace-pre-wrap text-sm font-mono text-[#e5e7eb]">{response || 'Response will appear here...'}</pre>
                {responseStatus && (
                  <div className="mt-2 text-xs text-[#b3b8c5]">
                    <span className="mr-4">Status: {responseStatus}</span>
                    <span>Time: {responseTime} ms</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ApiTester; 
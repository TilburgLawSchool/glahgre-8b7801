'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from 'https://esm.sh/@/lib/api';
interface Content {
  title: string;
  description: string;
}

interface Sample {
  id: number;
  prompt: string;
  response: string;
  is_hallucination: boolean;
  explanation: string;
}

export default function Home() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState<number[]>([]);

  useEffect(() => {
    apiFetch<Sample[]>('/api/samples')
      .then(data => {
        setSamples(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const toggleReveal = (id: number) => {
    if (revealed.includes(id)) {
      setRevealed(revealed.filter(i => i !== id));
    } else {
      setRevealed([...revealed, id]);
    }
  };

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-[#0c2340] text-white py-20">
        <div className="tiu-container">
          <h1 className="text-5xl mb-6 max-w-3xl">Navigating the Truth in the Age of AI</h1>
          <p className="text-xl opacity-90 max-w-2xl leading-relaxed">
            As a Tilburg University student, using AI responsibly is key to your academic success. 
            Learn how to identify when AI "hallucinates" and how to maintain academic integrity.
          </p>
        </div>
      </section>

      {/* Core Concepts */}
      <section className="py-16 tiu-container">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 border border-gray-100 shadow-sm rounded-sm">
            <div className="text-[#b46b2a] mb-4"><span role="img" aria-label="alert circle">✨</span></div>
            <h3 className="text-xl mb-3">What is a Hallucination?</h3>
            <p className="text-gray-600 leading-relaxed">
              An AI hallucination occurs when a Large Language Model generates information that is factually incorrect, nonsensical, or detached from reality, while presenting it confidently.
            </p>
          </div>
          <div className="p-8 border border-gray-100 shadow-sm rounded-sm">
            <div className="text-[#b46b2a] mb-4"><span role="img" aria-label="search">✨</span></div>
            <h3 className="text-xl mb-3">How to Spot Them</h3>
            <p className="text-gray-600 leading-relaxed">
              Look for fake citations, inconsistent logic, or overly specific details that don't match known facts. Always verify primary sources.
            </p>
          </div>
          <div className="p-8 border border-gray-100 shadow-sm rounded-sm">
            <div className="text-[#b46b2a] mb-4"><span role="img" aria-label="shield check">✨</span></div>
            <h3 className="text-xl mb-3">Prevention</h3>
            <p className="text-gray-600 leading-relaxed">
              Use "Chain of Thought" prompting, ask the AI to provide sources, and most importantly: treat AI output as a draft, never a final fact.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Samples */}
      <section className="bg-gray-50 py-16">
        <div className="tiu-container">
          <div className="mb-10">
            <h2 className="text-3xl text-[#0c2340] mb-4">Interactive Lab: Real or Hallucination?</h2>
            <p className="text-gray-600">Review these AI responses and decide if they are trustworthy.</p>
          </div>

          {loading ? (
            <div className="text-center py-10">Loading samples...</div>
          ) : (
            <div className="space-y-6">
              {samples.map((sample) => (
                <div key={sample.id} className="bg-white border border-gray-200 rounded-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100 bg-gray-50">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Prompt</span>
                    <p className="mt-1 font-medium text-[#0c2340] italic">"{sample.prompt}"</p>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">AI Response</span>
                    <p className="mt-2 text-gray-800 leading-relaxed">{sample.response}</p>
                    
                    <div className="mt-6">
                      <button 
                        onClick={() => toggleReveal(sample.id)}
                        className="bg-[#b46b2a] text-white px-6 py-2 text-sm font-bold hover:bg-[#965a23] transition-colors"
                      >
                        {revealed.includes(sample.id) ? "Hide Analysis" : "Analyze Response"}
                      </button>
                    </div>

                    {revealed.includes(sample.id) && (
                      <div className={`mt-6 p-4 rounded-sm flex gap-4 ${sample.is_hallucination ? 'bg-red-50 border-l-4 border-red-500' : 'bg-green-50 border-l-4 border-green-500'}`}>
                        <div className="mt-1">
                          {sample.is_hallucination ? <span role="img" aria-label="alert circle">✨</span> : <span role="img" aria-label="check circle2">✨</span>}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0c2340]">
                            {sample.is_hallucination ? "Hallucination Detected" : "Factually Accurate"}
                          </h4>
                          <p className="text-sm text-gray-700 mt-1">{sample.explanation}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 tiu-container">
        <div className="bg-[#0c2340] text-white p-12 rounded-sm flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="text-3xl mb-6">The Golden Rule of AI at Tilburg</h2>
            <p className="text-lg opacity-90 leading-relaxed mb-8">
              "Trust, but verify." AI is a powerful brainstorming partner, but the responsibility for factual accuracy in your assignments remains 100% yours.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span role="img" aria-label="lightbulb">✨</span>
                <span>Check every citation in the Tilburg University Library catalog.</span>
              </li>
              <li className="flex items-start gap-3">
                <span role="img" aria-label="lightbulb">✨</span>
                <span>Ask the AI to "explain its reasoning step-by-step".</span>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 aspect-square bg-white/10 rounded-full flex items-center justify-center">
             <div className="text-center p-8 border-2 border-[#b46b2a] rounded-full w-4/5 h-4/5 flex flex-col justify-center">
                <span className="text-4xl font-bold text-[#b46b2a]">100%</span>
                <span className="text-sm uppercase tracking-widest mt-2">Human Responsibility</span>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
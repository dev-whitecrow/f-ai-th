import { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate, useMotionValue, useTransform } from 'motion/react';
import { Mail, Download, Database } from 'lucide-react';

const benchmarkData = [
  { id: 'claude-model', name: 'Claude', score: 87, color: '#FF6B35' },
  { id: 'gemini-model', name: 'Gemini', score: 72, color: '#4285F4' },
  { id: 'gpt4-model', name: 'GPT-4', score: 81, color: '#10A37F' },
  { id: 'llama-model', name: 'LLaMA', score: 65, color: '#8B5CF6' },
];

const timelineEvents = [
  { year: 2024, event: 'Project Launch', description: 'Initial benchmark framework established with 50 theological questions' },
  { year: 2025, event: 'Expansion Phase', description: 'Added comparative analysis across 8 major LLMs and 200+ questions' },
  { year: 2026, event: 'Global Recognition', description: 'Dataset adopted by 40+ research institutions worldwide' },
];

const questions = [
  'Theodicy and the Problem of Evil',
  'Divine Sovereignty vs Free Will',
  'Christological Nature',
  'Eschatological Frameworks',
  'Sacramental Theology',
];

const teamMembers = [
  { name: 'Dr. Sarah Jenkins', role: 'Lead Theologian & Ethicist' },
  { name: 'David Chen', role: 'Principal AI Researcher' },
  { name: 'Rev. Michael O\'Connor', role: 'Historical Theology Consultant' },
  { name: 'Elena Rostova', role: 'Data Scientist & Benchmark Architect' }
];

const models = ['Claude', 'GPT-4', 'Gemini', 'LLaMA', 'PaLM'];

const modelResponses: Record<string, Record<string, string>> = {
  'Claude': {
    'Theodicy and the Problem of Evil': 'The problem of evil presents a fundamental challenge to classical theism. While maintaining divine omnipotence and omnibenevolence, theodicies range from free-will defenses to soul-making theodicies. Contemporary responses increasingly emphasize the cross as God\'s solidarity with suffering.',
    'Divine Sovereignty vs Free Will': 'This tension admits multiple frameworks: Calvinist predestination, Arminian conditional election, Molinist middle knowledge, and open theism. Each preserves divine supremacy while allocating varying degrees of libertarian freedom to human agents.',
    'Christological Nature': 'The Chalcedonian Definition (451 CE) established Christ as one person in two natures—fully divine and fully human, without confusion, change, division, or separation. Modern christology explores kenotic theories and the implications of incarnation.',
  },
  'GPT-4': {
    'Theodicy and the Problem of Evil': 'Evil\'s existence alongside an omnipotent, benevolent God creates logical tension. Augustinian privatio boni views evil as absence of good. Process theology reframes divine power as persuasive rather than coercive.',
    'Divine Sovereignty vs Free Will': 'Theological determinism and libertarian freedom represent poles of a spectrum. Compatibilism offers a middle path, suggesting divine foreknowledge and human agency can coexist without contradiction.',
    'Christological Nature': 'Two-nature christology affirms hypostatic union. Debates continue over communicatio idiomatum and whether Christ\'s human nature retains limitations post-resurrection.',
  },
  'Gemini': {
    'Theodicy and the Problem of Evil': 'Philosophical approaches include logical vs evidential formulations. Plantinga\'s free will defense and Hick\'s Irenaean theodicy offer distinct frameworks for reconciling divine goodness with suffering.',
    'Divine Sovereignty vs Free Will': 'Reformed theology emphasizes unconditional election while Wesleyan traditions stress prevenient grace. Both affirm divine initiative while differing on human response capacity.',
    'Christological Nature': 'Nicene orthodoxy rejects both Arianism and Docetism. Contemporary scholarship examines historical Jesus studies alongside dogmatic formulations.',
  },
};

function TimelineItem({ event, index }: { event: typeof timelineEvents[0], index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative pl-8 pb-16 last:pb-0"
    >
      <div className="absolute left-0 top-0 w-3 h-3 bg-white border-2 border-black" />
      <div className="absolute left-[5px] top-3 w-[2px] h-full bg-white/20 last:hidden" />
      <div className="text-white/50 text-sm mb-1">{event.year}</div>
      <div className="text-white font-medium mb-2">{event.event}</div>
      <div className="text-white/70 text-sm max-w-md">{event.description}</div>
    </motion.div>
  );
}

function AnimatedBar({ item, index }: { item: any; index: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, item.score, {
        duration: 1.5,
        delay: index * 0.1,
        ease: 'easeOut',
      });
      return () => controls.stop();
    }
  }, [isInView, item.score, index, count]);

  return (
    <div ref={ref} className="flex items-center gap-4">
      <div className="w-24 text-white text-right">{item.name}</div>
      <div className="flex-1 relative h-12">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${item.score}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay: index * 0.1, ease: 'easeOut' }}
          className="h-full flex items-center justify-end px-4 overflow-hidden"
          style={{ backgroundColor: item.color }}
        >
          <motion.span className="font-bold text-black whitespace-nowrap">
            {rounded}
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
  const [selectedModel, setSelectedModel] = useState(models[0]);

  const sections = ['hero', 'about', 'timeline', 'benchmark', 'rubric', 'footer'];
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(index);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const scrollToSection = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Fixed Dot Navigation */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-2 h-2 border border-white transition-all ${
              activeSection === index ? 'bg-white scale-150' : 'bg-transparent'
            }`}
            aria-label={`Navigate to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section
        ref={(el) => (sectionRefs.current[0] = el)}
        className="min-h-screen flex flex-col items-center justify-center px-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-7xl md:text-9xl font-bold text-center mb-8 tracking-tight"
        >
          AI & THEOLOGY
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/70 text-center mb-12 max-w-2xl"
        >
          Rigorous benchmarking of large language models on theological reasoning and doctrinal accuracy
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="border-2 border-white px-12 py-4 text-lg hover:bg-white hover:text-black transition-colors"
        >
          SUBSCRIBE
        </motion.button>
      </section>

      {/* About Section */}
      <section
        ref={(el) => (sectionRefs.current[1] = el)}
        className="min-h-screen flex flex-col justify-center px-8 md:px-24 py-24"
      >
        <div className="grid md:grid-cols-2 gap-16 max-w-7xl w-full">
          <div>
            <h2 className="text-5xl font-bold mb-12">ABOUT US</h2>
            <p className="text-xl text-white/70 leading-relaxed mb-8">
              The AI & Theology Benchmark is an independent research initiative dedicated to evaluating the capacity of large language models to parse, understand, and generate discourse on complex theological and ethical frameworks.
            </p>
            <p className="text-lg text-white/50 leading-relaxed">
              By establishing rigorous evaluation metrics rooted in historical doctrine and contemporary ethics, we aim to ensure that as AI systems increasingly participate in meaning-making, they do so with structural awareness of humanity's deepest philosophical traditions.
            </p>
          </div>
          <div>
            <h2 className="text-5xl font-bold mb-12">PARTICIPANTS</h2>
            <div className="flex flex-col border-t border-white/20">
              {teamMembers.map((member, i) => (
                <div key={i} className="flex flex-col md:flex-row md:justify-between md:items-center py-6 border-b border-white/20 hover:bg-white/5 transition-colors px-4 -mx-4 gap-2">
                  <span className="text-xl font-medium">{member.name}</span>
                  <span className="text-white/50 md:text-right">{member.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section
        ref={(el) => (sectionRefs.current[2] = el)}
        className="min-h-screen flex flex-col justify-center px-8 md:px-24 py-24"
      >
        <h2 className="text-5xl font-bold mb-16">HISTORY</h2>
        <div className="max-w-3xl">
          {timelineEvents.map((event, index) => (
            <TimelineItem key={event.year} event={event} index={index} />
          ))}
        </div>
      </section>

      {/* Benchmark Results */}
      <section
        ref={(el) => (sectionRefs.current[3] = el)}
        className="min-h-screen flex flex-col justify-center px-8 md:px-24 py-24"
      >
        <h2 className="text-5xl font-bold mb-16">BENCHMARK RESULTS</h2>
        <div className="w-full max-w-4xl space-y-8">
          {benchmarkData.map((item, index) => (
            <AnimatedBar key={item.id} item={item} index={index} />
          ))}
          <div className="flex items-center gap-4 mt-4 text-white/40 text-sm">
            <div className="w-24"></div>
            <div className="flex-1 flex justify-between px-2">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Rubric UI */}
      <section
        ref={(el) => (sectionRefs.current[4] = el)}
        className="min-h-screen flex flex-col justify-center px-8 md:px-24 py-24"
      >
        <h2 className="text-5xl font-bold mb-16">INTERACTIVE RUBRIC</h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-7xl">
          {/* Left Column - Controls */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium mb-4">1. SELECT QUESTION</h3>
              <div className="flex flex-wrap gap-3">
                {questions.map((q) => (
                  <button
                    key={q}
                    onClick={() => setSelectedQuestion(q)}
                    className={`px-4 py-2 border transition-colors rounded-full ${
                      selectedQuestion === q
                        ? 'bg-white text-black border-white'
                        : 'border-white/50 text-white/70 hover:border-white hover:text-white'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-4">2. SELECT MODEL</h3>
              <div className="flex flex-wrap gap-3">
                {models.map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedModel(m)}
                    className={`px-4 py-2 border transition-colors rounded-full ${
                      selectedModel === m
                        ? 'bg-white text-black border-white'
                        : 'border-white/50 text-white/70 hover:border-white hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Terminal Output */}
          <div className="border border-white/30 p-6">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/20">
              <div className="w-3 h-3 border border-white/50" />
              <div className="w-3 h-3 border border-white/50" />
              <div className="w-3 h-3 border border-white/50" />
              <span className="text-sm text-white/50 ml-2">OUTPUT AREA</span>
            </div>
            <div className="font-mono text-sm text-white/80 leading-relaxed min-h-[300px]">
              <div className="text-white/50 mb-2">
                &gt; {selectedModel} / {selectedQuestion}
              </div>
              <div className="text-white/90">
                {modelResponses[selectedModel]?.[selectedQuestion] || 'No response available for this combination.'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        ref={(el) => (sectionRefs.current[5] = el)}
        className="border-t border-white/20 px-8 md:px-24 py-16"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex gap-8 text-sm">
            <a href="#" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <Download size={16} />
              Report PDF Download
            </a>
            <a href="#" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <Database size={16} />
              Hugging Face Dataset
            </a>
            <a href="mailto:contact@aitheology.org" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <Mail size={16} />
              contact@aitheology.org
            </a>
          </div>
          <div className="text-sm text-white/50">
            © 2026 AI & Theology Benchmark. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

const { useState, useEffect } = React;

// Otázky pro diagnostiku
const questions = [
  {
    id: 'time',
    question: 'Kolik času máš do nástupu?',
    options: [
      { value: 'days', label: 'Méně než týden', urgency: 3 },
      { value: 'weeks', label: '1-4 týdny', urgency: 2 },
      { value: 'months', label: 'Více než měsíc', urgency: 1 }
    ]
  },
  {
    id: 'housing',
    question: 'Jaká je tvoje bytová situace?',
    options: [
      { value: 'own', label: 'Vlastní byt/dům' },
      { value: 'rent', label: 'Nájem' },
      { value: 'family', label: 'Bydlím u rodiny' },
      { value: 'none', label: 'Nemám stabilní bydlení' }
    ]
  },
  {
    id: 'family',
    question: 'Máš rodinu nebo někoho blízkého, kdo ti může pomoct?',
    options: [
      { value: 'yes', label: 'Ano, mám podporu' },
      { value: 'partial', label: 'Částečně' },
      { value: 'no', label: 'Ne, jsem na to sám/sama' }
    ]
  },
  {
    id: 'children',
    question: 'Staráš se o děti nebo někoho blízkého?',
    options: [
      { value: 'children', label: 'Ano, mám děti' },
      { value: 'care', label: 'Ano, pečuji o rodiče/příbuzné' },
      { value: 'both', label: 'Obojí' },
      { value: 'no', label: 'Ne' }
    ]
  },
  {
    id: 'employment',
    question: 'Jaká je tvoje pracovní situace?',
    options: [
      { value: 'employed', label: 'Zaměstnaný/á' },
      { value: 'self', label: 'OSVČ / podnikám' },
      { value: 'unemployed', label: 'Nezaměstnaný/á' },
      { value: 'benefits', label: 'Pobírám dávky' }
    ]
  },
  {
    id: 'debt',
    question: 'Máš dluhy nebo exekuce?',
    options: [
      { value: 'none', label: 'Ne' },
      { value: 'small', label: 'Ano, menší dluhy' },
      { value: 'large', label: 'Ano, velké dluhy nebo exekuce' },
      { value: 'unknown', label: 'Nevím přesně' }
    ]
  },
  {
    id: 'health',
    question: 'Bereš pravidelně léky nebo máš zdravotní omezení?',
    options: [
      { value: 'yes', label: 'Ano' },
      { value: 'mental', label: 'Ano, psychické obtíže' },
      { value: 'no', label: 'Ne' }
    ]
  }
];

// Úkoly s podmínkami
const allTasks = [
  // Kritické - pro všechny
  {
    id: 'doklady',
    title: 'Připrav si doklady',
    detail: 'Občanský průkaz, kartička pojištěnce, rozsudek soudu',
    priority: 'critical',
    category: 'nastup',
    link: '../checklisty/den-nastupu.html'
  },
  {
    id: 'leky',
    title: 'Zajisti léky na 3 dny + lékařskou zprávu',
    detail: 'Vezmi si zásobu pravidelných léků a dokumentaci od lékaře',
    priority: 'critical',
    category: 'zdravi',
    condition: (answers) => answers.health === 'yes' || answers.health === 'mental',
    link: '../checklisty/zdravi.html'
  },
  
  // Úřady
  {
    id: 'urad-prace',
    title: 'Odhlas se z evidence na úřadu práce',
    detail: 'Jinak ti vznikne přeplatek na podpoře',
    priority: 'critical',
    category: 'urady',
    condition: (answers) => answers.employment === 'unemployed' || answers.employment === 'benefits',
    link: '../checklisty/urady.html'
  },
  {
    id: 'cssz',
    title: 'Informuj ČSSZ o nástupu',
    detail: 'Důchod, nemocenská a jiné dávky se musí řešit',
    priority: 'critical',
    category: 'urady',
    condition: (answers) => answers.employment === 'benefits',
    link: '../checklisty/urady.html'
  },
  {
    id: 'zamestnavatel',
    title: 'Informuj zaměstnavatele',
    detail: 'Dohodněte se na ukončení pracovního poměru',
    priority: 'critical',
    category: 'urady',
    condition: (answers) => answers.employment === 'employed',
    link: '../checklisty/urady.html'
  },
  {
    id: 'osvc',
    title: 'Vyřeš pozastavení nebo ukončení živnosti',
    detail: 'Kontaktuj živnostenský úřad a finanční úřad',
    priority: 'critical',
    category: 'urady',
    condition: (answers) => answers.employment === 'self',
    link: '../checklisty/urady.html'
  },
  
  // Finance
  {
    id: 'dluhy',
    title: 'Kontaktuj dluhovou poradnu',
    detail: 'Bezplatně ti pomohou zjistit stav dluhů a nastavit splátky',
    priority: 'critical',
    category: 'finance',
    condition: (answers) => answers.debt === 'large' || answers.debt === 'unknown',
    link: '../checklisty/finance.html'
  },
  {
    id: 'exekutor',
    title: 'Informuj exekutora o nástupu',
    detail: 'Může přizpůsobit srážky tvé situaci',
    priority: 'important',
    category: 'finance',
    condition: (answers) => answers.debt === 'large',
    link: '../checklisty/finance.html'
  },
  {
    id: 'predplatne',
    title: 'Zruš zbytečné předplatné a členství',
    detail: 'Posilovna, streaming, časopisy...',
    priority: 'normal',
    category: 'finance',
    link: '../checklisty/finance.html'
  },
  
  // Bydlení
  {
    id: 'najem',
    title: 'Vyřeš nájem - ukončení nebo přepis',
    detail: 'Dohodni se s pronajímatelem, výpovědní lhůta je obvykle 3 měsíce',
    priority: 'critical',
    category: 'bydleni',
    condition: (answers) => answers.housing === 'rent',
    link: '../checklisty/bydleni.html'
  },
  {
    id: 'energie',
    title: 'Přepiš nebo ukonči energie',
    detail: 'Elektřina, plyn, internet - ať ti nenarůstají dluhy',
    priority: 'important',
    category: 'bydleni',
    condition: (answers) => answers.housing === 'own' || answers.housing === 'rent',
    link: '../checklisty/bydleni.html'
  },
  {
    id: 'posta',
    title: 'Nastav přeposílání pošty',
    detail: 'Na adresu někoho blízkého, kdo ti pomůže',
    priority: 'important',
    category: 'bydleni',
    condition: (answers) => answers.family === 'yes' || answers.family === 'partial',
    link: '../checklisty/bydleni.html'
  },
  {
    id: 'klice',
    title: 'Předej klíče důvěryhodné osobě',
    detail: 'Ať se někdo může postarat o byt',
    priority: 'important',
    category: 'bydleni',
    condition: (answers) => answers.housing !== 'none' && answers.family !== 'no',
    link: '../checklisty/bydleni.html'
  },
  
  // Rodina
  {
    id: 'deti-pece',
    title: 'Zajisti péči o děti',
    detail: 'Partner, rodina, nebo kontaktuj OSPOD',
    priority: 'critical',
    category: 'rodina',
    condition: (answers) => answers.children === 'children' || answers.children === 'both',
    link: '../checklisty/rodina.html'
  },
  {
    id: 'deti-skola',
    title: 'Informuj školu/školku',
    detail: 'Ať učitelé vědí a mohou dítěti pomoct',
    priority: 'important',
    category: 'rodina',
    condition: (answers) => answers.children === 'children' || answers.children === 'both',
    link: '../checklisty/rodina.html'
  },
  {
    id: 'rodice-pece',
    title: 'Zajisti náhradní péči o rodiče/příbuzné',
    detail: 'Pečovatelská služba nebo jiný rodinný příslušník',
    priority: 'critical',
    category: 'rodina',
    condition: (answers) => answers.children === 'care' || answers.children === 'both',
    link: '../checklisty/rodina.html'
  },
  {
    id: 'plna-moc',
    title: 'Sepiš plnou moc pro blízkého',
    detail: 'Aby mohl za tebe vyřizovat věci na úřadech',
    priority: 'important',
    category: 'rodina',
    condition: (answers) => answers.family === 'yes',
    link: '../checklisty/rodina.html'
  },
  
  // Zdraví
  {
    id: 'psychiatr',
    title: 'Vezmi dokumentaci od psychiatra',
    detail: 'Ve věznici jsou psychologové a programy - nestyď se říct si o pomoc',
    priority: 'critical',
    category: 'zdravi',
    condition: (answers) => answers.health === 'mental',
    link: '../checklisty/zdravi.html'
  },
  {
    id: 'pojisteni',
    title: 'Zkontroluj zdravotní pojištění',
    detail: 'Během VTOS platí stát, ale ověř, že nemáš dluh',
    priority: 'normal',
    category: 'zdravi',
    link: '../checklisty/zdravi.html'
  },
  
  // Den nástupu - pro všechny
  {
    id: 'baleni',
    title: 'Přečti si, co vzít a co NEvzít',
    detail: 'Telefon a cennosti nech doma, léky a doklady vezmi',
    priority: 'important',
    category: 'nastup',
    link: '../checklisty/den-nastupu.html'
  }
];

// Kategorie
const categories = {
  nastup: { name: 'Den nástupu', icon: '📦' },
  urady: { name: 'Úřady', icon: '🏛️' },
  finance: { name: 'Finance', icon: '💰' },
  bydleni: { name: 'Bydlení', icon: '🏠' },
  rodina: { name: 'Rodina', icon: '👨‍👩‍👧' },
  zdravi: { name: 'Zdraví', icon: '🏥' }
};

const priorityLabels = {
  critical: { name: 'Kritické', class: 'priority-critical' },
  important: { name: 'Důležité', class: 'priority-important' },
  normal: { name: 'Doporučené', class: '' }
};

// Komponenta pro otázku
function Question({ question, onAnswer, currentAnswer }) {
  return (
    <div className="question-card">
      <h3>{question.question}</h3>
      <div className="options">
        {question.options.map(option => (
          <button
            key={option.value}
            className={`option-btn ${currentAnswer === option.value ? 'selected' : ''}`}
            onClick={() => onAnswer(question.id, option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Komponenta pro úkol
function Task({ task, completed, onToggle }) {
  return (
    <div className={`task-item ${completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(task.id)}
      />
      <div className="task-content">
        <div className="task-title">
          {task.title}
          {task.priority !== 'normal' && (
            <span className={`priority ${priorityLabels[task.priority].class}`}>
              {priorityLabels[task.priority].name}
            </span>
          )}
        </div>
        <div className="task-detail">{task.detail}</div>
        {task.link && (
          <a href={task.link} className="task-link">Více info →</a>
        )}
      </div>
    </div>
  );
}

// Hlavní aplikace
function PruvodceApp() {
  const [step, setStep] = useState('intro'); // intro, questions, results
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completedTasks, setCompletedTasks] = useState(() => {
    const saved = localStorage.getItem('pruvodce-completed');
    return saved ? JSON.parse(saved) : [];
  });

  // Uložení do localStorage
  useEffect(() => {
    localStorage.setItem('pruvodce-completed', JSON.stringify(completedTasks));
  }, [completedTasks]);

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setStep('results');
    }
  };

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const getFilteredTasks = () => {
    return allTasks.filter(task => {
      if (!task.condition) return true;
      return task.condition(answers);
    }).sort((a, b) => {
      const priorityOrder = { critical: 0, important: 1, normal: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  const resetAll = () => {
    setStep('intro');
    setCurrentQuestion(0);
    setAnswers({});
    setCompletedTasks([]);
    localStorage.removeItem('pruvodce-completed');
  };

  // Intro screen
  if (step === 'intro') {
    return (
      <div className="pruvodce-intro">
        <div className="info-box">
          <h4>💡 Jak to funguje</h4>
          <p>Odpovíš na 7 jednoduchých otázek o své situaci. Na základě odpovědí ti sestavíme seznam úkolů, které bys měl/a vyřídit před nástupem.</p>
        </div>
        <button className="btn-primary" onClick={() => setStep('questions')}>
          Začít →
        </button>
        <p className="note">Tvoje odpovědi zůstanou jen v tomto prohlížeči.</p>
      </div>
    );
  }

  // Questions
  if (step === 'questions') {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    
    return (
      <div className="pruvodce-questions">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="progress-text">
          Otázka {currentQuestion + 1} z {questions.length}
        </div>
        
        <Question
          question={questions[currentQuestion]}
          onAnswer={handleAnswer}
          currentAnswer={answers[questions[currentQuestion].id]}
        />
        
        {currentQuestion > 0 && (
          <button 
            className="btn-secondary"
            onClick={() => setCurrentQuestion(prev => prev - 1)}
          >
            ← Zpět
          </button>
        )}
      </div>
    );
  }

  // Results
  if (step === 'results') {
    const tasks = getFilteredTasks();
    const completedCount = tasks.filter(t => completedTasks.includes(t.id)).length;
    const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

    // Seskupit úkoly podle kategorie
    const groupedTasks = {};
    tasks.forEach(task => {
      if (!groupedTasks[task.category]) {
        groupedTasks[task.category] = [];
      }
      groupedTasks[task.category].push(task);
    });

    return (
      <div className="pruvodce-results">
        <div className="results-header">
          <h2>Tvůj personalizovaný plán</h2>
          <p>Na základě tvých odpovědí jsme ti sestavili {tasks.length} úkolů.</p>
        </div>

        <div className="progress-summary">
          <div className="progress-bar large">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-text">
            Hotovo: {completedCount} z {tasks.length} ({Math.round(progress)}%)
          </div>
        </div>

        {Object.entries(groupedTasks).map(([categoryId, categoryTasks]) => (
          <div key={categoryId} className="task-category">
            <h3 className="category-heading">
              {categories[categoryId].icon} {categories[categoryId].name}
            </h3>
            <div className="task-list">
              {categoryTasks.map(task => (
                <Task
                  key={task.id}
                  task={task}
                  completed={completedTasks.includes(task.id)}
                  onToggle={toggleTask}
                />
              ))}
            </div>
          </div>
        ))}

        <div className="results-actions">
          <button className="btn-secondary" onClick={() => window.print()}>
            🖨️ Vytisknout
          </button>
          <button className="btn-secondary" onClick={resetAll}>
            🔄 Začít znovu
          </button>
        </div>

        <div className="info-box">
          <h4>💾 Tvůj pokrok je uložen</h4>
          <p>Odškrtnuté úkoly zůstanou uložené v tomto prohlížeči. Můžeš se kdykoliv vrátit.</p>
        </div>
      </div>
    );
  }
}

// Renderování
const container = document.getElementById('pruvodce-app');
if (container) {
  ReactDOM.createRoot(container).render(<PruvodceApp />);
}
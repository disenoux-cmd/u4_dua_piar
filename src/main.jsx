import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowLeft,
  ArrowRight,
  AudioLines,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  Ear,
  Eye,
  FileCheck2,
  Hand,
  Landmark,
  Lightbulb,
  Map,
  MessageCircleMore,
  Network,
  PencilLine,
  Puzzle,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  TimerReset,
  Users,
  X,
} from 'lucide-react'
import logo from '../docs/excolombia.png'
import classroomPlate from '../assets/plates/classroom-participation.png'
import collaborationPlate from '../assets/plates/collaborative-expression.png'
import './styles.css'

const stations = [
  { short: 'Bienvenida', title: 'Aula para todos y todas', icon: BookOpen },
  { short: 'Faro normativo', title: 'El faro normativo colombiano', icon: Landmark },
  { short: 'Universo DUA', title: 'Diseñar para la diversidad desde el inicio', icon: Eye },
  { short: 'PIAR en territorio', title: 'Un traje a la medida de cada historia', icon: FileCheck2 },
  { short: 'Tiempo efectivo', title: 'La inclusión protege el tiempo', icon: Clock3 },
  { short: 'Trabajo colaborativo', title: 'Estrategias inclusivas en acción', icon: Network },
  { short: 'Decisiones inclusivas', title: 'Simulador de decisiones inclusivas', icon: MessageCircleMore },
  { short: 'Cierre reflexivo', title: 'Antes pensaba... Ahora sé', icon: PencilLine },
]

const laws = [
  ['1994', 'Ley 115', 'Reconoce la obligación de brindar atención pedagógica oportuna y de calidad a estudiantes con discapacidad o capacidades excepcionales.'],
  ['2003', 'Resolución 2565', 'Introduce parámetros para formular el PIAR y dar seguimiento institucional a los ajustes.'],
  ['2009', 'Ley 1346', 'Incorpora la Convención de la ONU sobre los Derechos de las Personas con Discapacidad.'],
  ['2009', 'Decreto 366', 'Organiza el servicio de apoyo pedagógico para la atención en aulas regulares.'],
  ['2017', 'Decreto 1421', 'Regula la atención educativa a la población con discapacidad y exige implementar DUA y PIAR.'],
]

const duaPrinciples = [
  { name: 'Implicación', question: 'El porqué del aprendizaje', icon: Hand, color: 'teal', meaning: 'Ofrecer opciones para captar el interés, sostener el esfuerzo y promover la autorregulación.', example: 'Propón roles elegibles, un rincón de retos y tareas de extensión creativa para que cada estudiante encuentre un desafío significativo.' },
  { name: 'Representación', question: 'El qué del aprendizaje', icon: Eye, color: 'yellow', meaning: 'Presentar la información en distintos formatos y canales sensoriales con lenguaje claro.', example: 'Combina diagramas y color, explicación pausada o audio, y materiales que se puedan manipular.' },
  { name: 'Acción y expresión', question: 'El cómo del aprendizaje', icon: PencilLine, color: 'orange', meaning: 'Variar las formas de interactuar y demostrar lo aprendido sin cambiar el objetivo.', example: 'Una evidencia puede ser una dramatización, una maqueta, un diario reflexivo o un audio breve.' },
]

const piarSteps = [
  ['Identificar', 'Reconoce la necesidad sensorial, cognitiva, física, emocional o social. No esperes un diagnóstico para iniciar apoyos pedagógicos.'],
  ['Observar y registrar', 'Documenta cómo aprende, participa e interactúa; registra fortalezas, gustos y talentos.'],
  ['Diseñar ajustes', 'Modifica intencionalmente tiempos, recursos, productos o formas de evaluación, no el rigor del objetivo.'],
  ['Diligenciar el PIAR', 'Formaliza el plan junto al equipo psicorientador, docente de apoyo y cuerpo directivo.'],
  ['Trabajar en red', 'Involucra a familia, cuidadores, docentes y apoyos externos cuando sean necesarios.'],
]

const strategies = [
  { name: 'Rompecabezas de expertos', icon: Puzzle, objective: 'Garantizar participación en igualdad de condiciones mediante la interdependencia positiva.', steps: ['Divide el tema en subtemas.', 'Forma equipos base heterogéneos.', 'Ofrece kits de experto en varios formatos.', 'Los expertos consolidan y enseñan a su equipo.'], key: 'Cada persona aporta una pieza que el equipo necesita.' },
  { name: 'Duplas empáticas', icon: Users, objective: 'Reducir barreras académicas y socioemocionales por medio del apoyo mutuo.', steps: ['Forma parejas intencionadas.', 'Define el apoyo según los ajustes del PIAR.', 'Entrena escucha y empatía.', 'Rota los roles con frecuencia.'], key: 'Acompañar no significa hacer la tarea por la otra persona.' },
  { name: 'Tutor por un día', icon: Lightbulb, objective: 'Reconocer talentos académicos, creativos, organizativos y relacionales.', steps: ['Identifica talentos diversos.', 'Asigna el rol de manera rotativa.', 'Entrega una tarea puntual.', 'Enseña a orientar con preguntas y pistas.'], key: 'El liderazgo circula y cada talento encuentra un lugar.' },
]

const cases = [
  {
    name: 'El reto del inglés',
    situation: 'Mateo tiene dislexia severa. El objetivo es redactar un diálogo de cinco líneas en pasado simple sobre conocer a un amigo. ¿Qué decisión mantiene el rigor y su participación?',
    options: [
      ['Pedirle un dibujo libre y que permanezca en silencio.', false, 'La pasividad lo excluye del objetivo y puede aumentar la desconexión.'],
      ['Permitir que estructure el diálogo con pictogramas y lo grabe en audio junto a una dupla.', true, 'Mantienes el objetivo, ajustas la vía de expresión y sostienes a Mateo en la tarea cognitiva.'],
    ],
  },
  {
    name: 'El laboratorio STEM',
    situation: 'Sofía tiene TDAH. El grupo experimentará con evaporación, agua caliente, espejos y una guía. ¿Cómo organizas su participación y proteges el tiempo?',
    options: [
      ['Ubicarla aparte para que observe en silencio.', false, 'Separarla reduce su participación sin resolver la barrera de atención.'],
      ['Asignarle el rol de guardiana del tiempo con temporizador visual y una lista breve de pasos.', true, 'Canalizas su energía, estructuras la tarea y aportas un anclaje visual útil para todo el equipo.'],
    ],
  },
]

function StationIndex({ current, visited, onSelect }) {
  return (
    <aside className="station-index" aria-label="Estaciones del recorrido">
      <div className="index-heading">Estaciones</div>
      <nav>
        {stations.map(({ short, icon: Icon }, index) => (
          <button className={index === current ? 'station active' : 'station'} key={short} type="button" onClick={() => onSelect(index)} aria-current={index === current ? 'step' : undefined}>
            <span className="station-number">{index + 1}</span><span>{short}</span><Icon aria-hidden="true" />
            {visited.has(index) && <Check className="station-check" aria-label="Visitada" />}
          </button>
        ))}
      </nav>
    </aside>
  )
}

function PageHeader({ onMap }) {
  return <header className="page-header"><img src={logo} alt="Enseña por Colombia" /><button className="route-button" type="button" onClick={onMap}><Map aria-hidden="true" /> Ver mapa de la ruta <ArrowRight aria-hidden="true" /></button></header>
}

function Hero({ onNext }) {
  return (
    <div className="hero-sheet">
      <div className="hero-copy">
        <h1 id="page-title" tabIndex="-1">Aula para<br />todos y todas,</h1><p className="hero-subtitle">DUA y PIAR en acción</p><div className="ink-stroke" aria-hidden="true" />
        <p className="welcome">Te damos la bienvenida a esta ruta de aprendizaje.</p>
        <p className="intro">Aquí encontrarás ideas, herramientas y ejemplos para que cada estudiante participe, aprenda y se desarrolle en un aula que valora la diversidad.</p>
        <button className="start-button" type="button" onClick={onNext}>Comenzar la ruta de equidad <ArrowRight aria-hidden="true" /></button>
        <blockquote>La equidad es el camino.<br />La inclusión, el destino.</blockquote>
      </div>
      <div className="dua-mosaic" aria-label="Tres vías del Diseño Universal para el Aprendizaje">
        <div className="mosaic-row implication"><div className="principle-title"><Hand /><strong>Implicación</strong></div><img src={classroomPlate} alt="Estudiantes participando activamente" decoding="async" /><AudioLines className="waveform" /></div>
        <div className="mosaic-row representation"><div className="principle-title"><Eye /><strong>Representación</strong></div><div className="concept-map"><span>Participación</span><span>Accesibilidad</span><b>Inclusión</b><span>Diversidad</span><span>Equidad</span></div><div className="ramp-sketch"><Route /><span>Múltiples caminos para aprender.</span></div></div>
        <div className="mosaic-row expression"><div className="principle-title"><PencilLine /><strong>Acción y expresión</strong></div><img src={collaborationPlate} alt="Estudiantes creando una respuesta digital" decoding="async" loading="lazy" /><div className="speech-notes"><span>¿Qué aprendimos?</span><span>¿Cómo demostrarlo?</span></div></div>
      </div>
      <button className="next-corner" type="button" onClick={onNext}><span>Siguiente estación</span><strong>El faro<br />normativo</strong><ArrowRight /></button>
    </div>
  )
}

function Laws() {
  const [active, setActive] = useState(4)
  return <LearningPage className="laws-page" title="El faro normativo colombiano" intro="En Colombia, la educación inclusiva no es una sugerencia: es una garantía del derecho a aprender sin discriminación."><div className="timeline" role="list">{laws.map(([year, name, text], index) => <button className={active === index ? 'law active' : 'law'} key={`${year}-${name}`} onClick={() => setActive(index)} type="button"><span>{year}</span><strong>{name}</strong><ChevronDown /></button>)}</div><article className="law-detail" aria-live="polite"><Landmark /><p>{laws[active][2]}</p>{active === 4 && <mark>Ningún establecimiento regular puede rechazar una matrícula por motivos de discapacidad.</mark>}</article><div className="field-note"><ShieldCheck /><p><strong>Idea clave</strong> DUA y PIAR hacen operativo un derecho. No dependen de la buena voluntad individual.</p></div></LearningPage>
}

function Dua() {
  const [active, setActive] = useState(0)
  const item = duaPrinciples[active]
  const Icon = item.icon
  return <LearningPage title="Diseñar para la diversidad desde el inicio" intro="Como una rampa que beneficia a muchas personas, el DUA anticipa la variabilidad para no adaptar la clase a última hora."><div className="principle-selector">{duaPrinciples.map((principle, index) => { const TabIcon = principle.icon; return <button aria-pressed={active === index} className={`principle-tab ${principle.color} ${active === index ? 'active' : ''}`} key={principle.name} onClick={() => setActive(index)}><TabIcon /><span>{principle.name}</span></button> })}</div><article className={`principle-detail ${item.color}`}><div><span className="question-label">{item.question}</span><h2>{item.name}</h2><p>{item.meaning}</p></div><div className="classroom-proof"><Icon /><span>En el aula</span><p>{item.example}</p></div></article><div className="dua-equation"><span>Un objetivo común</span><b>+</b><span>múltiples caminos</span><b>=</b><strong>participación real</strong></div></LearningPage>
}

function Piar() {
  const [step, setStep] = useState(0)
  return <LearningPage title="Un traje a la medida de cada historia" intro="Cuando el DUA no elimina una barrera específica, el PIAR define apoyos individualizados sin disminuir la exigencia del aprendizaje."><div className="piar-route">{piarSteps.map(([name], index) => <button type="button" onClick={() => setStep(index)} className={step === index ? 'piar-step active' : 'piar-step'} key={name}><span>{index + 1}</span><strong>{name}</strong></button>)}</div><article className="piar-sheet" aria-live="polite"><div className="sheet-number">{step + 1}</div><div><h2>{piarSteps[step][0]}</h2><p>{piarSteps[step][1]}</p></div></article>{step === 0 && <div className="critical-note"><Target /><p><strong>Alerta del territorio</strong> No se requiere diagnóstico médico formal para iniciar apoyos. Observar una barrera activa la responsabilidad pedagógica.</p></div>}<div className="not-equal"><span>Ajustar el camino</span><strong>no es</strong><span>bajar la meta</span></div></LearningPage>
}

function TimePage() {
  const [inclusive, setInclusive] = useState(false)
  return <LearningPage title="La inclusión protege el tiempo" intro="El tiempo de clase es finito. Anticipar barreras reduce interrupciones, improvisación y control permanente."><div className={`time-lab ${inclusive ? 'inclusive' : ''}`}><div className="clock-face"><Clock3 /><strong>{inclusive ? 'Tiempo para aprender' : 'Tiempo que se fuga'}</strong></div><div className="time-bars"><span style={{ '--value': inclusive ? '88%' : '46%' }}><b>Aprendizaje activo</b></span><span style={{ '--value': inclusive ? '12%' : '54%' }}><b>Fricción operativa</b></span></div><button type="button" onClick={() => setInclusive(!inclusive)}><TimerReset /> {inclusive ? 'Ver aula sin anticipación' : 'Aplicar DUA + PIAR'}</button></div><div className="saves-time"><article><ShieldCheck /><h2>Previene frustración</h2><p>Las opciones mantienen a cada estudiante activo y retado.</p></article><article><Target /><h2>Evita improvisar</h2><p>Formatos y apoyos están listos antes de iniciar.</p></article><article><Users /><h2>Libera al docente</h2><p>Las rutinas permiten acompañar y retroalimentar.</p></article></div></LearningPage>
}

function Strategies() {
  const [active, setActive] = useState(0)
  const item = strategies[active]
  const Icon = item.icon
  return <LearningPage title="Estrategias inclusivas en acción" intro="La colaboración bien estructurada distribuye la participación, los apoyos y el liderazgo dentro del aula."><div className="strategy-tabs">{strategies.map((strategy, index) => { const TabIcon = strategy.icon; return <button type="button" className={active === index ? 'active' : ''} onClick={() => setActive(index)} key={strategy.name}><TabIcon /><span>{strategy.name}</span></button> })}</div><article className="strategy-sheet"><div className="strategy-lead"><Icon /><h2>{item.name}</h2><p>{item.objective}</p></div><ol>{item.steps.map(step => <li key={step}>{step}</li>)}</ol><blockquote>{item.key}</blockquote></article></LearningPage>
}

function Simulator() {
  const [caseIndex, setCaseIndex] = useState(0)
  const [answers, setAnswers] = useState([null, null])
  const selected = answers[caseIndex]
  const choose = index => setAnswers(current => current.map((value, itemIndex) => itemIndex === caseIndex ? index : value))
  return <LearningPage title="Simulador de decisiones inclusivas" intro="Decide cómo sostener el mismo objetivo de aprendizaje mientras eliminas una barrera. La retroalimentación aparece de inmediato."><div className="case-switch">{cases.map((item, index) => <button aria-pressed={caseIndex === index} className={caseIndex === index ? 'active' : ''} onClick={() => setCaseIndex(index)} key={item.name}>{index + 1}. {item.name}{answers[index] !== null && <Check />}</button>)}</div><section className="case-board"><div className="case-copy"><span>Situación de aula</span><h2>{cases[caseIndex].name}</h2><p>{cases[caseIndex].situation}</p></div><div className="choices">{cases[caseIndex].options.map(([option, correct, feedback], index) => <button type="button" className={selected === index ? (correct ? 'choice correct' : 'choice incorrect') : 'choice'} onClick={() => choose(index)} key={option}><span>{String.fromCharCode(65 + index)}</span><p>{option}</p>{selected === index && <strong>{feedback}</strong>}</button>)}</div></section>{selected !== null && <div className="feedback-summary" aria-live="polite"><Sparkles /><p>{cases[caseIndex].options[selected][1] ? 'Esta decisión combina diseño universal, ajuste razonable y participación activa.' : 'Vuelve a mirar el objetivo: incluir es cambiar la vía, no retirar a la persona del aprendizaje.'}</p></div>}</LearningPage>
}

function Closing() {
  const [revealed, setRevealed] = useState(false)
  return <LearningPage title="Antes pensaba... Ahora sé" intro="Haz visible cómo cambió tu mirada. No necesitas escribir aquí: usa estas preguntas para preparar tu reflexión en la bitácora del curso."><div className="reflection-board"><button type="button" className={revealed ? 'reflection-card muted' : 'reflection-card'} onClick={() => setRevealed(false)}><span>Antes pensaba...</span><p>¿Qué creías que significaba incluir en tu clase?</p></button><button type="button" className={revealed ? 'reflection-card active' : 'reflection-card'} onClick={() => setRevealed(true)}><span>Ahora sé...</span><p>¿Cómo protegen DUA y PIAR el tiempo y la participación?</p></button></div><div className={revealed ? 'closing-insight revealed' : 'closing-insight'} aria-live="polite"><Lightbulb /><p>La inclusión no consiste en crear una clase distinta para cada estudiante. Consiste en diseñar caminos amplios para todas y todos, y apoyos precisos cuando una barrera persiste.</p></div><div className="moodle-note"><PencilLine /><div><h2>Continúa en tu Bitácora de Metacognición Digital</h2><p>Completa allí la rutina “Antes pensaba... Ahora sé” con ejemplos concretos de tu práctica.</p></div></div></LearningPage>
}

function LearningPage({ title, intro, children, className = '' }) {
  return <div className={`learning-page ${className}`}><div className="page-intro"><h1 id="page-title" tabIndex="-1">{title}</h1><p>{intro}</p></div>{children}</div>
}

function RouteMap({ current, visited, onSelect, onClose }) {
  const panelRef = useRef(null)
  const closeRef = useRef(null)
  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const handleKeyDown = event => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return
      const controls = [...panelRef.current.querySelectorAll('button')]
      const first = controls[0]
      const last = controls[controls.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => { document.removeEventListener('keydown', handleKeyDown); document.body.style.overflow = previousOverflow; previousFocus?.focus() }
  }, [onClose])
  return <div className="map-overlay" role="dialog" aria-modal="true" aria-labelledby="map-title"><div className="map-panel" ref={panelRef}><button ref={closeRef} className="map-close" type="button" onClick={onClose} aria-label="Cerrar mapa"><X /></button><h2 id="map-title">Mapa de la ruta</h2><p>Explora en orden o elige la estación que necesites revisar.</p><div className="map-line">{stations.map(({ short, icon: Icon }, index) => <button type="button" className={current === index ? 'active' : ''} onClick={() => { onSelect(index); onClose() }} key={short}><span>{index + 1}</span><Icon /><strong>{short}</strong>{visited.has(index) && <Check />}</button>)}</div></div></div>
}

function App() {
  const [current, setCurrent] = useState(0)
  const [visited, setVisited] = useState(() => new Set([0]))
  const [showMap, setShowMap] = useState(false)
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return }
    document.getElementById('page-title')?.focus()
  }, [current])
  const selectStation = index => {
    setCurrent(index)
    setVisited(previous => new Set([...previous, index]))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }
  const pages = [<Hero onNext={() => selectStation(1)} />, <Laws />, <Dua />, <Piar />, <TimePage />, <Strategies />, <Simulator />, <Closing />]
  return (
    <main className="notebook-shell">
      <StationIndex current={current} visited={visited} onSelect={selectStation} />
      <div className="binder" aria-hidden="true">{Array.from({ length: 7 }, (_, index) => <i key={index} />)}</div>
      <section className="notebook-page" aria-labelledby="page-title">
        <PageHeader onMap={() => setShowMap(true)} />
        {pages[current]}
        {current > 0 && (
          <footer className="page-navigation">
            <button type="button" onClick={() => selectStation(current - 1)}><ArrowLeft /> Anterior</button>
            <span>{current + 1} de {stations.length}</span>
            {current < stations.length - 1
              ? <button type="button" onClick={() => selectStation(current + 1)}>Siguiente <ArrowRight /></button>
              : <button type="button" onClick={() => selectStation(0)}>Volver al inicio <BookOpen /></button>}
          </footer>
        )}
      </section>
      {showMap && <RouteMap current={current} visited={visited} onSelect={selectStation} onClose={() => setShowMap(false)} />}
    </main>
  )
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)

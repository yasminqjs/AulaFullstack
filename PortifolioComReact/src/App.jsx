import { useEffect, useState } from 'react'
import './App.css'
import foto from './assets/foto.jpg'

function App() {
  const [activeSection, setActiveSection] = useState('inicio')
  const [visibleSections, setVisibleSections] = useState([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [skillView, setSkillView] = useState('compact')
  const [selectedExperience, setSelectedExperience] = useState(null)

  const skills = [
    'C / C++',
    'STM32',
    'RTOS',
    'ESP32',
    'Microcontroladores',
    'Sensores',
    'IoT',
    'Python',
    'Programação Competitiva',
  ]

  const experiences = [
    {
      date: 'MAI 2026 - ATUALMENTE',
      title: 'Estágio',
      company: 'Eletrônica Embarcada',
      description:
        'Atuo na área de Eletrônica Embarcada do SENAI CIMATEC, onde sou responsável pelo desenvolvimento de firmware para microcontroladores aplicados a projetos de diversas empresas.',
      extra:
        'Atuo no desenvolvimento e manutenção de soluções embarcadas, integrando software, hardware e diferentes periféricos.',
    },
    {
      date: 'JAN 2025 - ABR 2026',
      title: 'Iniciação Tecnológica',
      company: 'Centro de Competências em Nanossatélites',
      description:
        'Desenvolvimento de firmware para a Plataforma de Coleta de Dados da missão Criossat-1. Trabalho com C/C++, sensores, RTOS e microcontroladores, principalmente STM32. Também foram desenvolvidas aplicações de IoT e simulações de rastreamento de satélites.',
      extra:
        'A experiência envolveu sistemas embarcados aplicados ao contexto espacial e integração entre sensores, comunicação e processamento de dados.',
    },
    {
      date: 'NOV 2024 - AGO 2025',
      title: 'Monitora - Clube de Programação',
      company: 'SENAI CIMATEC',
      description:
        'Preparação de alunos para competições de programação, com foco em C++, algoritmos e resolução de problemas.',
      extra:
        'A atividade envolveu o estudo de algoritmos, estruturas de dados e estratégias para resolução eficiente de problemas.',
    },
  ]

  const handleNavigation = (section) => {
    setActiveSection(section)
  }

  useEffect(() => {
    const sections = document.querySelectorAll('.animate-section')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((previous) => {
              if (previous.includes(entry.target.id)) {
                return previous
              }

              return [...previous, entry.target.id]
            })

            setActiveSection(entry.target.id)
          }
        })
      },
      {
        threshold: 0.2,
      }
    )

    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY

      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight

      const progress =
        documentHeight > 0
          ? (scrollTop / documentHeight) * 100
          : 0

      setScrollProgress(progress)
    }

    window.addEventListener('scroll', updateScrollProgress)

    updateScrollProgress()

    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
    }
  }, [])

  return (
    <>
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <header>
        <a
          className="logo"
          href="#inicio"
          onClick={() => handleNavigation('inicio')}
        >
          YQ
        </a>

        <nav>
          <a
            className={activeSection === 'sobre' ? 'active' : ''}
            href="#sobre"
            onClick={() => handleNavigation('sobre')}
          >
            Sobre
          </a>

          <a
            className={activeSection === 'experiencia' ? 'active' : ''}
            href="#experiencia"
            onClick={() => handleNavigation('experiencia')}
          >
            Experiência
          </a>

          <a
            className={activeSection === 'habilidades' ? 'active' : ''}
            href="#habilidades"
            onClick={() => handleNavigation('habilidades')}
          >
            Habilidades
          </a>

          <a
            className={activeSection === 'formacao' ? 'active' : ''}
            href="#formacao"
            onClick={() => handleNavigation('formacao')}
          >
            Formação
          </a>

          <a
            className={activeSection === 'contato' ? 'active' : ''}
            href="#contato"
            onClick={() => handleNavigation('contato')}
          >
            Contato
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-text">
            <h1>
              Yasmin
              <br />
              <span>Queiroz</span>
            </h1>

            <p className="description">
              6º Semestre | Graduanda de Engenharia da Computação na
              Universidade SENAI CIMATEC
              <br />
              Estagiária na área de Eletrônica Embarcada
            </p>
          </div>

          <div className="foto">
            <img
              src={foto}
              alt="Yasmin Queiroz"
              className="profile-photo"
            />
          </div>
        </section>

        <section
          className={`section about animate-section ${
            visibleSections.includes('sobre') ? 'visible' : ''
          }`}
          id="sobre"
        >
          <p className="section-number">01 - SOBRE</p>

          <div className="text">
            <p>
              Atualmente estou no 6º semestre de Engenharia da Computação
              na Universidade SENAI CIMATEC.
            </p>

            <p>
              Minha experiência envolve desenvolvimento de software para
              microcontroladores, utilizando C/C++, sensores, RTOS e
              microcontroladores STM32.
            </p>

            <p>
              Também tenho experiência com aplicações de IoT, simulações
              de rastreamento de satélites e programação competitiva.
            </p>
          </div>
        </section>

        <section
          className={`section animate-section ${
            visibleSections.includes('experiencia') ? 'visible' : ''
          }`}
          id="experiencia"
        >
          <p className="section-number">02 - EXPERIÊNCIA</p>

          <div className="experience">
            {experiences.map((experience, index) => {
              const isSelected = selectedExperience === index

              return (
                <article
                  key={experience.title}
                  className={`experience-card ${
                    isSelected ? 'selected' : ''
                  }`}
                >
                  <span className="date">
                    {experience.date}
                  </span>

                  <div>
                    <h3>{experience.title}</h3>

                    <p className="company">
                      {experience.company}
                    </p>

                    <p>{experience.description}</p>

                    <button
                      className="experience-button"
                      onClick={() =>
                        setSelectedExperience(
                          isSelected ? null : index
                        )
                      }
                    >
                      {isSelected
                        ? 'Mostrar menos −'
                        : 'Ver mais +'}
                    </button>

                    <div
                      className={`experience-extra ${
                        isSelected ? 'show' : ''
                      }`}
                    >
                      <p>{experience.extra}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section
          className={`section skills animate-section ${
            visibleSections.includes('habilidades') ? 'visible' : ''
          }`}
          id="habilidades"
        >
          <p className="section-number">03 - HABILIDADES</p>

          <div className="skill-controls">
            <button
              className={`skill-control ${
                skillView === 'compact' ? 'active' : ''
              }`}
              onClick={() => setSkillView('compact')}
            >
              Lista
            </button>

            <button
              className={`skill-control ${
                skillView === 'cards' ? 'active' : ''
              }`}
              onClick={() => setSkillView('cards')}
            >
              Cards
            </button>
          </div>

          <div className={`skill-list ${skillView}`}>
            {skills.map((skill, index) => (
              <span
                key={skill}
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section
          className={`section education animate-section ${
            visibleSections.includes('formacao') ? 'visible' : ''
          }`}
          id="formacao"
        >
          <p className="section-number">04 - FORMAÇÃO</p>

          <div className="education-content">
            <div>
              <p className="small">2024 - 2029</p>

              <h2>Engenharia da Computação</h2>

              <p className="institution">
                Universidade SENAI CIMATEC
              </p>
            </div>

            <p className="semester">6º semestre</p>
          </div>
        </section>

        <section
          className={`contact animate-section ${
            visibleSections.includes('contato') ? 'visible' : ''
          }`}
          id="contato"
        >
          <p className="section-number">05 - CONTATO</p>

          <div className="contact-info">
            <a
              className="linkedin-button"
              href="mailto:yasminqjs@gmail.com"
            >
              yasminqjs@gmail.com
            </a>

            <a
              className="linkedin-button"
              href="https://www.linkedin.com/in/yasmin-queiroz-04743630b/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </section>
      </main>

      <footer>
        <span>Salvador, Bahia, Brasil</span>
      </footer>
    </>
  )
}

export default App
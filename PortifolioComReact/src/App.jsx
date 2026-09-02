import { useEffect, useState } from 'react'
import './App.css'

import Header from './components/Header'
import Hero from './components/Hero'
import Sobre from './components/Sobre'
import Experiencia from './components/Experiencia'
import Habilidades from './components/Habilidades'
import Formacao from './components/Formacao'
import Contato from './components/Contato'
import Footer from './components/Footer'

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

  const handleExperienceToggle = (index) => {
    setSelectedExperience((currentIndex) =>
      currentIndex === index ? null : index
    )
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
        documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0

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

      <Header activeSection={activeSection} onNavigation={handleNavigation} />

      <main>
        <Hero />
        <Sobre visibleSections={visibleSections} />
        <Experiencia
          experiences={experiences}
          selectedExperience={selectedExperience}
          visibleSections={visibleSections}
          onToggleExperience={handleExperienceToggle}
        />
        <Habilidades
          skills={skills}
          skillView={skillView}
          visibleSections={visibleSections}
          onSkillViewChange={setSkillView}
        />
        <Formacao visibleSections={visibleSections} />
        <Contato visibleSections={visibleSections} />
      </main>

      <Footer />
    </>
  )
}

export default App
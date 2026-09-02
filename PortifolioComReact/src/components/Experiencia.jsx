function Experiencia({
  experiences,
  selectedExperience,
  visibleSections,
  onToggleExperience,
}) {
  return (
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
              className={`experience-card ${isSelected ? 'selected' : ''}`}
            >
              <span className="date">{experience.date}</span>

              <div>
                <h3>{experience.title}</h3>

                <p className="company">{experience.company}</p>

                <p>{experience.description}</p>

                <button
                  className="experience-button"
                  onClick={() => onToggleExperience(index)}
                  type="button"
                >
                  {isSelected ? 'Mostrar menos −' : 'Ver mais +'}
                </button>

                <div className={`experience-extra ${isSelected ? 'show' : ''}`}>
                  <p>{experience.extra}</p>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default Experiencia

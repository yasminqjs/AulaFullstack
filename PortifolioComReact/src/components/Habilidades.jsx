function Habilidades({
  skills,
  skillView,
  visibleSections,
  onSkillViewChange,
}) {
  return (
    <section
      className={`section skills animate-section ${
        visibleSections.includes('habilidades') ? 'visible' : ''
      }`}
      id="habilidades"
    >
      <p className="section-number">03 - HABILIDADES</p>

      <div className="skill-controls">
        <button
          className={`skill-control ${skillView === 'compact' ? 'active' : ''}`}
          onClick={() => onSkillViewChange('compact')}
          type="button"
        >
          Lista
        </button>

        <button
          className={`skill-control ${skillView === 'cards' ? 'active' : ''}`}
          onClick={() => onSkillViewChange('cards')}
          type="button"
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
  )
}

export default Habilidades

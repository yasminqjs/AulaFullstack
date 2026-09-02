function Formacao({ visibleSections }) {
  return (
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

          <p className="institution">Universidade SENAI CIMATEC</p>
        </div>

        <p className="semester">6º semestre</p>
      </div>
    </section>
  )
}

export default Formacao

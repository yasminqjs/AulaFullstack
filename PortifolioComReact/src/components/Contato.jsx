function Contato({ visibleSections }) {
  return (
    <section
      className={`contact animate-section ${
        visibleSections.includes('contato') ? 'visible' : ''
      }`}
      id="contato"
    >
      <p className="section-number">05 - CONTATO</p>

      <div className="contact-info">
        <a className="linkedin-button" href="mailto:yasminqjs@gmail.com">
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
  )
}

export default Contato

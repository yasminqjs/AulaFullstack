function Header({ activeSection, onNavigation }) {
  return (
    <header>
      <a
        className="logo"
        href="#inicio"
        onClick={() => onNavigation('inicio')}
      >
        YQ
      </a>

      <nav>
        <a
          className={activeSection === 'sobre' ? 'active' : ''}
          href="#sobre"
          onClick={() => onNavigation('sobre')}
        >
          Sobre
        </a>

        <a
          className={activeSection === 'experiencia' ? 'active' : ''}
          href="#experiencia"
          onClick={() => onNavigation('experiencia')}
        >
          Experiência
        </a>

        <a
          className={activeSection === 'habilidades' ? 'active' : ''}
          href="#habilidades"
          onClick={() => onNavigation('habilidades')}
        >
          Habilidades
        </a>

        <a
          className={activeSection === 'formacao' ? 'active' : ''}
          href="#formacao"
          onClick={() => onNavigation('formacao')}
        >
          Formação
        </a>

        <a
          className={activeSection === 'contato' ? 'active' : ''}
          href="#contato"
          onClick={() => onNavigation('contato')}
        >
          Contato
        </a>
      </nav>
    </header>
  )
}

export default Header

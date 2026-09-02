import foto from '../assets/foto.jpg'

function Hero() {
  return (
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
  )
}

export default Hero

function Sobre({ visibleSections }) {
  return (
    <section
      className={`section about animate-section ${
        visibleSections.includes('sobre') ? 'visible' : ''
      }`}
      id="sobre"
    >
      <p className="section-number">01 - SOBRE</p>

      <div className="text">
        <p>
          Atualmente estou no 6º semestre de Engenharia da Computação na
          Universidade SENAI CIMATEC.
        </p>

        <p>
          Minha experiência envolve desenvolvimento de software para
          microcontroladores, utilizando C/C++, sensores, RTOS e
          microcontroladores STM32.
        </p>

        <p>
          Também tenho experiência com aplicações de IoT, simulações de
          rastreamento de satélites e programação competitiva.
        </p>
      </div>
    </section>
  )
}

export default Sobre

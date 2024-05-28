import {Institution} from '../components' 

export const Institutions = () => {
  
  const instituciones = [
    {
      id: 1,
      name: "Jade Salud IPS",
      description: "Ofrece servicios médicos y terapéuticos en psiquiatría, psicología clínica, neuropsicología, y terapia ocupacional, con enfoque en la atención individual y grupal para diversas condiciones de salud mental.",
      location: "Center, Cra. 49c #80 - 125 cons 515, Riomar, Barranquilla, Atlántico",
      url: "https://www.jadesaludips.com/"
    },
    {
      id: 2,
      name: "Clínica Reencontrarse",
      description: "Institución privada que ofrece servicios de promoción, prevención, tratamiento y rehabilitación en salud mental con un enfoque bio-psicosocial, humanista y espiritual",
      location: "Sede Pradomar Calle 1F #. 21- 30, Centroolis, Barranquilla, Atlántico",
      url: "https://reencontrarse.com/"
    }
  ];
  
  return (
     <>
        <div>
          {instituciones.map(institucion => (
            <Institution key={institucion.id}  {...institucion} />
          ))}
        </div>
     </>
  )
}

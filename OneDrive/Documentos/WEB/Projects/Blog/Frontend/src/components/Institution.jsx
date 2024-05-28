export const Institution = ({id, name, description, location, url}) => {
  return (
    <>
      <div className="col animate__animated animate__fadeInRight mb-3">
            <div className="card">
                <div className="row no-gutters">
                    <div className="col-4 w-40 d-flex align-items-center justify-content-center">                 
                        <img src={`../../img/${id}.png`} className="card-img" alt={name} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </div>    
            
                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-bold">Ubicación: <strong>{location}</strong></small></p>
                            <a href={url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Ir a la página</a>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    </>
  )
}

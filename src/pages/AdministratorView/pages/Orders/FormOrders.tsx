
function FormOrders () {
  return (
   
    
      <section className="bg-cream-lighter p-4 shadow border-8 border-gray-700 mt-10">
      <div className="md:flex">
        <h2 className="md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">Crear Nueva Orden</h2>
      </div>
      <form>
        <div className="md:flex mb-6">
          <div className="md:w-1/4">
            <legend className="uppercase tracking-wide text-sm">Datos de la Poliza</legend>
            <p className="text-xs font-light text-red">Es requerido el numero de Poliza</p>
          </div>
        <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
        <div className="md:flex mb-4">
            <div className="md:flex-1 md:pr-3">
              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Numero de Poliza</label>
              <input className="w-full shadow-inner p-1 border-2 border-gray-150 mt-2" type="text" name="address_street" placeholder="P-25101415" />
            </div>
            <div className="md:flex-1 md:pl-3">
              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Tipo de Poliza</label>
              <input className="w-full shadow-inner p-1 border-2 border-gray-150 mt-2 " type="text" name="address_number" placeholder="Premium" />
              <span className="text-xs mb-4 font-thin"></span>
            </div>
          </div>
          <div className="md:flex mb-4">
            <div className="md:flex-1 md:pr-3">
              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Cobertura $</label>
              <input className="w-full shadow-inner p-1 border-2 border-gray-150 mt-2" type="text" name="address_street" placeholder="300$" />
            </div>
            <div className="md:flex-1 md:pl-3">
              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Cobertura KM</label>
              <input className="w-full shadow-inner p-1 border-2 border-gray-150 mt-2" type="text" name="address_number" placeholder="150 KM" />
              <span className="text-xs mb-4 font-thin"></span>
            </div>
          </div>
      
          </div>
        </div>
        <div className="md:flex mb-8">
          <div className="md:w-1/3">
            <legend className="uppercase tracking-wide text-sm">Datos del Asegurado</legend>
          </div>
          <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
            <div className="mb-4">
              <label className="block uppercase tracking-wide text-xs font-bold">Nombre Completo</label>
              <input className="w-full shadow-inner p-1 border-2 border-gray-150 mt-2" type="tel"  placeholder="Roseylin Yairet Medero Herrera"/>
            </div>
            <div className="md:flex mb-4">
            <div className="md:flex-1 md:pr-3">
              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Cedula</label>
              <input className="w-full shadow-inner p-4 border-2 border-gray-200" type="text"  placeholder="V-XXXXXXXX" />
            </div>
            <div className="md:flex-1 md:pl-3">
              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Telefono</label>
              <input className="w-full shadow-inner p-4 border-2 border-gray-200" type="text" placeholder="424-XXXXXXX" />
              <span className="text-xs mb-4 font-thin">We lied, this isn't required.</span>
            </div>
          </div>
            <div className="mb-4">
              <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Email</label>
              <input className="w-full shadow-inner p-4 border-0" type="email" name="email" placeholder="contact@acme.co"/>
            </div>
          </div>
        </div>
        <div className="md:flex">
          <div className="md:w-1/3">
            <legend className="uppercase tracking-wide text-sm">Social</legend>
          </div>
          <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
            <div className="md:flex mb-4">
              <div className="md:flex-1 md:pr-3">
                <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Facebook</label>
                <div className="w-full flex">
                  <span className="text-xs py-4 px-2 bg-grey-light text-grey-dark">facebook.com/</span>
                  <input className="flex-1 shadow-inner p-4 border-0" type="text" name="facebook" placeholder="acmeco"/>
                </div>
              </div>
              <div className="md:flex-1 md:pl-3 mt-2 md:mt-0">
                <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Twitter</label>
                <div className="w-full flex">
                  <span className="text-xs py-4 px-2 bg-grey-light text-grey-dark">twitter.com/</span>
                  <input className="flex-1 shadow-inner p-4 border-0" type="text" name="twitter" placeholder="acmeco"/>
                </div>
              </div>
            </div>
            <div className="md:flex mb-4">
              <div className="md:flex-1 md:pr-3">
                <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Instagram</label>
                <div className="w-full flex">
                  <span className="text-xs py-4 px-2 bg-grey-light text-grey-dark">instagram.com/</span>
                  <input className="flex-1 shadow-inner p-4 border-0" type="text" name="instagram" placeholder="acmeco"/>
                </div>
              </div>
              <div className="md:flex-1 md:pl-3 mt-2 md:mt-0">
                <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">Yelp</label>
                  <div className="w-full flex">
                    <span className="text-xs py-4 px-2 bg-grey-light text-grey-dark">yelp.com/</span>
                    <input className="flex-1 shadow-inner p-4 border-0" type="text" name="yelp" placeholder="acmeco"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <legend className="uppercase tracking-wide text-sm">Description</legend>
            </div>
            <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
              <textarea className="w-full shadow-inner p-4 border-0" placeholder="We build fine acmes." rows={6}></textarea>
            </div>
          </div>
          <div className="md:flex mb-6">
            <div className="md:w-1/3">
              <legend className="uppercase tracking-wide text-sm">Cover Image</legend>
            </div>
            <div className="md:flex-1 px-3 text-center">
              <div className="button bg-gold hover:bg-gold-dark text-cream mx-auto cusor-pointer relative">
                <input className="opacity-0 absolute pin-x pin-y" type="file" name="cover_image"/>
                Add Cover Image
              </div>
            </div>
          </div>
          <div className="md:flex mb-6 border border-t-1 border-b-0 border-x-0 border-cream-dark"/>
            <div className="md:flex-1 px-3 text-center md:text-right">
              <input type="hidden" name="sponsor" value="0"/>
              <input className="button text-cream-lighter bg-brick hover:bg-brick-dark" type="submit" value="Create Location"/>
            </div>
      </form>
      </section>
      
   
      
  
  )
}

export default FormOrders;
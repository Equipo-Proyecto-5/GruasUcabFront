import Navbar from "../../components/layouts/Navbar";


function Home(){
    return(
        <main>
        <Navbar />
        <div className="bg-gray-800 min-h-screen flex items-center justify-center">
      {/* Contenedor del texto */}
      <div className="text-center">
        {/* Texto con efecto de máquina de escribir */}
        <h1 className="text-white text-3xl   md:text-3xl lg:text-5xl inline-block overflow-hidden whitespace-nowrap border-r-2 border-white animate-typing ">
          Bienvenido al Sistema Gruas UCAB
        </h1>
      </div>
    </div>
        </main>
    );
};

export default Home;
import Navbar from "../../components/layouts/Navbar";


function Home(){
    return(
        <main>
        <Navbar />
        <div className="bg-gradient-to-r from-gray-800 to-gray-500 min-h-screen flex items-center justify-center">
      {/* Contenedor del texto */}
      <div className="text-center">
        {/* Texto con efecto de máquina de escribir */}
        <h1 className="text-green-500 text-3xl   md:text-3xl lg:text-5xl inline-block overflow-hidden whitespace-nowrap border-r-2 border-white animate-typing ">
          Bienvenido al Sistema Gruas UCAB
        </h1>
      </div>
    </div>
        </main>
    );
};

export default Home;
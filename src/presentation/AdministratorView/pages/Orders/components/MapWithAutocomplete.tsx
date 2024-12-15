import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    google: typeof google;
  }
}

const MapWithAutocomplete = () => {
  const [address, setAddress] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    const loadMap = async () => {
      if (!window.google) {
        console.error('Google Maps API no está cargada.');
        return;
      }

      // Crear el mapa
      const map = new window.google.maps.Map(mapRef.current as HTMLDivElement, {
        center: { lat: 0, lng: 0 },
        zoom: 15,
      });

      // Crear un marcador para mostrar la ubicación
      const marker = new window.google.maps.Marker({
        map,
        draggable: true,
      });

     

      // Configurar Autocomplete para la entrada de dirección
      if (inputRef.current) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
          types: ['address'],
        });

        // Escuchar el evento `place_changed` del autocompletado
        const listener = autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current?.getPlace();
          if (place && place.geometry && place.geometry.location) {
            const location = place.geometry.location;

            // Centrar el mapa y mover el marcador
            map.setCenter(location);
            marker.setPosition(location);

            // Actualizar latitud y longitud
            setLatitude(location.lat());
            setLongitude(location.lng());


            // Actualizar la dirección en el estado
            setAddress(place.formatted_address || '');
          } else {
            console.error('No se pudo obtener la información del lugar seleccionado.');
          }
        });

        // Limpieza del listener al desmontar el componente
        return () => {
          if (listener) {
            window.google.maps.event.removeListener(listener);
          }
        };
      }
    };

    loadMap();
  }, []);

  return (
    <div className="w-full">
      <div className="mb-4">
        <input
          ref={inputRef}
          id="address"
          type="text"
          placeholder="Escribe la dirección del incidente" 
          className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div
        ref={mapRef}
        className="w-full h-96 border rounded-lg"
        style={{ height: '400px' }}
      ></div>
      <div className="mt-4">
        <p><strong>Latitud:</strong> {latitude}</p>
        <p><strong>Longitud:</strong> {longitude}</p>
      </div>
    </div>
  );
};

export default MapWithAutocomplete;

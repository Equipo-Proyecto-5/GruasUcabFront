import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    google: typeof google;
  }
}

interface MapWithTwoLocationsProps {
  onOriginChange: (address: string, coords: { lat: number | null; lng: number | null }) => void;
  onDestinationChange: (address: string, coords: { lat: number | null; lng: number | null }) => void;
}

const MapWithTwoLocations: React.FC<MapWithTwoLocationsProps> = ({ onOriginChange, onDestinationChange }) => {
  const [originAddress, setOriginAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  const [originCoords, setOriginCoords] = useState<{ lat: number | null; lng: number | null }>({ lat: null, lng: null });
  const [destinationCoords, setDestinationCoords] = useState<{ lat: number | null; lng: number | null }>({ lat: null, lng: null });

  const mapRef = useRef<HTMLDivElement | null>(null);
  const originInputRef = useRef<HTMLInputElement | null>(null);
  const destinationInputRef = useRef<HTMLInputElement | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRefs = useRef<{ origin: google.maps.Marker | null; destination: google.maps.Marker | null }>({
    origin: null,
    destination: null,
  });

  useEffect(() => {
    if (!window.google) {
      console.error('Google Maps API no está cargada.');
      return;
    }
  
    // Crear el mapa
    mapInstanceRef.current = new window.google.maps.Map(mapRef.current as HTMLDivElement, {
      center: { lat: 0, lng: 0 }, // Coordenadas iniciales
      zoom: 15,
    });
  
    // Crear marcadores
    markerRefs.current.origin = new window.google.maps.Marker({
      map: mapInstanceRef.current,
      draggable: true,
    });
  
    markerRefs.current.destination = new window.google.maps.Marker({
      map: mapInstanceRef.current,
      draggable: true,
    });
  
    const setupAutocomplete = (
      inputRef: React.RefObject<HTMLInputElement>,
      type: 'origin' | 'destination'
    ) => {
      if (!inputRef.current) return;
  
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
      });
  
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place && place.geometry && place.geometry.location) {
          const location = place.geometry.location;
          const newCoords = { lat: location.lat(), lng: location.lng() };
  
          if (type === 'origin') {
            setOriginAddress(place.formatted_address || '');
            setOriginCoords(newCoords);
  
            // Llamar a la función para pasar las coordenadas al componente padre
            onOriginChange(place.formatted_address || '', newCoords);
  
            // Mover marcador de origen
            markerRefs.current.origin?.setPosition(location);
  
            // Centrar el mapa en el origen
            mapInstanceRef.current?.setCenter(location);
          } else if (type === 'destination') {
            setDestinationAddress(place.formatted_address || '');
            setDestinationCoords(newCoords);
  
            // Llamar a la función para pasar las coordenadas al componente padre
            onDestinationChange(place.formatted_address || '', newCoords);
  
            // Mover marcador de destino
            markerRefs.current.destination?.setPosition(location);
  
            // Centrar el mapa en el destino
            mapInstanceRef.current?.setCenter(location);
            mapInstanceRef.current?.setZoom(15);
          }
        } else {
          console.error('No se pudo obtener la información del lugar seleccionado.');
        }
      });
    };
    // Configurar autocompletado para entradas de origen y destino
    setupAutocomplete(originInputRef, 'origin');
    setupAutocomplete(destinationInputRef, 'destination');
  }, [onOriginChange, onDestinationChange]);

  

// Use effect para actualizar el mapa cuando las coordenadas cambian
useEffect(() => {
  if (originCoords.lat !== null && originCoords.lng !== null) {
    // Solo actualiza si las coordenadas son válidas
    if (originCoords.lat !== null && originCoords.lng !== null) {
      mapInstanceRef.current?.setCenter({ lat: originCoords.lat, lng: originCoords.lng });
    }
    mapInstanceRef.current?.setZoom(15);
  }
}, [originCoords]);

useEffect(() => {
  if (destinationCoords.lat !== null && destinationCoords.lng !== null) {
    // Solo actualiza si las coordenadas son válidas
    if (destinationCoords.lat !== null && destinationCoords.lng !== null) {
      mapInstanceRef.current?.setCenter({ lat: destinationCoords.lat, lng: destinationCoords.lng });
    }
    mapInstanceRef.current?.setZoom(15);
  }
}, [destinationCoords]);

  return (
    <div className="w-full">
      <div className="mb-4">
        <label className="block text-sm font-medium text-white">Dirección de Origen</label>
        <input
          ref={originInputRef}
          type="text"
          placeholder="Escribe la dirección de origen"
          className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={originAddress}
          onChange={(e) => setOriginAddress(e.target.value)}
        />
        <p><strong>Latitud Origen:</strong> {originCoords.lat}</p>
        <p><strong>Longitud Origen:</strong> {originCoords.lng}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-white">Dirección de Destino</label>
        <input
          ref={destinationInputRef}
          type="text"
          placeholder="Escribe la dirección de destino"
          className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={destinationAddress}
          onChange={(e) => setDestinationAddress(e.target.value)}
        />
        <p><strong>Latitud Destino:</strong> {destinationCoords.lat}</p>
        <p><strong>Longitud Destino:</strong> {destinationCoords.lng}</p>
      </div>

      <div
        ref={mapRef}
        className="w-full h-96 border rounded-lg"
        style={{ width: '100%', height: '400px' }}
      ></div>
    </div>
  );
};

export default MapWithTwoLocations;



const API_URL = import.meta.env.VITE_API_URL;

export const fetchCostsApi = async (idOrden: string) => {
    const response = await fetch(`${API_URL}/api/CostoAdicional/${idOrden}`);

    if (!response.ok) {
        throw new Error('Failed to fetch costs');
    }
    const data = await response.json();
    console.log("Datos recibidos de la API:", data);
    return data;
}


export const updateCostApi = async (id: string, costData: string) => {

    try {
        const response = await fetch(`${API_URL}/proccesCostoAdicional/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(costData), 
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error en la respuesta de la API:", errorText);
            throw new Error(`Error en la API: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Respuesta exitosa de la API:", data);

        
        if (data.status === 200) {
            console.log(data.message); 
            return data; 
        } else {
            console.error("Error: La respuesta no tiene un estado 200", data);
            throw new Error(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error("Error al realizar la solicitud:", error);
        throw error; 
    }
};



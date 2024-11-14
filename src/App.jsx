import { useState, useEffect } from "react";
import "./App.css";
import { fetchRessources } from "./services/api.js";

function App() {
  const [items, setItems] = useState([]);

  const getItems = async () => {
    try {
      const fetchResponse = await fetchRessources();
      const liste = fetchResponse.list;
      console.log("liste", liste[0].nom_ressource);
      setItems(fetchResponse.list);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Image</th>
              <th className="px-4 py-2 border-b">Nom Ressource</th>
              <th className="px-4 py-2 border-b">Quantité</th>
              <th className="px-4 py-2 border-b">Unité</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b">
                  {item.images ? (
                    <img
                      src={item.images[0]?.thumbnails?.small?.signedUrl}
                      alt={item.images[0]?.title}
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="px-4 py-2 border-b">{item.nom_ressource}</td>
                <td className="px-4 py-2 border-b">{item.quantite_ressource}</td>
                <td className="px-4 py-2 border-b">{item.unite_ressource}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

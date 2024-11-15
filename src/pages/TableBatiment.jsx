import { useState, useEffect } from "react";
import "../App.css";
import { fetchAllRessources, getBatimentById } from "../services/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useParams } from "react-router-dom";

function TableBatiment() {
  const [items, setItems] = useState([]);
  const [nomBatiment, setNomBatiment] = useState("");

  const { id } = useParams();

  const getItems = async () => {
    try {
      const fetchResponse = await fetchAllRessources();
      const liste = fetchResponse.list;
      console.log("liste", liste[0].nom_ressource);
      setItems(fetchResponse.list);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const getBatimentName = async (id) => {
    try {
      const fetchResponse = await getBatimentById(id);
      const nomBat = fetchResponse.nom_batiment;
      console.log("bat", nomBat);
      setNomBatiment(nomBat);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getBatimentName(id);
    }
    getItems();
  }, [id]);

  return (
    <div className="dark:bg-slate-900 text-slate-900 dark:text-gray-100 min-h-screen">
      <h1 className="xl:text-5xl text-3xl mb-8 text-center font-bold">{nomBatiment}</h1>
      <div className="overflow-x-auto">
        <Table className="min-w-full table-auto border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 text-lg py-2 border-slate-800 text-center dark:border-slate-100 border-b-2">
                Image
              </TableHead>
              <TableHead className="px-4 text-lg py-2 border-slate-800 text-center dark:border-slate-100 border-b-2">
                Nom de la ressource
              </TableHead>
              <TableHead className="px-4 text-lg py-2 border-slate-800 text-center dark:border-slate-100 border-b-2">
                Quantité
              </TableHead>
              <TableHead className="px-4 text-lg py-2 border-slate-900 text-center dark:border-slate-100 border-b-2 hidden sm:table-cell">
                Masse totale
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="px-4 py-2 border-b border-slate-800 text-center dark:border-slate-100">
                  {item.images ? (
                    <img
                      src={item.images[0]?.thumbnails?.small?.signedUrl}
                      alt={item.images[0]?.title}
                      className="w-15 h-15 aspect-square rounded-md object-cover"
                    />
                  ) : (
                    "Pas d'image"
                  )}
                </TableCell>
                <TableCell className="px-4 py-2 border-b border-slate-800 text-center dark:border-slate-100">
                  {item.nom_ressource}
                </TableCell>
                <TableCell className="px-4 py-2 border-b border-slate-800 text-center dark:border-slate-100">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "decimal",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }).format(item.quantite_ressource)}{" "}
                  {item.unite_ressource}
                </TableCell>
                <TableCell className="px-4 py-2 border-b border-slate-800 dark:border-slate-100 text-center hidden sm:table-cell">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "decimal",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }).format(item.masse_totale)}{" "}
                  kg
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default TableBatiment;

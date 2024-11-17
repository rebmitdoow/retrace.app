import { useState, useEffect } from "react";
import "../App.css";
import { fetchRessFromBat, getBatimentById, getRessourceById } from "../services/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useParams } from "react-router-dom";

function TableRessources() {
  const [items, setItems] = useState([]);
  const [nomBatiment, setNomBatiment] = useState("");

  const { idBat } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchResponse = await fetchRessFromBat(idBat);
        const liste = fetchResponse.list;
        const promises = liste.map((item) => getRessourceById(item.uuid));
        const resolvedRessources = await Promise.all(promises);
        setItems(resolvedRessources);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchData();
  }, [idBat]);

  useEffect(() => {
    const getBatimentName = async (idBat) => {
      try {
        const fetchResponse = await getBatimentById(idBat);
        const nomBat = fetchResponse.nom_batiment;
        console.log("bat", nomBat);
        setNomBatiment(nomBat);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    getBatimentName(idBat);
  }, [idBat]);

  return (
    <div className="min-h-screen">
      <h1 className="xl:text-5xl text-3xl mb-8 text-center font-mono font-bold">{nomBatiment}</h1>
      <div className="overflow-x-auto">
        <Table className="min-w-full table-auto border-collapse">
          <TableHeader>
            <TableRow>
              <TableHead className="px-4 text-lg py-2 text-center border-b-2">Image</TableHead>
              <TableHead className="px-4 text-lg py-2 text-center border-b-2">Nom de la ressource</TableHead>
              <TableHead className="px-4 text-lg py-2 text-center border-b-2">Quantité</TableHead>
              <TableHead className="px-4 text-lg py-2 text-center border-b-2 hidden sm:table-cell">
                Masse totale
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="px-4 py-2 border-b text-center">
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
                <TableCell className="px-4 py-2 border-b text-lg font-bold font-mono text-center">
                  {item.nom_ressource}
                </TableCell>
                <TableCell className="px-4 py-2 font-mono text-lg border-b text-center">
                  {new Intl.NumberFormat("fr-FR", {
                    style: "decimal",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  }).format(item.quantite_ressource)}{" "}
                  {item.unite_ressource}
                </TableCell>
                <TableCell className="px-4 py-2 border-b font-mono text-lg text-center hidden sm:table-cell">
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

export default TableRessources;

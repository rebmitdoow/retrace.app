import { DataTable } from "@/components/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchRessFromBat } from "@/services/api";
import { useParams } from "react-router-dom";
import ModalModifRess from "@/components/ModalModifRess";

const columnsRessources = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Tout selectionner"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selectionner la ligne"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nom_ressource",
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nom ressource
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-center capitalize">{row.getValue("nom_ressource")}</div>,
  },
  {
    id: "Type de ressource",
    header: "Type de ressource",
    cell: ({ row }) => {
      const typeName = row.original?.type_ressource?.nom_type || "N/A";
      return <div className="text-center">{typeName}</div>;
    },
  },
  {
    id: "Quantite ressource",
    header: "Quantité",
    cell: ({ row }) => {
      const quantiteRaw = row.original?.quantite_ressource;
      const unite = row.original?.type_ressource?.unite_type || "";
      const quantite =
        typeof quantiteRaw === "object" && quantiteRaw?.$numberDecimal
          ? parseFloat(quantiteRaw.$numberDecimal)
          : parseFloat(quantiteRaw);

      const formatted = !isNaN(quantite) ? new Intl.NumberFormat().format(quantite) : "N/A";

      return (
        <div className="text-center font-medium">
          {formatted} {unite}
        </div>
      );
    },
  },
  {
    accessorKey: "_id",
    enableHiding: false,
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      var id = row.getValue("_id");
      return (
        <div className="text-center">
          <ModalModifRess ress_id={id} />
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function TableRessources() {
  const [ressources, setRessources] = useState([]);
  const [nomProjet, setNomProjet] = useState("");
  const { batId } = useParams();

  useEffect(() => {
    const getRessourcesList = async (batId) => {
      try {
        const fetchResponse = await fetchRessFromBat(batId);
        const listeRessources = fetchResponse;
        /* console.log("listeRessources", listeRessources); */
        setRessources(listeRessources);
        setNomProjet(listeRessources[0].batiment_source.nom_projet);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    getRessourcesList(batId);
  }, [batId]);

  return (
    <>
      <h1 className="text-5xl font-bold">{nomProjet}</h1>
      <DataTable data={ressources} columns={columnsRessources} columnToFilter="nom_ressource"></DataTable>
    </>
  );
}

export default TableRessources;

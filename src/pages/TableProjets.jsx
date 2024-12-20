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
import { fetchAllBat } from "@/services/api";
import ModalModifBat from "@/components/ModalModifBat";
import { Link } from "react-router-dom";

const columns = [
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
    accessorKey: "nom_projet",
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nom bâtiment
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link className="capitalize" to={`../ressources/${row.original._id}`}>
        <div className="text-center">{row.getValue("nom_projet")}</div>
      </Link>
    ),
  },
  {
    accessorKey: "adresse_batiment",
    header: "Adresse",
    cell: ({ row }) => <div className="text-center">{row.getValue("adresse_batiment")}</div>,
  },
  {
    id: "Surface bâtiment",
    header: "Surface bâtiment",
    cell: ({ row }) => {
      const surfaceRaw = row.original?.surface_batiment;
      const surface =
        typeof surfaceRaw === "object" && surfaceRaw?.$numberDecimal
          ? parseFloat(surfaceRaw.$numberDecimal)
          : parseFloat(surfaceRaw);

      const formatted = !isNaN(surface) ? new Intl.NumberFormat().format(surface) : "N/A";

      return <div className="text-center font-medium">{formatted} m²</div>;
    },
  },
  {
    accessorKey: "_id",
    enableHiding: false,
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      var id = row.getValue("_id");
      /* console.log("id in table", id); */
      return (
        <div className="text-center">
          <ModalModifBat bat_id={id} />
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

function TableProjets() {
  const [projets, setProjets] = useState([]);

  useEffect(() => {
    const getBatimentList = async () => {
      try {
        const fetchResponse = await fetchAllBat();
        const listeBat = fetchResponse.data;
        setProjets(listeBat);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    getBatimentList();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold">Projets</h1>
      <DataTable data={projets} columns={columns} columnToFilter="nom_projet"></DataTable>
    </>
  );
}

export default TableProjets;

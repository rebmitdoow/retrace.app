import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getRessourceById, updateRessource } from "@/services/api";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ModalModifRess({ ress_id }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Modifier</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier</DialogTitle>
          <DialogDescription>Mettre à jour les informations de la ressource</DialogDescription>
        </DialogHeader>
        <FormModifRess id_ress={ress_id} />
      </DialogContent>
    </Dialog>
  );
}
ModalModifRess.propTypes = {
  ress_id: PropTypes.string.isRequired,
};

export function FormModifRess({ id_ress }) {
  const [formData, setFormData] = useState({
    nom_ressource: "",
    quantite_ressource: 0,
  });
  const [updateStatus, setUpdateStatus] = useState("");

  useEffect(() => {
    const getRessourceData = async (id) => {
      try {
        const fetchResponse = await getRessourceById(id);
        console.log("fetchResponse", fetchResponse);
        setFormData({
          nom_ressource: fetchResponse[0].nom_ressource || "",
          quantite_ressource: parseFloat(fetchResponse[0].quantite_ressource?.$numberDecimal) || 0,
        });
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    getRessourceData(id_ress);
  }, [id_ress]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      quantite_ressource: formData.quantite_ressource.toString(),
    };
    console.log("updatedFormData", updatedFormData);
    /* console.log("id", id_ress); */
    try {
      await updateRessource(id_ress, updatedFormData);
      setUpdateStatus(<AlertSucces />);
    } catch (error) {
      console.error("Error updating batiment:", error);
      setUpdateStatus(<AlertDestructive />);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="nom_ressource" className="text-right">
          Nom ressource
        </Label>
        <Input id="nom_ressource" value={formData.nom_ressource} onChange={handleInputChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="quantite_ressource" className="text-right">
          Quantité ressource
        </Label>
        <Input
          type="number"
          id="quantite_ressource"
          value={formData.quantite_ressource}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-2 items-center gap-4">
        <span>{updateStatus}</span>
        <Button className="text-md" size="lg" type="submit">
          Enregistrer
        </Button>
      </div>
    </form>
  );
}

FormModifRess.propTypes = {
  id_ress: PropTypes.string.isRequired,
};

export function AlertDestructive() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Erreur</AlertTitle>
      <AlertDescription>Il y a eu un problème, veuillez réessayer</AlertDescription>
    </Alert>
  );
}

export function AlertSucces() {
  return (
    <Alert variant="accent">
      <CheckCircle className="h-4 w-4" />
      <AlertDescription>Enregistré</AlertDescription>
    </Alert>
  );
}

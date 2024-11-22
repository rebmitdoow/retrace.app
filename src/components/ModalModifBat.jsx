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
import { getBatimentById, updateBatiment } from "@/services/api";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export default function ModalModifBat({ bat_id }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Modifier</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifier</DialogTitle>
          <DialogDescription>Mettre à jour les informations du bâtiment</DialogDescription>
        </DialogHeader>
        <FormModifBat id={bat_id} />
      </DialogContent>
    </Dialog>
  );
}
ModalModifBat.propTypes = {
  bat_id: PropTypes.string.isRequired,
};

export function FormModifBat({ id }) {
  const [formData, setFormData] = useState({
    nom_projet: "",
    adresse_batiment: "",
    surface_batiment: 0,
    type_batiment: "",
  });
  const [updateStatus, setUpdateStatus] = useState("");

  useEffect(() => {
    const getBatimentData = async (id) => {
      try {
        const fetchResponse = await getBatimentById(id);
        console.log("fetchResponse", fetchResponse);
        setFormData({
          nom_projet: fetchResponse[0].nom_projet || "",
          adresse_batiment: fetchResponse[0].adresse_batiment || "",
          type_batiment: fetchResponse[0].type_batiment || "",
          surface_batiment: parseFloat(fetchResponse[0].surface_batiment?.$numberDecimal) || 0,
        });
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    getBatimentData(id);
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      type_batiment: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      surface_batiment: formData.surface_batiment.toString(),
    };
    console.log("updatedFormData", updatedFormData);
    console.log("id", id);
    try {
      await updateBatiment(id, updatedFormData);
      setUpdateStatus(<AlertSucces />);
    } catch (error) {
      console.error("Error updating batiment:", error);
      setUpdateStatus(<AlertDestructive />);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="nom_projet" className="text-right">
          Nom du bâtiment
        </Label>
        <Input id="nom_projet" value={formData.nom_projet} onChange={handleInputChange} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="adresse_batiment" className="text-right">
          Adresse
        </Label>
        <Input
          id="adresse_batiment"
          value={formData.adresse_batiment}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="surface_batiment" className="text-right">
          Surface de plancher
        </Label>
        <Input
          type="number"
          id="surface_batiment"
          value={formData.surface_batiment}
          onChange={handleInputChange}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="type_batiment" className="text-right">
          Type de bâtiment
        </Label>
        <Select id="type_batiment" value={formData.type_batiment} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type de bâtiment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="logement">Logement</SelectItem>
            <SelectItem value="bureaux">Bureaux</SelectItem>
            <SelectItem value="industriel">Industriel</SelectItem>
          </SelectContent>
        </Select>
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

FormModifBat.propTypes = {
  id: PropTypes.string.isRequired,
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

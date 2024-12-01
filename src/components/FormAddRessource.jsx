//FormAddRessource.jsx
import { useForm } from "react-hook-form";
import { Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SelectType from "./SelectType";
import { useState } from "react";
import { getUnitType } from "@/services/api.js";

function FormAddRessource() {
  const [unitType, setUnitType] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const form = useForm({
    defaultValues: {
      nom_ressource: "",
      type_ressource: "",
      quantite_ressource: "",
    },
  });

  const onSubmit = (data) => {
    alert(`Form submitted: ${data.nom_ressource} ${data.type_ressource}`);
    form.reset();
    setUnitType("");
    setSelectedType("");
  };

  const handleTypeChange = async (selectedItem) => {
    setSelectedType(selectedItem.value);
    console.log(selectedItem.name);
    try {
      const unitType = await getUnitType(selectedItem.value);
      setUnitType(unitType || "");
    } catch (error) {
      console.error("Error fetching unit type:", error);
      setUnitType("");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormItem>
            <FormLabel htmlFor="nom_ressource">Nom de la ressource</FormLabel>
            <FormControl>
              <Input
                id="nom_ressource"
                {...form.register("nom_ressource", { required: "Obligatoire" })}
                placeholder="Nom de la ressource"
              />
            </FormControl>
            <FormMessage>{form.formState.errors.name?.message}</FormMessage>
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="type">Type de ressource</FormLabel>
            <SelectType
              value={selectedType}
              onChange={(value) => {
                handleTypeChange(value);
                form.setValue("type_ressource", value.value);
              }}
              placeholder="Sélectionner"
            />
          </FormItem>
          <FormItem>
            <FormLabel htmlFor="quantite_ressource">Quantité</FormLabel>
            <FormControl>
              <div className="flex items-center gap-4">
                <Input
                  id="quantite_ressource"
                  type="number"
                  min="0"
                  step="0.01"
                  {...form.register("quantite_ressource", { required: "Obligatoire" })}
                  placeholder="Quantité de la ressource"
                  className="flex-1"
                />
                <Input
                  type="text"
                  value={unitType || ""}
                  readOnly
                  className="w-14 select-none focus-none text-center"
                />
              </div>
            </FormControl>
            <FormMessage>{form.formState.errors.quantite_ressource?.message}</FormMessage>
          </FormItem>
          <Button type="submit" className="mt-4">
            Ajouter
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default FormAddRessource;

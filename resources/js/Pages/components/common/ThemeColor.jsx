import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "@inertiajs/react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Palette, ChevronDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import useDebounce from "@/hooks/use-debounce"; // Assuming you have this custom hook

const ThemeColor = ({ document }) => {
  const colors = [
    "#FF6F61", "#33B679", "#4B9CD3", "#FF6F91", "#9B59B6",
    "#1ABC9C", "#FF8C00", "#B2D300", "#8E44AD", "#FF4F81",
    "#2ECC71", "#3498DB", "#A3D550", "#00BFFF", "#5B2C6F"
  ];

  const { data, setData, post, processing } = useForm({
    themeColor: document?.theme_color || colors[0],
  });

  const [selectedColor, setSelectedColor] = useState(data.themeColor);

  const debouncedColor = useDebounce(selectedColor, 1000); // Debouncing for 1 second

  useEffect(() => {
    if (debouncedColor !== data.themeColor) {
      onSave();
    }
  }, [debouncedColor, data.themeColor]);

  const onColorSelect = useCallback((color) => {
    setSelectedColor(color);
    setData("themeColor", color); // Update form data
  }, [setData]);

  const onSave = useCallback(async () => {
    if (selectedColor === data.themeColor) return; // No change in color, skip

    try {
      // Trigger the POST request to update the theme color
      await post(route("documents.UpdateThemeColor", { id: document.id }), {
        data: {
          themeColor: selectedColor,
        },
      });

      toast({
        title: "Succès",
        description: "La couleur du thème a été mise à jour avec succès.",
      });
    } catch (error) {
      console.error("Échec de la mise à jour de la couleur du thème", error);
      toast({
        title: "Erreur",
        description: "La mise à jour de la couleur du thème a échoué.",
        variant: "destructive",
      });
    }
  }, [selectedColor, data.themeColor, document.id, post]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={processing}
          variant="secondary"
          className="bg-white border gap-1 dark:bg-gray-800 !p-2 lg:w-auto lg:p-4"
        >
          <div className="flex items-center gap-1">
            <Palette size="17px" />
            <span className="hidden lg:flex">Theme</span>
          </div>
          <ChevronDown size="14px" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="bg-background">
        <h2 className="mb-2 text-sm font-bold">Sélectionner la couleur du thème</h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((color, index) => (
            <div
              key={index}
              role="button"
             
              className={`h-5 w-8 rounded-[5px] hover:border-black border ${selectedColor === color && "border-black"}`}
              style={{ background: color }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeColor;

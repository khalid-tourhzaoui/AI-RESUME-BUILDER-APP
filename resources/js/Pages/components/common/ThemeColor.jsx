import React, { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Palette, ChevronDown } from "lucide-react";

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

  const onColorSelect = (color) => {
    setSelectedColor(color);  // Update UI state immediately
    onSave(color);  // Call to save color in backend
  };

  const onSave = async (color) => {
    console.log("Color updated successfully:", color);
    try {
      const response = await post(route("documents.UpdateThemeColor", { id: document.id }), {
        data: {
          themeColor: color,
        },
      });

      // Update selectedColor after receiving the response from backend
      if (response.data.success) {
        setSelectedColor(response.data.themeColor);  // Set the color returned from backend
        console.log("Color updated successfully:", response.data.themeColor);
      } else {
        console.error("Failed to update theme color:", response.data);
      }

    } catch (error) {
      console.error("Error updating theme color:", error);
    }
  };

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
              onClick={() => onColorSelect(color)}  // Set color when clicked
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

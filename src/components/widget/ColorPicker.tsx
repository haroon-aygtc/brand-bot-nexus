
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { colord, extend } from 'colord';
import namesPlugin from 'colord/plugins/names';

// Extend colord with the names plugin
extend([namesPlugin]);

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  presets?: string[];
}

const defaultPresets = [
  '#000000', '#ffffff', '#f44336', '#e91e63', '#9c27b0', '#673ab7', 
  '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
  '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722',
  '#795548', '#607d8b'
];

const ColorPicker = ({ color, onChange, presets = defaultPresets }: ColorPickerProps) => {
  const [localColor, setLocalColor] = useState(color);
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLCanvasElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setLocalColor(color);
  }, [color]);

  useEffect(() => {
    if (pickerRef.current) {
      const canvas = pickerRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Create gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        
        // Add colors
        gradient.addColorStop(0, "rgb(255, 0, 0)");
        gradient.addColorStop(0.17, "rgb(255, 255, 0)");
        gradient.addColorStop(0.33, "rgb(0, 255, 0)");
        gradient.addColorStop(0.5, "rgb(0, 255, 255)");
        gradient.addColorStop(0.67, "rgb(0, 0, 255)");
        gradient.addColorStop(0.83, "rgb(255, 0, 255)");
        gradient.addColorStop(1, "rgb(255, 0, 0)");
        
        // Fill with gradient
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Create white gradient overlay
        const whiteGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        whiteGradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        whiteGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.5)");
        whiteGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        
        // Fill with white gradient
        ctx.fillStyle = whiteGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Create black gradient overlay
        const blackGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        blackGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
        blackGradient.addColorStop(0.5, "rgba(0, 0, 0, 0.5)");
        blackGradient.addColorStop(1, "rgba(0, 0, 0, 1)");
        
        // Fill with black gradient
        ctx.fillStyle = blackGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [isOpen]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!pickerRef.current) return;
    
    const canvas = pickerRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const imageData = ctx.getImageData(x, y, 1, 1).data;
      const color = `#${imageData[0].toString(16).padStart(2, '0')}${imageData[1].toString(16).padStart(2, '0')}${imageData[2].toString(16).padStart(2, '0')}`;
      setLocalColor(color);
      onChange(color);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !pickerRef.current) return;
    handleCanvasClick(e);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalColor(e.target.value);
  };

  const handleInputBlur = () => {
    try {
      // Check if color is valid
      const validColor = colord(localColor).toHex();
      onChange(validColor);
    } catch (error) {
      // If invalid, reset to the current color
      setLocalColor(color);
    }
  };

  const handlePresetClick = (presetColor: string) => {
    setLocalColor(presetColor);
    onChange(presetColor);
  };

  return (
    <div className="flex items-center gap-2">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="w-10 h-10 p-0 rounded border" 
            style={{ backgroundColor: localColor }}
          ></Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-3">
          <div className="space-y-3">
            <div 
              className="relative" 
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
            >
              <canvas 
                ref={pickerRef} 
                width="220" 
                height="150" 
                className="w-full h-[150px] cursor-crosshair rounded-md"
                onClick={handleCanvasClick}
                onMouseMove={handleCanvasMouseMove}
              ></canvas>
            </div>
            
            <div className="grid grid-cols-10 gap-1">
              {presets.map((preset, i) => (
                <div
                  key={i}
                  className={`w-5 h-5 rounded-full cursor-pointer border ${localColor.toLowerCase() === preset.toLowerCase() ? 'ring-2 ring-offset-1 ring-black' : ''}`}
                  style={{ backgroundColor: preset }}
                  onClick={() => handlePresetClick(preset)}
                >
                  {localColor.toLowerCase() === preset.toLowerCase() && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded border" style={{ backgroundColor: localColor }}></div>
              <Input
                value={localColor}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className="flex-1 h-8 text-sm"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <Input
        value={localColor}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        className="flex-1"
      />
    </div>
  );
};

export default ColorPicker;

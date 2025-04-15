import { ChevronDown, Download, Star, Edit, Trash2 } from 'lucide-react';
import { forwardRef } from 'react';

const Dropdown = forwardRef(({ open, setOpen }, ref) => {
  return (
    <>
      <button 
        type="button" 
        className="text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100"
        onClick={() => setOpen(!open)}
      >
        <ChevronDown size={18} />
      </button>
      {open && (
        <div 
          ref={ref}
          className="absolute bottom-8 right-0 w-52 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10"
        >
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
            <Download size={16} className="mr-2" /> Save conversation
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
            <Star size={16} className="mr-2" /> Add to favorites
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
            <Edit size={16} className="mr-2" /> Rename
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center">
            <Trash2 size={16} className="mr-2" /> Delete conversation
          </button>
        </div>
      )}
    </>
  );
});

Dropdown.displayName = 'Dropdown';

export default Dropdown;
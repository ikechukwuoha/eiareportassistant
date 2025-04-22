// import { useState, useRef } from 'react';
// import { PaperclipIcon, MicIcon, SendIcon, XIcon } from 'lucide-react';
// import useClickOutside from '../../hooks/useClickOutside';

// export default function ChatInput({ input, setInput, handleSubmit, isSubmitting }) {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [error, setError] = useState(null);
//   const fileInputRef = useRef(null);
  
//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setSelectedFiles(prev => [...prev, ...files]);
//   };

//   const removeFile = (index) => {
//     setSelectedFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current.click();
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
    
//     // Don't submit if there's nothing to send (no text and no files)
//     if (input.trim() === '' && selectedFiles.length === 0) return;
    
//     try {
//       // Pass the message content and files to parent component
//       handleSubmit(e, input, selectedFiles.length > 0 ? [...selectedFiles] : null);
      
//       // Clear selected files after submission
//       setSelectedFiles([]);
//       // Input clearing is handled by parent component
      
//     } catch (error) {
//       console.error('Error in form submission:', error);
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="bg-white border-t border-gray-200 p-4">
//       <div className="max-w-3xl mx-auto relative">
//         {error && (
//           <div className="mb-3 p-2 bg-red-50 text-red-700 text-sm rounded border border-red-200">
//             {error}
//           </div>
//         )}
        
//         <form onSubmit={onSubmit} className="flex flex-col">
//           {/* Selected files preview */}
//           {selectedFiles.length > 0 && (
//             <div className="mb-2 flex flex-wrap gap-2">
//               {selectedFiles.map((file, index) => (
//                 <div 
//                   key={index} 
//                   className="flex items-center bg-gray-100 rounded-md py-1 px-2 text-sm"
//                 >
//                   <span className="truncate max-w-xs">{file.name}</span>
//                   <button 
//                     type="button" 
//                     onClick={() => removeFile(index)}
//                     className="ml-2 text-gray-500 hover:text-gray-700"
//                   >
//                     <XIcon size={14} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
          
//           <div className="flex items-end gap-2">
//             <div className="flex-1 bg-white border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500">
//               <div className="flex relative">
//                 <textarea
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   placeholder="Type your message here..."
//                   className="w-full p-3 focus:outline-none rounded-lg resize-none max-h-36"
//                   rows={1}
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter' && !e.shiftKey) {
//                       e.preventDefault();
//                       onSubmit(e);
//                     }
//                   }}
//                 />
//               </div>
//               <div className="flex items-center px-3 py-2 border-t border-gray-100">
//                 {/* Hidden file input */}
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleFileChange}
//                   className="hidden"
//                   multiple
//                 />
//                 <button 
//                   type="button" 
//                   onClick={triggerFileInput}
//                   className="text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100"
//                 >
//                   <PaperclipIcon size={18} />
//                 </button>
//                 <button 
//                   type="button" 
//                   className="text-gray-500 hover:text-gray-700 ml-1 p-1 rounded-md hover:bg-gray-100"
//                 >
//                   <MicIcon size={18} />
//                 </button>
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
//               disabled={(input.trim() === '' && selectedFiles.length === 0) || isSubmitting}
//             >
//               {isSubmitting ? (
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               ) : (
//                 <SendIcon size={18} />
//               )}
//             </button>
//           </div>
//         </form>
//         <p className="mt-2 text-xs text-gray-500 text-center">
//           Our AI assistant is here to help review your EIA documents and provide compliance insights.
//         </p>
//       </div>
//     </div>
//   );
// }






// import { useState, useRef, useEffect } from 'react';
// import { PaperclipIcon, MicIcon, SendIcon, XIcon } from 'lucide-react';
// import useClickOutside from '../../hooks/useClickOutside';

// export default function ChatInput({ input, setInput, handleSubmit, isSubmitting }) {
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [error, setError] = useState(null);
//   const [isThinking, setIsThinking] = useState(false);
//   const [thinkingDots, setThinkingDots] = useState('');
//   const fileInputRef = useRef(null);
  
//   // Animation effect for thinking dots
//   useEffect(() => {
//     let dotsInterval;
    
//     if (isSubmitting && selectedFiles.length > 0) {
//       setIsThinking(true);
//       dotsInterval = setInterval(() => {
//         setThinkingDots(prev => {
//           if (prev.length >= 3) return '';
//           return prev + '.';
//         });
//       }, 500);
//     } else {
//       setIsThinking(false);
//       setThinkingDots('');
//     }
    
//     return () => {
//       if (dotsInterval) clearInterval(dotsInterval);
//     };
//   }, [isSubmitting, selectedFiles.length]);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setSelectedFiles(prev => [...prev, ...files]);
//   };

//   const removeFile = (index) => {
//     setSelectedFiles(prev => prev.filter((_, i) => i !== index));
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current.click();
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
    
//     // Don't submit if there's nothing to send (no text and no files)
//     if (input.trim() === '' && selectedFiles.length === 0) return;
    
//     try {
//       // Pass the message content and files to parent component
//       handleSubmit(e, input, selectedFiles.length > 0 ? [...selectedFiles] : null);
      
//       // Clear selected files after submission
//       setSelectedFiles([]);
//       // Input clearing is handled by parent component
      
//     } catch (error) {
//       console.error('Error in form submission:', error);
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="bg-white border-t border-gray-200 p-4">
//       <div className="max-w-3xl mx-auto relative">
//         {error && (
//           <div className="mb-3 p-2 bg-red-50 text-red-700 text-sm rounded border border-red-200">
//             {error}
//           </div>
//         )}
        
//         <form onSubmit={onSubmit} className="flex flex-col">
//           {/* Selected files preview */}
//           {selectedFiles.length > 0 && (
//             <div className="mb-2 flex flex-wrap gap-2">
//               {selectedFiles.map((file, index) => (
//                 <div 
//                   key={index} 
//                   className="flex items-center bg-gray-100 rounded-md py-1 px-2 text-sm"
//                 >
//                   <span className="truncate max-w-xs">{file.name}</span>
//                   <button 
//                     type="button" 
//                     onClick={() => removeFile(index)}
//                     className="ml-2 text-gray-500 hover:text-gray-700"
//                   >
//                     <XIcon size={14} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
          
//           <div className="flex items-end gap-2">
//             <div className="flex-1 bg-white border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500">
//               <div className="flex relative">
//                 {isThinking ? (
//                   <div className="w-full p-3 animate-pulse">
//                     <span className="text-gray-500 font-medium">Thinking{thinkingDots}</span>
//                   </div>
//                 ) : (
//                   <textarea
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     placeholder="Type your message here..."
//                     className="w-full p-3 focus:outline-none rounded-lg resize-none max-h-36"
//                     rows={1}
//                     onKeyDown={(e) => {
//                       if (e.key === 'Enter' && !e.shiftKey) {
//                         e.preventDefault();
//                         onSubmit(e);
//                       }
//                     }}
//                     disabled={isSubmitting}
//                   />
//                 )}
//               </div>
//               <div className="flex items-center px-3 py-2 border-t border-gray-100">
//                 {/* Hidden file input */}
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleFileChange}
//                   className="hidden"
//                   multiple
//                   disabled={isSubmitting}
//                 />
//                 <button 
//                   type="button" 
//                   onClick={triggerFileInput}
//                   className="text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
//                   disabled={isSubmitting}
//                 >
//                   <PaperclipIcon size={18} />
//                 </button>
//                 <button 
//                   type="button" 
//                   className="text-gray-500 hover:text-gray-700 ml-1 p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
//                   disabled={isSubmitting}
//                 >
//                   <MicIcon size={18} />
//                 </button>
//               </div>
//             </div>
//             <button
//               type="submit"
//               className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
//               disabled={(input.trim() === '' && selectedFiles.length === 0) || isSubmitting}
//             >
//               {isSubmitting ? (
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//               ) : (
//                 <SendIcon size={18} />
//               )}
//             </button>
//           </div>
//         </form>
//         <p className="mt-2 text-xs text-gray-500 text-center">
//           Our AI assistant is here to help review your EIA documents and provide compliance insights.
//         </p>
//       </div>
//     </div>
//   );
// }







import { useState, useRef, useEffect } from 'react';
import { PaperclipIcon, MicIcon, SendIcon, XIcon } from 'lucide-react';
import useClickOutside from '../../hooks/useClickOutside';

export default function ChatInput({ input, setInput, handleSubmit, isSubmitting }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState(null);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingDots, setThinkingDots] = useState('');
  const fileInputRef = useRef(null);
  
  // Thinking animation effect
  useEffect(() => {
    let interval;
    if (isSubmitting && selectedFiles.length > 0) {
      setIsThinking(true);
      let counter = 0;
      interval = setInterval(() => {
        setThinkingDots('.'.repeat((counter % 3) + 1));
        counter++;
      }, 500);
    } else {
      setIsThinking(false);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSubmitting, selectedFiles.length]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if (input.trim() === '' && selectedFiles.length === 0) return;
    
    try {
      handleSubmit(e, input, selectedFiles.length > 0 ? [...selectedFiles] : null);
      setSelectedFiles([]);
    } catch (error) {
      console.error('Error in form submission:', error);
      setError(error.message);
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="max-w-3xl mx-auto relative">
        {error && (
          <div className="mb-3 p-2 bg-red-50 text-red-700 text-sm rounded border border-red-200">
            {error}
          </div>
        )}
        
        <form onSubmit={onSubmit} className="flex flex-col">
          {/* Selected files preview */}
          {selectedFiles.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {selectedFiles.map((file, index) => (
                <div 
                  key={index} 
                  className="flex items-center bg-gray-100 rounded-md py-1 px-2 text-sm"
                >
                  <span className="truncate max-w-xs">{file.name}</span>
                  <button 
                    type="button" 
                    onClick={() => removeFile(index)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <XIcon size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <div className="flex items-end gap-2">
            <div className="flex-1 bg-white border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500">
              <div className="flex relative">
                {isThinking ? (
                  <div className="w-full p-3 rounded-lg flex items-center">
                    <span className="text-gray-400 animate-pulse">
                      Analyzing file{thinkingDots}
                    </span>
                  </div>
                ) : (
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full p-3 focus:outline-none rounded-lg resize-none max-h-36"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        onSubmit(e);
                      }
                    }}
                  />
                )}
              </div>
              <div className="flex items-center px-3 py-2 border-t border-gray-100">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                />
                <button 
                  type="button" 
                  onClick={triggerFileInput}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-md hover:bg-gray-100"
                  disabled={isSubmitting}
                >
                  <PaperclipIcon size={18} />
                </button>
                <button 
                  type="button" 
                  className="text-gray-500 hover:text-gray-700 ml-1 p-1 rounded-md hover:bg-gray-100"
                  disabled={isSubmitting}
                >
                  <MicIcon size={18} />
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
              disabled={(input.trim() === '' && selectedFiles.length === 0) || isSubmitting}
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <SendIcon size={18} />
              )}
            </button>
          </div>
        </form>
        <p className="mt-2 text-xs text-gray-500 text-center">
          Our AI assistant is here to help review your EIA documents and provide compliance insights.
        </p>
      </div>
    </div>
  );
}
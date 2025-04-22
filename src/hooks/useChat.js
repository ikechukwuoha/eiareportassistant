import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

function useChat() {
  // Get user safely from Redux store with fallback
  const user = useSelector((state) => state?.auth?.user || null);
  
  // Create personalized greeting based on available user data
  const createGreeting = () => {
    if (!user) return 'Hello! How can I help you today?';
    
    // Include first_name, other_name, and last_name if available
    const nameParts = [
      user.first_name || '', 
      user.other_name || '', 
      user.last_name || ''
    ].filter(Boolean);
    
    const fullName = nameParts.join(' ').trim();
    
    return fullName 
      ? `Hello ${fullName}! Let us review your EIA Document today kindly share the document...`
      : 'Hello! How can I help you today?';
  };

  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', content: createGreeting() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update greeting if user data changes
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([{ id: 1, role: 'assistant', content: createGreeting() }]);
    }
  }, [user]);


  // Enhanced formatApiResult function to better handle the EIA response structure
  const formatApiResult = (apiResult) => {
    if (!apiResult) return "I've received your document and am processing it.";
    
    // Check if the API result has the overall_review property (which contains the executive summary)
    if (apiResult.overall_review) {
      return apiResult.overall_review;
    }
    
    // If no overall_review, create a comprehensive summary from section_reviews
    if (apiResult.section_reviews) {
      let summary = "# EIA Document Review Summary\n\n";
      
      // Add document structure overview
      if (apiResult.document_structure) {
        summary += "## Document Structure\n\n";
        const structure = apiResult.document_structure;
        Object.keys(structure).sort().forEach(key => {
          if (key.startsWith('has_')) {
            const sectionName = key.replace('has_', '').replace(/_/g, ' ');
            summary += `- **${sectionName}**: ${structure[key] ? '✅ Present' : '❌ Not present'}\n`;
          }
        });
        summary += "\n";
      }
      
      // Add section review highlights
      summary += "## Section Reviews\n\n";
      const reviews = apiResult.section_reviews;
      
      Object.keys(reviews).sort().forEach(sectionKey => {
        // Skip sections that are not found in the document
        if (Array.isArray(reviews[sectionKey]) && reviews[sectionKey].some(item => item.error)) {
          return;
        }
        
        if (Array.isArray(reviews[sectionKey])) {
          const validReviews = reviews[sectionKey].filter(review => !review.error);
          
          if (validReviews.length > 0) {
            const sectionName = sectionKey.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase());
            summary += `### ${sectionName}\n\n`;
            
            // Compliance statistics
            const compliantCount = validReviews.filter(r => r.compliance === "Compliant").length;
            const partialCount = validReviews.filter(r => r.compliance === "Partially compliant").length;
            const nonCompliantCount = validReviews.filter(r => r.compliance === "Non-compliant").length;
            const unknownCount = validReviews.filter(r => r.compliance === "Unable to determine").length;
            
            summary += `**Compliance Status**: ${compliantCount} compliant, ${partialCount} partially compliant, ${nonCompliantCount} non-compliant, ${unknownCount} undetermined\n\n`;
            
            // Add details of non-compliant items
            if (nonCompliantCount > 0) {
              summary += "**Non-compliant criteria:**\n\n";
              validReviews.filter(r => r.compliance === "Non-compliant").forEach(review => {
                summary += `- ${review.criterion}\n`;
                if (review.explanation) {
                  const cleanExplanation = review.explanation
                    .replace(/\'Partially compliant\'|\'Non-compliant\'/g, '')
                    .replace(/\n\n/g, ' ')
                    .trim();
                  summary += `  - ${cleanExplanation}\n`;
                }
              });
              summary += "\n";
            }
          }
        }
      });
      
      // Add recommendations based on non-compliant sections
      summary += "## Key Recommendations\n\n";
      const allReviews = [];
      Object.keys(reviews).forEach(sectionKey => {
        if (Array.isArray(reviews[sectionKey])) {
          reviews[sectionKey].forEach(review => {
            if (!review.error && (review.compliance === "Non-compliant" || review.compliance === "Partially compliant")) {
              allReviews.push({
                section: sectionKey.replace(/_/g, ' '),
                ...review
              });
            }
          });
        }
      });
      
      // Sort reviews by compliance (non-compliant first)
      allReviews.sort((a, b) => {
        if (a.compliance === "Non-compliant" && b.compliance !== "Non-compliant") return -1;
        if (a.compliance !== "Non-compliant" && b.compliance === "Non-compliant") return 1;
        return 0;
      });
      
      // Take top 5 issues to recommend
      const topIssues = allReviews.slice(0, 5);
      if (topIssues.length > 0) {
        topIssues.forEach((review, index) => {
          summary += `${index + 1}. **${review.section}**: ${review.criterion}\n`;
          if (review.explanation) {
            const cleanExplanation = review.explanation
              .replace(/\'Partially compliant\'|\'Non-compliant\'/g, '')
              .replace(/\n\n/g, ' ')
              .trim();
            summary += `   - ${cleanExplanation}\n`;
          }
        });
      } else {
        summary += "No specific recommendations - all reviewed sections are compliant.\n";
      }
      
      return summary;
    }
    
    // Fallback response if the structure doesn't match expected format
    return "I've reviewed your document, but the structure wasn't in the expected format. Please contact support for assistance.";
  };

  // This is our updated handleSubmit that better handles API responses
  const handleSubmit = (e, messageContent, files, apiResult) => {
    e?.preventDefault(); // Added optional chaining for cases where e might be undefined
    
    // Don't process if there's nothing to send (defensive check)
    if (!messageContent && (!files || files.length === 0) && !apiResult) return;
    
    // Prepare display content for the message
    let displayContent = messageContent || '';
    
    // If we have files, add their names to the display content
    if (files && files.length > 0) {
      const fileNames = files.map(file => file.name).join(', ');
      displayContent += displayContent ? 
        ` (Attached files: ${fileNames})` : 
        `Uploading files: ${fileNames}`;
    }
    
    // Only add a user message if we have content or files to display
    if (displayContent) {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          role: 'user',
          content: displayContent,
          files: files && files.length > 0 ? [...files] : undefined
        }
      ]);
    }
    
    // Add AI response if we have an API result
    if (apiResult) {
      const formattedResponse = formatApiResult(apiResult);
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          role: 'assistant',
          content: formattedResponse
        }
      ]);
    }
    
    // Clear input
    setInput('');
  };

  const startNewChat = () => {
    setMessages([{ id: 1, role: 'assistant', content: createGreeting() }]);
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    handleSubmit,
    startNewChat,
    messagesEndRef
  };
}

export default useChat;
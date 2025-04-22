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
    
    let formattedOutput = "# EIA Document Review Report\n\n";
    
    // Add overall review (executive summary) section
    if (apiResult.overall_review) {
      formattedOutput += "## Executive Summary\n\n";
      formattedOutput += apiResult.overall_review + "\n\n";
    }
    
    // Add document structure overview - MODIFIED FOR VERTICAL LAYOUT
    if (apiResult.document_structure) {
      formattedOutput += "## Document Structure\n\n";
      const structure = apiResult.document_structure;
      
      // Create vertical list instead of table
      Object.keys(structure).sort().forEach(key => {
        if (key.startsWith('has_')) {
          const sectionName = key.replace('has_', '').replace(/_/g, ' ');
          const formattedSectionName = sectionName.charAt(0).toUpperCase() + sectionName.slice(1);
          // Use cleaner format with better spacing and bullet symbols
          const statusSymbol = structure[key] ? '✓' : '✗'; // Using cleaner check/cross marks
          formattedOutput += `${formattedSectionName} | ${statusSymbol}\n`;
        }
      });
      formattedOutput += "\n";
    }
    
    // Add detailed section reviews - render each section
    if (apiResult.section_reviews) {
      formattedOutput += "## Section Reviews\n\n";
      const reviews = apiResult.section_reviews;
      
      Object.keys(reviews).sort().forEach(sectionKey => {
        const sectionName = sectionKey.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        formattedOutput += `### ${sectionName}\n\n`;
        
        // Handle error case (section not found)
        if (Array.isArray(reviews[sectionKey]) && reviews[sectionKey].length > 0 && reviews[sectionKey][0].error) {
          formattedOutput += `⚠️ ${reviews[sectionKey][0].error}\n\n`;
          return;
        }
        
        // Process each review criterion for the section
        if (Array.isArray(reviews[sectionKey])) {
          reviews[sectionKey].forEach(review => {
            if (!review.error) {
              // Format compliance status with appropriate emoji
              let statusEmoji = '❓';
              if (review.compliance === "Compliant") statusEmoji = '✓';
              else if (review.compliance === "Partially compliant") statusEmoji = '⚠️';
              else if (review.compliance === "Non-compliant") statusEmoji = '✗';
              
              formattedOutput += `#### ${statusEmoji} ${review.criterion}\n\n`;
              formattedOutput += `**Status**: ${review.compliance}\n\n`;
              
              if (review.explanation) {
                // Clean up explanation text
                const cleanExplanation = review.explanation
                  .replace(/\'Compliant\'|\'Partially compliant\'|\'Non-compliant\'|\'Unable to determine\'/g, '')
                  .replace(/^\n+/, '')
                  .trim();
                  
                formattedOutput += `**Explanation**: ${cleanExplanation}\n\n`;
              }
            }
          });
        }
      });
    }
    
    // Add summary of compliance status
    if (apiResult.section_reviews) {
      formattedOutput += "## Compliance Summary\n\n";
      
      let totalCompliant = 0;
      let totalPartiallyCompliant = 0;
      let totalNonCompliant = 0;
      let totalUndetermined = 0;
      let totalCriteria = 0;
      
      Object.keys(apiResult.section_reviews).forEach(sectionKey => {
        const sectionReviews = apiResult.section_reviews[sectionKey];
        if (Array.isArray(sectionReviews)) {
          sectionReviews.forEach(review => {
            if (!review.error) {
              totalCriteria++;
              if (review.compliance === "Compliant") totalCompliant++;
              else if (review.compliance === "Partially compliant") totalPartiallyCompliant++;
              else if (review.compliance === "Non-compliant") totalNonCompliant++;
              else if (review.compliance === "Unable to determine") totalUndetermined++;
            }
          });
        }
      });
      
      formattedOutput += `- **Total criteria evaluated**: ${totalCriteria}\n`;
      formattedOutput += `- **Compliant**: ${totalCompliant} (${Math.round(totalCompliant/totalCriteria*100)}%)\n`;
      formattedOutput += `- **Partially compliant**: ${totalPartiallyCompliant} (${Math.round(totalPartiallyCompliant/totalCriteria*100)}%)\n`;
      formattedOutput += `- **Non-compliant**: ${totalNonCompliant} (${Math.round(totalNonCompliant/totalCriteria*100)}%)\n`;
      formattedOutput += `- **Unable to determine**: ${totalUndetermined} (${Math.round(totalUndetermined/totalCriteria*100)}%)\n\n`;
    }
    
    // Add recommendations section based on non-compliant and partially compliant items
    if (apiResult.section_reviews) {
      formattedOutput += "## Key Recommendations\n\n";
      
      const allIssues = [];
      Object.keys(apiResult.section_reviews).forEach(sectionKey => {
        const sectionReviews = apiResult.section_reviews[sectionKey];
        if (Array.isArray(sectionReviews)) {
          sectionReviews.forEach(review => {
            if (!review.error && (review.compliance === "Non-compliant" || review.compliance === "Partially compliant")) {
              allIssues.push({
                section: sectionKey.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
                ...review
              });
            }
          });
        }
      });
      
      // Sort issues (non-compliant first)
      allIssues.sort((a, b) => {
        if (a.compliance === "Non-compliant" && b.compliance !== "Non-compliant") return -1;
        if (a.compliance !== "Non-compliant" && b.compliance === "Non-compliant") return 1;
        return 0;
      });
      
      if (allIssues.length > 0) {
        allIssues.forEach((issue, index) => {
          formattedOutput += `### ${index + 1}. ${issue.section} - ${issue.criterion}\n\n`;
          formattedOutput += `**Status**: ${issue.compliance}\n\n`;
          
          if (issue.explanation) {
            const cleanExplanation = issue.explanation
              .replace(/\'Partially compliant\'|\'Non-compliant\'/g, '')
              .replace(/^\n+/, '')
              .trim();
              
            formattedOutput += `**Recommendation**: Address the following issue: ${cleanExplanation}\n\n`;
          }
        });
      } else {
        formattedOutput += "No significant issues identified - all reviewed sections are compliant.\n\n";
      }
    }
    
    return formattedOutput;
  };

  // This is our updated handleSubmit that better handles API responses

  const handleSubmit = (e, messageContent, files, apiResult) => {
    e?.preventDefault();
    
    if (!messageContent && (!files || files.length === 0) && !apiResult) return;
    
    let displayContent = messageContent || '';
    
    if (files && files.length > 0) {
      const fileNames = files.map(file => file.name).join(', ');
      displayContent += displayContent ? 
        ` (Attached files: ${fileNames})` : 
        `Uploading files: ${fileNames}`;
    }
    
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
    
    if (apiResult) {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          role: 'assistant',
          content: apiResult.content || formatApiResult(apiResult)
        }
      ]);
    }
    
    setInput('');
  };
  // const handleSubmit = (e, messageContent, files, apiResult) => {
  //   e?.preventDefault(); // Added optional chaining for cases where e might be undefined
    
  //   // Don't process if there's nothing to send (defensive check)
  //   if (!messageContent && (!files || files.length === 0) && !apiResult) return;
    
  //   // Prepare display content for the message
  //   let displayContent = messageContent || '';
    
  //   // If we have files, add their names to the display content
  //   if (files && files.length > 0) {
  //     const fileNames = files.map(file => file.name).join(', ');
  //     displayContent += displayContent ? 
  //       ` (Attached files: ${fileNames})` : 
  //       `Uploading files: ${fileNames}`;
  //   }
    
  //   // Only add a user message if we have content or files to display
  //   if (displayContent) {
  //     setMessages(prev => [
  //       ...prev,
  //       {
  //         id: prev.length + 1,
  //         role: 'user',
  //         content: displayContent,
  //         files: files && files.length > 0 ? [...files] : undefined
  //       }
  //     ]);
  //   }
    
  //   // Add AI response if we have an API result
  //   if (apiResult) {
  //     const formattedResponse = formatApiResult(apiResult);
  //     setMessages(prev => [
  //       ...prev,
  //       {
  //         id: prev.length + 1,
  //         role: 'assistant',
  //         content: formattedResponse
  //       }
  //     ]);
  //   }
    
  //   // Clear input
  //   setInput('');
  // };

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
    messagesEndRef,
    formatApiResult
  };
}

export default useChat;
import React from "react";

const Avatar = ({ src, alt, size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-12 h-12",
  };

  return (
    <div className={`overflow-hidden rounded-full ${sizeClasses[size]} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt || "Avatar"}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
          {alt ? alt.charAt(0).toUpperCase() : "U"}
        </div>
      )}
    </div>
  );
};

export default Avatar;
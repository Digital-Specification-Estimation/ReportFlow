import React, { useRef, useEffect, useState } from "react";

interface EditableAreaProps {
  content: string;
  onChange: (content: string) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const EditableArea: React.FC<EditableAreaProps> = ({
  content,
  onChange,
  className,
  placeholder,
  disabled = false,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (
      contentRef.current &&
      contentRef.current.innerHTML !== content &&
      !isFocused
    ) {
      contentRef.current.innerHTML = content || "";
    }
  }, [content, isFocused]);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    // Optional: real-time updates
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setIsFocused(false);
    onChange(e.currentTarget.innerHTML);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div
      ref={contentRef}
      contentEditable={!disabled}
      className={className}
      onInput={handleInput}
      onBlur={handleBlur}
      onFocus={handleFocus}
      suppressContentEditableWarning
      style={{ outline: "none" }}
      data-placeholder={placeholder}
    />
  );
};

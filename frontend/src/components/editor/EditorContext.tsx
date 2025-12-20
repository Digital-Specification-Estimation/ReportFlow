import React, { createContext, useContext } from "react";

interface EditorContextType {
  headerContent: string;
  setHeaderContent: (content: string) => void;
  footerContent: string;
  setFooterContent: (content: string) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider = EditorContext.Provider;

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorContext must be used within an EditorProvider");
  }
  return context;
};

import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  GripVertical,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store/editorStore";
import type { TOCSection } from "@/types";

interface TOCItemProps {
  section: TOCSection;
  isActive: boolean;
  onSelect: (sectionId: string) => void;
  onRename: (id: string, title: string) => void;
  onDelete: (id: string) => void;
  onAddChild: (parentId: string) => void;
}

const TOCItem = ({
  section,
  isActive,
  onSelect,
  onRename,
  onDelete,
  onAddChild,
}: TOCItemProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(section.title);

  const hasChildren = section.children && section.children.length > 0;
  const paddingLeft = section.level === 1 ? 8 : section.level === 2 ? 24 : 40;

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onRename(section.id, editTitle.trim());
    } else {
      setEditTitle(section.title);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(section.title);
    setIsEditing(false);
  };

  return (
    <div>
      <div
        className={cn(
          "group flex items-center gap-1 py-2 px-2 rounded-lg cursor-pointer transition-all duration-200",
          "hover:bg-secondary/80",
          isActive &&
            "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
        )}
        style={{ paddingLeft }}
      >
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-0.5 hover:bg-background/20 rounded transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="h-3.5 w-3.5" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5" />
            )}
          </button>
        ) : (
          <div className="w-4" />
        )}

        {isEditing ? (
          <div className="flex-1 flex items-center gap-1">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="h-6 text-xs py-0 px-2"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSaveEdit();
                if (e.key === "Escape") handleCancelEdit();
              }}
            />
            <button
              onClick={handleSaveEdit}
              className="p-0.5 hover:bg-background/20 rounded"
            >
              <Check className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleCancelEdit}
              className="p-0.5 hover:bg-background/20 rounded"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <>
            <span
              onClick={() => onSelect(section.id)}
              className={cn(
                "flex-1 text-sm truncate transition-all",
                section.level === 1 && "font-semibold",
                section.level === 2 && "font-medium",
                section.level === 3 && "text-sm",
                isActive && "font-semibold"
              )}
            >
              {section.title}
            </span>

            <div className="hidden group-hover:flex items-center gap-0.5">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
                className={cn(
                  "p-1 rounded hover:bg-background/20 transition-colors",
                  isActive && "hover:bg-primary-foreground/20"
                )}
              >
                <Edit2 className="h-3 w-3" />
              </button>
              {section.level < 3 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddChild(section.id);
                  }}
                  className={cn(
                    "p-1 rounded hover:bg-background/20 transition-colors",
                    isActive && "hover:bg-primary-foreground/20"
                  )}
                >
                  <Plus className="h-3 w-3" />
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(section.id);
                }}
                className={cn(
                  "p-1 rounded hover:bg-destructive/20 text-destructive transition-colors",
                  isActive && "text-primary-foreground hover:bg-destructive/30"
                )}
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          </>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="animate-slide-down">
          {section.children!.map((child) => (
            <TOCItem
              key={child.id}
              section={child}
              isActive={false}
              onSelect={onSelect}
              onRename={onRename}
              onDelete={onDelete}
              onAddChild={onAddChild}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface ScrollableTOCProps {
  sections: TOCSection[];
  activeSectionId: string | null;
  onSelectSection: (sectionId: string) => void;
}

const ScrollableTOC = ({
  sections,
  activeSectionId,
  onSelectSection,
}: ScrollableTOCProps) => {
  const { renameSection, removeSection, addSection } = useEditorStore();

  const renderTOCItems = (sections: TOCSection[]): JSX.Element[] => {
    return sections.map((section) => (
      <TOCItem
        key={section.id}
        section={section}
        isActive={activeSectionId === section.id}
        onSelect={onSelectSection}
        onRename={renameSection}
        onDelete={removeSection}
        onAddChild={addSection}
      />
    ));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-sidebar-border bg-sidebar/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-sidebar-foreground">
            Table of Contents
          </h2>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => addSection()}
            className="h-7 w-7"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
        {renderTOCItems(sections)}
      </div>
    </div>
  );
};

export default ScrollableTOC;

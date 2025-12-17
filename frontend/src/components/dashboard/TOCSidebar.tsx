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
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TOCItemProps {
  section: TOCSection;
  isActive: boolean;
  onSelect: (section: TOCSection) => void;
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

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

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
    <div ref={setNodeRef} style={style}>
      <div
        className={cn(
          "group flex items-center gap-1 rounded-lg cursor-pointer transition-all duration-150",
          section.level === 1 &&
            "py-2.5 px-3 bg-muted/50 border-l-4 border-primary mb-1",
          section.level === 2 && "py-1.5 px-2 ml-2",
          section.level === 3 && "py-1 px-2 ml-4",
          "hover:bg-secondary",
          isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
        )}
        style={{ paddingLeft: section.level === 1 ? 8 : paddingLeft }}
      >
        <button
          className="p-0.5 opacity-0 group-hover:opacity-50 hover:!opacity-100 cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-3.5 w-3.5" />
        </button>

        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-0.5 hover:bg-background/20 rounded"
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
              onClick={() => onSelect(section)}
              className={cn(
                "flex-1 truncate",
                section.level === 2 && "text-muted-foreground",
                section.level === 3 && "text-muted-foreground/50"
              )}
              style={{
                fontWeight:
                  section.level === 1 ? 800 : section.level === 2 ? 400 : 300,
                fontSize:
                  section.level === 1
                    ? "14px"
                    : section.level === 2
                    ? "12px"
                    : "11px",
                color: section.level === 1 ? "#1e40af" : undefined,
                letterSpacing: section.level === 1 ? "0.025em" : undefined,
              }}
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
                  "p-1 rounded hover:bg-background/20",
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
                    "p-1 rounded hover:bg-background/20",
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
                  "p-1 rounded hover:bg-destructive/20 text-destructive",
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

interface TOCSidebarProps {
  sections: TOCSection[];
  activeSection: TOCSection | null;
  onSelectSection: (section: TOCSection) => void;
}

const TOCSidebar = ({
  sections,
  activeSection,
  onSelectSection,
}: TOCSidebarProps) => {
  const { renameSection, removeSection, addSection, updateSectionOrder } =
    useEditorStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      updateSectionOrder(arrayMove(sections, oldIndex, newIndex));
    }
  };

  const flattenSections = (sections: TOCSection[]): string[] => {
    return sections.reduce<string[]>((acc, section) => {
      acc.push(section.id);
      if (section.children) {
        acc.push(...flattenSections(section.children));
      }
      return acc;
    }, []);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-sidebar-border">
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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={flattenSections(sections)}
            strategy={verticalListSortingStrategy}
          >
            {sections.map((section) => (
              <TOCItem
                key={section.id}
                section={section}
                isActive={activeSection?.id === section.id}
                onSelect={onSelectSection}
                onRename={renameSection}
                onDelete={removeSection}
                onAddChild={addSection}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default TOCSidebar;

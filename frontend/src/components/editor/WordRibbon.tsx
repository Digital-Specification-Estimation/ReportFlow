import React, { useState, useCallback } from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Copy,
  ClipboardPaste,
  Scissors,
  Link,
  Unlink,
  Table,
  Image,
  FileImage,
  Split,
  Quote,
  Minus,
  Printer,
  Undo,
  Redo,
  Save,
  FileText,
  FileDown,
  PanelTop,
  PanelBottom,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEditorContext } from "./EditorContext";

interface WordRibbonProps {
  editor: Editor | null;
  onImageUpload: () => void;
  onImageFromUrl: () => void;
  onTableInsert: () => void;
  onPageBreak: () => void;
  onSave: () => void;
  onPrint: () => void;
  onExportPdf: () => void;
  onExportDocx: () => void;
}

const WordRibbon = ({
  editor,
  onImageUpload,
  onImageFromUrl,
  onTableInsert,
  onPageBreak,
  onSave,
  onPrint,
  onExportPdf,
  onExportDocx,
}: WordRibbonProps) => {
  const { headerContent, setHeaderContent, footerContent, setFooterContent } =
    useEditorContext();
  const [activeTab, setActiveTab] = useState("home");
  const [fontSize, setFontSize] = useState("11");
  const [fontFamily, setFontFamily] = useState("Times New Roman");
  const [textColor, setTextColor] = useState("#000000");
  const [highlightColor, setHighlightColor] = useState("#ffff00");

  const [isHeaderDialogOpen, setIsHeaderDialogOpen] = useState(false);
  const [isFooterDialogOpen, setIsFooterDialogOpen] = useState(false);
  const [tempHeader, setTempHeader] = useState("");
  const [tempFooter, setTempFooter] = useState("");

  const openHeaderDialog = () => {
    setTempHeader(headerContent);
    setIsHeaderDialogOpen(true);
  };

  const saveHeader = () => {
    setHeaderContent(tempHeader);
    setIsHeaderDialogOpen(false);
  };

  const openFooterDialog = () => {
    setTempFooter(footerContent);
    setIsFooterDialogOpen(true);
  };

  const saveFooter = () => {
    setFooterContent(tempFooter);
    setIsFooterDialogOpen(false);
  };

  const RibbonButton = ({
    onClick,
    isActive = false,
    disabled = false,
    children,
    size = "sm",
    variant = "ghost",
  }: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    size?: "sm" | "lg";
    variant?: "ghost" | "outline";
  }) => (
    <Button
      variant={isActive ? "secondary" : variant}
      size={size === "sm" ? "sm" : "default"}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "h-8 px-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
        size === "lg" && "h-12 px-3 flex-col gap-1",
        isActive && "bg-primary/10 text-primary border-primary/20",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {children}
    </Button>
  );

  const RibbonSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="flex flex-col items-center border-r border-border/50 pr-4 last:border-r-0 last:pr-0 flex-1">
      <div className="flex flex-wrap items-center justify-center gap-1 mb-2">
        {children}
      </div>
      <span className="text-xs text-muted-foreground font-medium tracking-wide">
        {title}
      </span>
    </div>
  );

  const applyFontSize = useCallback(
    (size: string) => {
      if (editor) {
        editor.chain().focus().setFontSize(`${size}pt`).run();
        setFontSize(size);
      }
    },
    [editor]
  );

  const applyFontFamily = useCallback(
    (family: string) => {
      if (editor) {
        editor.chain().focus().setFontFamily(family).run();
        setFontFamily(family);
      }
    },
    [editor]
  );

  const applyTextColor = useCallback(
    (color: string) => {
      if (editor) {
        editor.chain().focus().setColor(color).run();
        setTextColor(color);
      }
    },
    [editor]
  );

  const applyHighlight = useCallback(
    (color: string) => {
      if (editor) {
        editor.chain().focus().toggleHighlight({ color }).run();
        setHighlightColor(color);
      }
    },
    [editor]
  );

  const setLink = useCallback(() => {
    if (editor) {
      const url = window.prompt("Enter URL");
      if (url) {
        editor.chain().focus().setLink({ href: url }).run();
      }
    }
  }, [editor]);

  const unsetLink = useCallback(() => {
    if (editor) {
      editor.chain().focus().unsetLink().run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-lg">
      {/* File Menu Bar */}
      <div className="flex items-center px-4 py-2 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <span className="font-semibold text-sm text-foreground">
              ReportFlow
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSave}
              className="text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <FileDown className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={onExportPdf}>
                  Export to PDF
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem onClick={onExportDocx}>
                  Export to Word
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="sm"
              onClick={onPrint}
              className="text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              <Printer className="h-4 w-4 mr-1" />
              Print
            </Button>
          </div>
        </div>
      </div>

      {/* Ribbon Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="h-9 p-0 bg-transparent border-b border-border w-full justify-start rounded-none">
          <TabsTrigger
            value="home"
            className="px-4 py-2 text-muted-foreground hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Home
          </TabsTrigger>
          <TabsTrigger
            value="insert"
            className="px-4 py-2 text-muted-foreground hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
          >
            Insert
          </TabsTrigger>
        </TabsList>

        {/* Home Tab */}
        <TabsContent value="home" className="mt-0 p-4 bg-muted/30">
          <div className="flex items-start w-full">
            {/* Clipboard */}
            <RibbonSection title="Clipboard">
              <RibbonButton
                onClick={() => navigator.clipboard.writeText("")}
                size="lg"
              >
                <ClipboardPaste className="h-5 w-5" />
                <span className="text-xs">Paste</span>
              </RibbonButton>
              <div className="flex flex-col gap-1">
                <RibbonButton onClick={() => document.execCommand("cut")}>
                  <Scissors className="h-4 w-4" />
                </RibbonButton>
                <RibbonButton onClick={() => document.execCommand("copy")}>
                  <Copy className="h-4 w-4" />
                </RibbonButton>
              </div>
            </RibbonSection>

            {/* Font */}
            <RibbonSection title="Font">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <Select value={fontFamily} onValueChange={applyFontFamily}>
                    <SelectTrigger className="w-32 h-6 text-xs border-border bg-background hover:bg-muted">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Times New Roman">
                        Times New Roman
                      </SelectItem>
                      <SelectItem value="Arial">Arial</SelectItem>
                      <SelectItem value="Helvetica">Helvetica</SelectItem>
                      <SelectItem value="Georgia">Georgia</SelectItem>
                      <SelectItem value="Verdana">Verdana</SelectItem>
                      <SelectItem value="Courier New">Courier New</SelectItem>
                      <SelectItem value="Comic Sans MS">
                        Comic Sans MS
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={fontSize} onValueChange={applyFontSize}>
                    <SelectTrigger className="w-12 h-6 text-xs border-border bg-background hover:bg-muted">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8">8</SelectItem>
                      <SelectItem value="9">9</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="11">11</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                      <SelectItem value="14">14</SelectItem>
                      <SelectItem value="16">16</SelectItem>
                      <SelectItem value="18">18</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="24">24</SelectItem>
                      <SelectItem value="28">28</SelectItem>
                      <SelectItem value="32">32</SelectItem>
                      <SelectItem value="36">36</SelectItem>
                      <SelectItem value="48">48</SelectItem>
                      <SelectItem value="72">72</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-1">
                  <RibbonButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive("bold")}
                  >
                    <Bold className="h-4 w-4" />
                  </RibbonButton>
                  <RibbonButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive("italic")}
                  >
                    <Italic className="h-4 w-4" />
                  </RibbonButton>
                  <RibbonButton
                    onClick={() =>
                      editor.chain().focus().toggleUnderline().run()
                    }
                    isActive={editor.isActive("underline")}
                  >
                    <Underline className="h-4 w-4" />
                  </RibbonButton>
                  <RibbonButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive("strike")}
                  >
                    <Strikethrough className="h-4 w-4" />
                  </RibbonButton>
                  <div className="flex items-center gap-1">
                    <Input
                      type="color"
                      value={textColor}
                      onChange={(e) => applyTextColor(e.target.value)}
                      className="w-6 h-6 p-0 border border-border rounded cursor-pointer"
                      title="Text Color"
                    />
                    <Input
                      type="color"
                      value={highlightColor}
                      onChange={(e) => applyHighlight(e.target.value)}
                      className="w-6 h-6 p-0 border border-border rounded cursor-pointer"
                      title="Highlight"
                    />
                  </div>
                </div>
              </div>
            </RibbonSection>

            {/* Paragraph */}
            <RibbonSection title="Paragraph">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <RibbonButton
                    onClick={() =>
                      editor.chain().focus().toggleBulletList().run()
                    }
                    isActive={editor.isActive("bulletList")}
                  >
                    <List className="h-4 w-4" />
                  </RibbonButton>
                  <RibbonButton
                    onClick={() =>
                      editor.chain().focus().toggleOrderedList().run()
                    }
                    isActive={editor.isActive("orderedList")}
                  >
                    <ListOrdered className="h-4 w-4" />
                  </RibbonButton>
                </div>
                <div className="flex gap-1">
                  <RibbonButton
                    onClick={() =>
                      editor.chain().focus().setTextAlign("left").run()
                    }
                    isActive={editor.isActive({ textAlign: "left" })}
                  >
                    <AlignLeft className="h-4 w-4" />
                  </RibbonButton>
                  <RibbonButton
                    onClick={() =>
                      editor.chain().focus().setTextAlign("center").run()
                    }
                    isActive={editor.isActive({ textAlign: "center" })}
                  >
                    <AlignCenter className="h-4 w-4" />
                  </RibbonButton>
                  <RibbonButton
                    onClick={() =>
                      editor.chain().focus().setTextAlign("right").run()
                    }
                    isActive={editor.isActive({ textAlign: "right" })}
                  >
                    <AlignRight className="h-4 w-4" />
                  </RibbonButton>
                  <RibbonButton
                    onClick={() =>
                      editor.chain().focus().setTextAlign("justify").run()
                    }
                    isActive={editor.isActive({ textAlign: "justify" })}
                  >
                    <AlignJustify className="h-4 w-4" />
                  </RibbonButton>
                </div>
              </div>
            </RibbonSection>

            {/* Styles */}
            <RibbonSection title="Styles">
              <div className="flex gap-1">
                <RibbonButton
                  onClick={() => editor.chain().focus().setParagraph().run()}
                  isActive={editor.isActive("paragraph")}
                >
                  Normal
                </RibbonButton>
                <RibbonButton
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                  isActive={editor.isActive("heading", { level: 1 })}
                >
                  H1
                </RibbonButton>
                <RibbonButton
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                  isActive={editor.isActive("heading", { level: 2 })}
                >
                  H2
                </RibbonButton>
                <RibbonButton
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                  isActive={editor.isActive("heading", { level: 3 })}
                >
                  H3
                </RibbonButton>
              </div>
            </RibbonSection>
          </div>
        </TabsContent>

        {/* Insert Tab */}
        <TabsContent value="insert" className="mt-0 p-4 bg-muted/30">
          <div className="flex items-start w-full">
            {/* Pages */}
            <RibbonSection title="Pages">
              <div className="flex gap-1">
                <RibbonButton onClick={onPageBreak} size="lg">
                  <Split className="h-5 w-5" />
                  <span className="text-xs">Page Break</span>
                </RibbonButton>
              </div>
            </RibbonSection>

            {/* Tables */}
            <RibbonSection title="Tables">
              <RibbonButton onClick={onTableInsert} size="lg">
                <Table className="h-5 w-5" />
                <span className="text-xs">Table</span>
              </RibbonButton>
            </RibbonSection>

            {/* Illustrations */}
            <RibbonSection title="Illustrations">
              <div className="flex gap-1">
                <RibbonButton onClick={onImageUpload} size="lg">
                  <FileImage className="h-5 w-5" />
                  <span className="text-xs">Pictures</span>
                </RibbonButton>
                <RibbonButton onClick={onImageFromUrl}>
                  <Image className="h-4 w-4" />
                </RibbonButton>
              </div>
            </RibbonSection>

            {/* Links */}
            <RibbonSection title="Links">
              <div className="flex flex-col gap-1">
                <RibbonButton
                  onClick={setLink}
                  isActive={editor.isActive("link")}
                >
                  <Link className="h-4 w-4 mr-1" />
                  Link
                </RibbonButton>
                <RibbonButton
                  onClick={unsetLink}
                  disabled={!editor.isActive("link")}
                >
                  <Unlink className="h-4 w-4" />
                </RibbonButton>
              </div>
            </RibbonSection>

            {/* Text */}
            <RibbonSection title="Text">
              <div className="flex gap-1">
                <RibbonButton
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  isActive={editor.isActive("blockquote")}
                >
                  <Quote className="h-4 w-4" />
                </RibbonButton>
                <RibbonButton
                  onClick={() =>
                    editor.chain().focus().setHorizontalRule().run()
                  }
                >
                  <Minus className="h-4 w-4" />
                </RibbonButton>
              </div>
            </RibbonSection>
            {/* Header & Footer */}
            <RibbonSection title="Header & Footer">
              <div className="flex gap-1">
                <RibbonButton onClick={openHeaderDialog} size="lg">
                  <PanelTop className="h-5 w-5" />
                  <span className="text-xs">Header</span>
                </RibbonButton>
                <RibbonButton onClick={openFooterDialog} size="lg">
                  <PanelBottom className="h-5 w-5" />
                  <span className="text-xs">Footer</span>
                </RibbonButton>
              </div>
            </RibbonSection>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={isHeaderDialogOpen} onOpenChange={setIsHeaderDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Header</DialogTitle>
          </DialogHeader>
          <Textarea
            value={tempHeader}
            onChange={(e) => setTempHeader(e.target.value)}
            placeholder="Enter header content (HTML supported)"
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsHeaderDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={saveHeader}>Save Header</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isFooterDialogOpen} onOpenChange={setIsFooterDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Footer</DialogTitle>
          </DialogHeader>
          <Textarea
            value={tempFooter}
            onChange={(e) => setTempFooter(e.target.value)}
            placeholder="Enter footer content (HTML supported)"
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsFooterDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={saveFooter}>Save Footer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WordRibbon;

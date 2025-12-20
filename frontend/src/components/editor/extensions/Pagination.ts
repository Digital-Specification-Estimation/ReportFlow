import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

export const Pagination = Extension.create({
  name: 'pagination',

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('pagination'),
        view(editorView) {
          // Initial check after mount/render
          setTimeout(() => {
            checkPagination(editorView)
          }, 500)

          return {
            update(view, prevState) {
              if (prevState.doc.eq(view.state.doc)) return

              // Debounce layout check
              const timer = (view as any)._paginationTimer;
              if (timer) clearTimeout(timer);

              (view as any)._paginationTimer = setTimeout(() => {
                checkPagination(view)
              }, 200)
            }
          }
        }
      })
    ]
  }
})

const PAGE_CONTENT_HEIGHT = 864 // 9in * 96px/in

function checkPagination(view: any) {
  const state = view.state
  const doc = state.doc
  let tr = state.tr
  let hasChanges = false

  // Find all page nodes in the DOM
  const pageNodes = view.dom.querySelectorAll('.word-page-wrapper')
  
  if (pageNodes.length === 0) return

  let pageStartPos = 0
  
  // Iterate through pages in the document to map to DOM
  doc.forEach((page: any, offset: number) => {
    if (page.type.name !== 'page') {
      pageStartPos += page.nodeSize
      return
    }

    // We rely on the fact that Tiptap renders nodes in order.
    // We can find the DOM node for this page.
    // However, finding the exact DOM node from the position is safer if we can.
    // view.nodeDOM(pos) returns the DOM node for the node at pos.
    // For a NodeView, it might be the wrapper.
    const dom = view.nodeDOM(pageStartPos) as HTMLElement
    
    if (!dom || !dom.classList.contains('word-page-wrapper')) {
      // Try finding it via the index if direct mapping fails (common with NodeViews sometimes)
      // But let's assume mapping works for now or skip.
      // Actually, we can just iterate the DOM nodes since we know they are in order.
    }

    pageStartPos += page.nodeSize
  })

  // Re-approach: Iterate DOM nodes, find the one that overflows, identify the Prosemirror node, and split.
  
  for (let i = 0; i < pageNodes.length; i++) {
    const pageDom = pageNodes[i] as HTMLElement
    const contentContainer = pageDom.querySelector('.page-content') as HTMLElement
    
    if (!contentContainer) continue
    
    // Check if content overflows
    // We use scrollHeight to see total height of content
    if (contentContainer.scrollHeight > PAGE_CONTENT_HEIGHT) {
      // Find the split point
      const children = Array.from(contentContainer.children) as HTMLElement[]
      let currentHeight = 0
      let splitNodeIndex = -1
      
      for (let j = 0; j < children.length; j++) {
        const child = children[j]
        const childHeight = child.offsetHeight
        
        // Simple check: if this child pushes us over, split BEFORE it.
        // If it's the first child and it's too big, we might have a problem (huge image or text block).
        // For now, if it's the first child, we keep it and overflow (or split inside it - harder).
        // We'll split BEFORE the node that overflows.
        
        if (currentHeight + childHeight > PAGE_CONTENT_HEIGHT) {
          if (j === 0) {
            // First node is too big. 
            // Ideally we should split the text node inside. 
            // For now, let's just push the NEXT node if there is one.
            if (children.length > 1) {
              splitNodeIndex = 1
            }
          } else {
            splitNodeIndex = j
          }
          break
        }
        currentHeight += childHeight
      }
      
      if (splitNodeIndex !== -1) {
        // We need to move children from splitNodeIndex onwards to the next page.
        // We need to find the document position of the page and the child nodes.
        
        // Find the page position in the doc
        const pagePos = getPagePos(view, i)
        if (pagePos === null) continue
        
        // Calculate the relative position of the split node
        // We need to map the DOM node index to PM node index.
        // This assumes 1:1 mapping between block nodes and DOM elements, which is true for top-level blocks.
        const pageNode = doc.nodeAt(pagePos)
        if (!pageNode) continue
        
        let offset = 0
        for (let k = 0; k < splitNodeIndex; k++) {
          offset += pageNode.child(k).nodeSize
        }
        
        // The position to split is pagePos + 1 (start of page content) + offset
        const splitPos = pagePos + 1 + offset
        
        // We want to move everything from splitPos to the end of the page.
        const endOfPagePos = pagePos + pageNode.nodeSize - 1
        
        if (splitPos >= endOfPagePos) continue // Nothing to move
        
        const contentToMove = doc.slice(splitPos, endOfPagePos)
        
        // Check if there is a next page
        const nextPagePos = pagePos + pageNode.nodeSize
        const nextPageNode = doc.nodeAt(nextPagePos)
        
        if (nextPageNode && nextPageNode.type.name === 'page') {
          // Append to next page
          // Insert at the beginning of next page content: nextPagePos + 1
          tr.insert(nextPagePos + 1, contentToMove.content)
        } else {
          // Create new page with content
          const newPage = state.schema.nodes.page.create(null, contentToMove.content)
          tr.insert(nextPagePos, newPage)
        }
        
        // Delete from current page
        tr.delete(splitPos, endOfPagePos)
        
        hasChanges = true
        // Break to apply changes and let the next loop handle the next page (which might now overflow)
        break 
      }
    }
  }

  if (hasChanges) {
    view.dispatch(tr)
  }
}

function getPagePos(view: any, pageIndex: number): number | null {
  const doc = view.state.doc
  let currentPos = 0
  let foundPages = 0
  
  let foundPos: number | null = null
  
  doc.forEach((node: any, offset: number) => {
    if (foundPos !== null) return
    
    if (node.type.name === 'page') {
      if (foundPages === pageIndex) {
        foundPos = currentPos
      }
      foundPages++
    }
    currentPos += node.nodeSize
  })
  
  return foundPos
}

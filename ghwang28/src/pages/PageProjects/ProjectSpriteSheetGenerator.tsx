import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useDraggable,
  useDroppable,
  UniqueIdentifier,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import {
  Box,
  Button,
  TextField,
  Container,
  Typography,
  Alert,
  Stack,
  Paper,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSize } from 'ahooks';

// --- Type Definitions ---

/** Represents a validated, uploaded image */
interface ImageItem {
  id: UniqueIdentifier;
  file: File;
  previewUrl: string;
  imageElement: HTMLImageElement;
}

/** Maps a grid index (number) to an image ID (UniqueIdentifier) */
type GridMapping = Record<number, UniqueIdentifier>;

interface ImageDimensions {
  width: number;
  height: number;
}

// --- Helper Function ---

/**
 * Loads a File object into an HTMLImageElement to get its dimensions.
 * @returns A promise that resolves with the image element and its dimensions.
 */
const getImageData = (
  file: File,
  id: UniqueIdentifier
): Promise<ImageItem> => {
  return new Promise((resolve, reject) => {
    const previewUrl = URL.createObjectURL(file);
    const image = new Image();
    image.src = previewUrl;

    image.onload = () => {
      resolve({
        id,
        file,
        previewUrl,
        imageElement: image,
      });
    };
    image.onerror = (err) => {
      URL.revokeObjectURL(previewUrl);
      reject(new Error(`Failed to load image: ${file.name}. ${err}`));
    };
  });
};

// --- DraggableImage Component ---

interface DraggableImageProps {
  item: ImageItem;
  dimensions: ImageDimensions;
}

const DraggableImage: React.FC<DraggableImageProps> = ({ item, dimensions }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        cursor: 'grabbing',
        zIndex: 100, // Ensure it's on top while dragging
      }
    : {
        cursor: 'grab',
      };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      sx={{
        width: dimensions.width,
        height: dimensions.height,
        touchAction: 'none', // Recommended by dnd-kit for touch devices
      }}
    >
      <img
        src={item.previewUrl}
        width={dimensions.width}
        height={dimensions.height}
        alt={item.file.name}
        style={{ pointerEvents: 'none' }} // Prevent img from capturing drag events
      />
    </Box>
  );
};

// --- DroppableCell Component ---

interface DroppableCellProps {
  index: number;
  children: React.ReactNode;
  dimensions: ImageDimensions;
}

const DroppableCell: React.FC<DroppableCellProps> = ({
  index,
  children,
  dimensions,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: index,
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        width: dimensions.width,
        height: dimensions.height,
        backgroundColor: isOver ? 'action.hover' : 'transparent',
        outline: '1px dashed whitesmoke'
      }}
    >
      {children}
    </Box>
  );
};

// --- Main SpriteSheetGenerator Component ---

const ProjectSpriteSheetGenerator: React.FC = () => {
  // --- State ---
  const [items, setItems] = useState<ImageItem[]>([]);
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions | null>(
    null
  );
  const [gridRows, setGridRows] = useState(4);
  const [gridCols, setGridCols] = useState(4);
  const [gridMapping, setGridMapping] = useState<GridMapping>({});
  const [error, setError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  // Use pointer sensor for better drag-and-drop experience
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Start dragging after 8px move
      },
    })
  );

  // --- Memory Cleanup ---
  useEffect(() => {
    // Revoke object URLs on component unmount to prevent memory leaks
    return () => {
      items.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    };
  }, [items]);

  // --- Handlers ---

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files ? Array.from(e.target.files) : [];
      if (files.length === 0) return;

      // Reset state for new upload
      setError(null);
      setItems([]);
      setGridMapping({});
      setImageDimensions(null);

      try {
        // Load all images and check dimensions
        const newImageItems = await Promise.all(
          files.map((file) => getImageData(file, crypto.randomUUID()))
        );

        if (newImageItems.length === 0) return;

        // Check if all dimensions are a match
        const firstDim = newImageItems[0].imageElement;
        const allSameDimensions = newImageItems.every(
          (item) =>
            item.imageElement.width === firstDim.width &&
            item.imageElement.height === firstDim.height
        );

        if (!allSameDimensions) {
          setError(
            'Dimension Mismatch: All images must have the same width and height.'
          );
          return;
        }

        // --- Success ---
        const newDimensions = {
          width: firstDim.width,
          height: firstDim.height,
        };
        setImageDimensions(newDimensions);
        setItems(newImageItems);

        // Populate the grid with the new images
        const newMapping: GridMapping = {};
        const maxCells = gridRows * gridCols;
        for (let i = 0; i < newImageItems.length && i < maxCells; i++) {
          newMapping[i] = newImageItems[i].id;
        }
        setGridMapping(newMapping);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      }
    },
    [gridCols, gridRows] // Rerun if grid size changes before upload
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    // No drop target
    if (!over) return;

    const draggedId = active.id;
    const droppedIndex = over.id as number; // This is the grid cell index

    setGridMapping((prevMapping) => {
      const newMapping: GridMapping = { ...prevMapping };

      // Find the original index of the item being dragged
      const originalIndexKey = Object.keys(prevMapping).find(
        (key) => prevMapping[Number(key)] === draggedId
      );
      const originalIndex =
        originalIndexKey !== undefined ? Number(originalIndexKey) : undefined;

      // Get the ID of the item (if any) currently in the drop slot
      const itemAtDropSlot = prevMapping[droppedIndex];

      // --- Logic for swap / move ---

      // 1. Remove the dragged item from its original position
      if (originalIndex !== undefined) {
        delete newMapping[originalIndex];
      }

      // 2. Place the dragged item in the new (dropped) position
      newMapping[droppedIndex] = draggedId;

      // 3. If there was an item at the drop slot...
      if (itemAtDropSlot) {
        // ...and the dragged item came from somewhere *inside* the grid...
        if (originalIndex !== undefined) {
          // ...move the item from the drop slot to the dragged item's original slot
          newMapping[originalIndex] = itemAtDropSlot;
        }
        // (If the dragged item came from outside the grid - not supported here -
        // the item at the drop slot would just be overwritten)
      }

      return newMapping;
    });
  };

  const handleExport = () => {
    if (!imageDimensions || items.length === 0) {
      setError('No images to export.');
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = imageDimensions.width * gridCols;
    canvas.height = imageDimensions.height * gridRows;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setError('Could not create canvas context for export.');
      return;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Find the ImageItem lookup by ID for efficiency
    const itemMap = new Map(items.map((item) => [item.id, item]));

    // Draw images based on the grid mapping
    for (let i = 0; i < gridRows * gridCols; i++) {
      const itemId = gridMapping[i];
      if (itemId) {
        const item = itemMap.get(itemId);
        if (item) {
          const row = Math.floor(i / gridCols);
          const col = i % gridCols;
          ctx.drawImage(
            item.imageElement,
            col * imageDimensions.width,
            row * imageDimensions.height
          );
        }
      }
    }

    // Trigger download
    const dataUrl = canvas.toDataURL('image/png'); // Lossless PNG
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'spritesheet.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleClear = () => {
    setItems([]);
    setGridMapping({});
    setImageDimensions(null);
    setError(null);
  };

  // --- Memoized Values ---

  const totalCells = gridRows * gridCols;
  const activeItem = useMemo(
    () => items.find((item) => item.id === activeId),
    [activeId, items]
  );

  const gridRef = useRef<HTMLDivElement>(null)
  const gridSize = useSize(gridRef)

  const gridRenderDimensions = useMemo(() => {
    if (!imageDimensions || !gridSize) return null

    const gridWidth = gridSize.width || 100;

    const imageWidth = gridWidth / gridCols;
    const ratio = imageDimensions.width / imageWidth;
    const imageHeight = imageDimensions.height / ratio;

    return {
      width: imageWidth,
      height: imageHeight
    }
  }, [gridCols, gridSize, imageDimensions])

  console.log({ gridRenderDimensions })

  // --- Render ---

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToWindowEdges]}
    >
      <Container maxWidth="lg" sx={{ my: 4, minHeight: '60vh' }}>
        <Typography variant="h4" component="h1" gutterBottom align='center'>
          {'👾 Sprite Sheet Generator'}
        </Typography>
        <Typography variant="h6" component="h6" gutterBottom align='center'>
          {'Generates a Sprite Sheet on the client side'}
        </Typography>

        <Paper sx={{ p: 2, mb: 2 }}>
          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFileIcon />}
            >
              Upload Images
              <input
                type="file"
                hidden
                multiple
                accept="image/png, image/jpeg, image/gif, image/webp"
                onChange={handleFileChange}
              />
            </Button>
            <TextField
              label="Rows"
              type="number"
              value={gridRows}
              onChange={(e) =>
                setGridRows(Math.max(1, parseInt(e.target.value, 10) || 1))
              }
              inputProps={{ min: 1 }}
              sx={{ width: 100 }}
            />
            <TextField
              label="Columns"
              type="number"
              value={gridCols}
              onChange={(e) =>
                setGridCols(Math.max(1, parseInt(e.target.value, 10) || 1))
              }
              inputProps={{ min: 1 }}
              sx={{ width: 100 }}
            />
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleClear}
              sx={{
                marginLeft: 'auto !important'
              }}
            >
              Clear
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DownloadIcon />}
              onClick={handleExport}
              disabled={items.length === 0}
            >
              Export
            </Button>
          </Stack>
        </Paper>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          ref={gridRef}
          sx={{
            display: 'grid',
            ...(gridRenderDimensions ? {
              gridTemplateColumns: `repeat(${gridCols}, ${gridRenderDimensions.width}px)`,
            } : {}),
            backgroundColor: 'transparent',
            maxWidth: '100%',
          }}
        >
          {gridRenderDimensions && Array.from({ length: totalCells }).map((_, index) => {
            const itemId = gridMapping[index];
            const item = items.find((i) => i.id === itemId);
            return (
              <DroppableCell
                key={index}
                index={index}
                dimensions={gridRenderDimensions}
              >
                {item ? (
                  <DraggableImage item={item} dimensions={gridRenderDimensions} />
                ) : null}
              </DroppableCell>
            );
          })}
        </Box>
      </Container>

      {/* Drag Overlay: Renders the item being dragged */}
      <DragOverlay>
        {(gridRenderDimensions && activeItem) ? (
          <Box
            sx={{
              width: gridRenderDimensions.width,
              height: gridRenderDimensions.height,
            }}
          >
            <img
              src={activeItem.previewUrl}
              width={gridRenderDimensions.width}
              height={gridRenderDimensions.height}
              alt="Dragging item"
            />
          </Box>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default ProjectSpriteSheetGenerator;

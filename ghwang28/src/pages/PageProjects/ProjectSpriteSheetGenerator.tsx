import React, { useState, useRef, ChangeEvent } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Stack,
  Paper,
  CircularProgress,
  Grid,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { clamp } from '../../utils';
import { useDebounceEffect } from 'ahooks'

// Define the structure for our loaded image data
interface LoadedImage {
  element: HTMLImageElement;
  name: string;
}

/**
 * A React component to upload multiple images, verify their dimensions,
 * and collate them into a single downloadable image grid.
 */
const ProjectSpriteSheetGenerator: React.FC = () => {
  // State for managing images, grid layout, errors, and loading status
  const [images, setImages] = useState<LoadedImage[]>([]);
  const [columns, setColumns] = useState<number>(3);
  const [rows, setRows] = useState<number>(2);
  const [error, setError] = useState<string | null>(null);
  const [collatedImageURL, setCollatedImageURL] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Refs to interact with the hidden file input and canvas elements
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * Handles the file selection process. It loads the images,
   * verifies their dimensions, and updates the state.
   */
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    setIsLoading(true);
    handleReset();

    const imagePromises: Promise<LoadedImage>[] = Array.from(files).map(file => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          URL.revokeObjectURL(img.src); // Clean up memory
          resolve({ element: img, name: file.name });
        };
        img.onerror = () => {
          URL.revokeObjectURL(img.src);
          reject(`Could not load image: ${file.name}`);
        };
      });
    });

    try {
      const loadedImages = await Promise.all(imagePromises);

      // --- Dimension Verification ---
      if (loadedImages.length > 1) {
        const firstImage = loadedImages[0].element;
        const { width: expectedWidth, height: expectedHeight } = firstImage;

        for (const { element, name } of loadedImages) {
          if (element.width !== expectedWidth || element.height !== expectedHeight) {
            setError(
              `Dimension mismatch: All images must be ${expectedWidth}x${expectedHeight}px. Image '${name}' is ${element.width}x${element.height}px.`
            );
            setIsLoading(false);
            return;
          }
        }
      }
      setImages(loadedImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
      // Reset file input to allow re-uploading the same files
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  /**
   * This effect runs whenever the images or grid dimensions change.
   * It draws the images onto the canvas and generates the final image URL.
   */
  useDebounceEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) {
      setCollatedImageURL('');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    // Get dimensions from the first image (they are all the same)
    const { width: imageWidth, height: imageHeight } = images[0].element;

    // Set canvas size based on grid
    canvas.width = imageWidth * columns;
    canvas.height = imageHeight * rows;

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw images onto the canvas in a grid
    for (let i = 0; i < images.length && i < columns * rows; i++) {
      const img = images[i].element;
      const col = i % columns;
      const row = Math.floor(i / columns);
      const dx = col * imageWidth;
      const dy = row * imageHeight;
      ctx.drawImage(img, dx, dy, imageWidth, imageHeight);
    }

    // Generate the data URL for the final image
    setCollatedImageURL(canvas.toDataURL('image/png'));
  }, [images, columns, rows], { wait: 500 });

  const handleReset = () => {
    setError(null);
    setImages([]); // Clear previous images
  }

  return (
    <Box sx={{ minHeight: '75vh', display: 'grid', placeItems: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, margin: 'auto' }}>
        <Stack spacing={3}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            {'👾 Sprite Sheet Generator'}
          </Typography>
          <Typography variant="h6" component="h1" gutterBottom align="center">
            {'Your images are not stored in any server. Completely client side.'}
          </Typography>

          {/* --- Step 1: Upload --- */}
          <Box>
            <Typography variant="h6" component="h2" gutterBottom>
              {'1. Upload Images'}
            </Typography>
            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <Button
              variant="contained"
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Select Images'}
            </Button>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              {'Select multiple images. All images must have the same dimensions.'}
            </Typography>
          </Box>

          {/* --- Display Error --- */}
          {error && <Alert severity="error">{error}</Alert>}

          {/* --- Step 2: Configure Grid --- */}
          <Box>
            <Typography variant="h6" component="h2" gutterBottom>
              {'2. Configure Grid Layout'}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Columns"
                  type="number"
                  value={columns}
                  onChange={(e) => setColumns(clamp(parseInt(e.target.value), 1, 100))}
                  InputProps={{ inputProps: { min: 1, max: 100 } }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Rows"
                  type="number"
                  value={rows}
                  onChange={(e) => setRows(clamp(parseInt(e.target.value), 1, 100))}
                  InputProps={{ inputProps: { min: 1, max: 100 } }}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>

          {/* --- Step 3: Download --- */}
          {collatedImageURL && rows >= 1 && columns >= 1 && (
            <Box>
              <Typography variant="h6" component="h2" gutterBottom>
                {'3. Download Result'}
              </Typography>
              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: 'divider',
                  p: 1,
                  borderRadius: 1,
                  mb: 2,
                }}
              >
                <img
                  src={collatedImageURL}
                  alt="Collated"
                  style={{ width: '100%', display: 'block' }}
                />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <a href={collatedImageURL} download="collated-image.png" style={{ textDecoration: 'none' }}>
                  <Button variant="contained" color="success" startIcon={<DownloadIcon />}>
                    {'Download Image'}
                  </Button>
                </a>
                <Button color="error" variant="contained" startIcon={<DeleteIcon />} onClick={handleReset}>
                  {'Reset'}
                </Button>
              </Box>

            </Box>
          )}

          {/* Hidden canvas element for image processing */}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </Stack>
      </Paper>
    </Box>
  );
};

export default ProjectSpriteSheetGenerator;
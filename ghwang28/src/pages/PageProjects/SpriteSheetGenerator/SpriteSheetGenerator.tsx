import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Box, Button, Paper, TextField, Tooltip, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { exportImage, getAllOccupiedImages, getImageData, removeUndefinedValues } from './utils';
import { useRequest, useSize } from 'ahooks';
import { Image2dGrid, ImageDim, ImageFileMapping } from './typings';
import { cloneDeep, get, isEmpty, set } from 'lodash';

export const SpriteSheetGenerator: React.FC = () => {
  const [gridRows, setGridRows] = useState<number>(10);
  const [gridCols, setGridCols] = useState<number>(10);

  const [imageGrid, setImageGrid] = useState<Image2dGrid>({})
  // const [imageNameToFile, setImageNameToFile] = useState<ImageFileMapping>({})
  // const [cellDim, setCellDim] = useState<{ width: number, height: number } | null>(null);

  const resetGrid = useCallback(() => {
    setImageGrid({});
  }, [])

  const {
    run: handleFileChange,
    data,
    // loading,
    error
  } = useRequest(async (e: React.ChangeEvent<HTMLInputElement>): Promise<{
    imageDim: ImageDim,
    imageNameToFile: ImageFileMapping
  }> => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) throw new Error('No files found')

    // Load all images and check dimensions
    const newImageItems = await Promise.all(
      files.map((file) => getImageData(file, file.name))
    );

    if (newImageItems.length === 0) throw new Error('No files found')

    // Check if all dimensions are a match
    const firstDim = newImageItems[0].imageElement;
    const allSameDimensions = newImageItems.every(
      (item) =>
        item.imageElement.width === firstDim.width &&
        item.imageElement.height === firstDim.height
    );

    if (!allSameDimensions) {
      throw new Error('Images do not have the same dimensions')
    }

    resetGrid();

    const imageMapping = newImageItems.reduce((prev, curr) => {
      return {
        [curr.id]: curr,
        ...prev
      }
    }, {} as ImageFileMapping);

    return {
      imageDim: {
        width: firstDim.width,
        height: firstDim.height,
      },
      imageNameToFile: imageMapping
    }
  }, {
    manual: true,
  })

  const {
    imageDim = { width: 50, height: 50 },
    imageNameToFile = {}
  } = data || {};

  useEffect(() => {
    setImageGrid((prevMap) => {
      const allCurrFileNames = getAllOccupiedImages(prevMap);
      const missingFileNames: string[] = [];

      for (const fileName of Object.keys(imageNameToFile)) {
        if (allCurrFileNames.has(fileName)) continue;
        missingFileNames.push(fileName);
      }

      if (missingFileNames.length === 0) return prevMap;

      const newMap = { ...prevMap };

      for (let xCoord = 0; xCoord < gridCols; ++xCoord) {
        for (let yCoord = 0; yCoord < gridRows; ++yCoord) {
          if (missingFileNames.length === 0) continue;
          if (get(newMap, [xCoord, yCoord])) continue;

          set(newMap, [xCoord, yCoord], missingFileNames.shift())
        }
      }

      if (missingFileNames.length > 0) {
        alert('Not enough room');
      }

      return newMap;
    })
  }, [gridCols, gridRows, imageNameToFile]);

  const gridRef = useRef<HTMLDivElement>(null);
  const gridSize = useSize(gridRef);

  const scaledHeight = useMemo(() => {
    const ratio = (gridSize?.width || 0) / gridCols / imageDim.width;
    return ratio * imageDim.height
  }, [gridCols, gridSize?.width, imageDim.height, imageDim.width])

  // Handle swapping images
  const [selectedCoords, setSelectedCoords] = useState<[number, number][]>([]);
  useEffect(() => {
    if (selectedCoords.length < 2) return;
    const [firstCoord, secondCoord] = selectedCoords;

    setImageGrid((prevImageGrid) => {
      const newImageGrid = cloneDeep(prevImageGrid); // cloneDeep is important here
      const itemAtFirstCoord = get(newImageGrid, firstCoord);
      const itemAtSecondCoord = get(newImageGrid, secondCoord);

      set(newImageGrid, firstCoord, itemAtSecondCoord)
      set(newImageGrid, secondCoord, itemAtFirstCoord)

      return removeUndefinedValues(newImageGrid);
    })

    setSelectedCoords([])
  }, [selectedCoords])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        marginTop: 4
      }}
    >
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" align='center'>
          {'👾 Sprite Sheet Generator'}
        </Typography>
        <Typography variant="h6" component="h6" align='center'>
          {'Generates a Sprite Sheet on the client side'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, marginTop: 4 }}>
          <Button
            variant="contained"
            component="label"
            startIcon={<UploadFileIcon />}
          >
            {'Upload Images'}
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
            size="small"
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
            size="small"
          />
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={resetGrid}
            sx={{
              marginLeft: 'auto !important'
            }}
          >
            {'Clear'}
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={() => exportImage({ imageDim, imageGrid, imageNameToFile, totalCols: gridCols, totalRows: gridRows })}
            disabled={isEmpty(imageGrid)}
          >
            {'Export'}
          </Button>
        </Box>
      </Paper>

      {error && (
        <Alert severity="error">
          {error.message}
        </Alert>
      )}

      <Paper sx={{ p: 2 }}>
        <Typography sx={{ marginBottom: 2 }} fontSize={12}>
          {'Select 2 cells to swap them'}
        </Typography>
        <Box
          ref={gridRef}
          sx={{
            display: 'grid',
            width: '100%',
            gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
            gridTemplateRows: `repeat(${gridRows}, ${scaledHeight || 100}px)`
          }}
        >
          {Array.from({ length: gridRows }, (_, i) => i).map((x) => (
            Array.from({ length: gridCols }, (_, i) => i).map((y) => {
              const key = `${x},${y}`;
              const imgFileName = get(imageGrid, [x, y]);
              const imageData = get(imageNameToFile, imgFileName || '')

              const isSelected = selectedCoords.some(([_x, _y]) => _x === x && _y === y)

              return (
                <Tooltip key={key} title={imageData?.id || "Empty"} arrow disableInteractive>
                  <Box
                    onClick={() => setSelectedCoords((prev) => [...prev, [x, y]])}
                    sx={{
                      ...(isSelected ? {
                        backgroundColor: 'rgba(255,255,255,0.5)',
                      } : {
                        ['&:hover']: {
                          backgroundColor: 'action.hover',
                        },
                      }),
                      transition: 'background-color 0.2s ease-in-out',
                      outline: '1px dashed whitesmoke',
                      cursor: 'pointer',
                      display: 'flex'
                    }}
                  >
                    <Box
                      sx={{ width: '100%', height: '100%' }}
                      {...(imageData ? {
                        component: "img",
                        src: imageData?.previewUrl || ''
                      } : {})}
                    />
                  </Box>
                </Tooltip>
              )
            })
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

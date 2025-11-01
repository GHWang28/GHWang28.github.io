import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, Box, Paper, Typography } from '@mui/material';
import { handleExportSpritesheet, getAllOccupiedImages, handleExportingProject, handleParsingUploadedImages, handleParsingUploadedProject, removeUndefinedValues } from './utils';
import { useClickAway, useRequest, useSize } from 'ahooks';
import { Image2dGrid, ImageDim, ImageFileMapping } from './typings';
import { cloneDeep, get, isEmpty, merge, set } from 'lodash';
import { CellTooltip, OperationBar } from './components';

export const SpriteSheetGenerator: React.FC = () => {
  const [projectName, setProjectName] = useState<string>('');
  const [gridRows, setGridRows] = useState<number>(5);
  const [gridCols, setGridCols] = useState<number>(5);

  const [imageGrid, setImageGrid] = useState<Image2dGrid>({})

  const resetGrid = useCallback(() => {
    prevImageUpload.current = null;
    setImageGrid({});
  }, [])

  // Allows multiple images to be uploaded sequentially until grid reset
  const prevImageUpload = useRef<{
    imageDim: ImageDim,
    imageNameToFile: ImageFileMapping
  } | null>(null)

  // Handling image upload
  const {
    runAsync: uploadImageFiles,
    data: uploadImageData,
    loading: uploadImagesLoading,
    error: uploadImageError
  } = useRequest(async (files: File[]): Promise<{
    imageDim: ImageDim,
    imageNameToFile: ImageFileMapping
  }> => {
    if (files.length === 0) throw new Error('No files found')

    const parsedImageUpload = await handleParsingUploadedImages(files);

    // Load all images and check dimensions
    if (prevImageUpload.current) {
      if (!(prevImageUpload.current.imageDim.width === parsedImageUpload.imageDim.width && prevImageUpload.current.imageDim.height === parsedImageUpload.imageDim.height)) {
        throw new Error('Images do not have the same dimensions')
      }

      // Merge previous response into the current response
      merge(parsedImageUpload, prevImageUpload.current);
    }
    
    prevImageUpload.current = parsedImageUpload;
    return parsedImageUpload;
  }, {
    manual: true,
  })
  const {
    imageDim = { width: 50, height: 50 },
    imageNameToFile = {}
  } = uploadImageData || {};

  // Handling project upload
  const {
    runAsync: uploadProjectFiles,
    // data: uploadProjectData,
    loading: uploadProjectLoading,
    error: uploadProjectError
  } = useRequest(async (files: File[]): Promise<void> => {
    if (files.length === 0) throw new Error('No files found')

    // Load all images and check dimensions
    resetGrid();

    const project = await handleParsingUploadedProject(files[0]);
    await uploadImageFiles(project.imageFiles);

    setGridCols(project.cols);
    setGridRows(project.rows);
    setImageGrid(project.imageGrid);
    setProjectName(project.projectName || "Unknown");
  }, {
    manual: true,
  })

  // Handling project export
  const {
    run: exportProject,
    loading: exportProjectLoading,
    error: exportProjectError
  } = useRequest(async (): Promise<void> => {
    await handleExportingProject({
      rows: gridRows,
      cols: gridCols,
      imageGrid,
      imageFiles: Object.values(imageNameToFile).flatMap((item) => item?.file || []),
      projectName
    })
  }, {
    manual: true,
  })

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

  const selectedCoordSet = useMemo(() => {
    return new Set<string>(selectedCoords.map(([x, y]) => `${x},${y}`))
  }, [selectedCoords])

  const allErrors = [uploadImageError, uploadProjectError, exportProjectError].filter(Boolean) as Error[]

  // Deselect when clicked outside the grid container
  useClickAway(() => {
    setSelectedCoords([]);
  }, gridRef)

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

        <OperationBar
          projectName={projectName}
          setProjectName={(e) => setProjectName(e.target.value)}
          uploadImagesLoading={uploadImagesLoading}
          uploadImages={(e) => void uploadImageFiles(e.target.files ? Array.from(e.target.files) : [])}
          gridRows={gridRows}
          setRows={(e) => setGridRows(Math.max(1, parseInt(e.target.value, 10) || 1))}
          gridCols={gridCols}
          setCols={(e) => setGridCols(Math.max(1, parseInt(e.target.value, 10) || 1))}
          resetGrid={resetGrid}
          exportSpriteSheet={() => handleExportSpritesheet({ imageDim, imageGrid, imageNameToFile, totalCols: gridCols, totalRows: gridRows, projectName })}
          exportDisabled={isEmpty(imageGrid)}
          uploadProjectLoading={uploadProjectLoading}
          uploadProject={(e) => void uploadProjectFiles(e.target.files ? Array.from(e.target.files) : [])}
          exportProject={() => exportProject()}
          exportProjectLoading={exportProjectLoading}
        />
      </Paper>

      {allErrors.map((err, i) => (
        <Alert key={`error-${i}`} severity="error">
          {err.message}
        </Alert>
      ))}

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

              const isSelected = selectedCoordSet.has(key)

              const cellNumber = x * gridCols + y

              return (
                <CellTooltip key={key} content={[`${imageData?.id || "Empty"}`, `(${key})`, `Cell #${cellNumber}`]}>
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
                </CellTooltip>
              )
            })
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

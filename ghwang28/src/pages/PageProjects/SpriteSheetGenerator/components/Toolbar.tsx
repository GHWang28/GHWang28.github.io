import React, { useRef } from 'react';
import { Box, Button, Menu, MenuItem, Paper, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import GridOnIcon from '@mui/icons-material/GridOn';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import DownloadIcon from '@mui/icons-material/Download';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IMAGE_ACCEPT } from '../constants';

type Props = {
  projectName: string;
  onProjectName: (value: string) => void;
  busy: boolean;
  canUndo: boolean;
  canRedo: boolean;
  exportDisabled: boolean;
  onImportImages: (files: FileList) => void;
  onLoadProject: (file: File) => void;
  onOpenSlice: (file?: File) => void;
  onSamples: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onExportSheet: () => void;
  onExportProject: () => void;
  onExportAtlas: () => void;
  onExportCss: () => void;
};

export const Toolbar: React.FC<Props> = ({
  projectName,
  onProjectName,
  busy,
  canUndo,
  canRedo,
  exportDisabled,
  onImportImages,
  onLoadProject,
  onOpenSlice,
  onSamples,
  onUndo,
  onRedo,
  onClear,
  onExportSheet,
  onExportProject,
  onExportAtlas,
  onExportCss,
}) => {
  const imagesRef = useRef<HTMLInputElement>(null);
  const folderRef = useRef<HTMLInputElement>(null);
  const projectRef = useRef<HTMLInputElement>(null);
  const sliceRef = useRef<HTMLInputElement>(null);
  const [menuEl, setMenuEl] = React.useState<HTMLElement | null>(null);

  return (
    <Paper sx={{ p: 1.5, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <TextField
        size="small"
        label="Project name"
        placeholder="Used for exported filenames"
        value={projectName}
        onChange={(e) => onProjectName(e.target.value)}
        fullWidth
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        <LoadingButton
          size="small"
          variant="contained"
          startIcon={<UploadFileIcon />}
          loading={busy}
          onClick={() => imagesRef.current?.click()}
        >
          Import frames
        </LoadingButton>
        <Button size="small" variant="outlined" startIcon={<CreateNewFolderIcon />} onClick={() => folderRef.current?.click()}>
          Folder
        </Button>
        <Button size="small" variant="outlined" startIcon={<GridOnIcon />} onClick={() => sliceRef.current?.click()}>
          Slice sheet
        </Button>
        <Button size="small" variant="outlined" color="warning" startIcon={<FolderZipIcon />} onClick={() => projectRef.current?.click()}>
          Load project
        </Button>
        <Button size="small" variant="outlined" startIcon={<AutoAwesomeIcon />} onClick={onSamples}>
          Samples
        </Button>
        <Button size="small" startIcon={<UndoIcon />} disabled={!canUndo} onClick={onUndo}>Undo</Button>
        <Button size="small" startIcon={<RedoIcon />} disabled={!canRedo} onClick={onRedo}>Redo</Button>
        <Button size="small" color="error" startIcon={<DeleteSweepIcon />} onClick={onClear}>Clear</Button>
        <LoadingButton
          size="small"
          variant="contained"
          color="success"
          startIcon={<DownloadIcon />}
          loading={busy}
          disabled={exportDisabled}
          onClick={onExportSheet}
        >
          Export sheet
        </LoadingButton>
        <Button size="small" variant="outlined" disabled={exportDisabled} onClick={onExportProject}>
          Save project
        </Button>
        <Button size="small" onClick={(e) => setMenuEl(e.currentTarget)} startIcon={<MoreVertIcon />}>
          More
        </Button>
      </Box>
      <Menu anchorEl={menuEl} open={Boolean(menuEl)} onClose={() => setMenuEl(null)}>
        <MenuItem onClick={() => { onExportAtlas(); setMenuEl(null); }}>Export atlas JSON</MenuItem>
        <MenuItem onClick={() => { onExportCss(); setMenuEl(null); }}>Export CSS sprites</MenuItem>
      </Menu>
      <input
        ref={imagesRef}
        type="file"
        hidden
        multiple
        accept={IMAGE_ACCEPT}
        onChange={(e) => {
          if (e.target.files) onImportImages(e.target.files);
          e.target.value = '';
        }}
      />
      <input
        ref={folderRef}
        type="file"
        hidden
        multiple
        // @ts-expect-error webkitdirectory is not in the React input types
        webkitdirectory=""
        onChange={(e) => {
          if (e.target.files) onImportImages(e.target.files);
          e.target.value = '';
        }}
      />
      <input
        ref={projectRef}
        type="file"
        hidden
        accept=".zip"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onLoadProject(file);
          e.target.value = '';
        }}
      />
      <input
        ref={sliceRef}
        type="file"
        hidden
        accept={IMAGE_ACCEPT}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onOpenSlice(file);
          e.target.value = '';
        }}
      />
    </Paper>
  );
};

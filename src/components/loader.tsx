// components/Loader.tsx
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <CircularProgress disableShrink />
    </div>
  );
}

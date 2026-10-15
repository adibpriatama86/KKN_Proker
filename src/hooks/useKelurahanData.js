// ============================================================
// useKelurahanData – Custom React hook for data fetching
// ============================================================
import { useState, useEffect } from 'react';
import { fetchKelurahanData, mapInfoKelurahan, MOCK_DATA } from '../services/api';

// Mock data is for explicit development preview only. A missing endpoint must
// surface as a configuration error instead of looking like live service data.
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export function useKelurahanData() {
  const [syaratSurat, setSyaratSurat]     = useState([]);
  const [infoKelurahan, setInfoKelurahan] = useState({});
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        let data;

        if (USE_MOCK) {
          // Realistic skeleton delay for development preview
          await new Promise((r) => setTimeout(r, 1100));
          data = MOCK_DATA;
        } else {
          data = await fetchKelurahanData();
        }

        if (!cancelled) {
          setSyaratSurat(data.syarat_surat);
          setInfoKelurahan(mapInfoKelurahan(data.info_kelurahan));
        }
      } catch (err) {
        if (!cancelled) {
          if (import.meta.env.DEV) {
            console.error('Failed to load Kelurahan data:', err);
          }
          setError('Data layanan tidak dapat dimuat saat ini. Silakan coba lagi nanti.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadData();
    return () => { cancelled = true; };
  }, []);

  return { syaratSurat, infoKelurahan, loading, error };
}

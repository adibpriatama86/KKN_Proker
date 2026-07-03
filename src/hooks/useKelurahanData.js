// ============================================================
// useKelurahanData – Custom React hook for data fetching
// ============================================================
import { useState, useEffect } from 'react';
import { fetchKelurahanData, mapInfoKelurahan, MOCK_DATA } from '../services/api';

// Use mock when VITE_USE_MOCK=true OR when no API URL is configured
const USE_MOCK =
  import.meta.env.VITE_USE_MOCK === 'true' ||
  !import.meta.env.VITE_API_URL;

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
          setError(err.message || 'Gagal memuat data. Silakan coba lagi.');
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

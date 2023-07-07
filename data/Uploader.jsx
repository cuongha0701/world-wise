import { useCities } from '../src/hooks/useCities';

import Button from '../src/components/Button';

import { cities } from './cities';

function Uploader() {
  const { isLoading, deleteAllCities, createSampleCities } = useCities();

  async function uploadCities() {
    await deleteAllCities();
    await createSampleCities(cities);
  }

  return (
    <div
      style={{
        marginTop: 'auto',
        padding: '8px',
        borderRadius: '5px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        border: '1px solid var(--color-grey-300)',
      }}
    >
      <Button type="back" onClick={uploadCities} disabled={isLoading}>
        Upload Cities
      </Button>
    </div>
  );
}

export default Uploader;

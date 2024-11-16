TRUNCATE TABLE public.warehouse;

INSERT INTO public.warehouse (
  code,
  name,
  lat,
  lng,
  address,
  "createdBy",
  "isActive",
  "createdAt",
  "updatedAt"
) VALUES
  (
    '001',
    'Almacén Paiporta Principal',
    39.4286,
    -0.4175,
    'Polígono Industrial La Pascualeta, Paiporta',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    true,
    '2024-10-01T10:00:00.000Z',
    '2024-10-01T10:00:00.000Z'
  ),
  (
    '002',
    'Centro Logístico Catarroja',
    39.4036,
    -0.4027,
    'Polígono Industrial El Bony, Catarroja',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    true,
    '2024-10-01T10:10:00.000Z',
    '2024-10-01T10:10:00.000Z'
  ),
  (
    '003',
    'Almacén Alfafar',
    39.4225,
    -0.3775,
    'Polígono Industrial Rabisancho, Alfafar',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    true,
    '2024-10-01T10:20:00.000Z',
    '2024-10-01T10:20:00.000Z'
  ),
  (
    '004',
    'Centro Distribución Sedaví',
    39.4256,
    -0.3839,
    'Polígono Industrial Sedaví, Av. del Mediterráneo',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    true,
    '2024-10-01T10:30:00.000Z',
    '2024-10-01T10:30:00.000Z'
  ),
  (
    '005',
    'Almacén Albal Norte',
    39.3947,
    -0.4119,
    'Polígono Industrial Juan Peris, Albal',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    true,
    '2024-10-01T10:40:00.000Z',
    '2024-10-01T10:40:00.000Z'
  ),
  (
    '006',
    'Logística Torrent Mas del Jutge',
    39.4320,
    -0.4477,
    'Polígono Industrial Mas del Jutge, Torrent',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    true,
    '2024-10-01T10:50:00.000Z',
    '2024-10-01T10:50:00.000Z'
  ),
  (
    '007',
    'Centro Logístico Torrent Sur',
    39.4173,
    -0.4594,
    'Polígono Industrial El Toll i L''Alberca, Torrent',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    false,
    '2024-10-01T11:00:00.000Z',
    '2024-10-01T11:00:00.000Z'
  ),
  (
    '008',
    'Almacén Picanya Principal',
    39.4359,
    -0.4336,
    'Polígono Industrial Alquería de Moret, Picanya',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    true,
    '2024-10-01T11:10:00.000Z',
    '2024-10-01T11:10:00.000Z'
  ),
  (
    '009',
    'Almacén Paiporta Sur',
    39.4234,
    -0.4147,
    'Polígono Industrial La Mina, Paiporta',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    true,
    '2024-10-01T11:20:00.000Z',
    '2024-10-01T11:20:00.000Z'
  ),
  (
    '010',
    'Centro Logístico Picanya Sur',
    39.4312,
    -0.4367,
    'Polígono Industrial Faitanar, Picanya',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    true,
    '2024-10-01T11:30:00.000Z',
    '2024-10-01T11:30:00.000Z'
  );
'use client';

import { LOCAL_STORAGE_EXTERNAL_PROGRAM_ID } from '@kigo-top/constants';
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
export default function ProgramSelectorPage() {
  const router = useRouter();
  const [externalProgramId, setExternalProgramId] = useState('us_bank');
  const [, setLocalExternalProgramId] = useLocalStorage(
    LOCAL_STORAGE_EXTERNAL_PROGRAM_ID,
    '',
  );

  const handleProgramChange = (event: SelectChangeEvent) => {
    setExternalProgramId(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLocalExternalProgramId(externalProgramId);
      // Redirect to the program page with the selected ID
      router.push(`/programs/${externalProgramId}`);
    } catch (error) {
      console.error('Error navigating:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Program Selector
        </Typography>

        <FormControl fullWidth>
          <InputLabel id="program-select-label">Select Program</InputLabel>
          <Select
            labelId="program-select-label"
            id="program-select"
            value={externalProgramId}
            label="Select Program"
            onChange={handleProgramChange}
            required
          >
            <MenuItem value="us_bank">US Bank</MenuItem>
            <MenuItem value="kigo">Kigo</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
}

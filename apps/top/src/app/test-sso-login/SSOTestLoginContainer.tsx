'use client';

import { Box, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type Props = { intervalPartnerId: string; intervalApiKey: string };

export default function SSOTestLoginContainer({
  intervalPartnerId,
  intervalApiKey,
}: Props) {
  const router = useRouter();
  const [externalProgramId] = useState('interval');
  const [externalUserId, setExternalUserId] = useState(
    'testssointerval@gmail.com',
  );
  const [userEmail, setUserEmail] = useState('testssointerval@gmail.com');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const createApiSessionResponse = await axios.post(`/api/test-sso`, {
        api_key: intervalApiKey,
        partner_id: intervalPartnerId,
        user_email: userEmail,
        external_user_id: externalUserId,
        external_program_id: externalProgramId,
      });

      router.push(
        `/sso/${externalProgramId}?uuid=${createApiSessionResponse.data.session_id}`,
      );
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
          External Program ID
        </Typography>
        <input
          type="text"
          name="external_program_id"
          placeholder="external_program_id"
          value={externalProgramId}
          readOnly
          style={{ height: 40, borderRadius: 10, paddingLeft: 10 }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          External_user_id
        </Typography>
        <input
          type="text"
          name="external_user_id"
          placeholder="external_user_id"
          value={externalUserId}
          onChange={(e) => setExternalUserId(e.target.value)}
          style={{ height: 40, borderRadius: 10, paddingLeft: 10 }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          Email
        </Typography>
        <input
          type="email"
          name="user_email"
          placeholder="user_email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          style={{ height: 40, borderRadius: 10, paddingLeft: 10 }}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
}

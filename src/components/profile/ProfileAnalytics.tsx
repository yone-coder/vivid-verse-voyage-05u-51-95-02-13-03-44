
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileAnalyticsProps {
  user: any;
}

export default function ProfileAnalytics({ user }: ProfileAnalyticsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Analytics data will appear here when you have more activity.</p>
      </CardContent>
    </Card>
  );
}

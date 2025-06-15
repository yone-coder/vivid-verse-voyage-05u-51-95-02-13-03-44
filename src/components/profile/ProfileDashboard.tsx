
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileDashboardProps {
  user: any;
  profile: any;
}

export default function ProfileDashboard({ user, profile }: ProfileDashboardProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome back, {profile?.username || user?.email?.split('@')[0] || 'User'}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Here's an overview of your account activity.</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">No recent activity</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-600">Account is active</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

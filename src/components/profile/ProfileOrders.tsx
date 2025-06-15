
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileOrdersProps {
  user: any;
}

export default function ProfileOrders({ user }: ProfileOrdersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">No orders yet. Start shopping to see your orders here.</p>
      </CardContent>
    </Card>
  );
}

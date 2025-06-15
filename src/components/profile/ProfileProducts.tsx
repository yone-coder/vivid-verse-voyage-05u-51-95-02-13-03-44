
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileProductsProps {
  user: any;
}

export default function ProfileProducts({ user }: ProfileProductsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Products</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">No products listed yet. Start selling to see your products here.</p>
      </CardContent>
    </Card>
  );
}

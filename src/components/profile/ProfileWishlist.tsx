
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileWishlistProps {
  user: any;
}

export default function ProfileWishlist({ user }: ProfileWishlistProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Wishlist</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Your wishlist is empty. Add some items to see them here.</p>
      </CardContent>
    </Card>
  );
}

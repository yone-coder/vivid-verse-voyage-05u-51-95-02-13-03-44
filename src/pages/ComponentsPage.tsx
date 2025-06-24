
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const ComponentsPage: React.FC = () => {
  const [progressValue, setProgressValue] = useState(33);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Components Showcase</h1>
          <p className="text-gray-600">Test and preview different UI components</p>
        </div>

        <Tabs defaultValue="buttons" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          <TabsContent value="buttons" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button>Default</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Button Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="cards" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Card Title</h3>
                <p className="text-gray-600 mb-4">This is a sample card component with some content.</p>
                <Button>Action</Button>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <h3 className="text-lg font-semibold mb-2">Gradient Card</h3>
                <p className="mb-4">This card has a gradient background.</p>
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                  Learn More
                </Button>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Progress Bars</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm text-gray-600">{progressValue}%</span>
                  </div>
                  <Progress value={progressValue} className="h-2" />
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => setProgressValue(Math.max(0, progressValue - 10))}
                  >
                    Decrease
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => setProgressValue(Math.min(100, progressValue + 10))}
                  >
                    Increase
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="badges" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Badge Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Status Badges</h3>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-green-500">Active</Badge>
                <Badge className="bg-yellow-500">Pending</Badge>
                <Badge className="bg-red-500">Inactive</Badge>
                <Badge className="bg-blue-500">Processing</Badge>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Custom Component Testing Area</h3>
          <p className="text-gray-600 mb-4">
            This is where you can add and test your custom components. 
            Simply import them and render them in this space.
          </p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="text-gray-500">Add your custom components here</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ComponentsPage;

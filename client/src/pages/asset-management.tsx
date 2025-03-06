import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Image, Upload, Search, Filter, MoreVertical } from "lucide-react";

const mockAssets = [
  {
    id: 1,
    name: "Hotel Exterior Photo",
    type: "Image",
    size: "2.5 MB",
    uploadedBy: "John Smith",
    uploadDate: "2024-03-05",
  },
  {
    id: 2,
    name: "Room Layout Plan",
    type: "Document",
    size: "1.8 MB",
    uploadedBy: "Sarah Wilson",
    uploadDate: "2024-03-04",
  },
];

export default function AssetManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Asset Management</h1>
        <p className="text-muted-foreground">Manage digital assets and media files</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              Media Library
            </div>
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Assets
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search assets..." className="pl-8" />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.type}</TableCell>
                    <TableCell>{asset.size}</TableCell>
                    <TableCell>{asset.uploadedBy}</TableCell>
                    <TableCell>{asset.uploadDate}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

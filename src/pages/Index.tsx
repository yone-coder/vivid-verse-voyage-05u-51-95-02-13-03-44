
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-screen p-4 mx-auto">
      <h1 className="text-4xl font-bold mb-8">Welcome</h1>
      <p className="text-xl mb-8 text-center">
        This is a demo of a product detail page for a nebula ceiling lamp projector
      </p>
      <Link to="/product/nebula-pro-2025">
        <Button className="bg-red-500 hover:bg-red-600">
          View Product Detail
        </Button>
      </Link>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Service } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getCategoryImage } from "@/lib/category-images";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={`/technicians/${service.technicianProfileId}`}>
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
        <div className="relative h-40 w-full">
          <Image
            src={getCategoryImage(service.category?.name)}
            alt={service.category?.name ?? service.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg">{service.title}</CardTitle>
            {service.category && <Badge variant="secondary">{service.category.name}</Badge>}
          </div>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {service.description}
          </p>
          {service.technicianProfile?.user && (
            <p className="mt-2 text-sm">
              By <span className="font-medium">{service.technicianProfile.user.name}</span>
            </p>
          )}
        </CardContent>
        <CardFooter>
          <p className="font-[family-name:var(--font-mono)] text-lg font-semibold text-primary">
            ৳{Number(service.price).toFixed(0)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
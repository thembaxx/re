import { Clock, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { User } from "@/types";

interface ProviderCardProps {
  provider: User;
  onBook: (providerId: string) => void;
}

export function ProviderCard({ provider, onBook }: ProviderCardProps) {
  return (
    <Card className="w-70 shrink-0 overflow-hidden border-slate-100 shadow-sm hover:shadow-md transition-all duration-200">
      {/* Top Section: Profile & Rating */}
      <div className="p-4 flex flex-col items-center text-center space-y-3">
        <div className="relative">
          <Avatar className="h-20 w-20 border-2 border-white shadow-sm">
            <AvatarImage src={provider.avatarUrl} alt={provider.name} />
            <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
          </Avatar>

          {/* Floating Rating Badge */}
          <div className="absolute -bottom-2 inset-x-0 flex justify-center">
            <div className="bg-white px-2 py-0.5 rounded-full shadow-sm border flex items-center gap-1">
              <Star className="w-3 h-3 fill-black text-black" />
              <span className="text-xs font-bold">{provider.rating}</span>
            </div>
          </div>
        </div>

        <div className="space-y-1 mt-2">
          <h3 className="font-semibold text-lg leading-tight">{provider.name}</h3>

          {/* Specialties Badges */}
          <div className="flex flex-wrap justify-center gap-1">
            {provider.specialty?.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-[10px] px-1.5 h-5 font-normal bg-slate-100 text-slate-600 hover:bg-slate-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <CardContent className="p-4 pt-0 text-sm text-muted-foreground space-y-2">
        {/* Stats Row */}
        <div className="flex items-center justify-between py-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-xs">{provider.jobsCompleted} Jobs</span>
          </div>
          <div className="font-semibold text-black">
            ${provider.hourlyRate}
            <span className="text-xs font-normal text-slate-500">/hr</span>
          </div>
        </div>

        {/* Short Bio (Truncated) */}
        <p className="text-xs line-clamp-2 text-slate-500 leading-relaxed">{provider.bio}</p>
      </CardContent>

      <CardFooter className="p-3 bg-slate-50/50">
        <Button
          className="w-full bg-black text-white hover:bg-slate-800 h-9 rounded-lg text-sm font-medium"
          onClick={() => onBook(provider.id)}
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}

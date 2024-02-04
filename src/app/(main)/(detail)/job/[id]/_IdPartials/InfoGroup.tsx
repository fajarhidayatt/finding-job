import { Badge } from '@/components/ui/badge';

interface InfoGroupProps {
  title: string;
  items: string[];
  badgeVariant?: 'default' | 'destructive' | 'outline' | 'secondary';
}

const InfoGroup = ({
  title,
  items,
  badgeVariant = 'default',
}: InfoGroupProps) => {
  return (
    <div>
      <div className="text-2xl font-semibold mb-3">{title}</div>
      <div className="flex flex-wrap gap-2">
        {items.map((item: string, i: number) => (
          <Badge key={i} variant={badgeVariant}>
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default InfoGroup;

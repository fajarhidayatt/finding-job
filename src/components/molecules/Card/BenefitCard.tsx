import { LayoutGrid } from 'lucide-react';

interface BenefitCardProps {
  title: string;
  description: string;
}

const BenefitCard = ({ title, description }: BenefitCardProps) => {
  return (
    <div className="border p-4 rounded-md">
      <LayoutGrid className="w-12 h-12 text-primary" />
      <div className="font-semibold text-xl mt-3">{title}</div>
      <div className="text-sm text-gray-500">{description}</div>
    </div>
  );
};

export default BenefitCard;

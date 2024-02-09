'use client';

import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { TLink } from '@/types';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { InputSocialLink, InputWrapper } from '@/components/atoms';

interface TabSocialLinksProps {
  links?: TLink[];
}

const TabSocialLinks = ({ links }: TabSocialLinksProps) => {
  const router = useRouter();

  const handleDeleteLink = async (linkId: string) => {
    try {
      toast({
        title: 'Proccess',
        description: 'Loading...',
      });

      await fetch(`/api/v1/links/${linkId}`, {
        method: 'DELETE',
      });

      toast({
        title: 'Success',
        description: 'Success delete link',
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something wrong, please try again!',
      });
    }
  };

  return (
    <InputWrapper
      title="Social Links"
      description="Add elsewhere links to your company profile."
    >
      <InputSocialLink />
      <div className="space-y-5 mt-10">
        {links &&
          links?.map((link) => (
            <div key={link.id}>
              <p>{link.name}</p>
              <div className="flex items-center gap-5 mt-1.5">
                <Input value={link.link} readOnly />
                <Button
                  size="icon"
                  variant="destructive"
                  className="w-11 h-10"
                  onClick={() => handleDeleteLink(link.id!!)}
                >
                  <Trash className="w-5 h-5" />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </InputWrapper>
  );
};
export default TabSocialLinks;

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TabOverview from './_ProfilePartials/TabOverview';
import TabSocialLinks from './_ProfilePartials/TabSocialLinks';

const CompanyProfilePage = () => {
  return (
    <div className="py-5">
      <h1 className="text-xl font-semibold">Company Profile</h1>
      <div className="mt-5">
        <Tabs defaultValue="overview">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="socialLinks">Social Links</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <TabOverview />
          </TabsContent>
          <TabsContent value="socialLinks">
            <TabSocialLinks />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompanyProfilePage;

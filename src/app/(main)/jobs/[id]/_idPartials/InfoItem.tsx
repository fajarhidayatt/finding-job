interface InfoItemProps {
  title: string;
  description: string;
  type?: 'main' | 'aside';
}

const InfoItem = ({ title, description, type = 'main' }: InfoItemProps) => {
  if (type === 'aside') {
    return (
      <div className="flex items-center justify-between">
        <div className="text-gray-500">{title}</div>
        <div className="font-semibold">{description}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-2xl font-semibold mb-3">{title}</div>
      <div
        className="text-muted-foreground"
        dangerouslySetInnerHTML={{
          __html: description,
        }}
      ></div>
    </div>
  );
};

export default InfoItem;

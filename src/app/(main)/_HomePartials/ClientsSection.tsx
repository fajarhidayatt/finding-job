import Image from 'next/image';

type TClient = {
  src: string;
  alt: string;
};

const clients: TClient[] = [
  {
    src: '/images/cmp-jobox.png',
    alt: 'jobox',
  },
  {
    src: '/images/cmp-dsign.png',
    alt: 'dsign',
  },
  {
    src: '/images/cmp-wave.png',
    alt: 'wave',
  },
  {
    src: '/images/cmp-twins.png',
    alt: 'twins',
  },
  {
    src: '/images/cmp-bubles.png',
    alt: 'bubles',
  },
];

const ClientsSection = () => {
  return (
    <section className="container my-10 md:my-16">
      <h5 className="text-lg text-muted-foreground">
        Companies we helped grow
      </h5>
      <div className="mt-8 flex items-center justify-center flex-wrap gap-x-14 gap-y-10">
        {clients.map((client: TClient, i: number) => (
          <Image
            key={i}
            src={client.src}
            alt={client.alt}
            width={139}
            height={35}
          />
        ))}
      </div>
    </section>
  );
};

export default ClientsSection;

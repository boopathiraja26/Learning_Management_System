import React from 'react';

const TrustedLogos = () => {
  const logos = [
    { name: 'Google', src: 'https://www.svgrepo.com/show/303133/google.svg' },
    { name: 'Microsoft', src: 'https://www.svgrepo.com/show/303136/microsoft.svg' },
    { name: 'Amazon', src: 'https://www.svgrepo.com/show/303131/amazon.svg' },
    { name: 'Meta', src: 'https://www.svgrepo.com/show/306604/meta.svg' },
    { name: 'Netflix', src: 'https://www.svgrepo.com/show/306617/netflix.svg' },
    { name: 'Adobe', src: 'https://www.svgrepo.com/show/303123/adobe.svg' },
    { name: 'Stripe', src: 'https://www.svgrepo.com/show/303122/stripe.svg' },
    { name: 'OpenAI', src: 'https://www.svgrepo.com/show/306617/openai.svg' },
  ];
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Trusted by leading companies</h2>
        <div className="flex flex-wrap justify-center items-center gap-6">
          {logos.map((logo) => (
            <img
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              className="h-10 grayscale hover:grayscale-0 transition duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedLogos;

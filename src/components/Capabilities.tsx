'use client';

export default function Capabilities() {
  return (
    <section className="border-b border-solid border-[#1A1A1A] bg-[#F4F4F0] lg:h-[600px]">
      <div className="grid grid-cols-1 divide-y divide-solid divide-[#1A1A1A] lg:grid-cols-3 lg:divide-y-0 lg:divide-x">
        <div className="group relative p-8 md:p-10 lg:p-12 transition-colors duration-0 cursor-crosshair lg:hover:bg-[#1A1A1A] lg:hover:text-white">
          <span className="mb-8 block font-['SpaceMono'] text-xs text-[#0047FF] opacity-100 lg:opacity-50 lg:text-[#1A1A1A]">[01]</span>
          
          <div className="relative mb-8 h-[90px] w-full lg:h-32">
            <img 
              src="/images/graphic1.png" 
              alt="Semantic Restructuring" 
              className="h-full w-full object-contain transition-all duration-0 lg:group-hover:brightness-0 lg:group-hover:invert"
            />
          </div>

          <h3 className="mb-4 font-['SpaceMono'] text-lg font-bold uppercase">SEMANTIC RESTRUCTURING</h3>
          
          <div className="mb-4 h-px w-6 bg-current"></div>
          
          <p className="font-['PPEditorialNew'] text-lg leading-relaxed opacity-90">
            We explain that unlike cheap spinners that swap synonyms, ctrl-build deconstructs the logical argument and rebuilds the sentence tree from the root, preserving the original intent while erasing the algorithmic fingerprint.
          </p>
        </div>

        <div className="group relative p-8 md:p-10 lg:p-12 transition-colors duration-0 cursor-crosshair lg:hover:bg-[#1A1A1A] lg:hover:text-white">
          <span className="mb-8 block font-['SpaceMono'] text-xs text-[#0047FF] opacity-100 lg:opacity-50 lg:text-[#1A1A1A]">[02]</span>
          
          <div className="relative mb-8 h-[90px] w-full lg:h-32">
            <img 
              src="/images/graphic2.png" 
              alt="Burstiness Injection" 
              className="h-full w-full object-contain transition-all duration-0 lg:group-hover:brightness-0 lg:group-hover:invert"
            />
          </div>

          <h3 className="mb-4 font-['SpaceMono'] text-lg font-bold uppercase">BURSTINESS INJECTION</h3>
          
          <div className="mb-4 h-px w-6 bg-current"></div>
          
          <p className="font-['PPEditorialNew'] text-lg leading-relaxed opacity-90">
            We define the concept of 'Burstiness.' AI writing is statistically flat and predictable. We inject variance—alternating between short, punchy statements and long, flowing clauses to mimic biological writing patterns.
          </p>
        </div>

        <div className="group relative p-8 md:p-10 lg:p-12 transition-colors duration-0 cursor-crosshair lg:hover:bg-[#1A1A1A] lg:hover:text-white">
          <span className="mb-8 block font-['SpaceMono'] text-xs text-[#0047FF] opacity-100 lg:opacity-50 lg:text-[#1A1A1A]">[03]</span>
          
          <div className="relative mb-8 h-[90px] w-full lg:h-32">
            <img 
              src="/images/graphic3.png" 
              alt="Adversarial Resilience" 
              className="h-full w-full object-contain transition-all duration-0 lg:group-hover:brightness-0 lg:group-hover:invert"
            />
          </div>

          <h3 className="mb-4 font-['SpaceMono'] text-lg font-bold uppercase">ADVERSARIAL RESILIENCE</h3>
          
          <div className="mb-4 h-px w-6 bg-current"></div>
          
          <p className="font-['PPEditorialNew'] text-lg leading-relaxed opacity-90">
            We position the tool as 'Counter-Surveillance.' The engine is tested against current detection vectors. We do not hide errors; we elevate the style so the text passes as 'High-Level Human' rather than 'Obfuscated AI.'
          </p>
        </div>
      </div>
    </section>
  );
}


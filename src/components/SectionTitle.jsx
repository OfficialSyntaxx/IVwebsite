
import React from 'react';

const SectionTitle = ({ children, subtitle }) => (
    <div className="mb-8 text-center md:text-left relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-widest font-serif">
            {children}
        </h2>
        {subtitle && <div className="h-1 w-24 bg-cyan-500 mt-2 mx-auto md:mx-0"></div>}
    </div>
);

export default SectionTitle;

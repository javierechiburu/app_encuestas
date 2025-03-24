import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="relative md:h-32 py-8 bg-gray-900 flex justify-center">
      <div className="relavite w-full text-white text-center flex flex-col gap-4 justify-center md:justify-start items-center md:items-start">
        <Image
          src="/gob_footer.svg"
          alt=""
          className="md:absolute top-1/2 md:-translate-y-1/2 left-1 md:ml-2"
          width={80}
          height={80}
        />
        <p className="text-sm w-full m-auto max-w-xs md:max-w-xl">
          © {new Date().getFullYear()} Copyright FONASA, todos los derechos
          reservados
        </p>
      </div>
    </footer>
  );
};

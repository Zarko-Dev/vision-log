import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full flex justify-center items-center bg-gray-950 dark:bg-[#0d001a] py-6 text-center text-sm text-neutral-400 dark:text-purple-300/60 border-t border-neutral-900 dark:border-purple-900/20">
      <div className="flex items-center gap-2">
        <Image 
          src="/logo.png" 
          alt="Logo" 
          width={70} 
          height={70} 
          className="object-contain" 
        />
        <span>VisionLog &copy; {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}

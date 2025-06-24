import { Link } from "react-router-dom";
export default function DynamicSquareBackground({
  title,
  tag,
  description,
  buttonText,
  buttonHref,
}: Readonly<{
  title: string;
  tag: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}>) {
  return (
    <>
      <style>
        {`
        @keyframes tiles {
          0%, 40%, 80% {
            opacity: 0;
          }
          20%, 60% {
            opacity: 1;
          }
        }
      `}
      </style>
      <div className="relative flex w-full max-w-2xl flex-col gap-10 overflow-hidden  border border-neutral-100 px-16 py-10 shadow-lg dark:shadow-black mx-auto">
        <DecorativeTilesBackground />
        <div className="z-20">
          <div>
            <h3 className="inline text-2xl font-semibold text-neutral-100 dark:text-neutral-100">
              {title}
            </h3>
            <p className="ml-3 inline rounded-sm border border-neutral-900 px-1 align-top text-sm font-medium uppercase tracking-tight dark:border-neutral-400">
              {tag}
            </p>
          </div>
          <p className="mt-3 text-lg text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
        </div>
      
      </div>
    </>
  );
}

const DecorativeTilesBackground = () => {
  const rows = 20;
  const columns = 22;
  const animationDuration = 14; // seconds

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 flex select-none flex-wrap"
    >
      {Array.from({ length: rows }).map((_, rowIndex) => {
        return (
          <div
            className="flex h-[16px] w-full border-b border-dashed border-neutral-500/20"
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={`line-${rowIndex}`}
          >
            {Array.from({ length: columns }).map((_, colIndex) => {
              const delay = Math.random() * animationDuration;

              return (
                <div
                  className="relative h-[16px] w-[15px] border-r border-dashed border-neutral-500/20"
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={`tile-${colIndex}`}
                >
                  <div
                    className=" inset-0 h-[16px] w-[15px] bg-fuchsia-600/10 dark:bg-fuchsia-400/15"
                    style={{
                      opacity: 0, // Start with opacity 0
                      animationName: "tiles",
                      animationIterationCount: "infinite",
                      animationTimingFunction: "ease",
                      animationDelay: `${delay}s`,
                      animationDuration: `${animationDuration}s`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

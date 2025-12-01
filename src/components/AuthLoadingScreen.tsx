"use client";

type AuthLoadingScreenProps = {
  mode: "login" | "logout";
};

export function AuthLoadingScreen({ mode }: AuthLoadingScreenProps) {
  const isLogin = mode === "login";

  const title = isLogin ? "Loading your dashboard…" : "Logging you out…";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-sky-100 via-sky-50 to-slate-100/90 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950/95 backdrop-blur-md">
      {/* Fun animated background (lightweight, theme-matched) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Gradient blobs */}
        <div className="absolute -top-40 -right-32 h-72 w-72 rounded-full bg-sky-400/18 blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-cyan-400/14 blur-3xl animate-pulse [animation-delay:0.8s]" />

        {/* Soft diagonal stripes */}
        <div className="absolute inset-y-0 left-1/4 w-px bg-gradient-to-b from-sky-200/0 via-sky-200/50 to-sky-200/0 rotate-3" />
        <div className="absolute inset-y-0 right-1/5 w-px bg-gradient-to-b from-cyan-200/0 via-cyan-200/50 to-cyan-200/0 -rotate-2" />

        {/* Large faint pesos */}
        <div className="absolute top-10 left-6 text-6xl text-sky-500/10 animate-[pesoFloat_4s_ease-in-out_infinite]">
          ₱
        </div>
        <div className="absolute bottom-6 right-10 text-7xl text-blue-500/12 animate-[pesoFloat_5s_ease-in-out_infinite] [animation-delay:1s]">
          ₱
        </div>
      </div>

      {/* Outer loading circle */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-52 w-52 rounded-full border border-cyan-200/60 border-t-cyan-400/90 border-b-teal-400/80 opacity-80 animate-[spinSoft_10s_linear_infinite]" />
      </div>

      <div className="mx-6 flex w-full max-w-md flex-col items-center text-center">
        {/* Main peso visual */}
        <div className="mb-7 flex items-center justify-center">
          <div className="relative flex items-center justify-center text-cyan-500 dark:text-cyan-300">
            <span className="text-8xl font-extrabold tracking-tight animate-[pesoFloat_1.6s_ease-in-out_infinite]">
              ₱
            </span>
            {/* Small drifting pesos around */}
            <span className="pointer-events-none absolute -right-9 -top-2 text-2xl opacity-0 text-cyan-300 animate-[pesoDrift_1.8s_ease-in-out_infinite]">
              ₱
            </span>
            <span className="pointer-events-none absolute -left-8 -bottom-5 text-2xl opacity-0 text-teal-300 animate-[pesoDrift_1.8s_ease-in-out_infinite] [animation-delay:0.25s]">
              ₱
            </span>
            <span className="pointer-events-none absolute -left-9 -top-7 text-3xl opacity-0 text-sky-300 animate-[pesoDrift_2s_ease-in-out_infinite] [animation-delay:0.5s]">
              ₱
            </span>
            <span className="pointer-events-none absolute -right-7 bottom-9 text-3xl opacity-0 text-cyan-200 animate-[pesoDrift_2.1s_ease-in-out_infinite] [animation-delay:0.8s]">
              ₱
            </span>
            {/* Extra scattered pesos */}
            <span className="pointer-events-none absolute top-10 -left-14 text-xl opacity-0 text-cyan-200 animate-[pesoDrift_2.2s_ease-in-out_infinite] [animation-delay:1.1s]">
              ₱
            </span>
            <span className="pointer-events-none absolute -top-14 left-6 text-2xl opacity-0 text-teal-200 animate-[pesoDrift_2.4s_ease-in-out_infinite] [animation-delay:1.4s]">
              ₱
            </span>
            <span className="pointer-events-none absolute bottom-12 right-14 text-xl opacity-0 text-sky-200 animate-[pesoDrift_2.3s_ease-in-out_infinite] [animation-delay:1.7s]">
              ₱
            </span>
            <span className="pointer-events-none absolute -bottom-12 left-8 text-2xl opacity-0 text-cyan-300 animate-[pesoDrift_2.6s_ease-in-out_infinite] [animation-delay:2s]">
              ₱
            </span>
          </div>
        </div>

        {/* Text */}
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          {title}
        </h2>
      </div>
    </div>
  );
}



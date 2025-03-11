import { Spinner } from "./spinner";

export function OverlaySpinner({ open }: Readonly<{ open: boolean }>) {
  return (
    <>
      {open && (
        <div className="w-full absolute flex justify-center items-center inset-0 bg-black/10 z-50 h-full">
          <Spinner />
        </div>
      )}
    </>
  );
}

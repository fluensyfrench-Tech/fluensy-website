import toast from "react-hot-toast";

export function showCustomToast(message: string) {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <h1>You&apos;re in 🎉</h1>
        <p className="text-sm font-medium text-gray-900">{message}</p>
        <p className="mt-1 text-sm text-gray-500">
          You did the right thing🤩 Expect something exciting in your inbox soon
          💌
        </p>
        <p className="mt-1 text-sm text-gray-500">
          And while you wait, come hang out in our learner’s club.
        </p>
        {/* <button
          onClick={() => {
            // your action here
            console.log("Button clicked!");
          }}
          className="mt-3 inline-flex items-center px-4 py-2 bg-[#7148E5] text-white text-sm rounded hover:bg-[#5d3bd1]"
        >
          Go to Dashboard
        </button> */}
      </div>
    </div>
  ));
}

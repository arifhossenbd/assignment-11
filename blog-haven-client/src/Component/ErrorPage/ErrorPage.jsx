import { useRouteError } from "react-router-dom";
import { images } from "../../Constants";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="bg-black">
        <div className="flex items-center flex-col justify-center h-screen mx-auto">
        <img className="w-72" src={images.errorPage} alt="" />
      <p className="dark:text-white">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
    </div>
  );
}
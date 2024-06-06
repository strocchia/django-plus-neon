import { createMenu, updateMenu, getMenuById } from "@/utils/menuFuncs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

const CommonForm = ({ params = null }) => {
  const [formData, setFormData] = useState({ name: "", price: "" });
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
  const pathname = usePathname();

  console.log(pathname);

  // common form must reside under /add or /update relative paths
  // use pathname to discern this
  const type = pathname.split("/")[1].toString();

  if (type !== "add" && type !== "update") {
    return (
      <p className="p-1 italic text-red-500 bg-slate-200">
        Type can only be `add` or `update`
      </p>
    );
  }

  /**
   *
   * @param {Event} evt form submission event (evt for short).
   */
  const doFinish = (evt) => {
    evt.preventDefault();
    setLoading(true);

    type === "add"
      ? createMenu(formData)
          .then(() => {
            router.push("/?action=add");
          })
          .catch(() => {
            setError("Error occurred. Try again.");
            setLoading(false);
          })
      : type === "update"
      ? updateMenu(formData)
          .then(() => {
            router.push("/?action=update");
          })
          .catch(() => {
            setError("Error occurred. Try again.");
            setLoading(false);
          })
      : null;
  };

  const goBack = () => router.push("/");

  useEffect(() => {
    return () => setLoading(false);
  });

  // populate state on component mount/load
  useEffect(() => {
    const fetchData = async () => {
      if (type === "update" && params && params.menuId) {
        try {
          const data = await getMenuById(params.menuId);
          setFormData({ name: data.name, price: data.price });
        } catch (error) {
          setError(error.message);
        }
      }
    };

    fetchData();
  }, [params]);

  return (
    <form className="w-1/2" onSubmit={doFinish}>
      <div className="flex flex-col p-3">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          className="px-2 py-1 border-black rounded-sm max-h-10"
          value={formData.name}
          onChange={(evt) =>
            setFormData({ ...formData, name: evt.target.value })
          }
          required
        />
      </div>
      <div className="flex flex-col p-3">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          name="price"
          min={0}
          max={1000}
          className="px-2 py-1 border-black rounded-sm max-h-10"
          value={formData.price}
          onChange={(evt) =>
            setFormData({ ...formData, price: evt.target.value })
          }
          required
        />
      </div>
      {error && <p className="p-1 italic text-red-500 bg-slate-200">{error}</p>}
      <div>
        <button
          type="submit"
          className="p-3 mx-3 rounded-sm cursor-pointer hover:border-[0.5px] hover:border-white"
          disabled={isLoading}
        >
          Submit
        </button>
        <button
          type="button"
          className="p-3 mx-10 rounded-sm cursor-pointer hover:border-[0.5px] hover:border-white"
          onClick={goBack}
        >
          {"<--"} Back
        </button>
      </div>
    </form>
  );
};

export default CommonForm;

/**
 *
 * @param {number} id
 */
const deleteMenu = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/menu/${id}/`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) throw new Error("failed to delete menu data");

  return Promise.resolve();
};

const MenuItem = ({ id, name, price, doEdit, doDelete }) => {
  return (
    <div
      key={id}
      className="border-[#ddd] rounded-[4px] p-3 m-3 flex justify-between items-center bg-white shadow-sm shadow-[rgba(0,0,0,0.1)]"
    >
      <div className="flex flex-col">
        <div className="font-semibold text-[1.2rem]">{name}</div>
        <div className="text-[#555]">{price.toFixed(2)}</div>
      </div>
      <div className="flex gap-2">
        <button
          className="px-1 py-2 border-none rounded-md cursor-pointer"
          onClick={doEdit}
        >
          Edit
        </button>
        <button
          className="px-1 py-2 border-none rounded-md cursor-pointer"
          onClick={() => deleteMenu(id).then(() => doDelete(id))}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MenuItem;

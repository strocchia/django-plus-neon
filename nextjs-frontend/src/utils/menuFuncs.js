export const TypesEnum = Object.freeze({
  ADD: "add",
  UPDATE: "update",
  BLANK: "",
});

/**
 *
 * @param {number} id
 * @returns
 */
export async function getMenuById(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu/${id}/`);

  if (!res.ok) throw new Error(`failed to get menu by ID ${id}`);

  return res.json();
}

/**
 *
 * @param {Object} data
 * @returns
 */
export async function createMenu(data) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create menu data");

  return res.json();
}

/**
 *
 * @param {number} id
 * @param {Object} data
 * @returns
 */
export const updateMenu = async (id, data) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/menu/${id}/`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) throw new Error("failed to update menu data");

  return res.json();
};

/**
 *
 * @param {number} id
 */
export const deleteMenu = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/menu/${id}/`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) throw new Error("failed to delete menu data");

  console.log("menu delete", res);

  return Promise.resolve();
};

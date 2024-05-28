const MenuItem = ({ id, name, price, doEdit, doDelete }) => {
  return (
    <div key={id}>
      <div>
        <div>{name}</div>
        <div>{price.toFixed(2)}</div>
      </div>
      <div>
        <button onClick={doEdit}>Edit</button>
        <button onClick={() => deleteMenu(id).then(() => doDelete(id))}>
          Delete
        </button>
      </div>
    </div>
  );
};

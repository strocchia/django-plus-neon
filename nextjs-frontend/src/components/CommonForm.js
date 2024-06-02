const CommonForm = ({
  doFinish,
  goBack,
  formData,
  setFormData,
  error,
  isLoading,
}) => {
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

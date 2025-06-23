import { useFormik } from "formik";
import { FaThumbtack } from "react-icons/fa";

function Notecard({ note, index, onSave, onSoftDelete, onTogglePin  }) {
  const formik = useFormik({
    initialValues: {
      title: note.title || "",
      content: note.content || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      onSave(index, { ...values, trashed: false });
    },
  });

  return (
    
    <form
  onSubmit={formik.handleSubmit}
  className="relative bg-white shadow-lg rounded-xl p-5 w-80 hover:shadow-2xl transition-shadow duration-300"
>
  {/* Pin icon top-right */}
  <button
    type="button"
    onClick={() => onTogglePin(index)}
    className={`absolute top-4 right-4 text-2xl ${
      note.pinned ? "text-yellow-500" : "text-gray-300"
    } hover:text-yellow-400 focus:outline-none`}
    title={note.pinned ? "Unpin" : "Pin"}
  >
    <FaThumbtack />
  </button>

  <input
    type="text"
    name="title"
    value={formik.values.title}
    onChange={formik.handleChange}
    placeholder="Note Title"
    className="text-xl font-semibold p-2 w-full mb-2  rounded-md focus:outline-none focus:ring-none "
  />
  <textarea
    name="content"
    value={formik.values.content}
    onChange={formik.handleChange}
    placeholder="Note Content"
    className="text-md p-2 w-full mb-2  rounded-md resize-none focus:outline-none focus:ring-none"
    rows="4"
  ></textarea>

  <div className="flex justify-between items-center">
    <button
      type="submit"
      className="border text-green-700 font-semibold px-1 rounded-md hover:bg-green-200 transition"
    >
       Save
    </button>
    <button
      type="button"
      onClick={() => onSoftDelete(index)}
      className="border text-red-600 font-semibold px-1 rounded-md hover:bg-red-200 transition"
    >
       Trash
    </button>
  </div>
</form>
    

  );
}

export default Notecard;

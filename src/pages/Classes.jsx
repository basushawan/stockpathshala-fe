import React from "react";
import ShimmarClass from "../components/ShimmarClass";
import axios from "axios";

const Classes = () => {
  const [classes, setClasses] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchClasses = async (e) => {
      try {
        const res = await axios.get(
          "https://internal.stockpathshala.in/api/v1/live_classes"
        );
        setClasses(res.data?.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch classes : ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  if (loading)
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-violet-700 mb-6 text-center">
          Live Classes
        </h1>
        <ShimmarClass />
      </div>
    );
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-violet-900 mb-6 text-center">
        Live Classes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((item) => (
          <div
            key={item.id}
            className="border border-violet-900 p-4 rounded-xl shadow-md bg-purple-600"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={item.teachers?.profile_image}
                alt={item.teachers?.name}
                className="w-14 h-14 rounded-full object-cover border-purple-900 border-2"
              />
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {item.teachers?.name}
                </h3>
                <p className="text-sm text-violet-400">
                  {item.teachers?.certification_text}
                </p>
                <p className="text-sm text-violet-300">
                  {item.teachers?.expertise}
                </p>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mb-2">{item.title}</h2>
            <p className="text-sm text-violet-300 mb-2">
              {item.short_description}
            </p>

            <div className="text-sm text-voilet-700 mb-2">
              <span className="mr-4">
                📅 {new Date(item.start_datetime).toLocaleString()}
              </span>
              <span>
                🌐 {item.language?.language_name} | 🎯 {item.level?.level}
              </span>
            </div>

            <button
              className="mt-2 bg-purple-400 hover:bg-purple-900 text-white px-4 py-2 rounded cursor-pointer border border-purple-700"
              onClick={() => window.open(item.participant_link, "_blank")}
            >
              {item.buttons?.class_register_button_title || "Register"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;

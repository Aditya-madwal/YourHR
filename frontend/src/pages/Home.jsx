import React, { useEffect, useState, useContext } from "react";
import { MyContext } from "../MyContext";
import api from "../api";

// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import PDF from "react-pdf-scroll";
// import PDFViewer from "pdf-viewer-reactjs";

function Home() {
  const { me, setMe } = useContext(MyContext); // Context to store user data
  const [error, setError] = useState(null); // Local state for error handling

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        // Fetch user data from the API
        const response = await api.get(`/api/showme`); // Make sure 'axios' is imported and used correctly here
        setMe(response.data); // Update context with fetched data
      } catch (error) {
        // Error handling based on the type of error
        if (error.response) {
          setError(
            `Error: ${error.response.status} - ${error.response.statusText}`
          );
        } else if (error.request) {
          setError("Error: No response received from server");
        } else {
          setError(`Error: ${error.message}`);
        }
      }
    };

    fetchMyData();
  }, [setMe]);

  const pdfURL = "http://127.0.0.1:8000" + me?.resume;
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <h1 className="text-blue-400 font-bold text-3xl flex w-full justify-center mt-10">
            HEY! @{me?.user.username}
          </h1>
          <span className="flex justify-center">
            <div className="flow-root rounded-lg border border-gray-100 py-3 shadow-sm m-10 w-[50vw]">
              <dl className="-my-3 divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Name</dt>
                  <dd className="text-gray-700 sm:col-span-2">{me?.name}</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Email</dt>
                  <dd className="text-gray-700 sm:col-span-2">{me?.email}</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                  <dt className="font-medium text-gray-900">Resume Status</dt>
                  <dd className="text-gray-700 sm:col-span-2">Uploaded</dd>
                </div>
              </dl>
            </div>
          </span>
          <div style={{ height: "600px" }}>
            {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.5.141/build/pdf.worker.min.js">
              <Viewer
                fileUrl={pdfURL}
                plugins={[defaultLayoutPluginInstance]}
              />
            </Worker> */}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
